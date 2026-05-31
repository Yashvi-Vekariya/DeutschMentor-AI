"use client";

import { Mic2, Volume2 } from "lucide-react";
import { useState } from "react";
import { MetricCard } from "@/components/metric-card";

export function VoicePanel() {
  const [status, setStatus] = useState("Ready for pronunciation practice.");

  return (
    <section id="voice" className="glass rounded-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Voice Tutor</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setStatus("Recording demo started. In production this connects to Whisper speech-to-text.")}
            className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-ember hover:bg-ember hover:text-black"
            aria-label="Record pronunciation"
          >
            <Mic2 size={18} />
          </button>
          <button
            onClick={() => setStatus("Native German playback demo. Connect a German TTS provider key to generate real audio.")}
            className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-ember hover:bg-ember hover:text-black"
            aria-label="Play native audio"
          >
            <Volume2 size={18} />
          </button>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <MetricCard label="Fluency" value="71" hint="speech rhythm" />
        <MetricCard label="Accent" value="68" hint="German clarity" />
        <MetricCard label="Confidence" value="76" hint="voice stability" />
      </div>
      <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4 text-sm text-slate-300">
        {status}
      </div>
    </section>
  );
}
