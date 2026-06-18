import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { DebentureEligibility, DebentureRiskProfile } from "../contracts/debenture.contract.js";
import type { FinancialEligibility, OperationalCostProfile, SettlementStatus } from "../contracts/financial.contract.js";
import type { TreasuryAllocationDecision, TreasuryRestriction, TreasuryRiskProfile } from "../contracts/treasury.contract.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy } from "../policies/business.execution-policy.js";
import type { DebentureType, FundingStatus, FundingType, RevenueSource, RevenueStatus, RiskTier, TreasuryExposureStatus, TreasuryExposureType } from "../types/business.enums.js";
import type { BusinessId, GovernanceReference } from "../types/business.types.js";

export const BUSINESS_FINANCIAL_BRIDGE_STATUSES = [
  "NOT_REQUIRED",
  "FINANCIAL_REVIEW_REQUIRED",
  "TREASURY_REVIEW_REQUIRED",
  "FUNDING_REVIEW_REQUIRED",
  "DEBENTURE_REVIEW_REQUIRED",
  "REVENUE_REVIEW_REQUIRED",
  "READY_FOR_FINANCIAL_REVIEW",
  "BLOCKED_BY_FINANCIAL_REQUIREMENTS",
  "HANDOFF_PREPARED",
  "WAITING_FOR_REAL_FINANCIAL_INTEGRATION",
  "ARCHIVED"
] as const;

export type BusinessFinancialBridgeStatus = (typeof BUSINESS_FINANCIAL_BRIDGE_STATUSES)[number];

export interface BusinessFinancialBridgeRequest {
  entityId: BusinessId;
  entityType: "DRAFT" | "PROJECT" | "ASSET" | "FUNDING" | "TREASURY_EXPOSURE" | "DEBENTURE" | "REVENUE" | "REQUEST" | "UNKNOWN";
  requestedBy: BusinessId;
  requestedAt: string;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessFinancialBridgeBlocker {
  blockerId: BusinessId;
  entityId: BusinessId;
  message: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  blocking: boolean;
  source: "TREASURY" | "FUNDING" | "DEBENTURE" | "REVENUE" | "SETTLEMENT" | "GOVERNANCE" | "SECURITY";
  mock: true;
  readOnly: true;
}

export interface BusinessTreasuryReadinessPackage {
  packageId: BusinessId;
  entityId: BusinessId;
  entityType: BusinessFinancialBridgeRequest["entityType"];
  projectId?: BusinessId;
  assetId?: BusinessId;
  requestedAmount: number;
  approvedAmountMock: number;
  consumedAmountMock: number;
  currency: string;
  riskTier?: RiskTier;
  exposureType?: TreasuryExposureType;
  treasuryRestrictions: TreasuryRestriction[];
  governanceReference?: GovernanceReference;
  milestoneFundingRequired: boolean;
  repaymentModel: string;
  expectedReturn: string;
  allocationDecision: TreasuryAllocationDecision;
  consumptionDecision: TreasuryAllocationDecision;
  exposureLimit?: TreasuryRiskProfile;
  status?: TreasuryExposureStatus | "NO_EXPOSURE";
  blockers: BusinessFinancialBridgeBlocker[];
  warnings: string[];
  nonExecutionGuarantee: string;
  mock: true;
  readOnly: true;
}

export interface BusinessFundingReadinessPackage {
  packageId: BusinessId;
  entityId: BusinessId;
  entityType: BusinessFinancialBridgeRequest["entityType"];
  fundingId?: BusinessId;
  projectId?: BusinessId;
  assetId?: BusinessId;
  fundingType?: FundingType;
  fundingStatus?: FundingStatus;
  targetAmount: number;
  raisedAmountMock: number;
  currency: string;
  issuerId?: BusinessId;
  fundingEligibility?: FinancialEligibility;
  operationalCostProfile?: OperationalCostProfile;
  treasuryExposureId?: BusinessId;
  debentureId?: BusinessId;
  blockers: BusinessFinancialBridgeBlocker[];
  warnings: string[];
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessDebentureReadinessPackage {
  packageId: BusinessId;
  debentureId?: BusinessId;
  projectId?: BusinessId;
  issuerId?: BusinessId;
  debentureType?: DebentureType;
  convertible: boolean;
  targetAmount: number;
  raisedAmountMock: number;
  currency: string;
  aprModel: string;
  maturityDate?: string;
  repaymentSource?: RevenueSource;
  eligibilityStatus?: DebentureEligibility;
  riskProfile?: DebentureRiskProfile;
  requiredGovernanceReview: boolean;
  requiredTreasuryReview: boolean;
  requiredIdentityReview: boolean;
  blockers: BusinessFinancialBridgeBlocker[];
  warnings: string[];
  simulationOnly: true;
  externalSideEffects: false;
  mock: true;
  readOnly: true;
}

export interface BusinessRevenueRoutingReadinessPackage {
  packageId: BusinessId;
  entityId: BusinessId;
  assetId?: BusinessId;
  projectId?: BusinessId;
  revenueSource?: RevenueSource;
  grossAmountMock: number;
  netAmountMock: number;
  treasuryShare: number;
  daoShare: number;
  builderShare: number;
  maintainerShare: number;
  debentureShare: number;
  reserveShare: number;
  routingStatus?: RevenueStatus;
  settlementReadiness: SettlementStatus;
  blockedActions: string[];
  nonExecutionGuarantee: string;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessFinancialRiskSnapshot {
  entityId: BusinessId;
  projectId?: BusinessId;
  assetId?: BusinessId;
  riskTier?: RiskTier;
  treasuryExposureAmount: number;
  fundingTargetAmount: number;
  debentureTargetAmount: number;
  revenueNetAmount: number;
  exposureLimit?: TreasuryRiskProfile;
  blockedFinancialActions: string[];
  riskNotes: string[];
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessSettlementReadinessSnapshot {
  entityId: BusinessId;
  projectId?: BusinessId;
  revenueRecordIds: BusinessId[];
  settlementStatuses: Array<{ revenueId: BusinessId; status: SettlementStatus }>;
  settlementReady: boolean;
  blockedActions: string[];
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessFinancialBridgePackage {
  packageId: BusinessId;
  entityId: BusinessId;
  entityType: BusinessFinancialBridgeRequest["entityType"];
  projectId?: BusinessId;
  assetId?: BusinessId;
  requesterId: BusinessId;
  bridgeStatus: BusinessFinancialBridgeStatus;
  treasuryPackage?: BusinessTreasuryReadinessPackage;
  fundingPackage?: BusinessFundingReadinessPackage;
  debenturePackage?: BusinessDebentureReadinessPackage;
  revenuePackage?: BusinessRevenueRoutingReadinessPackage;
  riskSnapshot: BusinessFinancialRiskSnapshot;
  settlementReadiness: BusinessSettlementReadinessSnapshot;
  blockers: BusinessFinancialBridgeBlocker[];
  warnings: string[];
  requiredFinancialActions: string[];
  blockedActions: string[];
  nextRecommendedStep: string;
  nonExecutionGuarantee: string;
  createdAt: string;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessFinancialHandoffReceipt {
  handoffReceiptId: BusinessId;
  packageId: BusinessId;
  entityId: BusinessId;
  entityType: BusinessFinancialBridgeRequest["entityType"];
  financialBridgeStatus: BusinessFinancialBridgeStatus;
  requiredFinancialActions: string[];
  blockedActions: string[];
  treasurySnapshot?: BusinessTreasuryReadinessPackage;
  fundingSnapshot?: BusinessFundingReadinessPackage;
  debentureSnapshot?: BusinessDebentureReadinessPackage;
  revenueSnapshot?: BusinessRevenueRoutingReadinessPackage;
  permissionSnapshot: BusinessPermissionDecision;
  capabilitySnapshot: BusinessCapability[];
  executionPolicy: BusinessExecutionPolicy;
  auditReference: BusinessId;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessFinancialBridgeSummary {
  totalEntities: number;
  financialReviewRequired: number;
  treasuryReviewRequired: number;
  fundingReviewRequired: number;
  debentureReviewRequired: number;
  revenueReviewRequired: number;
  readyForFinancialReview: number;
  blockedByFinancialRequirements: number;
  handoffPrepared: number;
  waitingForRealFinancialIntegration: number;
  blockerCount: number;
  externalExecutionCount: 0;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}
