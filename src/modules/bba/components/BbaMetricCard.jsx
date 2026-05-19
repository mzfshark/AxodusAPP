export default function BbaMetricCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        {Icon && <Icon className="h-5 w-5 text-primary" aria-hidden="true" />}
        <span className="rounded-full bg-surface-container px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-outline">
          Read-only
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-outline">{label}</p>
      <p className="mt-2 text-2xl font-bold text-on-surface">{value}</p>
      {detail && <p className="mt-2 text-sm leading-5 text-outline">{detail}</p>}
    </article>
  );
}
