from app.agents.core import (
    ConversationPartner,
    ExamEvaluator,
    GermanTeacherAgent,
    LearningPlanner,
    MemoryAgent,
    MotivationCoach,
    PronunciationCoach,
)


AGENTS = {
    "teacher": GermanTeacherAgent,
    "pronunciation": PronunciationCoach,
    "conversation": ConversationPartner,
    "exam": ExamEvaluator,
    "planner": LearningPlanner,
    "motivation": MotivationCoach,
    "memory": MemoryAgent,
}


def get_agent(agent_name: str):
    return AGENTS.get(agent_name, GermanTeacherAgent)()

