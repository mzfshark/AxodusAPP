import { BUSINESS_API_SOURCE, BUSINESS_API_VERSION } from "./business.response.types.js";
import type { BusinessApiMeta, BusinessApiRuntimeContext } from "./business.response.types.js";

let requestCounter = 0;

export const createBusinessApiMeta = (): BusinessApiMeta => {
  requestCounter += 1;

  return {
    requestId: `business-api-mock-${requestCounter.toString().padStart(6, "0")}`,
    timestamp: new Date().toISOString(),
    source: BUSINESS_API_SOURCE,
    version: BUSINESS_API_VERSION,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    executionMode: "MOCK_READ_ONLY"
  };
};

export const BUSINESS_API_RUNTIME_CONTEXT: BusinessApiRuntimeContext = {
  governanceStatus: "MOCK_GOVERNANCE_REVIEW_ONLY",
  treasuryStatus: "MOCK_TREASURY_VISIBILITY_ONLY",
  acsStatus: "MOCK_ACS_VISIBILITY_ONLY",
  telemetryStatus: "MOCK_TELEMETRY_ENABLED",
  executionMode: "MOCK_READ_ONLY",
  nonExecutionGuarantee: "NO_GOVERNANCE_TREASURY_DEBENTURE_ACS_CONTRACT_OR_BILLING_EXECUTION"
};
