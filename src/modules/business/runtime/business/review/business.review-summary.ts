import {
  BUSINESS_REVIEW_PRIORITIES,
  BUSINESS_REVIEW_QUEUE_STATUSES,
  BUSINESS_REVIEW_TYPES,
  type BusinessReviewQueueFilter,
  type BusinessReviewQueueSummary,
  type BusinessReviewQueueView
} from "./business.review-types.js";
import { getBusinessReviewQueue } from "./business.review-queue.js";

export const getBusinessReviewQueueSummary = (): BusinessReviewQueueSummary => {
  const items = getBusinessReviewQueue();
  const averageReadinessScore = items.length
    ? Math.round(items.reduce((total, item) => total + item.readinessScore, 0) / items.length)
    : 100;

  return {
    totalItems: items.length,
    readyForReview: items.filter((item) => item.blockers.length === 0 && item.readinessScore >= 60 && item.status !== "REVIEW_NOT_READY").length,
    blocked: items.filter((item) => item.status === "BLOCKED" || item.blockers.length > 0).length,
    governanceReview: items.filter((item) => item.requiredReviews.includes("GOVERNANCE_REVIEW")).length,
    treasuryReview: items.filter((item) => item.requiredReviews.includes("TREASURY_REVIEW")).length,
    acsReview: items.filter((item) => item.requiredReviews.includes("ACS_REVIEW")).length,
    identityReview: items.filter((item) => item.requiredReviews.includes("IDENTITY_REVIEW")).length,
    fundingReview: items.filter((item) => item.requiredReviews.includes("FUNDING_REVIEW") || item.requiredReviews.includes("DEBENTURE_REVIEW")).length,
    securityReview: items.filter((item) => item.requiredReviews.includes("SECURITY_REVIEW")).length,
    criticalPriority: items.filter((item) => item.priority === "CRITICAL").length,
    averageReadinessScore,
    mock: true,
    readOnly: true
  };
};

export const getBusinessReviewQueueView = (filter: BusinessReviewQueueFilter = {}): BusinessReviewQueueView => {
  const items = getBusinessReviewQueue().filter((item) => {
    if (filter.status && item.status !== filter.status) return false;
    if (filter.reviewType && !item.requiredReviews.includes(filter.reviewType)) return false;
    if (filter.priority && item.priority !== filter.priority) return false;
    return true;
  });

  return {
    summary: getBusinessReviewQueueSummary(),
    items,
    filters: {
      statuses: BUSINESS_REVIEW_QUEUE_STATUSES,
      reviewTypes: BUSINESS_REVIEW_TYPES,
      priorities: BUSINESS_REVIEW_PRIORITIES
    },
    mock: true,
    readOnly: true
  };
};
