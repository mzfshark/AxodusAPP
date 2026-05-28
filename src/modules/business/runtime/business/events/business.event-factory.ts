import { TelemetrySeverity } from "../types/business.enums.js";
import type {
  ACSRuntime,
  BusinessProject,
  BusinessRequest,
  DebentureRecord,
  FundingRecord,
  OperationalAsset,
  RevenueRecord,
  TelemetryEvent,
  TreasuryExposure
} from "../types/business.types.js";
import type { BusinessEventSource, BusinessEventType, BusinessRuntimeEvent } from "./business.event-types.js";

const createEvent = (
  eventType: BusinessEventType,
  source: BusinessEventSource,
  severity: TelemetrySeverity,
  timestamp: string,
  payload: Record<string, unknown>,
  relations: Omit<BusinessRuntimeEvent, "eventId" | "eventType" | "source" | "severity" | "timestamp" | "payload" | "mock" | "readOnly">,
  idPart: string
): BusinessRuntimeEvent => ({
  eventId: `evt-${source}-${idPart}`,
  eventType,
  source,
  severity,
  timestamp,
  payload,
  ...relations,
  mock: true,
  readOnly: true
});

export const createRequestLifecycleEvent = (request: BusinessRequest): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_REQUEST_LIFECYCLE",
    "business-request",
    request.priority === "CRITICAL" ? TelemetrySeverity.CRITICAL : TelemetrySeverity.NOTICE,
    request.updatedAt,
    {
      status: request.status,
      requestType: request.requestType,
      preferredFundingModel: request.preferredFundingModel,
      governanceRequired: request.governanceRequired,
      treasuryExposureExpected: request.treasuryExposureExpected,
      acsRequired: request.acsRequired
    },
    { relatedRequestId: request.id },
    request.id
  );

export const createProjectLifecycleEvent = (project: BusinessProject): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_PROJECT_LIFECYCLE",
    "business-project",
    project.governanceReference.constitutionalCompatibility === "RESTRICTED" ? TelemetrySeverity.CRITICAL : TelemetrySeverity.NOTICE,
    project.updatedAt,
    {
      status: project.status,
      projectType: project.projectType,
      riskTier: project.riskTier,
      milestoneCount: project.milestones.length
    },
    {
      relatedRequestId: project.requestId,
      relatedProjectId: project.id,
      relatedAssetId: project.assetId,
      relatedFundingId: project.fundingId,
      relatedGovernanceReference: project.governanceReference
    },
    project.id
  );

export const createAssetLifecycleEvent = (asset: OperationalAsset): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_ASSET_LIFECYCLE",
    "business-asset",
    TelemetrySeverity.INFO,
    asset.updatedAt,
    {
      status: asset.status,
      assetType: asset.assetType,
      revenueModel: asset.revenueModel,
      maintenanceOwner: asset.maintenanceOwner
    },
    { relatedProjectId: asset.projectId, relatedAssetId: asset.id, relatedFundingId: asset.fundingId },
    asset.id
  );

export const createFundingLifecycleEvent = (funding: FundingRecord): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_FUNDING_LIFECYCLE",
    "business-funding",
    funding.raisedAmount < funding.targetAmount ? TelemetrySeverity.WARNING : TelemetrySeverity.NOTICE,
    funding.updatedAt,
    {
      status: funding.status,
      fundingType: funding.fundingType,
      targetAmount: funding.targetAmount,
      raisedAmount: funding.raisedAmount,
      currency: funding.currency,
      executionEnabled: false
    },
    {
      relatedProjectId: funding.projectId,
      relatedAssetId: funding.assetId,
      relatedFundingId: funding.id,
      relatedDebentureId: funding.debentureId
    },
    funding.id
  );

export const createTreasuryExposureEvent = (exposure: TreasuryExposure): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_TREASURY_EXPOSURE",
    "business-treasury",
    exposure.consumedAmount > exposure.approvedAmount * 0.5 ? TelemetrySeverity.WARNING : TelemetrySeverity.NOTICE,
    exposure.updatedAt,
    {
      status: exposure.status,
      exposureType: exposure.exposureType,
      riskTier: exposure.riskTier,
      requestedAmount: exposure.requestedAmount,
      approvedAmount: exposure.approvedAmount,
      consumedAmount: exposure.consumedAmount,
      treasuryMovementEnabled: false
    },
    {
      relatedProjectId: exposure.projectId,
      relatedAssetId: exposure.assetId,
      relatedGovernanceReference: exposure.governanceReference
    },
    exposure.id
  );

export const createDebentureStatusEvent = (debenture: DebentureRecord): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_DEBENTURE_STATUS",
    "business-debenture",
    debenture.raisedAmount < debenture.targetAmount ? TelemetrySeverity.WARNING : TelemetrySeverity.NOTICE,
    debenture.updatedAt,
    {
      status: debenture.status,
      targetAmount: debenture.targetAmount,
      raisedAmount: debenture.raisedAmount,
      maturityDate: debenture.maturityDate,
      issuanceEnabled: false
    },
    {
      relatedProjectId: debenture.projectId,
      relatedAssetId: debenture.assetId,
      relatedDebentureId: debenture.id
    },
    debenture.id
  );

export const createRevenueRoutingEvent = (revenue: RevenueRecord): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_REVENUE_ROUTING",
    "business-revenue",
    TelemetrySeverity.NOTICE,
    revenue.updatedAt,
    {
      status: revenue.status,
      source: revenue.source,
      grossAmount: revenue.grossAmount,
      netAmount: revenue.netAmount,
      distributionExecuted: false
    },
    { relatedProjectId: revenue.projectId, relatedAssetId: revenue.assetId },
    revenue.id
  );

export const createACSRuntimeEvent = (runtime: ACSRuntime): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_ACS_RUNTIME",
    "business-acs",
    runtime.status === "REQUESTED" ? TelemetrySeverity.WARNING : TelemetrySeverity.INFO,
    runtime.updatedAt,
    {
      status: runtime.status,
      runtimeType: runtime.runtimeType,
      isolationProfile: runtime.isolationProfile,
      permissionProfile: runtime.permissionProfile,
      provisioningEnabled: false
    },
    { relatedProjectId: runtime.relatedProjectId, relatedACSRuntimeId: runtime.id },
    runtime.id
  );

export const createGovernanceReviewEvent = (project: BusinessProject): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_GOVERNANCE_REVIEW",
    "business-governance",
    project.governanceReference.constitutionalCompatibility === "REVIEW_REQUIRED" ? TelemetrySeverity.WARNING : TelemetrySeverity.INFO,
    project.updatedAt,
    {
      constitutionalCompatibility: project.governanceReference.constitutionalCompatibility,
      treasuryRestrictions: project.governanceReference.treasuryRestrictions,
      governanceExecutionEnabled: false
    },
    {
      relatedRequestId: project.requestId,
      relatedProjectId: project.id,
      relatedAssetId: project.assetId,
      relatedFundingId: project.fundingId,
      relatedGovernanceReference: project.governanceReference
    },
    project.id
  );

export const createTelemetrySignalEvent = (telemetry: TelemetryEvent): BusinessRuntimeEvent =>
  createEvent(
    "BUSINESS_TELEMETRY_SIGNAL",
    "business-telemetry",
    telemetry.severity,
    telemetry.createdAt,
    {
      telemetryEventId: telemetry.id,
      telemetryEventType: telemetry.eventType,
      status: telemetry.status,
      actor: telemetry.actor,
      auditReference: telemetry.auditReference,
      payload: telemetry.payload
    },
    {
      relatedRequestId: telemetry.relatedRequestId,
      relatedProjectId: telemetry.relatedProjectId,
      relatedAssetId: telemetry.relatedAssetId,
      relatedGovernanceReference: telemetry.governanceReference
    },
    telemetry.id
  );
