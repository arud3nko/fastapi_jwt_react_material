from abc import ABC, abstractmethod

from app.models import UserAccount


class UserRepository(ABC):
    @abstractmethod
    async def get_user(self, username: str) -> UserAccount | None:
        pass
