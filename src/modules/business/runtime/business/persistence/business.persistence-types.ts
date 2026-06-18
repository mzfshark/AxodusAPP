import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { BusinessDraftStoreRecord, BusinessDraftStoreStatus } from "../drafts/business.draft-types.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy } from "../policies/business.execution-policy.js";
import type { BusinessReviewQueueItem, BusinessReviewQueueStatus } from "../review/business.review-types.js";
import type { BusinessDraftSubmissionReceipt } from "../submission/business.submission-types.js";
import type { BusinessId } from "../types/business.types.js";
import type { BusinessAuditRecord } from "./business.audit-types.js";
import type {
  BusinessACSSnapshot,
  BusinessCapabilitySnapshot,
  BusinessEventSnapshot,
  BusinessExecutionPolicySnapshot,
  BusinessGovernanceSnapshot,
  BusinessIdentitySnapshot,
  BusinessPermissionSnapshot,
  BusinessReadinessSnapshot,
  BusinessTelemetrySnapshot,
  BusinessTreasurySnapshot
} from "./business.snapshot-types.js";

export const BUSINESS_PERSISTENCE_ENTITY_TYPES = [
  "DRAFT_RECORD",
  "DRAFT_VALIDATION_SNAPSHOT",
  "DRAFT_READINESS_SNAPSHOT",
  "DRAFT_SUBMISSION_RECEIPT",
  "REVIEW_QUEUE_RECORD",
  "REVIEW_DECISION_RECORD",
  "AUDIT_RECORD",
  "IDENTITY_SNAPSHOT",
  "PERMISSION_SNAPSHOT",
  "CAPABILITY_SNAPSHOT",
  "GOVERNANCE_READINESS_SNAPSHOT",
  "TREASURY_EXPOSURE_SNAPSHOT",
  "ACS_READINESS_SNAPSHOT",
  "EVENT_TIMELINE_SNAPSHOT"
] as const;

export type BusinessPersistenceEntityType = (typeof BUSINESS_PERSISTENCE_ENTITY_TYPES)[number];

export const BUSINESS_PERSISTENCE_LIFECYCLE_STATUSES = [
  "PLANNED_CONTRACT",
  "DRAFT",
  "ACTIVE",
  "ARCHIVED",
  "IMMUTABLE_AUDIT"
] as const;

export type BusinessPersistenceLifecycleStatus = (typeof BUSINESS_PERSISTENCE_LIFECYCLE_STATUSES)[number];

export interface BusinessPersistenceMetadata {
  id: BusinessId;
  entityType: BusinessPersistenceEntityType;
  lifecycleStatus: BusinessPersistenceLifecycleStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: BusinessId;
  updatedBy: BusinessId;
  governanceReference?: string;
  identityContext: BusinessIdentitySnapshot;
  permissionSnapshot: BusinessPermissionSnapshot;
  executionPolicySnapshot: BusinessExecutionPolicySnapshot;
  telemetryReference?: BusinessId;
  auditReference?: BusinessId;
  mock?: boolean;
  simulationOnly?: boolean;
  readOnlyPlanning: true;
}

export interface BusinessPersistentDraftRecord {
  metadata: BusinessPersistenceMetadata;
  draftRecord: BusinessDraftStoreRecord;
  status: BusinessDraftStoreStatus;
}

export interface BusinessPersistentSubmissionReceipt {
  metadata: BusinessPersistenceMetadata;
  receipt: BusinessDraftSubmissionReceipt;
}

export interface BusinessPersistentReviewQueueRecord {
  metadata: BusinessPersistenceMetadata;
  queueItem: BusinessReviewQueueItem;
  status: BusinessReviewQueueStatus;
}

export interface BusinessReviewDecisionRecord {
  metadata: BusinessPersistenceMetadata;
  queueItemId: BusinessId;
  reviewType: string;
  decision: "PREPARED" | "BLOCKED" | "REQUIRES_MORE_CONTEXT" | "ARCHIVED";
  decidedBy: BusinessId;
  reason: string;
  nonExecutionGuarantee: string;
}

export interface BusinessPersistenceSnapshotBundle {
  identitySnapshot: BusinessIdentitySnapshot;
  permissionSnapshot: BusinessPermissionSnapshot;
  capabilitySnapshot: BusinessCapabilitySnapshot;
  executionPolicySnapshot: BusinessExecutionPolicySnapshot;
  readinessSnapshot: BusinessReadinessSnapshot;
  governanceSnapshot: BusinessGovernanceSnapshot;
  treasurySnapshot: BusinessTreasurySnapshot;
  acsSnapshot: BusinessACSSnapshot;
  telemetrySnapshot: BusinessTelemetrySnapshot;
  eventSnapshot: BusinessEventSnapshot;
}

export interface BusinessPersistencePlan {
  repositories: string[];
  entities: readonly BusinessPersistenceEntityType[];
  storageOptions: readonly BusinessStorageStrategyOption[];
  nonGoals: readonly string[];
  backendCanPersist: readonly string[];
  backendCannotExecute: readonly string[];
  mock: true;
  readOnlyPlanning: true;
}

export const BUSINESS_STORAGE_STRATEGY_OPTIONS = [
  "JSON_MOCK_STORE",
  "SQLITE_LOCAL_DEV_STORE",
  "POSTGRESQL_BACKEND_STORE",
  "EVENT_SOURCED_STORE",
  "HYBRID_ON_CHAIN_RECEIPTS"
] as const;

export type BusinessStorageStrategyOption = (typeof BUSINESS_STORAGE_STRATEGY_OPTIONS)[number];

export interface BusinessPersistentRepositoryContext {
  actorId: BusinessId;
  identitySnapshot: BusinessIdentitySnapshot;
  permissionSnapshot: BusinessPermissionDecision;
  capabilitySnapshot: BusinessCapability[];
  executionPolicySnapshot: BusinessExecutionPolicy;
  auditRecord?: BusinessAuditRecord;
  nonExecutionGuarantee: string;
}
