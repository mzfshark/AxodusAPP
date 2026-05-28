import { getRequiredCapabilitiesForAction } from "../capabilities/business.capabilities.js";
import { governanceAdapter } from "../adapters/governance.adapter.js";
import { getDraftStoreRecordById, listDraftStoreRecords } from "../drafts/business.draft-store.js";
import type { BusinessDraftStoreRecord } from "../drafts/business.draft-types.js";
import { getPermissionForAction } from "../permissions/business.permissions.js";
import { getExecutionPolicy } from "../policies/business.execution-policy.js";
import { createBusinessRegistry } from "../registry/business.registry.js";
import { getProjectRegistryView } from "../registry/business.registry-selectors.js";
import { getWorkflowReadiness } from "../workflows/business.workflow-selectors.js";
import type { BusinessId, BusinessProject } from "../types/business.types.js";
import type { TreasuryExposure } from "../types/business.types.js";
import {
  type BusinessFederationStandingSnapshot,
  type BusinessGovernanceBridgeBlocker,
  type BusinessGovernanceBridgePackage,
  type BusinessGovernanceBridgeRequest,
  type BusinessGovernanceBridgeStatus,
  type BusinessGovernanceBridgeSummary,
  type BusinessGovernanceCompatibilitySnapshot,
  type BusinessGovernanceHandoffReceipt,
  type BusinessGovernanceProposalReference,
  type BusinessGovernanceReadinessPackage,
  type BusinessGovernanceRestrictionSnapshot
} from "./business.governance-bridge-types.js";

export const BUSINESS_GOVERNANCE_BRIDGE_NON_EXECUTION_GUARANTEE =
  "Mock governance bridge only: no proposal creation, voting, approval, rejection, governance execution, DAO registry mutation, treasury release, wallet signing or contract call is executed.";

interface ResolvedGovernanceEntity {
  entityId: BusinessId;
  entityType: BusinessGovernanceBridgeRequest["entityType"];
  draft?: BusinessDraftStoreRecord;
  project?: BusinessProject;
  projectId?: BusinessId;
  assetId?: BusinessId;
  requesterId: BusinessId;
  status?: string;
  riskTier?: BusinessProject["riskTier"];
  treasuryExposures: TreasuryExposure[];
  acsImplications: string[];
  debentureImplications: string[];
  revenueImplications: string[];
  governanceRequired: boolean;
}

const now = (): string => new Date().toISOString();

const resolveDraftRequester = (record: BusinessDraftStoreRecord): BusinessId => {
  if (record.draft.draftType === "DAO_PLUGIN_REQUEST") {
    return String(record.draft.values.daoIdentity ?? record.draft.requesterIdentityId ?? "id-axodus-core");
  }
  return record.draft.requesterIdentityId ?? String(record.draft.values.requesterIdentity ?? record.draft.values.daoIdentity ?? "id-axodus-core");
};

const resolveEntity = (entityId: BusinessId): ResolvedGovernanceEntity | undefined => {
  const draft = getDraftStoreRecordById(entityId);
  if (draft && draft.status !== "DISCARDED") {
    const review = draft.preview.runtimeReview;
    return {
      entityId,
      entityType: "DRAFT",
      draft,
      requesterId: resolveDraftRequester(draft),
      status: draft.status,
      riskTier: review.riskReview.inferredRiskTier,
      treasuryExposures: [],
      acsImplications: review.acsRequirement ? ["Draft requires ACS review before any future provisioning."] : [],
      debentureImplications: draft.draft.draftType === "DEBENTURE_FUNDING_REQUEST" ? ["Debenture planning requires governance review; issuance remains disabled."] : [],
      revenueImplications: draft.draft.values.revenueModel ? ["Revenue model is preparatory and cannot distribute revenue."] : [],
      governanceRequired: review.governanceRequirement
    };
  }

  const registry = createBusinessRegistry();
  const project = registry.indexes.projectsById.get(entityId)
    ?? (registry.indexes.assetsById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.assetsById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.fundingById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.fundingById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.debenturesById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.debenturesById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.pluginsById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.pluginsById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.requestsById.get(entityId) ? [...registry.indexes.projectsById.values()].find((entry) => entry.requestId === entityId) : undefined);

  if (!project) return undefined;

  const view = getProjectRegistryView(project.id);
  const asset = registry.indexes.assetsById.get(entityId);
  const funding = registry.indexes.fundingById.get(entityId);
  const debenture = registry.indexes.debenturesById.get(entityId);
  const plugin = registry.indexes.pluginsById.get(entityId);
  const request = registry.indexes.requestsById.get(entityId);
  const entityType: ResolvedGovernanceEntity["entityType"] =
    entityId === project.id ? "PROJECT" : asset ? "ASSET" : funding ? "FUNDING" : debenture ? "DEBENTURE" : plugin ? "PLUGIN" : request ? "REQUEST" : "PROJECT";

  return {
    entityId,
    entityType,
    project,
    projectId: project.id,
    assetId: view?.asset?.id,
    requesterId: project.ownerId,
    status: project.status,
    riskTier: project.riskTier,
    treasuryExposures: view?.treasuryExposures ?? [],
    acsImplications: (view?.acsRuntimes ?? []).map((runtime) => `ACS runtime ${runtime.id} remains ${runtime.status}; provisioning is not executed by Business.`),
    debentureImplications: view?.debenture ? [`Debenture ${view.debenture.id} requires governance-aware planning; issuance remains disabled.`] : [],
    revenueImplications: (view?.revenueRecords ?? []).map((record) => `Revenue record ${record.id} is visible only; distribution remains disabled.`),
    governanceRequired: project.governanceReference.constitutionalCompatibility !== "COMPATIBLE"
  };
};

export const requiresGovernanceBridge = (entityId: BusinessId): boolean =>
  resolveEntity(entityId)?.governanceRequired ?? false;

export const getGovernanceCompatibilitySnapshot = (entityId: BusinessId): BusinessGovernanceCompatibilitySnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const compatibility = entity.projectId
    ? governanceAdapter.getConstitutionalCompatibility(entity.projectId)
    : entity.governanceRequired ? "REVIEW_REQUIRED" : "COMPATIBLE";

  return {
    entityId,
    projectId: entity.projectId,
    constitutionalCompatibility: compatibility,
    compatible: compatibility === "COMPATIBLE",
    requiresReview: compatibility === "REVIEW_REQUIRED" || entity.governanceRequired,
    restricted: compatibility === "RESTRICTED",
    mock: true,
    readOnly: true
  };
};

export const getGovernanceRestrictionSnapshot = (entityId: BusinessId): BusinessGovernanceRestrictionSnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const restrictions = entity.projectId ? governanceAdapter.getGovernanceRestrictions(entity.projectId) : [];
  const treasuryRestrictions = entity.projectId
    ? governanceAdapter.getTreasuryRestrictions(entity.projectId)
    : entity.governanceRequired ? ["Draft requires governance review before future treasury or execution flow."] : [];

  return {
    entityId,
    projectId: entity.projectId,
    restrictions,
    treasuryRestrictions,
    blockerCount: restrictions.filter((restriction) => restriction.severity === "CRITICAL").length,
    mock: true,
    readOnly: true
  };
};

export const getFederationStandingSnapshot = (entityId: BusinessId): BusinessFederationStandingSnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const standing = governanceAdapter.getFederationStanding(entity.requesterId);

  return {
    entityId,
    requesterId: entity.requesterId,
    standing,
    allowedForReview: standing === "GOOD_STANDING" || standing === "UNDER_REVIEW",
    mock: true,
    readOnly: true
  };
};

export const getMockProposalReference = (entityId: BusinessId): BusinessGovernanceProposalReference | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const sourceReference = entity.projectId ? governanceAdapter.getProposalReference(entity.projectId) : undefined;
  const proposalId = sourceReference?.proposalId ?? `mock-proposal-${entity.entityType.toLowerCase()}-${entityId}`;

  return {
    entityId,
    projectId: entity.projectId,
    proposalId,
    proposalUrl: sourceReference?.proposalUrl ?? `mock://governance/proposals/${proposalId}`,
    sourceReference,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

const governanceBlockers = (
  entity: ResolvedGovernanceEntity,
  compatibility: BusinessGovernanceCompatibilitySnapshot,
  restrictions: BusinessGovernanceRestrictionSnapshot,
  federation: BusinessFederationStandingSnapshot
): BusinessGovernanceBridgeBlocker[] => {
  const blockers: BusinessGovernanceBridgeBlocker[] = [];
  if (compatibility.restricted) {
    blockers.push({
      blockerId: `governance-blocker-${entity.entityId}-restricted`,
      entityId: entity.entityId,
      message: "Constitutional compatibility is restricted.",
      severity: "CRITICAL",
      blocking: true,
      source: "GOVERNANCE",
      mock: true,
      readOnly: true
    });
  }
  if (!federation.allowedForReview) {
    blockers.push({
      blockerId: `governance-blocker-${entity.entityId}-federation`,
      entityId: entity.entityId,
      message: `Federation standing is ${federation.standing}.`,
      severity: "CRITICAL",
      blocking: true,
      source: "FEDERATION",
      mock: true,
      readOnly: true
    });
  }
  for (const restriction of restrictions.restrictions.filter((entry) => entry.severity === "CRITICAL")) {
    blockers.push({
      blockerId: `governance-blocker-${restriction.id}`,
      entityId: entity.entityId,
      message: restriction.restriction,
      severity: "CRITICAL",
      blocking: true,
      source: "GOVERNANCE",
      mock: true,
      readOnly: true
    });
  }

  return blockers;
};

const requiredApprovalsFor = (entity: ResolvedGovernanceEntity): string[] => {
  const approvals = ["BUSINESS_OPERATIONAL_REVIEW"];
  if (entity.governanceRequired) approvals.push("GOVERNANCE_REVIEW");
  if (entity.treasuryExposures.length > 0 || entity.draft?.preview.runtimeReview.treasuryRequirement) approvals.push("TREASURY_VISIBILITY_REVIEW");
  if (entity.debentureImplications.length > 0) approvals.push("DEBENTURE_POLICY_REVIEW");
  if (entity.acsImplications.length > 0) approvals.push("ACS_ISOLATION_REVIEW");
  return [...new Set(approvals)];
};

export const createGovernanceReadinessPackage = (entityId: BusinessId): BusinessGovernanceReadinessPackage | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const compatibility = getGovernanceCompatibilitySnapshot(entityId);
  const restrictions = getGovernanceRestrictionSnapshot(entityId);
  const federation = getFederationStandingSnapshot(entityId);
  const mockProposalReference = getMockProposalReference(entityId);
  if (!compatibility || !restrictions || !federation || !mockProposalReference) return undefined;

  const workflowReadiness = entity.projectId ? getWorkflowReadiness(entity.projectId) : undefined;
  const blockers = governanceBlockers(entity, compatibility, restrictions, federation);
  const warnings = [
    ...restrictions.treasuryRestrictions,
    entity.governanceRequired ? "Governance review is required before any future handoff can become real." : "",
    "Governance bridge is mock/read-only and cannot submit a proposal."
  ].filter(Boolean);
  const treasuryExposure = {
    totalRequestedAmount: entity.treasuryExposures.reduce((total, exposure) => total + exposure.requestedAmount, 0),
    totalApprovedAmount: entity.treasuryExposures.reduce((total, exposure) => total + exposure.approvedAmount, 0),
    currency: entity.treasuryExposures[0]?.currency ?? "USD",
    restrictions: restrictions.treasuryRestrictions
  };

  return {
    packageId: `gov-package-${entity.entityId}`,
    entityId,
    entityType: entity.entityType,
    draftId: entity.draft?.id,
    projectId: entity.projectId,
    assetId: entity.assetId,
    requesterId: entity.requesterId,
    governanceRequired: entity.governanceRequired,
    constitutionalCompatibility: compatibility,
    federationStanding: federation,
    governanceRestrictions: restrictions,
    requiredApprovals: requiredApprovalsFor(entity),
    riskTier: entity.riskTier,
    treasuryExposure,
    acsImplications: entity.acsImplications,
    debentureImplications: entity.debentureImplications,
    revenueImplications: entity.revenueImplications,
    workflowReadiness: {
      ready: workflowReadiness?.ready ?? !entity.governanceRequired,
      progressPercent: workflowReadiness?.progressPercent ?? 0,
      blockerCount: workflowReadiness?.blockerCount ?? 0
    },
    stateMachineStatus: {
      currentStatus: entity.status,
      simulatedOnly: true,
      transitionExecutionEnabled: false
    },
    blockers,
    warnings,
    nextRecommendedStep: blockers.length > 0
      ? "Resolve governance blockers before preparing any future real governance handoff."
      : entity.governanceRequired
        ? "Governance package is ready for future review integration; no proposal is created in this runtime."
        : "Governance bridge is not required; keep monitoring governance compatibility.",
    mockProposalReference,
    nonExecutionGuarantee: BUSINESS_GOVERNANCE_BRIDGE_NON_EXECUTION_GUARANTEE,
    createdAt: now(),
    mock: true,
    readOnly: true
  };
};

export const getGovernanceBridgeBlockers = (entityId: BusinessId): BusinessGovernanceBridgeBlocker[] =>
  createGovernanceReadinessPackage(entityId)?.blockers ?? [];

export const getGovernanceBridgeStatus = (entityId: BusinessId): BusinessGovernanceBridgeStatus => {
  const pkg = createGovernanceReadinessPackage(entityId);
  if (!pkg) return "ARCHIVED";
  if (!pkg.governanceRequired) return "NOT_REQUIRED";
  if (pkg.blockers.length > 0) return "BLOCKED_BY_GOVERNANCE_REQUIREMENTS";
  if (pkg.mockProposalReference) return "MOCK_PROPOSAL_REFERENCE_CREATED";
  return "READY_FOR_GOVERNANCE_REVIEW";
};

export const createGovernanceHandoffReceipt = (entityId: BusinessId): BusinessGovernanceHandoffReceipt | undefined => {
  const pkg = createGovernanceReadinessPackage(entityId);
  if (!pkg) return undefined;

  return {
    handoffReceiptId: `gov-handoff-${entityId}`,
    packageId: pkg.packageId,
    entityId,
    entityType: pkg.entityType,
    handoffStatus: pkg.blockers.length > 0 ? "BLOCKED_BY_GOVERNANCE_REQUIREMENTS" : "HANDOFF_PREPARED",
    mockProposalReference: pkg.mockProposalReference,
    preparedBy: "id-axodus-core",
    createdAt: now(),
    requiredGovernanceActions: pkg.requiredApprovals,
    blockedActions: [
      "CREATE_REAL_PROPOSAL",
      "SUBMIT_TO_DAO",
      "VOTE",
      "APPROVE",
      "REJECT",
      "EXECUTE_PROPOSAL",
      "ALTER_DAO_REGISTRY",
      "RELEASE_TREASURY",
      "CALL_CONTRACT"
    ],
    executionPolicy: getExecutionPolicy("PREPARE_GOVERNANCE_REVIEW"),
    permissionSnapshot: getPermissionForAction(pkg.requesterId, "PREPARE_GOVERNANCE_REVIEW"),
    capabilitySnapshot: getRequiredCapabilitiesForAction("PREPARE_GOVERNANCE_REVIEW"),
    governanceSnapshot: pkg.constitutionalCompatibility,
    auditReference: `audit-${pkg.packageId}-handoff-prepared`,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const createGovernanceBridgePackage = (entityId: BusinessId): BusinessGovernanceBridgePackage | undefined =>
  createGovernanceReadinessPackage(entityId);

export const getGovernanceBridgeSummary = (): BusinessGovernanceBridgeSummary => {
  const registry = createBusinessRegistry();
  const entityIds = [
    ...listDraftStoreRecords().map((record) => record.id),
    ...registry.indexes.projectsById.keys(),
    ...registry.indexes.assetsById.keys(),
    ...registry.indexes.fundingById.keys(),
    ...registry.indexes.debenturesById.keys(),
    ...registry.indexes.pluginsById.keys()
  ];
  const packages = entityIds
    .map((entityId) => createGovernanceReadinessPackage(entityId))
    .filter((pkg): pkg is BusinessGovernanceReadinessPackage => Boolean(pkg));

  return {
    totalEntities: packages.length,
    governanceRequired: packages.filter((pkg) => pkg.governanceRequired).length,
    readyForGovernanceReview: packages.filter((pkg) => pkg.governanceRequired && pkg.blockers.length === 0).length,
    blockedByGovernanceRequirements: packages.filter((pkg) => pkg.blockers.length > 0).length,
    mockProposalReferences: packages.filter((pkg) => Boolean(pkg.mockProposalReference)).length,
    handoffPrepared: packages.filter((pkg) => pkg.governanceRequired && pkg.blockers.length === 0).length,
    waitingForRealGovernanceIntegration: packages.filter((pkg) => pkg.governanceRequired).length,
    blockerCount: packages.reduce((total, pkg) => total + pkg.blockers.length, 0),
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};
