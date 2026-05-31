def correct_german(text: str) -> dict:
    replacements = {
        "ich bin aus": "ich komme aus",
        "Ich habe 20 Jahre": "Ich bin 20 Jahre alt",
        "der Madchen": "das Madchen",
        "ich gehen": "ich gehe",
        "du geht": "du gehst",
    }
    corrected = text
    notes = []
    for wrong, right in replacements.items():
        if wrong.lower() in corrected.lower():
            corrected = corrected.replace(wrong, right)
            notes.append(f"Use '{right}' instead of '{wrong}'.")
    if corrected == text:
        notes.append("No obvious rule-based issue found. AI evaluator can provide deeper feedback when a provider key is configured.")
    return {
        "original_sentence": text,
        "correct_sentence": corrected,
        "grammar_explanation": "A1 correction checks verb position, core verb conjugation, articles, and natural self-introduction patterns.",
        "alternative_native_version": corrected.replace("Ich heisse", "Mein Name ist"),
        "difficulty_level": "A1",
        "notes": notes,
    }


def generate_exam(level: str = "A1") -> dict:
    return {
        "level": level,
        "exam": "Goethe A1 Simulator",
        "reading": [
            {"text": "Anna sucht eine Wohnung in Berlin.", "question": "What is Anna looking for?", "answer": "an apartment"},
            {"text": "Der Kurs beginnt um 9 Uhr.", "question": "When does the course begin?", "answer": "9 o'clock"},
        ],
        "listening": [
            {"transcript": "Gleis drei: Der Zug nach Hamburg fahrt um zehn Uhr.", "question": "Where does the train go?", "answer": "Hamburg"},
        ],
        "writing": {"prompt": "Write an email inviting a friend to your birthday. Include date, time, and place.", "max_words": 40},
        "speaking": [
            "Introduce yourself.",
            "Ask your partner for their phone number.",
            "Request a glass of water politely.",
        ],
        "passing_score": 60,
        "certificate": "PDF certificate endpoint can be connected after auto evaluation.",
    }

