from __future__ import annotations

import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import ssl
import time
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any

import smtplib

import settings
# Dev-only server:
# - JSON API for register/login
# - SQLite storage
# - CORS enabled for local frontend

HERE = os.path.abspath(os.path.dirname(__file__))
DB_DIR = os.path.join(HERE, "db_data")
DB_PATH = os.path.join(DB_DIR, "app.sqlite3")

PBKDF2_ITERS = 210_000
SALT_BYTES = 16
HASH_BYTES = 32

VERIFY_CODE_ITERS = 80_000
VERIFY_CODE_TTL_SECONDS = 10 * 60
VERIFY_CODE_MAX_ATTEMPTS = 5

DEBUG_AUTH_ERRORS = os.environ.get("BACKEND_DEBUG_AUTH_ERRORS", "1") not in {"0", "false", "False"}

PASSWORD_CHANGE_TTL_SECONDS = 10 * 60
PASSWORD_CHANGE_MAX_ATTEMPTS = 5


class EmailConfigError(Exception):
    pass


class EmailSendError(Exception):
    def __init__(self, *, detail: str) -> None:
        super().__init__("email_send_failed")
        self.detail = detail


def _ensure_users_columns(conn: sqlite3.Connection) -> None:
    existing = {str(r["name"]) for r in conn.execute("PRAGMA table_info(users);").fetchall()}
    columns: list[tuple[str, str]] = [
        ("email_verified", "INTEGER NOT NULL DEFAULT 0"),
        ("email_verify_code_hash", "TEXT"),
        ("email_verify_code_salt", "TEXT"),
        ("email_verify_code_expires_at", "INTEGER"),
        ("email_verify_code_attempts", "INTEGER NOT NULL DEFAULT 0"),
        ("email_verify_code_created_at", "INTEGER"),
        ("pw_change_new_hash", "TEXT"),
        ("pw_change_new_salt", "TEXT"),
        ("pw_change_code_hash", "TEXT"),
        ("pw_change_code_salt", "TEXT"),
        ("pw_change_expires_at", "INTEGER"),
        ("pw_change_attempts", "INTEGER NOT NULL DEFAULT 0"),
        ("pw_change_created_at", "INTEGER"),
    ]
    for name, definition in columns:
        if name in existing:
            continue
        conn.execute(f"ALTER TABLE users ADD COLUMN {name} {definition};")

def _db_connect() -> sqlite3.Connection:
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # Reasonable defaults for a small local app.
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.execute("PRAGMA journal_mode = WAL;")
    return conn


def init_db() -> None:
    with _db_connect() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT NOT NULL UNIQUE,
              password_hash TEXT NOT NULL,
              password_salt TEXT NOT NULL,
              created_at INTEGER NOT NULL
            );
            """
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);")
        _ensure_users_columns(conn)


def hash_password(password: str) -> tuple[str, str]:
    salt = secrets.token_bytes(SALT_BYTES)
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, PBKDF2_ITERS, dklen=HASH_BYTES
    )
    return salt.hex(), digest.hex()


def verify_password(password: str, salt_hex: str, digest_hex: str) -> bool:
    try:
        salt = bytes.fromhex(salt_hex)
        expected = bytes.fromhex(digest_hex)
    except ValueError:
        return False

    actual = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, PBKDF2_ITERS, dklen=len(expected)
    )
    return hmac.compare_digest(actual, expected)


def hash_verify_code(code: str) -> tuple[str, str]:
    salt = secrets.token_bytes(SALT_BYTES)
    digest = hashlib.pbkdf2_hmac(
        "sha256", code.encode("utf-8"), salt, VERIFY_CODE_ITERS, dklen=HASH_BYTES
    )
    return salt.hex(), digest.hex()


def verify_verify_code(code: str, salt_hex: str, digest_hex: str) -> bool:
    try:
        salt = bytes.fromhex(salt_hex)
        expected = bytes.fromhex(digest_hex)
    except ValueError:
        return False

    actual = hashlib.pbkdf2_hmac(
        "sha256", code.encode("utf-8"), salt, VERIFY_CODE_ITERS, dklen=len(expected)
    )
    return hmac.compare_digest(actual, expected)


def _generate_6_digit_code() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"

def _send_code_email(*, to_email: str, subject: str, code: str, ttl_seconds: int) -> None:
    user = (settings.EMAIL_HOST_USER or "").strip()
    password = (settings.EMAIL_HOST_PASSWORD or "").strip()
    if not user or not password:
        raise EmailConfigError("email_not_configured")

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = user
    msg["To"] = to_email
    msg.set_content(
        "\n".join(
            [
                "Ваш код подтверждения:",
                "",
                code,
                "",
                f"Код действителен {ttl_seconds // 60} минут.",
            ]
        )
    )

    try:
        if getattr(settings, "EMAIL_USE_SSL", False):
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(
                settings.EMAIL_HOST, settings.EMAIL_PORT, context=context, timeout=15
            ) as smtp:
                smtp.login(user, password)
                smtp.send_message(msg)
        else:
            with smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT, timeout=15) as smtp:
                smtp.ehlo()
                if getattr(settings, "EMAIL_USE_TLS", False):
                    context = ssl.create_default_context()
                    smtp.starttls(context=context)
                    smtp.ehlo()
                smtp.login(user, password)
                smtp.send_message(msg)
    except smtplib.SMTPAuthenticationError as e:
        detail = f"SMTPAuthenticationError {getattr(e, 'smtp_code', '')} {getattr(e, 'smtp_error', b'')!r}"
        raise EmailSendError(detail=detail) from e
    except smtplib.SMTPRecipientsRefused as e:
        raise EmailSendError(detail=f"SMTPRecipientsRefused {e.recipients!r}") from e
    except smtplib.SMTPSenderRefused as e:
        detail = f"SMTPSenderRefused {getattr(e, 'smtp_code', '')} {getattr(e, 'smtp_error', b'')!r}"
        raise EmailSendError(detail=detail) from e
    except smtplib.SMTPResponseException as e:
        detail = f"SMTPResponseException {e.smtp_code} {e.smtp_error!r}"
        raise EmailSendError(detail=detail) from e
    except (OSError, smtplib.SMTPException) as e:
        raise EmailSendError(detail=f"{e.__class__.__name__}: {e}") from e


def _send_verification_code_email(*, to_email: str, code: str) -> None:
    _send_code_email(
        to_email=to_email,
        subject="Код подтверждения регистрации",
        code=code,
        ttl_seconds=VERIFY_CODE_TTL_SECONDS,
    )


def _send_password_change_code_email(*, to_email: str, code: str) -> None:
    _send_code_email(
        to_email=to_email,
        subject="Код подтверждения смены пароля",
        code=code,
        ttl_seconds=PASSWORD_CHANGE_TTL_SECONDS,
    )


def create_user(*, name: str, email: str, password: str) -> dict[str, Any]:
    salt_hex, digest_hex = hash_password(password)
    now = int(time.time())

    with _db_connect() as conn:
        try:
            cur = conn.execute(
                """
                INSERT INTO users (name, email, password_hash, password_salt, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (name, email.lower().strip(), digest_hex, salt_hex, now),
            )
        except sqlite3.IntegrityError:
            raise ValueError("email_already_exists")

        user_id = int(cur.lastrowid)

    return {"id": user_id, "name": name, "email": email.lower().strip()}


def authenticate_user(*, email: str, password: str) -> dict[str, Any] | None:
    with _db_connect() as conn:
        row = conn.execute(
            """
            SELECT
              id, name, email, password_hash, password_salt,
              email_verified
            FROM users
            WHERE email = ?
            """,
            (email.lower().strip(),),
        ).fetchone()

    if not row:
        return None

    ok = verify_password(password, row["password_salt"], row["password_hash"])
    if not ok:
        return None

    return {
        "id": int(row["id"]),
        "name": row["name"],
        "email": row["email"],
        "email_verified": bool(row["email_verified"]),
    }


def _set_user_verification_code(*, user_id: int, code: str) -> None:
    salt_hex, digest_hex = hash_verify_code(code)
    now = int(time.time())
    expires_at = now + VERIFY_CODE_TTL_SECONDS

    with _db_connect() as conn:
        conn.execute(
            """
            UPDATE users
            SET
              email_verified = 0,
              email_verify_code_hash = ?,
              email_verify_code_salt = ?,
              email_verify_code_expires_at = ?,
              email_verify_code_attempts = 0,
              email_verify_code_created_at = ?
            WHERE id = ?
            """,
            (digest_hex, salt_hex, expires_at, now, user_id),
        )


def _delete_user(*, user_id: int) -> None:
    with _db_connect() as conn:
        conn.execute("DELETE FROM users WHERE id = ?", (user_id,))


def _get_user_by_email(email: str) -> sqlite3.Row | None:
    with _db_connect() as conn:
        return conn.execute(
            """
            SELECT
              id, name, email,
              password_hash, password_salt,
              email_verified,
              email_verify_code_hash,
              email_verify_code_salt,
              email_verify_code_expires_at,
              email_verify_code_attempts,
              pw_change_new_hash,
              pw_change_new_salt,
              pw_change_code_hash,
              pw_change_code_salt,
              pw_change_expires_at,
              pw_change_attempts
            FROM users
            WHERE email = ?
            """,
            (email.lower().strip(),),
        ).fetchone()


def _set_password_change_request(*, user_id: int, new_password: str, code: str) -> None:
    new_salt_hex, new_digest_hex = hash_password(new_password)
    code_salt_hex, code_digest_hex = hash_verify_code(code)
    now = int(time.time())
    expires_at = now + PASSWORD_CHANGE_TTL_SECONDS

    with _db_connect() as conn:
        conn.execute(
            """
            UPDATE users
            SET
              pw_change_new_hash = ?,
              pw_change_new_salt = ?,
              pw_change_code_hash = ?,
              pw_change_code_salt = ?,
              pw_change_expires_at = ?,
              pw_change_attempts = 0,
              pw_change_created_at = ?
            WHERE id = ?
            """,
            (
                new_digest_hex,
                new_salt_hex,
                code_digest_hex,
                code_salt_hex,
                expires_at,
                now,
                user_id,
            ),
        )


def _clear_password_change_request(*, user_id: int) -> None:
    with _db_connect() as conn:
        conn.execute(
            """
            UPDATE users
            SET
              pw_change_new_hash = NULL,
              pw_change_new_salt = NULL,
              pw_change_code_hash = NULL,
              pw_change_code_salt = NULL,
              pw_change_expires_at = NULL,
              pw_change_attempts = 0,
              pw_change_created_at = NULL
            WHERE id = ?
            """,
            (user_id,),
        )


class Handler(BaseHTTPRequestHandler):
    server_version = "hypno-master-backend/0.1"

    def _send_json(self, status: int, payload: dict[str, Any]) -> None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self._cors_headers()
        self.end_headers()
        self.wfile.write(data)

    def _cors_headers(self) -> None:
        # Dev-friendly CORS. Tighten this for production.
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self) -> None:  # noqa: N802
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def do_GET(self) -> None:  # noqa: N802
        if self.path == "/health":
            self._send_json(200, {"ok": True})
            return
        self._send_json(404, {"ok": False, "error": "not_found"})

    def _read_json_body(self) -> dict[str, Any]:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0

        raw = self.rfile.read(length) if length > 0 else b""
        try:
            obj = json.loads(raw.decode("utf-8") if raw else "{}")
        except json.JSONDecodeError:
            raise ValueError("invalid_json")

        if not isinstance(obj, dict):
            raise ValueError("invalid_json")
        return obj

    def do_POST(self) -> None:  # noqa: N802
        if self.path == "/api/register":
            self._handle_register()
            return
        if self.path == "/api/verify-email":
            self._handle_verify_email()
            return
        if self.path == "/api/resend-verification":
            self._handle_resend_verification()
            return
        if self.path == "/api/request-password-change":
            self._handle_request_password_change()
            return
        if self.path == "/api/confirm-password-change":
            self._handle_confirm_password_change()
            return
        if self.path == "/api/resend-password-change":
            self._handle_resend_password_change()
            return
        if self.path == "/api/login":
            self._handle_login()
            return
        self._send_json(404, {"ok": False, "error": "not_found"})

    def _handle_register(self) -> None:
        try:
            body = self._read_json_body()
            name = str(body.get("name", "")).strip()
            email = str(body.get("email", "")).strip()
            password = str(body.get("password", ""))
        except ValueError as e:
            self._send_json(400, {"ok": False, "error": str(e)})
            return

        if not name or not email or not password:
            self._send_json(400, {"ok": False, "error": "missing_fields"})
            return
        if len(password) < 8:
            self._send_json(400, {"ok": False, "error": "weak_password"})
            return

        try:
            user = create_user(name=name, email=email, password=password)
        except ValueError as e:
            if str(e) == "email_already_exists":
                self._send_json(409, {"ok": False, "error": "email_already_exists"})
                return
            self._send_json(500, {"ok": False, "error": "server_error"})
            return

        code = _generate_6_digit_code()
        try:
            _set_user_verification_code(user_id=int(user["id"]), code=code)
            _send_verification_code_email(to_email=str(user["email"]), code=code)
        except EmailConfigError as e:
            _delete_user(user_id=int(user["id"]))
            self._send_json(500, {"ok": False, "error": str(e)})
            return
        except EmailSendError as e:
            _delete_user(user_id=int(user["id"]))
            self._send_json(500, {"ok": False, "error": "email_send_failed", "detail": e.detail})
            return

        self._send_json(201, {"ok": True, "user": user, "verification_required": True})

    def _handle_verify_email(self) -> None:
        try:
            body = self._read_json_body()
            email = str(body.get("email", "")).strip()
            code = str(body.get("code", "")).strip()
        except ValueError as e:
            self._send_json(400, {"ok": False, "error": str(e)})
            return

        if not email or not code:
            self._send_json(400, {"ok": False, "error": "missing_fields"})
            return
        if not (len(code) == 6 and code.isdigit()):
            self._send_json(400, {"ok": False, "error": "invalid_code_format"})
            return

        row = _get_user_by_email(email)
        if not row:
            self._send_json(404, {"ok": False, "error": "user_not_found"})
            return
        if bool(row["email_verified"]):
            self._send_json(200, {"ok": True, "already_verified": True})
            return

        now = int(time.time())
        expires_at = row["email_verify_code_expires_at"]
        if not expires_at or now > int(expires_at):
            self._send_json(400, {"ok": False, "error": "code_expired"})
            return

        attempts = int(row["email_verify_code_attempts"] or 0)
        if attempts >= VERIFY_CODE_MAX_ATTEMPTS:
            self._send_json(429, {"ok": False, "error": "too_many_attempts"})
            return

        ok = verify_verify_code(
            code,
            str(row["email_verify_code_salt"] or ""),
            str(row["email_verify_code_hash"] or ""),
        )
        if not ok:
            with _db_connect() as conn:
                conn.execute(
                    """
                    UPDATE users
                    SET email_verify_code_attempts = email_verify_code_attempts + 1
                    WHERE id = ?
                    """,
                    (int(row["id"]),),
                )
            attempts_left = max(0, VERIFY_CODE_MAX_ATTEMPTS - (attempts + 1))
            self._send_json(
                400, {"ok": False, "error": "invalid_code", "attempts_left": attempts_left}
            )
            return

        with _db_connect() as conn:
            conn.execute(
                """
                UPDATE users
                SET
                  email_verified = 1,
                  email_verify_code_hash = NULL,
                  email_verify_code_salt = NULL,
                  email_verify_code_expires_at = NULL,
                  email_verify_code_attempts = 0,
                  email_verify_code_created_at = NULL
                WHERE id = ?
                """,
                (int(row["id"]),),
            )

        self._send_json(200, {"ok": True})

    def _handle_resend_verification(self) -> None:
        try:
            body = self._read_json_body()
            email = str(body.get("email", "")).strip()
        except ValueError as e:
            self._send_json(400, {"ok": False, "error": str(e)})
            return

        if not email:
            self._send_json(400, {"ok": False, "error": "missing_fields"})
            return

        row = _get_user_by_email(email)
        if not row:
            self._send_json(404, {"ok": False, "error": "user_not_found"})
            return
        if bool(row["email_verified"]):
            self._send_json(200, {"ok": True, "already_verified": True})
            return

        code = _generate_6_digit_code()
        try:
            _set_user_verification_code(user_id=int(row["id"]), code=code)
            _send_verification_code_email(to_email=str(row["email"]), code=code)
        except EmailConfigError as e:
            self._send_json(500, {"ok": False, "error": str(e)})
            return
        except EmailSendError as e:
            self._send_json(500, {"ok": False, "error": "email_send_failed", "detail": e.detail})
            return

        self._send_json(200, {"ok": True})

    def _handle_request_password_change(self) -> None:
        try:
            body = self._read_json_body()
            email = str(body.get("email", "")).strip()
            current_password = str(body.get("current_password", ""))
            new_password = str(body.get("new_password", ""))
        except ValueError as e:
            self._send_json(400, {"ok": False, "error": str(e)})
            return

        if not email or not current_password or not new_password:
            self._send_json(400, {"ok": False, "error": "missing_fields"})
            return
        if len(new_password) < 8:
            self._send_json(400, {"ok": False, "error": "weak_password"})
            return

        row = _get_user_by_email(email)
        if not row:
            self._send_json(401, {"ok": False, "error": "invalid_credentials"})
            return

        ok = verify_password(current_password, row["password_salt"], row["password_hash"])
        if not ok:
            self._send_json(401, {"ok": False, "error": "invalid_credentials"})
            return

        code = _generate_6_digit_code()
        try:
            _set_password_change_request(
                user_id=int(row["id"]), new_password=new_password, code=code
            )
            _send_password_change_code_email(to_email=str(row["email"]), code=code)
        except EmailConfigError as e:
            self._send_json(500, {"ok": False, "error": str(e)})
            return
        except EmailSendError as e:
            self._send_json(500, {"ok": False, "error": "email_send_failed", "detail": e.detail})
            return

        self._send_json(200, {"ok": True, "verification_required": True})

    def _handle_confirm_password_change(self) -> None:
        try:
            body = self._read_json_body()
            email = str(body.get("email", "")).strip()
            code = str(body.get("code", "")).strip()
        except ValueError as e:
            self._send_json(400, {"ok": False, "error": str(e)})
            return

        if not email or not code:
            self._send_json(400, {"ok": False, "error": "missing_fields"})
            return
        if not (len(code) == 6 and code.isdigit()):
            self._send_json(400, {"ok": False, "error": "invalid_code_format"})
            return

        row = _get_user_by_email(email)
        if not row:
            self._send_json(404, {"ok": False, "error": "user_not_found"})
            return

        if not row["pw_change_new_hash"] or not row["pw_change_new_salt"]:
            self._send_json(400, {"ok": False, "error": "no_pending_password_change"})
            return

        now = int(time.time())
        expires_at = row["pw_change_expires_at"]
        if not expires_at or now > int(expires_at):
            self._send_json(400, {"ok": False, "error": "code_expired"})
            return

        attempts = int(row["pw_change_attempts"] or 0)
        if attempts >= PASSWORD_CHANGE_MAX_ATTEMPTS:
            self._send_json(429, {"ok": False, "error": "too_many_attempts"})
            return

        ok = verify_verify_code(
            code,
            str(row["pw_change_code_salt"] or ""),
            str(row["pw_change_code_hash"] or ""),
        )
        if not ok:
            with _db_connect() as conn:
                conn.execute(
                    """
                    UPDATE users
                    SET pw_change_attempts = pw_change_attempts + 1
                    WHERE id = ?
                    """,
                    (int(row["id"]),),
                )
            attempts_left = max(0, PASSWORD_CHANGE_MAX_ATTEMPTS - (attempts + 1))
            self._send_json(
                400, {"ok": False, "error": "invalid_code", "attempts_left": attempts_left}
            )
            return

        with _db_connect() as conn:
            conn.execute(
                """
                UPDATE users
                SET
                  password_hash = ?,
                  password_salt = ?,
                  pw_change_new_hash = NULL,
                  pw_change_new_salt = NULL,
                  pw_change_code_hash = NULL,
                  pw_change_code_salt = NULL,
                  pw_change_expires_at = NULL,
                  pw_change_attempts = 0,
                  pw_change_created_at = NULL
                WHERE id = ?
                """,
                (str(row["pw_change_new_hash"]), str(row["pw_change_new_salt"]), int(row["id"])),
            )

        self._send_json(200, {"ok": True})

    def _handle_resend_password_change(self) -> None:
        try:
            body = self._read_json_body()
            email = str(body.get("email", "")).strip()
        except ValueError as e:
            self._send_json(400, {"ok": False, "error": str(e)})
            return

        if not email:
            self._send_json(400, {"ok": False, "error": "missing_fields"})
            return

        row = _get_user_by_email(email)
        if not row:
            self._send_json(404, {"ok": False, "error": "user_not_found"})
            return

        if not row["pw_change_new_hash"] or not row["pw_change_new_salt"]:
            self._send_json(400, {"ok": False, "error": "no_pending_password_change"})
            return

        code = _generate_6_digit_code()
        code_salt_hex, code_digest_hex = hash_verify_code(code)
        now = int(time.time())
        expires_at = now + PASSWORD_CHANGE_TTL_SECONDS
        with _db_connect() as conn:
            conn.execute(
                """
                UPDATE users
                SET
                  pw_change_code_hash = ?,
                  pw_change_code_salt = ?,
                  pw_change_expires_at = ?,
                  pw_change_attempts = 0,
                  pw_change_created_at = ?
                WHERE id = ?
                """,
                (code_digest_hex, code_salt_hex, expires_at, now, int(row["id"])),
            )

        try:
            _send_password_change_code_email(to_email=str(row["email"]), code=code)
        except EmailConfigError as e:
            self._send_json(500, {"ok": False, "error": str(e)})
            return
        except EmailSendError as e:
            self._send_json(500, {"ok": False, "error": "email_send_failed", "detail": e.detail})
            return

        self._send_json(200, {"ok": True})

    def _handle_login(self) -> None:
        try:
            body = self._read_json_body()
            email = str(body.get("email", "")).strip()
            password = str(body.get("password", ""))
        except ValueError as e:
            self._send_json(400, {"ok": False, "error": str(e)})
            return

        if not email or not password:
            self._send_json(400, {"ok": False, "error": "missing_fields"})
            return

        with _db_connect() as conn:
            row = conn.execute(
                """
                SELECT
                  id, name, email, password_hash, password_salt,
                  email_verified
                FROM users
                WHERE email = ?
                """,
                (email.lower().strip(),),
            ).fetchone()

        if not row:
            payload: dict[str, Any] = {"ok": False, "error": "invalid_credentials"}
            if DEBUG_AUTH_ERRORS:
                payload["detail"] = "user_not_found"
            self._send_json(401, payload)
            return

        ok = verify_password(password, row["password_salt"], row["password_hash"])
        if not ok:
            payload = {"ok": False, "error": "invalid_credentials"}
            if DEBUG_AUTH_ERRORS:
                payload["detail"] = "wrong_password"
            self._send_json(401, payload)
            return

        user = {
            "id": int(row["id"]),
            "name": row["name"],
            "email": row["email"],
            "email_verified": bool(row["email_verified"]),
        }

        if not bool(user["email_verified"]):
            self._send_json(403, {"ok": False, "error": "email_not_verified"})
            return

        self._send_json(200, {"ok": True, "user": user})


def main() -> None:
    init_db()
    host = os.environ.get("BACKEND_HOST", "127.0.0.1")
    port = int(os.environ.get("BACKEND_PORT", "8000"))
    httpd = ThreadingHTTPServer((host, port), Handler)
    print(f"Backend running on http://{host}:{port}")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
