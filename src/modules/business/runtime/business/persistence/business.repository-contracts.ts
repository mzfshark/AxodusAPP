import type { BusinessDraftStorePatch, BusinessDraftStoreRecord } from "../drafts/business.draft-types.js";
import type { BusinessReviewQueueItem, BusinessReviewQueueStatus } from "../review/business.review-types.js";
import type { BusinessDraftSubmissionReceipt } from "../submission/business.submission-types.js";
import type { BusinessId } from "../types/business.types.js";
import type { BusinessAuditRecord } from "./business.audit-types.js";
import type {
  BusinessIdentitySnapshot,
  BusinessPermissionSnapshot,
  BusinessReadinessSnapshot,
  BusinessEventSnapshot,
  BusinessSnapshot
} from "./business.snapshot-types.js";

export interface BusinessDraftRepository {
  listDrafts(): Promise<BusinessDraftStoreRecord[]>;
  getDraftById(draftId: BusinessId): Promise<BusinessDraftStoreRecord | undefined>;
  saveDraft(draft: BusinessDraftStoreRecord): Promise<BusinessDraftStoreRecord>;
  updateDraft(draftId: BusinessId, patch: BusinessDraftStorePatch): Promise<BusinessDraftStoreRecord | undefined>;
  archiveDraft(draftId: BusinessId): Promise<boolean>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export interface BusinessSubmissionRepository {
  listSubmissions(): Promise<BusinessDraftSubmissionReceipt[]>;
  getSubmissionById(submissionId: BusinessId): Promise<BusinessDraftSubmissionReceipt | undefined>;
  saveSubmissionReceipt(receipt: BusinessDraftSubmissionReceipt): Promise<BusinessDraftSubmissionReceipt>;
  getSubmissionsByDraftId(draftId: BusinessId): Promise<BusinessDraftSubmissionReceipt[]>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export interface BusinessReviewQueueRepository {
  listQueueItems(): Promise<BusinessReviewQueueItem[]>;
  getQueueItemById(queueItemId: BusinessId): Promise<BusinessReviewQueueItem | undefined>;
  saveQueueItem(queueItem: BusinessReviewQueueItem): Promise<BusinessReviewQueueItem>;
  updateQueueItemStatus(queueItemId: BusinessId, status: BusinessReviewQueueStatus): Promise<BusinessReviewQueueItem | undefined>;
  archiveQueueItem(queueItemId: BusinessId): Promise<boolean>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export interface BusinessAuditRepository {
  appendAuditRecord(record: BusinessAuditRecord): Promise<BusinessAuditRecord>;
  listAuditRecords(): Promise<BusinessAuditRecord[]>;
  getAuditRecordsByEntity(entityId: BusinessId): Promise<BusinessAuditRecord[]>;
  getAuditRecordsByActor(actorId: BusinessId): Promise<BusinessAuditRecord[]>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export interface BusinessIdentitySnapshotRepository {
  saveIdentitySnapshot(snapshot: BusinessIdentitySnapshot): Promise<BusinessIdentitySnapshot>;
  getSnapshotsByEntity(entityId: BusinessId): Promise<BusinessIdentitySnapshot[]>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export interface BusinessPermissionSnapshotRepository {
  savePermissionSnapshot(snapshot: BusinessPermissionSnapshot): Promise<BusinessPermissionSnapshot>;
  getSnapshotsByEntity(entityId: BusinessId): Promise<BusinessPermissionSnapshot[]>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export interface BusinessReadinessSnapshotRepository {
  saveReadinessSnapshot(snapshot: BusinessReadinessSnapshot): Promise<BusinessReadinessSnapshot>;
  getSnapshotsByEntity(entityId: BusinessId): Promise<BusinessReadinessSnapshot[]>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export interface BusinessEventSnapshotRepository {
  saveEventSnapshot(snapshot: BusinessEventSnapshot): Promise<BusinessEventSnapshot>;
  getSnapshotsByEntity(entityId: BusinessId): Promise<BusinessEventSnapshot[]>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export interface BusinessSnapshotRepository {
  saveIdentitySnapshot(snapshot: BusinessIdentitySnapshot): Promise<BusinessIdentitySnapshot>;
  savePermissionSnapshot(snapshot: BusinessPermissionSnapshot): Promise<BusinessPermissionSnapshot>;
  saveReadinessSnapshot(snapshot: BusinessReadinessSnapshot): Promise<BusinessReadinessSnapshot>;
  saveEventSnapshot(snapshot: BusinessEventSnapshot): Promise<BusinessEventSnapshot>;
  getSnapshotsByEntity(entityId: BusinessId): Promise<BusinessSnapshot[]>;
  mock?: boolean;
  readOnlyPlanning?: true;
}

export const BUSINESS_REPOSITORY_CONTRACT_NAMES = [
  "BusinessDraftRepository",
  "BusinessSubmissionRepository",
  "BusinessReviewQueueRepository",
  "BusinessAuditRepository",
  "BusinessIdentitySnapshotRepository",
  "BusinessPermissionSnapshotRepository",
  "BusinessReadinessSnapshotRepository",
  "BusinessEventSnapshotRepository"
] as const;
