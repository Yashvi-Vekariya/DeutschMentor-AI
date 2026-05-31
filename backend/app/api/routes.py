from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.registry import AGENTS, get_agent
from app.data.curriculum import A1_MODULES, all_lessons
from app.services.evaluation import correct_german, generate_exam
from app.services.memory import memory_store
from app.services.planner import create_plan
from app.services.rag import knowledge_base

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    mode: str = "teacher"
    user_id: str = "demo-user"


class PlanRequest(BaseModel):
    level: str = "absolute beginner"
    goal: str = "Pass Goethe A1"
    exam_target: str = "Goethe A1"
    hours_per_week: int = 7


class CorrectionRequest(BaseModel):
    text: str


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "product": "DeutschMentor AI", "agents": list(AGENTS)}


@router.get("/curriculum/a1")
def curriculum() -> dict:
    return {"modules": [module.model_dump() for module in A1_MODULES], "lesson_count": len(all_lessons())}


@router.get("/lessons/{lesson_id}")
def lesson_detail(lesson_id: str) -> dict:
    for item in all_lessons():
        if item.id == lesson_id:
            return item.model_dump()
    return all_lessons()[0].model_dump()


@router.post("/chat")
async def chat(payload: ChatRequest) -> dict:
    memory = memory_store.get(payload.user_id).model_dump()
    agent = get_agent(payload.mode)
    response = await agent.run(payload.message, memory)
    return response.model_dump()


@router.post("/planner")
def planner(payload: PlanRequest) -> dict:
    return create_plan(payload.level, payload.goal, payload.exam_target, payload.hours_per_week)


@router.get("/memory/{user_id}")
def memory(user_id: str) -> dict:
    return memory_store.get(user_id).model_dump()


@router.patch("/memory/{user_id}")
def update_memory(user_id: str, patch: dict) -> dict:
    return memory_store.update(user_id, patch).model_dump()


@router.get("/rag/search")
def rag_search(q: str) -> dict:
    return {"results": knowledge_base.search(q)}


@router.post("/correction")
def correction(payload: CorrectionRequest) -> dict:
    return correct_german(payload.text)


@router.get("/exam/goethe-a1")
def exam() -> dict:
    return generate_exam("A1")

@router.get("/dashboard/demo")
def dashboard() -> dict:
    memory = memory_store.get("demo-user")
    return {
        "current_level": memory.current_level,
        "progress_percent": 37,
        "vocabulary_learned": len(memory.known_vocabulary) or 148,
        "grammar_mastery": 46,
        "speaking_score": memory.speaking_score,
        "writing_score": memory.writing_score,
        "listening_score": memory.listening_score,
        "reading_score": memory.reading_score,
        "study_hours": memory.study_hours or 18.5,
        "weak_areas": memory.weak_topics,
        "strong_areas": ["greetings", "numbers", "family vocabulary"],
        "xp": 2840,
        "streak_days": memory.streak_days or 9,
        "rank": "A1 Explorer",
    }

