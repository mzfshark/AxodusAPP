import { businessRuntimeMock } from "../data/business.mock.js";
import { requiresGovernance, type BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import { FederationStatus } from "../types/business.enums.js";
import type {
  BusinessGovernanceAdapterContract,
  FederationStanding,
  GovernanceApprovalRequirement,
  GovernanceDecision,
  GovernanceRestriction,
  GovernanceStatus
} from "../contracts/governance.contract.js";
import type { BusinessId, GovernanceReference } from "../types/business.types.js";

const findProject = (projectId: BusinessId) => businessRuntimeMock.projects.find((project) => project.id === projectId);
const findParticipant = (entityId: BusinessId) =>
  businessRuntimeMock.federationParticipants.find((participant) => participant.identityId === entityId || participant.id === entityId);

export const governanceAdapter = {
  mock: true,
  readOnly: true,

  getGovernanceStatus(projectId: BusinessId): GovernanceStatus {
    return findProject(projectId)?.governanceReference.constitutionalCompatibility ?? "UNKNOWN_PROJECT";
  },

  getProposalReference(projectId: BusinessId): GovernanceReference | undefined {
    return structuredClone(findProject(projectId)?.governanceReference);
  },

  getConstitutionalCompatibility(projectId: BusinessId): GovernanceReference["constitutionalCompatibility"] | "UNKNOWN_PROJECT" {
    return findProject(projectId)?.governanceReference.constitutionalCompatibility ?? "UNKNOWN_PROJECT";
  },

  getTreasuryRestrictions(projectId: BusinessId): string[] {
    return [...(findProject(projectId)?.governanceReference.treasuryRestrictions ?? [])];
  },

  getFederationStanding(entityId: BusinessId): FederationStanding {
    const participant = findParticipant(entityId);
    if (!participant) return "UNKNOWN_ENTITY";
    if (participant.status === FederationStatus.OPERATIONAL || participant.status === FederationStatus.VERIFIED) return "GOOD_STANDING";
    if (participant.status === FederationStatus.RESTRICTED || participant.status === FederationStatus.SUSPENDED) return "RESTRICTED";
    return "UNDER_REVIEW";
  },

  getGovernanceRestrictions(projectId: BusinessId): GovernanceRestriction[] {
    const project = findProject(projectId);
    if (!project) return [];

    return project.governanceReference.treasuryRestrictions.map((restriction, index) => ({
      id: `${projectId}-governance-restriction-${index + 1}`,
      projectId,
      restriction,
      severity: project.governanceReference.constitutionalCompatibility === "RESTRICTED" ? "CRITICAL" : "WARNING"
    }));
  },

  requiresGovernanceApproval(action: BusinessRuntimeAction): GovernanceApprovalRequirement {
    return {
      action,
      required: requiresGovernance(action),
      reason: requiresGovernance(action) ? "Action requires governance review before any future execution." : "Action is mock/read-only or preparatory."
    };
  },

  canProceedUnderGovernance(projectId: BusinessId, action: BusinessRuntimeAction): GovernanceDecision {
    const project = findProject(projectId);
    if (!project) return "BLOCKED";
    if (project.governanceReference.constitutionalCompatibility === "RESTRICTED") return "BLOCKED";
    if (this.requiresGovernanceApproval(action).required || project.governanceReference.constitutionalCompatibility === "REVIEW_REQUIRED") return "REVIEW_REQUIRED";
    return "CAN_PROCEED";
  }
} satisfies BusinessGovernanceAdapterContract;

export const getGovernanceStatus = governanceAdapter.getGovernanceStatus;
export const getProposalReference = governanceAdapter.getProposalReference;
export const getConstitutionalCompatibility = governanceAdapter.getConstitutionalCompatibility;
export const getTreasuryRestrictions = governanceAdapter.getTreasuryRestrictions;
export const getFederationStanding = governanceAdapter.getFederationStanding;
export const getGovernanceRestrictions = governanceAdapter.getGovernanceRestrictions;
export const requiresGovernanceApproval = governanceAdapter.requiresGovernanceApproval;
export const canProceedUnderGovernance = governanceAdapter.canProceedUnderGovernance;
