import math
from collections import Counter
from app.data.curriculum import A1_MODULES, all_lessons


def tokenize(text: str) -> list[str]:
    return [word.lower().strip(".,!?;:()") for word in text.split() if word.strip()]


def cosine(a: Counter, b: Counter) -> float:
    common = set(a) & set(b)
    numerator = sum(a[x] * b[x] for x in common)
    denom = math.sqrt(sum(v * v for v in a.values())) * math.sqrt(sum(v * v for v in b.values()))
    return numerator / denom if denom else 0.0


class KnowledgeBase:
    def __init__(self) -> None:
        self.documents = []
        for module in A1_MODULES:
            self.documents.append({"id": module.id, "type": "module", "title": module.title, "text": " ".join(module.goethe_topics)})
        for lesson in all_lessons():
            vocab = " ".join([f"{v.german} {v.english} {v.hindi}" for v in lesson.vocabulary])
            self.documents.append({"id": lesson.id, "type": "lesson", "title": lesson.title, "text": f"{lesson.topic_explanation} {vocab} {' '.join(lesson.examples)}"})
        self.index = [(doc, Counter(tokenize(doc["title"] + " " + doc["text"]))) for doc in self.documents]

    def search(self, query: str, limit: int = 5) -> list[dict]:
        q = Counter(tokenize(query))
        ranked = sorted(((cosine(q, vec), doc) for doc, vec in self.index), key=lambda item: item[0], reverse=True)
        return [{"score": round(score, 4), **doc} for score, doc in ranked[:limit]]


knowledge_base = KnowledgeBase()

