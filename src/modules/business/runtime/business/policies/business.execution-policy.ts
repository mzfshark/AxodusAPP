export const BUSINESS_EXECUTION_MODES = [
  "MOCK_READ_ONLY",
  "SIMULATION_ONLY",
  "PREPARE_ONLY",
  "REQUIRES_GOVERNANCE",
  "REQUIRES_TREASURY_APPROVAL",
  "REQUIRES_HUMAN_REVIEW",
  "FORBIDDEN_IN_CURRENT_RUNTIME"
] as const;

export type BusinessExecutionMode = (typeof BUSINESS_EXECUTION_MODES)[number];

export const BUSINESS_RUNTIME_ACTIONS = [
  "CREATE_BUSINESS_REQUEST",
  "CLASSIFY_REQUEST",
  "PREPARE_GOVERNANCE_REVIEW",
  "PREPARE_FUNDING_REVIEW",
  "PREPARE_DEBENTURE_DRAFT",
  "PREPARE_ACS_PROVISIONING_REQUEST",
  "REGISTER_OPERATIONAL_ASSET_DRAFT",
  "VIEW_TREASURY_EXPOSURE",
  "VIEW_REVENUE_ROUTING",
  "VIEW_ACS_RUNTIME",
  "VIEW_GOVERNANCE_REFERENCES",
  "VIEW_TELEMETRY",
  "SIMULATE_LIFECYCLE_TRANSITION",
  "EXECUTE_GOVERNANCE_PROPOSAL",
  "MOVE_TREASURY_FUNDS",
  "ISSUE_DEBENTURE",
  "DISTRIBUTE_REVENUE",
  "PROVISION_ACS_RUNTIME",
  "CALL_CONTRACT"
] as const;

export type BusinessRuntimeAction = (typeof BUSINESS_RUNTIME_ACTIONS)[number];

export interface BusinessExecutionPolicy {
  action: BusinessRuntimeAction;
  mode: BusinessExecutionMode;
  executable: false;
  governanceRequired: boolean;
  treasuryApprovalRequired: boolean;
  humanReviewRequired: boolean;
  reason: string;
}

const policy = (
  action: BusinessRuntimeAction,
  mode: BusinessExecutionMode,
  reason: string,
  governanceRequired = false,
  treasuryApprovalRequired = false,
  humanReviewRequired = false
): BusinessExecutionPolicy => ({
  action,
  mode,
  executable: false,
  governanceRequired,
  treasuryApprovalRequired,
  humanReviewRequired,
  reason
});

export const BUSINESS_EXECUTION_POLICY_MATRIX: Record<BusinessRuntimeAction, BusinessExecutionPolicy> = {
  CREATE_BUSINESS_REQUEST: policy("CREATE_BUSINESS_REQUEST", "PREPARE_ONLY", "Sprint runtime can prepare request intake only.", false, false, true),
  CLASSIFY_REQUEST: policy("CLASSIFY_REQUEST", "SIMULATION_ONLY", "Classification is simulated against mock data.", false, false, true),
  PREPARE_GOVERNANCE_REVIEW: policy("PREPARE_GOVERNANCE_REVIEW", "REQUIRES_GOVERNANCE", "Governance review can be prepared but not executed.", true),
  PREPARE_FUNDING_REVIEW: policy("PREPARE_FUNDING_REVIEW", "REQUIRES_TREASURY_APPROVAL", "Funding review can be prepared and requires treasury approval.", true, true),
  PREPARE_DEBENTURE_DRAFT: policy("PREPARE_DEBENTURE_DRAFT", "PREPARE_ONLY", "Debenture terms can be drafted only.", true, true, true),
  PREPARE_ACS_PROVISIONING_REQUEST: policy("PREPARE_ACS_PROVISIONING_REQUEST", "REQUIRES_HUMAN_REVIEW", "ACS provisioning can be requested for review only.", true, false, true),
  REGISTER_OPERATIONAL_ASSET_DRAFT: policy("REGISTER_OPERATIONAL_ASSET_DRAFT", "PREPARE_ONLY", "Asset registration remains draft-only.", false, false, true),
  VIEW_TREASURY_EXPOSURE: policy("VIEW_TREASURY_EXPOSURE", "MOCK_READ_ONLY", "Treasury exposure is visible as mock read-only data."),
  VIEW_REVENUE_ROUTING: policy("VIEW_REVENUE_ROUTING", "MOCK_READ_ONLY", "Revenue routing is visible as mock read-only data."),
  VIEW_ACS_RUNTIME: policy("VIEW_ACS_RUNTIME", "MOCK_READ_ONLY", "ACS runtime state is visible as mock read-only data."),
  VIEW_GOVERNANCE_REFERENCES: policy("VIEW_GOVERNANCE_REFERENCES", "MOCK_READ_ONLY", "Governance references are visible as mock read-only data."),
  VIEW_TELEMETRY: policy("VIEW_TELEMETRY", "MOCK_READ_ONLY", "Telemetry is visible as mock read-only data."),
  SIMULATE_LIFECYCLE_TRANSITION: policy("SIMULATE_LIFECYCLE_TRANSITION", "SIMULATION_ONLY", "Lifecycle changes can be simulated only.", false, false, true),
  EXECUTE_GOVERNANCE_PROPOSAL: policy("EXECUTE_GOVERNANCE_PROPOSAL", "FORBIDDEN_IN_CURRENT_RUNTIME", "Governance execution is forbidden in Business runtime.", true, false, true),
  MOVE_TREASURY_FUNDS: policy("MOVE_TREASURY_FUNDS", "FORBIDDEN_IN_CURRENT_RUNTIME", "Treasury movement is forbidden in Business runtime.", true, true, true),
  ISSUE_DEBENTURE: policy("ISSUE_DEBENTURE", "FORBIDDEN_IN_CURRENT_RUNTIME", "Debenture issuance is forbidden in Business runtime.", true, true, true),
  DISTRIBUTE_REVENUE: policy("DISTRIBUTE_REVENUE", "FORBIDDEN_IN_CURRENT_RUNTIME", "Revenue distribution is forbidden in Business runtime.", true, true, true),
  PROVISION_ACS_RUNTIME: policy("PROVISION_ACS_RUNTIME", "FORBIDDEN_IN_CURRENT_RUNTIME", "ACS provisioning is forbidden in Business runtime.", true, false, true),
  CALL_CONTRACT: policy("CALL_CONTRACT", "FORBIDDEN_IN_CURRENT_RUNTIME", "Contract calls are forbidden in Business runtime.", true, true, true)
};

export const getExecutionPolicy = (action: BusinessRuntimeAction): BusinessExecutionPolicy => BUSINESS_EXECUTION_POLICY_MATRIX[action];

export const assertNonExecutable = (action: BusinessRuntimeAction): true => {
  const executionPolicy = getExecutionPolicy(action);
  if (executionPolicy.executable !== false) {
    throw new Error(`Business action ${action} is unexpectedly executable.`);
  }
  return true;
};

export const requiresGovernance = (action: BusinessRuntimeAction): boolean => getExecutionPolicy(action).governanceRequired;
export const requiresTreasuryApproval = (action: BusinessRuntimeAction): boolean => getExecutionPolicy(action).treasuryApprovalRequired;
export const requiresHumanReview = (action: BusinessRuntimeAction): boolean => getExecutionPolicy(action).humanReviewRequired;

export const getExecutionPolicySummary = () => {
  const policies = Object.values(BUSINESS_EXECUTION_POLICY_MATRIX);
  return {
    totalPolicies: policies.length,
    executablePolicies: policies.filter((entry) => entry.executable !== false).length,
    forbiddenActions: policies.filter((entry) => entry.mode === "FORBIDDEN_IN_CURRENT_RUNTIME").length,
    governanceRequiredActions: policies.filter((entry) => entry.governanceRequired).length,
    treasuryRequiredActions: policies.filter((entry) => entry.treasuryApprovalRequired).length,
    humanReviewRequiredActions: policies.filter((entry) => entry.humanReviewRequired).length,
    runtimeMode: "MOCK_READ_ONLY" as const
  };
};
