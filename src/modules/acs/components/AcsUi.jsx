import { Activity, BadgeCheck, Boxes, FileCheck2, Gauge, ListChecks, Network, ShieldCheck } from 'lucide-react';
import { getAcsMeta } from '../services/acsApi';

export function AcsHeader({ title, description, metaSource }) {
  return (
    <header className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Axodus ACS</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-on-surface md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-outline md:text-base">{description}</p>
      </div>
      {metaSource?.source === 'fallback' ? (
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100">
          {metaSource.message || 'Using ACS mock fallback.'}
        </div>
      ) : null}
    </header>
  );
}

export function AcsPageShell({ title, description, query, children }) {
  return (
    <main className="app-view-shell space-y-8">
      <AcsHeader title={title} description={description} metaSource={getAcsMeta(query?.data)} />
      {children}
    </main>
  );
}

export function AcsPanel({ title, description, children, action }) {
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

export function AcsMetric({ label, value, detail, icon: Icon = Gauge }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-on-surface">{value}</p>
        </div>
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm leading-6 text-outline">{detail}</p>
    </article>
  );
}

export function AcsBadge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'border-white/10 bg-surface-container text-outline',
    allowed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
    blocked: 'border-red-400/30 bg-red-400/10 text-red-100',
    warning: 'border-amber-400/30 bg-amber-400/10 text-amber-100',
    policy: 'border-primary/30 bg-primary/10 text-primary'
  };

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${tones[tone] || tones.neutral}`}>{children}</span>;
}

export function CapabilityGrid({ capabilities = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {capabilities.map((capability) => (
        <article key={capability.id} className="rounded-lg border border-white/10 bg-surface-container p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-outline">{capability.consumptionLevel}</p>
              <h3 className="mt-2 text-lg font-bold text-on-surface">{capability.name}</h3>
              <p className="mt-1 text-xs text-outline">{capability.id}</p>
            </div>
            <AcsBadge tone={capability.automationLevel === 'manual_approval' ? 'warning' : 'policy'}>{capability.automationLevel}</AcsBadge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {capability.requiresGovernanceApproval ? <AcsBadge tone="policy">Governance required</AcsBadge> : <AcsBadge>Governance visible</AcsBadge>}
            {capability.requiresUserLicense ? <AcsBadge tone="warning">License required</AcsBadge> : null}
            {capability.telemetryRequired ? <AcsBadge>Telemetry</AcsBadge> : null}
            {capability.receiptsRequired ? <AcsBadge>Receipts</AcsBadge> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ReadinessPipeline({ checks = [] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {checks.map((check) => (
        <div key={check.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-on-surface">{check.label}</p>
              <p className="mt-1 text-xs text-outline">{check.requiredForState}</p>
            </div>
            <AcsBadge tone={check.completed ? 'allowed' : 'warning'}>{check.completed ? 'complete' : 'pending'}</AcsBadge>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingState() {
  return <div className="rounded-lg border border-white/10 bg-surface-container-low p-8 text-sm text-outline">Loading ACS operational intelligence...</div>;
}

export function ErrorState({ message }) {
  return <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-8 text-sm font-semibold text-red-100">{message}</div>;
}

export const acsIcons = { Activity, BadgeCheck, Boxes, FileCheck2, Gauge, ListChecks, Network, ShieldCheck };
