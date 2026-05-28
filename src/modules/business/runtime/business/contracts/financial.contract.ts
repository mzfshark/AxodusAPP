import type { BusinessId, FundingRecord, RevenueRecord } from "../types/business.types.js";
import type { FundingType } from "../types/business.enums.js";

export type SettlementStatus = "MOCK_NOT_SETTLED" | "MOCK_SETTLEMENT_VISIBLE" | "UNKNOWN_RECORD";
export type BillingStatus = "MOCK_NOT_BILLED" | "MOCK_BILLING_VISIBLE" | "UNKNOWN_PROJECT";

export interface OperationalCostProfile {
  projectId: BusinessId;
  monthlyBudget: number;
  currency: string;
  simulated: true;
}

export interface FinancialEligibility {
  projectId: BusinessId;
  instrumentType: string;
  eligible: boolean;
  reason: string;
  simulated: true;
}

export type FundingStatusRecord = FundingRecord | undefined;
export type RevenueRoutingStatus = RevenueRecord[];

export interface BusinessFinancialAdapterContract {
  readonly mock: true;
  readonly readOnly: true;
  getFundingStatus(projectId: BusinessId): FundingStatusRecord;
  getRevenueRouting(assetId: BusinessId): RevenueRoutingStatus;
  getSettlementStatus(recordId: BusinessId): SettlementStatus;
  getBillingStatus(projectId: BusinessId): BillingStatus;
  getOperationalCostProfile(projectId: BusinessId): OperationalCostProfile | undefined;
  validateFundingModel(projectId: BusinessId, fundingType: FundingType): FinancialEligibility;
  canUseFinancialInstrument(projectId: BusinessId, instrumentType: string): FinancialEligibility;
}
