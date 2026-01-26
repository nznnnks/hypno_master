from __future__ import annotations

import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any

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
            "SELECT id, name, email, password_hash, password_salt FROM users WHERE email = ?",
            (email.lower().strip(),),
        ).fetchone()

    if not row:
        return None

    ok = verify_password(password, row["password_salt"], row["password_hash"])
    if not ok:
        return None

    return {"id": int(row["id"]), "name": row["name"], "email": row["email"]}


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

        self._send_json(201, {"ok": True, "user": user})

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

        user = authenticate_user(email=email, password=password)
        if not user:
            self._send_json(401, {"ok": False, "error": "invalid_credentials"})
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

