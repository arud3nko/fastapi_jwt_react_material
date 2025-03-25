from datetime import timedelta, timezone, datetime
from typing import Annotated

import bcrypt
import jwt

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError

from app.repositories.user.base import UserRepository

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


class AppSecurity:
    __secret: bytes
    __algorithm: str
    __token_expiration: int
    __user_repository: UserRepository

    @classmethod
    def configure(cls, secret: str, algorithm: str, token_expiration: int, user_repository: UserRepository):
        cls.__secret = secret.encode("utf-8")
        cls.__algorithm = algorithm
        cls.__token_expiration = token_expiration
        cls.__user_repository = user_repository

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str):
        return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

    @classmethod
    def get_password_hash(cls, password: bytes):
        return bcrypt.hashpw(password, salt=bcrypt.gensalt())

    @classmethod
    async def authenticate_user(cls, username: str, password: str):
        user = await cls.__user_repository.get_user(username)

        if not user:
            return False
        if not cls.verify_password(password, user.password):
            return False

        return user

    @classmethod
    def create_access_token(cls, data: dict):
        to_encode = data.copy()

        expire = datetime.now(timezone.utc) + timedelta(minutes=cls.__token_expiration)

        to_encode.update({"exp": expire})

        encoded_jwt = jwt.encode(to_encode, cls.__secret, algorithm=cls.__algorithm)

        return encoded_jwt

    @classmethod
    async def get_current_user(cls, token: Annotated[str, Depends(oauth2_scheme)]):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

        try:
            payload = jwt.decode(token, cls.__secret, algorithms=[cls.__algorithm])
            username = payload.get("sub")
            if username is None:
                raise credentials_exception
        except InvalidTokenError:
            raise credentials_exception

        user = await cls.__user_repository.get_user(username)

        if user is None:
            raise credentials_exception

        return user
