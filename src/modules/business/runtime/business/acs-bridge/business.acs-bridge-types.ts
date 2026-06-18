import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { ACSComputeUsage, ACSIsolationPolicy, ACSPermissionProfile, HumanReviewRequirement } from "../contracts/acs.contract.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy } from "../policies/business.execution-policy.js";
import type { ACSIsolationProfile, ACSRuntimeType } from "../types/business.enums.js";
import type { ACSOrchestrationReceipt, ACSRuntime, BusinessId, TelemetryProfile } from "../types/business.types.js";
import type { BusinessWorkflowTemplate } from "../workflows/business.workflow-types.js";

export const BUSINESS_ACS_BRIDGE_STATUSES = [
  "NOT_REQUIRED",
  "ACS_REVIEW_REQUIRED",
  "ACS_RUNTIME_REQUIRED",
  "ACS_ISOLATION_REQUIRED",
  "ACS_PERMISSION_REVIEW_REQUIRED",
  "HUMAN_REVIEW_REQUIRED",
  "READY_FOR_ACS_REVIEW",
  "BLOCKED_BY_ACS_REQUIREMENTS",
  "HANDOFF_PREPARED",
  "WAITING_FOR_REAL_ACS_INTEGRATION",
  "ARCHIVED"
] as const;

export type BusinessACSBridgeStatus = (typeof BUSINESS_ACS_BRIDGE_STATUSES)[number];

export interface BusinessACSBridgeRequest {
  entityId: BusinessId;
  entityType: "DRAFT" | "PROJECT" | "ASSET" | "REQUEST" | "ACS_RUNTIME" | "UNKNOWN";
  requestedBy: BusinessId;
  requestedAt: string;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessACSBridgeBlocker {
  blockerId: BusinessId;
  entityId: BusinessId;
  message: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  blocking: boolean;
  source: "ACS" | "ISOLATION" | "PERMISSION" | "HUMAN_REVIEW" | "WORKFLOW" | "SECURITY";
  mock: true;
  readOnly: true;
}

export interface BusinessACSIsolationSnapshot {
  entityId: BusinessId;
  runtimeId?: BusinessId;
  isolationProfile?: ACSIsolationProfile;
  isolationPolicy?: ACSIsolationPolicy;
  tenantBoundary: string;
  memoryBoundary: string;
  crossTenantAccessAllowed: false;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessACSPermissionSnapshot {
  entityId: BusinessId;
  runtimeId?: BusinessId;
  permissionProfile: string[];
  permissionPolicy?: ACSPermissionProfile;
  autonomousExecutionAllowed: false;
  escalationAllowed: false;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessACSComputeSnapshot {
  entityId: BusinessId;
  runtimeId?: BusinessId;
  computeUsage?: ACSComputeUsage;
  cpuUnits: number;
  memoryMb: number;
  monthlyBudgetAmount: number;
  currency: string;
  allocationExecutable: false;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessACSHumanReviewSnapshot {
  entityId: BusinessId;
  required: boolean;
  requirements: HumanReviewRequirement[];
  gates: string[];
  bypassAllowed: false;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessACSReadinessPackage {
  packageId: BusinessId;
  entityId: BusinessId;
  entityType: BusinessACSBridgeRequest["entityType"];
  draftId?: BusinessId;
  projectId?: BusinessId;
  requesterId: BusinessId;
  acsRequired: boolean;
  runtimeType?: ACSRuntimeType;
  isolationProfile?: ACSIsolationProfile;
  permissionProfile: string[];
  memoryScope: string;
  computeProfile?: ACSRuntime["computeProfile"];
  humanReviewRequired: boolean;
  workflowObjective: string;
  telemetryProfile?: TelemetryProfile;
  orchestrationReceipts: ACSOrchestrationReceipt[];
  securityRestrictions: string[];
  blockers: BusinessACSBridgeBlocker[];
  warnings: string[];
  nextRecommendedStep: string;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessACSProvisioningPlan {
  planId: BusinessId;
  entityId: BusinessId;
  runtimeType?: ACSRuntimeType;
  deploymentScope: "ENTERPRISE" | "DAO" | "PROJECT" | "INTERNAL" | "UNKNOWN";
  isolationProfile?: ACSIsolationProfile;
  memoryScope: string;
  permissionProfile: string[];
  computeProfile?: ACSRuntime["computeProfile"];
  workflowTemplates: BusinessWorkflowTemplate[];
  expectedAgents: string[];
  humanReviewGates: string[];
  telemetryRequirements: string[];
  securityBoundaries: string[];
  blockedActions: string[];
  nonExecutionGuarantee: string;
  mock: true;
  readOnly: true;
  simulationOnly: true;
}

export interface BusinessACSHandoffReceipt {
  handoffReceiptId: BusinessId;
  packageId: BusinessId;
  entityId: BusinessId;
  entityType: BusinessACSBridgeRequest["entityType"];
  acsBridgeStatus: BusinessACSBridgeStatus;
  requiredACSActions: string[];
  blockedActions: string[];
  isolationSnapshot: BusinessACSIsolationSnapshot;
  permissionSnapshot: BusinessACSPermissionSnapshot;
  computeSnapshot: BusinessACSComputeSnapshot;
  humanReviewSnapshot: BusinessACSHumanReviewSnapshot;
  executionPolicy: BusinessExecutionPolicy;
  permissionDecision: BusinessPermissionDecision;
  capabilitySnapshot: BusinessCapability[];
  auditReference: BusinessId;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export type BusinessACSBridgePackage = BusinessACSReadinessPackage;

export interface BusinessACSBridgeSummary {
  totalEntities: number;
  acsRequired: number;
  runtimeRequired: number;
  isolationReviewRequired: number;
  permissionReviewRequired: number;
  humanReviewRequired: number;
  readyForACSReview: number;
  blockedByACSRequirements: number;
  handoffPrepared: number;
  waitingForRealACSIntegration: number;
  blockerCount: number;
  externalExecutionCount: 0;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}
