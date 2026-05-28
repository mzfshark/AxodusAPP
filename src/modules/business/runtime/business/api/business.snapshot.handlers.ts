import { getCapabilitiesForIdentity } from "../capabilities/business.capabilities.js";
import { getDraftStoreRecordById, listDraftStoreRecords } from "../drafts/business.draft-store.js";
import type { BusinessDraftStoreRecord } from "../drafts/business.draft-types.js";
import { getPermissionForAction } from "../permissions/business.permissions.js";
import { BUSINESS_EXECUTION_POLICY_MATRIX } from "../policies/business.execution-policy.js";
import { getBusinessReviewQueueItem } from "../review/business.review-queue.js";
import { getDraftSubmissionReceipt } from "../submission/business.submission-receipts.js";
import { getBusinessIdentityById } from "../selectors/business.selectors.js";
import type { BusinessId } from "../types/business.types.js";
import type {
  BusinessACSSnapshot,
  BusinessCapabilitySnapshot,
  BusinessEventSnapshot,
  BusinessExecutionPolicySnapshot,
  BusinessGovernanceSnapshot,
  BusinessIdentitySnapshot,
  BusinessPermissionSnapshot,
  BusinessReadinessSnapshot,
  BusinessSnapshot,
  BusinessTelemetrySnapshot,
  BusinessTreasurySnapshot
} from "../persistence/business.snapshot-types.js";
import { businessApiContractErrors } from "./business.api-errors.js";
import { businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse } from "./business.response.types.js";

const now = (): string => new Date().toISOString();

const resolveDraftRecord = (entityId: BusinessId): BusinessDraftStoreRecord | undefined => {
  const direct = getDraftStoreRecordById(entityId);
  if (direct) return direct;

  const queueItem = getBusinessReviewQueueItem(entityId);
  if (queueItem) return getDraftStoreRecordById(queueItem.draftId);

  const receipt = getDraftSubmissionReceipt(entityId);
  if (receipt) return getDraftStoreRecordById(receipt.draftId);

  return undefined;
};

const resolveIdentityId = (entityId: BusinessId, record?: BusinessDraftStoreRecord): BusinessId => {
  if (getBusinessIdentityById(entityId)) return entityId;
  if (!record) return "id-axodus-core";
  if (record.draft.draftType === "DAO_PLUGIN_REQUEST") {
    return String(record.draft.values.daoIdentity ?? record.draft.requesterIdentityId ?? "id-axodus-core");
  }
  return record.draft.requesterIdentityId ?? String(record.draft.values.requesterIdentity ?? record.draft.values.daoIdentity ?? "id-axodus-core");
};

const base = (entityId: BusinessId, snapshotType: BusinessSnapshot["snapshotType"], entityType = "BUSINESS_RUNTIME_ENTITY") => ({
  snapshotId: `snapshot-${snapshotType.toLowerCase()}-${entityId}`,
  entityId,
  entityType,
  snapshotType,
  capturedAt: now(),
  capturedBy: "id-axodus-core",
  mock: true,
  simulationOnly: true,
  readOnlyPlanning: true as const
});

export const deriveBusinessIdentitySnapshot = (entityId: BusinessId): BusinessIdentitySnapshot | undefined => {
  const record = resolveDraftRecord(entityId);
  const identityId = resolveIdentityId(entityId, record);
  const identity = getBusinessIdentityById(identityId);
  if (!identity) return undefined;

  return {
    ...base(entityId, "IDENTITY_SNAPSHOT", "IDENTITY_CONTEXT"),
    snapshotType: "IDENTITY_SNAPSHOT",
    identityId,
    identityType: identity.identityType,
    federationLevel: identity.federationLevel,
    verificationLevel: identity.verificationLevel,
    tenantBoundary: identity.id
  };
};

export const deriveBusinessPermissionSnapshot = (entityId: BusinessId): BusinessPermissionSnapshot | undefined => {
  const record = resolveDraftRecord(entityId);
  const identityId = resolveIdentityId(entityId, record);
  if (!getBusinessIdentityById(identityId)) return undefined;
  const action = record?.preview.runtimeReview.executionReview.policy.action ?? "VIEW_TELEMETRY";

  return {
    ...base(entityId, "PERMISSION_SNAPSHOT", "PERMISSION_CONTEXT"),
    snapshotType: "PERMISSION_SNAPSHOT",
    identityId,
    decisions: [getPermissionForAction(identityId, action)]
  };
};

export const deriveBusinessCapabilitySnapshot = (entityId: BusinessId): BusinessCapabilitySnapshot | undefined => {
  const record = resolveDraftRecord(entityId);
  const identityId = resolveIdentityId(entityId, record);
  if (!getBusinessIdentityById(identityId)) return undefined;

  return {
    ...base(entityId, "CAPABILITY_SNAPSHOT", "CAPABILITY_CONTEXT"),
    snapshotType: "CAPABILITY_SNAPSHOT",
    identityId,
    capabilities: getCapabilitiesForIdentity(identityId)
  };
};

export const deriveBusinessExecutionPolicySnapshot = (entityId: BusinessId): BusinessExecutionPolicySnapshot => ({
  ...base(entityId, "EXECUTION_POLICY_SNAPSHOT", "EXECUTION_POLICY_CONTEXT"),
  snapshotType: "EXECUTION_POLICY_SNAPSHOT",
  policies: Object.values(BUSINESS_EXECUTION_POLICY_MATRIX),
  nonExecutableActions: Object.values(BUSINESS_EXECUTION_POLICY_MATRIX)
    .filter((policy) => policy.mode === "FORBIDDEN_IN_CURRENT_RUNTIME")
    .map((policy) => policy.action)
});

export const deriveBusinessReadinessSnapshot = (entityId: BusinessId): BusinessReadinessSnapshot | undefined => {
  const record = resolveDraftRecord(entityId);
  if (!record) return undefined;
  const readiness = record.preview.runtimeReview;

  return {
    ...base(entityId, "READINESS_SNAPSHOT", "READINESS_CONTEXT"),
    snapshotType: "READINESS_SNAPSHOT",
    readinessScore: record.validation.valid ? 100 : 50,
    blockers: record.validation.issues.filter((issue) => issue.blocking).map((issue) => issue.message),
    warnings: record.validation.issues.filter((issue) => !issue.blocking).map((issue) => issue.message),
    requiredReviews: [
      readiness.governanceRequirement ? "GOVERNANCE_REVIEW" : "",
      readiness.treasuryRequirement ? "TREASURY_REVIEW" : "",
      readiness.acsRequirement ? "ACS_REVIEW" : "",
      readiness.telemetryRequirement ? "TELEMETRY_REVIEW" : ""
    ].filter(Boolean)
  };
};

export const deriveBusinessGovernanceSnapshot = (entityId: BusinessId): BusinessGovernanceSnapshot => {
  const record = resolveDraftRecord(entityId);
  const runtimeReview = record?.preview.runtimeReview;
  return {
    ...base(entityId, "GOVERNANCE_SNAPSHOT", "GOVERNANCE_READINESS_CONTEXT"),
    snapshotType: "GOVERNANCE_SNAPSHOT",
    governanceReference: typeof record?.draft.values.governanceReference === "string" ? record.draft.values.governanceReference : undefined,
    constitutionalCompatibility: runtimeReview?.governanceRequirement ? "REVIEW_REQUIRED" : "MOCK_COMPATIBLE",
    restrictions: runtimeReview?.governanceRequirement ? ["Governance review required before any future execution."] : [],
    requiresApproval: runtimeReview?.governanceRequirement ?? false
  };
};

export const deriveBusinessTreasurySnapshot = (entityId: BusinessId): BusinessTreasurySnapshot => {
  const record = resolveDraftRecord(entityId);
  const runtimeReview = record?.preview.runtimeReview;
  const requestedAmount = Number(record?.draft.values.requestedAmount ?? record?.draft.values.targetAmount ?? record?.draft.values.estimatedBudget ?? 0);
  return {
    ...base(entityId, "TREASURY_SNAPSHOT", "TREASURY_READINESS_CONTEXT"),
    snapshotType: "TREASURY_SNAPSHOT",
    riskTier: runtimeReview?.riskReview.inferredRiskTier,
    requestedAmount: Number.isFinite(requestedAmount) ? requestedAmount : 0,
    approvedAmount: 0,
    consumedAmount: 0,
    currency: typeof record?.draft.values.currency === "string" ? record.draft.values.currency : "USD",
    restrictions: runtimeReview?.treasuryRequirement ? ["Treasury movement is disabled; future allocation requires treasury approval."] : []
  };
};

export const deriveBusinessACSSnapshot = (entityId: BusinessId): BusinessACSSnapshot => {
  const record = resolveDraftRecord(entityId);
  const permissionProfile = record?.draft.values.permissionProfile;
  return {
    ...base(entityId, "ACS_SNAPSHOT", "ACS_READINESS_CONTEXT"),
    snapshotType: "ACS_SNAPSHOT",
    runtimeReference: typeof record?.draft.values.acsRuntimeType === "string" ? record.draft.values.acsRuntimeType : undefined,
    isolationProfile: typeof record?.draft.values.isolationProfile === "string" ? record.draft.values.isolationProfile : undefined,
    permissionProfile: typeof permissionProfile === "string" ? [permissionProfile] : [],
    humanReviewRequired: record?.preview.runtimeReview.executionReview.policy.humanReviewRequired ?? true,
    memoryBoundary: typeof record?.draft.values.memoryScope === "string" ? record.draft.values.memoryScope : undefined
  };
};

export const deriveBusinessTelemetrySnapshot = (entityId: BusinessId): BusinessTelemetrySnapshot => ({
  ...base(entityId, "TELEMETRY_SNAPSHOT", "TELEMETRY_CONTEXT"),
  snapshotType: "TELEMETRY_SNAPSHOT",
  telemetryReference: entityId,
  sourceSystem: "@axodus/business-runtime",
  severity: "INFO",
  eventCount: 0
});

export const deriveBusinessEventSnapshot = (entityId: BusinessId): BusinessEventSnapshot => ({
  ...base(entityId, "EVENT_SNAPSHOT", "EVENT_CONTEXT"),
  snapshotType: "EVENT_SNAPSHOT",
  eventIds: [],
  criticalEventCount: 0,
  lineageReference: `mock-lineage-${entityId}`
});

export const deriveBusinessSnapshotsByEntity = (entityId: BusinessId): BusinessSnapshot[] => {
  const snapshots = [
    deriveBusinessIdentitySnapshot(entityId),
    deriveBusinessPermissionSnapshot(entityId),
    deriveBusinessCapabilitySnapshot(entityId),
    deriveBusinessExecutionPolicySnapshot(entityId),
    deriveBusinessReadinessSnapshot(entityId),
    deriveBusinessGovernanceSnapshot(entityId),
    deriveBusinessTreasurySnapshot(entityId),
    deriveBusinessACSSnapshot(entityId),
    deriveBusinessTelemetrySnapshot(entityId),
    deriveBusinessEventSnapshot(entityId)
  ];

  return snapshots.filter((snapshot): snapshot is BusinessSnapshot => Boolean(snapshot));
};

export const getBusinessSnapshots = (): BusinessApiResponse<BusinessSnapshot[]> => {
  const entityIds = new Set<BusinessId>([
    ...listDraftStoreRecords().map((record) => record.id),
    "id-axodus-core"
  ]);
  const snapshots = [...entityIds].flatMap(deriveBusinessSnapshotsByEntity);
  return businessApiResponse(snapshots, { links: { self: "/api/v1/business/snapshots" }, action: "VIEW_GOVERNANCE_REFERENCES" });
};

export const getBusinessSnapshotsByEntity = (entityId: BusinessId): BusinessApiResponse<BusinessSnapshot[] | null> => {
  const snapshots = deriveBusinessSnapshotsByEntity(entityId);
  return snapshots.length
    ? businessApiResponse(snapshots, { links: { self: `/api/v1/business/snapshots/entity/${entityId}` }, action: "VIEW_GOVERNANCE_REFERENCES" })
    : businessApiResponse(null, { errors: [businessApiContractErrors.snapshotNotFound(entityId)], links: { self: `/api/v1/business/snapshots/entity/${entityId}` }, action: "VIEW_GOVERNANCE_REFERENCES" });
};

const snapshotByType = <TSnapshot extends BusinessSnapshot>(
  entityId: BusinessId,
  snapshotType: TSnapshot["snapshotType"],
  self: string
): BusinessApiResponse<TSnapshot | null> => {
  const snapshot = deriveBusinessSnapshotsByEntity(entityId).find((entry) => entry.snapshotType === snapshotType) as TSnapshot | undefined;
  return snapshot
    ? businessApiResponse(snapshot, { links: { self }, action: "VIEW_GOVERNANCE_REFERENCES" })
    : businessApiResponse(null, { errors: [businessApiContractErrors.snapshotNotFound(entityId)], links: { self }, action: "VIEW_GOVERNANCE_REFERENCES" });
};

export const getBusinessIdentitySnapshot = (entityId: BusinessId) =>
  snapshotByType<BusinessIdentitySnapshot>(entityId, "IDENTITY_SNAPSHOT", `/api/v1/business/snapshots/identity/${entityId}`);
export const getBusinessPermissionSnapshot = (entityId: BusinessId) =>
  snapshotByType<BusinessPermissionSnapshot>(entityId, "PERMISSION_SNAPSHOT", `/api/v1/business/snapshots/permissions/${entityId}`);
export const getBusinessCapabilitySnapshot = (entityId: BusinessId) =>
  snapshotByType<BusinessCapabilitySnapshot>(entityId, "CAPABILITY_SNAPSHOT", `/api/v1/business/snapshots/capabilities/${entityId}`);
export const getBusinessExecutionPolicySnapshot = (entityId: BusinessId) =>
  snapshotByType<BusinessExecutionPolicySnapshot>(entityId, "EXECUTION_POLICY_SNAPSHOT", `/api/v1/business/snapshots/execution-policy/${entityId}`);
export const getBusinessGovernanceSnapshot = (entityId: BusinessId) =>
  snapshotByType<BusinessGovernanceSnapshot>(entityId, "GOVERNANCE_SNAPSHOT", `/api/v1/business/snapshots/governance/${entityId}`);
export const getBusinessTreasurySnapshot = (entityId: BusinessId) =>
  snapshotByType<BusinessTreasurySnapshot>(entityId, "TREASURY_SNAPSHOT", `/api/v1/business/snapshots/treasury/${entityId}`);
export const getBusinessACSSnapshot = (entityId: BusinessId) =>
  snapshotByType<BusinessACSSnapshot>(entityId, "ACS_SNAPSHOT", `/api/v1/business/snapshots/acs/${entityId}`);
