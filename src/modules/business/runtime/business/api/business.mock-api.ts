import { getBusinessEventSummary } from "../events/business.event-selectors.js";
import { getBusinessRuntimeEvents } from "../events/business.events.js";
import { BUSINESS_EXECUTION_POLICY_MATRIX, getExecutionPolicySummary } from "../policies/business.execution-policy.js";
import { getBusinessRegistrySummary } from "../registry/business.registry-selectors.js";
import { getSecurityValidatorStatus } from "../security/business.security-validators.js";
import { BUSINESS_TRANSITION_GUARD_CATEGORIES } from "../state/business.guards.js";
import { BUSINESS_TRANSITION_MAPS } from "../state/business.transitions.js";
import { getBusinessRuntimeSummary as getBusinessRuntimeCoreSummary } from "../services/business.service.js";
import { listBusinessWorkflows, getBusinessWorkflowSummary } from "../workflows/business.workflow-selectors.js";
import type { BusinessDraft, BusinessDraftStorePatch } from "../drafts/business.draft-types.js";
import { businessApiErrors } from "./business.errors.js";
import { businessApiResponse } from "./business.responses.js";
import { businessApiHandlers } from "./business.handlers.js";
import type { BusinessApiResponse } from "./business.response.types.js";

export type BusinessMockApiMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface BusinessMockApiRequest {
  method: BusinessMockApiMethod | string;
  path: string;
  body?: unknown;
}

export interface BusinessMockApiResult<TData = unknown> {
  statusCode: number;
  response: BusinessApiResponse<TData>;
}

export const BUSINESS_MOCK_API_BASE_PATH = "/api/v1/business";
export const BUSINESS_MOCK_API_ROUTES = [
  "GET /api/v1/business/summary",
  "GET /api/v1/business/projects",
  "GET /api/v1/business/projects/:projectId",
  "GET /api/v1/business/assets",
  "GET /api/v1/business/assets/:assetId",
  "GET /api/v1/business/registry",
  "GET /api/v1/business/workflows",
  "GET /api/v1/business/events",
  "GET /api/v1/business/runtime",
  "GET /api/v1/business/drafts",
  "GET /api/v1/business/drafts/:draftId",
  "GET /api/v1/business/drafts/:draftId/preview",
  "GET /api/v1/business/drafts/:draftId/readiness",
  "GET /api/v1/business/drafts/:draftId/validation",
  "GET /api/v1/business/drafts/:draftId/runtime-review",
  "POST /api/v1/business/drafts",
  "PATCH /api/v1/business/drafts/:draftId",
  "DELETE /api/v1/business/drafts/:draftId",
  "GET /api/v1/business/draft-store",
  "GET /api/v1/business/draft-store/:draftId",
  "POST /api/v1/business/draft-store",
  "PATCH /api/v1/business/draft-store/:draftId",
  "DELETE /api/v1/business/draft-store/:draftId",
  "POST /api/v1/business/drafts/:draftId/simulate-submission",
  "GET /api/v1/business/submissions",
  "GET /api/v1/business/submissions/:submissionId",
  "GET /api/v1/business/submissions/:submissionId/receipt",
  "GET /api/v1/business/drafts/:draftId/submission-history",
  "GET /api/v1/business/review-queue",
  "GET /api/v1/business/review-queue/summary",
  "GET /api/v1/business/review-queue/ready",
  "GET /api/v1/business/review-queue/blocked",
  "GET /api/v1/business/review-queue/status/:status",
  "GET /api/v1/business/review-queue/review-type/:reviewType",
  "GET /api/v1/business/review-queue/priority/:priority",
  "GET /api/v1/business/review-queue/:queueItemId",
  "GET /api/v1/business/governance/bridge",
  "GET /api/v1/business/governance/bridge/summary",
  "GET /api/v1/business/governance/bridge/:entityId",
  "GET /api/v1/business/governance/bridge/:entityId/package",
  "GET /api/v1/business/governance/bridge/:entityId/handoff-receipt",
  "GET /api/v1/business/governance/bridge/:entityId/compatibility",
  "GET /api/v1/business/governance/bridge/:entityId/restrictions",
  "GET /api/v1/business/governance/bridge/:entityId/proposal-reference",
  "GET /api/v1/business/audit",
  "GET /api/v1/business/audit/:auditId",
  "GET /api/v1/business/audit/entity/:entityId",
  "GET /api/v1/business/audit/actor/:actorId",
  "GET /api/v1/business/snapshots",
  "GET /api/v1/business/snapshots/entity/:entityId",
  "GET /api/v1/business/snapshots/identity/:entityId",
  "GET /api/v1/business/snapshots/permissions/:entityId",
  "GET /api/v1/business/snapshots/capabilities/:entityId",
  "GET /api/v1/business/snapshots/execution-policy/:entityId",
  "GET /api/v1/business/snapshots/governance/:entityId",
  "GET /api/v1/business/snapshots/treasury/:entityId",
  "GET /api/v1/business/snapshots/acs/:entityId"
] as const;

const normalizePath = (path: string): string => {
  const parsed = new URL(path, "http://business.local");
  const pathname = parsed.pathname.replace(/\/+$/, "");
  return pathname === "" ? "/" : pathname;
};

const relativeSegments = (path: string): string[] => {
  const normalized = normalizePath(path);
  if (normalized === BUSINESS_MOCK_API_BASE_PATH) return [];
  if (!normalized.startsWith(`${BUSINESS_MOCK_API_BASE_PATH}/`)) return ["__outside_business_api__"];
  return normalized.slice(BUSINESS_MOCK_API_BASE_PATH.length + 1).split("/");
};

const ok = <TData>(data: TData, path: string): BusinessMockApiResult<TData> => ({
  statusCode: 200,
  response: businessApiResponse(data, { links: { self: path } })
});

const fromHandler = <TData>(response: BusinessApiResponse<TData>): BusinessMockApiResult<TData> => ({
  statusCode: response.errors.length > 0 && response.data === null
    ? response.errors.some((error) => error.code.includes("INVALID")) ? 400 : 404
    : response.errors.some((error) => error.code === "SUBMISSION_SIMULATION_BLOCKED") ? 409 : 200,
  response
});

const notFound = (method: string, path: string): BusinessMockApiResult<null> => ({
  statusCode: 404,
  response: businessApiResponse(null, { errors: [businessApiErrors.routeNotFound(method, path)], links: { self: path } })
});

const invalidRequest = (path: string, message: string, details: Record<string, unknown> = {}): BusinessMockApiResult<null> => ({
  statusCode: 400,
  response: businessApiResponse(null, { errors: [businessApiErrors.invalidRequest(message, details)], links: { self: path } })
});

const isDraft = (value: unknown): value is BusinessDraft =>
  Boolean(value && typeof value === "object" && "draftType" in value && "values" in value);

const draftFromBody = (body: unknown): BusinessDraft | undefined => {
  if (isDraft(body)) return body;
  if (body && typeof body === "object" && "draft" in body && isDraft((body as { draft?: unknown }).draft)) {
    return (body as { draft: BusinessDraft }).draft;
  }
  return undefined;
};

const draftPatchFromBody = (body: unknown): BusinessDraftStorePatch | undefined => {
  if (!body || typeof body !== "object") return undefined;
  const patch = body as BusinessDraftStorePatch;
  if (patch.draft && !isDraft(patch.draft)) return undefined;
  return patch;
};

export const handleBusinessMockApiRequest = (request: BusinessMockApiRequest): BusinessMockApiResult => {
  const method = request.method.toUpperCase();
  const path = normalizePath(request.path);
  const segments = relativeSegments(path);

  if (segments[0] === "__outside_business_api__") return notFound(method, path);

  if (method === "GET") {
    if (segments.length === 0 || segments[0] === "summary") return fromHandler(businessApiHandlers.getBusinessRuntimeSummary());
    if (segments[0] === "overview") return fromHandler(businessApiHandlers.getBusinessOverview());
    if (segments[0] === "requests") return fromHandler(businessApiHandlers.getBusinessRequests());
    if (segments[0] === "projects" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessProjects());
    if (segments[0] === "projects" && segments[1]) return fromHandler(businessApiHandlers.getBusinessProjectById(segments[1]));
    if (segments[0] === "assets" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessAssets());
    if (segments[0] === "assets" && segments[1]) return fromHandler(businessApiHandlers.getBusinessAssetById(segments[1]));
    if (segments[0] === "plugins" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessPlugins());
    if (segments[0] === "plugins" && segments[1]) return fromHandler(businessApiHandlers.getBusinessPluginById(segments[1]));
    if (segments[0] === "funding" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessFundingRecords());
    if (segments[0] === "funding" && segments[1]) return fromHandler(businessApiHandlers.getBusinessFundingRecordById(segments[1]));
    if (segments[0] === "debentures" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessDebentures());
    if (segments[0] === "debentures" && segments[1]) return fromHandler(businessApiHandlers.getBusinessDebentureById(segments[1]));
    if (segments[0] === "treasury" && segments[1] === "exposure" && segments.length === 2) return fromHandler(businessApiHandlers.getBusinessTreasuryExposures());
    if (segments[0] === "treasury" && segments[1] === "exposure" && segments[2]) return fromHandler(businessApiHandlers.getBusinessTreasuryExposureById(segments[2]));
    if (segments[0] === "revenue" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessRevenueRecords());
    if (segments[0] === "revenue" && segments[1]) return fromHandler(businessApiHandlers.getBusinessRevenueRecordById(segments[1]));
    if (segments[0] === "acs" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessACSRuntimes());
    if (segments[0] === "acs" && segments[1]) return fromHandler(businessApiHandlers.getBusinessACSRuntimeById(segments[1]));
    if (segments[0] === "telemetry" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessTelemetryEvents());
    if (segments[0] === "telemetry" && segments[1]) return fromHandler(businessApiHandlers.getBusinessTelemetryEventById(segments[1]));
    if (segments[0] === "federation") return fromHandler(businessApiHandlers.getBusinessFederationParticipants());
    if (segments[0] === "identities") return fromHandler(businessApiHandlers.getBusinessIdentities());
    if (segments[0] === "drafts" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessDrafts());
    if (segments[0] === "drafts" && segments[1] && segments[2] === "preview") return fromHandler(businessApiHandlers.getBusinessDraftPreview(segments[1]));
    if (segments[0] === "drafts" && segments[1] && segments[2] === "readiness") return fromHandler(businessApiHandlers.getBusinessDraftReadiness(segments[1]));
    if (segments[0] === "drafts" && segments[1] && segments[2] === "validation") return fromHandler(businessApiHandlers.getBusinessDraftValidation(segments[1]));
    if (segments[0] === "drafts" && segments[1] && segments[2] === "runtime-review") return fromHandler(businessApiHandlers.getBusinessDraftRuntimeReview(segments[1]));
    if (segments[0] === "drafts" && segments[1] && segments[2] === "submission-history") return fromHandler(businessApiHandlers.getBusinessDraftSubmissionHistory(segments[1]));
    if (segments[0] === "drafts" && segments[1]) return fromHandler(businessApiHandlers.getBusinessDraftById(segments[1]));
    if (segments[0] === "draft-store" && segments.length === 1) return fromHandler(businessApiHandlers.listBusinessDraftStoreRecords());
    if (segments[0] === "draft-store" && segments[1]) return fromHandler(businessApiHandlers.getBusinessDraftStoreRecordById(segments[1]));
    if (segments[0] === "submissions" && segments.length === 1) return fromHandler(businessApiHandlers.listBusinessDraftSubmissions());
    if (segments[0] === "submissions" && segments[1] && segments[2] === "receipt") return fromHandler(businessApiHandlers.getBusinessDraftSubmissionReceipt(segments[1]));
    if (segments[0] === "submissions" && segments[1] && segments[2] === "review-queue-item") return fromHandler(businessApiHandlers.getBusinessSubmissionReviewQueueItem(segments[1]));
    if (segments[0] === "submissions" && segments[1]) return fromHandler(businessApiHandlers.getBusinessDraftSubmissionById(segments[1]));
    if (segments[0] === "review-queue" && segments[1] === "summary") return fromHandler(businessApiHandlers.getBusinessReviewQueueSummary());
    if (segments[0] === "review-queue" && segments[1] === "ready") return fromHandler(businessApiHandlers.getReadyForReviewQueueItems());
    if (segments[0] === "review-queue" && segments[1] === "blocked") return fromHandler(businessApiHandlers.getBlockedReviewQueueItems());
    if (segments[0] === "review-queue" && segments[1] === "status" && segments[2]) return fromHandler(businessApiHandlers.getReviewQueueItemsByStatusHandler(segments[2] as never));
    if (segments[0] === "review-queue" && segments[1] === "review-type" && segments[2]) return fromHandler(businessApiHandlers.getReviewQueueItemsByReviewTypeHandler(segments[2] as never));
    if (segments[0] === "review-queue" && segments[1] === "priority" && segments[2]) return fromHandler(businessApiHandlers.getReviewQueueItemsByPriorityHandler(segments[2] as never));
    if (segments[0] === "review-queue" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessReviewQueue());
    if (segments[0] === "review-queue" && segments[1]) return fromHandler(businessApiHandlers.getBusinessReviewQueueItemById(segments[1]));
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2] === "summary") return fromHandler(businessApiHandlers.getBusinessGovernanceBridgeSummary());
    if (segments[0] === "governance" && segments[1] === "bridge" && segments.length === 2) return fromHandler(businessApiHandlers.getBusinessGovernanceBridge());
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2] && segments[3] === "package") return fromHandler(businessApiHandlers.getBusinessGovernanceReadinessPackage(segments[2]));
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2] && segments[3] === "handoff-receipt") return fromHandler(businessApiHandlers.getBusinessGovernanceHandoffReceipt(segments[2]));
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2] && segments[3] === "compatibility") return fromHandler(businessApiHandlers.getBusinessGovernanceCompatibility(segments[2]));
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2] && segments[3] === "restrictions") return fromHandler(businessApiHandlers.getBusinessGovernanceRestrictions(segments[2]));
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2] && segments[3] === "proposal-reference") return fromHandler(businessApiHandlers.getBusinessGovernanceProposalReference(segments[2]));
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2] && segments[3] === "federation-standing") return fromHandler(businessApiHandlers.getBusinessGovernanceFederationStanding(segments[2]));
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2] && segments[3] === "blockers") return fromHandler(businessApiHandlers.getBusinessGovernanceBridgeBlockers(segments[2]));
    if (segments[0] === "governance" && segments[1] === "bridge" && segments[2]) return fromHandler(businessApiHandlers.getBusinessGovernanceBridgeStatus(segments[2]));
    if (segments[0] === "audit" && segments[1] === "entity" && segments[2]) return fromHandler(businessApiHandlers.getBusinessAuditRecordsByEntity(segments[2]));
    if (segments[0] === "audit" && segments[1] === "actor" && segments[2]) return fromHandler(businessApiHandlers.getBusinessAuditRecordsByActor(segments[2]));
    if (segments[0] === "audit" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessAuditRecords());
    if (segments[0] === "audit" && segments[1]) return fromHandler(businessApiHandlers.getBusinessAuditRecordById(segments[1]));
    if (segments[0] === "snapshots" && segments[1] === "entity" && segments[2]) return fromHandler(businessApiHandlers.getBusinessSnapshotsByEntity(segments[2]));
    if (segments[0] === "snapshots" && segments[1] === "identity" && segments[2]) return fromHandler(businessApiHandlers.getBusinessIdentitySnapshot(segments[2]));
    if (segments[0] === "snapshots" && segments[1] === "permissions" && segments[2]) return fromHandler(businessApiHandlers.getBusinessPermissionSnapshot(segments[2]));
    if (segments[0] === "snapshots" && segments[1] === "capabilities" && segments[2]) return fromHandler(businessApiHandlers.getBusinessCapabilitySnapshot(segments[2]));
    if (segments[0] === "snapshots" && segments[1] === "execution-policy" && segments[2]) return fromHandler(businessApiHandlers.getBusinessExecutionPolicySnapshot(segments[2]));
    if (segments[0] === "snapshots" && segments[1] === "governance" && segments[2]) return fromHandler(businessApiHandlers.getBusinessGovernanceSnapshot(segments[2]));
    if (segments[0] === "snapshots" && segments[1] === "treasury" && segments[2]) return fromHandler(businessApiHandlers.getBusinessTreasurySnapshot(segments[2]));
    if (segments[0] === "snapshots" && segments[1] === "acs" && segments[2]) return fromHandler(businessApiHandlers.getBusinessACSSnapshot(segments[2]));
    if (segments[0] === "snapshots" && segments.length === 1) return fromHandler(businessApiHandlers.getBusinessSnapshots());
    if (segments[0] === "registry") return ok(getBusinessRegistrySummary(), path);
    if (segments[0] === "workflows") return ok({ summary: getBusinessWorkflowSummary(), workflows: listBusinessWorkflows(), mock: true, readOnly: true }, path);
    if (segments[0] === "events") return ok({ summary: getBusinessEventSummary(), events: getBusinessRuntimeEvents(), mock: true, readOnly: true }, path);
    if (segments[0] === "runtime") {
      return ok(
        {
          coreSummary: getBusinessRuntimeCoreSummary(),
          executionPolicies: BUSINESS_EXECUTION_POLICY_MATRIX,
          executionPolicySummary: getExecutionPolicySummary(),
          securityValidatorStatus: getSecurityValidatorStatus(),
          transitionMaps: BUSINESS_TRANSITION_MAPS,
          transitionGuardCategories: BUSINESS_TRANSITION_GUARD_CATEGORIES,
          mock: true,
          readOnly: true
        },
        path
      );
    }
  }

  if (method === "POST" && ((segments[0] === "drafts" && segments.length === 1) || (segments[0] === "draft-store" && segments.length === 1))) {
    const draft = draftFromBody(request.body);
    if (!draft) return invalidRequest(path, "POST /drafts requires a BusinessDraft payload.", { expected: "BusinessDraft or { draft: BusinessDraft }" });
    return { statusCode: 201, response: businessApiHandlers.createBusinessDraftStoreRecordMock(draft) };
  }

  if (method === "POST" && segments[0] === "drafts" && segments[1] && segments[2] === "simulate-submission") {
    return fromHandler(businessApiHandlers.simulateBusinessDraftSubmissionHandler(segments[1]));
  }

  if (method === "PATCH" && (segments[0] === "drafts" || segments[0] === "draft-store") && segments[1]) {
    const patch = draftPatchFromBody(request.body);
    if (!patch) return invalidRequest(path, "PATCH /drafts/:draftId requires a valid BusinessDraftStorePatch payload.");
    return fromHandler(businessApiHandlers.updateBusinessDraftStoreRecordMock(segments[1], patch));
  }

  if (method === "DELETE" && (segments[0] === "drafts" || segments[0] === "draft-store") && segments[1]) {
    return fromHandler(businessApiHandlers.deleteBusinessDraftStoreRecordMock(segments[1]));
  }

  return notFound(method, path);
};
