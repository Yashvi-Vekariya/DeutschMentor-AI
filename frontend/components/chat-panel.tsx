"use client";

import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { chatModes } from "@/lib/data";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001/api";

export function ChatPanel() {
  const [mode, setMode] = useState("Teacher");
  const [message, setMessage] = useState("Explain German articles der, die, das in Hindi.");
  const [answer, setAnswer] = useState("Ask any German doubt. I will explain it like a teacher, coach, examiner, or roleplay partner.");
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    try {
      const response = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mode: mode.toLowerCase().split(" ")[0] })
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("Backend is not running yet. Start FastAPI on port 8001, then try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass rounded-lg p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">AI Tutor Chat</h2>
          <p className="text-sm text-slate-400">Teacher, examiner, roleplay partner, and German-to-Hindi mentor.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {chatModes.map((item) => (
            <button key={item} onClick={() => setMode(item)} className={`rounded-md px-3 py-2 text-xs ${mode === item ? "bg-ember text-black" : "bg-white/5 text-slate-300"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4 text-sm leading-6 text-slate-200 min-h-36">
        <div className="mb-2 flex items-center gap-2 text-ember"><Sparkles size={16} /> {mode} Mode</div>
        {loading ? "Thinking..." : answer}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={message} onChange={(event) => setMessage(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none focus:border-ember" />
        <button onClick={send} className="grid h-12 w-12 place-items-center rounded-lg bg-ember text-black" aria-label="Send message">
          <Send size={18} />
        </button>
      </div>
    </section>
  );
}

