"use client";

import {
  Award,
  BarChart3,
  BookOpenCheck,
  Bot,
  Brain,
  CalendarDays,
  CheckCircle2,
  FileText,
  Flame,
  Globe2,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  Lock,
  Mic2,
  Play,
  Search,
  Send,
  Settings,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Volume2,
  Wand2
} from "lucide-react";
import { useMemo, useState } from "react";
import { agents, dashboard, modules, roadmap } from "@/lib/data";
import { MetricCard } from "@/components/metric-card";
import { ProgressRing } from "@/components/progress-ring";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001/api";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "learn", label: "Learn", icon: BookOpenCheck },
  { id: "chat", label: "AI Tutor", icon: Bot },
  { id: "voice", label: "Voice Coach", icon: Mic2 },
  { id: "exam", label: "Exam", icon: Trophy },
  { id: "flashcards", label: "Flashcards", icon: Brain },
  { id: "planner", label: "Planner", icon: CalendarDays },
  { id: "memory", label: "Memory", icon: Target },
  { id: "settings", label: "Settings", icon: Settings }
];

const lessonDetails = [
  {
    title: "Greetings and Farewells",
    level: "A1",
    vocabulary: [
      ["Hallo", "Hello", "नमस्ते"],
      ["Guten Morgen", "Good morning", "सुप्रभात"],
      ["Auf Wiedersehen", "Goodbye", "फिर मिलेंगे"]
    ],
    explanation: "Use informal greetings with friends and formal greetings in offices, schools, and exam roleplays.",
    task: "Introduce yourself and greet your examiner politely."
  },
  {
    title: "Articles der, die, das",
    level: "A1",
    vocabulary: [
      ["der Mann", "the man", "आदमी"],
      ["die Frau", "the woman", "महिला"],
      ["das Kind", "the child", "बच्चा"]
    ],
    explanation: "German nouns have grammatical gender. Learn every noun with its article from day one.",
    task: "Write five nouns with article and make one sentence with each."
  },
  {
    title: "Self Introduction",
    level: "A1",
    vocabulary: [
      ["Ich heisse", "I am called", "मेरा नाम है"],
      ["Ich komme aus", "I come from", "मैं से आता/आती हूँ"],
      ["Ich wohne in", "I live in", "मैं में रहता/रहती हूँ"]
    ],
    explanation: "This is the most important Goethe A1 speaking pattern.",
    task: "Record a 45 second introduction with name, country, city, age, and profession."
  }
];

const flashcards = [
  { front: "Ich mochte Wasser.", back: "I would like water. / मैं पानी चाहूँगा।", tag: "Restaurant", box: 1 },
  { front: "Wie viel kostet das?", back: "How much does that cost? / यह कितने का है?", tag: "Shopping", box: 2 },
  { front: "Konnen Sie das bitte wiederholen?", back: "Can you please repeat that? / क्या आप दोहरा सकते हैं?", tag: "Exam", box: 1 },
  { front: "Ich komme aus Indien.", back: "I come from India. / मैं भारत से आता/आती हूँ।", tag: "Introduction", box: 3 },
  { front: "Der Zug fahrt um neun Uhr.", back: "The train leaves at nine. / ट्रेन नौ बजे जाती है।", tag: "Travel", box: 2 },
  { front: "Ich habe Kopfschmerzen.", back: "I have a headache. / मेरे सिर में दर्द है।", tag: "Doctor", box: 1 },
  { front: "Das ist meine Mutter.", back: "This is my mother. / यह मेरी माँ हैं।", tag: "Family", box: 2 },
  { front: "Heute ist das Wetter schon.", back: "Today the weather is nice. / आज मौसम अच्छा है।", tag: "Weather", box: 1 },
  { front: "Ich arbeite als Entwickler.", back: "I work as a developer. / मैं डेवलपर के रूप में काम करता/करती हूँ।", tag: "Work", box: 3 },
  { front: "Wo ist der Bahnhof?", back: "Where is the train station? / रेलवे स्टेशन कहाँ है?", tag: "Travel", box: 1 },
  { front: "Ich lerne jeden Tag Deutsch.", back: "I learn German every day. / मैं हर दिन जर्मन सीखता/सीखती हूँ।", tag: "Habit", box: 2 },
  { front: "Haben Sie einen Termin frei?", back: "Do you have an appointment available? / क्या आपके पास अपॉइंटमेंट है?", tag: "Doctor", box: 1 }
];

const examSections = [
  {
    name: "Reading",
    duration: "25 min",
    tasks: [
      "Read a short notice and identify date, time, and location.",
      "Read an email invitation and choose the correct response.",
      "Match five signs with everyday situations."
    ],
    sample: "Der Deutschkurs beginnt am Montag um 9 Uhr in Raum 204.",
    question: "When does the German course begin?",
    answer: "Monday at 9 o'clock"
  },
  {
    name: "Listening",
    duration: "20 min",
    tasks: [
      "Listen to train station announcements.",
      "Understand phone numbers and appointment times.",
      "Choose correct information from short dialogues."
    ],
    sample: "Gleis drei: Der Zug nach Hamburg fahrt um zehn Uhr.",
    question: "Where does the train go?",
    answer: "Hamburg"
  },
  {
    name: "Writing",
    duration: "20 min",
    tasks: [
      "Fill a personal information form.",
      "Write a short invitation email.",
      "Answer three simple message points."
    ],
    sample: "Invite your friend to your birthday. Mention date, time, place.",
    question: "Write 30-40 German words.",
    answer: "Hallo Rahul, ich habe am Samstag Geburtstag..."
  },
  {
    name: "Speaking",
    duration: "15 min",
    tasks: [
      "Introduce yourself.",
      "Spell your name.",
      "Ask and answer everyday questions.",
      "Make one polite request."
    ],
    sample: "Ich heisse Anika. Ich komme aus Indien. Ich wohne in Pune.",
    question: "Introduce yourself in 45 seconds.",
    answer: "Name, country, city, age, profession, language goal"
  }
];

const pronunciationCriteria = [
  { label: "Vowel Accuracy", score: 72, detail: "German vowels stay stable; avoid English diphthong sound." },
  { label: "Consonant Clarity", score: 68, detail: "Final consonants should be crisp: Tag, gut, und." },
  { label: "Word Stress", score: 74, detail: "Stress first syllable in many A1 nouns: MOR-gen, WAS-ser." },
  { label: "Sentence Rhythm", score: 70, detail: "Keep short groups, pause after complete phrases." },
  { label: "IPA Match", score: 64, detail: "Practice ch in ich /ic/ and ach /ax/ separately." },
  { label: "Exam Fluency", score: 76, detail: "Good enough for A1 if answers stay clear and complete." }
];

type ChatMessage = { role: "student" | "ai"; text: string };

export function AppShell() {
  const [active, setActive] = useState("dashboard");
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [chatMode, setChatMode] = useState("teacher");
  const [chatInput, setChatInput] = useState("Teach me German articles in Hindi with examples.");
  const [chat, setChat] = useState<ChatMessage[]>([
    { role: "ai", text: "Willkommen. I am your German teacher, examiner, pronunciation coach, and study planner." }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [correctionInput, setCorrectionInput] = useState("ich gehen nach Berlin");
  const [correction, setCorrection] = useState("");
  const [voiceStatus, setVoiceStatus] = useState("Ready. Press mic for a demo pronunciation attempt.");
  const [cardIndex, setCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [flashcardFilter, setFlashcardFilter] = useState("All");
  const [flashcardStats, setFlashcardStats] = useState({ easy: 0, hard: 0 });
  const [examTab, setExamTab] = useState("Reading");
  const [examAnswer, setExamAnswer] = useState("");
  const [examFeedback, setExamFeedback] = useState("Start a section and submit your answer for instant rubric feedback.");
  const [hours, setHours] = useState(7);
  const [plan, setPlan] = useState("Your adaptive plan will appear here.");
  const [apiStatus, setApiStatus] = useState("Not checked");

  const lesson = lessonDetails[selectedLesson % lessonDetails.length];
  const progressLabel = useMemo(() => `${dashboard.progress}% A1 completion`, []);
  const filteredCards = flashcardFilter === "All" ? flashcards : flashcards.filter((card) => card.tag === flashcardFilter);
  const currentCard = filteredCards[cardIndex % filteredCards.length] || flashcards[0];
  const activeExam = examSections.find((item) => item.name === examTab) || examSections[0];

  async function sendChat() {
    const text = chatInput.trim();
    if (!text) return;
    setChat((items) => [...items, { role: "student", text }]);
    setChatInput("");
    setIsThinking(true);
    try {
      const response = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, mode: chatMode, user_id: "demo-user" })
      });
      const data = await response.json();
      setChat((items) => [...items, { role: "ai", text: data.answer || "No answer returned." }]);
    } catch {
      setChat((items) => [...items, { role: "ai", text: "Backend not connected. Start FastAPI on port 8001, then send again." }]);
    } finally {
      setIsThinking(false);
    }
  }

  async function correctText() {
    try {
      const response = await fetch(`${API}/correction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: correctionInput })
      });
      const data = await response.json();
      setCorrection(`${data.correct_sentence}\n\n${data.grammar_explanation}\n${data.notes?.join(" ") || ""}`);
    } catch {
      setCorrection("Backend not connected. Start FastAPI on port 8001.");
    }
  }

  async function generatePlan() {
    try {
      const response = await fetch(`${API}/planner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: "absolute beginner", goal: "Pass Goethe A1", exam_target: "Goethe A1", hours_per_week: hours })
      });
      const data = await response.json();
      setPlan(`${data.hours_per_week} hours/week plan generated. Week 1 focus: ${data["30_day_plan"]?.[0]?.theme}. Daily minutes: ${data["30_day_plan"]?.[0]?.daily_minutes}.`);
    } catch {
      setPlan("Backend not connected. Start FastAPI on port 8001.");
    }
  }

  async function checkApi() {
    try {
      const response = await fetch(`${API}/health`);
      const data = await response.json();
      setApiStatus(`${data.status.toUpperCase()} - ${data.product}`);
    } catch {
      setApiStatus("Offline. Start backend on port 8000.");
    }
  }

  function gradeExamAnswer() {
    const words = examAnswer.trim().split(/\s+/).filter(Boolean).length;
    if (!examAnswer.trim()) {
      setExamFeedback("Write or speak an answer first. The examiner needs content to evaluate.");
      return;
    }
    const score = Math.min(95, Math.max(45, words * 8 + (examAnswer.toLowerCase().includes("ich") ? 12 : 0)));
    setExamFeedback(`Score: ${score}/100. Rubric: task completion ${score >= 60 ? "pass" : "needs work"}, grammar ${score >= 70 ? "clear A1 control" : "review verb forms"}, vocabulary ${words >= 8 ? "adequate" : "too short"}. Model answer: ${activeExam.answer}.`);
  }

  return (
    <main className="min-h-screen bg-[#080a0f] text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#10131b] p-4 lg:flex lg:flex-col">
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-ember text-black"><Globe2 size={22} /></div>
            <div>
              <div className="font-semibold">DeutschMentor AI</div>
              <div className="text-xs text-slate-400">{progressLabel}</div>
            </div>
          </div>
          <nav className="mt-5 space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${active === id ? "bg-ember text-black" : "text-slate-300 hover:bg-white/7 hover:text-white"}`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-lg border border-ember/25 bg-ember/10 p-3 text-sm text-ember">
            <div className="font-semibold">Today</div>
            <div className="mt-1 text-xs text-slate-300">1 lesson, 20 flashcards, 1 speaking challenge</div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-white/10 bg-[#080a0f]/85 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase text-slate-500">AI German Learning SaaS</div>
                <h1 className="text-2xl font-semibold">{navItems.find((item) => item.id === active)?.label}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setActive("chat")} className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-black">Ask AI Tutor</button>
                <button onClick={checkApi} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:border-ember">Check API</button>
              </div>
            </div>
          </header>

          <div className="p-4 md:p-6">
            {active === "dashboard" && (
              <div className="space-y-5">
                <section className="rounded-lg border border-white/10 bg-[#141821] p-5">
                  <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-ember/30 px-3 py-1 text-xs text-ember">
                        <Sparkles size={14} /> Full access learner workspace
                      </div>
                      <h2 className="mt-4 text-4xl font-semibold md:text-5xl">Learn German from A1 to C2 with an AI mentor</h2>
                      <p className="mt-3 max-w-2xl text-slate-300">Study plan, lessons, chat, exam practice, correction, flashcards, memory, and progress analytics in one app.</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <button onClick={() => setActive("learn")} className="rounded-lg bg-ember px-4 py-3 text-sm font-semibold text-black">Start Lesson</button>
                        <button onClick={() => setActive("planner")} className="rounded-lg border border-white/10 px-4 py-3 text-sm">Create Roadmap</button>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <MetricCard label="Current Level" value={dashboard.currentLevel} hint="active rank" />
                      <MetricCard label="XP" value={dashboard.xp.toLocaleString()} hint={`${dashboard.streak} day streak`} />
                      <MetricCard label="Vocabulary" value={`${dashboard.vocabulary}`} hint="words learned" />
                      <MetricCard label="API" value={apiStatus} hint="provider status" />
                    </div>
                  </div>
                </section>
                <div className="grid gap-4 md:grid-cols-4">
                  <ProgressRing value={dashboard.progress} label="Overall Progress" />
                  <ProgressRing value={dashboard.grammar} label="Grammar Mastery" />
                  <ProgressRing value={dashboard.speaking} label="Speaking Score" />
                  <ProgressRing value={dashboard.listening} label="Listening Score" />
                </div>
                <div className="grid gap-4 xl:grid-cols-3">
                  {agents.map(({ id, name, icon: Icon, description }) => (
                    <button key={id} onClick={() => setActive(id === "exam" ? "exam" : "chat")} className="rounded-lg border border-white/10 bg-[#141821] p-4 text-left hover:border-ember/50">
                      <Icon className="text-ember" size={20} />
                      <div className="mt-3 font-semibold">{name}</div>
                      <div className="mt-1 text-sm text-slate-400">{description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {active === "learn" && (
              <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
                <section className="rounded-lg border border-white/10 bg-[#141821] p-4">
                  <div className="mb-3 flex items-center gap-2 text-ember"><Search size={17} /> A1 Curriculum</div>
                  <div className="space-y-2">
                    {modules.map((module, index) => (
                      <button key={module} onClick={() => { setSelectedModule(index); setSelectedLesson(index % lessonDetails.length); }} className={`flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm ${selectedModule === index ? "bg-ember text-black" : "bg-black/20 hover:bg-white/5"}`}>
                        <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-xs font-bold">{index + 1}</span>
                        {module}
                      </button>
                    ))}
                  </div>
                </section>
                <section className="rounded-lg border border-white/10 bg-[#141821] p-5">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <div className="text-sm text-ember">{lesson.level} Lesson</div>
                      <h2 className="text-3xl font-semibold">{lesson.title}</h2>
                    </div>
                    <button onClick={() => setActive("chat")} className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-black">Ask lesson doubt</button>
                  </div>
                  <p className="mt-4 text-slate-300">{lesson.explanation}</p>
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {lesson.vocabulary.map(([de, en, hi]) => (
                      <div key={de} className="rounded-lg border border-white/10 bg-black/20 p-4">
                        <div className="text-xl font-semibold">{de}</div>
                        <div className="mt-2 text-sm text-slate-400">{en}</div>
                        <div className="text-sm text-ember">{hi}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-lg border border-mint/20 bg-mint/10 p-4 text-sm text-mint">
                    Practice: {lesson.task}
                  </div>
                </section>
              </div>
            )}

            {active === "chat" && (
              <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
                <section className="rounded-lg border border-white/10 bg-[#141821] p-4">
                  <div className="flex flex-wrap gap-2">
                    {["teacher", "friend", "exam", "conversation", "pronunciation", "planner", "memory"].map((mode) => (
                      <button key={mode} onClick={() => setChatMode(mode)} className={`rounded-lg px-3 py-2 text-sm capitalize ${chatMode === mode ? "bg-ember text-black" : "bg-black/30 text-slate-300"}`}>{mode}</button>
                    ))}
                  </div>
                  <div className="mt-4 h-[520px] overflow-y-auto rounded-lg border border-white/10 bg-black/25 p-4">
                    <div className="space-y-3">
                      {chat.map((item, index) => (
                        <div key={index} className={`max-w-[86%] rounded-lg p-3 text-sm leading-6 ${item.role === "student" ? "ml-auto bg-ember text-black" : "bg-white/7 text-slate-100"}`}>
                          {item.text}
                        </div>
                      ))}
                      {isThinking && <div className="rounded-lg bg-white/7 p-3 text-sm text-slate-300">AI is thinking...</div>}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendChat(); }} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none focus:border-ember" />
                    <button onClick={sendChat} className="grid h-12 w-12 place-items-center rounded-lg bg-ember text-black" aria-label="Send"><Send size={18} /></button>
                  </div>
                </section>
                <section className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-[#141821] p-4">
                    <div className="mb-2 flex items-center gap-2 text-ember"><Wand2 size={17} /> Smart Correction</div>
                    <textarea value={correctionInput} onChange={(event) => setCorrectionInput(event.target.value)} className="h-28 w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm outline-none focus:border-ember" />
                    <button onClick={correctText} className="mt-2 w-full rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-black">Correct German</button>
                    {correction && <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-black/30 p-3 text-xs text-slate-300">{correction}</pre>}
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[#141821] p-4">
                    <div className="font-semibold">Quick prompts</div>
                    {["Roleplay at airport", "Prepare Goethe A1 speaking", "Explain accusative in Hindi"].map((prompt) => (
                      <button key={prompt} onClick={() => setChatInput(prompt)} className="mt-2 block w-full rounded-lg bg-black/25 p-3 text-left text-sm hover:bg-white/5">{prompt}</button>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {active === "voice" && (
              <section className="rounded-lg border border-white/10 bg-[#141821] p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-3xl font-semibold">Pronunciation Studio</h2>
                    <p className="mt-2 text-slate-400">Record, compare with native German, receive IPA and fluency scores.</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setVoiceStatus("Demo recording complete. Score: fluency 71, accent 68, confidence 76.")} className="rounded-lg bg-ember px-4 py-3 text-black"><Mic2 /></button>
                    <button onClick={() => setVoiceStatus("Playing native reference: Guten Morgen, ich heisse Rahul.")} className="rounded-lg border border-white/10 px-4 py-3"><Volume2 /></button>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <MetricCard label="Fluency" value="71" hint="speech rhythm" />
                  <MetricCard label="Accent" value="68" hint="German clarity" />
                  <MetricCard label="Confidence" value="76" hint="voice stability" />
                </div>
                <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4 text-slate-300">{voiceStatus}</div>
                <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_360px]">
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <h3 className="font-semibold">Live Pronunciation Criteria</h3>
                    <div className="mt-4 space-y-3">
                      {pronunciationCriteria.map((item) => (
                        <div key={item.label} className="rounded-lg border border-white/10 bg-[#10131b] p-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-ember">{item.score}/100</div>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-ember" style={{ width: `${item.score}%` }} />
                          </div>
                          <div className="mt-2 text-xs text-slate-400">{item.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <h3 className="font-semibold">Speaking Challenge</h3>
                    <div className="mt-3 rounded-lg bg-[#10131b] p-4 text-sm text-slate-300">
                      Say: <span className="text-ember">Guten Morgen, ich heisse Rahul und ich komme aus Indien.</span>
                    </div>
                    <div className="mt-3 text-sm text-slate-400">IPA focus: /gute:n morgn/ /ic haisə/ /indien/. The real provider path connects Whisper transcript, TTS reference, and scoring model.</div>
                    <button onClick={() => setVoiceStatus("Detailed scoring generated: improve ich sound, shorten English-style vowels, and pause after Morgen.")} className="mt-4 w-full rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-black">Generate Detailed Feedback</button>
                  </div>
                </div>
              </section>
            )}

            {active === "exam" && (
              <section className="rounded-lg border border-white/10 bg-[#141821] p-5">
                <h2 className="text-3xl font-semibold">Goethe A1 Exam Simulator</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {examSections.map((section) => (
                    <button key={section.name} onClick={() => { setExamTab(section.name); setExamAnswer(""); setExamFeedback("Start this section and submit your answer for instant rubric feedback."); }} className={`rounded-lg px-4 py-2 text-sm ${examTab === section.name ? "bg-ember text-black" : "bg-black/30 text-slate-300"}`}>
                      {section.name}
                    </button>
                  ))}
                </div>
                <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_360px]">
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm text-ember">{activeExam.duration}</div>
                        <h3 className="text-2xl font-semibold">{activeExam.name} Section</h3>
                      </div>
                      <FileText className="text-ember" />
                    </div>
                    <div className="mt-4 rounded-lg bg-[#10131b] p-4 text-sm text-slate-300">{activeExam.sample}</div>
                    <div className="mt-4 font-semibold">{activeExam.question}</div>
                    <textarea value={examAnswer} onChange={(event) => setExamAnswer(event.target.value)} className="mt-3 h-32 w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm outline-none focus:border-ember" placeholder="Type your answer here..." />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button onClick={gradeExamAnswer} className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-black">Submit for Evaluation</button>
                      <a href="http://127.0.0.1:8001/api/exam/goethe-a1" target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-ember"><Play size={16} /> Backend Exam API</a>
                    </div>
                    <div className="mt-4 rounded-lg border border-mint/20 bg-mint/10 p-4 text-sm text-mint">{examFeedback}</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <h3 className="font-semibold">Section Tasks</h3>
                    <div className="mt-3 space-y-2">
                      {activeExam.tasks.map((task) => (
                        <div key={task} className="rounded-lg bg-[#10131b] p-3 text-sm text-slate-300">{task}</div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg border border-ember/25 bg-ember/10 p-3 text-sm text-ember">Passing target: 60%. Strong target: 80%+. AI predictor uses your last three attempts.</div>
                  </div>
                </div>
              </section>
            )}

            {active === "flashcards" && (
              <section className="rounded-lg border border-white/10 bg-[#141821] p-5">
                <h2 className="text-3xl font-semibold">AI Flashcards</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["All", ...Array.from(new Set(flashcards.map((card) => card.tag)))].map((tag) => (
                    <button key={tag} onClick={() => { setFlashcardFilter(tag); setCardIndex(0); setShowBack(false); }} className={`rounded-lg px-3 py-2 text-sm ${flashcardFilter === tag ? "bg-ember text-black" : "bg-black/30 text-slate-300"}`}>{tag}</button>
                  ))}
                </div>
                <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_360px]">
                  <div className="rounded-lg border border-white/10 bg-black/25 p-8 text-center">
                    <div className="text-sm text-slate-500">Card {(cardIndex % filteredCards.length) + 1} / {filteredCards.length} | Box {currentCard.box} | {currentCard.tag}</div>
                    <div className="mt-4 min-h-28 text-3xl font-semibold">{showBack ? currentCard.back : currentCard.front}</div>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <button onClick={() => setShowBack((value) => !value)} className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-black">Flip</button>
                      <button onClick={() => { setFlashcardStats((stats) => ({ ...stats, hard: stats.hard + 1 })); setCardIndex((cardIndex + 1) % filteredCards.length); setShowBack(false); }} className="rounded-lg border border-signal/40 px-4 py-2 text-sm text-signal">Hard</button>
                      <button onClick={() => { setFlashcardStats((stats) => ({ ...stats, easy: stats.easy + 1 })); setCardIndex((cardIndex + 1) % filteredCards.length); setShowBack(false); }} className="rounded-lg border border-mint/40 px-4 py-2 text-sm text-mint">Easy</button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <h3 className="font-semibold">Spaced Repetition Engine</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <MetricCard label="Deck Size" value={`${filteredCards.length}`} hint="filtered cards" />
                      <MetricCard label="Due Today" value="18" hint="review queue" />
                      <MetricCard label="Easy" value={`${flashcardStats.easy}`} hint="this session" />
                      <MetricCard label="Hard" value={`${flashcardStats.hard}`} hint="repeat soon" />
                    </div>
                    <div className="mt-4 rounded-lg bg-[#10131b] p-3 text-sm text-slate-300">Rule: hard cards return today, easy cards move to a higher box, weak vocabulary is sent to the Memory Agent.</div>
                  </div>
                </div>
              </section>
            )}

            {active === "planner" && (
              <section className="rounded-lg border border-white/10 bg-[#141821] p-5">
                <h2 className="text-3xl font-semibold">Adaptive Roadmap</h2>
                <div className="mt-5 grid gap-4 xl:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <label className="text-sm text-slate-400">Study hours per week</label>
                    <input type="number" value={hours} onChange={(event) => setHours(Number(event.target.value))} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-ember" />
                    <button onClick={generatePlan} className="mt-3 rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-black">Generate 30/60/90 day plan</button>
                    <div className="mt-4 rounded-lg bg-black/30 p-4 text-sm text-slate-300">{plan}</div>
                  </div>
                  <div className="space-y-3">
                    {roadmap.map(({ day, focus, icon: Icon }) => (
                      <div key={day} className="flex gap-3 rounded-lg border border-white/10 bg-black/20 p-4">
                        <Icon className="text-ember" />
                        <div><div className="font-semibold">{day}</div><div className="text-sm text-slate-400">{focus}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {active === "memory" && (
              <section className="rounded-lg border border-white/10 bg-[#141821] p-5">
                <h2 className="text-3xl font-semibold">Learner Memory</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-signal/30 bg-signal/10 p-4">
                    <div className="font-semibold text-signal">Weak Areas</div>
                    <div className="mt-2 text-sm text-slate-300">{dashboard.weak.join(", ")}</div>
                  </div>
                  <div className="rounded-lg border border-mint/30 bg-mint/10 p-4">
                    <div className="font-semibold text-mint">Strong Areas</div>
                    <div className="mt-2 text-sm text-slate-300">{dashboard.strong.join(", ")}</div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                  The backend memory agent stores known vocabulary, mistakes, grammar gaps, test history, and study habits.
                </div>
              </section>
            )}

            {active === "settings" && (
              <section className="rounded-lg border border-white/10 bg-[#141821] p-5">
                <h2 className="text-3xl font-semibold">Settings and Access</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    ["Backend", "http://127.0.0.1:8001/api", CheckCircle2],
                    ["Frontend", "http://localhost:3011", Globe2],
                    ["Groq/Gemini", "Configured from backend .env", Lock],
                    ["Pinecone/Postgres", "Schema and adapters included", ShieldIcon]
                  ].map(([name, value, Icon]) => (
                    <div key={String(name)} className="rounded-lg border border-white/10 bg-black/20 p-4">
                      <Icon className="text-ember" />
                      <div className="mt-3 font-semibold">{String(name)}</div>
                      <div className="mt-1 text-sm text-slate-400">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function ShieldIcon(props: React.ComponentProps<typeof Lock>) {
  return <Lock {...props} />;
}
