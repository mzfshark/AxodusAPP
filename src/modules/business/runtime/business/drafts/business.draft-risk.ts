import { RiskTier } from "../types/business.enums.js";
import type { BusinessDraft, BusinessDraftRiskReview } from "./business.draft-types.js";

export const inferBusinessDraftRiskTier = (draft: BusinessDraft): RiskTier => {
  const explicitRisk = draft.values.riskTier;
  if (typeof explicitRisk === "string" && Object.values(RiskTier).includes(explicitRisk as RiskTier)) {
    return explicitRisk as RiskTier;
  }

  const amount = Number(draft.values.requestedAmount ?? draft.values.targetAmount ?? draft.values.estimatedBudget ?? 0);
  if (draft.draftType === "ACS_SERVICE_REQUEST") return RiskTier.TIER_1_CRITICAL_INFRASTRUCTURE;
  if (draft.draftType === "TREASURY_SPONSORSHIP_REQUEST" || amount >= 500000) return RiskTier.TIER_2_ECOSYSTEM_STRATEGIC;
  if (draft.draftType === "DEBENTURE_FUNDING_REQUEST" || draft.draftType === "DAO_PLUGIN_REQUEST") return RiskTier.TIER_3_REVENUE_GENERATING;
  if (draft.draftType === "ECOSYSTEM_INFRASTRUCTURE_REQUEST") return RiskTier.TIER_2_ECOSYSTEM_STRATEGIC;
  return RiskTier.TIER_4_EXPERIMENTAL;
};

export const getBusinessDraftRiskReview = (draft: BusinessDraft): BusinessDraftRiskReview => {
  const inferredRiskTier = inferBusinessDraftRiskTier(draft);
  return {
    inferredRiskTier,
    reason: `Risk inferred from draft type ${draft.draftType}, explicit risk tier and requested amount.`,
    mock: true,
    readOnly: true
  };
};
