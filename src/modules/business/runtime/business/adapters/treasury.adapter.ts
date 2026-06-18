import { BUSINESS_DEFAULT_CURRENCY } from "../constants/business.constants.js";
import { businessRuntimeMock } from "../data/business.mock.js";
import type {
  BusinessTreasuryAdapterContract,
  TreasuryAllocationDecision,
  TreasuryFreezeStatus,
  TreasuryRestriction,
  TreasuryRiskProfile
} from "../contracts/treasury.contract.js";
import { RiskTier, TreasuryExposureStatus } from "../types/business.enums.js";
import type { BusinessId, TreasuryExposure } from "../types/business.types.js";

const exposureLimits: Record<RiskTier, number> = {
  [RiskTier.TIER_1_CRITICAL_INFRASTRUCTURE]: 500000,
  [RiskTier.TIER_2_ECOSYSTEM_STRATEGIC]: 250000,
  [RiskTier.TIER_3_REVENUE_GENERATING]: 150000,
  [RiskTier.TIER_4_EXPERIMENTAL]: 50000,
  [RiskTier.TIER_5_VENTURE_RISK]: 25000
};

const findProjectRiskTier = (projectId: BusinessId): RiskTier | undefined =>
  businessRuntimeMock.projects.find((project) => project.id === projectId)?.riskTier;

export const treasuryAdapter = {
  mock: true,
  readOnly: true,

  getTreasuryExposure(projectId: BusinessId): TreasuryExposure[] {
    return structuredClone(businessRuntimeMock.treasuryExposures.filter((record) => record.projectId === projectId));
  },

  getTreasuryExposureLimit(riskTier: RiskTier): TreasuryRiskProfile {
    return {
      riskTier,
      exposureLimit: exposureLimits[riskTier],
      currency: BUSINESS_DEFAULT_CURRENCY,
      governanceRequired: riskTier !== RiskTier.TIER_1_CRITICAL_INFRASTRUCTURE
    };
  },

  getTreasuryAllocationStatus(projectId: BusinessId): TreasuryExposureStatus | "NO_EXPOSURE" {
    return businessRuntimeMock.treasuryExposures.find((record) => record.projectId === projectId)?.status ?? "NO_EXPOSURE";
  },

  getTreasuryRestrictions(projectId: BusinessId): TreasuryRestriction[] {
    const exposure = businessRuntimeMock.treasuryExposures.find((record) => record.projectId === projectId);
    if (!exposure) return [];

    return exposure.governanceReference.treasuryRestrictions.map((restriction, index) => ({
      id: `${projectId}-treasury-restriction-${index + 1}`,
      projectId,
      restriction,
      severity: exposure.riskTier === RiskTier.TIER_5_VENTURE_RISK ? "CRITICAL" : "WARNING"
    }));
  },

  getTreasuryFreezeStatus(): TreasuryFreezeStatus {
    return { frozen: false, mock: true };
  },

  canAllocateTreasury(projectId: BusinessId, amount: number): TreasuryAllocationDecision {
    const riskTier = findProjectRiskTier(projectId);
    const limit = riskTier ? exposureLimits[riskTier] : 0;
    const allowed = Boolean(riskTier && amount >= 0 && amount <= limit);
    return {
      projectId,
      allowed,
      simulated: true,
      reason: allowed ? "Treasury allocation can be prepared for review only." : "Requested amount exceeds mock exposure limit or project was not found."
    };
  },

  canConsumeTreasury(projectId: BusinessId, amount: number): TreasuryAllocationDecision {
    const exposure = businessRuntimeMock.treasuryExposures.find((record) => record.projectId === projectId);
    const remaining = exposure ? exposure.approvedAmount - exposure.consumedAmount : 0;
    const allowed = Boolean(exposure && amount >= 0 && amount <= remaining);
    return {
      projectId,
      allowed,
      simulated: true,
      reason: allowed ? "Treasury consumption can be simulated only." : "Requested consumption exceeds visible mock exposure."
    };
  }
} satisfies BusinessTreasuryAdapterContract;
