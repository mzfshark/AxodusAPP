import { getRequiredCapabilitiesForAction } from "../capabilities/business.capabilities.js";
import { getPermissionForAction } from "../permissions/business.permissions.js";
import { BUSINESS_EXECUTION_POLICY_MATRIX, getExecutionPolicy, type BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import type { BusinessRouteDefinition } from "./business.routes.js";
import type { BusinessApiExecutionContext, BusinessApiSecurityContext } from "./business.response.types.js";

export const BUSINESS_API_NON_EXECUTION_GUARANTEE =
  "NO_GOVERNANCE_TREASURY_DEBENTURE_ACS_CONTRACT_OR_BILLING_EXECUTION" as const;

export const BUSINESS_API_FORBIDDEN_ACTIONS = [
  "EXECUTE_GOVERNANCE_PROPOSAL",
  "MOVE_TREASURY_FUNDS",
  "ISSUE_DEBENTURE",
  "DISTRIBUTE_REVENUE",
  "PROVISION_ACS_RUNTIME",
  "CALL_CONTRACT",
  "EXECUTE_BILLING",
  "WALLET_SIGNING"
] as const;

export interface BusinessApiSecurityValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  checkedRoutes: number;
  externalSideEffects: false;
  mock: true;
  readOnly: true;
  simulationOnly: true;
}

export const createBusinessApiSecurityContext = (
  action: BusinessRuntimeAction = "VIEW_TELEMETRY",
  identityId = "id-axodus-core"
): BusinessApiSecurityContext => ({
  nonExecutionGuarantee: BUSINESS_API_NON_EXECUTION_GUARANTEE,
  forbiddenActions: [...BUSINESS_API_FORBIDDEN_ACTIONS],
  requiredCapabilities: getRequiredCapabilitiesForAction(action),
  permissionDecision: getPermissionForAction(identityId, action),
  executionPolicy: getExecutionPolicy(action),
  mockRuntime: true,
  externalSideEffects: false
});

export const createBusinessApiExecutionContext = (
  mockMutation = false
): BusinessApiExecutionContext => ({
  executionMode: "MOCK_READ_ONLY",
  simulationOnly: true,
  externalSideEffects: false,
  mockMutation
});

export const validateBusinessApiRouteSecurity = (
  routes: BusinessRouteDefinition[]
): BusinessApiSecurityValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const route of routes) {
    if (!route.requiredCapability) errors.push(`${route.id} omits required capability.`);
    if (!route.executionPolicy) errors.push(`${route.id} omits execution policy.`);
    if (route.externalSideEffects !== false) errors.push(`${route.id} declares external side effects.`);
    if (route.mockOnly !== true || route.readOnly !== true) errors.push(`${route.id} is not explicitly mock/read-only.`);
    if (route.method !== "GET" && route.simulationOnly !== true) {
      errors.push(`${route.id} is a mock mutation contract without simulationOnly.`);
    }
    if (BUSINESS_EXECUTION_POLICY_MATRIX[route.executionPolicy].executable !== false) {
      errors.push(`${route.id} references an executable policy.`);
    }
    if (route.method !== "GET" && !route.description.toLowerCase().includes("mock")) {
      warnings.push(`${route.id} should describe local/mock semantics.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    checkedRoutes: routes.length,
    externalSideEffects: false,
    mock: true,
    readOnly: true,
    simulationOnly: true
  };
};
