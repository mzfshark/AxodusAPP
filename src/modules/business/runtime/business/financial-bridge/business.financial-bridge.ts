import { getRequiredCapabilitiesForAction } from "../capabilities/business.capabilities.js";
import { debentureAdapter, getDebentureRiskProfile } from "../adapters/debenture.adapter.js";
import { financialAdapter } from "../adapters/financial.adapter.js";
import { treasuryAdapter } from "../adapters/treasury.adapter.js";
import { getDraftStoreRecordById, listDraftStoreRecords } from "../drafts/business.draft-store.js";
import type { BusinessDraftStoreRecord } from "../drafts/business.draft-types.js";
import { getPermissionForAction } from "../permissions/business.permissions.js";
import { getExecutionPolicy } from "../policies/business.execution-policy.js";
import { createBusinessRegistry } from "../registry/business.registry.js";
import { getProjectRegistryView } from "../registry/business.registry-selectors.js";
import { DebentureStatus, DebentureType, FundingStatus, FundingType, RevenueSource, RiskTier, TreasuryExposureStatus, TreasuryExposureType } from "../types/business.enums.js";
import type {
  BusinessId,
  BusinessProject,
  DebentureRecord,
  FundingRecord,
  RevenueRecord,
  TreasuryExposure
} from "../types/business.types.js";
import type {
  BusinessDebentureReadinessPackage,
  BusinessFinancialBridgeBlocker,
  BusinessFinancialBridgePackage,
  BusinessFinancialBridgeRequest,
  BusinessFinancialBridgeStatus,
  BusinessFinancialBridgeSummary,
  BusinessFinancialHandoffReceipt,
  BusinessFinancialRiskSnapshot,
  BusinessFundingReadinessPackage,
  BusinessRevenueRoutingReadinessPackage,
  BusinessSettlementReadinessSnapshot,
  BusinessTreasuryReadinessPackage
} from "./business.financial-bridge-types.js";

export const BUSINESS_FINANCIAL_BRIDGE_NON_EXECUTION_GUARANTEE =
  "Mock financial bridge only: no treasury movement, allocation approval, debenture issuance, debenture purchase, token conversion, APR payment, revenue distribution, settlement, swap, wallet signing or contract call is executed.";

export const BUSINESS_FINANCIAL_BRIDGE_BLOCKED_ACTIONS = [
  "MOVE_TREASURY",
  "APPROVE_ALLOCATION",
  "ISSUE_DEBENTURE",
  "SELL_DEBENTURE",
  "BUY_DEBENTURE",
  "CONVERT_DEBENTURE_TO_NEURONS",
  "PAY_APR",
  "DISTRIBUTE_REVENUE",
  "EXECUTE_SETTLEMENT",
  "EXECUTE_SWAP",
  "CALL_CONTRACT",
  "SIGN_TRANSACTION"
] as const;

interface ResolvedFinancialEntity {
  entityId: BusinessId;
  entityType: BusinessFinancialBridgeRequest["entityType"];
  draft?: BusinessDraftStoreRecord;
  project?: BusinessProject;
  projectId?: BusinessId;
  assetId?: BusinessId;
  requesterId: BusinessId;
  fundingRecords: FundingRecord[];
  treasuryExposures: TreasuryExposure[];
  debentures: DebentureRecord[];
  revenueRecords: RevenueRecord[];
  riskTier?: RiskTier;
  status?: string;
  financialRequired: boolean;
  treasuryRequired: boolean;
  fundingRequired: boolean;
  debentureRequired: boolean;
  revenueRequired: boolean;
}

const now = (): string => new Date().toISOString();

const resolveDraftRequester = (record: BusinessDraftStoreRecord): BusinessId =>
  record.draft.requesterIdentityId
  ?? String(record.draft.values.requesterIdentity ?? record.draft.values.daoIdentity ?? "id-axodus-core");

const numberValue = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

const boolValue = (value: unknown): boolean => value === true;

const createDraftFundingRecord = (draft: BusinessDraftStoreRecord, projectId: BusinessId, assetId: BusinessId): FundingRecord | undefined => {
  const targetAmount = numberValue(draft.draft.values.targetAmount ?? draft.draft.values.estimatedBudget ?? draft.draft.values.requestedAmount);
  if (targetAmount <= 0 && draft.preview.runtimeReview.inferredFundingModel === FundingType.DIRECT) return undefined;

  const fundingType = draft.draft.draftType === "DEBENTURE_FUNDING_REQUEST"
    ? FundingType.DEBENTURE
    : draft.draft.draftType === "TREASURY_SPONSORSHIP_REQUEST"
      ? FundingType.TREASURY
      : FundingType.HYBRID;

  return {
    id: `mock-funding-${draft.id}`,
    projectId,
    assetId,
    fundingType,
    status: FundingStatus.DRAFT,
    targetAmount,
    raisedAmount: 0,
    currency: String(draft.draft.values.currency ?? "USD"),
    issuerId: resolveDraftRequester(draft),
    treasuryExposureId: draft.draft.draftType === "TREASURY_SPONSORSHIP_REQUEST" ? `mock-treasury-${draft.id}` : undefined,
    debentureId: draft.draft.draftType === "DEBENTURE_FUNDING_REQUEST" ? `mock-debenture-${draft.id}` : undefined,
    createdAt: draft.createdAt,
    updatedAt: draft.updatedAt
  };
};

const createDraftTreasuryExposure = (draft: BusinessDraftStoreRecord, projectId: BusinessId, assetId: BusinessId): TreasuryExposure | undefined => {
  const requestedAmount = numberValue(draft.draft.values.requestedAmount ?? draft.draft.values.estimatedBudget ?? draft.draft.values.targetAmount);
  if (!draft.preview.runtimeReview.treasuryRequirement && requestedAmount <= 0) return undefined;

  return {
    id: `mock-treasury-${draft.id}`,
    projectId,
    assetId,
    exposureType: draft.draft.draftType === "DEBENTURE_FUNDING_REQUEST" ? TreasuryExposureType.DEBENTURE_EXPOSURE : TreasuryExposureType.TREASURY_SPONSORSHIP,
    riskTier: draft.preview.runtimeReview.riskReview.inferredRiskTier,
    requestedAmount,
    approvedAmount: 0,
    consumedAmount: 0,
    currency: String(draft.draft.values.currency ?? "USD"),
    treasurySource: "MOCK_BUSINESS_TREASURY_REVIEW",
    expectedReturn: String(draft.draft.values.expectedReturn ?? "Mock expected return review only"),
    repaymentModel: String(draft.draft.values.repaymentModel ?? "Mock repayment model review only"),
    status: TreasuryExposureStatus.DRAFT,
    governanceReference: {
      proposalId: String(draft.draft.values.governanceReference ?? `mock-governance-${draft.id}`),
      constitutionalCompatibility: draft.preview.runtimeReview.governanceRequirement ? "REVIEW_REQUIRED" : "COMPATIBLE",
      treasuryRestrictions: ["Treasury movement is disabled in Sprint 24 financial bridge."]
    },
    createdAt: draft.createdAt,
    updatedAt: draft.updatedAt
  };
};

const createDraftDebenture = (draft: BusinessDraftStoreRecord, projectId: BusinessId, assetId: BusinessId): DebentureRecord | undefined => {
  if (draft.draft.draftType !== "DEBENTURE_FUNDING_REQUEST") return undefined;
  const targetAmount = numberValue(draft.draft.values.targetAmount);

  return {
    id: `mock-debenture-${draft.id}`,
    projectId,
    assetId,
    issuerId: resolveDraftRequester(draft),
    debentureType: boolValue(draft.draft.values.convertible) ? DebentureType.CONVERTIBLE : DebentureType.NON_CONVERTIBLE,
    convertible: boolValue(draft.draft.values.convertible),
    targetAmount,
    raisedAmount: 0,
    currency: String(draft.draft.values.currency ?? "USD"),
    aprModel: String(draft.draft.values.aprModel ?? "Mock APR model review only"),
    maturityDate: String(draft.draft.values.maturityEstimate ?? "TBD"),
    repaymentSource: RevenueSource.DEBENTURE_BACKED,
    status: DebentureStatus.DRAFT,
    createdAt: draft.createdAt,
    updatedAt: draft.updatedAt
  };
};

const resolveEntity = (entityId: BusinessId): ResolvedFinancialEntity | undefined => {
  const draft = getDraftStoreRecordById(entityId);
  if (draft && draft.status !== "DISCARDED") {
    const projectId = `mock-project-${draft.id}`;
    const assetId = `mock-asset-${draft.id}`;
    const funding = createDraftFundingRecord(draft, projectId, assetId);
    const treasuryExposure = createDraftTreasuryExposure(draft, projectId, assetId);
    const debenture = createDraftDebenture(draft, projectId, assetId);
    const fundingRequired = draft.preview.runtimeReview.inferredFundingModel !== FundingType.DIRECT;
    const treasuryRequired = draft.preview.runtimeReview.treasuryRequirement;
    const debentureRequired = draft.draft.draftType === "DEBENTURE_FUNDING_REQUEST";
    const revenueRequired = Boolean(draft.draft.values.revenueModel);

    return {
      entityId,
      entityType: "DRAFT",
      draft,
      projectId,
      assetId,
      requesterId: resolveDraftRequester(draft),
      fundingRecords: funding ? [funding] : [],
      treasuryExposures: treasuryExposure ? [treasuryExposure] : [],
      debentures: debenture ? [debenture] : [],
      revenueRecords: [],
      riskTier: draft.preview.runtimeReview.riskReview.inferredRiskTier,
      status: draft.status,
      financialRequired: fundingRequired || treasuryRequired || debentureRequired || revenueRequired,
      treasuryRequired,
      fundingRequired,
      debentureRequired,
      revenueRequired
    };
  }

  const registry = createBusinessRegistry();
  const project = registry.indexes.projectsById.get(entityId)
    ?? (registry.indexes.assetsById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.assetsById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.fundingById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.fundingById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.treasuryExposuresById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.treasuryExposuresById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.debenturesById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.debenturesById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.revenueById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.revenueById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.requestsById.get(entityId) ? [...registry.indexes.projectsById.values()].find((entry) => entry.requestId === entityId) : undefined);

  if (!project) return undefined;

  const view = getProjectRegistryView(project.id);
  const asset = registry.indexes.assetsById.get(entityId);
  const funding = registry.indexes.fundingById.get(entityId);
  const treasuryExposure = registry.indexes.treasuryExposuresById.get(entityId);
  const debenture = registry.indexes.debenturesById.get(entityId);
  const revenue = registry.indexes.revenueById.get(entityId);
  const request = registry.indexes.requestsById.get(entityId);
  const entityType: ResolvedFinancialEntity["entityType"] =
    entityId === project.id ? "PROJECT" : asset ? "ASSET" : funding ? "FUNDING" : treasuryExposure ? "TREASURY_EXPOSURE" : debenture ? "DEBENTURE" : revenue ? "REVENUE" : request ? "REQUEST" : "PROJECT";
  const fundingRecords = funding ? [funding] : view?.funding ? [view.funding] : [];
  const treasuryExposures = treasuryExposure ? [treasuryExposure] : view?.treasuryExposures ?? [];
  const debentures = debenture ? [debenture] : view?.debenture ? [view.debenture] : [];
  const revenueRecords = revenue ? [revenue] : view?.revenueRecords ?? [];

  return {
    entityId,
    entityType,
    project,
    projectId: project.id,
    assetId: asset?.id ?? view?.asset?.id,
    requesterId: project.ownerId,
    fundingRecords,
    treasuryExposures,
    debentures,
    revenueRecords,
    riskTier: project.riskTier,
    status: project.status,
    financialRequired: fundingRecords.length > 0 || treasuryExposures.length > 0 || debentures.length > 0 || revenueRecords.length > 0,
    treasuryRequired: treasuryExposures.length > 0,
    fundingRequired: fundingRecords.length > 0,
    debentureRequired: debentures.length > 0 || fundingRecords.some((record) => record.fundingType === FundingType.DEBENTURE || record.debentureId),
    revenueRequired: revenueRecords.length > 0
  };
};

export const requiresFinancialBridge = (entityId: BusinessId): boolean =>
  resolveEntity(entityId)?.financialRequired ?? false;

const projectIdForAdapter = (entity: ResolvedFinancialEntity): BusinessId =>
  entity.projectId ?? `mock-project-${entity.entityId}`;

const primaryFunding = (entity: ResolvedFinancialEntity): FundingRecord | undefined => entity.fundingRecords[0];
const primaryTreasuryExposure = (entity: ResolvedFinancialEntity): TreasuryExposure | undefined => entity.treasuryExposures[0];
const primaryDebenture = (entity: ResolvedFinancialEntity): DebentureRecord | undefined => entity.debentures[0];
const primaryRevenue = (entity: ResolvedFinancialEntity): RevenueRecord | undefined => entity.revenueRecords[0];

const financialBlockers = (entity: ResolvedFinancialEntity): BusinessFinancialBridgeBlocker[] => {
  const blockers: BusinessFinancialBridgeBlocker[] = [];
  const projectId = projectIdForAdapter(entity);
  for (const exposure of entity.treasuryExposures) {
    const limit = treasuryAdapter.getTreasuryExposureLimit(exposure.riskTier);
    if (exposure.requestedAmount > limit.exposureLimit) {
      blockers.push({
        blockerId: `financial-blocker-${exposure.id}-limit`,
        entityId: entity.entityId,
        message: `Treasury request ${exposure.requestedAmount} ${exposure.currency} exceeds mock exposure limit ${limit.exposureLimit} ${limit.currency}.`,
        severity: "CRITICAL",
        blocking: true,
        source: "TREASURY",
        mock: true,
        readOnly: true
      });
    }
  }
  for (const restriction of treasuryAdapter.getTreasuryRestrictions(projectId).filter((entry) => entry.severity === "CRITICAL")) {
    blockers.push({
      blockerId: `financial-blocker-${restriction.id}`,
      entityId: entity.entityId,
      message: restriction.restriction,
      severity: "CRITICAL",
      blocking: true,
      source: "TREASURY",
      mock: true,
      readOnly: true
    });
  }
  for (const debenture of entity.debentures) {
    const issueDecision = debentureAdapter.canIssueDebenture(debenture.projectId);
    if (!issueDecision.eligible) {
      blockers.push({
        blockerId: `financial-blocker-${debenture.id}-issuance-disabled`,
        entityId: entity.entityId,
        message: issueDecision.reason,
        severity: "WARNING",
        blocking: false,
        source: "DEBENTURE",
        mock: true,
        readOnly: true
      });
    }
  }
  return blockers;
};

export const createTreasuryReadinessPackage = (entityId: BusinessId): BusinessTreasuryReadinessPackage | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const exposure = primaryTreasuryExposure(entity);
  const projectId = projectIdForAdapter(entity);
  const riskTier = exposure?.riskTier ?? entity.riskTier;
  const exposureLimit = riskTier ? treasuryAdapter.getTreasuryExposureLimit(riskTier) : undefined;
  const requestedAmount = exposure?.requestedAmount ?? 0;
  const blockers = financialBlockers(entity).filter((blocker) => blocker.source === "TREASURY");
  const restrictions = treasuryAdapter.getTreasuryRestrictions(projectId);

  return {
    packageId: `finance-treasury-package-${entity.entityId}`,
    entityId,
    entityType: entity.entityType,
    projectId: entity.projectId,
    assetId: entity.assetId ?? exposure?.assetId,
    requestedAmount,
    approvedAmountMock: exposure?.approvedAmount ?? 0,
    consumedAmountMock: exposure?.consumedAmount ?? 0,
    currency: exposure?.currency ?? "USD",
    riskTier,
    exposureType: exposure?.exposureType,
    treasuryRestrictions: restrictions,
    governanceReference: exposure?.governanceReference,
    milestoneFundingRequired: entity.fundingRecords.some((record) => record.status === "TREASURY_ANALYSIS" || record.status === "APPROVAL"),
    repaymentModel: exposure?.repaymentModel ?? "No repayment model in current mock entity.",
    expectedReturn: exposure?.expectedReturn ?? "No expected return in current mock entity.",
    allocationDecision: treasuryAdapter.canAllocateTreasury(projectId, requestedAmount),
    consumptionDecision: treasuryAdapter.canConsumeTreasury(projectId, exposure?.consumedAmount ?? 0),
    exposureLimit,
    status: exposure ? treasuryAdapter.getTreasuryAllocationStatus(projectId) : "NO_EXPOSURE",
    blockers,
    warnings: [
      ...restrictions.map((restriction) => restriction.restriction),
      "Treasury package is readiness-only; allocation and consumption remain disabled."
    ],
    nonExecutionGuarantee: BUSINESS_FINANCIAL_BRIDGE_NON_EXECUTION_GUARANTEE,
    mock: true,
    readOnly: true
  };
};

export const createFundingReadinessPackage = (entityId: BusinessId): BusinessFundingReadinessPackage | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const funding = primaryFunding(entity);
  const projectId = projectIdForAdapter(entity);
  const fundingType = funding?.fundingType ?? FundingType.HYBRID;

  return {
    packageId: `finance-funding-package-${entity.entityId}`,
    entityId,
    entityType: entity.entityType,
    fundingId: funding?.id,
    projectId: entity.projectId,
    assetId: entity.assetId ?? funding?.assetId,
    fundingType: funding?.fundingType,
    fundingStatus: funding?.status,
    targetAmount: funding?.targetAmount ?? 0,
    raisedAmountMock: funding?.raisedAmount ?? 0,
    currency: funding?.currency ?? "USD",
    issuerId: funding?.issuerId,
    fundingEligibility: financialAdapter.validateFundingModel(projectId, fundingType),
    operationalCostProfile: financialAdapter.getOperationalCostProfile(projectId),
    treasuryExposureId: funding?.treasuryExposureId,
    debentureId: funding?.debentureId,
    blockers: financialBlockers(entity).filter((blocker) => blocker.source === "FUNDING"),
    warnings: ["Funding package is mock/read-only and cannot approve or release capital."],
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const createDebentureReadinessPackage = (entityId: BusinessId): BusinessDebentureReadinessPackage | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const debenture = primaryDebenture(entity);
  const projectId = debenture?.projectId ?? projectIdForAdapter(entity);
  const eligibilityStatus = debentureAdapter.getDebentureEligibility(projectId);
  const riskProfile = getDebentureRiskProfile(projectId);

  return {
    packageId: `finance-debenture-package-${entity.entityId}`,
    debentureId: debenture?.id,
    projectId: entity.projectId ?? debenture?.projectId,
    issuerId: debenture?.issuerId,
    debentureType: debenture?.debentureType,
    convertible: debenture?.convertible ?? false,
    targetAmount: debenture?.targetAmount ?? 0,
    raisedAmountMock: debenture?.raisedAmount ?? 0,
    currency: debenture?.currency ?? "USD",
    aprModel: debenture?.aprModel ?? "No APR model in current mock entity.",
    maturityDate: debenture?.maturityDate,
    repaymentSource: debenture?.repaymentSource,
    eligibilityStatus,
    riskProfile,
    requiredGovernanceReview: true,
    requiredTreasuryReview: Boolean(debenture),
    requiredIdentityReview: true,
    blockers: financialBlockers(entity).filter((blocker) => blocker.source === "DEBENTURE"),
    warnings: ["Debenture package is planning-only; issuance, purchase, APR payment and conversion remain disabled."],
    simulationOnly: true,
    externalSideEffects: false,
    mock: true,
    readOnly: true
  };
};

export const createRevenueRoutingReadinessPackage = (entityId: BusinessId): BusinessRevenueRoutingReadinessPackage | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const revenue = primaryRevenue(entity);

  return {
    packageId: `finance-revenue-package-${entity.entityId}`,
    entityId,
    assetId: entity.assetId ?? revenue?.assetId,
    projectId: entity.projectId ?? revenue?.projectId,
    revenueSource: revenue?.source,
    grossAmountMock: revenue?.grossAmount ?? 0,
    netAmountMock: revenue?.netAmount ?? 0,
    treasuryShare: revenue?.treasuryShare ?? 0,
    daoShare: revenue?.daoShare ?? 0,
    builderShare: revenue?.builderShare ?? 0,
    maintainerShare: revenue?.maintainerShare ?? 0,
    debentureShare: revenue?.debentureShare ?? 0,
    reserveShare: revenue?.reserveShare ?? 0,
    routingStatus: revenue?.status,
    settlementReadiness: revenue ? financialAdapter.getSettlementStatus(revenue.id) : "UNKNOWN_RECORD",
    blockedActions: ["DISTRIBUTE_REVENUE", "EXECUTE_SETTLEMENT", "PAY_APR", "CALL_CONTRACT"],
    nonExecutionGuarantee: BUSINESS_FINANCIAL_BRIDGE_NON_EXECUTION_GUARANTEE,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const getFinancialRiskSnapshot = (entityId: BusinessId): BusinessFinancialRiskSnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const exposureAmount = entity.treasuryExposures.reduce((total, exposure) => total + exposure.approvedAmount + Math.max(exposure.requestedAmount - exposure.approvedAmount, 0), 0);
  const fundingTargetAmount = entity.fundingRecords.reduce((total, funding) => total + funding.targetAmount, 0);
  const debentureTargetAmount = entity.debentures.reduce((total, debenture) => total + debenture.targetAmount, 0);
  const revenueNetAmount = entity.revenueRecords.reduce((total, revenue) => total + revenue.netAmount, 0);
  const riskTier = entity.riskTier ?? primaryTreasuryExposure(entity)?.riskTier;

  return {
    entityId,
    projectId: entity.projectId,
    assetId: entity.assetId,
    riskTier,
    treasuryExposureAmount: exposureAmount,
    fundingTargetAmount,
    debentureTargetAmount,
    revenueNetAmount,
    exposureLimit: riskTier ? treasuryAdapter.getTreasuryExposureLimit(riskTier) : undefined,
    blockedFinancialActions: [...BUSINESS_FINANCIAL_BRIDGE_BLOCKED_ACTIONS],
    riskNotes: [
      entity.treasuryRequired ? "Treasury exposure must remain visible before future allocation review." : "No treasury exposure attached to this entity.",
      entity.debentureRequired ? "Debenture planning requires governance, treasury and identity review." : "No debenture context attached to this entity.",
      entity.revenueRequired ? "Revenue routing is visible only and cannot distribute funds." : "No revenue routing context attached to this entity."
    ],
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const getSettlementReadinessSnapshot = (entityId: BusinessId): BusinessSettlementReadinessSnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const settlementStatuses = entity.revenueRecords.map((record) => ({
    revenueId: record.id,
    status: financialAdapter.getSettlementStatus(record.id)
  }));

  return {
    entityId,
    projectId: entity.projectId,
    revenueRecordIds: entity.revenueRecords.map((record) => record.id),
    settlementStatuses,
    settlementReady: settlementStatuses.length > 0 && settlementStatuses.every((entry) => entry.status === "MOCK_SETTLEMENT_VISIBLE"),
    blockedActions: ["EXECUTE_SETTLEMENT", "DISTRIBUTE_REVENUE", "CALL_CONTRACT"],
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const getFinancialBridgeBlockers = (entityId: BusinessId): BusinessFinancialBridgeBlocker[] =>
  resolveEntity(entityId) ? financialBlockers(resolveEntity(entityId) as ResolvedFinancialEntity) : [];

const requiredFinancialActionsFor = (entity: ResolvedFinancialEntity): string[] => {
  const actions = ["BUSINESS_FINANCIAL_REVIEW"];
  if (entity.treasuryRequired) actions.push("TREASURY_READINESS_REVIEW");
  if (entity.fundingRequired) actions.push("FUNDING_ELIGIBILITY_REVIEW");
  if (entity.debentureRequired) actions.push("DEBENTURE_PLANNING_REVIEW");
  if (entity.revenueRequired) actions.push("REVENUE_ROUTING_REVIEW", "SETTLEMENT_READINESS_REVIEW");
  return [...new Set(actions)];
};

export const getFinancialBridgeStatus = (entityId: BusinessId): BusinessFinancialBridgeStatus => {
  const entity = resolveEntity(entityId);
  if (!entity) return "ARCHIVED";
  if (!entity.financialRequired) return "NOT_REQUIRED";
  if (financialBlockers(entity).some((blocker) => blocker.blocking)) return "BLOCKED_BY_FINANCIAL_REQUIREMENTS";
  if (entity.debentureRequired) return "DEBENTURE_REVIEW_REQUIRED";
  if (entity.treasuryRequired) return "TREASURY_REVIEW_REQUIRED";
  if (entity.fundingRequired) return "FUNDING_REVIEW_REQUIRED";
  if (entity.revenueRequired) return "REVENUE_REVIEW_REQUIRED";
  return "READY_FOR_FINANCIAL_REVIEW";
};

export const createFinancialReadinessPackage = (entityId: BusinessId): BusinessFinancialBridgePackage | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const treasuryPackage = createTreasuryReadinessPackage(entityId);
  const fundingPackage = createFundingReadinessPackage(entityId);
  const debenturePackage = createDebentureReadinessPackage(entityId);
  const revenuePackage = createRevenueRoutingReadinessPackage(entityId);
  const riskSnapshot = getFinancialRiskSnapshot(entityId);
  const settlementReadiness = getSettlementReadinessSnapshot(entityId);
  if (!riskSnapshot || !settlementReadiness) return undefined;
  const blockers = financialBlockers(entity);
  const bridgeStatus = getFinancialBridgeStatus(entityId);

  return {
    packageId: `finance-package-${entity.entityId}`,
    entityId,
    entityType: entity.entityType,
    projectId: entity.projectId,
    assetId: entity.assetId,
    requesterId: entity.requesterId,
    bridgeStatus,
    treasuryPackage,
    fundingPackage,
    debenturePackage,
    revenuePackage,
    riskSnapshot,
    settlementReadiness,
    blockers,
    warnings: [
      "Financial bridge is mock/read-only and cannot execute treasury, debenture, revenue, settlement, swap or contract actions.",
      ...riskSnapshot.riskNotes
    ],
    requiredFinancialActions: requiredFinancialActionsFor(entity),
    blockedActions: [...BUSINESS_FINANCIAL_BRIDGE_BLOCKED_ACTIONS],
    nextRecommendedStep: blockers.some((blocker) => blocker.blocking)
      ? "Resolve financial blockers before preparing any future real financial handoff."
      : entity.financialRequired
        ? "Financial package is ready for future review integration; no financial action is executed in this runtime."
        : "Financial bridge is not required; keep financial visibility monitored.",
    nonExecutionGuarantee: BUSINESS_FINANCIAL_BRIDGE_NON_EXECUTION_GUARANTEE,
    createdAt: now(),
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const createFinancialHandoffReceipt = (entityId: BusinessId): BusinessFinancialHandoffReceipt | undefined => {
  const pkg = createFinancialReadinessPackage(entityId);
  if (!pkg) return undefined;

  return {
    handoffReceiptId: `finance-handoff-${entityId}`,
    packageId: pkg.packageId,
    entityId,
    entityType: pkg.entityType,
    financialBridgeStatus: pkg.blockers.some((blocker) => blocker.blocking) ? "BLOCKED_BY_FINANCIAL_REQUIREMENTS" : "HANDOFF_PREPARED",
    requiredFinancialActions: pkg.requiredFinancialActions,
    blockedActions: pkg.blockedActions,
    treasurySnapshot: pkg.treasuryPackage,
    fundingSnapshot: pkg.fundingPackage,
    debentureSnapshot: pkg.debenturePackage,
    revenueSnapshot: pkg.revenuePackage,
    permissionSnapshot: getPermissionForAction(pkg.requesterId, "PREPARE_FUNDING_REVIEW"),
    capabilitySnapshot: getRequiredCapabilitiesForAction("PREPARE_FUNDING_REVIEW"),
    executionPolicy: getExecutionPolicy("PREPARE_FUNDING_REVIEW"),
    auditReference: `audit-${pkg.packageId}-handoff-prepared`,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const getFinancialBridgeSummary = (): BusinessFinancialBridgeSummary => {
  const registry = createBusinessRegistry();
  const entityIds = [
    ...listDraftStoreRecords().map((record) => record.id),
    ...registry.indexes.projectsById.keys(),
    ...registry.indexes.assetsById.keys(),
    ...registry.indexes.fundingById.keys(),
    ...registry.indexes.treasuryExposuresById.keys(),
    ...registry.indexes.debenturesById.keys(),
    ...registry.indexes.revenueById.keys()
  ];
  const packages = entityIds
    .map((entityId) => createFinancialReadinessPackage(entityId))
    .filter((pkg): pkg is BusinessFinancialBridgePackage => Boolean(pkg));

  return {
    totalEntities: packages.length,
    financialReviewRequired: packages.filter((pkg) => pkg.bridgeStatus !== "NOT_REQUIRED").length,
    treasuryReviewRequired: packages.filter((pkg) => Boolean(pkg.treasuryPackage?.requestedAmount)).length,
    fundingReviewRequired: packages.filter((pkg) => Boolean(pkg.fundingPackage?.targetAmount)).length,
    debentureReviewRequired: packages.filter((pkg) => Boolean(pkg.debenturePackage?.debentureId || pkg.debenturePackage?.targetAmount)).length,
    revenueReviewRequired: packages.filter((pkg) => Boolean(pkg.revenuePackage?.netAmountMock)).length,
    readyForFinancialReview: packages.filter((pkg) => pkg.bridgeStatus !== "NOT_REQUIRED" && !pkg.blockers.some((blocker) => blocker.blocking)).length,
    blockedByFinancialRequirements: packages.filter((pkg) => pkg.blockers.some((blocker) => blocker.blocking)).length,
    handoffPrepared: packages.filter((pkg) => pkg.bridgeStatus !== "NOT_REQUIRED" && !pkg.blockers.some((blocker) => blocker.blocking)).length,
    waitingForRealFinancialIntegration: packages.filter((pkg) => pkg.bridgeStatus !== "NOT_REQUIRED").length,
    blockerCount: packages.reduce((total, pkg) => total + pkg.blockers.length, 0),
    externalExecutionCount: 0,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};
