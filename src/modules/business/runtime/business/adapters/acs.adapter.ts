import { businessRuntimeMock } from "../data/business.mock.js";
import {
  requiresHumanReview as actionRequiresHumanReview,
  type BusinessRuntimeAction
} from "../policies/business.execution-policy.js";
import type {
  ACSAssistanceDecision,
  ACSComputeUsage,
  ACSIsolationPolicy,
  ACSPermissionProfile,
  BusinessACSAdapterContract,
  HumanReviewRequirement
} from "../contracts/acs.contract.js";
import type { ACSRuntime, ACSOrchestrationReceipt, BusinessId } from "../types/business.types.js";

export const acsAdapter = {
  mock: true,
  readOnly: true,

  getACSRuntime(runtimeId: BusinessId): ACSRuntime | undefined {
    return structuredClone(businessRuntimeMock.acsRuntimes.find((runtime) => runtime.id === runtimeId));
  },

  getACSRuntimeStatus(projectId: BusinessId): ACSRuntime["status"] | "NO_RUNTIME" {
    return businessRuntimeMock.acsRuntimes.find((runtime) => runtime.relatedProjectId === projectId)?.status ?? "NO_RUNTIME";
  },

  getOrchestrationReceipts(projectId: BusinessId): ACSOrchestrationReceipt[] {
    return structuredClone(businessRuntimeMock.acsReceipts.filter((receipt) => receipt.relatedProjectId === projectId));
  },

  getComputeUsage(runtimeId: BusinessId): ACSComputeUsage | undefined {
    const runtime = businessRuntimeMock.acsRuntimes.find((record) => record.id === runtimeId);
    if (!runtime) {
      return undefined;
    }

    return {
      runtimeId,
      cpuUnits: runtime.computeProfile.mockCpuUnits,
      memoryMb: runtime.computeProfile.mockMemoryMb,
      monthlyBudget: structuredClone(runtime.computeProfile.mockMonthlyBudget)
    };
  },

  getACSIsolationProfile(runtimeId: BusinessId): ACSIsolationPolicy | undefined {
    const runtime = businessRuntimeMock.acsRuntimes.find((record) => record.id === runtimeId);
    if (!runtime) return undefined;

    return {
      runtimeId,
      profile: runtime.isolationProfile,
      tenantBoundary: runtime.isolationProfile,
      memoryBoundary: runtime.isolationProfile === "DEDICATED" || runtime.isolationProfile === "SOVEREIGN" ? "TENANT_SCOPED" : "PROJECT_SCOPED"
    };
  },

  getACSPermissionProfile(runtimeId: BusinessId): ACSPermissionProfile | undefined {
    const runtime = businessRuntimeMock.acsRuntimes.find((record) => record.id === runtimeId);
    if (!runtime) return undefined;

    return {
      runtimeId,
      permissions: [...runtime.permissionProfile],
      autonomousExecutionAllowed: false
    };
  },

  requiresHumanReview(action: BusinessRuntimeAction): HumanReviewRequirement {
    return {
      action,
      required: actionRequiresHumanReview(action),
      reason: actionRequiresHumanReview(action) ? "Human review is required before this action can leave mock planning." : "Action remains read-only or simulated."
    };
  },

  canACSAssist(projectId: BusinessId, action: BusinessRuntimeAction): ACSAssistanceDecision {
    const runtime = businessRuntimeMock.acsRuntimes.find((record) => record.relatedProjectId === projectId);
    return {
      projectId,
      action,
      allowed: Boolean(runtime),
      reason: runtime ? "ACS can assist with visibility, classification or summarization only." : "No ACS runtime is linked to this project.",
      humanReviewRequired: actionRequiresHumanReview(action)
    };
  }
} satisfies BusinessACSAdapterContract;

export const getACSRuntime = acsAdapter.getACSRuntime;
export const getACSRuntimeStatus = acsAdapter.getACSRuntimeStatus;
export const getOrchestrationReceipts = acsAdapter.getOrchestrationReceipts;
export const getComputeUsage = acsAdapter.getComputeUsage;
export const getACSIsolationProfile = acsAdapter.getACSIsolationProfile;
export const getACSPermissionProfile = acsAdapter.getACSPermissionProfile;
export const requiresACSHumanReview = acsAdapter.requiresHumanReview;
export const canACSAssist = acsAdapter.canACSAssist;
