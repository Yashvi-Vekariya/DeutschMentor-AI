def create_plan(level: str, goal: str, exam_target: str, hours_per_week: int) -> dict:
    daily_minutes = max(20, round((hours_per_week * 60) / 6))
    focus = ["vocabulary", "grammar", "speaking", "listening", "writing", "revision"]
    plans = {}
    for days in [30, 60, 90]:
        plans[f"{days}_day_plan"] = [
            {
                "week": week,
                "theme": focus[(week - 1) % len(focus)],
                "daily_minutes": daily_minutes,
                "targets": [
                    f"Complete {min(5, week + 1)} lessons",
                    "Do one speaking recording",
                    "Review weak grammar from memory",
                    "Take a mini Goethe checkpoint",
                ],
            }
            for week in range(1, days // 7 + 1)
        ]
    return {
        "level": level,
        "goal": goal,
        "exam_target": exam_target,
        "hours_per_week": hours_per_week,
        "adaptive_rule": "Increase speaking and writing if exam score drops below 70%; accelerate vocabulary if quiz accuracy stays above 85%.",
        **plans,
    }

