from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr

from auth import create_access_token, decode_token, hash_password, verify_password
from db import get_connection, init_db

app = FastAPI(title="TrainECG API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    user_type: str
    institution: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    user_type: str
    institution: Optional[str] = None
    created_at: str


@app.on_event("startup")
def on_startup() -> None:
    init_db()


def _get_user_by_email(email: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cursor.fetchone()
    conn.close()
    return row


def _get_user_by_id(user_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    return row


def _create_user(data: RegisterRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO users (name, email, password_hash, user_type, institution, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            data.name,
            data.email,
            hash_password(data.password),
            data.user_type,
            data.institution,
            datetime.utcnow().isoformat(),
        ),
    )
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()
    return user_id


def _row_to_user(row) -> UserResponse:
    return UserResponse(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        user_type=row["user_type"],
        institution=row["institution"],
        created_at=row["created_at"],
    )


async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserResponse:
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token invalido")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token invalido")

    row = _get_user_by_id(int(user_id))
    if not row:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no encontrado")

    return _row_to_user(row)


@app.post("/auth/register", response_model=TokenResponse)
def register(data: RegisterRequest):
    if len(data.password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="La contrasena debe tener maximo 72 bytes",
        )
    if _get_user_by_email(data.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El email ya esta registrado")

    user_id = _create_user(data)
    token = create_access_token(str(user_id))
    return TokenResponse(access_token=token)


@app.post("/auth/login", response_model=TokenResponse)
def login(data: LoginRequest):
    row = _get_user_by_email(data.email)
    if not row or not verify_password(data.password, row["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales invalidas")

    token = create_access_token(str(row["id"]))
    return TokenResponse(access_token=token)


@app.get("/auth/me", response_model=UserResponse)
def me(current_user: UserResponse = Depends(get_current_user)):
    return current_user
