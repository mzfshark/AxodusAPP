function titleCase(value) {
  if (!value) return 'Not indexed';
  return String(value)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const statusClasses = {
  compliant: 'border-emerald-300/20 bg-emerald-950/20 text-emerald-100',
  restricted: 'border-amber-300/20 bg-amber-950/20 text-amber-100',
  sanctioned: 'border-red-300/20 bg-red-950/20 text-red-100',
  suspended: 'border-red-300/30 bg-red-950/30 text-red-100',
  'under-review': 'border-cyan-300/20 bg-cyan-950/20 text-cyan-100',
};

const severityClasses = {
  info: 'border-cyan-300/20 bg-cyan-950/20 text-cyan-100',
  warning: 'border-amber-300/20 bg-amber-950/20 text-amber-100',
  critical: 'border-red-300/20 bg-red-950/20 text-red-100',
  constitutional: 'border-violet-300/20 bg-violet-950/20 text-violet-100',
};

export function GovernanceStatusBadge({ status, label }) {
  return (
    <span className={`rounded-md border px-2 py-1 text-[11px] font-black uppercase ${statusClasses[status] ?? 'border-white/10 text-slate-300'}`}>
      {label ?? titleCase(status)}
    </span>
  );
}

export function ReasonSeverityBadge({ severity }) {
  if (!severity) return null;

  return (
    <span className={`rounded-md border px-2 py-1 text-[10px] font-black uppercase ${severityClasses[severity] ?? 'border-white/10 text-slate-300'}`}>
      {severity}
    </span>
  );
}

export function GuardrailReasonCode({ reasonCode, reasonSeverity }) {
  if (!reasonCode) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] uppercase opacity-80">{reasonCode}</span>
      <ReasonSeverityBadge severity={reasonSeverity} />
    </div>
  );
}

export function GovernanceStandingSummary({ chain, compact = false }) {
  const standing = chain?.constitutionalStanding ?? chain?.capabilities?.constitutionalStanding;
  const reasonCodes = standing?.reasonCodes ?? [];

  return (
    <div className={compact ? 'space-y-2' : 'rounded-lg border border-white/5 bg-surface-container-high p-4'}>
      <div className="flex flex-wrap items-center gap-2">
        <GovernanceStatusBadge status={chain?.governanceStatus ?? standing?.status} />
        <GovernanceStatusBadge status={standing?.status} label={`Standing: ${titleCase(standing?.status)}`} />
      </div>
      <div className="mt-2 grid gap-2 text-xs text-on-surface-variant">
        <div>
          Federation: <span className="font-bold text-on-surface">{chain?.federationMember === false ? 'Not a member' : 'Member'}</span>
        </div>
        <div>
          Tier: <span className="font-bold text-on-surface">{titleCase(chain?.federationTier)}</span>
        </div>
      </div>
      {reasonCodes.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {reasonCodes.map((reasonCode) => (
            <span key={reasonCode} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] uppercase text-slate-300">
              {reasonCode}
            </span>
          ))}
          <ReasonSeverityBadge severity={standing?.reasonSeverity} />
        </div>
      ) : null}
    </div>
  );
}

export function GovernanceLayerCard({ title, icon, items }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold text-on-surface">{title}</h2>
        <span className="material-symbols-outlined text-cyan-200">{icon}</span>
      </div>
      <div className="grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-md bg-surface-container-high px-3 py-2 text-sm font-semibold text-on-surface">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
