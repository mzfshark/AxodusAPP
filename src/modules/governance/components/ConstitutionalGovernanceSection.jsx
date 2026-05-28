import { ContentGrid, SectionShell } from '@/components/layout';
import { CardShell } from '@/components/ui';

export default function ConstitutionalGovernanceSection({ constitutional }) {
  const reasonEntries = Object.entries(constitutional.reasonCategories ?? {});

  return (
    <SectionShell
      scope="protocol"
      title="Constitutional Governance"
      description="Protocol-level constraints inherited from Axodus Root. This section does not describe tenant-local decisions."
    >
      <ContentGrid columns="three">
        <CardShell title="Protocol Standing" scope="protocol" maturity="prototype" executionMode="read-only" status={constitutional.standing}>
          <p className="text-2xl font-black text-on-surface">{constitutional.standing}</p>
          <p className="mt-2 text-sm leading-6 text-outline">Constitutional compatibility state for the selected governance context.</p>
        </CardShell>

        <CardShell title="Chain Governance Policy" scope="protocol" maturity="prototype" executionMode="read-only" status="chain-registry">
          <Info label="Total chains" value={constitutional.chainPolicy.totalChains} />
          <Info label="EVM chains" value={constitutional.chainPolicy.evmCount} />
          <Info label="Voting chains" value={constitutional.chainPolicy.votingChains} />
          <Info label="Execution chains" value={constitutional.chainPolicy.executionChains} />
        </CardShell>

        <CardShell title="Reason Code Categories" scope="protocol" maturity="prototype" executionMode="read-only" status={`${constitutional.guardrailCount} guardrails`}>
          {reasonEntries.length ? (
            <div className="space-y-2">
              {reasonEntries.map(([reason, count]) => <Info key={reason} label={reason} value={count} />)}
            </div>
          ) : (
            <p className="text-sm text-outline">No protocol reason code categories are active in the current snapshot.</p>
          )}
        </CardShell>
      </ContentGrid>

      <ContentGrid columns="two" className="mt-4">
        <CardShell title="Federation Rules" scope="protocol" maturity="prototype" executionMode="read-only" status="root-policy">
          <List items={constitutional.federationRules} />
        </CardShell>
        <CardShell title="Protocol Restrictions" scope="protocol" maturity="prototype" executionMode="executable-disabled" status="restricted">
          <List items={constitutional.restrictions} />
        </CardShell>
      </ContentGrid>
    </SectionShell>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-outline">{label}</span>
      <strong className="text-on-surface">{value}</strong>
    </div>
  );
}

function List({ items }) {
  return (
    <ul className="space-y-2 text-sm text-outline">
      {items.map((item) => <li key={item}>- {item}</li>)}
    </ul>
  );
}
