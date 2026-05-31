from pydantic import BaseModel, Field


class LearnerMemory(BaseModel):
    user_id: str = "demo-user"
    current_level: str = "A1"
    goal: str = "Pass Goethe A1"
    known_vocabulary: list[str] = Field(default_factory=list)
    weak_topics: list[str] = Field(default_factory=lambda: ["articles", "verb conjugation"])
    mistakes: list[str] = Field(default_factory=list)
    grammar_gaps: list[str] = Field(default_factory=list)
    study_hours: float = 0
    streak_days: int = 0
    speaking_score: int = 42
    writing_score: int = 48
    listening_score: int = 44
    reading_score: int = 52


class MemoryStore:
    def __init__(self) -> None:
        self._items: dict[str, LearnerMemory] = {"demo-user": LearnerMemory()}

    def get(self, user_id: str) -> LearnerMemory:
        if user_id not in self._items:
            self._items[user_id] = LearnerMemory(user_id=user_id)
        return self._items[user_id]

    def update(self, user_id: str, patch: dict) -> LearnerMemory:
        current = self.get(user_id).model_dump()
        for key, value in patch.items():
            if key in current:
                current[key] = value
        self._items[user_id] = LearnerMemory(**current)
        return self._items[user_id]


memory_store = MemoryStore()

