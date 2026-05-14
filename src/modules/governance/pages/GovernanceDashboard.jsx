import ChainRegistryTable from '../components/ChainRegistryTable';
import ChainRoleBadge from '../components/ChainRoleBadge';
import DaoContextSelector from '../components/DaoContextSelector';
import { GovernanceLayerCard, GovernanceStandingSummary } from '../components/GovernanceStanding';
import ProposalList from '../components/ProposalList';
import SubDaoExplorer from '../components/SubDaoExplorer';
import { useChainRegistry } from '../hooks/useChainRegistry';
import { useGovernanceConsole } from '../hooks/useGovernanceConsole';

function StatCard({ icon, label, value, detail }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
        <span className="material-symbols-outlined text-[20px] text-cyan-200">{icon}</span>
      </div>
      <div className="text-3xl font-black tracking-tight text-on-surface">{value}</div>
      <div className="mt-2 text-xs text-on-surface-variant">{detail}</div>
    </div>
  );
}

function SourceBanner({ source, status, error }) {
  if (status === 'success') {
    return (
      <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-200">
        Registry synced from Axodus Governance backend.
      </div>
    );
  }

  if (source === 'fallback') {
    return (
      <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
        Backend registry is not reachable from this app session. Showing local PoC registry snapshot.
        {error?.message ? <span className="ml-2 font-mono text-xs text-amber-200/80">{error.message}</span> : null}
      </div>
    );
  }

  return null;
}

function ExecutionChainPanel({ chain }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Execution Chain</h2>
          <p className="text-xs text-on-surface-variant">Canonical authority for the current governance PoC.</p>
        </div>
        <span className="material-symbols-outlined text-cyan-200">hub</span>
      </div>
      {chain ? (
        <div className="space-y-5">
          <div>
            <div className="text-2xl font-black text-on-surface">{chain.name}</div>
            <div className="mt-1 font-mono text-xs text-slate-500">
              {chain.network} · chainId {chain.chainId}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(chain.roles ?? []).map((role) => (
              <ChainRoleBadge key={role} role={role} />
            ))}
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md bg-surface-container-high p-3">
              <dt className="text-xs text-slate-500">Adapter</dt>
              <dd className="mt-1 font-bold text-on-surface">{chain.adapter}</dd>
            </div>
            <div className="rounded-md bg-surface-container-high p-3">
              <dt className="text-xs text-slate-500">Finality</dt>
              <dd className="mt-1 font-bold text-on-surface">{chain.finality?.confirmationBlocks} blocks</dd>
            </div>
          </dl>
          <GovernanceStandingSummary chain={chain} />
        </div>
      ) : (
        <div className="rounded-md bg-surface-container-high p-4 text-sm text-on-surface-variant">
          No execution chain is registered.
        </div>
      )}
    </section>
  );
}

function OperationsPanel() {
  const items = [
    { label: 'Axodus constitutional governance', status: 'Authority' },
    { label: 'Investment agency sub-DAOs', status: 'Model' },
    { label: 'Sub-DAO autonomous strategy', status: 'Scoped' },
    { label: 'Constitutional standing observability', status: 'Required' },
    { label: 'Proposal aggregation', status: 'Next' },
  ];

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Governance Operations</h2>
          <p className="text-xs text-on-surface-variant">Frontend shell for the multichain operating dashboard.</p>
        </div>
        <span className="material-symbols-outlined text-cyan-200">account_tree</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md bg-surface-container-high px-3 py-3">
            <span className="text-sm font-semibold text-on-surface">{item.label}</span>
            <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ObservabilityPanel({ summary }) {
  const statusEntries = Object.entries(summary.governanceStatusCounts ?? {});
  const tierEntries = Object.entries(summary.federationTierCounts ?? {});
  const severityEntries = Object.entries(summary.reasonSeverityCounts ?? {});

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Governance Observability</h2>
          <p className="mt-1 text-xs text-on-surface-variant">Registry-rendered status, federation tier and guardrail severity distribution.</p>
        </div>
        <span className="material-symbols-outlined text-cyan-200">monitoring</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs font-bold uppercase text-slate-500">Governance status</div>
          <div className="mt-3 space-y-2">
            {statusEntries.map(([status, count]) => (
              <div key={status} className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>{status}</span>
                <span className="font-black text-on-surface">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs font-bold uppercase text-slate-500">Federation tiers</div>
          <div className="mt-3 space-y-2">
            {tierEntries.map(([tier, count]) => (
              <div key={tier} className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>{tier}</span>
                <span className="font-black text-on-surface">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs font-bold uppercase text-slate-500">Guardrail severity</div>
          <div className="mt-3 space-y-2">
            {severityEntries.length > 0 ? (
              severityEntries.map(([severity, count]) => (
                <div key={severity} className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>{severity}</span>
                  <span className="font-black text-on-surface">{count}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-on-surface-variant">No active severity metadata</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GovernanceDashboard() {
  const { chains, summary, source, status, error } = useChainRegistry();
  const governanceConsole = useGovernanceConsole(chains);
  const executionChain = chains.find((chain) => chain.roles?.includes('execution'));

  return (
    <main className="min-h-full bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">Governance</span>
            <h1 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">Governance Operations Center</h1>
            <p className="mt-2 max-w-3xl text-sm text-on-surface-variant">
              Connected observability surface for constitutional governance, federation state, local governance and multichain execution readiness.
            </p>
          </div>
        </header>

        <SourceBanner source={source} status={status} error={error} />

        <DaoContextSelector
          daos={governanceConsole.daos}
          selectedDaoId={governanceConsole.selectedDaoId}
          onSelect={governanceConsole.setSelectedDaoId}
          selectedChain={governanceConsole.selectedChain}
          status={governanceConsole.status}
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon="lan" label="Registered chains" value={summary.totalChains} detail={`${summary.evmCount} EVM core networks`} />
          <StatCard icon="verified" label="Execution chains" value={summary.roleCounts.execution} detail="Sepolia is the PoC authority" />
          <StatCard icon="how_to_vote" label="Voting chains" value={summary.roleCounts.voting} detail="Participation surfaces" />
          <StatCard icon="extension" label="Plugin types" value={summary.pluginTypes} detail={`${summary.legacyCount} legacy adapter network`} />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.3fr]">
          <ExecutionChainPanel chain={executionChain} />
          <OperationsPanel />
        </section>

        <ObservabilityPanel summary={summary} />

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <GovernanceLayerCard
            title="Constitutional Governance Layer"
            icon="gavel"
            items={['Federation access', 'Constitutional standing', 'Ecosystem permissions', 'Protocol standards', 'Systemic guardrails']}
          />
          <GovernanceLayerCard
            title="Local Governance Layer"
            icon="groups"
            items={['Treasury strategy', 'DAO operations', 'Local proposals', 'Member permissions', 'Local plugins', 'Local economic policies']}
          />
        </section>

        <SubDaoExplorer
          daos={governanceConsole.daos}
          chains={chains}
          selectedDao={governanceConsole.selectedDao}
          selectedDaoId={governanceConsole.selectedDaoId}
          onSelect={governanceConsole.setSelectedDaoId}
          plugins={governanceConsole.plugins}
          proposals={governanceConsole.proposals}
          status={governanceConsole.status}
          error={governanceConsole.error}
        />

        <ProposalList
          proposals={governanceConsole.proposals}
          selectedDao={governanceConsole.selectedDao}
          canCreateProposal={governanceConsole.canCreateProposal}
        />

        <ChainRegistryTable chains={chains} />
      </div>
    </main>
  );
}
