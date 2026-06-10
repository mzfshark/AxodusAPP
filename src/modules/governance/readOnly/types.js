/**
 * Frontend-local contracts that mirror the Governance backend read-model shape.
 * These are intentionally local to AxodusAPP until a shared package/API gate exists.
 */

export const governanceFreshnessStates = ['fresh', 'stale', 'rebuilding', 'unknown', 'failed'];

export const governanceReadOnlyModes = {
  LOCAL_MOCK: 'local-mock',
};

export const governanceExecutionIntentStates = {
  NONE: 'none',
  RECORDED: 'recorded',
  BLOCKED: 'blocked',
};

export const governanceReadOnlyErrors = {
  MISSING_TENANT: 'MISSING_TENANT',
  TENANT_NOT_FOUND: 'TENANT_NOT_FOUND',
  PROPOSAL_NOT_FOUND: 'PROPOSAL_NOT_FOUND',
};
