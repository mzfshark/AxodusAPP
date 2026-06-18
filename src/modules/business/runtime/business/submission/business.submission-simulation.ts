import { getBusinessDraftRequiredCapabilities } from "../drafts/business.draft-capabilities.js";
import { getDraftStoreRecordById } from "../drafts/business.draft-store.js";
import type { BusinessDraftType } from "../drafts/business.draft-types.js";
import { createReviewQueueItemFromDraft, getBusinessReviewQueueItem } from "../review/business.review-queue.js";
import type { BusinessId } from "../types/business.types.js";
import {
  nextSubmissionId,
  storeDraftSubmissionReceipt
} from "./business.submission-receipts.js";
import type {
  BusinessDraftSubmissionReceipt,
  BusinessDraftSubmissionResult,
  BusinessDraftSubmissionType
} from "./business.submission-types.js";
import { validateDraftSubmissionReadiness } from "./business.submission-validation.js";

export const BUSINESS_SUBMISSION_NON_EXECUTION_GUARANTEE =
  "Simulation only: no backend mutation, governance proposal, treasury movement, debenture issuance, revenue distribution, ACS/MCP provisioning, billing, KYC, wallet signing or contract call is executed.";

const submissionTypeByDraftType: Record<BusinessDraftType, BusinessDraftSubmissionType> = {
  GENERAL_BUSINESS_REQUEST: "GENERAL_BUSINESS_SUBMISSION",
  DAO_PLUGIN_REQUEST: "DAO_PLUGIN_SUBMISSION",
  ACS_SERVICE_REQUEST: "ACS_SERVICE_SUBMISSION",
  TREASURY_SPONSORSHIP_REQUEST: "TREASURY_SPONSORSHIP_SUBMISSION",
  DEBENTURE_FUNDING_REQUEST: "DEBENTURE_FUNDING_SUBMISSION",
  ECOSYSTEM_INFRASTRUCTURE_REQUEST: "ECOSYSTEM_INFRASTRUCTURE_SUBMISSION",
  PRIVATE_DEVELOPMENT_REQUEST: "PRIVATE_DEVELOPMENT_SUBMISSION"
};

const submittedByFor = (draftId: BusinessId): BusinessId => {
  const record = getDraftStoreRecordById(draftId);
  if (!record) return "id-axodus-core";
  if (record.draft.draftType === "DAO_PLUGIN_REQUEST") {
    return String(record.draft.values.daoIdentity ?? record.draft.requesterIdentityId ?? "id-axodus-core");
  }
  return record.draft.requesterIdentityId ?? String(record.draft.values.requesterIdentity ?? record.draft.values.daoIdentity ?? "id-axodus-core");
};

export const createDraftSubmissionReceipt = (draftId: BusinessId): BusinessDraftSubmissionReceipt | undefined => {
  const validation = validateDraftSubmissionReadiness(draftId);
  if (!validation.canSubmit || !validation.readinessReview) return undefined;

  const record = getDraftStoreRecordById(draftId);
  const reviewQueueItem = validation.reviewQueueItem ?? createReviewQueueItemFromDraft(draftId);
  if (!record || !reviewQueueItem) return undefined;

  const runtimeReview = validation.readinessReview.runtimeReview;
  const receipt: BusinessDraftSubmissionReceipt = {
    submissionId: nextSubmissionId(),
    draftId,
    draftType: record.draft.draftType,
    submissionType: submissionTypeByDraftType[record.draft.draftType],
    submissionStatus: "QUEUED_FOR_REVIEW",
    readinessScore: validation.readinessReview.readinessScore,
    requiredReviews: reviewQueueItem.requiredReviews,
    blockers: reviewQueueItem.blockers,
    warnings: validation.warnings,
    executionPolicy: runtimeReview.executionReview.policy,
    permissionDecision: runtimeReview.permissionReview.decision,
    capabilityRequirements: getBusinessDraftRequiredCapabilities(record.draft),
    reviewQueueItemId: reviewQueueItem.queueItemId,
    createdAt: new Date().toISOString(),
    submittedBy: submittedByFor(draftId),
    mock: true,
    readOnly: true,
    simulationOnly: true,
    nonExecutionGuarantee: BUSINESS_SUBMISSION_NON_EXECUTION_GUARANTEE
  };

  return storeDraftSubmissionReceipt(receipt);
};

export const simulateBusinessDraftSubmission = (draftId: BusinessId): BusinessDraftSubmissionResult => {
  const validation = validateDraftSubmissionReadiness(draftId);

  if (!validation.canSubmit) {
    return {
      success: false,
      status: "SIMULATION_REJECTED",
      validation,
      errors: validation.errors,
      mock: true,
      readOnly: true,
      simulationOnly: true,
      nonExecutionGuarantee: BUSINESS_SUBMISSION_NON_EXECUTION_GUARANTEE
    };
  }

  const receipt = createDraftSubmissionReceipt(draftId);
  const reviewQueueItem = receipt ? getBusinessReviewQueueItem(receipt.reviewQueueItemId) : undefined;

  return {
    success: Boolean(receipt && reviewQueueItem),
    status: receipt ? "QUEUED_FOR_REVIEW" : "SIMULATION_REJECTED",
    receipt,
    reviewQueueItem,
    validation,
    errors: receipt ? [] : [{
      code: "RECEIPT_CREATION_FAILED",
      message: "Submission receipt could not be created in the local/mock runtime.",
      severity: "ERROR",
      blocking: true
    }],
    mock: true,
    readOnly: true,
    simulationOnly: true,
    nonExecutionGuarantee: BUSINESS_SUBMISSION_NON_EXECUTION_GUARANTEE
  };
};

export { submissionTypeByDraftType };
