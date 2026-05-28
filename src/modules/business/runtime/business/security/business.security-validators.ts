import { BUSINESS_NON_EXECUTION_FLAGS } from "../constants/business.constants.js";
import { acsAdapter } from "../adapters/acs.adapter.js";
import { debentureAdapter } from "../adapters/debenture.adapter.js";
import { financialAdapter } from "../adapters/financial.adapter.js";
import { governanceAdapter } from "../adapters/governance.adapter.js";
import { identityAdapter } from "../adapters/identity.adapter.js";
import { treasuryAdapter } from "../adapters/treasury.adapter.js";
import { BUSINESS_ROUTE_DEFINITIONS } from "../api/business.routes.js";
import {
  BUSINESS_EXECUTION_POLICY_MATRIX,
  BUSINESS_RUNTIME_ACTIONS,
  getExecutionPolicySummary
} from "../policies/business.execution-policy.js";
import { getCapabilityMatrixSummary } from "../capabilities/business.capability-matrix.js";
import { getPermissionMatrixSummary } from "../permissions/business.permission-matrix.js";

export interface BusinessSecurityValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const ok = (): BusinessSecurityValidationResult => ({ valid: true, errors: [], warnings: [] });
const fail = (message: string): BusinessSecurityValidationResult => ({ valid: false, errors: [message], warnings: [] });

const merge = (results: BusinessSecurityValidationResult[]): BusinessSecurityValidationResult => ({
  valid: results.every((result) => result.valid),
  errors: results.flatMap((result) => result.errors),
  warnings: results.flatMap((result) => result.warnings)
});

const adapterRegistry = {
  governanceAdapter,
  treasuryAdapter,
  financialAdapter,
  debentureAdapter,
  acsAdapter,
  identityAdapter
};

const forbiddenMethodWords = [
  "execute",
  "transfer",
  "move",
  "mint",
  "burn",
  "issue",
  "buy",
  "sell",
  "provision",
  "deploy",
  "vote",
  "approve",
  "reject",
  "settle",
  "pay",
  "distribute",
  "callContract",
  "write"
];

const validateFlag = (flag: keyof typeof BUSINESS_NON_EXECUTION_FLAGS, message: string): BusinessSecurityValidationResult =>
  BUSINESS_NON_EXECUTION_FLAGS[flag] === false ? ok() : fail(message);

export const validateNoTreasuryExecution = (): BusinessSecurityValidationResult =>
  validateFlag("treasuryMovementEnabled", "Treasury movement flag must remain disabled.");

export const validateNoGovernanceExecution = (): BusinessSecurityValidationResult =>
  validateFlag("governanceExecutionEnabled", "Governance execution flag must remain disabled.");

export const validateNoDebentureExecution = (): BusinessSecurityValidationResult =>
  validateFlag("debentureIssuanceEnabled", "Debenture issuance flag must remain disabled.");

export const validateNoACSProvisioning = (): BusinessSecurityValidationResult =>
  validateFlag("acsProvisioningEnabled", "ACS provisioning flag must remain disabled.");

export const validateNoContractCalls = (): BusinessSecurityValidationResult =>
  validateFlag("contractCallsEnabled", "Contract call flag must remain disabled.");

export const validateAdaptersAreReadOnly = (): BusinessSecurityValidationResult => {
  const errors: string[] = [];

  for (const [adapterName, adapter] of Object.entries(adapterRegistry)) {
    if (adapter.mock !== true || adapter.readOnly !== true) {
      errors.push(`${adapterName} must declare mock=true and readOnly=true.`);
    }

    for (const methodName of Object.keys(adapter)) {
      const advisoryMethod = /^(can|requires|simulate|get|validate|is)/.test(methodName);
      if (!advisoryMethod && forbiddenMethodWords.some((word) => methodName.toLowerCase().includes(word.toLowerCase()))) {
        errors.push(`${adapterName}.${methodName} is not allowed in Sprint 04 mock/read-only runtime.`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings: [] };
};

export const validateExecutionPolicies = (): BusinessSecurityValidationResult => {
  const policies = Object.values(BUSINESS_EXECUTION_POLICY_MATRIX);
  const errors: string[] = [];

  if (policies.length !== BUSINESS_RUNTIME_ACTIONS.length) {
    errors.push("Execution policy matrix must cover every runtime action.");
  }

  for (const policy of policies) {
    if (policy.executable !== false) {
      errors.push(`${policy.action} must not be executable.`);
    }
  }

  return { valid: errors.length === 0, errors, warnings: [] };
};

export const validateCapabilityMatrixIntegrity = (): BusinessSecurityValidationResult => {
  const summary = getCapabilityMatrixSummary();
  if (!summary.mock || !summary.readOnly || Number(summary.totalSubjects) === 0 || Number(summary.totalCapabilities) === 0) {
    return fail("Capability matrix must be populated, mock and read-only.");
  }
  return ok();
};

export const validatePermissionMatrixIntegrity = (): BusinessSecurityValidationResult => {
  const summary = getPermissionMatrixSummary();
  if (!summary.mock || !summary.readOnly || summary.totalDecisions === 0 || summary.forbiddenDecisions === 0) {
    return fail("Permission matrix must include mock/read-only decisions and forbidden critical actions.");
  }
  return ok();
};

export const validateRouteSecurityMetadata = (): BusinessSecurityValidationResult => {
  const errors = BUSINESS_ROUTE_DEFINITIONS.flatMap((route) => {
    const routeErrors: string[] = [];
    if (!route.requiredCapability) routeErrors.push(`${route.id} is missing requiredCapability.`);
    if (!route.permissionMode) routeErrors.push(`${route.id} is missing permissionMode.`);
    if (!route.executionPolicy) routeErrors.push(`${route.id} is missing executionPolicy.`);
    if (route.mockOnly !== true || route.executionEnabled !== false) routeErrors.push(`${route.id} must remain mock-only and execution disabled.`);
    return routeErrors;
  });

  return { valid: errors.length === 0, errors, warnings: [] };
};

export const validateBusinessContractHardening = (): BusinessSecurityValidationResult =>
  merge([
    validateNoTreasuryExecution(),
    validateNoGovernanceExecution(),
    validateNoDebentureExecution(),
    validateNoACSProvisioning(),
    validateNoContractCalls(),
    validateAdaptersAreReadOnly(),
    validateExecutionPolicies(),
    validateCapabilityMatrixIntegrity(),
    validatePermissionMatrixIntegrity(),
    validateRouteSecurityMetadata()
  ]);

export const getSecurityValidatorStatus = () => {
  const result = validateBusinessContractHardening();
  return {
    valid: result.valid,
    errorCount: result.errors.length,
    warningCount: result.warnings.length,
    executionPolicySummary: getExecutionPolicySummary()
  };
};
