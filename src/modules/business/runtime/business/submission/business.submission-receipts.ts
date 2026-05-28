import type { BusinessId } from "../types/business.types.js";
import type { BusinessDraftSubmissionReceipt } from "./business.submission-types.js";

const receipts = new Map<string, BusinessDraftSubmissionReceipt>();
let sequence = 0;

const clone = <T>(value: T): T => structuredClone(value);
export const submissionNow = (): string => new Date().toISOString();

export const nextSubmissionId = (): BusinessId =>
  `submission-${submissionNow().replace(/[^0-9]/g, "")}-${++sequence}`;

export const storeDraftSubmissionReceipt = (receipt: BusinessDraftSubmissionReceipt): BusinessDraftSubmissionReceipt => {
  receipts.set(receipt.submissionId, clone(receipt));
  return clone(receipt);
};

export const getDraftSubmissionReceipt = (submissionId: BusinessId): BusinessDraftSubmissionReceipt | undefined => {
  const receipt = receipts.get(submissionId);
  return receipt ? clone(receipt) : undefined;
};

export const listDraftSubmissionReceipts = (): BusinessDraftSubmissionReceipt[] =>
  [...receipts.values()].map(clone).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const getDraftSubmissionHistory = (draftId: BusinessId): BusinessDraftSubmissionReceipt[] =>
  listDraftSubmissionReceipts().filter((receipt) => receipt.draftId === draftId);

export const resetDraftSubmissionReceipts = (): void => {
  receipts.clear();
  sequence = 0;
};
