import ChainRegistryTable from '../components/ChainRegistryTable';
import ChainRoleBadge from '../components/ChainRoleBadge';
import { useChainRegistry } from '../hooks/useChainRegistry';

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
    { label: 'DAO federation records', status: 'Prepared' },
    { label: 'Proposal aggregation', status: 'Next' },
    { label: 'Remote execution receipts', status: 'Next' },
    { label: 'Constitutional conditions', status: 'Hooked' },
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

export default function GovernanceDashboard() {
  const { chains, summary, source, status, error } = useChainRegistry();
  const executionChain = chains.find((chain) => chain.roles?.includes('execution'));

  return (
    <main className="min-h-full bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">Governance</span>
            <h1 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">DAO Operating Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm text-on-surface-variant">
              Axodus governance control surface for chain registry, federation readiness, plugin capabilities and execution state.
            </p>
          </div>
          <a
            href="https://governance.country"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-container-high px-4 py-2 text-sm font-bold text-on-surface hover:bg-surface-bright"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            Harmony Governance
          </a>
        </header>

        <SourceBanner source={source} status={status} error={error} />

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

        <ChainRegistryTable chains={chains} />
      </div>
    </main>
  );
}
