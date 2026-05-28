import { ContentGrid, SectionShell } from '@/components/layout';
import { CardShell } from '@/components/ui';

export default function GovernanceAuthoritySplit({ authority }) {
  return (
    <SectionShell
      scope="protocol"
      title="Axodus Root vs Selected Tenant"
      description="Axodus Root defines constitutional constraints. The selected tenant operates local governance inside those constraints."
    >
      <ContentGrid columns="two">
        <CardShell title={authority.root.title} scope="protocol" maturity="prototype" executionMode="read-only" status="constitutional">
          <Info label="Authority" value={authority.root.authority} />
          <Info label="Protocol guardrails" value={authority.root.guardrails} />
          <Info label="Federation policy" value={authority.root.federationPolicy} />
          <Info label="Chain policy" value={authority.root.chainPolicy} />
          <Info label="Execution authority" value={authority.root.execution} />
        </CardShell>

        <CardShell title={authority.tenant.title} scope="tenant" maturity="prototype" executionMode="preview" status="local-governance">
          <Info label="Authority" value={authority.tenant.authority} />
          <Info label="Tenant proposals" value={authority.tenant.proposals} />
          <Info label="Tenant roles" value={authority.tenant.roles.length ? authority.tenant.roles.join(', ') : 'No roles indexed'} />
          <Info label="Local policy" value={authority.tenant.localPolicy} />
          <Info label="Inherited restrictions" value={authority.tenant.inheritedRestrictions} />
        </CardShell>
      </ContentGrid>
    </SectionShell>
  );
}

function Info({ label, value }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-[10px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-on-surface">{value}</p>
    </div>
  );
}
