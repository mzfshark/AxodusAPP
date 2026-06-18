import type {
  BusinessDraft,
  BusinessDraftPreviewModel,
  BusinessDraftStorageAdapter,
  BusinessDraftStorePatch,
  BusinessDraftStoreRecord,
  BusinessDraftStoreStatus,
  BusinessDraftValidationResult
} from "./business.draft-types.js";
import { getBusinessDraftPreviewModel } from "./business.draft-preview.js";
import { validateBusinessDraft } from "./business.draft-validation.js";

const clone = <T>(value: T): T => structuredClone(value);
const now = (): string => new Date().toISOString();

const createMemoryDraftStorageAdapter = (): BusinessDraftStorageAdapter => {
  const records = new Map<string, BusinessDraftStoreRecord>();

  return {
    list: () => [...records.values()].map(clone),
    get: (draftId) => {
      const record = records.get(draftId);
      return record ? clone(record) : undefined;
    },
    set: (record) => {
      records.set(record.id, clone(record));
      return clone(record);
    },
    delete: (draftId) => records.delete(draftId),
    clear: () => records.clear(),
    mock: true,
    readOnly: true
  };
};

let activeDraftStorageAdapter: BusinessDraftStorageAdapter = createMemoryDraftStorageAdapter();
let sequence = 0;

const draftTitle = (draft: BusinessDraft): string => {
  const value = draft.values.title ?? draft.values.projectTitle ?? draft.values.daoName ?? draft.values.acsRuntimeType;
  return typeof value === "string" && value.trim() ? value : draft.draftType.replaceAll("_", " ");
};

const statusFor = (validation: BusinessDraftValidationResult, requestedStatus?: BusinessDraftStoreStatus): BusinessDraftStoreStatus => {
  if (requestedStatus) return requestedStatus;
  return validation.valid ? "VALIDATED" : "NEEDS_REVIEW";
};

const buildRecord = (
  draft: BusinessDraft,
  existing?: BusinessDraftStoreRecord,
  patch: BusinessDraftStorePatch = {}
): BusinessDraftStoreRecord => {
  const timestamp = now();
  const storedDraft = clone(patch.draft ?? draft);
  const validation = validateBusinessDraft(storedDraft);
  const preview = getBusinessDraftPreviewModel(storedDraft);

  return {
    id: existing?.id ?? `draft-${timestamp.replace(/[^0-9]/g, "")}-${++sequence}`,
    draft: storedDraft,
    status: statusFor(validation, patch.status),
    title: patch.title ?? existing?.title ?? draftTitle(storedDraft),
    validation,
    preview,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    mock: true,
    readOnly: true
  };
};

export const setBusinessDraftStorageAdapter = (adapter: BusinessDraftStorageAdapter): void => {
  activeDraftStorageAdapter = adapter;
};

export const resetBusinessDraftStore = (): void => {
  activeDraftStorageAdapter.clear();
  sequence = 0;
};

export const createDraftStoreRecord = (draft: BusinessDraft): BusinessDraftStoreRecord => {
  const record = buildRecord(draft);
  return activeDraftStorageAdapter.set(record);
};

export const listDraftStoreRecords = (): BusinessDraftStoreRecord[] =>
  activeDraftStorageAdapter.list().filter((record) => record.status !== "DISCARDED");

export const getDraftStoreRecordById = (draftId: string): BusinessDraftStoreRecord | undefined =>
  activeDraftStorageAdapter.get(draftId);

export const updateDraftStoreRecord = (draftId: string, patch: BusinessDraftStorePatch): BusinessDraftStoreRecord | undefined => {
  const existing = activeDraftStorageAdapter.get(draftId);
  if (!existing) return undefined;

  const record = buildRecord(patch.draft ?? existing.draft, existing, patch);
  return activeDraftStorageAdapter.set(record);
};

export const deleteDraftStoreRecord = (draftId: string): boolean => {
  const existing = activeDraftStorageAdapter.get(draftId);
  if (!existing) return false;

  const discarded = {
    ...existing,
    status: "DISCARDED" as const,
    updatedAt: now()
  };
  activeDraftStorageAdapter.set(discarded);
  return true;
};

export const getDraftPreviewById = (draftId: string): BusinessDraftPreviewModel | undefined =>
  activeDraftStorageAdapter.get(draftId)?.preview;

export const validateDraftById = (draftId: string): BusinessDraftValidationResult | undefined =>
  activeDraftStorageAdapter.get(draftId)?.validation;
