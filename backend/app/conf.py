from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class AppConfiguration(BaseSettings):
    """Application configuration class"""

    model_config = SettingsConfigDict(env_file=".env")

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int


@lru_cache
def get_app_conf() -> AppConfiguration:
    """Provides AppConfiguration instance"""
    return AppConfiguration()  # type: ignore
