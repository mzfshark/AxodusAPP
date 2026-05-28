import type { BusinessReviewPriority, BusinessReviewQueueStatus, BusinessReviewType } from "./business.review-types.js";
import { getBusinessReviewQueue } from "./business.review-queue.js";

export const getReviewQueueItemsByStatus = (status: BusinessReviewQueueStatus) =>
  getBusinessReviewQueue().filter((item) => item.status === status);

export const getReviewQueueItemsByReviewType = (reviewType: BusinessReviewType) =>
  getBusinessReviewQueue().filter((item) => item.requiredReviews.includes(reviewType));

export const getReviewQueueItemsByPriority = (priority: BusinessReviewPriority) =>
  getBusinessReviewQueue().filter((item) => item.priority === priority);

export const getBlockedReviewQueueItems = () =>
  getBusinessReviewQueue().filter((item) => item.status === "BLOCKED" || item.blockers.length > 0);

export const getReadyForReviewQueueItems = () =>
  getBusinessReviewQueue().filter((item) => item.blockers.length === 0 && item.readinessScore >= 60 && item.status !== "REVIEW_NOT_READY");
