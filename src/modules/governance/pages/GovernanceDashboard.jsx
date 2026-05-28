import ChainRegistryTable from '../components/ChainRegistryTable';
import ChainRoleBadge from '../components/ChainRoleBadge';
import ConstitutionalLayerPanel from '../components/ConstitutionalLayerPanel';
import { ScopeSection } from '@/components/uiScope';
import CreateProposalIntegrationStatus from '../components/CreateProposalIntegrationStatus';
import DaoContextSelector from '../components/DaoContextSelector';
import { GovernanceLayerCard, GovernanceStandingSummary, ReasonSeverityBadge } from '../components/GovernanceStanding';
import ProposalList from '../components/ProposalList';
import SubDaoExplorer from '../components/SubDaoExplorer';
import { shouldUseGovernanceMocks } from '../api/mockGovernanceData';
import { useChainRegistry } from '../hooks/useChainRegistry';
import { useGovernanceConsole } from '../hooks/useGovernanceConsole';
import { useProposalDrafts } from '../hooks/useProposalDrafts';
import { acsMock } from '@/data/mock';

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
  const items = acsMock.workflows.slice(0, 5).map((workflow) => ({
    label: workflow.title,
    status: workflow.status,
  }));

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface">ACS Operations</h2>
          <p className="text-xs text-on-surface-variant">Mock ACS workflow feed for the multichain operating dashboard.</p>
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

function TenantMetric({ label, value, detail }) {
  return (
    <div className="rounded-md bg-surface-container-high p-3">
      <div className="text-[10px] font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-black text-on-surface">{value}</div>
      {detail ? <div className="mt-1 text-xs text-on-surface-variant">{detail}</div> : null}
    </div>
  );
}

function TenantPills({ items = [], emptyLabel }) {
  if (!items.length) {
    return <div className="text-xs text-on-surface-variant">{emptyLabel}</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-md border border-white/10 bg-surface-container-high px-2 py-1 text-[11px] font-bold text-slate-300">
          {item}
        </span>
      ))}
    </div>
  );
}

function GovernanceExecutorPanel({ resolution, source }) {
  const executor = resolution?.executor;
  const reasonCodes = resolution?.reasonCodes ?? executor?.reasonCodes ?? [];

  return (
    <section className="rounded-lg border border-amber-300/15 bg-surface-container-highest">
      <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Canonical Governance Executor</h2>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">
            Read-only executor reference for DAO/tenant routing. This is not a wallet, signer, production address or execution trigger.
          </p>
        </div>
        <span className="rounded-md border border-amber-300/20 bg-amber-950/20 px-3 py-1 text-xs font-black uppercase text-amber-100">
          {executor?.executionMode ?? 'not resolved'}
        </span>
      </div>

      {executor ? (
        <div className="grid gap-3 p-5 md:grid-cols-3">
          <TenantMetric label="Executor" value={executor.executorId} detail={executor.governanceExecutorRef} />
          <TenantMetric label="Status" value={executor.executorStatus} detail={`scope: ${executor.executorScope}`} />
          <TenantMetric label="Policy version" value={executor.policyVersion} detail={source ?? 'governance-api'} />
          <TenantMetric label="Address status" value={executor.addressStatus} detail={executor.address ?? 'No address configured'} />
          <TenantMetric label="Production executor" value={executor.isProductionExecutor ? 'yes' : 'no'} detail="safe implementation boundary" />
          <TenantMetric
            label="Blocked"
            value={resolution.blocked ? 'yes' : 'no'}
            detail={executor.emergencyDisabled ? 'emergency disabled' : 'policy evaluated'}
          />
          <TenantMetric label="Proposal support" value={resolution.supported ? 'supported' : 'restricted'} detail="selected executor resolution" />
          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4 md:col-span-3">
            <div className="text-xs font-black uppercase text-slate-500">Supported proposal types</div>
            <div className="mt-3">
              <TenantPills items={executor.supportedProposalTypes} emptyLabel="No proposal types configured." />
            </div>
          </div>
          <div className="rounded-lg border border-amber-300/15 bg-amber-950/10 p-4 md:col-span-3">
            <div className="text-xs font-black uppercase text-amber-100">Execution authority boundary</div>
            <p className="mt-2 text-sm leading-6 text-amber-50/80">
              {executor.authorityBoundary ??
                'Executor status is informational only. Governance runtime, contracts, indexers and receipts must prove execution.'}
            </p>
          </div>
          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4 md:col-span-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="text-xs font-black uppercase text-slate-500">Executor reason codes</div>
              <span className="w-fit rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                {reasonCodes.length} reason{reasonCodes.length === 1 ? '' : 's'}
              </span>
            </div>
            {reasonCodes.length ? (
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {reasonCodes.map((reason, index) => (
                  <div key={`${reason.reasonCode}-${index}`} className="rounded-md border border-white/5 bg-background/30 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-black uppercase text-on-surface">{reason.reasonCode}</span>
                      <ReasonSeverityBadge severity={reason.reasonSeverity} />
                    </div>
                    <div className="mt-2 text-xs leading-5 text-on-surface-variant">
                      {reason.message ?? reason.source ?? 'Governance executor registry'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-xs text-on-surface-variant">No executor reason codes are currently exposed.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-5 text-sm text-on-surface-variant">No canonical executor reference is resolved for this tenant.</div>
      )}
    </section>
  );
}

function DaoTenantOperationsCenter({ tenant, selectedDao, selectedChain, tenantSource }) {
  if (!tenant) {
    return (
      <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
        <h2 className="text-lg font-bold text-on-surface">DAO Tenant Operations Center</h2>
        <p className="mt-2 text-sm text-on-surface-variant">No DAO tenant account is selected.</p>
      </section>
    );
  }

  const standing = typeof tenant.constitutionalStanding === 'string' ? tenant.constitutionalStanding : tenant.constitutionalStanding?.status;

  return (
    <section className="rounded-lg border border-cyan-300/15 bg-surface-container-highest">
      <div className="flex flex-col gap-4 border-b border-white/5 px-5 py-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">DAO Tenant Account</span>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface">{tenant.name}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">
            Operational business account governed under Axodus constitutional authority. Registry, standing, guardrails, products, agents,
            proposals and receipts are rendered as tenant context.
          </p>
        </div>
        <div className="grid min-w-0 gap-2 text-xs sm:grid-cols-2 xl:w-[360px]">
          <TenantMetric label="Tenant type" value={tenant.tenantType} detail={tenant.legalOrPublicName} />
          <TenantMetric label="Source" value={tenantSource ?? tenant.source ?? 'observed'} detail="rendered state only" />
        </div>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 md:grid-cols-2">
          <TenantMetric label="Constitutional standing" value={standing ?? 'under-review'} detail={`Governance status: ${tenant.governanceStatus}`} />
          <TenantMetric label="Federation tier" value={tenant.federationTier} detail={tenant.constitutionalAuthority?.authorityModel} />
          <TenantMetric label="Local governance model" value={tenant.localGovernanceModel ?? selectedDao?.votingType ?? 'Not indexed'} detail={tenant.constitutionalAuthority?.layer} />
          <TenantMetric
            label="Treasury status"
            value={tenant.treasury?.policyStatus ?? 'not-configured'}
            detail={tenant.treasury?.address ? `${tenant.treasury.address.slice(0, 8)}...${tenant.treasury.address.slice(-6)}` : 'No treasury address indexed'}
          />
          <TenantMetric label="Members / roles" value={tenant.members?.total ?? 0} detail={(tenant.members?.roles ?? []).join(', ') || 'No roles indexed'} />
          <TenantMetric label="Execution context" value={selectedChain?.name ?? 'No chain'} detail={selectedChain?.network ?? selectedDao?.network} />
        </div>

        <div className="grid gap-3">
          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
            <div className="text-xs font-black uppercase text-slate-500">Products enabled</div>
            <div className="mt-3">
              <TenantPills items={tenant.productsEnabled} emptyLabel="No products indexed for this tenant." />
            </div>
          </div>
          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
            <div className="text-xs font-black uppercase text-slate-500">Agents assigned</div>
            <div className="mt-3">
              <TenantPills items={tenant.agentsAssigned} emptyLabel="No agents assigned to this tenant." />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/5 p-5 md:grid-cols-4">
        <TenantMetric label="Active proposals" value={tenant.activeProposals} />
        <TenantMetric label="Pending operations" value={tenant.pendingOperations} />
        <TenantMetric label="Execution receipts" value={tenant.executionReceipts} />
        <TenantMetric label="Guardrail reasons" value={(tenant.reasonCodes ?? []).length} />
      </div>
    </section>
  );
}

function GovernanceHealthPanel({ tenant, selectedChain, proposals, plugins, guardrailReasons }) {
  const standing = typeof tenant?.constitutionalStanding === 'string' ? tenant.constitutionalStanding : tenant?.constitutionalStanding?.status;

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="border-b border-white/5 px-5 py-4">
        <h2 className="text-lg font-bold text-on-surface">Governance Health</h2>
        <p className="mt-1 text-xs text-on-surface-variant">Compact operational health for the selected DAO tenant workspace.</p>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-5">
        <TenantMetric label="Standing" value={standing ?? 'under-review'} detail={tenant?.constitutionalAuthority?.authorityModel} />
        <TenantMetric label="Governance uptime" value="observed" detail={tenant?.source ?? 'tenant source'} />
        <TenantMetric label="Execution status" value={selectedChain?.capabilities?.execution ? 'available' : 'restricted'} detail={selectedChain?.name ?? 'No chain'} />
        <TenantMetric label="Proposal activity" value={proposals.length} detail="active/indexed + local" />
        <TenantMetric label="Guardrail reasons" value={guardrailReasons.length} detail={`${plugins.length} plugin sources`} />
      </div>
    </section>
  );
}

function TreasuryExecutionPanel({ tenant, selectedChain }) {
  const pendingExecutions = tenant?.pendingOperations ?? 0;
  const receipts = tenant?.executionReceipts ?? 0;
  const treasury = tenant?.treasury ?? {};

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="border-b border-white/5 px-5 py-4">
        <h2 className="text-lg font-bold text-on-surface">Treasury Execution</h2>
        <p className="mt-1 text-xs text-on-surface-variant">Treasury status, execution queue and receipt visibility for the selected tenant.</p>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-4">
        <TenantMetric label="Treasury health" value={treasury.policyStatus ?? 'not-configured'} detail="policy status" />
        <TenantMetric label="Pending executions" value={pendingExecutions} detail="tenant operations" />
        <TenantMetric label="Execution receipts" value={receipts} detail="indexed or observed" />
        <TenantMetric label="Execution chain" value={selectedChain?.name ?? 'Not indexed'} detail={treasury.chainId ? `chainId ${treasury.chainId}` : selectedChain?.network} />
      </div>
    </section>
  );
}

function ProposalActivityPanel({ proposals }) {
  const active = proposals.filter((proposal) => ['active', 'under review', 'ready for review', 'local draft'].includes(String(proposal.status ?? '').toLowerCase())).length;
  const treasuryImpact = proposals.filter((proposal) => String(proposal.category ?? proposal.actionType ?? '').toLowerCase().includes('treasury')).length;
  const withReasonCodes = proposals.filter((proposal) => (proposal.reasonCodes ?? proposal.createProposalRequest?.guardrails?.reasonCodes ?? []).length > 0).length;

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="border-b border-white/5 px-5 py-4">
        <h2 className="text-lg font-bold text-on-surface">Proposal Activity</h2>
        <p className="mt-1 text-xs text-on-surface-variant">Operational proposal state with treasury and guardrail context.</p>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-4">
        <TenantMetric label="Active proposals" value={active} detail={`${proposals.length} total visible`} />
        <TenantMetric label="Treasury impact" value={treasuryImpact} detail="category/action metadata" />
        <TenantMetric label="Reason-coded" value={withReasonCodes} detail="guardrail visible" />
        <TenantMetric label="Execution ETA" value="indexer-bound" detail="requires proposal receipts" />
      </div>
    </section>
  );
}

function readinessTone(status) {
  if (status === 'ready') return 'border-emerald-300/20 bg-emerald-950/20 text-emerald-100';
  if (status === 'dev') return 'border-cyan-300/20 bg-cyan-950/20 text-cyan-100';
  if (status === 'waiting') return 'border-amber-300/20 bg-amber-950/20 text-amber-100';
  return 'border-white/10 bg-surface-container-high text-slate-300';
}

function GovernanceReadinessPanel({ registryStatus, registrySource, selectedDao, selectedChain, proposals, plugins, proposalDrafts, canCreateProposal }) {
  const mockMode = shouldUseGovernanceMocks();
  const items = [
    {
      label: 'Registry source',
      value: registryStatus === 'success' ? 'Backend synced' : registrySource === 'fallback' ? 'Fallback snapshot' : 'Loading',
      detail: registryStatus === 'success' ? 'Chain and guardrail metadata are coming from the Governance API.' : 'Using local renderable state until backend data is reachable.',
      status: registryStatus === 'success' ? 'ready' : 'waiting',
      icon: 'dns',
    },
    {
      label: 'Selected governance context',
      value: selectedDao?.name ?? 'No DAO selected',
      detail: selectedChain?.name ? `${selectedChain.name} · ${selectedDao?.governanceStatus ?? 'under-review'}` : 'No registered chain context selected.',
      status: selectedDao && selectedChain ? 'ready' : 'waiting',
      icon: 'account_tree',
    },
    {
      label: 'Proposal data',
      value: proposals.length ? `${proposals.length} proposal${proposals.length === 1 ? '' : 's'}` : 'No proposals indexed',
      detail: mockMode ? 'Development fixtures are enabled for proposal UI validation.' : 'Proposal count reflects backend/indexer payloads.',
      status: proposals.length ? (mockMode ? 'dev' : 'ready') : 'waiting',
      icon: 'ballot',
    },
    {
      label: 'Plugin data',
      value: plugins.length ? `${plugins.length} plugin${plugins.length === 1 ? '' : 's'}` : 'No plugins indexed',
      detail: mockMode ? 'Development plugin fixtures are enabled.' : 'Plugin capabilities are rendered from governance data sources.',
      status: plugins.length ? (mockMode ? 'dev' : 'ready') : 'waiting',
      icon: 'extension',
    },
    {
      label: 'Local drafts',
      value: proposalDrafts.length ? `${proposalDrafts.length} draft${proposalDrafts.length === 1 ? '' : 's'}` : 'No local drafts',
      detail: proposalDrafts.length
        ? 'Drafts are stored locally for development review and are not backend or on-chain proposals.'
        : 'No local proposal drafts have been generated in this browser session.',
      status: proposalDrafts.length ? 'dev' : 'waiting',
      icon: 'draft',
    },
    {
      label: 'Proposal creation',
      value: canCreateProposal ? 'Wallet-ready' : 'Read-only',
      detail: canCreateProposal
        ? 'Selected context has enough observed state for the create-proposal entry point.'
        : 'Creation remains hidden until wallet, DAO, chain and plugin state are present.',
      status: canCreateProposal ? 'ready' : 'waiting',
      icon: 'edit_note',
    },
  ];

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Operations Readiness</h2>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">
            Rendered readiness of the current Governance Operations Center inputs. This panel reports observed frontend data availability only.
          </p>
        </div>
        <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">
          {mockMode ? 'dev fixtures enabled' : 'backend/indexer mode'}
        </span>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-6">
        {items.map((item) => (
          <div key={item.label} className={`rounded-lg border p-4 ${readinessTone(item.status)}`}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[11px] font-black uppercase opacity-80">{item.label}</span>
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            </div>
            <div className="text-sm font-black">{item.value}</div>
            <p className="mt-2 text-xs leading-5 opacity-80">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConstitutionalGuardrailsPanel({
  reasons = [],
  title = 'Constitutional Guardrails',
  description = 'Active reason codes rendered from registry, plugin and indexer state. The frontend does not infer enforcement.',
}) {
  const activeReasons = reasons.slice(0, 8);

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">{title}</h2>
          <p className="mt-1 text-xs text-on-surface-variant">{description}</p>
        </div>
        <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">
          {reasons.length} active reasons
        </span>
      </div>

      {activeReasons.length > 0 ? (
        <div className="divide-y divide-white/5">
          {activeReasons.map((reason, index) => (
            <article key={`${reason.network}-${reason.reasonCode}-${index}`} className="px-5 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black uppercase text-on-surface">{reason.reasonCode}</span>
                    <ReasonSeverityBadge severity={reason.reasonSeverity} />
                  </div>
                  <div className="mt-2 text-xs text-on-surface-variant">
                    {reason.scope} · {reason.source}
                  </div>
                </div>
                <span className="w-fit rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-slate-300">
                  {reason.network}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="px-5 py-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high text-cyan-200">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <h3 className="mt-4 text-base font-bold text-on-surface">No active guardrail reason codes</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
            Registry, plugin and indexer state are not currently exposing active guardrail reasons.
          </p>
        </div>
      )}
    </section>
  );
}

export default function GovernanceDashboard() {
  const { chains, summary, source, status, error } = useChainRegistry();
  const governanceConsole = useGovernanceConsole(chains);
  const proposalDrafts = useProposalDrafts({
    selectedDao: governanceConsole.selectedDao,
    selectedChain: governanceConsole.selectedChain,
    walletAddress: governanceConsole.walletAddress,
  });
  const executionChain = chains.find((chain) => chain.roles?.includes('execution'));
  const visibleProposals = [...proposalDrafts.drafts, ...governanceConsole.proposals];

  return (
    <main className="min-h-full bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">Governance</span>
            <h1 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">DAO Tenant Operations Center</h1>
            <p className="mt-2 max-w-3xl text-sm text-on-surface-variant">
              Governed business-unit control room for tenant DAOs, constitutional authority, treasury state, products, agents, proposals and execution receipts.
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

        <ScopeSection
          scope="tenant"
          title="Selected tenant operating context"
          description="DAO tenant profile, local governance state and treasury posture are scoped to the selected organization."
        >
          <DaoTenantOperationsCenter
            tenant={governanceConsole.selectedTenant}
            selectedDao={governanceConsole.selectedDao}
            selectedChain={governanceConsole.selectedChain}
            tenantSource={governanceConsole.tenantSource}
          />
        </ScopeSection>

        <ScopeSection
          scope="operator"
          title="Execution control and review"
          description="Executor readiness, guardrails and operational blockers are operator-scoped preview data."
        >
          <GovernanceExecutorPanel resolution={governanceConsole.executorResolution} source={governanceConsole.executorSource} />
        </ScopeSection>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
          <GovernanceHealthPanel
            tenant={governanceConsole.selectedTenant}
            selectedChain={governanceConsole.selectedChain}
            proposals={visibleProposals}
            plugins={governanceConsole.plugins}
            guardrailReasons={governanceConsole.selectedGuardrailReasons}
          />
          <TreasuryExecutionPanel tenant={governanceConsole.selectedTenant} selectedChain={governanceConsole.selectedChain} />
        </section>

        <ProposalActivityPanel proposals={visibleProposals} />

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

        <ConstitutionalLayerPanel chain={governanceConsole.selectedChain ?? executionChain} />

        <GovernanceReadinessPanel
          registryStatus={status}
          registrySource={source}
          selectedDao={governanceConsole.selectedDao}
          selectedChain={governanceConsole.selectedChain}
          proposals={governanceConsole.proposals}
          plugins={governanceConsole.plugins}
          proposalDrafts={proposalDrafts.drafts}
          canCreateProposal={governanceConsole.canCreateProposal}
        />

        <CreateProposalIntegrationStatus
          proposalDrafts={proposalDrafts.drafts}
          selectedDao={governanceConsole.selectedDao}
          selectedChain={governanceConsole.selectedChain}
        />

        <ConstitutionalGuardrailsPanel reasons={summary.guardrailReasons} />

        <ConstitutionalGuardrailsPanel
          title="Selected Context Guardrails"
          description="Reason codes affecting the currently selected DAO and chain context."
          reasons={governanceConsole.selectedGuardrailReasons}
        />

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
          proposals={visibleProposals}
          status={governanceConsole.status}
          error={governanceConsole.error}
        />

        <ProposalList
          proposals={visibleProposals}
          selectedDao={governanceConsole.selectedDao}
          selectedChain={governanceConsole.selectedChain}
          plugins={governanceConsole.plugins}
          walletAddress={governanceConsole.walletAddress}
          canCreateProposal={governanceConsole.canCreateProposal}
          onCreateDraft={proposalDrafts.createDraft}
          onMarkReadyForReview={proposalDrafts.markDraftReadyForReview}
          onSubmitDraft={proposalDrafts.submitDraft}
        />

        <ChainRegistryTable chains={chains} />
      </div>
    </main>
  );
}
