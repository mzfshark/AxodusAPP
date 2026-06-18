import { Link } from 'react-router-dom';
import { CardShell } from '@/components/ui';
import type { NucleusId, PortfolioDependency, PortfolioNucleusSummary, PortfolioRegistrySnapshot } from '../types';

type CriticalChain = Readonly<{
  id: string;
  title: string;
  path: readonly string[];
  risk: 'HIGH' | 'CRITICAL';
  blockingStatus: 'BLOCKING_EXECUTION' | 'BLOCKING_PRODUCTION';
  note: string;
}>;

type DependencyGraphProps = Readonly<{
  dependencies: readonly PortfolioDependency[];
  nuclei: readonly PortfolioNucleusSummary[];
  snapshot: PortfolioRegistrySnapshot;
}>;

const criticalChains: readonly CriticalChain[] = [
  {
    id: 'vault-country',
    title: 'Vault.Country Critical Chain',
    path: ['Vault.Country', 'Defi', 'Governance/Core'],
    risk: 'CRITICAL',
    blockingStatus: 'BLOCKING_EXECUTION',
    note: 'Treasury, custody and recovery execution remain blocked until Defi and governance gates are approved.',
  },
  {
    id: 'trading-credential-vault',
    title: 'Trading Credential Vault Critical Chain',
    path: ['Trading Credential Vault', 'Trading', 'Governance', 'Defi', 'ACS'],
    risk: 'CRITICAL',
    blockingStatus: 'BLOCKING_EXECUTION',
    note: 'Credentials, exchange execution, withdrawals and treasury exposure remain blocked.',
  },
  {
    id: 'marketplace-settlement',
    title: 'Marketplace Settlement Critical Chain',
    path: ['Marketplace Settlement', 'Marketplace', 'Defi', 'Governance', 'AxodusAPP'],
    risk: 'HIGH',
    blockingStatus: 'BLOCKING_EXECUTION',
    note: 'Payment, settlement, minting, wallet and treasury paths remain blocked.',
  },
  {
    id: 'dex-country',
    title: 'Dex.Country Critical Chain',
    path: ['Dex.Country', 'Dex', 'Defi', 'Governance', 'AxodusAPP'],
    risk: 'HIGH',
    blockingStatus: 'BLOCKING_EXECUTION',
    note: 'Dex remains read-only/provider reliability; swaps and liquidity routing are not enabled.',
  },
];

const hubCandidates: readonly NucleusId[] = ['Core', 'Governance', 'Business', 'Defi', 'AxodusAPP'];
const burdenOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const;
type DependencyBurden = typeof burdenOrder[number];

function getSourceNucleus(source: string, nuclei: readonly PortfolioNucleusSummary[]) {
  return nuclei.find((nucleus) => nucleus.nucleus === source)?.nucleus ?? null;
}

function classifyBurden(score: number): DependencyBurden {
  if (score >= 5) return 'CRITICAL';
  if (score >= 3) return 'HIGH';
  if (score >= 1) return 'MEDIUM';
  return 'LOW';
}

function getDependencyBurden(nucleus: PortfolioNucleusSummary, dependencies: readonly PortfolioDependency[]) {
  const incoming = dependencies.filter((dependency) => dependency.targetNucleus === nucleus.nucleus);
  const outgoing = dependencies.filter((dependency) => dependency.sourceNucleusOrOpportunity === nucleus.nucleus);
  const blocking = [...incoming, ...outgoing].filter((dependency) => dependency.blockingStatus !== 'NOT_BLOCKING');
  const critical = [...incoming, ...outgoing].filter((dependency) => dependency.criticality === 'CRITICAL');
  const score = incoming.length + outgoing.length + blocking.length + critical.length;

  return {
    nucleus: nucleus.nucleus,
    incoming: incoming.length,
    outgoing: outgoing.length,
    blocking: blocking.length,
    score,
    burden: classifyBurden(score),
  };
}

function countChainMentions(nucleus: NucleusId) {
  return criticalChains.filter((chain) => chain.path.some((segment) => segment.includes(nucleus))).length;
}

function formatDependencySource(dependency: PortfolioDependency, nuclei: readonly PortfolioNucleusSummary[]) {
  const sourceNucleus = getSourceNucleus(dependency.sourceNucleusOrOpportunity, nuclei);

  if (!sourceNucleus) {
    return dependency.sourceNucleusOrOpportunity;
  }

  return sourceNucleus;
}

export default function DependencyGraph({ dependencies, nuclei, snapshot }: DependencyGraphProps) {
  const burdens = nuclei
    .map((nucleus) => getDependencyBurden(nucleus, dependencies))
    .sort((left, right) => {
      const byBurden = burdenOrder.indexOf(left.burden) - burdenOrder.indexOf(right.burden);
      return byBurden === 0 ? right.score - left.score : byBurden;
    });

  const hubs = hubCandidates
    .map((nucleus) => {
      const representativeCount = dependencies.filter((dependency) => (
        dependency.targetNucleus === nucleus || dependency.sourceNucleusOrOpportunity === nucleus
      )).length;
      const criticalChainMentions = countChainMentions(nucleus);

      return {
        nucleus,
        representativeCount,
        criticalChainMentions,
        total: representativeCount + criticalChainMentions,
      };
    })
    .sort((left, right) => right.total - left.total);

  return (
    <div className="space-y-6">
      <CardShell
        title="Dependency Graph Summary"
        subtitle="Official dependency count with representative local records"
        scope="protocol"
        maturity="CROSS-REQ-02"
        executionMode="visualization only"
        status={`${snapshot.summary.officialDependencyCount} official dependencies`}
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">Official Dependencies</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{snapshot.summary.officialDependencyCount}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">Nucleus-Level</p>
            <p className="mt-2 text-3xl font-black text-on-surface">33</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">Opportunity-Level</p>
            <p className="mt-2 text-3xl font-black text-on-surface">25</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-outline">
          The table below uses `getDependencies()` from the portfolio registry service. The service also preserves the official 58 dependency summary from CROSS-REQ-02.
        </p>
      </CardShell>

      <CardShell
        title="Dependency Relationship Matrix"
        subtitle="Source, target, type, severity and blocking status"
        scope="protocol"
        maturity="read-only"
        executionMode="visualization only"
        status={`${dependencies.length} service records`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="text-xs uppercase text-outline">
              <tr>
                <th className="px-3 py-2">Record</th>
                <th className="px-3 py-2">Source Nucleus</th>
                <th className="px-3 py-2">Target Nucleus</th>
                <th className="px-3 py-2">Dependency Type</th>
                <th className="px-3 py-2">Severity</th>
                <th className="px-3 py-2">Blocking Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {dependencies.map((dependency) => (
                <tr key={dependency.id}>
                  <td className="px-3 py-3"><span className="ax-meta-chip">{dependency.id}</span></td>
                  <td className="px-3 py-3 font-semibold text-on-surface">
                    {formatDependencySource(dependency, nuclei)}
                  </td>
                  <td className="px-3 py-3">
                    <Link to={`/portfolio/${encodeURIComponent(dependency.targetNucleus)}`} className="font-semibold text-primary">
                      {dependency.targetNucleus}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-outline">{dependency.sourceNucleusOrOpportunity}</td>
                  <td className="px-3 py-3"><span className="ax-meta-chip">{dependency.criticality}</span></td>
                  <td className="px-3 py-3"><span className="ax-meta-chip">{dependency.blockingStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardShell>

      <CardShell
        title="Critical Dependency Chains"
        subtitle="Highest-risk chains from the dependency graph summary"
        scope="operator"
        maturity="visibility only"
        executionMode="visualization only"
        status="blocked"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {criticalChains.map((chain) => (
            <article key={chain.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap gap-2">
                <span className="ax-meta-chip">{chain.risk}</span>
                <span className="ax-meta-chip">{chain.blockingStatus}</span>
              </div>
              <h4 className="mt-3 text-base font-black text-on-surface">{chain.title}</h4>
              <p className="mt-3 text-sm font-semibold text-on-surface">{chain.path.join(' -> ')}</p>
              <p className="mt-2 text-sm leading-6 text-outline">{chain.note}</p>
            </article>
          ))}
        </div>
      </CardShell>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <CardShell
          title="Dependency Burden Summary"
          subtitle="LOW, MEDIUM, HIGH and CRITICAL burden per nucleus"
          scope="protocol"
          maturity="portfolio"
          executionMode="visualization only"
          status="computed"
        >
          <div className="grid gap-3 md:grid-cols-2">
            {burdens.map((item) => (
              <article key={item.nucleus} className="rounded-lg border border-white/10 bg-surface-container p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link to={`/portfolio/${encodeURIComponent(item.nucleus)}`} className="font-black text-on-surface">
                    {item.nucleus}
                  </Link>
                  <span className="ax-meta-chip">{item.burden}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-outline">
                  Incoming: {item.incoming}. Outgoing: {item.outgoing}. Blocking: {item.blocking}. Score: {item.score}.
                </p>
              </article>
            ))}
          </div>
        </CardShell>

        <CardShell
          title="Ecosystem Hub View"
          subtitle="Likely hubs by representative dependency counts and critical chain mentions"
          scope="protocol"
          maturity="portfolio"
          executionMode="visualization only"
          status="read-only"
        >
          <div className="space-y-3">
            {hubs.map((hub) => (
              <article key={hub.nucleus} className="rounded-lg border border-white/10 bg-surface-container p-3">
                <div className="flex items-center justify-between gap-3">
                  <Link to={`/portfolio/${encodeURIComponent(hub.nucleus)}`} className="font-black text-on-surface">
                    {hub.nucleus}
                  </Link>
                  <span className="ax-meta-chip">{hub.total} signals</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-outline">
                  Service records: {hub.representativeCount}. Critical chain mentions: {hub.criticalChainMentions}.
                </p>
              </article>
            ))}
          </div>
        </CardShell>
      </div>
    </div>
  );
}
