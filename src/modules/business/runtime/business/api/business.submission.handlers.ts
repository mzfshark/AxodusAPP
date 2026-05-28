import {
  getDraftSubmissionHistory,
  getDraftSubmissionReceipt,
  listDraftSubmissionReceipts
} from "../submission/business.submission-receipts.js";
import { getBusinessDraftSubmission, getSubmissionReviewQueueItem } from "../submission/business.submission-selectors.js";
import { simulateBusinessDraftSubmission } from "../submission/business.submission-simulation.js";
import { validateDraftSubmissionReadiness } from "../submission/business.submission-validation.js";
import type { BusinessDraftSubmission, BusinessDraftSubmissionReceipt, BusinessDraftSubmissionResult, BusinessDraftSubmissionValidation } from "../submission/business.submission-types.js";
import type { BusinessReviewQueueItem } from "../review/business.review-types.js";
import type { BusinessId } from "../types/business.types.js";
import { businessApiContractErrors } from "./business.api-errors.js";
import { businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse } from "./business.response.types.js";

const submissionPath = (submissionId?: BusinessId, suffix = ""): string =>
  submissionId ? `/api/v1/business/submissions/${submissionId}${suffix}` : "/api/v1/business/submissions";

const draftSubmissionPath = (draftId: BusinessId, suffix = ""): string =>
  `/api/v1/business/drafts/${draftId}${suffix}`;

export const validateBusinessDraftSubmissionReadiness = (draftId: BusinessId): BusinessApiResponse<BusinessDraftSubmissionValidation> =>
  businessApiResponse(validateDraftSubmissionReadiness(draftId), {
    links: { self: draftSubmissionPath(draftId, "/submission-validation") },
    action: "CREATE_BUSINESS_REQUEST"
  });

export const simulateBusinessDraftSubmissionHandler = (draftId: BusinessId): BusinessApiResponse<BusinessDraftSubmissionResult> => {
  const result = simulateBusinessDraftSubmission(draftId);
  return businessApiResponse(result, {
    links: { self: draftSubmissionPath(draftId, "/simulate-submission") },
    errors: result.success ? [] : [businessApiContractErrors.submissionBlocked(draftId, { errors: result.errors.map((error) => error.code) })],
    action: "CREATE_BUSINESS_REQUEST",
    mockMutation: true
  });
};

export const listBusinessDraftSubmissions = (): BusinessApiResponse<BusinessDraftSubmissionReceipt[]> =>
  businessApiResponse(listDraftSubmissionReceipts(), {
    links: { self: submissionPath() },
    action: "CREATE_BUSINESS_REQUEST"
  });

export const getBusinessDraftSubmissionById = (submissionId: BusinessId): BusinessApiResponse<BusinessDraftSubmissionReceipt | null> => {
  const receipt = getDraftSubmissionReceipt(submissionId);
  return receipt
    ? businessApiResponse(receipt, { links: { self: submissionPath(submissionId) }, action: "CREATE_BUSINESS_REQUEST" })
    : businessApiResponse(null, {
      errors: [businessApiContractErrors.submissionNotFound(submissionId)],
      links: { self: submissionPath(submissionId) },
      action: "CREATE_BUSINESS_REQUEST"
    });
};

export const getBusinessDraftSubmissionReceipt = (submissionId: BusinessId): BusinessApiResponse<BusinessDraftSubmissionReceipt | null> => {
  const receipt = getDraftSubmissionReceipt(submissionId);
  return receipt
    ? businessApiResponse(receipt, { links: { self: submissionPath(submissionId, "/receipt") }, action: "CREATE_BUSINESS_REQUEST" })
    : businessApiResponse(null, {
      errors: [businessApiContractErrors.receiptNotFound(submissionId)],
      links: { self: submissionPath(submissionId, "/receipt") },
      action: "CREATE_BUSINESS_REQUEST"
    });
};

export const getBusinessDraftSubmissionHistory = (draftId: BusinessId): BusinessApiResponse<BusinessDraftSubmission> =>
  businessApiResponse(getBusinessDraftSubmission(draftId), {
    links: { self: draftSubmissionPath(draftId, "/submission-history") },
    action: "CREATE_BUSINESS_REQUEST"
  });

export const getBusinessSubmissionReviewQueueItem = (submissionId: BusinessId): BusinessApiResponse<BusinessReviewQueueItem | null> => {
  const queueItem = getSubmissionReviewQueueItem(submissionId);
  return queueItem
    ? businessApiResponse(queueItem, { links: { self: submissionPath(submissionId, "/review-queue-item") }, action: "CREATE_BUSINESS_REQUEST" })
    : businessApiResponse(null, {
      errors: [businessApiContractErrors.queueItemNotFound(submissionId)],
      links: { self: submissionPath(submissionId, "/review-queue-item") },
      action: "CREATE_BUSINESS_REQUEST"
    });
};
