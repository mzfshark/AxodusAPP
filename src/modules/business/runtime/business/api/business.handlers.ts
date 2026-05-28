import { getBusinessDashboardModel } from "../dashboard/business.dashboard.js";
import { businessRuntimeMock } from "../data/business.mock.js";
import {
  getBusinessRuntimeSummary as getRuntimeSummary,
  listACSRuntimes,
  listBusinessIdentities,
  listBusinessProjects,
  listBusinessRequests,
  listDebentureRecords,
  listFederationParticipants,
  listFundingRecords,
  listOperationalAssets,
  listPluginRecords,
  listRevenueRecords,
  listTelemetryEvents,
  listTreasuryExposures
} from "../services/business.service.js";
import {
  getACSRuntimeById,
  getBusinessProjectById as selectBusinessProjectById,
  getBusinessRequestById as selectBusinessRequestById,
  getDebentureRecordById,
  getFundingRecordById,
  getOperationalAssetById,
  getPluginRecordById,
  getRevenueRecordById,
  getTelemetryEventById,
  getTreasuryExposureById
} from "../selectors/business.selectors.js";
import { FundingStatus, RequestStatus, RiskTier, TelemetrySeverity } from "../types/business.enums.js";
import { getCapabilityMatrixSummary } from "../capabilities/business.capability-matrix.js";
import { getBusinessEventSummary } from "../events/business.event-selectors.js";
import { getPermissionMatrixSummary } from "../permissions/business.permission-matrix.js";
import { getExecutionPolicySummary } from "../policies/business.execution-policy.js";
import { getSecurityValidatorStatus } from "../security/business.security-validators.js";
import { getBusinessApiRuntimeContractSummary } from "./business.api-summary.js";
import * as draftHandlers from "./business.draft.handlers.js";
import * as submissionHandlers from "./business.submission.handlers.js";
import * as reviewQueueHandlers from "./business.review-queue.handlers.js";
import * as auditHandlers from "./business.audit.handlers.js";
import * as snapshotHandlers from "./business.snapshot.handlers.js";
import * as governanceBridgeHandlers from "./business.governance-bridge.handlers.js";
import type {
  ACSRuntime,
  BusinessDashboardModel,
  BusinessId,
  BusinessIdentity,
  BusinessProject,
  BusinessRequest,
  DebentureRecord,
  FederationParticipant,
  FundingRecord,
  OperationalAsset,
  PluginRecord,
  RevenueRecord,
  TelemetryEvent,
  TreasuryExposure
} from "../types/business.types.js";
import { businessApiErrors } from "./business.errors.js";
import { businessApiNotFoundResponse, businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse, BusinessApiRuntimeSummary } from "./business.response.types.js";

type DetailSelector<TData> = (id: BusinessId) => TData | undefined;

const detail = <TData>(
  resource: string,
  id: BusinessId,
  selector: DetailSelector<TData>,
  path: string
): BusinessApiResponse<TData | null> => {
  const record = selector(id);
  if (!record) {
    return businessApiNotFoundResponse(businessApiErrors.notFound(resource, id), { self: path });
  }

  return businessApiResponse(record, { links: { self: path } });
};

export const getBusinessOverview = (): BusinessApiResponse<BusinessDashboardModel> =>
  businessApiResponse(getBusinessDashboardModel(), {
    links: { self: "/business" },
    telemetry: { eventCount: businessRuntimeMock.telemetryEvents.length, latestEventId: businessRuntimeMock.telemetryEvents[0]?.id }
  });

export const getBusinessRequests = (): BusinessApiResponse<BusinessRequest[]> => businessApiResponse(listBusinessRequests(), { links: { self: "/business/requests" } });
export const getBusinessRequestById = (requestId: BusinessId): BusinessApiResponse<BusinessRequest | null> =>
  detail("BusinessRequest", requestId, selectBusinessRequestById, `/business/requests/${requestId}`);

export const getBusinessProjects = (): BusinessApiResponse<BusinessProject[]> => businessApiResponse(listBusinessProjects(), { links: { self: "/business/projects" } });
export const getBusinessProjectById = (projectId: BusinessId): BusinessApiResponse<BusinessProject | null> =>
  detail("BusinessProject", projectId, selectBusinessProjectById, `/business/projects/${projectId}`);

export const getBusinessAssets = (): BusinessApiResponse<OperationalAsset[]> => businessApiResponse(listOperationalAssets(), { links: { self: "/business/assets" } });
export const getBusinessAssetById = (assetId: BusinessId): BusinessApiResponse<OperationalAsset | null> =>
  detail("OperationalAsset", assetId, getOperationalAssetById, `/business/assets/${assetId}`);

export const getBusinessPlugins = (): BusinessApiResponse<PluginRecord[]> => businessApiResponse(listPluginRecords(), { links: { self: "/business/plugins" } });
export const getBusinessPluginById = (pluginId: BusinessId): BusinessApiResponse<PluginRecord | null> =>
  detail("PluginRecord", pluginId, getPluginRecordById, `/business/plugins/${pluginId}`);

export const getBusinessFundingRecords = (): BusinessApiResponse<FundingRecord[]> => businessApiResponse(listFundingRecords(), { links: { self: "/business/funding" } });
export const getBusinessFundingRecordById = (fundingId: BusinessId): BusinessApiResponse<FundingRecord | null> =>
  detail("FundingRecord", fundingId, getFundingRecordById, `/business/funding/${fundingId}`);

export const getBusinessDebentures = (): BusinessApiResponse<DebentureRecord[]> => businessApiResponse(listDebentureRecords(), { links: { self: "/business/debentures" } });
export const getBusinessDebentureById = (debentureId: BusinessId): BusinessApiResponse<DebentureRecord | null> =>
  detail("DebentureRecord", debentureId, getDebentureRecordById, `/business/debentures/${debentureId}`);

export const getBusinessTreasuryExposures = (): BusinessApiResponse<TreasuryExposure[]> =>
  businessApiResponse(listTreasuryExposures(), { links: { self: "/business/treasury/exposure" } });
export const getBusinessTreasuryExposureById = (exposureId: BusinessId): BusinessApiResponse<TreasuryExposure | null> =>
  detail("TreasuryExposure", exposureId, getTreasuryExposureById, `/business/treasury/exposure/${exposureId}`);

export const getBusinessRevenueRecords = (): BusinessApiResponse<RevenueRecord[]> => businessApiResponse(listRevenueRecords(), { links: { self: "/business/revenue" } });
export const getBusinessRevenueRecordById = (revenueId: BusinessId): BusinessApiResponse<RevenueRecord | null> =>
  detail("RevenueRecord", revenueId, getRevenueRecordById, `/business/revenue/${revenueId}`);

export const getBusinessACSRuntimes = (): BusinessApiResponse<ACSRuntime[]> => businessApiResponse(listACSRuntimes(), { links: { self: "/business/acs/runtimes" } });
export const getBusinessACSRuntimeById = (runtimeId: BusinessId): BusinessApiResponse<ACSRuntime | null> =>
  detail("ACSRuntime", runtimeId, getACSRuntimeById, `/business/acs/runtimes/${runtimeId}`);

export const getBusinessTelemetryEvents = (): BusinessApiResponse<TelemetryEvent[]> =>
  businessApiResponse(listTelemetryEvents(), { links: { self: "/business/telemetry/events" }, telemetry: { eventCount: businessRuntimeMock.telemetryEvents.length } });
export const getBusinessTelemetryEventById = (eventId: BusinessId): BusinessApiResponse<TelemetryEvent | null> =>
  detail("TelemetryEvent", eventId, getTelemetryEventById, `/business/telemetry/events/${eventId}`);

export const getBusinessFederationParticipants = (): BusinessApiResponse<FederationParticipant[]> =>
  businessApiResponse(listFederationParticipants(), { links: { self: "/business/federation/participants" } });

export const getBusinessIdentities = (): BusinessApiResponse<BusinessIdentity[]> =>
  businessApiResponse(listBusinessIdentities(), { links: { self: "/business/identities" } });

export const getBusinessRuntimeSummary = (): BusinessApiResponse<BusinessApiRuntimeSummary> => {
  const runtimeSummary = getRuntimeSummary();
  const totalTreasuryExposure = businessRuntimeMock.treasuryExposures.reduce((total, exposure) => total + exposure.approvedAmount, 0);
  const totalRevenue = businessRuntimeMock.revenueRecords.reduce((total, revenue) => total + revenue.netAmount, 0);
  const eventSummary = getBusinessEventSummary();

  return businessApiResponse(
    {
      totalRequests: businessRuntimeMock.requests.length,
      totalProjects: businessRuntimeMock.projects.length,
      totalAssets: businessRuntimeMock.assets.length,
      totalFundingRecords: businessRuntimeMock.fundingRecords.length,
      totalDebentures: businessRuntimeMock.debentures.length,
      totalTreasuryExposure,
      totalRevenue,
      totalACSRuntimes: businessRuntimeMock.acsRuntimes.length,
      totalTelemetryEvents: businessRuntimeMock.telemetryEvents.length,
      activeRisks: businessRuntimeMock.projects.filter((project) => project.riskTier !== RiskTier.TIER_1_CRITICAL_INFRASTRUCTURE).length,
      criticalTelemetryEvents: businessRuntimeMock.telemetryEvents.filter((event) => event.severity === TelemetrySeverity.CRITICAL || event.severity === TelemetrySeverity.EMERGENCY).length,
      activeGovernanceReviews: businessRuntimeMock.requests.filter((request) => request.status === RequestStatus.GOVERNANCE_REVIEW).length,
      activeFundingReviews: businessRuntimeMock.fundingRecords.filter((funding) => funding.status === FundingStatus.GOVERNANCE_REVIEW || funding.status === FundingStatus.TREASURY_ANALYSIS).length,
      mockExecutionStatus: runtimeSummary.nonExecutionMode ? "MOCK_READ_ONLY" : "MOCK_READ_ONLY",
      capabilitySummary: getCapabilityMatrixSummary(),
      permissionSummary: getPermissionMatrixSummary(),
      executionPolicySummary: getExecutionPolicySummary(),
      contractStatus: {
        governance: "MOCK_READ_ONLY",
        treasury: "MOCK_READ_ONLY",
        financial: "MOCK_READ_ONLY",
        debenture: "MOCK_READ_ONLY",
        acs: "MOCK_READ_ONLY",
        identity: "MOCK_READ_ONLY"
      },
      securityValidatorStatus: getSecurityValidatorStatus(),
      eventSummary: {
        totalEvents: eventSummary.totalEvents,
        criticalEvents: eventSummary.criticalEvents,
        byType: eventSummary.byType,
        bySeverity: eventSummary.bySeverity,
        bySource: eventSummary.bySource,
        mock: true,
        readOnly: true
      },
      apiContractSummary: getBusinessApiRuntimeContractSummary(),
      dashboard: getBusinessDashboardModel()
    },
    { links: { self: "/business/telemetry/summary" } }
  );
};

export const businessApiHandlers = {
  getBusinessOverview,
  getBusinessRequests,
  getBusinessRequestById,
  getBusinessProjects,
  getBusinessProjectById,
  getBusinessAssets,
  getBusinessAssetById,
  getBusinessPlugins,
  getBusinessPluginById,
  getBusinessFundingRecords,
  getBusinessFundingRecordById,
  getBusinessDebentures,
  getBusinessDebentureById,
  getBusinessTreasuryExposures,
  getBusinessTreasuryExposureById,
  getBusinessRevenueRecords,
  getBusinessRevenueRecordById,
  getBusinessACSRuntimes,
  getBusinessACSRuntimeById,
  getBusinessTelemetryEvents,
  getBusinessTelemetryEventById,
  getBusinessFederationParticipants,
  getBusinessIdentities,
  getBusinessRuntimeSummary,
  ...draftHandlers,
  ...submissionHandlers,
  ...reviewQueueHandlers,
  ...auditHandlers,
  ...snapshotHandlers,
  ...governanceBridgeHandlers
};

export type BusinessApiHandlerName = keyof typeof businessApiHandlers;
