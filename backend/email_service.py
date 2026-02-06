from __future__ import annotations

import smtplib
import ssl
from email.message import EmailMessage

import settings
from db import PASSWORD_CHANGE_TTL_SECONDS, VERIFY_CODE_TTL_SECONDS


class EmailConfigError(Exception):
    pass


class EmailSendError(Exception):
    def __init__(self, *, detail: str) -> None:
        super().__init__("email_send_failed")
        self.detail = detail


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


def send_verification_code_email(*, to_email: str, code: str) -> None:
    _send_code_email(
        to_email=to_email,
        subject="Код подтверждения регистрации",
        code=code,
        ttl_seconds=VERIFY_CODE_TTL_SECONDS,
    )


def send_password_change_code_email(*, to_email: str, code: str) -> None:
    _send_code_email(
        to_email=to_email,
        subject="Код смены пароля",
        code=code,
        ttl_seconds=PASSWORD_CHANGE_TTL_SECONDS,
    )
