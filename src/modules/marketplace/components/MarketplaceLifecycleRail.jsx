import MarketplaceBadge from './MarketplaceBadge';

export default function MarketplaceLifecycleRail({ title, steps, compact = false }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface-container p-3">
      {title && <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-outline">{title}</p>}
      <div className={`grid gap-2 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3 xl:grid-cols-6'}`}>
        {steps.map((step) => (
          <div key={`${title}-${step.state}`} className="rounded-lg border border-white/10 bg-surface-container-low p-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-outline">{step.position}</span>
              <MarketplaceBadge value={step.status} />
            </div>
            <p className="mt-2 text-xs font-semibold text-on-surface">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
