import { businessRuntimeMock } from "../data/business.mock.js";
import type {
  BillingStatus,
  BusinessFinancialAdapterContract,
  FinancialEligibility,
  OperationalCostProfile,
  SettlementStatus
} from "../contracts/financial.contract.js";
import { FundingType } from "../types/business.enums.js";
import type { BusinessId, DebentureRecord, FundingRecord, RevenueRecord, TreasuryExposure } from "../types/business.types.js";

export const financialAdapter = {
  mock: true,
  readOnly: true,

  getTreasuryExposure(projectId: BusinessId): TreasuryExposure[] {
    return structuredClone(businessRuntimeMock.treasuryExposures.filter((record) => record.projectId === projectId));
  },

  getFundingStatus(projectId: BusinessId): FundingRecord | undefined {
    return structuredClone(businessRuntimeMock.fundingRecords.find((record) => record.projectId === projectId));
  },

  getDebentureStatus(debentureId: BusinessId): DebentureRecord | undefined {
    return structuredClone(businessRuntimeMock.debentures.find((record) => record.id === debentureId));
  },

  getRevenueRouting(assetId: BusinessId): RevenueRecord[] {
    return structuredClone(businessRuntimeMock.revenueRecords.filter((record) => record.assetId === assetId));
  },

  getSettlementStatus(recordId: BusinessId): SettlementStatus {
    return businessRuntimeMock.revenueRecords.some((record) => record.id === recordId) ? "MOCK_SETTLEMENT_VISIBLE" : "UNKNOWN_RECORD";
  },

  getBillingStatus(projectId: BusinessId): BillingStatus {
    return businessRuntimeMock.projects.some((record) => record.id === projectId) ? "MOCK_BILLING_VISIBLE" : "UNKNOWN_PROJECT";
  },

  getOperationalCostProfile(projectId: BusinessId): OperationalCostProfile | undefined {
    const funding = businessRuntimeMock.fundingRecords.find((record) => record.projectId === projectId);
    if (!funding) return undefined;

    return {
      projectId,
      monthlyBudget: Math.round(funding.targetAmount / 12),
      currency: funding.currency,
      simulated: true
    };
  },

  validateFundingModel(projectId: BusinessId, fundingType: FundingType): FinancialEligibility {
    const project = businessRuntimeMock.projects.find((record) => record.id === projectId);
    const funding = businessRuntimeMock.fundingRecords.find((record) => record.projectId === projectId);
    const eligible = Boolean(project && (!funding || funding.fundingType === fundingType || fundingType === FundingType.HYBRID));

    return {
      projectId,
      instrumentType: fundingType,
      eligible,
      reason: eligible ? "Funding model is compatible in mock validation." : "Funding model requires review or project was not found.",
      simulated: true
    };
  },

  canUseFinancialInstrument(projectId: BusinessId, instrumentType: string): FinancialEligibility {
    const project = businessRuntimeMock.projects.find((record) => record.id === projectId);
    return {
      projectId,
      instrumentType,
      eligible: Boolean(project),
      reason: project ? "Financial instrument can be prepared for review only." : "Project was not found.",
      simulated: true
    };
  }
} satisfies BusinessFinancialAdapterContract & {
  getTreasuryExposure(projectId: BusinessId): TreasuryExposure[];
  getDebentureStatus(debentureId: BusinessId): DebentureRecord | undefined;
};

export const getTreasuryExposure = financialAdapter.getTreasuryExposure;
export const getFundingStatus = financialAdapter.getFundingStatus;
export const getDebentureStatus = financialAdapter.getDebentureStatus;
export const getRevenueRouting = financialAdapter.getRevenueRouting;
export const getSettlementStatus = financialAdapter.getSettlementStatus;
export const getBillingStatus = financialAdapter.getBillingStatus;
export const getOperationalCostProfile = financialAdapter.getOperationalCostProfile;
export const validateFundingModel = financialAdapter.validateFundingModel;
export const canUseFinancialInstrument = financialAdapter.canUseFinancialInstrument;
