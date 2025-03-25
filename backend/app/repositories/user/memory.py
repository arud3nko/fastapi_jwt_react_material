from dataclasses import dataclass
from typing import List, Mapping

from app.models import UserAccount
from app.repositories.user.base import UserRepository


@dataclass
class NormalizableUsers:
    entities: List[UserAccount]

    @property
    def normalized(self) -> Mapping[str, UserAccount]:
        return {user.username: user for user in self.entities}


class MemoryUserRepository(UserRepository):
    def __init__(self, users: List[UserAccount]):
        self.__users = NormalizableUsers(entities=users)

    async def get_user(self, username: str) -> UserAccount | None:
        return self.__users.normalized.get(username)
