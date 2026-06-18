import { getDraftStoreRecordById } from "../drafts/business.draft-store.js";
import { getBusinessDraftReadinessReview } from "../drafts/business.draft-readiness.js";
import { createReviewQueueItemFromDraft } from "../review/business.review-queue.js";
import type { BusinessId } from "../types/business.types.js";
import type {
  BusinessDraftSubmissionError,
  BusinessDraftSubmissionValidation
} from "./business.submission-types.js";

export const BUSINESS_DRAFT_SUBMISSION_MINIMUM_READINESS_SCORE = 60;

const error = (
  code: string,
  message: string,
  severity: BusinessDraftSubmissionError["severity"] = "ERROR",
  details?: BusinessDraftSubmissionError["details"]
): BusinessDraftSubmissionError => ({
  code,
  message,
  severity,
  blocking: true,
  details
});

export const validateDraftSubmissionReadiness = (draftId: BusinessId): BusinessDraftSubmissionValidation => {
  const record = getDraftStoreRecordById(draftId);
  const errors: BusinessDraftSubmissionError[] = [];

  if (!record || record.status === "DISCARDED") {
    return {
      draftId,
      canSubmit: false,
      status: "SUBMISSION_BLOCKED",
      errors: [error("DRAFT_NOT_FOUND", "Draft does not exist in the local/mock draft store.")],
      warnings: [],
      mock: true,
      readOnly: true,
      simulationOnly: true
    };
  }

  const readinessReview = getBusinessDraftReadinessReview(draftId);
  const reviewQueueItem = createReviewQueueItemFromDraft(draftId);

  if (!readinessReview || !reviewQueueItem) {
    errors.push(error("READINESS_UNAVAILABLE", "Draft readiness or review queue projection is unavailable."));
  } else {
    if (!readinessReview.validation.valid) {
      errors.push(error("STRUCTURAL_VALIDATION_FAILED", "Draft is structurally invalid and cannot be simulated for review.", "ERROR", {
        missingFields: readinessReview.validation.missingFields
      }));
    }

    if (readinessReview.readinessScore < BUSINESS_DRAFT_SUBMISSION_MINIMUM_READINESS_SCORE) {
      errors.push(error("READINESS_SCORE_TOO_LOW", "Draft readiness score is below the simulation threshold.", "ERROR", {
        readinessScore: readinessReview.readinessScore,
        minimumReadinessScore: BUSINESS_DRAFT_SUBMISSION_MINIMUM_READINESS_SCORE
      }));
    }

    if (readinessReview.blockers.length > 0 || reviewQueueItem.blockers.some((blocker) => blocker.severity === "CRITICAL")) {
      errors.push(error("BLOCKERS_PRESENT", "Draft has blocking readiness issues that must be resolved before simulation.", "ERROR", {
        blockers: readinessReview.blockers
      }));
    }

    if (readinessReview.runtimeReview.executionReview.policy.mode === "FORBIDDEN_IN_CURRENT_RUNTIME") {
      errors.push(error("EXECUTION_POLICY_FORBIDDEN", "Draft execution policy is forbidden in the current runtime.", "CRITICAL"));
    }

    if (!readinessReview.runtimeReview.permissionReview.decision.allowed) {
      errors.push(error("PERMISSION_DENIED", readinessReview.runtimeReview.permissionReview.decision.reason, "ERROR"));
    }

    const realExecutionIssue = readinessReview.validation.issues.find((issue) => issue.code === "REAL_EXECUTION_LANGUAGE");
    if (realExecutionIssue) {
      errors.push(error("REAL_EXECUTION_LANGUAGE", realExecutionIssue.message, "CRITICAL"));
    }

    const unsupportedReviews = readinessReview.requiredReviews.filter((review) => review === "PERMISSION_REVIEW");
    if (unsupportedReviews.length > 0 && !reviewQueueItem.requiredReviews.includes("IDENTITY_REVIEW")) {
      errors.push(error("REQUIRED_REVIEW_NOT_MODELED", "Draft requires a review type not modeled by the review queue.", "ERROR", {
        unsupportedReviews
      }));
    }
  }

  const canSubmit = errors.length === 0;

  return {
    draftId,
    canSubmit,
    status: canSubmit ? "SUBMISSION_READY" : "SUBMISSION_BLOCKED",
    errors,
    warnings: readinessReview?.warnings ?? [],
    readinessReview,
    reviewQueueItem,
    mock: true,
    readOnly: true,
    simulationOnly: true
  };
};

export const canSimulateDraftSubmission = (draftId: BusinessId): boolean =>
  validateDraftSubmissionReadiness(draftId).canSubmit;
