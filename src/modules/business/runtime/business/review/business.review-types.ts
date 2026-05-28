import type { BusinessDraftReadinessReview, BusinessDraftType } from "../drafts/business.draft-types.js";
import type { RiskTier } from "../types/business.enums.js";
import type { BusinessId } from "../types/business.types.js";

export const BUSINESS_REVIEW_QUEUE_STATUSES = [
  "DRAFT_CREATED",
  "READY_FOR_REVIEW",
  "BLOCKED",
  "NEEDS_GOVERNANCE_REVIEW",
  "NEEDS_TREASURY_REVIEW",
  "NEEDS_ACS_REVIEW",
  "NEEDS_IDENTITY_REVIEW",
  "NEEDS_FUNDING_REVIEW",
  "NEEDS_SECURITY_REVIEW",
  "REVIEW_PREPARED",
  "REVIEW_NOT_READY",
  "ARCHIVED"
] as const;

export type BusinessReviewQueueStatus = (typeof BUSINESS_REVIEW_QUEUE_STATUSES)[number];

export const BUSINESS_REVIEW_TYPES = [
  "STRUCTURAL_REVIEW",
  "GOVERNANCE_REVIEW",
  "TREASURY_REVIEW",
  "ACS_REVIEW",
  "IDENTITY_REVIEW",
  "FUNDING_REVIEW",
  "DEBENTURE_REVIEW",
  "SECURITY_REVIEW",
  "TELEMETRY_REVIEW",
  "OPERATIONAL_REVIEW"
] as const;

export type BusinessReviewType = (typeof BUSINESS_REVIEW_TYPES)[number];

export const BUSINESS_REVIEW_PRIORITIES = ["LOW", "NORMAL", "HIGH", "CRITICAL"] as const;

export type BusinessReviewPriority = (typeof BUSINESS_REVIEW_PRIORITIES)[number];

export interface BusinessReviewAssignment {
  assignmentId: BusinessId;
  reviewType: BusinessReviewType;
  assigneeRole: string;
  status: "UNASSIGNED_MOCK" | "PREPARED_MOCK";
  mock: true;
  readOnly: true;
}

export interface BusinessReviewBlocker {
  blockerId: BusinessId;
  reviewType: BusinessReviewType;
  message: string;
  severity: "WARNING" | "ERROR" | "CRITICAL";
  blocking: boolean;
  mock: true;
  readOnly: true;
}

export interface BusinessReviewQueueItem {
  queueItemId: BusinessId;
  draftId: BusinessId;
  draftType: BusinessDraftType;
  title: string;
  requesterId: BusinessId;
  status: BusinessReviewQueueStatus;
  priority: BusinessReviewPriority;
  requiredReviews: BusinessReviewType[];
  assignments: BusinessReviewAssignment[];
  readinessScore: number;
  blockers: BusinessReviewBlocker[];
  warnings: string[];
  riskTier: RiskTier;
  governanceRequired: boolean;
  treasuryRequired: boolean;
  acsRequired: boolean;
  identityRequired: boolean;
  fundingRequired: boolean;
  nextRecommendedStep: string;
  readinessReview: BusinessDraftReadinessReview;
  createdAt: string;
  updatedAt: string;
  mock: true;
  readOnly: true;
}

export interface BusinessReviewQueueSummary {
  totalItems: number;
  readyForReview: number;
  blocked: number;
  governanceReview: number;
  treasuryReview: number;
  acsReview: number;
  identityReview: number;
  fundingReview: number;
  securityReview: number;
  criticalPriority: number;
  averageReadinessScore: number;
  mock: true;
  readOnly: true;
}

export interface BusinessReviewQueueFilter {
  status?: BusinessReviewQueueStatus;
  reviewType?: BusinessReviewType;
  priority?: BusinessReviewPriority;
}

export interface BusinessReviewQueueView {
  summary: BusinessReviewQueueSummary;
  items: BusinessReviewQueueItem[];
  filters: {
    statuses: readonly BusinessReviewQueueStatus[];
    reviewTypes: readonly BusinessReviewType[];
    priorities: readonly BusinessReviewPriority[];
  };
  mock: true;
  readOnly: true;
}
