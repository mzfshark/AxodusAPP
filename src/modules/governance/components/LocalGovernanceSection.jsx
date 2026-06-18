import ContentGrid from '@/components/layout/ContentGrid';
import SectionShell from '@/components/layout/SectionShell';
import { CardShell } from '@/components/ui';
import GovernanceProposalStateSummary from './GovernanceProposalStateSummary';
import TenantGovernanceIdentityPanel from './TenantGovernanceIdentityPanel';

export default function LocalGovernanceSection({ local, proposals }) {
  const restrictionItems = local.restrictions?.length ? local.restrictions : ['No local restrictions currently visible.'];

  return (
    <SectionShell
      scope="tenant"
      title="Local Governance"
      description="Selected tenant/Sub-DAO governance state. Tenant proposals and local policy are not protocol-level governance."
    >
      <TenantGovernanceIdentityPanel identity={local.identity} />

      <ContentGrid columns="three" className="mt-4">
        <CardShell title="Voting Model" scope="tenant" maturity="prototype" executionMode="preview" status="local">
          <p className="text-2xl font-black text-on-surface">{local.votingModel}</p>
          <p className="mt-2 text-sm text-outline">Voting model is tenant-local and remains preview-only in the frontend.</p>
        </CardShell>

        <CardShell title="Tenant Proposal Count" scope="tenant" maturity="prototype" executionMode="preview" status={`${local.proposalTotal} proposals`}>
          <p className="text-2xl font-black text-on-surface">{local.proposalTotal}</p>
          <p className="mt-2 text-sm text-outline">Proposal state is summarized separately below.</p>
        </CardShell>

        <CardShell title="Treasury Governance Mode" scope="tenant" maturity="prototype" executionMode="executable-disabled" status={local.treasuryGovernanceMode}>
          <p className="text-2xl font-black text-on-surface">{local.treasuryGovernanceMode}</p>
          <p className="mt-2 text-sm text-outline">No treasury movement or approval execution is available.</p>
        </CardShell>
      </ContentGrid>

      <div className="mt-4">
        <GovernanceProposalStateSummary proposals={proposals} />
      </div>

      <CardShell
        title="Tenant Restrictions"
        subtitle="Restrictions inherited from Root or specific to the selected tenant."
        scope="tenant"
        maturity="prototype"
        executionMode="executable-disabled"
        status={`${restrictionItems.length} restriction(s)`}
        className="mt-4"
      >
        <ul className="space-y-2 text-sm text-outline">
          {restrictionItems.map((item) => <li key={item}>- {item}</li>)}
        </ul>
      </CardShell>
    </SectionShell>
  );
}
