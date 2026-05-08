export default function CapabilityPill({ enabled, label }) {
  const className = enabled
    ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
    : 'border-slate-600/40 bg-slate-800/40 text-slate-500';

  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  );
}
