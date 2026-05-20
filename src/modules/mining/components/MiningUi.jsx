import { NavLink } from 'react-router-dom';
import { diligenceTone, governanceTone, riskTone } from '../utils/miningUtils';
import { getMiningMeta } from '../services/miningApi';
import { useMiningSummary } from '../hooks/useMiningData';

export function MiningHeader({ title, description }) {
  const summary = useMiningSummary();
  const meta = getMiningMeta(summary.data);

  return (
    <header className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Axodus Mining</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-on-surface md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-outline md:text-base">{description}</p>
      </div>
      {meta?.source === 'fallback' ? (
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100">
          {meta.message}
        </div>
      ) : null}
      {meta ? (
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge tone={meta.source === 'api' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100' : 'border-amber-400/30 bg-amber-400/10 text-amber-100'}>
            {meta.source === 'api' ? 'API online' : 'fallback active'}
          </Badge>
          <Badge>mock/read-only</Badge>
          <Badge>{meta.version}</Badge>
          <Badge>{meta.generatedAt ? `generated ${new Date(meta.generatedAt).toLocaleString()}` : 'timestamp unavailable'}</Badge>
        </div>
      ) : null}
    </header>
  );
}

export function MetricCard({ label, value, detail, icon: Icon }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-on-surface">{value}</p>
        </div>
        {Icon ? <Icon className="h-5 w-5 text-primary" aria-hidden="true" /> : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-outline">{detail}</p>
    </article>
  );
}

export function Panel({ title, description, children, action }) {
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

export function Badge({ children, tone = 'neutral' }) {
  const toneClass = tone === 'neutral' ? 'border-white/10 bg-surface-container text-outline' : tone;
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${toneClass}`}>{children}</span>;
}

export function RiskBadge({ level }) {
  return <Badge tone={riskTone[level] || riskTone.medium}>{level}</Badge>;
}

export function DiligenceBadge({ status }) {
  return <Badge tone={diligenceTone[status] || diligenceTone.required}>{status}</Badge>;
}

export function GovernanceBadge({ standing }) {
  return <Badge tone={governanceTone[standing] || governanceTone['under-review']}>{standing}</Badge>;
}

export function ProviderTable({ providers, riskProfiles }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-widest text-outline">
            <th className="px-3 py-3">Provider</th>
            <th className="px-3 py-3">Asset</th>
            <th className="px-3 py-3">Diligence</th>
            <th className="px-3 py-3">Governance</th>
            <th className="px-3 py-3">Risk</th>
            <th className="px-3 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {providers.map((provider) => {
            const risk = riskProfiles.find((item) => item.providerId === provider.id);
            return (
              <tr key={provider.id} className="align-top">
                <td className="px-3 py-4">
                  <NavLink className="font-bold text-primary hover:underline" to={`/mining/providers/${provider.slug}`}>
                    {provider.name}
                  </NavLink>
                  <p className="mt-1 max-w-lg text-xs leading-5 text-outline">{provider.description}</p>
                </td>
                <td className="px-3 py-4 font-bold text-on-surface">{provider.primaryAsset}</td>
                <td className="px-3 py-4"><DiligenceBadge status={provider.dueDiligenceStatus} /></td>
                <td className="px-3 py-4"><GovernanceBadge standing={provider.governanceStanding} /></td>
                <td className="px-3 py-4">{risk ? <RiskBadge level={risk.riskLevel} /> : null}</td>
                <td className="px-3 py-4"><Badge>{provider.status}</Badge></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function LoadingState() {
  return <div className="rounded-lg border border-white/10 bg-surface-container-low p-8 text-sm text-outline">Loading Mining mock data...</div>;
}

export function EmptyState({ message }) {
  return <div className="rounded-lg border border-white/10 bg-surface-container-low p-8 text-sm text-outline">{message}</div>;
}

export function ErrorState({ message }) {
  return <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-8 text-sm font-semibold text-red-100">{message}</div>;
}
