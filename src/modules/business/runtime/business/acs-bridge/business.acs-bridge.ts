import { getRequiredCapabilitiesForAction } from "../capabilities/business.capabilities.js";
import { acsAdapter } from "../adapters/acs.adapter.js";
import { getDraftStoreRecordById, listDraftStoreRecords } from "../drafts/business.draft-store.js";
import type { BusinessDraftStoreRecord } from "../drafts/business.draft-types.js";
import { getPermissionForAction } from "../permissions/business.permissions.js";
import { getExecutionPolicy, type BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import { createBusinessRegistry } from "../registry/business.registry.js";
import { getProjectRegistryView } from "../registry/business.registry-selectors.js";
import { ACSIsolationProfile, ACSRuntimeStatus, ACSRuntimeType } from "../types/business.enums.js";
import type {
  ACSOrchestrationReceipt,
  ACSRuntime,
  BusinessId,
  BusinessProject,
  TelemetryProfile
} from "../types/business.types.js";
import { getWorkflowForProject, getWorkflowTemplate } from "../workflows/business.workflow-selectors.js";
import type { BusinessWorkflowTemplate } from "../workflows/business.workflow-types.js";
import type {
  BusinessACSBridgeBlocker,
  BusinessACSBridgeRequest,
  BusinessACSBridgeStatus,
  BusinessACSBridgeSummary,
  BusinessACSComputeSnapshot,
  BusinessACSHandoffReceipt,
  BusinessACSHumanReviewSnapshot,
  BusinessACSIsolationSnapshot,
  BusinessACSPermissionSnapshot,
  BusinessACSProvisioningPlan,
  BusinessACSReadinessPackage
} from "./business.acs-bridge-types.js";

export const BUSINESS_ACS_BRIDGE_NON_EXECUTION_GUARANTEE =
  "Mock ACS bridge only: no MCP provisioning, real agent start, workflow execution, memory access, permission escalation, deployment, tenant data access or external ACS service call is executed.";

export const BUSINESS_ACS_BRIDGE_BLOCKED_ACTIONS = [
  "PROVISION_MCP_REAL",
  "START_AGENT_REAL",
  "DEPLOY_ACS_RUNTIME",
  "EXECUTE_WORKFLOW",
  "ACCESS_MEMORY",
  "ESCALATE_PERMISSIONS",
  "BYPASS_HUMAN_REVIEW",
  "READ_PRIVATE_TENANT_DATA",
  "CROSS_TENANT_ACCESS",
  "CALL_EXTERNAL_ACS_SERVICE"
] as const;

interface ResolvedACSEntity {
  entityId: BusinessId;
  entityType: BusinessACSBridgeRequest["entityType"];
  draft?: BusinessDraftStoreRecord;
  project?: BusinessProject;
  projectId?: BusinessId;
  assetId?: BusinessId;
  requesterId: BusinessId;
  runtime?: ACSRuntime;
  acsRuntimes: ACSRuntime[];
  receipts: ACSOrchestrationReceipt[];
  runtimeType?: ACSRuntimeType;
  isolationProfile?: ACSIsolationProfile;
  permissionProfile: string[];
  telemetryProfile?: TelemetryProfile;
  computeProfile?: ACSRuntime["computeProfile"];
  workflowObjective: string;
  deploymentScope: BusinessACSProvisioningPlan["deploymentScope"];
  status?: string;
  acsRequired: boolean;
  humanReviewRequired: boolean;
}

const resolveDraftRequester = (record: BusinessDraftStoreRecord): BusinessId =>
  record.draft.requesterIdentityId
  ?? String(record.draft.values.requesterIdentity ?? record.draft.values.daoIdentity ?? "id-axodus-core");

const draftRuntimeType = (record: BusinessDraftStoreRecord): ACSRuntimeType | undefined => {
  const requestedType = record.draft.values.acsRuntimeType;
  if (typeof requestedType === "string" && requestedType in ACSRuntimeType) {
    return ACSRuntimeType[requestedType as keyof typeof ACSRuntimeType];
  }
  if (record.draft.draftType === "ACS_SERVICE_REQUEST") return ACSRuntimeType.ENTERPRISE_ACS_RUNTIME;
  if (record.preview.runtimeReview.acsRequirement) return ACSRuntimeType.TELEMETRY_ASSISTANT;
  return undefined;
};

const draftIsolationProfile = (record: BusinessDraftStoreRecord): ACSIsolationProfile | undefined => {
  const profile = record.draft.values.isolationProfile;
  if (typeof profile === "string") {
    if (profile.includes("DEDICATED")) return ACSIsolationProfile.DEDICATED;
    if (profile.includes("SOVEREIGN")) return ACSIsolationProfile.SOVEREIGN;
    if (profile.includes("SCOPED") || profile.includes("TENANT")) return ACSIsolationProfile.SCOPED;
    if (profile in ACSIsolationProfile) return ACSIsolationProfile[profile as keyof typeof ACSIsolationProfile];
  }
  return record.preview.runtimeReview.acsRequirement ? ACSIsolationProfile.SCOPED : undefined;
};

const draftPermissionProfile = (record: BusinessDraftStoreRecord): string[] => {
  const permission = record.draft.values.permissionProfile;
  const permissions = typeof permission === "string" ? [permission] : [];
  return [...new Set([...permissions, "NO_PROVISIONING", "NO_EXECUTION"])];
};

const draftDeploymentScope = (record: BusinessDraftStoreRecord): BusinessACSProvisioningPlan["deploymentScope"] => {
  const scope = String(record.draft.values.operatingScope ?? record.draft.values.enterpriseOrDaoScope ?? record.draft.values.requesterType ?? "").toUpperCase();
  if (scope.includes("DAO")) return "DAO";
  if (scope.includes("ENTERPRISE")) return "ENTERPRISE";
  return record.draft.draftType === "ACS_SERVICE_REQUEST" ? "ENTERPRISE" : "PROJECT";
};

const resolveEntity = (entityId: BusinessId): ResolvedACSEntity | undefined => {
  const draft = getDraftStoreRecordById(entityId);
  if (draft && draft.status !== "DISCARDED") {
    const runtimeType = draftRuntimeType(draft);
    const isolationProfile = draftIsolationProfile(draft);
    const permissionProfile = draftPermissionProfile(draft);
    return {
      entityId,
      entityType: "DRAFT",
      draft,
      projectId: `mock-project-${draft.id}`,
      requesterId: resolveDraftRequester(draft),
      acsRuntimes: [],
      receipts: [],
      runtimeType,
      isolationProfile,
      permissionProfile,
      workflowObjective: String(draft.draft.values.workflowObjective ?? draft.draft.values.telemetryRequirements ?? "Prepare ACS service request for future review."),
      deploymentScope: draftDeploymentScope(draft),
      status: draft.status,
      acsRequired: draft.preview.runtimeReview.acsRequirement || draft.draft.draftType === "ACS_SERVICE_REQUEST",
      humanReviewRequired: Boolean(draft.draft.values.humanReviewRequirement ?? draft.preview.runtimeReview.executionReview.policy.humanReviewRequired)
    };
  }

  const registry = createBusinessRegistry();
  const runtime = registry.indexes.acsRuntimesById.get(entityId);
  const project = registry.indexes.projectsById.get(entityId)
    ?? (runtime ? registry.indexes.projectsById.get(runtime.relatedProjectId) : undefined)
    ?? (registry.indexes.assetsById.get(entityId) ? registry.indexes.projectsById.get(registry.indexes.assetsById.get(entityId)?.projectId ?? "") : undefined)
    ?? (registry.indexes.requestsById.get(entityId) ? [...registry.indexes.projectsById.values()].find((entry) => entry.requestId === entityId) : undefined);

  if (!project && !runtime) return undefined;

  const projectId = project?.id ?? runtime?.relatedProjectId;
  const view = projectId ? getProjectRegistryView(projectId) : undefined;
  const entityRuntime = runtime ?? view?.acsRuntimes[0];
  const asset = registry.indexes.assetsById.get(entityId);
  const request = registry.indexes.requestsById.get(entityId);
  const entityType: ResolvedACSEntity["entityType"] =
    runtime ? "ACS_RUNTIME" : project && entityId === project.id ? "PROJECT" : asset ? "ASSET" : request ? "REQUEST" : "PROJECT";

  return {
    entityId,
    entityType,
    project,
    projectId,
    assetId: asset?.id ?? view?.asset?.id,
    requesterId: entityRuntime?.ownerId ?? project?.ownerId ?? "id-axodus-core",
    runtime: entityRuntime,
    acsRuntimes: runtime ? [runtime] : view?.acsRuntimes ?? [],
    receipts: view?.acsReceipts ?? (projectId ? acsAdapter.getOrchestrationReceipts(projectId) : []),
    runtimeType: entityRuntime?.runtimeType,
    isolationProfile: entityRuntime?.isolationProfile,
    permissionProfile: entityRuntime?.permissionProfile ?? ["NO_PROVISIONING", "NO_EXECUTION"],
    telemetryProfile: entityRuntime?.telemetryProfile,
    computeProfile: entityRuntime?.computeProfile,
    workflowObjective: project?.title ?? "Prepare ACS runtime support for future review.",
    deploymentScope: entityRuntime?.runtimeType === ACSRuntimeType.DAO_ACS_RUNTIME ? "DAO" : entityRuntime?.runtimeType === ACSRuntimeType.ENTERPRISE_ACS_RUNTIME ? "ENTERPRISE" : "PROJECT",
    status: entityRuntime?.status ?? project?.status,
    acsRequired: Boolean(entityRuntime || view?.acsRuntimes.length || project?.projectType === "ENTERPRISE_ACS"),
    humanReviewRequired: Boolean(entityRuntime?.status === ACSRuntimeStatus.REQUESTED || view?.acsReceipts.some((receipt) => receipt.humanReviewRequired))
  };
};

export const requiresACSBridge = (entityId: BusinessId): boolean =>
  resolveEntity(entityId)?.acsRequired ?? false;

const runtimeIdFor = (entity: ResolvedACSEntity): BusinessId | undefined => entity.runtime?.id ?? entity.acsRuntimes[0]?.id;

const acsBlockers = (entity: ResolvedACSEntity): BusinessACSBridgeBlocker[] => {
  const blockers: BusinessACSBridgeBlocker[] = [];
  if (entity.acsRequired && !entity.runtimeType) {
    blockers.push({
      blockerId: `acs-blocker-${entity.entityId}-runtime-type`,
      entityId: entity.entityId,
      message: "ACS runtime type is required before any future ACS handoff.",
      severity: "WARNING",
      blocking: false,
      source: "ACS",
      mock: true,
      readOnly: true
    });
  }
  if (entity.acsRequired && !entity.isolationProfile) {
    blockers.push({
      blockerId: `acs-blocker-${entity.entityId}-isolation`,
      entityId: entity.entityId,
      message: "ACS isolation profile is required before future provisioning review.",
      severity: "CRITICAL",
      blocking: true,
      source: "ISOLATION",
      mock: true,
      readOnly: true
    });
  }
  if (entity.permissionProfile.some((permission) => permission.includes("EXECUTION")) && !entity.permissionProfile.includes("NO_EXECUTION")) {
    blockers.push({
      blockerId: `acs-blocker-${entity.entityId}-permission`,
      entityId: entity.entityId,
      message: "Permission profile must explicitly keep autonomous execution disabled.",
      severity: "CRITICAL",
      blocking: true,
      source: "PERMISSION",
      mock: true,
      readOnly: true
    });
  }
  if (entity.runtime?.isolationProfile === ACSIsolationProfile.SHARED && entity.deploymentScope !== "INTERNAL") {
    blockers.push({
      blockerId: `acs-blocker-${entity.entityId}-shared-boundary`,
      entityId: entity.entityId,
      message: "Shared ACS boundary requires isolation review for non-internal runtime support.",
      severity: "WARNING",
      blocking: false,
      source: "ISOLATION",
      mock: true,
      readOnly: true
    });
  }
  return blockers;
};

const memoryScopeFor = (entity: ResolvedACSEntity): string => {
  const runtimeId = runtimeIdFor(entity);
  if (runtimeId) return acsAdapter.getACSIsolationProfile(runtimeId)?.memoryBoundary ?? "PROJECT_SCOPED";
  if (entity.isolationProfile === ACSIsolationProfile.DEDICATED || entity.isolationProfile === ACSIsolationProfile.SOVEREIGN) return "TENANT_SCOPED";
  return String(entity.draft?.draft.values.memoryScope ?? "PROJECT_SCOPED");
};

export const getACSIsolationSnapshot = (entityId: BusinessId): BusinessACSIsolationSnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const runtimeId = runtimeIdFor(entity);
  const isolationPolicy = runtimeId ? acsAdapter.getACSIsolationProfile(runtimeId) : undefined;

  return {
    entityId,
    runtimeId,
    isolationProfile: entity.isolationProfile,
    isolationPolicy,
    tenantBoundary: isolationPolicy?.tenantBoundary ?? entity.isolationProfile ?? "UNKNOWN",
    memoryBoundary: isolationPolicy?.memoryBoundary ?? memoryScopeFor(entity),
    crossTenantAccessAllowed: false,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const getACSPermissionSnapshot = (entityId: BusinessId): BusinessACSPermissionSnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const runtimeId = runtimeIdFor(entity);
  const permissionPolicy = runtimeId ? acsAdapter.getACSPermissionProfile(runtimeId) : undefined;

  return {
    entityId,
    runtimeId,
    permissionProfile: permissionPolicy?.permissions ?? entity.permissionProfile,
    permissionPolicy,
    autonomousExecutionAllowed: false,
    escalationAllowed: false,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const getACSComputeSnapshot = (entityId: BusinessId): BusinessACSComputeSnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const runtimeId = runtimeIdFor(entity);
  const computeUsage = runtimeId ? acsAdapter.getComputeUsage(runtimeId) : undefined;

  return {
    entityId,
    runtimeId,
    computeUsage,
    cpuUnits: computeUsage?.cpuUnits ?? entity.computeProfile?.mockCpuUnits ?? 0,
    memoryMb: computeUsage?.memoryMb ?? entity.computeProfile?.mockMemoryMb ?? 0,
    monthlyBudgetAmount: computeUsage?.monthlyBudget.amount ?? entity.computeProfile?.mockMonthlyBudget.amount ?? 0,
    currency: computeUsage?.monthlyBudget.currency ?? entity.computeProfile?.mockMonthlyBudget.currency ?? "USD",
    allocationExecutable: false,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

const acsActions: BusinessRuntimeAction[] = ["PREPARE_ACS_PROVISIONING_REQUEST", "VIEW_ACS_RUNTIME", "PROVISION_ACS_RUNTIME"];

export const getACSHumanReviewSnapshot = (entityId: BusinessId): BusinessACSHumanReviewSnapshot | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const requirements = acsActions.map((action) => acsAdapter.requiresHumanReview(action));

  return {
    entityId,
    required: entity.humanReviewRequired || requirements.some((entry) => entry.required),
    requirements,
    gates: [
      "ACS_ISOLATION_REVIEW",
      "ACS_PERMISSION_REVIEW",
      "HUMAN_REVIEW_REQUIRED",
      "NO_REAL_PROVISIONING"
    ],
    bypassAllowed: false,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

const workflowTemplatesFor = (entity: ResolvedACSEntity): BusinessWorkflowTemplate[] => {
  const workflow = entity.projectId ? getWorkflowForProject(entity.projectId) : undefined;
  const template = entity.draft?.preview.runtimeReview.workflowTemplate ?? (workflow ? getWorkflowTemplate(workflow.workflowType) : undefined);
  return template ? [template] : [];
};

export const createACSReadinessPackage = (entityId: BusinessId): BusinessACSReadinessPackage | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;
  const runtimeId = runtimeIdFor(entity);
  const blockers = acsBlockers(entity);
  const humanReview = getACSHumanReviewSnapshot(entityId);
  const isolation = getACSIsolationSnapshot(entityId);

  return {
    packageId: `acs-package-${entity.entityId}`,
    entityId,
    entityType: entity.entityType,
    draftId: entity.draft?.id,
    projectId: entity.projectId,
    requesterId: entity.requesterId,
    acsRequired: entity.acsRequired,
    runtimeType: entity.runtimeType,
    isolationProfile: entity.isolationProfile,
    permissionProfile: entity.permissionProfile,
    memoryScope: isolation?.memoryBoundary ?? memoryScopeFor(entity),
    computeProfile: entity.computeProfile,
    humanReviewRequired: humanReview?.required ?? entity.humanReviewRequired,
    workflowObjective: entity.workflowObjective,
    telemetryProfile: entity.telemetryProfile,
    orchestrationReceipts: entity.projectId ? acsAdapter.getOrchestrationReceipts(entity.projectId) : entity.receipts,
    securityRestrictions: [
      "NO_REAL_MCP_PROVISIONING",
      "NO_REAL_AGENT_START",
      "NO_MEMORY_ACCESS",
      "NO_PERMISSION_ESCALATION",
      "NO_CROSS_TENANT_ACCESS",
      runtimeId ? `RUNTIME_VISIBLE_ONLY:${runtimeId}` : "NO_RUNTIME_BOUND"
    ],
    blockers,
    warnings: [
      "ACS bridge is mock/read-only and cannot provision MCP, start agents, access memory or execute workflows.",
      entity.acsRequired ? "ACS support requires future human review before any real integration." : "ACS bridge is not required for this entity."
    ],
    nextRecommendedStep: blockers.some((blocker) => blocker.blocking)
      ? "Resolve ACS blockers before preparing any future real ACS handoff."
      : entity.acsRequired
        ? "ACS package is ready for future review integration; no ACS provisioning is executed in this runtime."
        : "ACS bridge is not required; keep runtime visibility monitored.",
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const createACSProvisioningPlan = (entityId: BusinessId): BusinessACSProvisioningPlan | undefined => {
  const entity = resolveEntity(entityId);
  if (!entity) return undefined;

  return {
    planId: `acs-plan-${entity.entityId}`,
    entityId,
    runtimeType: entity.runtimeType,
    deploymentScope: entity.deploymentScope,
    isolationProfile: entity.isolationProfile,
    memoryScope: memoryScopeFor(entity),
    permissionProfile: entity.permissionProfile,
    computeProfile: entity.computeProfile,
    workflowTemplates: workflowTemplatesFor(entity),
    expectedAgents: [
      entity.runtimeType === ACSRuntimeType.TELEMETRY_ASSISTANT ? "telemetry-assistant" : "acs-review-assistant",
      entity.deploymentScope === "ENTERPRISE" ? "enterprise-boundary-reviewer" : "runtime-readiness-reviewer"
    ],
    humanReviewGates: getACSHumanReviewSnapshot(entityId)?.gates ?? [],
    telemetryRequirements: entity.telemetryProfile?.requiredEvents ?? entity.draft?.draft.values.telemetryRequirements ? [String(entity.draft?.draft.values.telemetryRequirements ?? "ACS runtime telemetry")] : ["ACS runtime telemetry"],
    securityBoundaries: [
      "tenant isolation required",
      "memory access disabled",
      "autonomous execution disabled",
      "permission escalation disabled",
      "human review cannot be bypassed"
    ],
    blockedActions: [...BUSINESS_ACS_BRIDGE_BLOCKED_ACTIONS],
    nonExecutionGuarantee: BUSINESS_ACS_BRIDGE_NON_EXECUTION_GUARANTEE,
    mock: true,
    readOnly: true,
    simulationOnly: true
  };
};

export const getACSBridgeBlockers = (entityId: BusinessId): BusinessACSBridgeBlocker[] =>
  resolveEntity(entityId) ? acsBlockers(resolveEntity(entityId) as ResolvedACSEntity) : [];

export const getACSBridgeStatus = (entityId: BusinessId): BusinessACSBridgeStatus => {
  const entity = resolveEntity(entityId);
  if (!entity) return "ARCHIVED";
  if (!entity.acsRequired) return "NOT_REQUIRED";
  if (acsBlockers(entity).some((blocker) => blocker.blocking)) return "BLOCKED_BY_ACS_REQUIREMENTS";
  if (entity.humanReviewRequired) return "HUMAN_REVIEW_REQUIRED";
  if (!entity.runtime) return "ACS_RUNTIME_REQUIRED";
  if (entity.runtime.isolationProfile === ACSIsolationProfile.SHARED) return "ACS_ISOLATION_REQUIRED";
  if (!entity.permissionProfile.includes("NO_EXECUTION")) return "ACS_PERMISSION_REVIEW_REQUIRED";
  return "READY_FOR_ACS_REVIEW";
};

const requiredACSActionsFor = (entity: ResolvedACSEntity): string[] => {
  const actions = ["ACS_READINESS_REVIEW"];
  if (entity.acsRequired) actions.push("ACS_RUNTIME_REVIEW");
  if (entity.isolationProfile) actions.push("ACS_ISOLATION_REVIEW");
  if (entity.permissionProfile.length > 0) actions.push("ACS_PERMISSION_REVIEW");
  if (entity.humanReviewRequired) actions.push("HUMAN_REVIEW_REQUIRED");
  return [...new Set(actions)];
};

export const createACSHandoffReceipt = (entityId: BusinessId): BusinessACSHandoffReceipt | undefined => {
  const pkg = createACSReadinessPackage(entityId);
  const isolationSnapshot = getACSIsolationSnapshot(entityId);
  const permissionSnapshot = getACSPermissionSnapshot(entityId);
  const computeSnapshot = getACSComputeSnapshot(entityId);
  const humanReviewSnapshot = getACSHumanReviewSnapshot(entityId);
  const entity = resolveEntity(entityId);
  if (!pkg || !isolationSnapshot || !permissionSnapshot || !computeSnapshot || !humanReviewSnapshot || !entity) return undefined;

  return {
    handoffReceiptId: `acs-handoff-${entityId}`,
    packageId: pkg.packageId,
    entityId,
    entityType: pkg.entityType,
    acsBridgeStatus: pkg.blockers.some((blocker) => blocker.blocking) ? "BLOCKED_BY_ACS_REQUIREMENTS" : "HANDOFF_PREPARED",
    requiredACSActions: requiredACSActionsFor(entity),
    blockedActions: [...BUSINESS_ACS_BRIDGE_BLOCKED_ACTIONS],
    isolationSnapshot,
    permissionSnapshot,
    computeSnapshot,
    humanReviewSnapshot,
    executionPolicy: getExecutionPolicy("PREPARE_ACS_PROVISIONING_REQUEST"),
    permissionDecision: getPermissionForAction(pkg.requesterId, "PREPARE_ACS_PROVISIONING_REQUEST"),
    capabilitySnapshot: getRequiredCapabilitiesForAction("PREPARE_ACS_PROVISIONING_REQUEST"),
    auditReference: `audit-${pkg.packageId}-handoff-prepared`,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};

export const getACSBridgeSummary = (): BusinessACSBridgeSummary => {
  const registry = createBusinessRegistry();
  const entityIds = [
    ...listDraftStoreRecords().map((record) => record.id),
    ...registry.indexes.projectsById.keys(),
    ...registry.indexes.assetsById.keys(),
    ...registry.indexes.requestsById.keys(),
    ...registry.indexes.acsRuntimesById.keys()
  ];
  const packages = entityIds
    .map((entityId) => createACSReadinessPackage(entityId))
    .filter((pkg): pkg is BusinessACSReadinessPackage => Boolean(pkg));

  return {
    totalEntities: packages.length,
    acsRequired: packages.filter((pkg) => pkg.acsRequired).length,
    runtimeRequired: packages.filter((pkg) => pkg.acsRequired && !pkg.runtimeType).length,
    isolationReviewRequired: packages.filter((pkg) => pkg.isolationProfile === ACSIsolationProfile.SHARED || pkg.blockers.some((blocker) => blocker.source === "ISOLATION")).length,
    permissionReviewRequired: packages.filter((pkg) => pkg.permissionProfile.length > 0).length,
    humanReviewRequired: packages.filter((pkg) => pkg.humanReviewRequired).length,
    readyForACSReview: packages.filter((pkg) => pkg.acsRequired && !pkg.blockers.some((blocker) => blocker.blocking)).length,
    blockedByACSRequirements: packages.filter((pkg) => pkg.blockers.some((blocker) => blocker.blocking)).length,
    handoffPrepared: packages.filter((pkg) => pkg.acsRequired && !pkg.blockers.some((blocker) => blocker.blocking)).length,
    waitingForRealACSIntegration: packages.filter((pkg) => pkg.acsRequired).length,
    blockerCount: packages.reduce((total, pkg) => total + pkg.blockers.length, 0),
    externalExecutionCount: 0,
    mock: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false
  };
};
