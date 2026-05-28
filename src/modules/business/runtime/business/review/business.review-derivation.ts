import type { BusinessDraft, BusinessDraftReadinessReview } from "../drafts/business.draft-types.js";
import { RiskTier } from "../types/business.enums.js";
import type {
  BusinessReviewBlocker,
  BusinessReviewPriority,
  BusinessReviewQueueStatus,
  BusinessReviewType
} from "./business.review-types.js";

const unique = <T>(items: T[]): T[] => [...new Set(items)];

export const deriveReviewPriorityFromRiskTier = (riskTier: RiskTier): BusinessReviewPriority => {
  if (riskTier === RiskTier.TIER_1_CRITICAL_INFRASTRUCTURE) return "CRITICAL";
  if (riskTier === RiskTier.TIER_2_ECOSYSTEM_STRATEGIC || riskTier === RiskTier.TIER_3_REVENUE_GENERATING) return "HIGH";
  if (riskTier === RiskTier.TIER_5_VENTURE_RISK) return "HIGH";
  return "NORMAL";
};

export const deriveRequiredReviewTypesFromDraft = (draft: BusinessDraft, readinessReview?: BusinessDraftReadinessReview): BusinessReviewType[] => {
  const runtimeReview = readinessReview?.runtimeReview;
  const validation = readinessReview?.validation;
  const reviews: BusinessReviewType[] = [];

  if (!validation?.valid) reviews.push("STRUCTURAL_REVIEW");
  if (runtimeReview?.governanceRequirement || readinessReview?.requiredReviews.includes("GOVERNANCE_REVIEW")) reviews.push("GOVERNANCE_REVIEW");
  if (runtimeReview?.treasuryRequirement || readinessReview?.requiredReviews.includes("TREASURY_REVIEW")) reviews.push("TREASURY_REVIEW");
  if (runtimeReview?.acsRequirement || readinessReview?.requiredReviews.includes("ACS_REVIEW")) reviews.push("ACS_REVIEW");
  if (readinessReview?.requiredReviews.includes("PERMISSION_REVIEW")) reviews.push("IDENTITY_REVIEW");
  if (readinessReview?.requiredReviews.includes("HUMAN_REVIEW")) reviews.push("OPERATIONAL_REVIEW");
  if (runtimeReview?.telemetryRequirement || readinessReview?.requiredReviews.includes("TELEMETRY_REVIEW")) reviews.push("TELEMETRY_REVIEW");

  if (draft.draftType === "DEBENTURE_FUNDING_REQUEST") reviews.push("DEBENTURE_REVIEW", "FUNDING_REVIEW");
  if (draft.draftType === "TREASURY_SPONSORSHIP_REQUEST") reviews.push("FUNDING_REVIEW");
  if (readinessReview?.categories.find((entry) => entry.category === "SECURITY_READINESS" && (!entry.ready || entry.blockers.length > 0))) {
    reviews.push("SECURITY_REVIEW");
  }

  return unique(reviews.length ? reviews : ["OPERATIONAL_REVIEW"]);
};

export const deriveReviewQueueStatusFromReadiness = (readinessReview: BusinessDraftReadinessReview): BusinessReviewQueueStatus => {
  if (readinessReview.blockers.length > 0) return "BLOCKED";
  if (!readinessReview.validation.valid || readinessReview.readinessScore < 60) return "REVIEW_NOT_READY";

  const requiredReviews = deriveRequiredReviewTypesFromDraft(
    {
      draftType: readinessReview.draftType,
      values: {},
      mock: true,
      readOnly: true
    },
    readinessReview
  );

  if (requiredReviews.includes("ACS_REVIEW")) return "NEEDS_ACS_REVIEW";
  if (requiredReviews.includes("SECURITY_REVIEW")) return "NEEDS_SECURITY_REVIEW";
  if (requiredReviews.includes("TREASURY_REVIEW")) return "NEEDS_TREASURY_REVIEW";
  if (requiredReviews.includes("FUNDING_REVIEW") || requiredReviews.includes("DEBENTURE_REVIEW")) return "NEEDS_FUNDING_REVIEW";
  if (requiredReviews.includes("GOVERNANCE_REVIEW")) return "NEEDS_GOVERNANCE_REVIEW";
  if (requiredReviews.includes("IDENTITY_REVIEW")) return "NEEDS_IDENTITY_REVIEW";

  return readinessReview.readinessScore >= 80 ? "READY_FOR_REVIEW" : "REVIEW_PREPARED";
};

export const deriveReviewBlockers = (readinessReview: BusinessDraftReadinessReview, requiredReviews: BusinessReviewType[]): BusinessReviewBlocker[] =>
  readinessReview.blockers.map((message, index) => {
    const reviewType = requiredReviews.find((type) => message.toLowerCase().includes(type.split("_")[0].toLowerCase())) ?? "STRUCTURAL_REVIEW";
    const severity = readinessReview.categories.some((entry) => entry.category === "SECURITY_READINESS" && entry.blockers.includes(message))
      ? "CRITICAL"
      : "ERROR";

    return {
      blockerId: `${readinessReview.draftId}-blocker-${index + 1}`,
      reviewType,
      message,
      severity,
      blocking: true,
      mock: true,
      readOnly: true
    };
  });

export const deriveReviewPriority = (
  riskTier: RiskTier,
  draft: BusinessDraft,
  blockers: BusinessReviewBlocker[],
  requiredReviews: BusinessReviewType[]
): BusinessReviewPriority => {
  if (blockers.some((blocker) => blocker.reviewType === "SECURITY_REVIEW" || blocker.severity === "CRITICAL")) return "CRITICAL";
  if (draft.draftType === "DEBENTURE_FUNDING_REQUEST") return "HIGH";
  if (draft.draftType === "ACS_SERVICE_REQUEST" && requiredReviews.includes("ACS_REVIEW")) return "HIGH";
  return deriveReviewPriorityFromRiskTier(riskTier);
};
