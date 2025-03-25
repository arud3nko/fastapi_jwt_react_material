from typing import Annotated

from fastapi import APIRouter, Depends

from app.models import DayProgress, User
from app.security.oauth import AppSecurity

from app.core.metrics.day import DayMetrics

metrics = APIRouter()


@metrics.get("/day/progress/", response_model=DayProgress)
async def get_metrics_day_progress(
    _secure: Annotated[User, Depends(AppSecurity.get_current_user)],
    day_progress: Annotated[DayProgress, Depends(DayMetrics.day_progress)],
):
    return day_progress
