import type { BusinessId, TreasuryExposure } from "../types/business.types.js";
import type { RiskTier, TreasuryExposureStatus } from "../types/business.enums.js";

export type TreasuryRestriction = {
  id: string;
  projectId: BusinessId;
  restriction: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
};

export interface TreasuryAllocationDecision {
  projectId: BusinessId;
  allowed: boolean;
  simulated: true;
  reason: string;
}

export interface TreasuryRiskProfile {
  riskTier: RiskTier;
  exposureLimit: number;
  currency: string;
  governanceRequired: boolean;
}

export interface TreasuryFreezeStatus {
  frozen: boolean;
  reason?: string;
  mock: true;
}

export interface BusinessTreasuryAdapterContract {
  readonly mock: true;
  readonly readOnly: true;
  getTreasuryExposure(projectId: BusinessId): TreasuryExposure[];
  getTreasuryExposureLimit(riskTier: RiskTier): TreasuryRiskProfile;
  getTreasuryAllocationStatus(projectId: BusinessId): TreasuryExposureStatus | "NO_EXPOSURE";
  getTreasuryRestrictions(projectId: BusinessId): TreasuryRestriction[];
  getTreasuryFreezeStatus(): TreasuryFreezeStatus;
  canAllocateTreasury(projectId: BusinessId, amount: number): TreasuryAllocationDecision;
  canConsumeTreasury(projectId: BusinessId, amount: number): TreasuryAllocationDecision;
}
