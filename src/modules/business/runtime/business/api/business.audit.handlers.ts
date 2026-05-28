import { listDraftStoreRecords } from "../drafts/business.draft-store.js";
import { getBusinessReviewQueue } from "../review/business.review-queue.js";
import { listDraftSubmissionReceipts } from "../submission/business.submission-receipts.js";
import type { BusinessAuditRecord } from "../persistence/business.audit-types.js";
import type { BusinessId } from "../types/business.types.js";
import { businessApiContractErrors } from "./business.api-errors.js";
import {
  deriveBusinessACSSnapshot,
  deriveBusinessCapabilitySnapshot,
  deriveBusinessGovernanceSnapshot,
  deriveBusinessPermissionSnapshot,
  deriveBusinessTreasurySnapshot
} from "./business.snapshot.handlers.js";
import { businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse } from "./business.response.types.js";

const nonExecutionGuarantee =
  "Mock audit projection only: no governance, treasury, debenture, ACS, contract, billing, wallet or backend persistence execution.";

const auditRecord = (
  auditId: BusinessId,
  entityId: BusinessId,
  entityType: string,
  action: BusinessAuditRecord["action"],
  actorId: BusinessId,
  timestamp: string,
  nextState: unknown
): BusinessAuditRecord => {
  const permissionSnapshot = deriveBusinessPermissionSnapshot(entityId)?.decisions ?? [];
  const capabilitySnapshot = deriveBusinessCapabilitySnapshot(entityId)?.capabilities ?? [];

  return {
    auditId,
    entityId,
    entityType,
    action,
    actorId,
    timestamp,
    previousState: null,
    nextState,
    permissionSnapshot,
    capabilitySnapshot,
    executionPolicySnapshot: [],
    governanceSnapshot: deriveBusinessGovernanceSnapshot(entityId),
    treasurySnapshot: deriveBusinessTreasurySnapshot(entityId),
    acsSnapshot: deriveBusinessACSSnapshot(entityId),
    nonExecutionGuarantee,
    metadata: {
      mock: true,
      readOnly: true,
      simulationOnly: true,
      externalSideEffects: false
    },
    immutable: true,
    readOnlyPlanning: true
  };
};

export const deriveBusinessAuditRecords = (): BusinessAuditRecord[] => {
  const draftRecords = listDraftStoreRecords().map((record) =>
    auditRecord(
      `audit-${record.id}-draft-created`,
      record.id,
      "DRAFT_RECORD",
      "DRAFT_CREATED",
      record.draft.requesterIdentityId ?? "id-axodus-core",
      record.createdAt,
      { status: record.status, title: record.title }
    )
  );

  const submissionRecords = listDraftSubmissionReceipts().map((receipt) =>
    auditRecord(
      `audit-${receipt.submissionId}-submission-simulated`,
      receipt.submissionId,
      "DRAFT_SUBMISSION_RECEIPT",
      "SUBMISSION_SIMULATED",
      receipt.submittedBy,
      receipt.createdAt,
      { draftId: receipt.draftId, status: receipt.submissionStatus, reviewQueueItemId: receipt.reviewQueueItemId }
    )
  );

  const queueRecords = getBusinessReviewQueue().map((item) =>
    auditRecord(
      `audit-${item.queueItemId}-queue-created`,
      item.queueItemId,
      "REVIEW_QUEUE_RECORD",
      "REVIEW_QUEUE_ITEM_CREATED",
      item.requesterId,
      item.createdAt,
      { draftId: item.draftId, status: item.status, priority: item.priority }
    )
  );

  return [...draftRecords, ...submissionRecords, ...queueRecords].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
};

export const getBusinessAuditRecords = (): BusinessApiResponse<BusinessAuditRecord[]> =>
  businessApiResponse(deriveBusinessAuditRecords(), {
    links: { self: "/api/v1/business/audit" },
    action: "VIEW_GOVERNANCE_REFERENCES"
  });

export const getBusinessAuditRecordById = (auditId: BusinessId): BusinessApiResponse<BusinessAuditRecord | null> => {
  const record = deriveBusinessAuditRecords().find((entry) => entry.auditId === auditId);
  return record
    ? businessApiResponse(record, { links: { self: `/api/v1/business/audit/${auditId}` }, action: "VIEW_GOVERNANCE_REFERENCES" })
    : businessApiResponse(null, { errors: [businessApiContractErrors.auditRecordNotFound(auditId)], links: { self: `/api/v1/business/audit/${auditId}` }, action: "VIEW_GOVERNANCE_REFERENCES" });
};

export const getBusinessAuditRecordsByEntity = (entityId: BusinessId): BusinessApiResponse<BusinessAuditRecord[]> =>
  businessApiResponse(deriveBusinessAuditRecords().filter((record) => record.entityId === entityId), {
    links: { self: `/api/v1/business/audit/entity/${entityId}` },
    action: "VIEW_GOVERNANCE_REFERENCES"
  });

export const getBusinessAuditRecordsByActor = (actorId: BusinessId): BusinessApiResponse<BusinessAuditRecord[]> =>
  businessApiResponse(deriveBusinessAuditRecords().filter((record) => record.actorId === actorId), {
    links: { self: `/api/v1/business/audit/actor/${actorId}` },
    action: "VIEW_GOVERNANCE_REFERENCES"
  });
