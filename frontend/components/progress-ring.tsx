export function ProgressRing({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="progress-ring grid h-16 w-16 shrink-0 place-items-center rounded-full" style={{ "--value": `${value}%` } as React.CSSProperties}>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sm font-semibold">{value}%</div>
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-100">{label}</div>
        <div className="text-xs text-slate-400">adaptive score</div>
      </div>
    </div>
  );
}

