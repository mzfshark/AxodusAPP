import { Link, useParams } from 'react-router-dom';
import {
  BusinessBadge,
  BusinessErrorState,
  BusinessLifecycleTable,
  BusinessLoadingState,
  BusinessPageShell,
  BusinessPanel,
  BusinessRiskBadge,
  BusinessSeverityBadge,
  BusinessStatusBadge,
  BusinessSummaryCards,
  BusinessTelemetryFeed
} from '../components/BusinessUi';
import {
  useBusinessACSRuntimes,
  useBusinessAccessModel,
  useBusinessAssets,
  useBusinessAssetRegistry,
  useBusinessDebentures,
  useBusinessCriticalEvents,
  useBusinessEvents,
  useBusinessEventSummary,
  useBusinessFinanceRiskModel,
  useBusinessFundingRecords,
  useBusinessGovernanceReadiness,
  useBusinessOverview,
  useBusinessPlugins,
  useBusinessProjectRegistry,
  useBusinessProjects,
  useBusinessRegistrySummary,
  useBusinessRequests,
  useBusinessRevenueRecords,
  useBusinessRuntimeSummary,
  useBusinessRuntimeSafetyModel,
  useBusinessStateRuntime,
  useBusinessTelemetryEvents,
  useBusinessTreasuryExposures,
  useBusinessWorkflowSummary,
  useBusinessWorkflows
} from '../hooks/useBusinessData';

const money = (amount, currency = 'USD') => new Intl.NumberFormat('en-US', { currency, maximumFractionDigits: 0, style: 'currency' }).format(Number(amount || 0));

function queryFailed(...queries) {
  return queries.find((query) => query.isError);
}

const idCell = (key = 'id') => (row) => <span className="font-mono text-xs font-bold text-on-surface">{row[key]}</span>;
const statusCell = (key = 'status') => (row) => <BusinessStatusBadge status={row[key]} />;
const riskCell = (key = 'riskTier') => (row) => row[key] ? <BusinessRiskBadge riskTier={row[key]} /> : <span className="text-outline">n/a</span>;
const textCell = (key) => (row) => <span className="text-outline">{row[key] ?? 'n/a'}</span>;
const linkCell = (path, key = 'id') => (row) => row[key] ? <Link className="font-mono text-xs font-bold text-primary hover:text-primary-container" to={`${path}/${row[key]}`}>{row[key]}</Link> : <span className="text-outline">n/a</span>;

function ProgressBar({ value = 0 }) {
  return (
    <div className="min-w-[120px]">
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      <p className="mt-1 text-xs font-bold text-on-surface">{value}%</p>
    </div>
  );
}

export function BusinessOverview() {
  const overview = useBusinessOverview();
  const runtime = useBusinessRuntimeSummary();
  const projects = useBusinessProjects();
  const assets = useBusinessAssets();
  const treasury = useBusinessTreasuryExposures();
  const telemetry = useBusinessTelemetryEvents();
  const registry = useBusinessRegistrySummary();
  const workflows = useBusinessWorkflowSummary();
  const events = useBusinessEventSummary();

  if (overview.isLoading || runtime.isLoading || projects.isLoading || assets.isLoading || treasury.isLoading || telemetry.isLoading || registry.isLoading || workflows.isLoading || events.isLoading) return <BusinessLoadingState />;
  const failed = queryFailed(overview, runtime, projects, assets, treasury, telemetry, registry, workflows, events);
  if (failed) return <BusinessErrorState message={failed.error?.message || 'Business runtime unavailable.'} />;

  const dashboard = overview.data;
  const summary = runtime.data;

  return (
    <BusinessPageShell
      title="Business Runtime"
      description="Operational infrastructure, development intake, treasury exposure, ACS visibility, revenue routing and telemetry state rendered from the Business mock runtime."
    >
      <BusinessSummaryCards cards={[
        ...dashboard.cards,
        { id: 'debenture-status', label: 'Debenture Status', value: summary.totalDebentures, detail: 'Debenture lifecycle visibility only; no purchase or issuance is available.', status: 'NOTICE' },
        { id: 'governance-review-count', label: 'Governance Reviews', value: summary.activeGovernanceReviews, detail: 'Requests currently requiring governance review.', status: 'WARNING' },
        { id: 'funding-review-count', label: 'Funding Reviews', value: summary.activeFundingReviews, detail: 'Funding records in governance or treasury review.', status: 'WARNING' },
        { id: 'critical-events', label: 'Critical Events', value: summary.criticalTelemetryEvents, detail: 'Critical or emergency telemetry events visible in the mock runtime.', status: summary.criticalTelemetryEvents ? 'CRITICAL' : 'INFO' }
        , { id: 'registry-edges', label: 'Registry Edges', value: registry.data.relationshipEdges, detail: 'Read-only graph relationships across Business runtime entities.', status: 'INFO' },
        { id: 'blocked-workflows', label: 'Blocked Workflows', value: workflows.data.blockedWorkflows, detail: 'Workflow blockers detected from registry and runtime status.', status: workflows.data.blockedWorkflows ? 'WARNING' : 'INFO' },
        { id: 'runtime-events', label: 'Runtime Events', value: events.data.totalEvents, detail: 'Derived event timeline records across Business entities.', status: 'NOTICE' },
        { id: 'security-status', label: 'Security Validators', value: summary.securityValidatorStatus?.valid ? 'PASS' : 'REVIEW', detail: 'Non-execution and mock/read-only validator status.', status: summary.securityValidatorStatus?.valid ? 'APPROVED' : 'WARNING' }
      ]} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <BusinessPanel title="Runtime Health" description="Contract, policy and validator posture from the runtime package.">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Execution policies</span><strong className="text-on-surface">{summary.executionPolicySummary?.totalPolicies}</strong></div>
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Executable policies</span><strong className="text-on-surface">{summary.executionPolicySummary?.executablePolicies}</strong></div>
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Capabilities</span><strong className="text-on-surface">{summary.capabilitySummary?.totalCapabilities}</strong></div>
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Permission decisions</span><strong className="text-on-surface">{summary.permissionSummary?.totalDecisions}</strong></div>
          </div>
        </BusinessPanel>
        <BusinessPanel title="Workflow Readiness" description="Readiness is computed only; no workflow step can execute from this UI.">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Active workflows</span><strong className="text-on-surface">{workflows.data.totalWorkflows}</strong></div>
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Ready workflows</span><strong className="text-on-surface">{workflows.data.readyWorkflows}</strong></div>
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Blocked workflows</span><strong className="text-on-surface">{workflows.data.blockedWorkflows}</strong></div>
            <ProgressBar value={workflows.data.averageProgressPercent} />
          </div>
        </BusinessPanel>
        <BusinessPanel title="Registry Summary" description="Graph-like operational relationships exposed without database or backend mutations.">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Projects</span><strong className="text-on-surface">{registry.data.totalProjects}</strong></div>
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Assets</span><strong className="text-on-surface">{registry.data.totalAssets}</strong></div>
            <div className="flex items-center justify-between gap-3"><span className="text-outline">ACS runtimes</span><strong className="text-on-surface">{registry.data.totalACSRuntimes}</strong></div>
            <div className="flex items-center justify-between gap-3"><span className="text-outline">Runtime events</span><strong className="text-on-surface">{registry.data.totalRuntimeEvents}</strong></div>
          </div>
        </BusinessPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BusinessPanel title="Project Lifecycle" description="Active Business initiatives with risk and linked runtime context.">
            <BusinessLifecycleTable
              rows={dashboard.lifecycleTables.projects.slice(0, 6)}
              columns={[
                { key: 'id', label: 'Project', render: linkCell('/business/projects') },
                { key: 'label', label: 'Title', render: textCell('label') },
                { key: 'status', label: 'Status', render: statusCell() },
                { key: 'riskTier', label: 'Risk', render: riskCell() },
                { key: 'assetId', label: 'Asset', render: idCell('assetId') }
              ]}
            />
          </BusinessPanel>
        </div>
        <BusinessPanel title="Risk Tier Distribution" description="Risk is visible; no hidden treasury exposure is allowed.">
          <div className="space-y-3">
            {dashboard.riskIndicators.map((risk) => (
              <div key={risk.id} className="rounded-lg border border-white/10 bg-surface-container p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <BusinessRiskBadge riskTier={risk.riskTier} />
                  <BusinessStatusBadge status={risk.status} />
                </div>
                <p className="mt-3 text-sm text-outline">{risk.label}</p>
                <p className="mt-2 text-xs font-bold text-on-surface">{money(risk.treasuryExposureAmount?.amount, risk.treasuryExposureAmount?.currency)} approved exposure</p>
              </div>
            ))}
          </div>
        </BusinessPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Treasury Exposure" description="Visible allocation and consumption records. No movement or approval execution exists in the UI.">
          <BusinessLifecycleTable
            rows={dashboard.lifecycleTables.treasury}
            columns={[
              { key: 'id', label: 'Exposure', render: idCell() },
              { key: 'label', label: 'Amount', render: textCell('label') },
              { key: 'status', label: 'Status', render: statusCell() },
              { key: 'riskTier', label: 'Risk', render: riskCell() }
            ]}
          />
        </BusinessPanel>
        <BusinessPanel title="Telemetry Summary" description="Latest runtime events from the Business mock API layer.">
          <BusinessTelemetryFeed events={dashboard.telemetry.latestEvents} />
        </BusinessPanel>
      </section>
    </BusinessPageShell>
  );
}

export function BusinessProjects() {
  const projects = useBusinessProjects();
  if (projects.isLoading) return <BusinessLoadingState />;
  if (projects.isError) return <BusinessErrorState message="Business projects unavailable." />;

  return (
    <BusinessPageShell title="Projects" description="Business projects and lifecycle status rendered from the runtime package.">
      <BusinessPanel title="Business Project Registry">
        <BusinessLifecycleTable
          rows={projects.data || []}
          columns={[
            { key: 'id', label: 'Project id', render: linkCell('/business/projects') },
            { key: 'title', label: 'Title', render: textCell('title') },
            { key: 'projectType', label: 'Type', render: textCell('projectType') },
            { key: 'status', label: 'Status', render: statusCell() },
            { key: 'riskTier', label: 'Risk tier', render: riskCell() },
            { key: 'fundingId', label: 'Funding', render: idCell('fundingId') },
            { key: 'assetId', label: 'Asset', render: (row) => <Link className="font-mono text-xs font-bold text-primary" to={`/business/assets/${row.assetId}`}>{row.assetId}</Link> },
            { key: 'telemetryProfile', label: 'Telemetry', render: (row) => <span className="text-outline">{row.telemetryProfile?.enabled ? 'enabled' : 'disabled'}</span> }
          ]}
        />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

export function BusinessAssets() {
  const assets = useBusinessAssets();
  if (assets.isLoading) return <BusinessLoadingState />;
  if (assets.isError) return <BusinessErrorState message="Business assets unavailable." />;

  return (
    <BusinessPageShell title="Operational Assets" description="Registry of Business-managed operational assets, funding model references and telemetry status.">
      <BusinessPanel title="Operational Asset Registry">
        <BusinessLifecycleTable
          rows={assets.data || []}
          columns={[
            { key: 'id', label: 'Asset id', render: linkCell('/business/assets') },
            { key: 'name', label: 'Asset name', render: textCell('name') },
            { key: 'assetType', label: 'Type', render: textCell('assetType') },
            { key: 'ownerType', label: 'Owner type', render: textCell('ownerType') },
            { key: 'status', label: 'Lifecycle', render: statusCell() },
            { key: 'fundingId', label: 'Funding', render: idCell('fundingId') },
            { key: 'revenueModel', label: 'Revenue model', render: textCell('revenueModel') },
            { key: 'maintenanceOwner', label: 'Maintenance', render: idCell('maintenanceOwner') }
          ]}
        />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

export function BusinessTreasury() {
  const exposures = useBusinessTreasuryExposures();
  if (exposures.isLoading) return <BusinessLoadingState />;
  if (exposures.isError) return <BusinessErrorState message="Treasury exposure records unavailable." />;

  return (
    <BusinessPageShell title="Treasury Exposure" description="Treasury exposure visibility without movement, approval, allocation execution or contract calls.">
      <BusinessPanel title="Treasury Exposure Records">
        <BusinessLifecycleTable
          rows={exposures.data || []}
          columns={[
            { key: 'id', label: 'Exposure id', render: idCell() },
            { key: 'projectId', label: 'Project', render: idCell('projectId') },
            { key: 'assetId', label: 'Asset', render: idCell('assetId') },
            { key: 'exposureType', label: 'Type', render: textCell('exposureType') },
            { key: 'riskTier', label: 'Risk', render: riskCell() },
            { key: 'requestedAmount', label: 'Requested', render: (row) => <span className="text-outline">{money(row.requestedAmount, row.currency)}</span> },
            { key: 'approvedAmount', label: 'Approved', render: (row) => <span className="text-outline">{money(row.approvedAmount, row.currency)}</span> },
            { key: 'consumedAmount', label: 'Consumed', render: (row) => <span className="text-outline">{money(row.consumedAmount, row.currency)}</span> },
            { key: 'status', label: 'Status', render: statusCell() }
          ]}
        />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

export function BusinessFinance() {
  const finance = useBusinessFinanceRiskModel();
  if (finance.isLoading) return <BusinessLoadingState />;
  if (finance.isError) return <BusinessErrorState message="Business finance risk model unavailable." />;

  const model = finance.data;
  const summary = model.summary;
  const routingSummaryRows = Object.entries(model.revenueRoutingSummary).map(([key, value]) => ({
    id: key,
    bucket: key,
    amount: value
  }));

  return (
    <BusinessPageShell
      title="Finance Risk"
      description="Treasury exposure, funding eligibility, debenture planning, revenue routing and financial restrictions rendered from the Business runtime. This console is visibility only."
    >
      <BusinessSummaryCards cards={[
        { id: 'finance-exposure', label: 'Treasury Exposure', value: money(summary.totalTreasuryExposure, summary.currency), detail: `${money(summary.totalConsumedExposure, summary.currency)} consumed in visible mock exposure records.`, status: 'WARNING' },
        { id: 'finance-funding', label: 'Funding Records', value: summary.fundingRecords, detail: 'Funding lifecycle records with simulated eligibility decisions.', status: 'NOTICE' },
        { id: 'finance-debentures', label: 'Debentures', value: summary.debentures, detail: `${summary.convertibleDebentures} convertible / ${summary.nonConvertibleDebentures} non-convertible planning records.`, status: 'WARNING' },
        { id: 'finance-readiness', label: 'Readiness Score', value: `${summary.financialReadinessScore}%`, detail: `${summary.blockedFinancialActions} financial actions are blocked or require approval.`, status: summary.financialReadinessScore >= 80 ? 'APPROVED' : 'WARNING' }
      ]} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <BusinessPanel title="Treasury Safety Status" description="Financial adapters are mock/read-only. No allocation, settlement or distribution can execute from this console.">
          <DetailList items={[
            { label: 'Runtime mode', value: model.mock && model.readOnly ? 'mock/read-only' : 'review' },
            { label: 'Treasury freeze', value: model.freezeStatus.frozen ? 'FROZEN' : 'NOT_FROZEN' },
            { label: 'Execution', value: 'view-only / simulation-only' },
            { label: 'Contract calls', value: 'disabled' }
          ]} />
        </BusinessPanel>
        <BusinessPanel title="Financial Readiness Score" description="Calculated from visible exposure, restrictions and simulated eligibility only.">
          <ProgressBar value={summary.financialReadinessScore} />
          <p className="mt-4 text-sm leading-6 text-outline">
            Readiness is not approval. Treasury movement, debenture issuance, APR payment, settlement and revenue distribution remain forbidden.
          </p>
        </BusinessPanel>
        <BusinessPanel title="Revenue Routing Summary" description="Revenue is classified and visible, but no distribution is available.">
          <BusinessLifecycleTable
            rows={routingSummaryRows}
            columns={[
              { key: 'bucket', label: 'Route bucket', render: idCell('bucket') },
              { key: 'amount', label: 'Amount', render: (row) => <span className="text-outline">{money(row.amount, summary.currency)}</span> }
            ]}
          />
        </BusinessPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Risk Tier Distribution" description="Exposure grouped by runtime risk tier and mock treasury limits.">
          <BusinessLifecycleTable
            rows={model.exposureByRiskTier}
            columns={[
              { key: 'riskTier', label: 'Risk tier', render: riskCell() },
              { key: 'count', label: 'Records', render: (row) => <strong className="text-on-surface">{row.count}</strong> },
              { key: 'approvedAmount', label: 'Approved', render: (row) => <span className="text-outline">{money(row.approvedAmount, row.currency)}</span> },
              { key: 'consumedAmount', label: 'Consumed', render: (row) => <span className="text-outline">{money(row.consumedAmount, row.currency)}</span> },
              { key: 'utilizationPercent', label: 'Limit use', render: (row) => <ProgressBar value={row.utilizationPercent} /> }
            ]}
          />
        </BusinessPanel>
        <BusinessPanel title="Treasury Exposure By Project" description="Project exposure remains transparent with explicit restriction count and readiness scoring.">
          <BusinessLifecycleTable
            rows={model.exposureByProject}
            columns={[
              { key: 'projectId', label: 'Project', render: linkCell('/business/projects', 'projectId') },
              { key: 'riskTier', label: 'Risk', render: riskCell() },
              { key: 'approvedAmount', label: 'Approved', render: (row) => <span className="text-outline">{money(row.approvedAmount, row.currency)}</span> },
              { key: 'consumedAmount', label: 'Consumed', render: (row) => <span className="text-outline">{money(row.consumedAmount, row.currency)}</span> },
              { key: 'readinessScore', label: 'Readiness', render: (row) => <ProgressBar value={row.readinessScore} /> },
              { key: 'restrictionCount', label: 'Restrictions', render: (row) => <strong className="text-on-surface">{row.restrictionCount}</strong> }
            ]}
          />
        </BusinessPanel>
      </section>

      <BusinessPanel title="Funding Eligibility" description="Eligibility is simulated by runtime contracts and does not authorize funding execution.">
        <BusinessLifecycleTable
          rows={model.fundingEligibilityRows}
          columns={[
            { key: 'id', label: 'Funding', render: idCell() },
            { key: 'projectTitle', label: 'Project', render: textCell('projectTitle') },
            { key: 'fundingType', label: 'Model', render: statusCell('fundingType') },
            { key: 'status', label: 'Status', render: statusCell() },
            { key: 'riskTier', label: 'Risk', render: riskCell() },
            { key: 'targetAmount', label: 'Target', render: (row) => <span className="text-outline">{money(row.targetAmount, row.currency)}</span> },
            { key: 'percentFunded', label: 'Funded', render: (row) => <ProgressBar value={row.percentFunded} /> },
            { key: 'eligible', label: 'Eligibility', render: (row) => <BusinessStatusBadge status={row.eligible ? 'APPROVED' : 'UNDER_REVIEW'} /> },
            { key: 'eligibilityReason', label: 'Reason', render: textCell('eligibilityReason') }
          ]}
        />
      </BusinessPanel>

      <BusinessPanel title="Debenture Planning" description="Planning records only. Issuance, purchase, conversion, APR payment and liquidation are unavailable.">
        <BusinessLifecycleTable
          rows={model.debenturePlanningRows}
          columns={[
            { key: 'id', label: 'Debenture', render: idCell() },
            { key: 'projectTitle', label: 'Project', render: textCell('projectTitle') },
            { key: 'debentureType', label: 'Type', render: statusCell('debentureType') },
            { key: 'convertible', label: 'Convertible', render: (row) => <span className="text-outline">{row.convertible ? 'yes' : 'no'}</span> },
            { key: 'targetAmount', label: 'Target', render: (row) => <span className="text-outline">{money(row.targetAmount, row.currency)}</span> },
            { key: 'percentRaised', label: 'Progress', render: (row) => <ProgressBar value={row.percentRaised} /> },
            { key: 'repaymentStatus', label: 'Repayment', render: statusCell('repaymentStatus') },
            { key: 'defaultRisk', label: 'Default risk', render: statusCell('defaultRisk') },
            { key: 'issuanceAllowed', label: 'Issue allowed', render: (row) => <BusinessStatusBadge status={row.issuanceAllowed ? 'APPROVED' : 'FORBIDDEN_IN_CURRENT_RUNTIME'} /> }
          ]}
        />
      </BusinessPanel>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Revenue Routing" description="Routing allocations are explicit and visible. Distribution is not executable.">
          <BusinessLifecycleTable
            rows={model.revenueRoutingRows}
            columns={[
              { key: 'id', label: 'Revenue', render: idCell() },
              { key: 'projectTitle', label: 'Project', render: textCell('projectTitle') },
              { key: 'status', label: 'Status', render: statusCell() },
              { key: 'netAmount', label: 'Net', render: (row) => <span className="text-outline">{money(row.netAmount, row.currency)}</span> },
              { key: 'treasuryShare', label: 'Treasury', render: (row) => <span className="text-outline">{money(row.treasuryShare, row.currency)}</span> },
              { key: 'debentureShare', label: 'Debenture', render: (row) => <span className="text-outline">{money(row.debentureShare, row.currency)}</span> },
              { key: 'settlementStatus', label: 'Settlement', render: statusCell('settlementStatus') }
            ]}
          />
        </BusinessPanel>
        <BusinessPanel title="Financial Restrictions" description="Treasury restrictions and blocked financial actions must remain visible before any future integration.">
          <div className="space-y-6">
            <BusinessLifecycleTable
              rows={model.treasuryRestrictions}
              columns={[
                { key: 'projectId', label: 'Project', render: idCell('projectId') },
                { key: 'riskTier', label: 'Risk', render: riskCell() },
                { key: 'restriction', label: 'Restriction', render: idCell('restriction') },
                { key: 'severity', label: 'Severity', render: (row) => <BusinessSeverityBadge severity={row.severity} /> }
              ]}
            />
            <BusinessLifecycleTable
              rows={model.blockedFinancialActions}
              columns={[
                { key: 'action', label: 'Blocked Financial Actions', render: idCell('action') },
                { key: 'mode', label: 'Execution policy', render: statusCell('mode') },
                { key: 'reason', label: 'Reason', render: textCell('reason') }
              ]}
            />
          </div>
        </BusinessPanel>
      </section>
    </BusinessPageShell>
  );
}

export function BusinessTelemetry() {
  const telemetry = useBusinessTelemetryEvents();
  if (telemetry.isLoading) return <BusinessLoadingState />;
  if (telemetry.isError) return <BusinessErrorState message="Business telemetry unavailable." />;

  return (
    <BusinessPageShell title="Telemetry" description="Business runtime telemetry events for projects, assets, treasury, revenue and ACS visibility.">
      <BusinessPanel title="Telemetry Feed">
        <BusinessLifecycleTable
          rows={telemetry.data || []}
          columns={[
            { key: 'id', label: 'Event id', render: idCell() },
            { key: 'eventType', label: 'Type', render: textCell('eventType') },
            { key: 'severity', label: 'Severity', render: (row) => <BusinessStatusBadge status={row.severity} /> },
            { key: 'relatedProjectId', label: 'Project', render: idCell('relatedProjectId') },
            { key: 'relatedAssetId', label: 'Asset', render: idCell('relatedAssetId') },
            { key: 'sourceSystem', label: 'Source', render: textCell('sourceSystem') },
            { key: 'createdAt', label: 'Timestamp', render: (row) => <span className="text-outline">{new Date(row.createdAt).toLocaleString()}</span> },
            { key: 'status', label: 'Status', render: textCell('status') }
          ]}
        />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

function DetailList({ items }) {
  return (
    <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-white/10 bg-surface-container p-3">
          <dt className="text-[11px] font-bold uppercase tracking-widest text-outline">{item.label}</dt>
          <dd className="mt-1 break-words text-sm font-semibold text-on-surface">{item.value ?? 'n/a'}</dd>
        </div>
      ))}
    </dl>
  );
}

function WorkflowPanel({ workflow }) {
  if (!workflow) return null;
  const completed = workflow.steps.filter((step) => step.status === 'COMPLETED').length;
  const progress = Math.round((completed / Math.max(1, workflow.steps.length)) * 100);

  return (
    <BusinessPanel title="Workflow" description="Declarative readiness only. Steps are not executable from AxodusAPP.">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <BusinessStatusBadge status={workflow.workflowType} />
        <ProgressBar value={progress} />
      </div>
      <div className="space-y-3">
        {workflow.steps.map((step) => (
          <article key={step.stepId} className="rounded-lg border border-white/10 bg-surface-container p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-on-surface">{step.label}</p>
                <p className="mt-1 text-xs text-outline">{step.description}</p>
              </div>
              <BusinessStatusBadge status={step.status} />
            </div>
            {step.blockingIssues.length ? <p className="mt-3 text-xs font-semibold text-amber-100">{step.blockingIssues.join(' / ')}</p> : null}
          </article>
        ))}
      </div>
    </BusinessPanel>
  );
}

function EventTimelinePanel({ title = 'Event Timeline', events = [] }) {
  return (
    <BusinessPanel title={title} description="Derived read-only events. No broker, webhook or automation is active.">
      <div className="space-y-3">
        {events.map((event) => (
          <article key={event.eventId} className="rounded-lg border border-white/10 bg-surface-container p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <BusinessSeverityBadge severity={event.severity} />
                <span className="font-mono text-xs font-bold text-on-surface">{event.eventType}</span>
              </div>
              <span className="text-xs text-outline">{new Date(event.timestamp).toLocaleString()}</span>
            </div>
            <p className="mt-2 font-mono text-xs text-outline">{event.eventId}</p>
          </article>
        ))}
      </div>
    </BusinessPanel>
  );
}

export function BusinessProjectDetail() {
  const { projectId } = useParams();
  const registry = useBusinessProjectRegistry(projectId);
  const workflows = useBusinessWorkflows();
  if (registry.isLoading || workflows.isLoading) return <BusinessLoadingState />;
  if (registry.isError || workflows.isError || !registry.data) return <BusinessErrorState message="Project registry view unavailable." />;

  const view = registry.data;
  const workflow = workflows.data?.find((record) => record.projectId === projectId);
  return (
    <BusinessPageShell title={view.project.title} description="Project registry view with linked request, asset, funding, treasury, debenture, ACS, telemetry, workflow and event context.">
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Project Overview">
          <DetailList items={[
            { label: 'Project id', value: view.project.id },
            { label: 'Type', value: view.project.projectType },
            { label: 'Status', value: view.project.status },
            { label: 'Risk tier', value: view.project.riskTier },
            { label: 'Request', value: view.request?.id },
            { label: 'Asset', value: view.asset?.id },
            { label: 'Funding', value: view.funding?.id },
            { label: 'Debenture', value: view.debenture?.id }
          ]} />
        </BusinessPanel>
        <WorkflowPanel workflow={workflow} />
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Treasury And Revenue">
          <BusinessLifecycleTable rows={[...view.treasuryExposures, ...view.revenueRecords]} columns={[
            { key: 'id', label: 'Record', render: idCell() },
            { key: 'status', label: 'Status', render: statusCell() },
            { key: 'approvedAmount', label: 'Approved', render: (row) => row.approvedAmount !== undefined ? money(row.approvedAmount, row.currency) : 'n/a' },
            { key: 'netAmount', label: 'Net revenue', render: (row) => row.netAmount !== undefined ? money(row.netAmount, row.currency) : 'n/a' }
          ]} />
        </BusinessPanel>
        <BusinessPanel title="ACS And Telemetry">
          <BusinessLifecycleTable rows={[...view.acsRuntimes, ...view.telemetryEvents]} columns={[
            { key: 'id', label: 'Record', render: idCell() },
            { key: 'status', label: 'Status', render: textCell('status') },
            { key: 'runtimeType', label: 'Runtime type', render: textCell('runtimeType') },
            { key: 'eventType', label: 'Event type', render: textCell('eventType') }
          ]} />
        </BusinessPanel>
      </section>
      <EventTimelinePanel events={view.runtimeEvents} />
    </BusinessPageShell>
  );
}

export function BusinessAssetDetail() {
  const { assetId } = useParams();
  const registry = useBusinessAssetRegistry(assetId);
  if (registry.isLoading) return <BusinessLoadingState />;
  if (registry.isError || !registry.data) return <BusinessErrorState message="Asset registry view unavailable." />;
  const view = registry.data;

  return (
    <BusinessPageShell title={view.asset.name} description="Asset detail with ownership, project, funding, treasury, revenue, telemetry and lifecycle context.">
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Asset Overview">
          <DetailList items={[
            { label: 'Asset id', value: view.asset.id },
            { label: 'Type', value: view.asset.assetType },
            { label: 'Owner type', value: view.asset.ownerType },
            { label: 'Owner', value: view.owner?.displayName || view.asset.ownerId },
            { label: 'Lifecycle', value: view.asset.status },
            { label: 'Funding', value: view.funding?.id },
            { label: 'Revenue model', value: view.asset.revenueModel },
            { label: 'Maintenance owner', value: view.asset.maintenanceOwner }
          ]} />
        </BusinessPanel>
        <BusinessPanel title="Linked Project">
          {view.project ? <DetailList items={[
            { label: 'Project', value: view.project.title },
            { label: 'Project id', value: view.project.id },
            { label: 'Risk tier', value: view.project.riskTier },
            { label: 'Status', value: view.project.status }
          ]} /> : null}
        </BusinessPanel>
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Financial Visibility">
          <BusinessLifecycleTable rows={[...view.treasuryExposures, ...view.revenueRecords]} columns={[
            { key: 'id', label: 'Record', render: idCell() },
            { key: 'status', label: 'Status', render: textCell('status') },
            { key: 'riskTier', label: 'Risk', render: riskCell() },
            { key: 'netAmount', label: 'Net', render: (row) => row.netAmount !== undefined ? money(row.netAmount, row.currency) : 'n/a' }
          ]} />
        </BusinessPanel>
        <EventTimelinePanel title="Asset Event Timeline" events={view.runtimeEvents} />
      </section>
    </BusinessPageShell>
  );
}

export function BusinessRegistry() {
  const summary = useBusinessRegistrySummary();
  const projects = useBusinessProjects();
  const assets = useBusinessAssets();
  const funding = useBusinessFundingRecords();
  const treasury = useBusinessTreasuryExposures();
  const acs = useBusinessACSRuntimes();
  if (summary.isLoading || projects.isLoading || assets.isLoading || funding.isLoading || treasury.isLoading || acs.isLoading) return <BusinessLoadingState />;
  const failed = queryFailed(summary, projects, assets, funding, treasury, acs);
  if (failed) return <BusinessErrorState message="Business registry unavailable." />;

  return (
    <BusinessPageShell title="Runtime Registry" description="Read-only operational graph view across Business runtime entities and relationships.">
      <BusinessSummaryCards cards={[
        { id: 'registry-projects', label: 'Projects', value: summary.data.totalProjects, detail: 'Indexed project records.', status: 'INFO' },
        { id: 'registry-assets', label: 'Assets', value: summary.data.totalAssets, detail: 'Indexed operational assets.', status: 'INFO' },
        { id: 'registry-edges', label: 'Relationships', value: summary.data.relationshipEdges, detail: 'Derived registry relationship edges.', status: 'NOTICE' },
        { id: 'registry-events', label: 'Runtime Events', value: summary.data.totalRuntimeEvents, detail: 'Events linked into registry views.', status: 'NOTICE' }
      ]} />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Projects">
          <BusinessLifecycleTable rows={projects.data || []} columns={[
            { key: 'id', label: 'Project', render: linkCell('/business/projects') },
            { key: 'title', label: 'Title', render: textCell('title') },
            { key: 'assetId', label: 'Asset', render: (row) => <Link className="font-mono text-xs font-bold text-primary" to={`/business/assets/${row.assetId}`}>{row.assetId}</Link> },
            { key: 'riskTier', label: 'Risk', render: riskCell() }
          ]} />
        </BusinessPanel>
        <BusinessPanel title="Runtime Relationships">
          <BusinessLifecycleTable rows={[...(funding.data || []), ...(treasury.data || []), ...(acs.data || [])]} columns={[
            { key: 'id', label: 'Record', render: idCell() },
            { key: 'projectId', label: 'Project', render: idCell('projectId') },
            { key: 'relatedProjectId', label: 'ACS Project', render: idCell('relatedProjectId') },
            { key: 'status', label: 'Status', render: textCell('status') }
          ]} />
        </BusinessPanel>
      </section>
    </BusinessPageShell>
  );
}

export function BusinessWorkflows() {
  const workflows = useBusinessWorkflows();
  const summary = useBusinessWorkflowSummary();
  if (workflows.isLoading || summary.isLoading) return <BusinessLoadingState />;
  if (workflows.isError || summary.isError) return <BusinessErrorState message="Business workflows unavailable." />;

  return (
    <BusinessPageShell title="Workflows" description="Declarative operational workflows with readiness, blockers and progress. No workflow step executes from the UI.">
      <BusinessSummaryCards cards={[
        { id: 'workflow-total', label: 'Workflows', value: summary.data.totalWorkflows, detail: 'Project workflows derived from runtime registry.', status: 'INFO' },
        { id: 'workflow-ready', label: 'Ready', value: summary.data.readyWorkflows, detail: 'Ready means no blockers in the read model.', status: 'APPROVED' },
        { id: 'workflow-blocked', label: 'Blocked', value: summary.data.blockedWorkflows, detail: 'Detected governance, treasury, ACS or telemetry blockers.', status: summary.data.blockedWorkflows ? 'WARNING' : 'INFO' },
        { id: 'workflow-progress', label: 'Average Progress', value: `${summary.data.averageProgressPercent}%`, detail: 'Calculated progress across required steps.', status: 'NOTICE' }
      ]} />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {workflows.data.map((workflow) => (
          <WorkflowPanel key={workflow.projectId} workflow={workflow} />
        ))}
      </section>
    </BusinessPageShell>
  );
}

export function BusinessEvents() {
  const events = useBusinessEvents();
  const summary = useBusinessEventSummary();
  const critical = useBusinessCriticalEvents();
  if (events.isLoading || summary.isLoading || critical.isLoading) return <BusinessLoadingState />;
  if (events.isError || summary.isError || critical.isError) return <BusinessErrorState message="Business events unavailable." />;

  return (
    <BusinessPageShell title="Events" description="Read-only runtime event timelines and lineage derived from Business records.">
      <BusinessSummaryCards cards={[
        { id: 'events-total', label: 'Events', value: summary.data.totalEvents, detail: 'Derived runtime events.', status: 'INFO' },
        { id: 'events-critical', label: 'Critical', value: summary.data.criticalEvents, detail: 'Critical event count.', status: summary.data.criticalEvents ? 'CRITICAL' : 'INFO' },
        { id: 'events-types', label: 'Event Types', value: Object.keys(summary.data.byType).length, detail: 'Lifecycle and telemetry event categories.', status: 'NOTICE' },
        { id: 'events-sources', label: 'Sources', value: Object.keys(summary.data.bySource).length, detail: 'Runtime source categories.', status: 'NOTICE' }
      ]} />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <EventTimelinePanel title="Critical Events" events={critical.data} />
        <EventTimelinePanel title="Runtime Timeline" events={(events.data || []).slice(0, 12)} />
      </section>
    </BusinessPageShell>
  );
}

export function BusinessState() {
  const state = useBusinessStateRuntime();
  if (state.isLoading) return <BusinessLoadingState />;
  if (state.isError) return <BusinessErrorState message="Business state machine unavailable." />;

  const transitionRows = Object.entries(state.data.transitionMaps.PROJECT).map(([status, targets]) => ({ id: status, status, targets: targets.join(' / ') || 'terminal' }));

  return (
    <BusinessPageShell title="State Machine" description="Lifecycle transition maps, guard placeholders and read-only simulation. No transition is persisted or executed.">
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Project Lifecycle Transitions">
          <BusinessLifecycleTable rows={transitionRows} columns={[
            { key: 'status', label: 'From', render: idCell('status') },
            { key: 'targets', label: 'Allowed transitions', render: textCell('targets') }
          ]} />
        </BusinessPanel>
        <BusinessPanel title="Transition Simulation">
          <DetailList items={[
            { label: 'Valid simulation', value: `${state.data.simulation.fromStatus} -> ${state.data.simulation.toStatus}: ${state.data.simulation.allowed}` },
            { label: 'Invalid simulation', value: state.data.invalidSimulation.error?.message },
            { label: 'Mutation', value: String(state.data.simulation.mutated) },
            { label: 'Guards', value: state.data.guardCategories.join(' / ') }
          ]} />
        </BusinessPanel>
      </section>
    </BusinessPageShell>
  );
}

export function BusinessRuntime() {
  const safety = useBusinessRuntimeSafetyModel();
  if (safety.isLoading) return <BusinessLoadingState />;
  if (safety.isError) return <BusinessErrorState message="Runtime safety model unavailable." />;

  const policies = Object.values(safety.data.executionPolicies);
  return (
    <BusinessPageShell title="Runtime Safety" description="Execution policy, validators and non-execution guarantees for the Business console.">
      <BusinessSummaryCards cards={[
        { id: 'runtime-mode', label: 'Runtime Mode', value: 'MOCK', detail: 'All Business runtime data is mock/read-only.', status: 'APPROVED' },
        { id: 'forbidden', label: 'Forbidden Actions', value: policies.filter((policy) => policy.mode === 'FORBIDDEN_IN_CURRENT_RUNTIME').length, detail: 'Actions blocked in the current runtime.', status: 'CRITICAL' },
        { id: 'executable', label: 'Executable Policies', value: safety.data.coreSummary.executionPolicySummary.executablePolicies, detail: 'Must remain zero in this sprint.', status: 'APPROVED' },
        { id: 'validators', label: 'Validators', value: safety.data.coreSummary.securityValidatorStatus.valid ? 'PASS' : 'REVIEW', detail: 'Security validator status.', status: safety.data.coreSummary.securityValidatorStatus.valid ? 'APPROVED' : 'WARNING' }
      ]} />
      <BusinessPanel title="Execution Policies">
        <BusinessLifecycleTable rows={policies} columns={[
          { key: 'action', label: 'Action', render: idCell('action') },
          { key: 'mode', label: 'Mode', render: statusCell('mode') },
          { key: 'governanceRequired', label: 'Governance', render: (row) => <span className="text-outline">{String(row.governanceRequired)}</span> },
          { key: 'treasuryApprovalRequired', label: 'Treasury', render: (row) => <span className="text-outline">{String(row.treasuryApprovalRequired)}</span> },
          { key: 'reason', label: 'Reason', render: textCell('reason') }
        ]} />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

export function BusinessRisk() {
  const projects = useBusinessProjects();
  const treasury = useBusinessTreasuryExposures();
  if (projects.isLoading || treasury.isLoading) return <BusinessLoadingState />;
  if (projects.isError || treasury.isError) return <BusinessErrorState message="Business risk unavailable." />;
  return (
    <BusinessPageShell title="Risk" description="Risk tier visibility across projects and treasury exposure.">
      <BusinessPanel title="Risk Registry">
        <BusinessLifecycleTable rows={projects.data || []} columns={[
          { key: 'id', label: 'Project', render: linkCell('/business/projects') },
          { key: 'title', label: 'Title', render: textCell('title') },
          { key: 'riskTier', label: 'Risk tier', render: riskCell() },
          { key: 'status', label: 'Status', render: statusCell() }
        ]} />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

const hasCapability = (capabilities = [], capability) => capabilities.includes(capability);

function BusinessFederationBadge({ level }) {
  return <BusinessBadge tone="border-cyan-300/30 bg-cyan-300/10 text-cyan-100">{level}</BusinessBadge>;
}

export function BusinessAccess() {
  const access = useBusinessAccessModel();
  if (access.isLoading) return <BusinessLoadingState />;
  if (access.isError) return <BusinessErrorState message="Business access model unavailable." />;

  const data = access.data;
  const identityCapabilityRows = data.identities.map((identity) => {
    const matrixEntry = data.capabilityMatrix.find((entry) => entry.subjectId === identity.id && entry.subjectType === 'IDENTITY');
    const capabilities = matrixEntry?.capabilities || [];
    const participant = data.federationParticipants.find((entry) => entry.identityId === identity.id);

    return {
      ...identity,
      federationParticipantStatus: participant?.status || 'NOT_REGISTERED',
      capabilityCount: capabilities.length,
      treasuryEligible: hasCapability(capabilities, 'REQUEST_TREASURY_SPONSORSHIP'),
      debentureEligible: hasCapability(capabilities, 'REQUEST_DEBENTURE_FUNDING'),
      acsEligible: hasCapability(capabilities, 'REQUEST_ACS_SERVICE'),
      capabilities
    };
  });

  const blockedPermissionRows = data.permissionDenials.slice(0, 16);
  const visiblePermissionRows = data.permissionMatrix
    .filter((decision) => ['CREATE_BUSINESS_REQUEST', 'PREPARE_DEBENTURE_DRAFT', 'PREPARE_ACS_PROVISIONING_REQUEST', 'MOVE_TREASURY_FUNDS', 'ISSUE_DEBENTURE', 'PROVISION_ACS_RUNTIME', 'CALL_CONTRACT'].includes(decision.action))
    .slice(0, 36)
    .map((decision) => ({ ...decision, id: `${decision.identityId}-${decision.action}` }));
  const denialRows = blockedPermissionRows.map((decision) => ({ ...decision, id: `${decision.identityId}-${decision.action}` }));

  return (
    <BusinessPageShell
      title="Access Control"
      description="Identity context, federation level, verification level, capabilities, permission decisions and denial explanations from the Business runtime. This page is visibility only."
    >
      <BusinessSummaryCards cards={[
        { id: 'access-identities', label: 'Identities', value: data.identities.length, detail: 'Mock Business identities available for operational review.', status: 'INFO' },
        { id: 'access-federation', label: 'Federation Records', value: data.federationParticipants.length, detail: 'Federation participants linked to Business identities.', status: 'NOTICE' },
        { id: 'access-capability-subjects', label: 'Capability Subjects', value: data.capabilityMatrix.length, detail: 'Identity and project capability matrix entries.', status: 'INFO' },
        { id: 'access-denials', label: 'Permission Denials', value: data.permissionDenials.length, detail: 'Blocked or forbidden permission decisions with explanations.', status: data.permissionDenials.length ? 'WARNING' : 'INFO' }
      ]} />

      <BusinessPanel title="Business Identities" description="Requester, DAO, enterprise and agent identities. Eligibility is derived from runtime capabilities; no identity can be changed here.">
        <BusinessLifecycleTable
          rows={identityCapabilityRows}
          columns={[
            { key: 'id', label: 'Identity', render: idCell() },
            { key: 'displayName', label: 'Name', render: textCell('displayName') },
            { key: 'identityType', label: 'Requester type', render: textCell('identityType') },
            { key: 'federationLevel', label: 'Federation level', render: (row) => <BusinessFederationBadge level={row.federationLevel} /> },
            { key: 'verificationLevel', label: 'Verification', render: statusCell('verificationLevel') },
            { key: 'treasuryEligible', label: 'Treasury', render: (row) => <span className="text-outline">{row.treasuryEligible ? 'eligible' : 'not eligible'}</span> },
            { key: 'debentureEligible', label: 'Debenture', render: (row) => <span className="text-outline">{row.debentureEligible ? 'eligible' : 'not eligible'}</span> },
            { key: 'acsEligible', label: 'ACS', render: (row) => <span className="text-outline">{row.acsEligible ? 'eligible' : 'not eligible'}</span> },
            { key: 'capabilityCount', label: 'Capabilities', render: (row) => <strong className="text-on-surface">{row.capabilityCount}</strong> }
          ]}
        />
      </BusinessPanel>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Federation Context" description="Operational federation visibility. No federation enrollment, upgrade or revocation action exists in this UI.">
          <BusinessLifecycleTable
            rows={data.federationParticipants}
            columns={[
              { key: 'id', label: 'Participant', render: idCell() },
              { key: 'displayName', label: 'Name', render: textCell('displayName') },
              { key: 'level', label: 'Level', render: (row) => <BusinessFederationBadge level={row.level} /> },
              { key: 'status', label: 'Status', render: statusCell() },
              { key: 'permissions', label: 'Federation permissions', render: (row) => <span className="text-outline">{row.permissions.join(' / ')}</span> }
            ]}
          />
        </BusinessPanel>
        <BusinessPanel title="Capability Matrix" description="Capabilities are read-only runtime decisions for identity and project subjects.">
          <BusinessLifecycleTable
            rows={data.capabilityMatrix}
            columns={[
              { key: 'subjectId', label: 'Subject', render: idCell('subjectId') },
              { key: 'subjectType', label: 'Type', render: textCell('subjectType') },
              { key: 'capabilities', label: 'Capability count', render: (row) => <strong className="text-on-surface">{row.capabilities.length}</strong> },
              { key: 'mock', label: 'Runtime', render: (row) => <span className="text-outline">{row.mock && row.readOnly ? 'mock/read-only' : 'review'}</span> }
            ]}
          />
        </BusinessPanel>
      </section>

      <BusinessPanel title="Permission Matrix" description="Permission decisions explain whether an action is view, prepare, simulation, review, blocked or forbidden. No permission can be granted from AxodusAPP.">
        <BusinessLifecycleTable
          rows={visiblePermissionRows}
          columns={[
            { key: 'identityId', label: 'Identity', render: idCell('identityId') },
            { key: 'action', label: 'Action', render: idCell('action') },
            { key: 'mode', label: 'Mode', render: statusCell('mode') },
            { key: 'allowed', label: 'Allowed', render: (row) => <span className="text-outline">{String(row.allowed)}</span> },
            { key: 'reason', label: 'Decision reason', render: textCell('reason') }
          ]}
        />
      </BusinessPanel>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Denial Explanations" description="Blocked and forbidden actions surface stable explanations instead of hidden permission failures.">
          <BusinessLifecycleTable
            rows={denialRows}
            columns={[
              { key: 'identityId', label: 'Identity', render: idCell('identityId') },
              { key: 'action', label: 'Denied action', render: idCell('action') },
              { key: 'mode', label: 'Mode', render: statusCell('mode') },
              { key: 'reason', label: 'Reason', render: textCell('reason') }
            ]}
          />
        </BusinessPanel>
        <BusinessPanel title="Execution Policy Per Action" description="Execution policy is visible for every modeled action. Critical actions remain forbidden in the current runtime.">
          <BusinessLifecycleTable
            rows={data.executionPolicies}
            columns={[
              { key: 'action', label: 'Action', render: idCell('action') },
              { key: 'mode', label: 'Execution policy', render: statusCell('mode') },
              { key: 'governanceRequired', label: 'Governance', render: (row) => <span className="text-outline">{String(row.governanceRequired)}</span> },
              { key: 'treasuryApprovalRequired', label: 'Treasury', render: (row) => <span className="text-outline">{String(row.treasuryApprovalRequired)}</span> },
              { key: 'humanReviewRequired', label: 'Human review', render: (row) => <span className="text-outline">{String(row.humanReviewRequired)}</span> }
            ]}
          />
        </BusinessPanel>
      </section>

      <BusinessPanel title="Access Safety" description="Identity and permission operations are intentionally non-executable in Sprint 14.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {['No real KYC verification', 'No permission grants', 'No federation changes', 'No wallet signing', 'No access release', 'No treasury unlock'].map((item) => (
            <div key={item} className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm font-semibold text-amber-100">{item}</div>
          ))}
        </div>
      </BusinessPanel>
    </BusinessPageShell>
  );
}

export function BusinessGovernanceReadiness() {
  const governance = useBusinessGovernanceReadiness();
  if (governance.isLoading) return <BusinessLoadingState />;
  if (governance.isError) return <BusinessErrorState message="Business governance readiness unavailable." />;

  const model = governance.data;
  const proposalRows = model.projects.map((project) => ({
    id: `${project.projectId}-proposal`,
    projectId: project.projectId,
    title: project.title,
    proposalId: project.proposalId,
    proposalUrl: project.proposalReference?.proposalUrl || 'mock://proposal-reference-not-created',
    decision: project.decision,
    readinessScore: project.readinessScore
  }));
  const blockerRows = model.projects.flatMap((project) =>
    project.blockers.map((blocker, index) => ({
      id: `${project.projectId}-blocker-${index}`,
      projectId: project.projectId,
      title: project.title,
      stepId: blocker.stepId,
      issue: blocker.issue,
      decision: project.decision
    }))
  );

  return (
    <BusinessPageShell
      title="Governance Readiness"
      description="Readiness view for Business projects, drafts, assets and funding requests that require governance review before future execution. No proposal creation or DAO execution is available."
    >
      <BusinessSummaryCards cards={[
        { id: 'governance-projects', label: 'Governance Projects', value: model.projects.length, detail: 'Projects requiring governance visibility or review.', status: 'WARNING' },
        { id: 'governance-drafts', label: 'Governance Drafts', value: model.drafts.length, detail: 'Stored local drafts requiring governance context.', status: model.drafts.length ? 'WARNING' : 'INFO' },
        { id: 'governance-blockers', label: 'Blockers', value: model.totalBlockers, detail: 'Restrictions and workflow blockers requiring review.', status: model.totalBlockers ? 'CRITICAL' : 'INFO' },
        { id: 'governance-score', label: 'Readiness Score', value: `${model.readinessScore}%`, detail: 'Computed readiness only; no approval is executed.', status: model.readinessScore < 70 ? 'WARNING' : 'NOTICE' }
      ]} />

      <BusinessPanel title="Governance Required Projects" description="Projects where governance review, constitutional compatibility or restrictions must be visible before any future transition.">
        <BusinessLifecycleTable
          rows={model.projects}
          columns={[
            { key: 'projectId', label: 'Project', render: linkCell('/business/projects', 'projectId') },
            { key: 'title', label: 'Title', render: textCell('title') },
            { key: 'constitutionalCompatibility', label: 'Compatibility', render: statusCell('constitutionalCompatibility') },
            { key: 'federationStanding', label: 'Federation standing', render: statusCell('federationStanding') },
            { key: 'proposalId', label: 'Proposal reference', render: idCell('proposalId') },
            { key: 'restrictionCount', label: 'Restrictions', render: (row) => <strong className="text-on-surface">{row.restrictionCount}</strong> },
            { key: 'blockerCount', label: 'Blockers', render: (row) => <strong className="text-on-surface">{row.blockerCount}</strong> },
            { key: 'decision', label: 'Decision', render: statusCell('decision') },
            { key: 'readinessScore', label: 'Score', render: (row) => <ProgressBar value={row.readinessScore} /> }
          ]}
        />
      </BusinessPanel>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Constitutional Compatibility" description="Compatibility is read from mock governance references and cannot be changed here.">
          <BusinessLifecycleTable
            rows={model.projects}
            columns={[
              { key: 'projectId', label: 'Project', render: idCell('projectId') },
              { key: 'constitutionalCompatibility', label: 'Compatibility', render: statusCell('constitutionalCompatibility') },
              { key: 'governanceStatus', label: 'Governance status', render: statusCell('governanceStatus') },
              { key: 'decision', label: 'Proceed decision', render: statusCell('decision') }
            ]}
          />
        </BusinessPanel>
        <BusinessPanel title="Proposal References" description="Proposal references are mock links only. This console cannot create, submit, vote or execute proposals.">
          <BusinessLifecycleTable
            rows={proposalRows}
            columns={[
              { key: 'projectId', label: 'Project', render: idCell('projectId') },
              { key: 'proposalId', label: 'Mock proposal', render: idCell('proposalId') },
              { key: 'proposalUrl', label: 'Reference URL', render: textCell('proposalUrl') },
              { key: 'decision', label: 'Decision', render: statusCell('decision') }
            ]}
          />
        </BusinessPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Governance Restrictions" description="Restrictions remain visible and advisory in this sprint. They do not unlock or approve treasury.">
          <BusinessLifecycleTable
            rows={model.restrictions}
            columns={[
              { key: 'projectId', label: 'Project', render: idCell('projectId') },
              { key: 'restriction', label: 'Restriction', render: textCell('restriction') },
              { key: 'severity', label: 'Severity', render: (row) => <BusinessSeverityBadge severity={row.severity} /> },
              { key: 'compatibility', label: 'Compatibility', render: statusCell('compatibility') }
            ]}
          />
        </BusinessPanel>
        <BusinessPanel title="Governance Blockers" description="Blockers come from workflow readiness and governance-required steps.">
          {blockerRows.length ? (
            <BusinessLifecycleTable
              rows={blockerRows}
              columns={[
                { key: 'projectId', label: 'Project', render: idCell('projectId') },
                { key: 'stepId', label: 'Step', render: idCell('stepId') },
                { key: 'issue', label: 'Blocker', render: textCell('issue') },
                { key: 'decision', label: 'Decision', render: statusCell('decision') }
              ]}
            />
          ) : (
            <p className="text-sm text-outline">No governance workflow blockers detected in the current mock runtime.</p>
          )}
        </BusinessPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Governance Required Drafts" description="Stored local/mock intake drafts that require governance review according to runtime draft review.">
          {model.drafts.length ? (
            <BusinessLifecycleTable
              rows={model.drafts}
              columns={[
                { key: 'id', label: 'Draft', render: idCell() },
                { key: 'title', label: 'Title', render: textCell('title') },
                { key: 'status', label: 'Status', render: statusCell() },
                { key: 'draftType', label: 'Type', render: (row) => <span className="text-outline">{row.draft.draftType}</span> },
                { key: 'policy', label: 'Policy', render: (row) => <BusinessStatusBadge status={row.runtimeReview.executionReview.policy.mode} /> }
              ]}
            />
          ) : (
            <p className="text-sm text-outline">No stored local drafts currently require governance review.</p>
          )}
        </BusinessPanel>
        <BusinessPanel title="Actions Requiring Governance" description="Approval requirements are derived from execution policy and governance contract. Every action remains non-executable.">
          <BusinessLifecycleTable
            rows={model.approvalActions.map((action) => ({ ...action, id: action.action }))}
            columns={[
              { key: 'action', label: 'Action', render: idCell('action') },
              { key: 'required', label: 'Governance required', render: (row) => <span className="text-outline">{String(row.required)}</span> },
              { key: 'reason', label: 'Reason', render: textCell('reason') }
            ]}
          />
        </BusinessPanel>
      </section>

      <BusinessPanel title="Governance Safety" description="Future governance actions are represented only as disabled/readiness states.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {['No proposal creation', 'No DAO submission', 'No voting', 'No proposal execution', 'No governance bypass', 'No treasury unlock'].map((item) => (
            <div key={item} className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm font-semibold text-amber-100">{item}</div>
          ))}
        </div>
      </BusinessPanel>
    </BusinessPageShell>
  );
}

export function BusinessDebentures() {
  const debentures = useBusinessDebentures();
  if (debentures.isLoading) return <BusinessLoadingState />;
  if (debentures.isError) return <BusinessErrorState message="Debenture records unavailable." />;

  return (
    <BusinessPageShell title="Debentures" description="Debenture lifecycle visibility only. No purchase, issuance, repayment execution or financial interaction is available.">
      <BusinessPanel title="Debenture Records">
        <BusinessLifecycleTable
          rows={debentures.data || []}
          columns={[
            { key: 'id', label: 'Debenture id', render: idCell() },
            { key: 'projectId', label: 'Project', render: idCell('projectId') },
            { key: 'issuerId', label: 'Issuer', render: idCell('issuerId') },
            { key: 'debentureType', label: 'Type', render: textCell('debentureType') },
            { key: 'convertible', label: 'Convertible', render: (row) => <span className="text-outline">{row.convertible ? 'yes' : 'no'}</span> },
            { key: 'targetAmount', label: 'Target', render: (row) => <span className="text-outline">{money(row.targetAmount, row.currency)}</span> },
            { key: 'raisedAmount', label: 'Raised', render: (row) => <span className="text-outline">{money(row.raisedAmount, row.currency)}</span> },
            { key: 'aprModel', label: 'APR model', render: textCell('aprModel') },
            { key: 'maturityDate', label: 'Maturity', render: (row) => <span className="text-outline">{new Date(row.maturityDate).toLocaleDateString()}</span> },
            { key: 'status', label: 'Status', render: statusCell() }
          ]}
        />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

export function BusinessACS() {
  const runtimes = useBusinessACSRuntimes();
  if (runtimes.isLoading) return <BusinessLoadingState />;
  if (runtimes.isError) return <BusinessErrorState message="ACS runtime records unavailable." />;

  return (
    <BusinessPageShell title="ACS Runtime" description="ACS orchestration visibility only. No MCP provisioning, agent deployment or autonomous action is available.">
      <BusinessPanel title="ACS Runtime Records">
        <BusinessLifecycleTable
          rows={runtimes.data || []}
          columns={[
            { key: 'id', label: 'Runtime id', render: idCell() },
            { key: 'runtimeType', label: 'Type', render: textCell('runtimeType') },
            { key: 'ownerId', label: 'Owner', render: idCell('ownerId') },
            { key: 'relatedProjectId', label: 'Project', render: idCell('relatedProjectId') },
            { key: 'isolationProfile', label: 'Isolation', render: textCell('isolationProfile') },
            { key: 'permissionProfile', label: 'Permissions', render: (row) => <span className="text-outline">{row.permissionProfile?.join(' / ')}</span> },
            { key: 'status', label: 'Status', render: statusCell() }
          ]}
        />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

function SimpleBusinessTablePage({ title, description, query, columns, panelTitle }) {
  if (query.isLoading) return <BusinessLoadingState />;
  if (query.isError) return <BusinessErrorState message={`${title} unavailable.`} />;

  return (
    <BusinessPageShell title={title} description={description}>
      <BusinessPanel title={panelTitle}>
        <BusinessLifecycleTable rows={query.data || []} columns={columns} />
      </BusinessPanel>
    </BusinessPageShell>
  );
}

export function BusinessRequests() {
  return <SimpleBusinessTablePage title="Requests" description="Business intake requests without creation or mutation controls." query={useBusinessRequests()} panelTitle="Request Intake" columns={[
    { key: 'id', label: 'Request id', render: idCell() },
    { key: 'title', label: 'Title', render: textCell('title') },
    { key: 'requestType', label: 'Type', render: textCell('requestType') },
    { key: 'status', label: 'Status', render: statusCell() },
    { key: 'preferredFundingModel', label: 'Funding', render: textCell('preferredFundingModel') }
  ]} />;
}

export function BusinessPlugins() {
  return <SimpleBusinessTablePage title="Plugins" description="DAO and governance plugin lifecycle visibility." query={useBusinessPlugins()} panelTitle="Plugin Records" columns={[
    { key: 'id', label: 'Plugin id', render: idCell() },
    { key: 'pluginName', label: 'Name', render: textCell('pluginName') },
    { key: 'pluginType', label: 'Type', render: textCell('pluginType') },
    { key: 'targetDaoId', label: 'DAO', render: idCell('targetDaoId') },
    { key: 'status', label: 'Status', render: statusCell() },
    { key: 'executionScope', label: 'Scope', render: textCell('executionScope') }
  ]} />;
}

export function BusinessFunding() {
  return <SimpleBusinessTablePage title="Funding" description="Funding record visibility without allocation or settlement execution." query={useBusinessFundingRecords()} panelTitle="Funding Records" columns={[
    { key: 'id', label: 'Funding id', render: idCell() },
    { key: 'projectId', label: 'Project', render: idCell('projectId') },
    { key: 'fundingType', label: 'Type', render: textCell('fundingType') },
    { key: 'targetAmount', label: 'Target', render: (row) => <span className="text-outline">{money(row.targetAmount, row.currency)}</span> },
    { key: 'raisedAmount', label: 'Raised', render: (row) => <span className="text-outline">{money(row.raisedAmount, row.currency)}</span> },
    { key: 'status', label: 'Status', render: statusCell() }
  ]} />;
}

export function BusinessRevenue() {
  return <SimpleBusinessTablePage title="Revenue Routing" description="Revenue routing visibility only. Distribution execution is disabled." query={useBusinessRevenueRecords()} panelTitle="Revenue Records" columns={[
    { key: 'id', label: 'Revenue id', render: idCell() },
    { key: 'projectId', label: 'Project', render: idCell('projectId') },
    { key: 'assetId', label: 'Asset', render: idCell('assetId') },
    { key: 'source', label: 'Source', render: textCell('source') },
    { key: 'grossAmount', label: 'Gross', render: (row) => <span className="text-outline">{money(row.grossAmount, row.currency)}</span> },
    { key: 'netAmount', label: 'Net', render: (row) => <span className="text-outline">{money(row.netAmount, row.currency)}</span> },
    { key: 'status', label: 'Status', render: statusCell() }
  ]} />;
}
