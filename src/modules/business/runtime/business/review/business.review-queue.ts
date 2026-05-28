import { getBusinessDraftReadinessReview } from "../drafts/business.draft-readiness.js";
import { getDraftStoreRecordById, listDraftStoreRecords } from "../drafts/business.draft-store.js";
import { inferBusinessDraftRiskTier } from "../drafts/business.draft-risk.js";
import type { BusinessDraftStoreRecord } from "../drafts/business.draft-types.js";
import type { BusinessId } from "../types/business.types.js";
import {
  deriveRequiredReviewTypesFromDraft,
  deriveReviewBlockers,
  deriveReviewPriority,
  deriveReviewQueueStatusFromReadiness
} from "./business.review-derivation.js";
import type {
  BusinessReviewAssignment,
  BusinessReviewQueueItem,
  BusinessReviewType
} from "./business.review-types.js";

const resolveRequesterId = (record: BusinessDraftStoreRecord): BusinessId =>
  record.draft.draftType === "DAO_PLUGIN_REQUEST"
    ? String(record.draft.values.daoIdentity ?? record.draft.requesterIdentityId ?? "id-axodus-core")
    : record.draft.requesterIdentityId ?? String(record.draft.values.requesterIdentity ?? record.draft.values.daoIdentity ?? "id-axodus-core");

const createAssignments = (queueItemId: BusinessId, requiredReviews: BusinessReviewType[]): BusinessReviewAssignment[] =>
  requiredReviews.map((reviewType) => ({
    assignmentId: `${queueItemId}-${reviewType.toLowerCase()}`,
    reviewType,
    assigneeRole: reviewType.replace("_REVIEW", "").replaceAll("_", " "),
    status: "UNASSIGNED_MOCK",
    mock: true,
    readOnly: true
  }));

const createQueueItemFromRecord = (record: BusinessDraftStoreRecord): BusinessReviewQueueItem | undefined => {
  if (record.status === "DISCARDED") return undefined;

  const readinessReview = getBusinessDraftReadinessReview(record.id);
  if (!readinessReview) return undefined;

  const riskTier = inferBusinessDraftRiskTier(record.draft);
  const requiredReviews = deriveRequiredReviewTypesFromDraft(record.draft, readinessReview);
  const blockers = deriveReviewBlockers(readinessReview, requiredReviews);
  const queueItemId = `review-${record.id}`;
  const runtimeReview = readinessReview.runtimeReview;

  return {
    queueItemId,
    draftId: record.id,
    draftType: record.draft.draftType,
    title: record.title,
    requesterId: resolveRequesterId(record),
    status: deriveReviewQueueStatusFromReadiness(readinessReview),
    priority: deriveReviewPriority(riskTier, record.draft, blockers, requiredReviews),
    requiredReviews,
    assignments: createAssignments(queueItemId, requiredReviews),
    readinessScore: readinessReview.readinessScore,
    blockers,
    warnings: readinessReview.warnings,
    riskTier,
    governanceRequired: runtimeReview.governanceRequirement,
    treasuryRequired: runtimeReview.treasuryRequirement,
    acsRequired: runtimeReview.acsRequirement,
    identityRequired: requiredReviews.includes("IDENTITY_REVIEW"),
    fundingRequired: requiredReviews.includes("FUNDING_REVIEW") || requiredReviews.includes("DEBENTURE_REVIEW"),
    nextRecommendedStep: readinessReview.nextRecommendedStep,
    readinessReview,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    mock: true,
    readOnly: true
  };
};

export const createReviewQueueItemFromDraft = (draftId: BusinessId): BusinessReviewQueueItem | undefined => {
  const record = getDraftStoreRecordById(draftId);
  if (!record) return undefined;
  return createQueueItemFromRecord(record);
};

export const getBusinessReviewQueue = (): BusinessReviewQueueItem[] =>
  listDraftStoreRecords()
    .map(createQueueItemFromRecord)
    .filter((item): item is BusinessReviewQueueItem => Boolean(item))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

export const getBusinessReviewQueueItem = (queueItemId: BusinessId): BusinessReviewQueueItem | undefined =>
  getBusinessReviewQueue().find((item) => item.queueItemId === queueItemId || item.draftId === queueItemId);
