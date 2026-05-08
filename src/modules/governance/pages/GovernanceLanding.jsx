import { Link } from 'react-router-dom';
import ChainRoleBadge from '../components/ChainRoleBadge';
import { useChainRegistry } from '../hooks/useChainRegistry';

function PublicMetric({ label, value, detail }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-black text-on-surface">{value}</div>
      <div className="mt-2 text-xs text-on-surface-variant">{detail}</div>
    </div>
  );
}

function GovernanceLayer({ icon, title, description }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <span className="material-symbols-outlined text-cyan-200">{icon}</span>
      <h3 className="mt-4 text-base font-bold text-on-surface">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{description}</p>
    </div>
  );
}

export default function GovernanceLanding() {
  const { chains, summary, source } = useChainRegistry();
  const executionChain = chains.find((chain) => chain.roles?.includes('execution'));
  const publicRegistryChains = chains.filter((chain) => !chain.legacyHarmonyAdapter);
  const publicChains = publicRegistryChains.slice(0, 5);
  const publicRoleCounts = publicRegistryChains.reduce(
    (acc, chain) => {
      chain.roles?.forEach((role) => {
        acc[role] = (acc[role] ?? 0) + 1;
      });
      return acc;
    },
    { voting: 0, spoke: 0 },
  );

  return (
    <main className="min-h-full bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-primary">Axodus Governance</span>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-on-surface md:text-6xl">
              Federated DAO governance for multichain economic execution.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-on-surface-variant">
              Axodus Governance coordinates DAO federation, proposal lifecycle, chain capabilities, plugin access and execution
              visibility across the ecosystem. Public information is available here; operational actions require wallet connection.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/governance/console"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-black text-on-primary shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                Open Governance Console
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Current execution chain</div>
                <div className="mt-2 text-2xl font-black text-on-surface">{executionChain?.name ?? 'Not registered'}</div>
                <div className="mt-1 font-mono text-xs text-slate-500">
                  {executionChain ? `${executionChain.network} · chainId ${executionChain.chainId}` : 'Registry pending'}
                </div>
              </div>
              <span className="material-symbols-outlined text-cyan-200">hub</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(executionChain?.roles ?? []).map((role) => (
                <ChainRoleBadge key={role} role={role} />
              ))}
            </div>
            <div className="mt-5 rounded-md border border-white/5 bg-surface-container-high p-3 text-xs text-on-surface-variant">
              Registry source: <span className="font-bold text-on-surface">{source}</span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <PublicMetric label="Supported chains" value={publicRegistryChains.length} detail={`${summary.evmCount} EVM core networks`} />
          <PublicMetric label="Voting surfaces" value={publicRoleCounts.voting} detail="Cross-chain participation readiness" />
          <PublicMetric label="Spoke networks" value={publicRoleCounts.spoke} detail="Operational execution targets" />
          <PublicMetric label="Plugin types" value={summary.pluginTypes} detail="Governance capabilities exposed by registry" />
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <GovernanceLayer
            icon="how_to_vote"
            title="Federal Proposal Coordination"
            description="Public visibility into the central Axodus governance structure and future proposal aggregation across sub-DAOs."
          />
          <GovernanceLayer
            icon="policy"
            title="Central Constitutional Authority"
            description="Sub-DAOs keep local decision autonomy, but must remain compatible with Axodus federal governance constraints."
          />
          <GovernanceLayer
            icon="business_center"
            title="Investment Agency Sub-DAOs"
            description="Each sub-DAO represents an ecosystem company or investment agency with scoped strategy and accountable operations."
          />
        </section>

        <section className="rounded-lg border border-white/5 bg-surface-container-highest">
          <div className="border-b border-white/5 px-5 py-4">
            <h2 className="text-lg font-bold text-on-surface">Public Network Map</h2>
            <p className="text-xs text-on-surface-variant">Initial registry view. Operational controls are available in the connected console.</p>
          </div>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-5">
            {publicChains.map((chain) => (
              <div key={chain.slug ?? chain.network} className="border-b border-white/5 p-5 md:border-r xl:border-b-0">
                <div className="text-sm font-bold text-on-surface">{chain.name}</div>
                <div className="mt-1 font-mono text-[11px] text-slate-500">#{chain.chainId}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(chain.roles ?? []).map((role) => (
                    <ChainRoleBadge key={role} role={role} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
