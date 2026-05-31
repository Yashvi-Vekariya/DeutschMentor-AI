from typing import Literal
from pydantic import BaseModel


Level = Literal["A1", "A2", "B1", "B2", "C1", "C2"]


class VocabularyItem(BaseModel):
    german: str
    english: str
    hindi: str
    ipa: str


class Lesson(BaseModel):
    id: str
    module_id: str
    level: Level
    title: str
    topic_explanation: str
    vocabulary: list[VocabularyItem]
    examples: list[str]
    pronunciation_guide: str
    practice_questions: list[str]
    speaking_exercise: str
    writing_exercise: str
    quiz: list[str]
    homework: str
    revision: str


class Module(BaseModel):
    id: str
    level: Level
    title: str
    goethe_topics: list[str]
    lessons: list[Lesson]


def lesson(module_id: str, title: str, vocab: list[tuple[str, str, str, str]], topics: list[str]) -> Lesson:
    slug = title.lower().replace(" ", "-").replace("/", "-")
    words = [VocabularyItem(german=g, english=e, hindi=h, ipa=ipa) for g, e, h, ipa in vocab]
    return Lesson(
        id=f"{module_id}-{slug}",
        module_id=module_id,
        level="A1",
        title=title,
        topic_explanation=f"This A1 lesson teaches {title}. You learn the core phrases, sentence patterns, cultural usage, and exam-safe forms needed for Goethe A1 communication.",
        vocabulary=words,
        examples=[
            f"{words[0].german}! Ich lerne Deutsch.",
            "Ich komme aus Indien und wohne in Berlin.",
            "Konnen Sie das bitte wiederholen?",
        ],
        pronunciation_guide="Speak clearly, keep German vowels stable, and pronounce final consonants. Use the IPA hints beside each word.",
        practice_questions=[
            "Translate the first five words into English and Hindi.",
            "Build three short German sentences using today's vocabulary.",
            "Choose the correct article: der, die, or das.",
        ],
        speaking_exercise=f"Record a 45 second answer using at least five words from {title}.",
        writing_exercise=f"Write six A1 sentences about {title}.",
        quiz=[
            "What does 'Ich heisse...' mean?",
            "Which verb form matches 'du'?",
            "Write one polite question in German.",
        ],
        homework="Review flashcards twice, complete one roleplay, and write a short paragraph.",
        revision="Repeat the vocabulary aloud, then answer the practice questions without looking.",
    )


A1_MODULES: list[Module] = [
    Module(id="m01", level="A1", title="German Alphabet", goethe_topics=["letters", "sounds", "spelling name"], lessons=[lesson("m01", "Alphabet and Sounds", [("A", "A", "ए", "a"), ("B", "B", "बे", "be"), ("Umlaut", "umlaut", "उमलाउट", "um-laut")], ["letters"])]),
    Module(id="m02", level="A1", title="Greetings", goethe_topics=["formal greetings", "informal greetings", "farewells"], lessons=[lesson("m02", "Greetings and Farewells", [("Hallo", "hello", "नमस्ते", "ha-lo"), ("Guten Morgen", "good morning", "सुप्रभात", "gu-ten mor-gen"), ("Auf Wiedersehen", "goodbye", "फिर मिलेंगे", "auf vee-der-zey-en")], ["greetings"])]),
    Module(id="m03", level="A1", title="Introducing Yourself", goethe_topics=["name", "country", "age", "profession"], lessons=[lesson("m03", "Self Introduction", [("Ich heisse", "I am called", "मेरा नाम है", "ikh hai-se"), ("Ich komme aus", "I come from", "मैं से आता/आती हूँ", "ikh ko-me aus"), ("Beruf", "profession", "पेशा", "be-roof")], ["introduction"])]),
    Module(id="m04", level="A1", title="Numbers", goethe_topics=["0-1000", "prices", "phone numbers"], lessons=[lesson("m04", "Numbers 0 to 1000", [("null", "zero", "शून्य", "nul"), ("eins", "one", "एक", "ains"), ("hundert", "hundred", "सौ", "hun-dert")], ["numbers"])]),
    Module(id="m05", level="A1", title="Days Months Time", goethe_topics=["weekday", "month", "clock time", "appointments"], lessons=[lesson("m05", "Time and Calendar", [("Montag", "Monday", "सोमवार", "mon-tak"), ("Januar", "January", "जनवरी", "ya-noo-ar"), ("Uhr", "o'clock", "बजे", "oor")], ["time"])]),
    Module(id="m06", level="A1", title="Family", goethe_topics=["family members", "relationships", "possessives"], lessons=[lesson("m06", "Family and Possessives", [("Mutter", "mother", "माँ", "mut-ter"), ("Vater", "father", "पिता", "fah-ter"), ("meine", "my feminine/plural", "मेरी", "my-ne")], ["family"])]),
    Module(id="m07", level="A1", title="Food", goethe_topics=["meals", "ordering", "likes"], lessons=[lesson("m07", "Food and Ordering", [("Brot", "bread", "रोटी/ब्रेड", "brot"), ("Wasser", "water", "पानी", "vas-ser"), ("Ich mochte", "I would like", "मैं चाहूँगा/चाहूँगी", "ikh mush-te")], ["food"])]),
    Module(id="m08", level="A1", title="Shopping", goethe_topics=["prices", "sizes", "payment"], lessons=[lesson("m08", "Shopping and Prices", [("Wie viel kostet das?", "How much does it cost?", "यह कितने का है?", "vee feel kos-tet das"), ("billig", "cheap", "सस्ता", "bil-likh"), ("teuer", "expensive", "महंगा", "toy-er")], ["shopping"])]),
    Module(id="m09", level="A1", title="Travel", goethe_topics=["transport", "tickets", "directions"], lessons=[lesson("m09", "Travel and Directions", [("Bahnhof", "train station", "रेलवे स्टेशन", "bahn-hof"), ("Flughafen", "airport", "हवाई अड्डा", "flook-hah-fen"), ("Fahrkarte", "ticket", "टिकट", "far-kar-te")], ["travel"])]),
    Module(id="m10", level="A1", title="Home", goethe_topics=["rooms", "furniture", "rent"], lessons=[lesson("m10", "Home and Rooms", [("Wohnung", "apartment", "फ्लैट", "vo-nung"), ("Zimmer", "room", "कमरा", "tsim-mer"), ("Kuche", "kitchen", "रसोई", "ku-khe")], ["home"])]),
    Module(id="m11", level="A1", title="School", goethe_topics=["classroom", "learning", "course"], lessons=[lesson("m11", "School and Course", [("Schule", "school", "स्कूल", "shoo-le"), ("Kurs", "course", "कोर्स", "koors"), ("lernen", "to learn", "सीखना", "ler-nen")], ["school"])]),
    Module(id="m12", level="A1", title="Work", goethe_topics=["jobs", "workplace", "schedule"], lessons=[lesson("m12", "Work and Professions", [("Arbeit", "work", "काम", "ar-bait"), ("Lehrer", "teacher", "शिक्षक", "lay-rer"), ("Buro", "office", "ऑफिस", "bu-ro")], ["work"])]),
    Module(id="m13", level="A1", title="Health", goethe_topics=["body", "doctor", "symptoms"], lessons=[lesson("m13", "Health and Doctor", [("Arzt", "doctor", "डॉक्टर", "artst"), ("Kopf", "head", "सिर", "kopf"), ("Schmerzen", "pain", "दर्द", "shmer-tsen")], ["health"])]),
    Module(id="m14", level="A1", title="Weather", goethe_topics=["weather", "seasons", "small talk"], lessons=[lesson("m14", "Weather and Seasons", [("Wetter", "weather", "मौसम", "vet-ter"), ("Sonne", "sun", "सूरज", "zon-ne"), ("Regen", "rain", "बारिश", "ray-gen")], ["weather"])]),
    Module(id="m15", level="A1", title="Basic Grammar", goethe_topics=["articles", "nouns", "verbs", "nominative", "accusative"], lessons=[lesson("m15", "Articles Nouns Verbs Cases", [("der", "the masculine", "पुल्लिंग the", "dehr"), ("die", "the feminine/plural", "स्त्रीलिंग/बहुवचन the", "dee"), ("das", "the neuter", "नपुंसक the", "das")], ["grammar"])]),
    Module(id="m16", level="A1", title="Sentence Building", goethe_topics=["word order", "questions", "negation"], lessons=[lesson("m16", "A1 Sentence Patterns", [("ich", "I", "मैं", "ikh"), ("du", "you informal", "तुम", "doo"), ("nicht", "not", "नहीं", "nikht")], ["sentences"])]),
    Module(id="m17", level="A1", title="Reading Practice", goethe_topics=["notices", "emails", "forms"], lessons=[lesson("m17", "Reading Goethe A1 Texts", [("Anzeige", "advertisement", "विज्ञापन", "an-tsai-ge"), ("E-Mail", "email", "ईमेल", "ee-mail"), ("Formular", "form", "फॉर्म", "for-mu-lar")], ["reading"])]),
    Module(id="m18", level="A1", title="Listening Practice", goethe_topics=["announcements", "dialogues", "phone"], lessons=[lesson("m18", "Listening Goethe A1 Audio", [("Durchsage", "announcement", "घोषणा", "durkh-zah-ge"), ("Dialog", "dialogue", "संवाद", "dee-a-log"), ("Telefon", "telephone", "फोन", "te-le-fon")], ["listening"])]),
    Module(id="m19", level="A1", title="Writing Practice", goethe_topics=["forms", "short email", "invitation"], lessons=[lesson("m19", "A1 Writing Tasks", [("Brief", "letter", "पत्र", "brief"), ("Einladung", "invitation", "निमंत्रण", "ain-la-dung"), ("Antwort", "answer", "उत्तर", "ant-vort")], ["writing"])]),
    Module(id="m20", level="A1", title="Speaking Practice", goethe_topics=["introduce", "ask-answer", "request"], lessons=[lesson("m20", "A1 Speaking Exam", [("bitte", "please", "कृपया", "bit-te"), ("Frage", "question", "प्रश्न", "frah-ge"), ("antworten", "to answer", "उत्तर देना", "ant-vor-ten")], ["speaking"])]),
]


def all_lessons() -> list[Lesson]:
    return [item for module in A1_MODULES for item in module.lessons]

