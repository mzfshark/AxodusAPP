import { Link } from 'react-router-dom';
import { CardShell } from '@/components/ui';
import type { ExecutionAuthoritySummary, PortfolioNucleusSummary, PortfolioRegistrySnapshot } from '../types';

type AuthorityDashboardProps = Readonly<{
  authorities: readonly ExecutionAuthoritySummary[];
  nuclei: readonly PortfolioNucleusSummary[];
  snapshot: PortfolioRegistrySnapshot;
}>;

type BoundaryClassification =
  | 'NON_EXECUTIVE'
  | 'READ_ONLY'
  | 'MOCK_LOCAL'
  | 'GOVERNANCE_GATED'
  | 'TREASURY_GATED'
  | 'EXECUTION_SENSITIVE_BLOCKED';

const blockedActionGroups = [
  { group: 'Governance', count: 5, status: 'proposal, vote, DAO mutation and executor blocked' },
  { group: 'Treasury', count: 4, status: 'fund movement, custody and treasury exposure blocked' },
  { group: 'Trading', count: 3, status: 'exchange execution, credentials and withdrawals blocked' },
  { group: 'Settlement', count: 4, status: 'marketplace payment, settlement and minting blocked' },
  { group: 'Payout', count: 4, status: 'mining, lottery and reward payouts blocked' },
  { group: 'Wallet', count: 3, status: 'wallet signing and transaction prompts blocked' },
  { group: 'Production', count: 3, status: 'production credentials, RC claims and public launch blocked' },
] as const;

const boundaryConflictGroups = [
  { group: 'Ownership', count: 1, status: 'Business to AxodusAPP consumer contract remains open' },
  { group: 'Execution', count: 6, status: 'DEX, Trading, ACS, Marketplace, Academy and Lottery execution tensions blocked' },
  { group: 'Treasury', count: 2, status: 'treasury owner and payout/provider review paths unresolved' },
  { group: 'Custody', count: 1, status: 'custody ownership is formalized only as a gate, not authority' },
  { group: 'Wallet', count: 2, status: 'wallet-adjacent marketplace and app boundaries remain disabled' },
  { group: 'Governance', count: 2, status: 'plugin/external owner and read-only transport boundaries remain gated' },
] as const;

function classifyAuthority(authority: ExecutionAuthoritySummary, nucleus: PortfolioNucleusSummary | null): BoundaryClassification {
  if (authority.executionAuthority === 'NON_EXECUTIVE') {
    return 'NON_EXECUTIVE';
  }

  if (authority.executionAuthority === 'READ_ONLY_ONLY') {
    return 'READ_ONLY';
  }

  if (nucleus?.nucleus === 'BBA-Agency') {
    return 'MOCK_LOCAL';
  }

  if (authority.governanceAuthority.toLowerCase().includes('governance')) {
    return 'GOVERNANCE_GATED';
  }

  if (authority.treasuryAuthority.toLowerCase().includes('treasury')) {
    return 'TREASURY_GATED';
  }

  return 'EXECUTION_SENSITIVE_BLOCKED';
}

function getExecutionClassification(classification: BoundaryClassification) {
  if (classification === 'NON_EXECUTIVE') return 'NON_EXECUTIVE';
  if (classification === 'READ_ONLY') return 'READ_ONLY';
  if (classification === 'MOCK_LOCAL') return 'MOCK_LOCAL';
  return 'EXECUTION_SENSITIVE_BLOCKED';
}

export default function AuthorityDashboard({ authorities, nuclei, snapshot }: AuthorityDashboardProps) {
  const treasuryAuthorized = authorities.filter((authority) => (
    authority.treasuryAuthority.toLowerCase().includes('authorized')
    && !authority.treasuryAuthority.toLowerCase().includes('no treasury')
  )).length;

  const authorityRows = authorities.map((authority) => {
    const nucleus = nuclei.find((item) => item.nucleus === authority.nucleus) ?? null;
    const boundaryClassification = classifyAuthority(authority, nucleus);

    return {
      authority,
      nucleus,
      boundaryClassification,
      executionClassification: getExecutionClassification(boundaryClassification),
      productionClassification: authority.productionReady ? 'PRODUCTION_AUTHORIZED' : 'NO_PRODUCTION_AUTHORITY',
    };
  });

  return (
    <div className="space-y-6">
      <CardShell
        title="Ecosystem Authority Summary"
        subtitle="Current portfolio authority counts"
        scope="protocol"
        maturity="CROSS-REQ-04"
        executionMode="visibility only"
        status="zero authority"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">Execution Authorized</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{authorities.filter((authority) => authority.executionAuthorized).length}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">Production Authorized</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{authorities.filter((authority) => authority.productionReady).length}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">Treasury Authorized</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{treasuryAuthorized}</p>
          </div>
        </div>
      </CardShell>

      <CardShell
        title="Execution Authority Matrix"
        subtitle="Who owns, who approves, who executes and what remains gated"
        scope="protocol"
        maturity="read-only"
        executionMode="visibility only"
        status={`${authorityRows.length} nuclei`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="text-xs uppercase text-outline">
              <tr>
                <th className="px-3 py-2">Nucleus</th>
                <th className="px-3 py-2">Authority Status</th>
                <th className="px-3 py-2">Execution Classification</th>
                <th className="px-3 py-2">Production Classification</th>
                <th className="px-3 py-2">Boundary Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {authorityRows.map(({ authority, boundaryClassification, executionClassification, productionClassification }) => (
                <tr key={authority.nucleus}>
                  <td className="px-3 py-3">
                    <Link to={`/portfolio/${encodeURIComponent(authority.nucleus)}`} className="font-black text-primary">
                      {authority.nucleus}
                    </Link>
                  </td>
                  <td className="px-3 py-3"><span className="ax-meta-chip">{authority.executionAuthority}</span></td>
                  <td className="px-3 py-3"><span className="ax-meta-chip">{executionClassification}</span></td>
                  <td className="px-3 py-3"><span className="ax-meta-chip">{productionClassification}</span></td>
                  <td className="px-3 py-3"><span className="ax-meta-chip">{boundaryClassification}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardShell>

      <div className="grid gap-6 lg:grid-cols-2">
        <CardShell
          title="Blocked Action Registry"
          subtitle="Portfolio-wide blocked action summary"
          scope="operator"
          maturity="blocked"
          executionMode="visibility only"
          status={`${snapshot.summary.blockedActionCount} blocked actions`}
        >
          <p className="text-3xl font-black text-on-surface">{snapshot.summary.blockedActionCount} blocked actions</p>
          <div className="mt-4 space-y-3">
            {blockedActionGroups.map((item) => (
              <article key={item.group} className="rounded-lg border border-white/10 bg-surface-container p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-on-surface">{item.group}</p>
                  <span className="ax-meta-chip">{item.count}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-outline">{item.status}</p>
              </article>
            ))}
          </div>
        </CardShell>

        <CardShell
          title="Boundary Conflict Viewer"
          subtitle="Portfolio-wide boundary tension summary"
          scope="operator"
          maturity="gated"
          executionMode="visibility only"
          status={`${snapshot.summary.boundaryConflictCount} boundary tensions`}
        >
          <p className="text-3xl font-black text-on-surface">{snapshot.summary.boundaryConflictCount} boundary tensions</p>
          <div className="mt-4 space-y-3">
            {boundaryConflictGroups.map((item) => (
              <article key={item.group} className="rounded-lg border border-white/10 bg-surface-container p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-on-surface">{item.group}</p>
                  <span className="ax-meta-chip">{item.count}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-outline">{item.status}</p>
              </article>
            ))}
          </div>
        </CardShell>
      </div>
    </div>
  );
}
