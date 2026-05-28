import { businessRuntimeMock } from "../data/business.mock.js";
import type {
  BusinessDebentureAdapterContract,
  DebentureEligibility,
  DebentureFundingProgress,
  DebentureMaturityStatus,
  DebentureRepaymentStatus,
  DebentureRiskProfile,
  DebentureTermsSimulation
} from "../contracts/debenture.contract.js";
import { FundingType, RiskTier } from "../types/business.enums.js";
import type { BusinessId, DebentureRecord } from "../types/business.types.js";

const riskProfileFor = (projectId: BusinessId): DebentureRiskProfile | undefined => {
  const project = businessRuntimeMock.projects.find((record) => record.id === projectId);
  if (!project) return undefined;

  return {
    projectId,
    riskTier: project.riskTier,
    defaultRisk: project.riskTier === RiskTier.TIER_5_VENTURE_RISK ? "HIGH" : project.riskTier === RiskTier.TIER_4_EXPERIMENTAL ? "REVIEW_REQUIRED" : "MEDIUM"
  };
};

export const debentureAdapter = {
  mock: true,
  readOnly: true,

  getDebentureStatus(debentureId: BusinessId): DebentureRecord | undefined {
    return structuredClone(businessRuntimeMock.debentures.find((record) => record.id === debentureId));
  },

  getDebentureEligibility(projectId: BusinessId): DebentureEligibility {
    const funding = businessRuntimeMock.fundingRecords.find((record) => record.projectId === projectId);
    const eligible = funding?.fundingType === FundingType.DEBENTURE || funding?.debentureId !== undefined;
    return {
      projectId,
      eligible,
      reason: eligible ? "Project has mock debenture funding context." : "Project has no debenture funding context.",
      simulated: true
    };
  },

  getDebentureFundingProgress(debentureId: BusinessId): DebentureFundingProgress | undefined {
    const debenture = businessRuntimeMock.debentures.find((record) => record.id === debentureId);
    if (!debenture) return undefined;
    return {
      debentureId,
      targetAmount: debenture.targetAmount,
      raisedAmount: debenture.raisedAmount,
      percentRaised: debenture.targetAmount === 0 ? 0 : Math.round((debenture.raisedAmount / debenture.targetAmount) * 100),
      currency: debenture.currency
    };
  },

  getDebentureRepaymentStatus(debentureId: BusinessId): DebentureRepaymentStatus {
    const debenture = businessRuntimeMock.debentures.find((record) => record.id === debentureId);
    if (!debenture) return { debentureId, status: "UNKNOWN_DEBENTURE" };
    return { debentureId, status: debenture.raisedAmount > 0 ? "MOCK_REVENUE_PHASE" : "MOCK_NOT_STARTED" };
  },

  getDebentureMaturityStatus(debentureId: BusinessId): DebentureMaturityStatus {
    const debenture = businessRuntimeMock.debentures.find((record) => record.id === debentureId);
    if (!debenture) return { debentureId, status: "UNKNOWN_DEBENTURE" };
    return { debentureId, maturityDate: debenture.maturityDate, status: new Date(debenture.maturityDate).getTime() <= Date.now() ? "MATURED" : "PENDING" };
  },

  simulateDebentureTerms(projectId: BusinessId, amount: number, convertible: boolean): DebentureTermsSimulation {
    return {
      projectId,
      amount,
      convertible,
      aprModel: convertible ? "MOCK_CONVERTIBLE_REVENUE_SHARE" : "MOCK_FIXED_REVIEW_REQUIRED",
      simulated: true,
      executable: false
    };
  },

  canIssueDebenture(projectId: BusinessId): DebentureEligibility {
    const eligibility = this.getDebentureEligibility(projectId);
    return {
      ...eligibility,
      eligible: false,
      reason: "Debenture issuance is forbidden in current Business runtime even when eligibility context exists."
    };
  }
} satisfies BusinessDebentureAdapterContract;

export const getDebentureRiskProfile = riskProfileFor;
