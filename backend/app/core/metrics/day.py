from datetime import datetime

from app.models import DayProgress


class DayMetrics:
    @staticmethod
    def day_progress():
        now = datetime.now()
        total_seconds = 24 * 60 * 60
        elapsed_seconds = now.hour * 3600 + now.minute * 60 + now.second

        passed_percent = (elapsed_seconds / total_seconds) * 100
        remaining_percent = 100 - passed_percent

        day_progress = DayProgress(
            passed=round(passed_percent, 2),
            remain=round(remaining_percent, 2),
            timestamp=now.timestamp(),
        )

        return day_progress
