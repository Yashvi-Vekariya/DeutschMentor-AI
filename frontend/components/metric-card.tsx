export function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="glass rounded-lg p-4 shadow-glow">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-400">{hint}</div>
    </div>
  );
}

