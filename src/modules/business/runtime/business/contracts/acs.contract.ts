import type { BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import type { ACSRuntimeStatus } from "../types/business.enums.js";
import type { ACSOrchestrationReceipt, ACSRuntime, BusinessId, MoneyAmount } from "../types/business.types.js";

export interface ACSIsolationPolicy {
  runtimeId: BusinessId;
  profile: string;
  tenantBoundary: "SHARED" | "SCOPED" | "DEDICATED" | "SOVEREIGN";
  memoryBoundary: "RUNTIME_SCOPED" | "PROJECT_SCOPED" | "TENANT_SCOPED";
}

export interface ACSPermissionProfile {
  runtimeId: BusinessId;
  permissions: string[];
  autonomousExecutionAllowed: false;
}

export interface ACSComputeUsage {
  runtimeId: BusinessId;
  cpuUnits: number;
  memoryMb: number;
  monthlyBudget: MoneyAmount;
}

export interface ACSAssistanceDecision {
  projectId: BusinessId;
  action: BusinessRuntimeAction;
  allowed: boolean;
  reason: string;
  humanReviewRequired: boolean;
}

export interface HumanReviewRequirement {
  action: BusinessRuntimeAction;
  required: boolean;
  reason: string;
}

export interface BusinessACSAdapterContract {
  readonly mock: true;
  readonly readOnly: true;
  getACSRuntime(runtimeId: BusinessId): ACSRuntime | undefined;
  getACSRuntimeStatus(projectId: BusinessId): ACSRuntimeStatus | "NO_RUNTIME";
  getOrchestrationReceipts(projectId: BusinessId): ACSOrchestrationReceipt[];
  getComputeUsage(runtimeId: BusinessId): ACSComputeUsage | undefined;
  getACSIsolationProfile(runtimeId: BusinessId): ACSIsolationPolicy | undefined;
  getACSPermissionProfile(runtimeId: BusinessId): ACSPermissionProfile | undefined;
  requiresHumanReview(action: BusinessRuntimeAction): HumanReviewRequirement;
  canACSAssist(projectId: BusinessId, action: BusinessRuntimeAction): ACSAssistanceDecision;
}
