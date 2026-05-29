import {
  createDraftStoreRecord,
  deleteDraftStoreRecord,
  getDraftPreviewById,
  getDraftStoreRecordById,
  listDraftStoreRecords,
  updateDraftStoreRecord,
  validateDraftById
} from "../drafts/business.draft-store.js";
import { getBusinessDraftReadinessReview } from "../drafts/business.draft-readiness.js";
import { getBusinessDraftRuntimeReview as createDraftRuntimeReview } from "../drafts/business.draft-review.js";
import type {
  BusinessDraft,
  BusinessDraftPreviewModel,
  BusinessDraftRuntimeReview,
  BusinessDraftStorePatch,
  BusinessDraftStoreRecord,
  BusinessDraftValidationResult
} from "../drafts/business.draft-types.js";
import type { BusinessId } from "../types/business.types.js";
import { businessApiContractErrors } from "./business.api-errors.js";
import { businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse } from "./business.response.types.js";

const draftStorePath = (draftId?: BusinessId): string =>
  draftId ? `/api/v1/business/draft-store/${draftId}` : "/api/v1/business/draft-store";

const draftPath = (draftId?: BusinessId, suffix = ""): string =>
  draftId ? `/api/v1/business/drafts/${draftId}${suffix}` : "/api/v1/business/drafts";

const draftNotFound = <TData>(draftId: BusinessId, self: string): BusinessApiResponse<TData | null> =>
  businessApiResponse(null, {
    errors: [businessApiContractErrors.draftNotFound(draftId)],
    links: { self },
    action: "CREATE_BUSINESS_REQUEST"
  });

export const getBusinessDrafts = (): BusinessApiResponse<BusinessDraftStoreRecord[]> =>
  businessApiResponse(listDraftStoreRecords(), { links: { self: draftPath() }, action: "CREATE_BUSINESS_REQUEST" });

export const getBusinessDraftById = (draftId: BusinessId): BusinessApiResponse<BusinessDraftStoreRecord | null> => {
  const record = getDraftStoreRecordById(draftId);
  return record
    ? businessApiResponse(record, { links: { self: draftPath(draftId) }, action: "CREATE_BUSINESS_REQUEST" })
    : draftNotFound(draftId, draftPath(draftId));
};

export const getBusinessDraftPreview = (draftId: BusinessId): BusinessApiResponse<BusinessDraftPreviewModel | null> => {
  const preview = getDraftPreviewById(draftId);
  return preview
    ? businessApiResponse(preview, { links: { self: draftPath(draftId, "/preview") }, action: "CREATE_BUSINESS_REQUEST" })
    : draftNotFound(draftId, draftPath(draftId, "/preview"));
};

export const getBusinessDraftReadiness = (draftId: BusinessId) => {
  const readiness = getBusinessDraftReadinessReview(draftId);
  return readiness
    ? businessApiResponse(readiness, { links: { self: draftPath(draftId, "/readiness") }, action: "CREATE_BUSINESS_REQUEST" })
    : draftNotFound(draftId, draftPath(draftId, "/readiness"));
};

export const getBusinessDraftValidation = (draftId: BusinessId): BusinessApiResponse<BusinessDraftValidationResult | null> => {
  const validation = validateDraftById(draftId);
  return validation
    ? businessApiResponse(validation, { links: { self: draftPath(draftId, "/validation") }, action: "CREATE_BUSINESS_REQUEST" })
    : draftNotFound(draftId, draftPath(draftId, "/validation"));
};

export const getBusinessDraftRuntimeReview = (draftId: BusinessId): BusinessApiResponse<BusinessDraftRuntimeReview | null> => {
  const record = getDraftStoreRecordById(draftId);
  return record
    ? businessApiResponse(getBusinessDraftRuntimeReviewModel(record.draft), { links: { self: draftPath(draftId, "/runtime-review") }, action: "CREATE_BUSINESS_REQUEST" })
    : draftNotFound(draftId, draftPath(draftId, "/runtime-review"));
};

const getBusinessDraftRuntimeReviewModel = (draft: BusinessDraft): BusinessDraftRuntimeReview =>
  createDraftRuntimeReview(draft);

export const listBusinessDraftStoreRecords = (): BusinessApiResponse<BusinessDraftStoreRecord[]> =>
  businessApiResponse(listDraftStoreRecords(), { links: { self: draftStorePath() }, action: "CREATE_BUSINESS_REQUEST" });

export const getBusinessDraftStoreRecordById = (draftId: BusinessId): BusinessApiResponse<BusinessDraftStoreRecord | null> => {
  const record = getDraftStoreRecordById(draftId);
  return record
    ? businessApiResponse(record, { links: { self: draftStorePath(draftId) }, action: "CREATE_BUSINESS_REQUEST" })
    : draftNotFound(draftId, draftStorePath(draftId));
};

export const createBusinessDraftStoreRecordMock = (draft: BusinessDraft): BusinessApiResponse<BusinessDraftStoreRecord> =>
  businessApiResponse(createDraftStoreRecord(draft), {
    links: { self: draftStorePath() },
    action: "CREATE_BUSINESS_REQUEST",
    mockMutation: true
  });

export const updateBusinessDraftStoreRecordMock = (
  draftId: BusinessId,
  patch: BusinessDraftStorePatch
): BusinessApiResponse<BusinessDraftStoreRecord | null> => {
  const record = updateDraftStoreRecord(draftId, patch);
  return record
    ? businessApiResponse(record, { links: { self: draftStorePath(draftId) }, action: "CREATE_BUSINESS_REQUEST", mockMutation: true })
    : draftNotFound(draftId, draftStorePath(draftId));
};

export const deleteBusinessDraftStoreRecordMock = (draftId: BusinessId): BusinessApiResponse<{ deleted: boolean; draftId: BusinessId; mock: true; readOnly: true; simulationOnly: true } | null> => {
  const deleted = deleteDraftStoreRecord(draftId);
  return deleted
    ? businessApiResponse({ deleted: true, draftId, mock: true, readOnly: true, simulationOnly: true }, { links: { self: draftStorePath(draftId) }, action: "CREATE_BUSINESS_REQUEST", mockMutation: true })
    : draftNotFound(draftId, draftStorePath(draftId));
};
