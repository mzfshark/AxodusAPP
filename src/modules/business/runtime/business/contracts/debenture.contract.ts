import type { BusinessId, DebentureRecord } from "../types/business.types.js";

export interface DebentureEligibility {
  projectId: BusinessId;
  eligible: boolean;
  reason: string;
  simulated: true;
}

export interface DebentureFundingProgress {
  debentureId: BusinessId;
  targetAmount: number;
  raisedAmount: number;
  percentRaised: number;
  currency: string;
}

export interface DebentureRepaymentStatus {
  debentureId: BusinessId;
  status: "MOCK_NOT_STARTED" | "MOCK_REVENUE_PHASE" | "UNKNOWN_DEBENTURE";
}

export interface DebentureMaturityStatus {
  debentureId: BusinessId;
  maturityDate?: string;
  status: "PENDING" | "MATURED" | "UNKNOWN_DEBENTURE";
}

export interface DebentureTermsSimulation {
  projectId: BusinessId;
  amount: number;
  convertible: boolean;
  aprModel: string;
  simulated: true;
  executable: false;
}

export interface DebentureRiskProfile {
  projectId: BusinessId;
  riskTier: string;
  defaultRisk: "LOW" | "MEDIUM" | "HIGH" | "REVIEW_REQUIRED";
}

export interface BusinessDebentureAdapterContract {
  readonly mock: true;
  readonly readOnly: true;
  getDebentureStatus(debentureId: BusinessId): DebentureRecord | undefined;
  getDebentureEligibility(projectId: BusinessId): DebentureEligibility;
  getDebentureFundingProgress(debentureId: BusinessId): DebentureFundingProgress | undefined;
  getDebentureRepaymentStatus(debentureId: BusinessId): DebentureRepaymentStatus;
  getDebentureMaturityStatus(debentureId: BusinessId): DebentureMaturityStatus;
  simulateDebentureTerms(projectId: BusinessId, amount: number, convertible: boolean): DebentureTermsSimulation;
  canIssueDebenture(projectId: BusinessId): DebentureEligibility;
}
