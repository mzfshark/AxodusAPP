import { getBusinessReviewQueueItem } from "../review/business.review-queue.js";
import type { BusinessId } from "../types/business.types.js";
import {
  getDraftSubmissionHistory,
  getDraftSubmissionReceipt
} from "./business.submission-receipts.js";
import type {
  BusinessDraftSubmission,
  BusinessDraftSubmissionStatus
} from "./business.submission-types.js";
import { validateDraftSubmissionReadiness } from "./business.submission-validation.js";

export const getDraftSubmissionStatus = (draftId: BusinessId): BusinessDraftSubmissionStatus => {
  const history = getDraftSubmissionHistory(draftId);
  if (history.length > 0) return history[0].submissionStatus;
  return validateDraftSubmissionReadiness(draftId).status;
};

export const getSubmissionReviewQueueItem = (submissionId: BusinessId) => {
  const receipt = getDraftSubmissionReceipt(submissionId);
  if (!receipt) return undefined;
  return getBusinessReviewQueueItem(receipt.reviewQueueItemId);
};

export const getBusinessDraftSubmission = (draftId: BusinessId): BusinessDraftSubmission => {
  const history = getDraftSubmissionHistory(draftId);
  const validation = validateDraftSubmissionReadiness(draftId);

  return {
    draftId,
    status: history[0]?.submissionStatus ?? validation.status,
    latestReceipt: history[0],
    history,
    validation,
    mock: true,
    readOnly: true,
    simulationOnly: true
  };
};
