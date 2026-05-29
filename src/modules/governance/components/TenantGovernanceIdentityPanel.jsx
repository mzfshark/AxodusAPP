import { CardShell } from '@/components/ui';

export default function TenantGovernanceIdentityPanel({ identity }) {
  return (
    <CardShell
      title={identity.tenantName ?? 'No tenant selected'}
      subtitle="Tenant governance identity inside Axodus constitutional constraints."
      scope="tenant"
      maturity="prototype"
      executionMode={identity.executionMode}
      status={identity.localGovernanceStatus}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Info label="Tenant id" value={identity.tenantId ?? 'not-indexed'} />
        <Info label="Tenant type" value={identity.tenantType} />
        <Info label="Federation tier" value={identity.federationTier} />
        <Info label="Constitutional standing" value={identity.constitutionalStanding} />
        <Info label="Local governance" value={identity.localGovernanceStatus} />
        <Info label="Primary chain" value={identity.primaryChain ?? 'not-indexed'} />
        <Info label="Governance model" value={identity.governanceModel} />
        <Info label="Execution mode" value={identity.executionMode} />
      </div>

      <ChipGroup title="Current roles" items={identity.roles} empty="No roles indexed." />
      <ChipGroup title="Enabled governance modules" items={identity.enabledModules} empty="No governance modules indexed." />
    </CardShell>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <p className="text-[10px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-on-surface">{value}</p>
    </div>
  );
}

function ChipGroup({ title, items = [], empty }) {
  return (
    <div className="mt-4">
      <p className="text-[10px] font-black uppercase text-slate-500">{title}</p>
      {items.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((item) => <span key={item} className="ax-meta-chip">{item}</span>)}
        </div>
      ) : (
        <p className="mt-2 text-sm text-outline">{empty}</p>
      )}
    </div>
  );
}
