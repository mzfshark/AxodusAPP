import type { BusinessApiError, BusinessApiErrorSeverity } from "./business.response.types.js";

export const BUSINESS_API_ERROR_CODES = [
  "DRAFT_NOT_FOUND",
  "DRAFT_INVALID",
  "DRAFT_NOT_READY",
  "SUBMISSION_SIMULATION_BLOCKED",
  "SUBMISSION_NOT_FOUND",
  "RECEIPT_NOT_FOUND",
  "QUEUE_ITEM_NOT_FOUND",
  "REVIEW_QUEUE_EMPTY",
  "AUDIT_RECORD_NOT_FOUND",
  "SNAPSHOT_NOT_FOUND",
  "PERMISSION_DENIED",
  "CAPABILITY_REQUIRED",
  "EXECUTION_FORBIDDEN",
  "MOCK_ONLY_OPERATION",
  "EXTERNAL_EXECUTION_DISABLED"
] as const;

export type BusinessApiStandardErrorCode = (typeof BUSINESS_API_ERROR_CODES)[number];

export const createBusinessApiError = (
  code: BusinessApiStandardErrorCode | string,
  message: string,
  severity: BusinessApiErrorSeverity = "WARNING",
  details: Record<string, unknown> = {},
  resolution = "Use the mock/read-only Business runtime contract and resolve blockers before any future real integration."
): BusinessApiError => ({
  code,
  message,
  severity,
  details,
  resolution,
  mock: true,
  readOnly: true
});

export const businessApiContractErrors = {
  draftNotFound(draftId: string): BusinessApiError {
    return createBusinessApiError("DRAFT_NOT_FOUND", "Draft was not found in the local/mock draft store.", "WARNING", { draftId }, "Create or select a local/mock draft record.");
  },
  draftInvalid(draftId: string, details: Record<string, unknown> = {}): BusinessApiError {
    return createBusinessApiError("DRAFT_INVALID", "Draft is structurally invalid.", "WARNING", { draftId, ...details }, "Complete required fields and remove real-execution language.");
  },
  draftNotReady(draftId: string, details: Record<string, unknown> = {}): BusinessApiError {
    return createBusinessApiError("DRAFT_NOT_READY", "Draft is not ready for simulated review submission.", "WARNING", { draftId, ...details }, "Resolve readiness blockers and warnings.");
  },
  submissionBlocked(draftId: string, details: Record<string, unknown> = {}): BusinessApiError {
    return createBusinessApiError("SUBMISSION_SIMULATION_BLOCKED", "Submission simulation is blocked by runtime readiness rules.", "CRITICAL", { draftId, ...details }, "Resolve validation, permission, capability and execution policy blockers.");
  },
  submissionNotFound(submissionId: string): BusinessApiError {
    return createBusinessApiError("SUBMISSION_NOT_FOUND", "Submission was not found in the mock submission receipt store.", "WARNING", { submissionId }, "Simulate a draft submission before requesting submission detail.");
  },
  receiptNotFound(submissionId: string): BusinessApiError {
    return createBusinessApiError("RECEIPT_NOT_FOUND", "Submission receipt was not found.", "WARNING", { submissionId }, "Use a valid mock submission id.");
  },
  queueItemNotFound(queueItemId: string): BusinessApiError {
    return createBusinessApiError("QUEUE_ITEM_NOT_FOUND", "Review queue item was not found.", "WARNING", { queueItemId }, "Use a draft id or review queue item id produced by the mock runtime.");
  },
  reviewQueueEmpty(): BusinessApiError {
    return createBusinessApiError("REVIEW_QUEUE_EMPTY", "Review queue is empty.", "INFO", {}, "Create a local/mock draft to produce review queue projections.");
  },
  auditRecordNotFound(auditId: string): BusinessApiError {
    return createBusinessApiError("AUDIT_RECORD_NOT_FOUND", "Audit record was not found in derived mock audit records.", "WARNING", { auditId }, "Use an audit id derived from mock drafts, submissions or review queue items.");
  },
  snapshotNotFound(entityId: string): BusinessApiError {
    return createBusinessApiError("SNAPSHOT_NOT_FOUND", "Snapshot was not found for the requested entity.", "WARNING", { entityId }, "Use an entity id known to the mock Business runtime.");
  },
  permissionDenied(details: Record<string, unknown> = {}): BusinessApiError {
    return createBusinessApiError("PERMISSION_DENIED", "Permission decision blocks this mock operation.", "CRITICAL", details, "Use an identity with the required mock capability.");
  },
  capabilityRequired(details: Record<string, unknown> = {}): BusinessApiError {
    return createBusinessApiError("CAPABILITY_REQUIRED", "Required capability is missing.", "WARNING", details, "Review capability matrix before future integration.");
  },
  executionForbidden(action: string): BusinessApiError {
    return createBusinessApiError("EXECUTION_FORBIDDEN", "Execution is forbidden in the current Business runtime.", "CRITICAL", { action }, "Keep this flow simulation-only until a future governed executor exists.");
  },
  mockOnlyOperation(action: string): BusinessApiError {
    return createBusinessApiError("MOCK_ONLY_OPERATION", "Operation is local/mock only and has no backend persistence guarantee.", "INFO", { action }, "Treat this response as a mock contract artifact.");
  },
  externalExecutionDisabled(action: string): BusinessApiError {
    return createBusinessApiError("EXTERNAL_EXECUTION_DISABLED", "External execution is disabled for this API contract.", "CRITICAL", { action, externalSideEffects: false }, "Do not call governance, treasury, ACS, contract, billing or wallet systems.");
  }
};
