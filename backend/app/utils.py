import bcrypt

from app.models import UserAccount

USERS = [
    {
        "username": "admin",
        "password": "admin",
    }
]


def generate_users():
    return [
        UserAccount(
            username=user["username"],
            password=bcrypt.hashpw(user["password"].encode(), bcrypt.gensalt()).decode())
        for user in USERS
    ]
