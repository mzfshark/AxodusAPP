import { BUSINESS_ROUTE_CATALOG } from "../constants/business.constants.js";
import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { BusinessPermissionMode } from "../permissions/business.permissions.js";
import type { BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import type { BusinessApiHandlerName } from "./business.handlers.js";
import type { BusinessApiExecutionMode } from "./business.response.types.js";

export type BusinessRouteMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface BusinessRouteDefinition {
  id: string;
  method: BusinessRouteMethod;
  path: string;
  apiPath: string;
  domain: keyof typeof BUSINESS_ROUTE_CATALOG;
  description: string;
  handler: BusinessApiHandlerName | "NOT_IMPLEMENTED_READ_ONLY_CONTRACT";
  responseType: string;
  executionMode: BusinessApiExecutionMode;
  futureBackendReady: boolean;
  mockOnly: true;
  readOnly: true;
  simulationOnly: true;
  externalSideEffects: false;
  executionEnabled: false;
  requiredCapability: BusinessCapability;
  permissionMode: BusinessPermissionMode;
  executionPolicy: BusinessRuntimeAction;
  governanceRequirement: boolean;
  treasuryRequirement: boolean;
  acsRequirement: boolean;
  futureIntegrationTarget: "GOVERNANCE" | "TREASURY" | "FINANCIAL_CORE" | "DEBENTURE_ENGINE" | "ACS" | "IDENTITY" | "BUSINESS_API";
  futureRepositoryDependency?: string;
  auditRequirement: boolean;
  snapshotRequirement: boolean;
}

const apiPathFor = (path: string): string => `/api/v1${path}`;

const routeSecurityByDomain = (domain: keyof typeof BUSINESS_ROUTE_CATALOG) => {
  const capabilityByDomain: Partial<Record<keyof typeof BUSINESS_ROUTE_CATALOG, BusinessCapability>> = {
    requests: "SUBMIT_BUSINESS_REQUEST",
    projects: "VIEW_GOVERNANCE_REFERENCES",
    assets: "PREPARE_ASSET_REGISTRATION",
    federation: "VIEW_GOVERNANCE_REFERENCES",
    identities: "VIEW_GOVERNANCE_REFERENCES",
    plugins: "REQUEST_DAO_PLUGIN",
    funding: "PREPARE_PROJECT_FOR_FUNDING",
    debentures: "PREPARE_DEBENTURE_DRAFT",
    treasuryExposure: "VIEW_TREASURY_EXPOSURE",
    revenue: "VIEW_REVENUE_ROUTING",
    acsRuntimes: "VIEW_ACS_RUNTIME",
    acsReceipts: "VIEW_ACS_RUNTIME",
    telemetryEvents: "VIEW_TELEMETRY",
    telemetrySummary: "VIEW_TELEMETRY",
    runtime: "VIEW_TELEMETRY",
    drafts: "SUBMIT_BUSINESS_REQUEST",
    draftStore: "SUBMIT_BUSINESS_REQUEST",
    draftReadiness: "SUBMIT_BUSINESS_REQUEST",
    submissions: "SUBMIT_BUSINESS_REQUEST",
    reviewQueue: "SUBMIT_BUSINESS_REQUEST",
    governanceBridge: "PREPARE_PROJECT_FOR_GOVERNANCE",
    audit: "VIEW_GOVERNANCE_REFERENCES",
    snapshots: "VIEW_GOVERNANCE_REFERENCES"
  };

  const integrationTargetByDomain: Partial<Record<keyof typeof BUSINESS_ROUTE_CATALOG, BusinessRouteDefinition["futureIntegrationTarget"]>> = {
    requests: "BUSINESS_API",
    projects: "BUSINESS_API",
    assets: "BUSINESS_API",
    federation: "GOVERNANCE",
    identities: "IDENTITY",
    plugins: "GOVERNANCE",
    funding: "FINANCIAL_CORE",
    debentures: "DEBENTURE_ENGINE",
    treasuryExposure: "TREASURY",
    revenue: "FINANCIAL_CORE",
    acsRuntimes: "ACS",
    acsReceipts: "ACS",
    telemetryEvents: "BUSINESS_API",
    telemetrySummary: "BUSINESS_API",
    runtime: "BUSINESS_API",
    drafts: "BUSINESS_API",
    draftStore: "BUSINESS_API",
    draftReadiness: "BUSINESS_API",
    submissions: "BUSINESS_API",
    reviewQueue: "BUSINESS_API",
    governanceBridge: "GOVERNANCE",
    audit: "BUSINESS_API",
    snapshots: "BUSINESS_API"
  };

  const executionPolicyByDomain: Partial<Record<keyof typeof BUSINESS_ROUTE_CATALOG, BusinessRuntimeAction>> = {
    requests: "CREATE_BUSINESS_REQUEST",
    projects: "PREPARE_GOVERNANCE_REVIEW",
    assets: "REGISTER_OPERATIONAL_ASSET_DRAFT",
    federation: "PREPARE_GOVERNANCE_REVIEW",
    identities: "VIEW_GOVERNANCE_REFERENCES",
    plugins: "PREPARE_GOVERNANCE_REVIEW",
    funding: "PREPARE_FUNDING_REVIEW",
    debentures: "PREPARE_DEBENTURE_DRAFT",
    treasuryExposure: "VIEW_TREASURY_EXPOSURE",
    revenue: "VIEW_REVENUE_ROUTING",
    acsRuntimes: "VIEW_ACS_RUNTIME",
    acsReceipts: "VIEW_ACS_RUNTIME",
    telemetryEvents: "VIEW_TELEMETRY",
    telemetrySummary: "VIEW_TELEMETRY",
    runtime: "VIEW_TELEMETRY",
    drafts: "CREATE_BUSINESS_REQUEST",
    draftStore: "CREATE_BUSINESS_REQUEST",
    draftReadiness: "CREATE_BUSINESS_REQUEST",
    submissions: "CREATE_BUSINESS_REQUEST",
    reviewQueue: "CREATE_BUSINESS_REQUEST",
    governanceBridge: "PREPARE_GOVERNANCE_REVIEW",
    audit: "VIEW_GOVERNANCE_REFERENCES",
    snapshots: "VIEW_GOVERNANCE_REFERENCES"
  };

  return {
    requiredCapability: capabilityByDomain[domain] ?? "VIEW_TELEMETRY",
    futureIntegrationTarget: integrationTargetByDomain[domain] ?? "BUSINESS_API",
    executionPolicy: executionPolicyByDomain[domain] ?? "VIEW_TELEMETRY",
    governanceRequirement: ["projects", "federation", "plugins", "funding", "debentures", "drafts", "reviewQueue", "governanceBridge", "audit", "snapshots"].includes(domain),
    treasuryRequirement: ["funding", "debentures", "treasuryExposure", "revenue", "submissions", "reviewQueue"].includes(domain),
    acsRequirement: ["acsRuntimes", "acsReceipts", "drafts", "submissions", "snapshots"].includes(domain)
  };
};

const route = (
  id: string,
  method: BusinessRouteMethod,
  domain: keyof typeof BUSINESS_ROUTE_CATALOG,
  description: string,
  handler: BusinessRouteDefinition["handler"],
  responseType: string,
  path?: string
): BusinessRouteDefinition => {
  const routePath = path ?? BUSINESS_ROUTE_CATALOG[domain];
  const routeSecurity = routeSecurityByDomain(domain);
  const mutationRoute = method !== "GET";
  const futureRepositoryDependencyByDomain: Partial<Record<keyof typeof BUSINESS_ROUTE_CATALOG, string>> = {
    drafts: "BusinessDraftRepository",
    draftStore: "BusinessDraftRepository",
    draftReadiness: "BusinessReadinessSnapshotRepository",
    submissions: "BusinessSubmissionRepository",
    reviewQueue: "BusinessReviewQueueRepository",
    governanceBridge: "BusinessAuditRepository",
    audit: "BusinessAuditRepository",
    snapshots: "BusinessSnapshotRepository"
  };

  return {
    id,
    method,
    path: routePath,
    apiPath: apiPathFor(routePath),
    domain,
    description,
    handler,
    responseType,
    executionMode: "MOCK_READ_ONLY",
    futureBackendReady: true,
    mockOnly: true,
    readOnly: true,
    simulationOnly: true,
    externalSideEffects: false,
    executionEnabled: false,
    requiredCapability: routeSecurity.requiredCapability,
    permissionMode: mutationRoute ? "FORBIDDEN" : "VIEW",
    executionPolicy: routeSecurity.executionPolicy,
    governanceRequirement: routeSecurity.governanceRequirement,
    treasuryRequirement: routeSecurity.treasuryRequirement,
    acsRequirement: routeSecurity.acsRequirement,
    futureIntegrationTarget: routeSecurity.futureIntegrationTarget,
    futureRepositoryDependency: futureRepositoryDependencyByDomain[domain],
    auditRequirement: method !== "GET" || ["submissions", "reviewQueue", "governanceBridge", "audit"].includes(domain),
    snapshotRequirement: ["drafts", "draftReadiness", "submissions", "reviewQueue", "governanceBridge", "audit", "snapshots"].includes(domain)
  };
};

export const BUSINESS_ROUTE_DEFINITIONS: BusinessRouteDefinition[] = [
  route("business.overview.get", "GET", "telemetrySummary", "Get Business overview dashboard read model.", "getBusinessOverview", "BusinessDashboardModel", "/business"),
  route("business.requests.list", "GET", "requests", "List Business intake requests.", "getBusinessRequests", "BusinessRequest[]"),
  route("business.requests.detail", "GET", "requests", "Get one Business intake request by id.", "getBusinessRequestById", "BusinessRequest | null", "/business/requests/:requestId"),
  route("business.projects.list", "GET", "projects", "List Business projects.", "getBusinessProjects", "BusinessProject[]"),
  route("business.projects.detail", "GET", "projects", "Get one Business project by id.", "getBusinessProjectById", "BusinessProject | null", "/business/projects/:projectId"),
  route("business.assets.list", "GET", "assets", "List operational assets.", "getBusinessAssets", "OperationalAsset[]"),
  route("business.assets.detail", "GET", "assets", "Get one operational asset by id.", "getBusinessAssetById", "OperationalAsset | null", "/business/assets/:assetId"),
  route("business.federation.list", "GET", "federation", "List federation participants.", "getBusinessFederationParticipants", "FederationParticipant[]", "/business/federation/participants"),
  route("business.federation.detail", "GET", "federation", "Future participant detail contract.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "FederationParticipant | null", "/business/federation/participants/:participantId"),
  route("business.identities.list", "GET", "identities", "List Business identities.", "getBusinessIdentities", "BusinessIdentity[]"),
  route("business.identities.detail", "GET", "identities", "Future identity detail contract.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "BusinessIdentity | null", "/business/identities/:identityId"),
  route("business.plugins.list", "GET", "plugins", "List DAO and governance plugin records.", "getBusinessPlugins", "PluginRecord[]"),
  route("business.plugins.detail", "GET", "plugins", "Get one plugin record by id.", "getBusinessPluginById", "PluginRecord | null", "/business/plugins/:pluginId"),
  route("business.funding.list", "GET", "funding", "List funding records.", "getBusinessFundingRecords", "FundingRecord[]"),
  route("business.funding.detail", "GET", "funding", "Get one funding record by id.", "getBusinessFundingRecordById", "FundingRecord | null", "/business/funding/:fundingId"),
  route("business.debentures.list", "GET", "debentures", "List debenture records.", "getBusinessDebentures", "DebentureRecord[]"),
  route("business.debentures.detail", "GET", "debentures", "Get one debenture record by id.", "getBusinessDebentureById", "DebentureRecord | null", "/business/debentures/:debentureId"),
  route("business.treasury.list", "GET", "treasuryExposure", "List treasury exposure records.", "getBusinessTreasuryExposures", "TreasuryExposure[]"),
  route("business.treasury.detail", "GET", "treasuryExposure", "Get one treasury exposure record by id.", "getBusinessTreasuryExposureById", "TreasuryExposure | null", "/business/treasury/exposure/:exposureId"),
  route("business.revenue.list", "GET", "revenue", "List revenue routing records.", "getBusinessRevenueRecords", "RevenueRecord[]"),
  route("business.revenue.detail", "GET", "revenue", "Get one revenue routing record by id.", "getBusinessRevenueRecordById", "RevenueRecord | null", "/business/revenue/:revenueId"),
  route("business.acs.list", "GET", "acsRuntimes", "List ACS runtime records.", "getBusinessACSRuntimes", "ACSRuntime[]"),
  route("business.acs.detail", "GET", "acsRuntimes", "Get one ACS runtime by id.", "getBusinessACSRuntimeById", "ACSRuntime | null", "/business/acs/runtimes/:runtimeId"),
  route("business.acs.receipts.list", "GET", "acsReceipts", "Future ACS receipt list contract.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "ACSOrchestrationReceipt[]"),
  route("business.acs.receipts.detail", "GET", "acsReceipts", "Future ACS receipt detail contract.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "ACSOrchestrationReceipt | null", "/business/acs/receipts/:receiptId"),
  route("business.telemetry.list", "GET", "telemetryEvents", "List telemetry events.", "getBusinessTelemetryEvents", "TelemetryEvent[]"),
  route("business.telemetry.detail", "GET", "telemetryEvents", "Get one telemetry event by id.", "getBusinessTelemetryEventById", "TelemetryEvent | null", "/business/telemetry/events/:eventId"),
  route("business.runtime.summary", "GET", "telemetrySummary", "Get aggregated Business runtime API summary.", "getBusinessRuntimeSummary", "BusinessApiRuntimeSummary"),
  route("business.requests.create", "POST", "requests", "Future request creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "BusinessRequest"),
  route("business.projects.create", "POST", "projects", "Future project creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "BusinessProject"),
  route("business.assets.create", "POST", "assets", "Future asset creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "OperationalAsset"),
  route("business.federation.create", "POST", "federation", "Future federation participant creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "FederationParticipant", "/business/federation/participants"),
  route("business.identities.create", "POST", "identities", "Future identity creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "BusinessIdentity"),
  route("business.plugins.create", "POST", "plugins", "Future plugin creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "PluginRecord"),
  route("business.funding.create", "POST", "funding", "Future funding creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "FundingRecord"),
  route("business.debentures.draft", "POST", "debentures", "Future debenture draft contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "DebentureRecord", "/business/debentures/draft"),
  route("business.treasury.create", "POST", "treasuryExposure", "Future treasury exposure creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "TreasuryExposure"),
  route("business.revenue.create", "POST", "revenue", "Future revenue record creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "RevenueRecord"),
  route("business.acs.create", "POST", "acsRuntimes", "Future ACS runtime creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "ACSRuntime"),
  route("business.telemetry.create", "POST", "telemetryEvents", "Future telemetry event creation contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "TelemetryEvent"),
  route("business.requests.patch", "PATCH", "requests", "Future request status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "BusinessRequest", "/business/requests/:requestId"),
  route("business.projects.patch", "PATCH", "projects", "Future project status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "BusinessProject", "/business/projects/:projectId/status"),
  route("business.assets.patch", "PATCH", "assets", "Future asset status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "OperationalAsset", "/business/assets/:assetId/status"),
  route("business.federation.patch", "PATCH", "federation", "Future participant status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "FederationParticipant", "/business/federation/participants/:participantId/status"),
  route("business.identities.patch", "PATCH", "identities", "Future identity status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "BusinessIdentity", "/business/identities/:identityId/status"),
  route("business.plugins.patch", "PATCH", "plugins", "Future plugin status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "PluginRecord", "/business/plugins/:pluginId/status"),
  route("business.funding.patch", "PATCH", "funding", "Future funding status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "FundingRecord", "/business/funding/:fundingId/status"),
  route("business.debentures.patch", "PATCH", "debentures", "Future debenture status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "DebentureRecord", "/business/debentures/:debentureId/status"),
  route("business.treasury.patch", "PATCH", "treasuryExposure", "Future treasury exposure status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "TreasuryExposure", "/business/treasury/exposure/:exposureId/status"),
  route("business.revenue.patch", "PATCH", "revenue", "Future revenue status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "RevenueRecord", "/business/revenue/:revenueId/status"),
  route("business.drafts.list", "GET", "drafts", "List local/mock Business draft records.", "getBusinessDrafts", "BusinessDraftStoreRecord[]"),
  route("business.drafts.detail", "GET", "drafts", "Get one local/mock Business draft record.", "getBusinessDraftById", "BusinessDraftStoreRecord | null", "/business/drafts/:draftId"),
  route("business.drafts.preview", "GET", "drafts", "Get draft preview model.", "getBusinessDraftPreview", "BusinessDraftPreviewModel | null", "/business/drafts/:draftId/preview"),
  route("business.drafts.readiness", "GET", "draftReadiness", "Get draft readiness review.", "getBusinessDraftReadiness", "BusinessDraftReadinessReview | null", "/business/drafts/:draftId/readiness"),
  route("business.drafts.validation", "GET", "drafts", "Get draft structural validation.", "getBusinessDraftValidation", "BusinessDraftValidationResult | null", "/business/drafts/:draftId/validation"),
  route("business.drafts.runtime-review", "GET", "drafts", "Get draft runtime review.", "getBusinessDraftRuntimeReview", "BusinessDraftRuntimeReview | null", "/business/drafts/:draftId/runtime-review"),
  route("business.draft-store.list", "GET", "draftStore", "List local/mock draft store records.", "listBusinessDraftStoreRecords", "BusinessDraftStoreRecord[]"),
  route("business.draft-store.detail", "GET", "draftStore", "Get local/mock draft store record.", "getBusinessDraftStoreRecordById", "BusinessDraftStoreRecord | null", "/business/draft-store/:draftId"),
  route("business.draft-store.create", "POST", "draftStore", "Create local/mock draft store record; simulation-only, no backend persistence guarantee.", "createBusinessDraftStoreRecordMock", "BusinessDraftStoreRecord"),
  route("business.draft-store.patch", "PATCH", "draftStore", "Update local/mock draft store record; simulation-only, no backend persistence guarantee.", "updateBusinessDraftStoreRecordMock", "BusinessDraftStoreRecord | null", "/business/draft-store/:draftId"),
  route("business.draft-store.delete", "DELETE", "draftStore", "Discard local/mock draft store record; simulation-only, no backend persistence guarantee.", "deleteBusinessDraftStoreRecordMock", "{ deleted: boolean } | null", "/business/draft-store/:draftId"),
  route("business.submissions.simulate", "POST", "submissions", "Simulate draft submission; mock/local only with no external side effects.", "simulateBusinessDraftSubmissionHandler", "BusinessDraftSubmissionResult", "/business/drafts/:draftId/simulate-submission"),
  route("business.submissions.list", "GET", "submissions", "List mock submission receipts.", "listBusinessDraftSubmissions", "BusinessDraftSubmissionReceipt[]"),
  route("business.submissions.detail", "GET", "submissions", "Get one mock submission receipt.", "getBusinessDraftSubmissionById", "BusinessDraftSubmissionReceipt | null", "/business/submissions/:submissionId"),
  route("business.submissions.receipt", "GET", "submissions", "Get one mock submission receipt envelope.", "getBusinessDraftSubmissionReceipt", "BusinessDraftSubmissionReceipt | null", "/business/submissions/:submissionId/receipt"),
  route("business.submissions.history", "GET", "submissions", "Get mock submission history for a draft.", "getBusinessDraftSubmissionHistory", "BusinessDraftSubmission", "/business/drafts/:draftId/submission-history"),
  route("business.review-queue.list", "GET", "reviewQueue", "List mock review queue items.", "getBusinessReviewQueue", "BusinessReviewQueueItem[]"),
  route("business.review-queue.summary", "GET", "reviewQueue", "Get mock review queue summary.", "getBusinessReviewQueueSummary", "BusinessReviewQueueSummary", "/business/review-queue/summary"),
  route("business.review-queue.ready", "GET", "reviewQueue", "List mock ready-for-review queue items.", "getReadyForReviewQueueItems", "BusinessReviewQueueItem[]", "/business/review-queue/ready"),
  route("business.review-queue.blocked", "GET", "reviewQueue", "List mock blocked review queue items.", "getBlockedReviewQueueItems", "BusinessReviewQueueItem[]", "/business/review-queue/blocked"),
  route("business.review-queue.status", "GET", "reviewQueue", "List mock review queue items by status.", "getReviewQueueItemsByStatusHandler", "BusinessReviewQueueItem[]", "/business/review-queue/status/:status"),
  route("business.review-queue.review-type", "GET", "reviewQueue", "List mock review queue items by review type.", "getReviewQueueItemsByReviewTypeHandler", "BusinessReviewQueueItem[]", "/business/review-queue/review-type/:reviewType"),
  route("business.review-queue.priority", "GET", "reviewQueue", "List mock review queue items by priority.", "getReviewQueueItemsByPriorityHandler", "BusinessReviewQueueItem[]", "/business/review-queue/priority/:priority"),
  route("business.review-queue.detail", "GET", "reviewQueue", "Get one mock review queue item.", "getBusinessReviewQueueItemById", "BusinessReviewQueueItem | null", "/business/review-queue/:queueItemId"),
  route("business.audit.list", "GET", "audit", "List derived mock audit records.", "getBusinessAuditRecords", "BusinessAuditRecord[]"),
  route("business.audit.detail", "GET", "audit", "Get derived mock audit record.", "getBusinessAuditRecordById", "BusinessAuditRecord | null", "/business/audit/:auditId"),
  route("business.audit.entity", "GET", "audit", "List derived mock audit records by entity.", "getBusinessAuditRecordsByEntity", "BusinessAuditRecord[]", "/business/audit/entity/:entityId"),
  route("business.audit.actor", "GET", "audit", "List derived mock audit records by actor.", "getBusinessAuditRecordsByActor", "BusinessAuditRecord[]", "/business/audit/actor/:actorId"),
  route("business.snapshots.list", "GET", "snapshots", "List derived mock snapshots.", "getBusinessSnapshots", "BusinessSnapshot[]"),
  route("business.snapshots.entity", "GET", "snapshots", "List derived mock snapshots by entity.", "getBusinessSnapshotsByEntity", "BusinessSnapshot[] | null", "/business/snapshots/entity/:entityId"),
  route("business.snapshots.identity", "GET", "snapshots", "Get mock identity snapshot.", "getBusinessIdentitySnapshot", "BusinessIdentitySnapshot | null", "/business/snapshots/identity/:entityId"),
  route("business.snapshots.permissions", "GET", "snapshots", "Get mock permission snapshot.", "getBusinessPermissionSnapshot", "BusinessPermissionSnapshot | null", "/business/snapshots/permissions/:entityId"),
  route("business.snapshots.capabilities", "GET", "snapshots", "Get mock capability snapshot.", "getBusinessCapabilitySnapshot", "BusinessCapabilitySnapshot | null", "/business/snapshots/capabilities/:entityId"),
  route("business.snapshots.execution-policy", "GET", "snapshots", "Get mock execution policy snapshot.", "getBusinessExecutionPolicySnapshot", "BusinessExecutionPolicySnapshot | null", "/business/snapshots/execution-policy/:entityId"),
  route("business.snapshots.governance", "GET", "snapshots", "Get mock governance readiness snapshot.", "getBusinessGovernanceSnapshot", "BusinessGovernanceSnapshot | null", "/business/snapshots/governance/:entityId"),
  route("business.snapshots.treasury", "GET", "snapshots", "Get mock treasury readiness snapshot.", "getBusinessTreasurySnapshot", "BusinessTreasurySnapshot | null", "/business/snapshots/treasury/:entityId"),
  route("business.snapshots.acs", "GET", "snapshots", "Get mock ACS readiness snapshot.", "getBusinessACSSnapshot", "BusinessACSSnapshot | null", "/business/snapshots/acs/:entityId"),
  route("business.governance-bridge.list", "GET", "governanceBridge", "Get mock governance bridge summary.", "getBusinessGovernanceBridge", "BusinessGovernanceBridgeSummary"),
  route("business.governance-bridge.summary", "GET", "governanceBridge", "Get mock governance bridge summary.", "getBusinessGovernanceBridgeSummary", "BusinessGovernanceBridgeSummary", "/business/governance/bridge/summary"),
  route("business.governance-bridge.status", "GET", "governanceBridge", "Get governance bridge status for an entity.", "getBusinessGovernanceBridgeStatus", "BusinessGovernanceBridgeStatus", "/business/governance/bridge/:entityId"),
  route("business.governance-bridge.package", "GET", "governanceBridge", "Get governance readiness package for an entity.", "getBusinessGovernanceReadinessPackage", "BusinessGovernanceReadinessPackage | null", "/business/governance/bridge/:entityId/package"),
  route("business.governance-bridge.handoff", "GET", "governanceBridge", "Get mock governance handoff receipt for an entity.", "getBusinessGovernanceHandoffReceipt", "BusinessGovernanceHandoffReceipt | null", "/business/governance/bridge/:entityId/handoff-receipt"),
  route("business.governance-bridge.compatibility", "GET", "governanceBridge", "Get constitutional compatibility snapshot for an entity.", "getBusinessGovernanceCompatibility", "BusinessGovernanceCompatibilitySnapshot | null", "/business/governance/bridge/:entityId/compatibility"),
  route("business.governance-bridge.restrictions", "GET", "governanceBridge", "Get governance restriction snapshot for an entity.", "getBusinessGovernanceRestrictions", "BusinessGovernanceRestrictionSnapshot | null", "/business/governance/bridge/:entityId/restrictions"),
  route("business.governance-bridge.proposal-reference", "GET", "governanceBridge", "Get mock proposal reference for an entity.", "getBusinessGovernanceProposalReference", "BusinessGovernanceProposalReference | null", "/business/governance/bridge/:entityId/proposal-reference")
];
