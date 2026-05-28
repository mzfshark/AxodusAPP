import type { BusinessId } from "../types/business.types.js";
import {
  getRequiredCapabilitiesForAction,
  hasCapability
} from "../capabilities/business.capabilities.js";
import {
  getExecutionPolicy,
  type BusinessRuntimeAction
} from "../policies/business.execution-policy.js";

export const BUSINESS_PERMISSION_MODES = [
  "VIEW",
  "PREPARE",
  "SIMULATE",
  "REQUEST_REVIEW",
  "BLOCKED",
  "FORBIDDEN"
] as const;

export type BusinessPermissionMode = (typeof BUSINESS_PERMISSION_MODES)[number];

export interface BusinessPermissionDecision {
  identityId: BusinessId;
  action: BusinessRuntimeAction;
  mode: BusinessPermissionMode;
  allowed: boolean;
  reason: string;
}

const modeForAction = (action: BusinessRuntimeAction): BusinessPermissionMode => {
  const policy = getExecutionPolicy(action);
  if (policy.mode === "MOCK_READ_ONLY") return "VIEW";
  if (policy.mode === "SIMULATION_ONLY") return "SIMULATE";
  if (policy.mode === "PREPARE_ONLY") return "PREPARE";
  if (policy.mode === "REQUIRES_GOVERNANCE" || policy.mode === "REQUIRES_TREASURY_APPROVAL" || policy.mode === "REQUIRES_HUMAN_REVIEW") return "REQUEST_REVIEW";
  return "FORBIDDEN";
};

export const getPermissionForAction = (identityId: BusinessId, action: BusinessRuntimeAction): BusinessPermissionDecision => {
  const requiredCapabilities = getRequiredCapabilitiesForAction(action);
  const missingCapabilities = requiredCapabilities.filter((capability) => !hasCapability(identityId, capability));
  const policy = getExecutionPolicy(action);
  const policyMode = modeForAction(action);

  if (policy.mode === "FORBIDDEN_IN_CURRENT_RUNTIME") {
    return {
      identityId,
      action,
      mode: "FORBIDDEN",
      allowed: false,
      reason: policy.reason
    };
  }

  if (missingCapabilities.length > 0) {
    return {
      identityId,
      action,
      mode: "BLOCKED",
      allowed: false,
      reason: `Missing capabilities: ${missingCapabilities.join(", ")}.`
    };
  }

  return {
    identityId,
    action,
    mode: policyMode,
    allowed: true,
    reason: "Action is available only in mock/read-only, prepare, simulation or review mode."
  };
};

export const canPrepareAction = (identityId: BusinessId, action: BusinessRuntimeAction): boolean =>
  getPermissionForAction(identityId, action).mode === "PREPARE";

export const canSimulateAction = (identityId: BusinessId, action: BusinessRuntimeAction): boolean =>
  getPermissionForAction(identityId, action).mode === "SIMULATE";

export const isActionForbidden = (identityId: BusinessId, action: BusinessRuntimeAction): boolean =>
  getPermissionForAction(identityId, action).mode === "FORBIDDEN";

export const explainPermissionDecision = (identityId: BusinessId, action: BusinessRuntimeAction): BusinessPermissionDecision =>
  getPermissionForAction(identityId, action);
