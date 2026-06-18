import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy } from "../policies/business.execution-policy.js";
import type { BusinessId } from "../types/business.types.js";
import type {
  BusinessACSSnapshot,
  BusinessGovernanceSnapshot,
  BusinessTreasurySnapshot
} from "./business.snapshot-types.js";

export const BUSINESS_AUDIT_ACTIONS = [
  "DRAFT_CREATED",
  "DRAFT_UPDATED",
  "DRAFT_ARCHIVED",
  "READINESS_SNAPSHOT_CREATED",
  "SUBMISSION_SIMULATED",
  "SUBMISSION_RECEIPT_CREATED",
  "REVIEW_QUEUE_ITEM_CREATED",
  "REVIEW_QUEUE_STATUS_UPDATED",
  "REVIEW_DECISION_PREPARED",
  "SNAPSHOT_CAPTURED",
  "AUDIT_RECORD_APPENDED"
] as const;

export type BusinessAuditAction = (typeof BUSINESS_AUDIT_ACTIONS)[number];

export interface BusinessAuditRecord {
  auditId: BusinessId;
  entityId: BusinessId;
  entityType: string;
  action: BusinessAuditAction;
  actorId: BusinessId;
  timestamp: string;
  previousState: unknown;
  nextState: unknown;
  permissionSnapshot: BusinessPermissionDecision[];
  capabilitySnapshot: BusinessCapability[];
  executionPolicySnapshot: BusinessExecutionPolicy[];
  governanceSnapshot: BusinessGovernanceSnapshot;
  treasurySnapshot: BusinessTreasurySnapshot;
  acsSnapshot: BusinessACSSnapshot;
  nonExecutionGuarantee: string;
  metadata: Record<string, string | number | boolean | string[]>;
  immutable: true;
  readOnlyPlanning: true;
}
