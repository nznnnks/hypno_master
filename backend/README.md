# backend

Dev-only Python backend with SQLite storage for user registration and login.

## Email settings

SMTP settings live in `backend/settings.py`. Create file settings.py and fill SMTP strings

- EMAIL_HOST = 'smtp.yandex.ru' #addres
- EMAIL_PORT = 465
- EMAIL_USE_SSL = True
- EMAIL_HOST_USER = 'your_mail' 
- EMAIL_HOST_PASSWORD = 'your_password'


## Email verification API

- `POST /api/register` -> sends a 6-digit email verification code
- `POST /api/verify-email` with `{ "email": "...", "code": "123456" }`
- `POST /api/resend-verification` with `{ "email": "..." }`

## Run

```powershell
cd backend
python .\server.py
```

Server listens on `http://localhost:8000`.

SQLite DB file is created in `backend/db_data/app.sqlite3`.
