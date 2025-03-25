from fastapi import APIRouter

from app.api.v1.auth import auth
from app.api.v1.metrics import metrics

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(auth, prefix="/auth")
v1_router.include_router(metrics, prefix="/metrics")
