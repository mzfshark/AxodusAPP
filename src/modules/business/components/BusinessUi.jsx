import { Activity, AlertTriangle, BadgeDollarSign, Boxes, BrainCircuit, Landmark, LibraryBig, ShieldCheck } from 'lucide-react';

const statusTone = {
  ACTIVE: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
  APPROVED: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
  MONITORED: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
  MAINTENANCE: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  GOVERNANCE_REVIEW: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  FUNDING_REVIEW: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  UNDER_REVIEW: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  ACTIVE_OFFERING: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  DRAFT: 'border-white/10 bg-surface-container text-outline',
  REQUESTED: 'border-white/10 bg-surface-container text-outline',
  PROPOSED: 'border-white/10 bg-surface-container text-outline',
};

const severityTone = {
  INFO: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  NOTICE: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
  WARNING: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  CRITICAL: 'border-red-400/30 bg-red-400/10 text-red-100',
  EMERGENCY: 'border-red-400/30 bg-red-400/10 text-red-100',
};

const riskTone = {
  TIER_1_CRITICAL_INFRASTRUCTURE: 'border-red-400/30 bg-red-400/10 text-red-100',
  TIER_2_ECOSYSTEM_STRATEGIC: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  TIER_3_REVENUE_GENERATING: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
  TIER_4_EXPERIMENTAL: 'border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-100',
  TIER_5_VENTURE_RISK: 'border-red-400/30 bg-red-400/10 text-red-100',
};

export function BusinessPageShell({ title, description, children, actions }) {
  return (
    <main className="app-view-shell space-y-8">
      <header className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Axodus Business</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-on-surface md:text-4xl">{title}</h1>
            <p className="mt-3 max-w-5xl text-sm leading-6 text-outline md:text-base">{description}</p>
          </div>
          {actions}
        </div>
        <BusinessSafetyBanner />
      </header>
      {children}
    </main>
  );
}

export function BusinessSafetyBanner() {
  return (
    <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100">
      Business runtime is mock/read-only. No treasury movement, debenture issuance, revenue distribution, ACS provisioning, governance execution, billing, KYC or contract calls are enabled.
    </div>
  );
}

export function BusinessBadge({ children, tone = 'neutral' }) {
  const toneClass = tone === 'neutral' ? 'border-white/10 bg-surface-container text-outline' : tone;
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${toneClass}`}>{children}</span>;
}

export function BusinessStatusBadge({ status }) {
  return <BusinessBadge tone={statusTone[status] || 'border-white/10 bg-surface-container text-outline'}>{status}</BusinessBadge>;
}

export function BusinessRiskBadge({ riskTier }) {
  return <BusinessBadge tone={riskTone[riskTier] || 'border-white/10 bg-surface-container text-outline'}>{riskTier}</BusinessBadge>;
}

export function BusinessSeverityBadge({ severity }) {
  return <BusinessBadge tone={severityTone[severity] || 'border-white/10 bg-surface-container text-outline'}>{severity}</BusinessBadge>;
}

export function BusinessPanel({ title, description, children, action }) {
  return (
    <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-on-surface">{title}</h2>
          {description ? <p className="mt-1 text-sm leading-6 text-outline">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function BusinessSummaryCards({ cards = [] }) {
  const icons = [LibraryBig, Boxes, Landmark, BadgeDollarSign, BrainCircuit, Activity, ShieldCheck, AlertTriangle];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = icons[index % icons.length];
        return (
          <article key={card.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-outline">{card.label}</p>
                <p className="mt-2 text-3xl font-black tracking-tight text-on-surface">{card.value}</p>
              </div>
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm leading-6 text-outline">{card.detail}</p>
          </article>
        );
      })}
    </section>
  );
}

export function BusinessLifecycleTable({ rows = [], columns }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-widest text-outline">
            {columns.map((column) => <th key={column.key} className="px-3 py-3">{column.label}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={row.id} className="align-top">
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`} className="px-3 py-4">
                  {column.render ? column.render(row) : <span className="text-outline">{row[column.key] ?? 'n/a'}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BusinessTelemetryFeed({ events = [] }) {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <article key={event.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <BusinessSeverityBadge severity={event.severity} />
                <span className="font-mono text-xs font-bold text-on-surface">{event.eventType}</span>
              </div>
              <p className="mt-2 text-sm text-outline">{event.id} / {event.sourceSystem}</p>
            </div>
            <span className="text-xs text-outline">{new Date(event.createdAt).toLocaleString()}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-outline">Status: <strong className="text-on-surface">{event.status}</strong></p>
        </article>
      ))}
    </div>
  );
}

export function BusinessLoadingState() {
  return <div className="rounded-lg border border-white/10 bg-surface-container-low p-8 text-sm text-outline">Loading Business mock runtime...</div>;
}

export function BusinessErrorState({ message }) {
  return <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-8 text-sm font-semibold text-red-100">{message}</div>;
}
