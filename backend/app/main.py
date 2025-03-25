import uvicorn

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from app import utils
from app.conf import get_app_conf
from app.api.routers import api_router
from app.repositories.user.memory import MemoryUserRepository
from app.security.oauth import AppSecurity


app_conf = get_app_conf()


def configure_example_app() -> FastAPI:
    example_users = utils.generate_users()
    user_repository = MemoryUserRepository(users=example_users)

    AppSecurity.configure(
        secret=app_conf.SECRET_KEY,
        algorithm=app_conf.ALGORITHM,
        token_expiration=app_conf.ACCESS_TOKEN_EXPIRE_MINUTES,
        user_repository=user_repository,
    )

    _app = FastAPI()

    _app.include_router(api_router)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins="*",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return _app


app = configure_example_app()


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
