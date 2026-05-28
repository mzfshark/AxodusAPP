import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { BusinessDraftReadinessReview, BusinessDraftType } from "../drafts/business.draft-types.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy } from "../policies/business.execution-policy.js";
import type { BusinessReviewBlocker, BusinessReviewQueueItem, BusinessReviewType } from "../review/business.review-types.js";
import type { BusinessId } from "../types/business.types.js";

export const BUSINESS_DRAFT_SUBMISSION_STATUSES = [
  "NOT_SUBMITTED",
  "SUBMISSION_READY",
  "SUBMISSION_BLOCKED",
  "SIMULATION_PENDING",
  "SIMULATED_SUBMISSION_CREATED",
  "QUEUED_FOR_REVIEW",
  "SIMULATION_REJECTED",
  "ARCHIVED"
] as const;

export type BusinessDraftSubmissionStatus = (typeof BUSINESS_DRAFT_SUBMISSION_STATUSES)[number];

export const BUSINESS_DRAFT_SUBMISSION_TYPES = [
  "GENERAL_BUSINESS_SUBMISSION",
  "DAO_PLUGIN_SUBMISSION",
  "ACS_SERVICE_SUBMISSION",
  "TREASURY_SPONSORSHIP_SUBMISSION",
  "DEBENTURE_FUNDING_SUBMISSION",
  "ECOSYSTEM_INFRASTRUCTURE_SUBMISSION",
  "PRIVATE_DEVELOPMENT_SUBMISSION"
] as const;

export type BusinessDraftSubmissionType = (typeof BUSINESS_DRAFT_SUBMISSION_TYPES)[number];

export interface BusinessDraftSubmissionError {
  code: string;
  message: string;
  severity: "WARNING" | "ERROR" | "CRITICAL";
  blocking: boolean;
  details?: Record<string, string | number | boolean | string[]>;
}

export interface BusinessDraftSubmissionValidation {
  draftId: BusinessId;
  canSubmit: boolean;
  status: BusinessDraftSubmissionStatus;
  errors: BusinessDraftSubmissionError[];
  warnings: string[];
  readinessReview?: BusinessDraftReadinessReview;
  reviewQueueItem?: BusinessReviewQueueItem;
  mock: true;
  readOnly: true;
  simulationOnly: true;
}

export interface BusinessDraftSubmissionContext {
  draftId: BusinessId;
  submittedBy: BusinessId;
  minimumReadinessScore: number;
  mock: true;
  readOnly: true;
  simulationOnly: true;
}

export interface BusinessDraftSubmissionReceipt {
  submissionId: BusinessId;
  draftId: BusinessId;
  draftType: BusinessDraftType;
  submissionType: BusinessDraftSubmissionType;
  submissionStatus: BusinessDraftSubmissionStatus;
  readinessScore: number;
  requiredReviews: BusinessReviewType[];
  blockers: BusinessReviewBlocker[];
  warnings: string[];
  executionPolicy: BusinessExecutionPolicy;
  permissionDecision: BusinessPermissionDecision;
  capabilityRequirements: BusinessCapability[];
  reviewQueueItemId: BusinessId;
  createdAt: string;
  submittedBy: BusinessId;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  nonExecutionGuarantee: string;
}

export interface BusinessDraftSubmission {
  draftId: BusinessId;
  status: BusinessDraftSubmissionStatus;
  latestReceipt?: BusinessDraftSubmissionReceipt;
  history: BusinessDraftSubmissionReceipt[];
  validation: BusinessDraftSubmissionValidation;
  mock: true;
  readOnly: true;
  simulationOnly: true;
}

export interface BusinessDraftSubmissionResult {
  success: boolean;
  status: BusinessDraftSubmissionStatus;
  receipt?: BusinessDraftSubmissionReceipt;
  reviewQueueItem?: BusinessReviewQueueItem;
  validation: BusinessDraftSubmissionValidation;
  errors: BusinessDraftSubmissionError[];
  mock: true;
  readOnly: true;
  simulationOnly: true;
  nonExecutionGuarantee: string;
}
