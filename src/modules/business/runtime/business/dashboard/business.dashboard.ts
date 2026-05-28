import { BUSINESS_DEFAULT_CURRENCY, BUSINESS_RISK_LABELS } from "../constants/business.constants.js";
import { businessRuntimeMock } from "../data/business.mock.js";
import { getBusinessRuntimeSummary } from "../services/business.service.js";
import type {
  BusinessDashboardCard,
  BusinessDashboardModel,
  BusinessId,
  BusinessLifecycleTableRow,
  BusinessRiskIndicator,
  MoneyAmount
} from "../types/business.types.js";

const clone = <T>(value: T): T => structuredClone(value);

const money = (amount: number, currency = BUSINESS_DEFAULT_CURRENCY): MoneyAmount => ({ amount, currency });

const formatMoney = ({ amount, currency }: MoneyAmount): string =>
  new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 0,
    style: "currency"
  }).format(amount);

const latestEvents = () =>
  [...businessRuntimeMock.telemetryEvents]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 5);

const requestRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.requests.map((request) => ({
    id: request.id,
    label: request.title,
    status: request.status,
    ownerId: request.requesterId,
    governanceRequired: request.governanceRequired,
    treasuryExposureExpected: request.treasuryExposureExpected
  }));

const projectRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.projects.map((project) => ({
    id: project.id,
    label: project.title,
    status: project.status,
    ownerId: project.ownerId,
    projectId: project.id,
    assetId: project.assetId,
    riskTier: project.riskTier
  }));

const assetRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.assets.map((asset) => ({
    id: asset.id,
    label: asset.name,
    status: asset.status,
    ownerId: asset.ownerId,
    projectId: asset.projectId,
    assetId: asset.id
  }));

const fundingRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.fundingRecords.map((funding) => ({
    id: funding.id,
    label: `${funding.fundingType} ${formatMoney(money(funding.raisedAmount, funding.currency))}/${formatMoney(money(funding.targetAmount, funding.currency))}`,
    status: funding.status,
    ownerId: funding.issuerId,
    projectId: funding.projectId,
    assetId: funding.assetId
  }));

const debentureRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.debentures.map((debenture) => ({
    id: debenture.id,
    label: `${debenture.debentureType} ${formatMoney(money(debenture.raisedAmount, debenture.currency))}/${formatMoney(money(debenture.targetAmount, debenture.currency))}`,
    status: debenture.status,
    ownerId: debenture.issuerId,
    projectId: debenture.projectId,
    assetId: debenture.assetId
  }));

const treasuryRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.treasuryExposures.map((exposure) => ({
    id: exposure.id,
    label: `${exposure.exposureType} ${formatMoney(money(exposure.consumedAmount, exposure.currency))}/${formatMoney(money(exposure.approvedAmount, exposure.currency))}`,
    status: exposure.status,
    projectId: exposure.projectId,
    assetId: exposure.assetId,
    riskTier: exposure.riskTier,
    governanceRequired: true,
    treasuryExposureExpected: true
  }));

const revenueRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.revenueRecords.map((revenue) => ({
    id: revenue.id,
    label: `${revenue.source} ${formatMoney(money(revenue.netAmount, revenue.currency))} net`,
    status: revenue.status,
    projectId: revenue.projectId,
    assetId: revenue.assetId
  }));

const acsRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.acsRuntimes.map((runtime) => ({
    id: runtime.id,
    label: `${runtime.runtimeType} (${runtime.isolationProfile})`,
    status: runtime.status,
    ownerId: runtime.ownerId,
    projectId: runtime.relatedProjectId
  }));

const pluginRows = (): BusinessLifecycleTableRow[] =>
  businessRuntimeMock.plugins.map((plugin) => ({
    id: plugin.id,
    label: plugin.pluginName,
    status: plugin.status,
    ownerId: plugin.targetDaoId,
    projectId: plugin.projectId,
    assetId: plugin.assetId
  }));

const riskIndicators = (): BusinessRiskIndicator[] =>
  businessRuntimeMock.treasuryExposures.map((exposure) => {
    const project = businessRuntimeMock.projects.find((record) => record.id === exposure.projectId);
    return {
      id: exposure.id,
      label: `${project?.title ?? exposure.projectId} - ${BUSINESS_RISK_LABELS[exposure.riskTier]}`,
      riskTier: exposure.riskTier,
      status: exposure.status,
      governanceReference: exposure.governanceReference,
      treasuryExposureAmount: money(exposure.approvedAmount, exposure.currency)
    };
  });

const cardStatus = (value: number, warningThreshold: number, criticalThreshold: number): BusinessDashboardCard["status"] => {
  if (value >= criticalThreshold) {
    return "CRITICAL";
  }
  if (value >= warningThreshold) {
    return "WARNING";
  }
  return "NOTICE";
};

export const getBusinessDashboardModel = (): BusinessDashboardModel => {
  const summary = getBusinessRuntimeSummary();

  const cards: BusinessDashboardCard[] = [
    {
      id: "active-requests",
      label: "Active Requests",
      value: summary.activeRequests,
      detail: "Visible intake records requiring classification, review, approval, or execution tracking.",
      status: cardStatus(summary.activeRequests, 3, 8)
    },
    {
      id: "active-projects",
      label: "Active Projects",
      value: summary.activeProjects,
      detail: "Business initiatives currently visible in runtime lifecycle state.",
      status: cardStatus(summary.activeProjects, 5, 12)
    },
    {
      id: "operational-assets",
      label: "Operational Assets",
      value: summary.operationalAssets,
      detail: "Assets in approved, development, deployed, active, maintenance, or degraded state.",
      status: "NOTICE"
    },
    {
      id: "treasury-exposure",
      label: "Treasury Exposure",
      value: formatMoney(money(summary.treasuryExposure.consumedAmount, summary.treasuryExposure.currency)),
      detail: `${summary.treasuryExposure.activeRecords} active exposure records, ${formatMoney(money(summary.treasuryExposure.approvedAmount, summary.treasuryExposure.currency))} approved.`,
      status: cardStatus(summary.treasuryExposure.consumedAmount, 50000, 150000)
    },
    {
      id: "revenue-status",
      label: "Revenue Status",
      value: formatMoney(money(summary.revenueStatus.netAmount, summary.revenueStatus.currency)),
      detail: `${summary.revenueStatus.records} visible routing records, no distribution execution enabled.`,
      status: "INFO"
    },
    {
      id: "acs-runtime",
      label: "ACS Runtime",
      value: Object.values(summary.acsRuntimeStatusCounts).reduce((total, count) => total + count, 0),
      detail: "Mock ACS runtimes visible with no MCP provisioning authority.",
      status: "NOTICE"
    }
  ];

  return clone({
    generatedAt: new Date().toISOString(),
    cards,
    lifecycleTables: {
      requests: requestRows(),
      projects: projectRows(),
      assets: assetRows(),
      funding: fundingRows(),
      debentures: debentureRows(),
      treasury: treasuryRows(),
      revenue: revenueRows(),
      acs: acsRows(),
      plugins: pluginRows()
    },
    riskIndicators: riskIndicators(),
    telemetry: {
      totalEvents: businessRuntimeMock.telemetryEvents.length,
      severityCounts: summary.telemetrySeverityCounts,
      latestEvents: latestEvents()
    },
    nonExecutionMode: summary.nonExecutionMode
  });
};
