import {
  createGovernanceHandoffReceipt,
  createGovernanceReadinessPackage,
  getFederationStandingSnapshot,
  getGovernanceBridgeBlockers,
  getGovernanceBridgeStatus,
  getGovernanceBridgeSummary,
  getGovernanceCompatibilitySnapshot,
  getGovernanceRestrictionSnapshot,
  getMockProposalReference
} from "../governance-bridge/business.governance-bridge.js";
import type {
  BusinessFederationStandingSnapshot,
  BusinessGovernanceBridgeBlocker,
  BusinessGovernanceBridgeStatus,
  BusinessGovernanceBridgeSummary,
  BusinessGovernanceCompatibilitySnapshot,
  BusinessGovernanceHandoffReceipt,
  BusinessGovernanceProposalReference,
  BusinessGovernanceReadinessPackage,
  BusinessGovernanceRestrictionSnapshot
} from "../governance-bridge/business.governance-bridge-types.js";
import type { BusinessId } from "../types/business.types.js";
import { createBusinessApiError } from "./business.api-errors.js";
import { businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse } from "./business.response.types.js";

const bridgePath = (suffix = ""): string => `/api/v1/business/governance/bridge${suffix}`;

const notFound = (entityId: BusinessId): BusinessApiResponse<null> =>
  businessApiResponse(null, {
    errors: [
      createBusinessApiError(
        "GOVERNANCE_BRIDGE_ENTITY_NOT_FOUND",
        "Governance bridge entity was not found in draft store or Business registry.",
        "WARNING",
        { entityId },
        "Use a known draft, project, asset, funding, debenture, plugin or request id."
      )
    ],
    links: { self: bridgePath(`/${entityId}`) },
    action: "PREPARE_GOVERNANCE_REVIEW"
  });

export const getBusinessGovernanceBridge = (): BusinessApiResponse<BusinessGovernanceBridgeSummary> =>
  businessApiResponse(getGovernanceBridgeSummary(), {
    links: { self: bridgePath() },
    action: "PREPARE_GOVERNANCE_REVIEW"
  });

export const getBusinessGovernanceBridgeSummary = (): BusinessApiResponse<BusinessGovernanceBridgeSummary> =>
  businessApiResponse(getGovernanceBridgeSummary(), {
    links: { self: bridgePath("/summary") },
    action: "PREPARE_GOVERNANCE_REVIEW"
  });

export const getBusinessGovernanceBridgeStatus = (entityId: BusinessId): BusinessApiResponse<{ entityId: BusinessId; status: BusinessGovernanceBridgeStatus; mock: true; readOnly: true; simulationOnly: true; externalSideEffects: false } | null> => {
  const pkg = createGovernanceReadinessPackage(entityId);
  if (!pkg) return notFound(entityId);
  return businessApiResponse(
    { entityId, status: getGovernanceBridgeStatus(entityId), mock: true, readOnly: true, simulationOnly: true, externalSideEffects: false },
    { links: { self: bridgePath(`/${entityId}`) }, action: "PREPARE_GOVERNANCE_REVIEW" }
  );
};

export const getBusinessGovernanceReadinessPackage = (entityId: BusinessId): BusinessApiResponse<BusinessGovernanceReadinessPackage | null> => {
  const pkg = createGovernanceReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(pkg, { links: { self: bridgePath(`/${entityId}/package`) }, action: "PREPARE_GOVERNANCE_REVIEW" })
    : notFound(entityId);
};

export const getBusinessGovernanceHandoffReceipt = (entityId: BusinessId): BusinessApiResponse<BusinessGovernanceHandoffReceipt | null> => {
  const receipt = createGovernanceHandoffReceipt(entityId);
  return receipt
    ? businessApiResponse(receipt, { links: { self: bridgePath(`/${entityId}/handoff-receipt`) }, action: "PREPARE_GOVERNANCE_REVIEW" })
    : notFound(entityId);
};

export const getBusinessGovernanceCompatibility = (entityId: BusinessId): BusinessApiResponse<BusinessGovernanceCompatibilitySnapshot | null> => {
  const snapshot = getGovernanceCompatibilitySnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/compatibility`) }, action: "PREPARE_GOVERNANCE_REVIEW" })
    : notFound(entityId);
};

export const getBusinessGovernanceRestrictions = (entityId: BusinessId): BusinessApiResponse<BusinessGovernanceRestrictionSnapshot | null> => {
  const snapshot = getGovernanceRestrictionSnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/restrictions`) }, action: "PREPARE_GOVERNANCE_REVIEW" })
    : notFound(entityId);
};

export const getBusinessGovernanceProposalReference = (entityId: BusinessId): BusinessApiResponse<BusinessGovernanceProposalReference | null> => {
  const reference = getMockProposalReference(entityId);
  return reference
    ? businessApiResponse(reference, { links: { self: bridgePath(`/${entityId}/proposal-reference`) }, action: "PREPARE_GOVERNANCE_REVIEW" })
    : notFound(entityId);
};

export const getBusinessGovernanceFederationStanding = (entityId: BusinessId): BusinessApiResponse<BusinessFederationStandingSnapshot | null> => {
  const snapshot = getFederationStandingSnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/federation-standing`) }, action: "PREPARE_GOVERNANCE_REVIEW" })
    : notFound(entityId);
};

export const getBusinessGovernanceBridgeBlockers = (entityId: BusinessId): BusinessApiResponse<BusinessGovernanceBridgeBlocker[] | null> => {
  const pkg = createGovernanceReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(getGovernanceBridgeBlockers(entityId), { links: { self: bridgePath(`/${entityId}/blockers`) }, action: "PREPARE_GOVERNANCE_REVIEW" })
    : notFound(entityId);
};
