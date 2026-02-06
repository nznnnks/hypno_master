from __future__ import annotations

import json
import logging
import os
import secrets
import time
from typing import Any

import uvicorn
from fastapi import BackgroundTasks, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from db import (
    PASSWORD_CHANGE_MAX_ATTEMPTS,
    PASSWORD_CHANGE_TTL_SECONDS,
    VERIFY_CODE_MAX_ATTEMPTS,
    create_user,
    db_connect,
    get_user_by_email,
    hash_verify_code,
    init_db,
    set_password_change_request,
    set_user_verification_code,
    verify_password,
    verify_verify_code,
)
from email_service import (
    send_password_change_code_email,
    send_verification_code_email,
)

# Dev-only server:
# - JSON API for register/login
# - SQLite storage
# - CORS enabled for local frontend

DEBUG_AUTH_ERRORS = os.environ.get("BACKEND_DEBUG_AUTH_ERRORS", "1") not in {"0", "false", "False"}


app = FastAPI(title="hypno-master-backend", version="0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger("hypno-master-backend")
if not logger.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(
        logging.Formatter("%(asctime)s %(levelname)s %(name)s: %(message)s")
    )
    logger.addHandler(handler)
logger.setLevel(logging.INFO)


@app.on_event("startup")
def _startup() -> None:
    init_db()


def _generate_6_digit_code() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def _background_send_verification_code(to_email: str, code: str) -> None:
    try:
        send_verification_code_email(to_email=to_email, code=code)
        logger.info("Queued verification email for %s", to_email)
    except Exception:
        logger.exception("Verification email failed for %s", to_email)


def _background_send_password_change_code(to_email: str, code: str) -> None:
    try:
        send_password_change_code_email(to_email=to_email, code=code)
        logger.info("Queued password-change email for %s", to_email)
    except Exception:
        logger.exception("Password-change email failed for %s", to_email)


async def _read_json_body(request: Request) -> dict[str, Any]:
    raw = await request.body()
    if not raw:
        return {}
    try:
        obj = json.loads(raw.decode("utf-8"))
    except json.JSONDecodeError:
        raise ValueError("invalid_json")
    if not isinstance(obj, dict):
        raise ValueError("invalid_json")
    return obj


@app.get("/health")
async def health() -> dict[str, Any]:
    return {"ok": True}


@app.post("/api/register")
async def register(request: Request, background_tasks: BackgroundTasks) -> JSONResponse:
    try:
        body = await _read_json_body(request)
        name = str(body.get("name", "")).strip()
        email = str(body.get("email", "")).strip()
        password = str(body.get("password", ""))
    except ValueError as e:
        return JSONResponse(status_code=400, content={"ok": False, "error": str(e)})

    if not name or not email or not password:
        return JSONResponse(status_code=400, content={"ok": False, "error": "missing_fields"})
    if len(password) < 8:
        return JSONResponse(status_code=400, content={"ok": False, "error": "weak_password"})

    try:
        user = create_user(name=name, email=email, password=password)
    except ValueError as e:
        if str(e) == "email_already_exists":
            return JSONResponse(status_code=409, content={"ok": False, "error": "email_already_exists"})
        return JSONResponse(status_code=500, content={"ok": False, "error": "server_error"})

    code = _generate_6_digit_code()
    set_user_verification_code(user_id=int(user["id"]), code=code)
    background_tasks.add_task(
        _background_send_verification_code, str(user["email"]), code
    )

    return JSONResponse(
        status_code=201, content={"ok": True, "user": user, "verification_required": True}
    )


@app.post("/api/verify-email")
async def verify_email(request: Request) -> JSONResponse:
    try:
        body = await _read_json_body(request)
        email = str(body.get("email", "")).strip()
        code = str(body.get("code", "")).strip()
    except ValueError as e:
        return JSONResponse(status_code=400, content={"ok": False, "error": str(e)})

    if not email or not code:
        return JSONResponse(status_code=400, content={"ok": False, "error": "missing_fields"})
    if not (len(code) == 6 and code.isdigit()):
        return JSONResponse(status_code=400, content={"ok": False, "error": "invalid_code_format"})

    row = get_user_by_email(email)
    if not row:
        return JSONResponse(status_code=404, content={"ok": False, "error": "user_not_found"})
    if bool(row["email_verified"]):
        return JSONResponse(status_code=200, content={"ok": True, "already_verified": True})

    now = int(time.time())
    expires_at = row["email_verify_code_expires_at"]
    if not expires_at or now > int(expires_at):
        return JSONResponse(status_code=400, content={"ok": False, "error": "code_expired"})

    attempts = int(row["email_verify_code_attempts"] or 0)
    if attempts >= VERIFY_CODE_MAX_ATTEMPTS:
        return JSONResponse(status_code=429, content={"ok": False, "error": "too_many_attempts"})

    ok = verify_verify_code(
        code,
        str(row["email_verify_code_salt"] or ""),
        str(row["email_verify_code_hash"] or ""),
    )
    if not ok:
        with db_connect() as conn:
            conn.execute(
                """
                UPDATE users
                SET email_verify_code_attempts = email_verify_code_attempts + 1
                WHERE id = ?
                """,
                (int(row["id"]),),
            )
        attempts_left = max(0, VERIFY_CODE_MAX_ATTEMPTS - (attempts + 1))
        return JSONResponse(
            status_code=400,
            content={"ok": False, "error": "invalid_code", "attempts_left": attempts_left},
        )

    with db_connect() as conn:
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

    return JSONResponse(status_code=200, content={"ok": True})


@app.post("/api/resend-verification")
async def resend_verification(
    request: Request, background_tasks: BackgroundTasks
) -> JSONResponse:
    try:
        body = await _read_json_body(request)
        email = str(body.get("email", "")).strip()
    except ValueError as e:
        return JSONResponse(status_code=400, content={"ok": False, "error": str(e)})

    if not email:
        return JSONResponse(status_code=400, content={"ok": False, "error": "missing_fields"})

    row = get_user_by_email(email)
    if not row:
        return JSONResponse(status_code=404, content={"ok": False, "error": "user_not_found"})
    if bool(row["email_verified"]):
        return JSONResponse(status_code=200, content={"ok": True, "already_verified": True})

    code = _generate_6_digit_code()
    set_user_verification_code(user_id=int(row["id"]), code=code)
    background_tasks.add_task(
        _background_send_verification_code, str(row["email"]), code
    )

    return JSONResponse(status_code=200, content={"ok": True})


@app.post("/api/request-password-change")
async def request_password_change(
    request: Request, background_tasks: BackgroundTasks
) -> JSONResponse:
    try:
        body = await _read_json_body(request)
        email = str(body.get("email", "")).strip()
        current_password = str(body.get("current_password", ""))
        new_password = str(body.get("new_password", ""))
    except ValueError as e:
        return JSONResponse(status_code=400, content={"ok": False, "error": str(e)})

    if not email or not current_password or not new_password:
        return JSONResponse(status_code=400, content={"ok": False, "error": "missing_fields"})
    if len(new_password) < 8:
        return JSONResponse(status_code=400, content={"ok": False, "error": "weak_password"})

    row = get_user_by_email(email)
    if not row:
        return JSONResponse(status_code=401, content={"ok": False, "error": "invalid_credentials"})

    ok = verify_password(current_password, row["password_salt"], row["password_hash"])
    if not ok:
        return JSONResponse(status_code=401, content={"ok": False, "error": "invalid_credentials"})

    code = _generate_6_digit_code()
    set_password_change_request(
        user_id=int(row["id"]), new_password=new_password, code=code
    )
    background_tasks.add_task(
        _background_send_password_change_code, str(row["email"]), code
    )

    return JSONResponse(status_code=200, content={"ok": True, "verification_required": True})


@app.post("/api/confirm-password-change")
async def confirm_password_change(request: Request) -> JSONResponse:
    try:
        body = await _read_json_body(request)
        email = str(body.get("email", "")).strip()
        code = str(body.get("code", "")).strip()
    except ValueError as e:
        return JSONResponse(status_code=400, content={"ok": False, "error": str(e)})

    if not email or not code:
        return JSONResponse(status_code=400, content={"ok": False, "error": "missing_fields"})
    if not (len(code) == 6 and code.isdigit()):
        return JSONResponse(status_code=400, content={"ok": False, "error": "invalid_code_format"})

    row = get_user_by_email(email)
    if not row:
        return JSONResponse(status_code=404, content={"ok": False, "error": "user_not_found"})

    if not row["pw_change_new_hash"] or not row["pw_change_new_salt"]:
        return JSONResponse(
            status_code=400, content={"ok": False, "error": "no_pending_password_change"}
        )

    now = int(time.time())
    expires_at = row["pw_change_expires_at"]
    if not expires_at or now > int(expires_at):
        return JSONResponse(status_code=400, content={"ok": False, "error": "code_expired"})

    attempts = int(row["pw_change_attempts"] or 0)
    if attempts >= PASSWORD_CHANGE_MAX_ATTEMPTS:
        return JSONResponse(status_code=429, content={"ok": False, "error": "too_many_attempts"})

    ok = verify_verify_code(
        code,
        str(row["pw_change_code_salt"] or ""),
        str(row["pw_change_code_hash"] or ""),
    )
    if not ok:
        with db_connect() as conn:
            conn.execute(
                """
                UPDATE users
                SET pw_change_attempts = pw_change_attempts + 1
                WHERE id = ?
                """,
                (int(row["id"]),),
            )
        attempts_left = max(0, PASSWORD_CHANGE_MAX_ATTEMPTS - (attempts + 1))
        return JSONResponse(
            status_code=400,
            content={"ok": False, "error": "invalid_code", "attempts_left": attempts_left},
        )

    with db_connect() as conn:
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

    return JSONResponse(status_code=200, content={"ok": True})


@app.post("/api/resend-password-change")
async def resend_password_change(
    request: Request, background_tasks: BackgroundTasks
) -> JSONResponse:
    try:
        body = await _read_json_body(request)
        email = str(body.get("email", "")).strip()
    except ValueError as e:
        return JSONResponse(status_code=400, content={"ok": False, "error": str(e)})

    if not email:
        return JSONResponse(status_code=400, content={"ok": False, "error": "missing_fields"})

    row = get_user_by_email(email)
    if not row:
        return JSONResponse(status_code=404, content={"ok": False, "error": "user_not_found"})

    if not row["pw_change_new_hash"] or not row["pw_change_new_salt"]:
        return JSONResponse(
            status_code=400, content={"ok": False, "error": "no_pending_password_change"}
        )

    code = _generate_6_digit_code()
    code_salt_hex, code_digest_hex = hash_verify_code(code)
    now = int(time.time())
    expires_at = now + PASSWORD_CHANGE_TTL_SECONDS
    with db_connect() as conn:
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
    background_tasks.add_task(
        _background_send_password_change_code, str(row["email"]), code
    )

    return JSONResponse(status_code=200, content={"ok": True})


@app.post("/api/login")
async def login(request: Request) -> JSONResponse:
    try:
        body = await _read_json_body(request)
        email = str(body.get("email", "")).strip()
        password = str(body.get("password", ""))
    except ValueError as e:
        return JSONResponse(status_code=400, content={"ok": False, "error": str(e)})

    if not email or not password:
        return JSONResponse(status_code=400, content={"ok": False, "error": "missing_fields"})

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
        payload: dict[str, Any] = {"ok": False, "error": "invalid_credentials"}
        if DEBUG_AUTH_ERRORS:
            payload["detail"] = "user_not_found"
        return JSONResponse(status_code=401, content=payload)

    ok = verify_password(password, row["password_salt"], row["password_hash"])
    if not ok:
        payload = {"ok": False, "error": "invalid_credentials"}
        if DEBUG_AUTH_ERRORS:
            payload["detail"] = "wrong_password"
        return JSONResponse(status_code=401, content=payload)

    user = {
        "id": int(row["id"]),
        "name": row["name"],
        "email": row["email"],
        "email_verified": bool(row["email_verified"]),
    }

    if not bool(user["email_verified"]):
        return JSONResponse(status_code=403, content={"ok": False, "error": "email_not_verified"})

    return JSONResponse(status_code=200, content={"ok": True, "user": user})


def main() -> None:
    host = os.environ.get("BACKEND_HOST", "127.0.0.1")
    port = int(os.environ.get("BACKEND_PORT", "8000"))
    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    main()
