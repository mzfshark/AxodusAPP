import { getBusinessReviewQueue as listReviewQueueItems, getBusinessReviewQueueItem } from "../review/business.review-queue.js";
import {
  getBlockedReviewQueueItems as listBlockedReviewQueueItems,
  getReadyForReviewQueueItems as listReadyForReviewQueueItems,
  getReviewQueueItemsByPriority,
  getReviewQueueItemsByReviewType,
  getReviewQueueItemsByStatus
} from "../review/business.review-selectors.js";
import { getBusinessReviewQueueSummary as createReviewQueueSummary } from "../review/business.review-summary.js";
import type { BusinessReviewPriority, BusinessReviewQueueItem, BusinessReviewQueueStatus, BusinessReviewType } from "../review/business.review-types.js";
import type { BusinessId } from "../types/business.types.js";
import { businessApiContractErrors } from "./business.api-errors.js";
import { businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse } from "./business.response.types.js";

const queuePath = (suffix = ""): string => `/api/v1/business/review-queue${suffix}`;

const listResponse = (items: BusinessReviewQueueItem[], self: string): BusinessApiResponse<BusinessReviewQueueItem[]> =>
  businessApiResponse(items, {
    links: { self },
    errors: items.length === 0 ? [businessApiContractErrors.reviewQueueEmpty()] : [],
    action: "CREATE_BUSINESS_REQUEST"
  });

export const getBusinessReviewQueue = (): BusinessApiResponse<BusinessReviewQueueItem[]> =>
  listResponse(listReviewQueueItems(), queuePath());

export const getBusinessReviewQueueSummary = () =>
  businessApiResponse(createReviewQueueSummary(), {
    links: { self: queuePath("/summary") },
    action: "CREATE_BUSINESS_REQUEST"
  });

export const getReadyForReviewQueueItems = (): BusinessApiResponse<BusinessReviewQueueItem[]> =>
  listResponse(listReadyForReviewQueueItems(), queuePath("/ready"));

export const getBlockedReviewQueueItems = (): BusinessApiResponse<BusinessReviewQueueItem[]> =>
  listResponse(listBlockedReviewQueueItems(), queuePath("/blocked"));

export const getReviewQueueItemsByStatusHandler = (status: BusinessReviewQueueStatus): BusinessApiResponse<BusinessReviewQueueItem[]> =>
  listResponse(getReviewQueueItemsByStatus(status), queuePath(`/status/${status}`));

export const getReviewQueueItemsByReviewTypeHandler = (reviewType: BusinessReviewType): BusinessApiResponse<BusinessReviewQueueItem[]> =>
  listResponse(getReviewQueueItemsByReviewType(reviewType), queuePath(`/review-type/${reviewType}`));

export const getReviewQueueItemsByPriorityHandler = (priority: BusinessReviewPriority): BusinessApiResponse<BusinessReviewQueueItem[]> =>
  listResponse(getReviewQueueItemsByPriority(priority), queuePath(`/priority/${priority}`));

export const getBusinessReviewQueueItemById = (queueItemId: BusinessId): BusinessApiResponse<BusinessReviewQueueItem | null> => {
  const item = getBusinessReviewQueueItem(queueItemId);
  return item
    ? businessApiResponse(item, { links: { self: queuePath(`/${queueItemId}`) }, action: "CREATE_BUSINESS_REQUEST" })
    : businessApiResponse(null, {
      errors: [businessApiContractErrors.queueItemNotFound(queueItemId)],
      links: { self: queuePath(`/${queueItemId}`) },
      action: "CREATE_BUSINESS_REQUEST"
    });
};
