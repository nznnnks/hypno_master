from __future__ import annotations

import hashlib
import hmac
import os
import secrets
import sqlite3
import time
from typing import Any

HERE = os.path.abspath(os.path.dirname(__file__))
DB_DIR = os.path.join(HERE, "db_data")
DB_PATH = os.path.join(DB_DIR, "app.sqlite3")

PBKDF2_ITERS = 210_000
SALT_BYTES = 16
HASH_BYTES = 32

VERIFY_CODE_ITERS = 80_000
VERIFY_CODE_TTL_SECONDS = 10 * 60
VERIFY_CODE_MAX_ATTEMPTS = 5

PASSWORD_CHANGE_TTL_SECONDS = 10 * 60
PASSWORD_CHANGE_MAX_ATTEMPTS = 5


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


def db_connect() -> sqlite3.Connection:
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # Reasonable defaults for a small local app.
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.execute("PRAGMA journal_mode = WAL;")
    return conn


def init_db() -> None:
    with db_connect() as conn:
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


def create_user(*, name: str, email: str, password: str) -> dict[str, Any]:
    salt_hex, digest_hex = hash_password(password)
    now = int(time.time())

    with db_connect() as conn:
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
    with db_connect() as conn:
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


def set_user_verification_code(*, user_id: int, code: str) -> None:
    salt_hex, digest_hex = hash_verify_code(code)
    now = int(time.time())
    expires_at = now + VERIFY_CODE_TTL_SECONDS

    with db_connect() as conn:
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


def delete_user(*, user_id: int) -> None:
    with db_connect() as conn:
        conn.execute("DELETE FROM users WHERE id = ?", (user_id,))


def get_user_by_email(email: str) -> sqlite3.Row | None:
    with db_connect() as conn:
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


def set_password_change_request(*, user_id: int, new_password: str, code: str) -> None:
    new_salt_hex, new_digest_hex = hash_password(new_password)
    code_salt_hex, code_digest_hex = hash_verify_code(code)
    now = int(time.time())
    expires_at = now + PASSWORD_CHANGE_TTL_SECONDS

    with db_connect() as conn:
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


def clear_password_change_request(*, user_id: int) -> None:
    with db_connect() as conn:
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
