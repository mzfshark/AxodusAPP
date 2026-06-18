import ScopeBadge from './ScopeBadge';

const formatFlag = (label, enabled) => `${label}: ${enabled ? 'yes' : 'no'}`;

export default function ScopedCard({ meta, children, className = '' }) {
  const metadata = [
    meta.module,
    meta.surface,
    meta.maturity,
    meta.executionMode,
    formatFlag('wallet', meta.walletAware),
    formatFlag('tenant', meta.tenantAware),
    formatFlag('governance', meta.governanceAware),
    formatFlag('ACS', meta.acsAware),
  ];

  return (
    <article className={`rounded-lg border border-white/10 bg-surface-container-highest p-5 ${className}`}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <ScopeBadge scope={meta.scope} />
          <h3 className="mt-3 text-lg font-black text-on-surface">{meta.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-outline">
          {meta.executionMode}
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {metadata.map((item) => (
          <span key={item} className="rounded-full bg-surface-container px-2 py-1 text-[11px] font-bold text-outline">
            {item}
          </span>
        ))}
      </div>
      {children}
    </article>
  );
}
