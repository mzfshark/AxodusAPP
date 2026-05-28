import { listDraftStoreRecords } from "../drafts/business.draft-store.js";
import { getBlockedReviewQueueItems, getReadyForReviewQueueItems } from "../review/business.review-selectors.js";
import { getBusinessReviewQueue } from "../review/business.review-queue.js";
import { listDraftSubmissionReceipts } from "../submission/business.submission-receipts.js";
import { deriveBusinessAuditRecords } from "./business.audit.handlers.js";
import { deriveBusinessSnapshotsByEntity } from "./business.snapshot.handlers.js";

export const getBusinessApiRuntimeContractSummary = () => {
  const drafts = listDraftStoreRecords();
  const submissions = listDraftSubmissionReceipts();
  const reviewQueue = getBusinessReviewQueue();
  const auditRecords = deriveBusinessAuditRecords();
  const snapshotCount = new Set([
    ...drafts.map((draft) => draft.id),
    ...submissions.map((submission) => submission.submissionId),
    ...reviewQueue.map((item) => item.queueItemId),
    "id-axodus-core"
  ]);

  return {
    draftCount: drafts.length,
    validDraftCount: drafts.filter((draft) => draft.validation.valid).length,
    blockedDraftCount: drafts.filter((draft) => !draft.validation.valid || draft.validation.issues.some((issue) => issue.blocking)).length,
    submissionSimulationCount: submissions.length,
    submissionReceiptCount: submissions.length,
    reviewQueueCount: reviewQueue.length,
    readyForReviewCount: getReadyForReviewQueueItems().length,
    blockedReviewCount: getBlockedReviewQueueItems().length,
    auditRecordCount: auditRecords.length,
    snapshotCount: [...snapshotCount].flatMap(deriveBusinessSnapshotsByEntity).length,
    mockMutationCount: drafts.length + submissions.length,
    externalExecutionCount: 0 as const,
    mock: true as const,
    readOnly: true as const,
    simulationOnly: true as const
  };
};
