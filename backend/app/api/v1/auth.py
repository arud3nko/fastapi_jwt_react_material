from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.models import User, UserAccount
from app.security.token import Token
from app.security.oauth import AppSecurity

auth = APIRouter()


@auth.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:

    user = await AppSecurity.authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = AppSecurity.create_access_token(data={"sub": user.username})

    return Token(access_token=access_token, token_type="bearer")


@auth.get("/me", response_model=User)
async def read_own_items(
    current_user: Annotated[UserAccount, Depends(AppSecurity.get_current_user)],
) -> User:

    user = User(username=current_user.username)

    return user
