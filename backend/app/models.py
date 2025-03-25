from pydantic import BaseModel


class User(BaseModel):
    username: str


class UserAccount(User):
    password: str


class DayProgress(BaseModel):
    passed: float
    remain: float
    timestamp: float
