import type { BusinessDashboardModel, BusinessId } from "../types/business.types.js";
import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy } from "../policies/business.execution-policy.js";

export const BUSINESS_API_VERSION = "v1";
export const BUSINESS_API_SOURCE = "@axodus/business-runtime";

export type BusinessApiErrorSeverity = "INFO" | "WARNING" | "CRITICAL";
export type BusinessApiExecutionMode = "MOCK_READ_ONLY";

export interface BusinessApiMeta {
  requestId: BusinessId;
  timestamp: string;
  source: typeof BUSINESS_API_SOURCE;
  version: typeof BUSINESS_API_VERSION;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  executionMode: BusinessApiExecutionMode;
}

export interface BusinessApiError {
  code: string;
  message: string;
  severity: BusinessApiErrorSeverity;
  details?: Record<string, unknown>;
  resolution: string;
  mock: true;
  readOnly: true;
}

export interface BusinessApiRuntimeContext {
  governanceStatus: "MOCK_GOVERNANCE_REVIEW_ONLY";
  treasuryStatus: "MOCK_TREASURY_VISIBILITY_ONLY";
  acsStatus: "MOCK_ACS_VISIBILITY_ONLY";
  telemetryStatus: "MOCK_TELEMETRY_ENABLED";
  executionMode: BusinessApiExecutionMode;
  nonExecutionGuarantee: "NO_GOVERNANCE_TREASURY_DEBENTURE_ACS_CONTRACT_OR_BILLING_EXECUTION";
}

export interface BusinessApiLinks {
  self?: string;
  related?: Record<string, string>;
}

export interface BusinessApiTelemetry {
  eventCount?: number;
  latestEventId?: BusinessId;
}

export interface BusinessApiSecurityContext {
  nonExecutionGuarantee: "NO_GOVERNANCE_TREASURY_DEBENTURE_ACS_CONTRACT_OR_BILLING_EXECUTION";
  forbiddenActions: string[];
  requiredCapabilities: BusinessCapability[];
  permissionDecision: BusinessPermissionDecision;
  executionPolicy: BusinessExecutionPolicy;
  mockRuntime: true;
  externalSideEffects: false;
}

export interface BusinessApiExecutionContext {
  executionMode: BusinessApiExecutionMode;
  simulationOnly: true;
  externalSideEffects: false;
  mockMutation: boolean;
}

export interface BusinessApiResponse<TData> {
  data: TData;
  meta: BusinessApiMeta;
  errors: BusinessApiError[];
  links?: BusinessApiLinks;
  telemetry?: BusinessApiTelemetry;
  runtime?: BusinessApiRuntimeContext;
  security?: BusinessApiSecurityContext;
  execution?: BusinessApiExecutionContext;
}

export interface BusinessApiRuntimeSummary {
  totalRequests: number;
  totalProjects: number;
  totalAssets: number;
  totalFundingRecords: number;
  totalDebentures: number;
  totalTreasuryExposure: number;
  totalRevenue: number;
  totalACSRuntimes: number;
  totalTelemetryEvents: number;
  activeRisks: number;
  criticalTelemetryEvents: number;
  activeGovernanceReviews: number;
  activeFundingReviews: number;
  mockExecutionStatus: BusinessApiExecutionMode;
  capabilitySummary: {
    totalSubjects: number;
    totalCapabilities: number;
    readOnly: boolean;
    mock: boolean;
  };
  permissionSummary: {
    totalDecisions: number;
    forbiddenDecisions: number;
    blockedDecisions: number;
    readOnly: boolean;
    mock: boolean;
  };
  executionPolicySummary: {
    totalPolicies: number;
    executablePolicies: number;
    forbiddenActions: number;
    governanceRequiredActions: number;
    treasuryRequiredActions: number;
    humanReviewRequiredActions: number;
    runtimeMode: BusinessApiExecutionMode;
  };
  contractStatus: {
    governance: "MOCK_READ_ONLY";
    treasury: "MOCK_READ_ONLY";
    financial: "MOCK_READ_ONLY";
    debenture: "MOCK_READ_ONLY";
    acs: "MOCK_READ_ONLY";
    identity: "MOCK_READ_ONLY";
  };
  securityValidatorStatus: {
    valid: boolean;
    errorCount: number;
    warningCount: number;
  };
  eventSummary: {
    totalEvents: number;
    criticalEvents: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
    bySource: Record<string, number>;
    mock: true;
    readOnly: true;
  };
  apiContractSummary: {
    draftCount: number;
    validDraftCount: number;
    blockedDraftCount: number;
    submissionSimulationCount: number;
    submissionReceiptCount: number;
    reviewQueueCount: number;
    readyForReviewCount: number;
    blockedReviewCount: number;
    auditRecordCount: number;
    snapshotCount: number;
    mockMutationCount: number;
    externalExecutionCount: 0;
    mock: true;
    readOnly: true;
    simulationOnly: true;
  };
  dashboard: BusinessDashboardModel;
}
