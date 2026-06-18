import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy } from "../policies/business.execution-policy.js";
import type { BusinessId } from "../types/business.types.js";

export const BUSINESS_SNAPSHOT_TYPES = [
  "IDENTITY_SNAPSHOT",
  "PERMISSION_SNAPSHOT",
  "CAPABILITY_SNAPSHOT",
  "EXECUTION_POLICY_SNAPSHOT",
  "READINESS_SNAPSHOT",
  "GOVERNANCE_SNAPSHOT",
  "TREASURY_SNAPSHOT",
  "ACS_SNAPSHOT",
  "TELEMETRY_SNAPSHOT",
  "EVENT_SNAPSHOT"
] as const;

export type BusinessSnapshotType = (typeof BUSINESS_SNAPSHOT_TYPES)[number];

export interface BusinessSnapshotBase {
  snapshotId: BusinessId;
  entityId: BusinessId;
  entityType: string;
  snapshotType: BusinessSnapshotType;
  capturedAt: string;
  capturedBy: BusinessId;
  mock?: boolean;
  simulationOnly?: boolean;
  readOnlyPlanning: true;
}

export interface BusinessIdentitySnapshot extends BusinessSnapshotBase {
  snapshotType: "IDENTITY_SNAPSHOT";
  identityId: BusinessId;
  identityType: string;
  federationLevel: string;
  verificationLevel: string;
  tenantBoundary?: string;
}

export interface BusinessPermissionSnapshot extends BusinessSnapshotBase {
  snapshotType: "PERMISSION_SNAPSHOT";
  identityId: BusinessId;
  decisions: BusinessPermissionDecision[];
}

export interface BusinessCapabilitySnapshot extends BusinessSnapshotBase {
  snapshotType: "CAPABILITY_SNAPSHOT";
  identityId: BusinessId;
  capabilities: BusinessCapability[];
}

export interface BusinessExecutionPolicySnapshot extends BusinessSnapshotBase {
  snapshotType: "EXECUTION_POLICY_SNAPSHOT";
  policies: BusinessExecutionPolicy[];
  nonExecutableActions: string[];
}

export interface BusinessReadinessSnapshot extends BusinessSnapshotBase {
  snapshotType: "READINESS_SNAPSHOT";
  readinessScore: number;
  blockers: string[];
  warnings: string[];
  requiredReviews: string[];
}

export interface BusinessGovernanceSnapshot extends BusinessSnapshotBase {
  snapshotType: "GOVERNANCE_SNAPSHOT";
  governanceReference?: string;
  constitutionalCompatibility?: string;
  restrictions: string[];
  requiresApproval: boolean;
}

export interface BusinessTreasurySnapshot extends BusinessSnapshotBase {
  snapshotType: "TREASURY_SNAPSHOT";
  exposureReference?: string;
  riskTier?: string;
  requestedAmount?: number;
  approvedAmount?: number;
  consumedAmount?: number;
  currency?: string;
  restrictions: string[];
}

export interface BusinessACSSnapshot extends BusinessSnapshotBase {
  snapshotType: "ACS_SNAPSHOT";
  runtimeReference?: string;
  isolationProfile?: string;
  permissionProfile: string[];
  humanReviewRequired: boolean;
  memoryBoundary?: string;
}

export interface BusinessTelemetrySnapshot extends BusinessSnapshotBase {
  snapshotType: "TELEMETRY_SNAPSHOT";
  telemetryReference?: string;
  sourceSystem?: string;
  severity?: string;
  eventCount: number;
}

export interface BusinessEventSnapshot extends BusinessSnapshotBase {
  snapshotType: "EVENT_SNAPSHOT";
  eventIds: BusinessId[];
  criticalEventCount: number;
  lineageReference?: string;
}

export type BusinessSnapshot =
  | BusinessIdentitySnapshot
  | BusinessPermissionSnapshot
  | BusinessCapabilitySnapshot
  | BusinessExecutionPolicySnapshot
  | BusinessReadinessSnapshot
  | BusinessGovernanceSnapshot
  | BusinessTreasurySnapshot
  | BusinessACSSnapshot
  | BusinessTelemetrySnapshot
  | BusinessEventSnapshot;
