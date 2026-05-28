import { getBusinessEventSummary } from "../events/business.event-selectors.js";
import { getBusinessRuntimeEvents } from "../events/business.events.js";
import { BUSINESS_EXECUTION_POLICY_MATRIX, getExecutionPolicySummary } from "../policies/business.execution-policy.js";
import { getBusinessRegistrySummary } from "../registry/business.registry-selectors.js";
import { getSecurityValidatorStatus } from "../security/business.security-validators.js";
import { BUSINESS_TRANSITION_GUARD_CATEGORIES } from "../state/business.guards.js";
import { BUSINESS_TRANSITION_MAPS } from "../state/business.transitions.js";
import { getBusinessRuntimeSummary as getBusinessRuntimeCoreSummary } from "../services/business.service.js";
import { listBusinessWorkflows, getBusinessWorkflowSummary } from "../workflows/business.workflow-selectors.js";
import {
  createDraftStoreRecord,
  deleteDraftStoreRecord,
  getDraftStoreRecordById,
  listDraftStoreRecords,
  updateDraftStoreRecord,
  validateDraftById
} from "../drafts/business.draft-store.js";
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
  "GET /api/v1/business/drafts/:draftId/validation",
  "POST /api/v1/business/drafts",
  "PATCH /api/v1/business/drafts/:draftId",
  "DELETE /api/v1/business/drafts/:draftId"
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
  statusCode: response.errors.length > 0 && response.data === null ? 404 : 200,
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
    if (segments[0] === "drafts" && segments.length === 1) return ok(listDraftStoreRecords(), path);
    if (segments[0] === "drafts" && segments[1] && segments[2] === "validation") {
      const validation = validateDraftById(segments[1]);
      return validation ? ok(validation, path) : fromHandler(businessApiResponse(null, { errors: [businessApiErrors.notFound("BusinessDraftStoreRecord", segments[1])], links: { self: path } }));
    }
    if (segments[0] === "drafts" && segments[1]) {
      const record = getDraftStoreRecordById(segments[1]);
      return record ? ok(record, path) : fromHandler(businessApiResponse(null, { errors: [businessApiErrors.notFound("BusinessDraftStoreRecord", segments[1])], links: { self: path } }));
    }
  }

  if (method === "POST" && segments[0] === "drafts" && segments.length === 1) {
    const draft = draftFromBody(request.body);
    if (!draft) return invalidRequest(path, "POST /drafts requires a BusinessDraft payload.", { expected: "BusinessDraft or { draft: BusinessDraft }" });
    return { statusCode: 201, response: businessApiResponse(createDraftStoreRecord(draft), { links: { self: path } }) };
  }

  if (method === "PATCH" && segments[0] === "drafts" && segments[1]) {
    const patch = draftPatchFromBody(request.body);
    if (!patch) return invalidRequest(path, "PATCH /drafts/:draftId requires a valid BusinessDraftStorePatch payload.");
    const record = updateDraftStoreRecord(segments[1], patch);
    return record ? ok(record, path) : fromHandler(businessApiResponse(null, { errors: [businessApiErrors.notFound("BusinessDraftStoreRecord", segments[1])], links: { self: path } }));
  }

  if (method === "DELETE" && segments[0] === "drafts" && segments[1]) {
    const deleted = deleteDraftStoreRecord(segments[1]);
    return deleted
      ? ok({ deleted: true, draftId: segments[1], mock: true, readOnly: true }, path)
      : fromHandler(businessApiResponse(null, { errors: [businessApiErrors.notFound("BusinessDraftStoreRecord", segments[1])], links: { self: path } }));
  }

  return notFound(method, path);
};
