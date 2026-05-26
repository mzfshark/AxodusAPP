import {
  BusinessErrorState,
  BusinessLifecycleTable,
  BusinessLoadingState,
  BusinessPageShell,
  BusinessPanel,
  BusinessRiskBadge,
  BusinessStatusBadge,
  BusinessSummaryCards,
  BusinessTelemetryFeed
} from '../components/BusinessUi';
import {
  useBusinessACSRuntimes,
  useBusinessAssets,
  useBusinessDebentures,
  useBusinessFundingRecords,
  useBusinessOverview,
  useBusinessPlugins,
  useBusinessProjects,
  useBusinessRequests,
  useBusinessRevenueRecords,
  useBusinessRuntimeSummary,
  useBusinessTelemetryEvents,
  useBusinessTreasuryExposures
} from '../hooks/useBusinessData';

const money = (amount, currency = 'USD') => new Intl.NumberFormat('en-US', { currency, maximumFractionDigits: 0, style: 'currency' }).format(Number(amount || 0));

function queryFailed(...queries) {
  return queries.find((query) => query.isError);
}

const idCell = (key = 'id') => (row) => <span className="font-mono text-xs font-bold text-on-surface">{row[key]}</span>;
const statusCell = (key = 'status') => (row) => <BusinessStatusBadge status={row[key]} />;
const riskCell = (key = 'riskTier') => (row) => row[key] ? <BusinessRiskBadge riskTier={row[key]} /> : <span className="text-outline">n/a</span>;
const textCell = (key) => (row) => <span className="text-outline">{row[key] ?? 'n/a'}</span>;

export function BusinessOverview() {
  const overview = useBusinessOverview();
  const runtime = useBusinessRuntimeSummary();
  const projects = useBusinessProjects();
  const assets = useBusinessAssets();
  const treasury = useBusinessTreasuryExposures();
  const telemetry = useBusinessTelemetryEvents();

  if (overview.isLoading || runtime.isLoading || projects.isLoading || assets.isLoading || treasury.isLoading || telemetry.isLoading) return <BusinessLoadingState />;
  const failed = queryFailed(overview, runtime, projects, assets, treasury, telemetry);
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
      ]} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BusinessPanel title="Project Lifecycle" description="Active Business initiatives with risk and linked runtime context.">
            <BusinessLifecycleTable
              rows={dashboard.lifecycleTables.projects.slice(0, 6)}
              columns={[
                { key: 'id', label: 'Project', render: idCell() },
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
            { key: 'id', label: 'Project id', render: idCell() },
            { key: 'title', label: 'Title', render: textCell('title') },
            { key: 'projectType', label: 'Type', render: textCell('projectType') },
            { key: 'status', label: 'Status', render: statusCell() },
            { key: 'riskTier', label: 'Risk tier', render: riskCell() },
            { key: 'fundingId', label: 'Funding', render: idCell('fundingId') },
            { key: 'assetId', label: 'Asset', render: idCell('assetId') },
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
            { key: 'id', label: 'Asset id', render: idCell() },
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
