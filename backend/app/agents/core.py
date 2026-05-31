from pydantic import BaseModel
from app.services.ai_provider import AIProvider
from app.services.rag import knowledge_base


class AgentResponse(BaseModel):
    agent: str
    answer: str
    sources: list[dict] = []
    actions: list[str] = []


class BaseAgent:
    name = "Base Agent"
    role = "AI German learning assistant"

    def __init__(self, provider: AIProvider | None = None) -> None:
        self.provider = provider or AIProvider()

    async def run(self, message: str, memory: dict | None = None) -> AgentResponse:
        sources = knowledge_base.search(message)
        system = f"You are {self.name}. Role: {self.role}. Teach German with English and Hindi support. Be accurate, A1-C2 aware, practical, motivating, and concise."
        user = f"Student memory: {memory or {}}\nKnowledge snippets: {sources}\nRequest: {message}"
        answer = await self.provider.complete(system, user)
        return AgentResponse(agent=self.name, answer=answer, sources=sources, actions=self.actions())

    def actions(self) -> list[str]:
        return []


class GermanTeacherAgent(BaseAgent):
    name = "German Teacher Agent"
    role = "Explain grammar, vocabulary, examples, lessons, doubts, and German-to-Hindi meaning."

    def actions(self) -> list[str]:
        return ["generate_lesson", "explain_grammar", "create_examples"]


class PronunciationCoach(BaseAgent):
    name = "Pronunciation Coach"
    role = "Analyze pronunciation, provide IPA guidance, score fluency, confidence, rhythm, and accent clarity."

    def actions(self) -> list[str]:
        return ["speech_to_text", "ipa_feedback", "speaking_score"]


class ConversationPartner(BaseAgent):
    name = "Conversation Partner"
    role = "Run roleplays for restaurants, airports, hotels, university, jobs, shopping, doctors, and travel."

    def actions(self) -> list[str]:
        return ["roleplay", "german_only_mode", "scenario_practice"]


class ExamEvaluator(BaseAgent):
    name = "Exam Evaluator"
    role = "Evaluate Goethe-style reading, listening, writing, and speaking with scores and correction rubrics."

    def actions(self) -> list[str]:
        return ["score_exam", "evaluate_writing", "evaluate_speaking"]


class LearningPlanner(BaseAgent):
    name = "Learning Planner"
    role = "Create adaptive 30, 60, and 90 day plans from goals, available time, level, and exam target."

    def actions(self) -> list[str]:
        return ["create_roadmap", "track_goals", "predict_readiness"]


class MotivationCoach(BaseAgent):
    name = "Motivation Coach"
    role = "Give daily motivation, streak support, study reminders, and confidence coaching."

    def actions(self) -> list[str]:
        return ["daily_motivation", "streak_nudge", "habit_coaching"]


class MemoryAgent(BaseAgent):
    name = "Memory Agent"
    role = "Remember vocabulary, mistakes, weak topics, grammar gaps, conversations, tests, and study habits."

    def actions(self) -> list[str]:
        return ["store_memory", "retrieve_profile", "personalize_next_lesson"]

