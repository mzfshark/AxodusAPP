import { BUSINESS_ROUTE_CATALOG } from "../constants/business.constants.js";
import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { BusinessPermissionMode } from "../permissions/business.permissions.js";
import type { BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import type { BusinessApiHandlerName } from "./business.handlers.js";
import type { BusinessApiExecutionMode } from "./business.response.types.js";

export type BusinessRouteMethod = "GET" | "POST" | "PATCH";

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
  executionEnabled: false;
  requiredCapability: BusinessCapability;
  permissionMode: BusinessPermissionMode;
  executionPolicy: BusinessRuntimeAction;
  governanceRequirement: boolean;
  treasuryRequirement: boolean;
  acsRequirement: boolean;
  futureIntegrationTarget: "GOVERNANCE" | "TREASURY" | "FINANCIAL_CORE" | "DEBENTURE_ENGINE" | "ACS" | "IDENTITY" | "BUSINESS_API";
}

const apiPathFor = (path: string): string => `/api/v1${path}`;

const routeSecurityByDomain = (domain: keyof typeof BUSINESS_ROUTE_CATALOG) => {
  const capabilityByDomain: Record<keyof typeof BUSINESS_ROUTE_CATALOG, BusinessCapability> = {
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
    telemetrySummary: "VIEW_TELEMETRY"
  };

  const integrationTargetByDomain: Record<keyof typeof BUSINESS_ROUTE_CATALOG, BusinessRouteDefinition["futureIntegrationTarget"]> = {
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
    telemetrySummary: "BUSINESS_API"
  };

  const executionPolicyByDomain: Record<keyof typeof BUSINESS_ROUTE_CATALOG, BusinessRuntimeAction> = {
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
    telemetrySummary: "VIEW_TELEMETRY"
  };

  return {
    requiredCapability: capabilityByDomain[domain],
    futureIntegrationTarget: integrationTargetByDomain[domain],
    executionPolicy: executionPolicyByDomain[domain],
    governanceRequirement: ["projects", "federation", "plugins", "funding", "debentures"].includes(domain),
    treasuryRequirement: ["funding", "debentures", "treasuryExposure", "revenue"].includes(domain),
    acsRequirement: ["acsRuntimes", "acsReceipts"].includes(domain)
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
    executionEnabled: false,
    requiredCapability: routeSecurity.requiredCapability,
    permissionMode: mutationRoute ? "FORBIDDEN" : "VIEW",
    executionPolicy: routeSecurity.executionPolicy,
    governanceRequirement: routeSecurity.governanceRequirement,
    treasuryRequirement: routeSecurity.treasuryRequirement,
    acsRequirement: routeSecurity.acsRequirement,
    futureIntegrationTarget: routeSecurity.futureIntegrationTarget
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
  route("business.revenue.patch", "PATCH", "revenue", "Future revenue status update contract; disabled in mock runtime.", "NOT_IMPLEMENTED_READ_ONLY_CONTRACT", "RevenueRecord", "/business/revenue/:revenueId/status")
];
