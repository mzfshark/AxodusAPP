import type { BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import type { BusinessId, GovernanceReference } from "../types/business.types.js";

export type GovernanceStatus = "COMPATIBLE" | "REVIEW_REQUIRED" | "RESTRICTED" | "UNKNOWN_PROJECT";
export type GovernanceDecision = "CAN_PROCEED" | "REVIEW_REQUIRED" | "BLOCKED";
export type ConstitutionalCompatibility = GovernanceReference["constitutionalCompatibility"] | "UNKNOWN_PROJECT";
export type FederationStanding = "GOOD_STANDING" | "UNDER_REVIEW" | "RESTRICTED" | "UNKNOWN_ENTITY";

export interface GovernanceRestriction {
  id: string;
  projectId: BusinessId;
  restriction: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
}

export interface GovernanceApprovalRequirement {
  action: BusinessRuntimeAction;
  required: boolean;
  reason: string;
}

export interface BusinessGovernanceAdapterContract {
  readonly mock: true;
  readonly readOnly: true;
  getGovernanceStatus(projectId: BusinessId): GovernanceStatus;
  getProposalReference(projectId: BusinessId): GovernanceReference | undefined;
  getConstitutionalCompatibility(projectId: BusinessId): ConstitutionalCompatibility;
  getFederationStanding(entityId: BusinessId): FederationStanding;
  getTreasuryRestrictions(projectId: BusinessId): string[];
  getGovernanceRestrictions(projectId: BusinessId): GovernanceRestriction[];
  requiresGovernanceApproval(action: BusinessRuntimeAction): GovernanceApprovalRequirement;
  canProceedUnderGovernance(projectId: BusinessId, action: BusinessRuntimeAction): GovernanceDecision;
}
