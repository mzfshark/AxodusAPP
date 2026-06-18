import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { ConstitutionalCompatibility, FederationStanding, GovernanceRestriction } from "../contracts/governance.contract.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy } from "../policies/business.execution-policy.js";
import type { RiskTier } from "../types/business.enums.js";
import type { BusinessId, GovernanceReference } from "../types/business.types.js";

export const BUSINESS_GOVERNANCE_BRIDGE_STATUSES = [
  "NOT_REQUIRED",
  "GOVERNANCE_REQUIRED",
  "READY_FOR_GOVERNANCE_REVIEW",
  "BLOCKED_BY_GOVERNANCE_REQUIREMENTS",
  "HANDOFF_PREPARED",
  "MOCK_PROPOSAL_REFERENCE_CREATED",
  "WAITING_FOR_REAL_GOVERNANCE_INTEGRATION",
  "ARCHIVED"
] as const;

export type BusinessGovernanceBridgeStatus = (typeof BUSINESS_GOVERNANCE_BRIDGE_STATUSES)[number];

export interface BusinessGovernanceBridgeRequest {
  entityId: BusinessId;
  entityType: "DRAFT" | "PROJECT" | "ASSET" | "FUNDING" | "DEBENTURE" | "PLUGIN" | "REQUEST" | "UNKNOWN";
  requestedBy: BusinessId;
  requestedAt: string;
  mock: true;
  readOnly: true;
}

export interface BusinessGovernanceCompatibilitySnapshot {
  entityId: BusinessId;
  projectId?: BusinessId;
  constitutionalCompatibility: ConstitutionalCompatibility;
  compatible: boolean;
  requiresReview: boolean;
  restricted: boolean;
  mock: true;
  readOnly: true;
}

export interface BusinessGovernanceRestrictionSnapshot {
  entityId: BusinessId;
  projectId?: BusinessId;
  restrictions: GovernanceRestriction[];
  treasuryRestrictions: string[];
  blockerCount: number;
  mock: true;
  readOnly: true;
}

export interface BusinessGovernanceProposalReference {
  entityId: BusinessId;
  projectId?: BusinessId;
  proposalId: BusinessId;
  proposalUrl?: string;
  sourceReference?: GovernanceReference;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessFederationStandingSnapshot {
  entityId: BusinessId;
  requesterId?: BusinessId;
  standing: FederationStanding;
  allowedForReview: boolean;
  mock: true;
  readOnly: true;
}

export interface BusinessGovernanceBridgeBlocker {
  blockerId: BusinessId;
  entityId: BusinessId;
  message: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  blocking: boolean;
  source: "GOVERNANCE" | "FEDERATION" | "WORKFLOW" | "STATE_MACHINE" | "SECURITY";
  mock: true;
  readOnly: true;
}

export interface BusinessGovernanceReadinessPackage {
  packageId: BusinessId;
  entityId: BusinessId;
  entityType: BusinessGovernanceBridgeRequest["entityType"];
  draftId?: BusinessId;
  projectId?: BusinessId;
  assetId?: BusinessId;
  requesterId: BusinessId;
  governanceRequired: boolean;
  constitutionalCompatibility: BusinessGovernanceCompatibilitySnapshot;
  federationStanding: BusinessFederationStandingSnapshot;
  governanceRestrictions: BusinessGovernanceRestrictionSnapshot;
  requiredApprovals: string[];
  riskTier?: RiskTier;
  treasuryExposure: {
    totalRequestedAmount: number;
    totalApprovedAmount: number;
    currency: string;
    restrictions: string[];
  };
  acsImplications: string[];
  debentureImplications: string[];
  revenueImplications: string[];
  workflowReadiness: {
    ready: boolean;
    progressPercent: number;
    blockerCount: number;
  };
  stateMachineStatus: {
    currentStatus?: string;
    simulatedOnly: true;
    transitionExecutionEnabled: false;
  };
  blockers: BusinessGovernanceBridgeBlocker[];
  warnings: string[];
  nextRecommendedStep: string;
  mockProposalReference: BusinessGovernanceProposalReference;
  nonExecutionGuarantee: string;
  createdAt: string;
  mock: true;
  readOnly: true;
}

export type BusinessGovernanceBridgePackage = BusinessGovernanceReadinessPackage;

export interface BusinessGovernanceHandoffReceipt {
  handoffReceiptId: BusinessId;
  packageId: BusinessId;
  entityId: BusinessId;
  entityType: BusinessGovernanceBridgeRequest["entityType"];
  handoffStatus: BusinessGovernanceBridgeStatus;
  mockProposalReference: BusinessGovernanceProposalReference;
  preparedBy: BusinessId;
  createdAt: string;
  requiredGovernanceActions: string[];
  blockedActions: string[];
  executionPolicy: BusinessExecutionPolicy;
  permissionSnapshot: BusinessPermissionDecision;
  capabilitySnapshot: BusinessCapability[];
  governanceSnapshot: BusinessGovernanceCompatibilitySnapshot;
  auditReference: BusinessId;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}

export interface BusinessGovernanceBridgeSummary {
  totalEntities: number;
  governanceRequired: number;
  readyForGovernanceReview: number;
  blockedByGovernanceRequirements: number;
  mockProposalReferences: number;
  handoffPrepared: number;
  waitingForRealGovernanceIntegration: number;
  blockerCount: number;
  mock: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
}
