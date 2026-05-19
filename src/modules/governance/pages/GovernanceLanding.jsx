import { Link } from 'react-router-dom';
import ChainRoleBadge from '../components/ChainRoleBadge';
import ConstitutionalLayerPanel from '../components/ConstitutionalLayerPanel';
import { GovernanceLayerCard, GovernanceStandingSummary } from '../components/GovernanceStanding';
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

function GovernanceStatusBar({ executionChain, summary, source }) {
  const activeAlerts = summary.guardrailReasons?.length ?? 0;

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest px-4 py-3">
      <div className="grid gap-3 md:grid-cols-5">
        <PublicMetric label="Root authority" value="Axodus Root DAO" detail="Constitutional governance" />
        <PublicMetric label="Standing" value="compliant" detail="Registry-rendered status" />
        <PublicMetric label="Treasury policy" value="review-required" detail="Execution safety boundary" />
        <PublicMetric label="Execution health" value={executionChain?.name ?? 'Pending'} detail={executionChain?.network ?? 'No execution chain'} />
        <PublicMetric label="Active alerts" value={activeAlerts} detail={`Registry source: ${source}`} />
      </div>
    </section>
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

function RootDaoOverview({ executionChain, summary }) {
  return (
    <section className="rounded-lg border border-cyan-300/15 bg-surface-container-highest">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-white/5 p-5 lg:border-b-0 lg:border-r">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Constitutional Authority</span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-on-surface">Axodus Root DAO</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-on-surface-variant">
            Root governance context for federation standing, treasury constraints, execution authorization and ecosystem-wide guardrails.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-md border border-emerald-300/20 bg-emerald-950/20 px-2 py-1 text-[11px] font-black uppercase text-emerald-100">
              compliant
            </span>
            <span className="rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2 py-1 text-[11px] font-black uppercase text-cyan-100">
              federation root
            </span>
            <span className="rounded-md border border-amber-300/20 bg-amber-950/20 px-2 py-1 text-[11px] font-black uppercase text-amber-100">
              treasury review
            </span>
          </div>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-2">
          <PublicMetric label="Active chains" value={summary.totalChains} detail={`${summary.evmCount} EVM core networks`} />
          <PublicMetric label="DAO count" value="tenant source" detail="Root + indexed tenant DAOs" />
          <PublicMetric label="Execution queues" value={summary.guardrailReasons?.length ?? 0} detail="Guardrail-bound operations" />
          <PublicMetric label="Execution chain" value={executionChain?.name ?? 'Pending'} detail={executionChain?.network ?? 'Registry pending'} />
        </div>
      </div>
    </section>
  );
}

function DaoFederationMap() {
  const layers = [
    { title: 'Axodus Constitution', detail: 'Federal standards and guardrails' },
    { title: 'Federation Registry', detail: 'Membership, tiers and tenant standing' },
    { title: 'Axodus Root DAO', detail: 'Constitutional execution authority' },
    { title: 'Product DAOs', detail: 'Product-specific governance workspaces' },
    { title: 'Partner DAOs', detail: 'Federated operating organizations' },
    { title: 'Client / Tenant DAOs', detail: 'Business-unit accounts and local operations' },
  ];

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface">DAO Federation Map</h2>
          <p className="mt-1 text-xs text-on-surface-variant">Operational topology of constitutional authority, federation and tenant DAO workspaces.</p>
        </div>
        <span className="material-symbols-outlined text-cyan-200">account_tree</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {layers.map((layer, index) => (
          <div key={layer.title} className="flex items-center gap-3 md:flex-col">
            <div className="min-h-[104px] w-full rounded-lg border border-white/10 bg-surface-container-high px-3 py-3 text-center">
              <div className="text-sm font-black text-on-surface">{layer.title}</div>
              <div className="mt-2 text-[11px] leading-4 text-on-surface-variant">{layer.detail}</div>
            </div>
            {index < layers.length - 1 ? (
              <span className="material-symbols-outlined rotate-90 text-cyan-200 md:rotate-0">arrow_downward</span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
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
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <GovernanceStatusBar executionChain={executionChain} summary={summary} source={source} />

        <RootDaoOverview executionChain={executionChain} summary={summary} />

        <DaoFederationMap />

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-primary">Axodus Governance</span>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-on-surface md:text-4xl">
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
            <div className="mt-4">
              <GovernanceStandingSummary chain={executionChain} compact />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <PublicMetric label="Supported chains" value={publicRegistryChains.length} detail={`${summary.evmCount} EVM core networks`} />
          <PublicMetric label="Voting surfaces" value={publicRoleCounts.voting} detail="Cross-chain participation readiness" />
          <PublicMetric label="Spoke networks" value={publicRoleCounts.spoke} detail="Operational execution targets" />
          <PublicMetric label="Compliant status" value={summary.governanceStatusCounts?.compliant ?? 0} detail="Registry-rendered governance status" />
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
            description="Sub-DAOs keep local decision autonomy, while constitutional standing remains visible through Axodus federation constraints."
          />
          <GovernanceLayer
            icon="business_center"
            title="Investment Agency Sub-DAOs"
            description="Each sub-DAO represents an ecosystem company or investment agency with scoped strategy and accountable operations."
          />
        </section>

        <ConstitutionalLayerPanel chain={executionChain} />

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
