import type { BusinessCapability } from "../capabilities/business.capabilities.js";
import type { BusinessPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessExecutionPolicy, BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import type { BusinessWorkflowTemplate, BusinessWorkflowType } from "../workflows/business.workflow-types.js";
import type { FundingType, RequestType, RiskTier } from "../types/business.enums.js";
import type { BusinessId } from "../types/business.types.js";

export const BUSINESS_DRAFT_TYPES = [
  "GENERAL_BUSINESS_REQUEST",
  "DAO_PLUGIN_REQUEST",
  "ACS_SERVICE_REQUEST",
  "TREASURY_SPONSORSHIP_REQUEST",
  "DEBENTURE_FUNDING_REQUEST",
  "ECOSYSTEM_INFRASTRUCTURE_REQUEST",
  "PRIVATE_DEVELOPMENT_REQUEST"
] as const;

export type BusinessDraftType = (typeof BUSINESS_DRAFT_TYPES)[number];

export const BUSINESS_DRAFT_FIELD_TYPES = [
  "TEXT",
  "TEXTAREA",
  "NUMBER",
  "BOOLEAN",
  "SELECT"
] as const;

export type BusinessDraftFieldType = (typeof BUSINESS_DRAFT_FIELD_TYPES)[number];

export interface BusinessDraftFieldOption {
  label: string;
  value: string;
}

export interface BusinessDraftField {
  name: string;
  label: string;
  fieldType: BusinessDraftFieldType;
  required: boolean;
  options?: BusinessDraftFieldOption[];
  defaultValue?: string | number | boolean;
}

export interface BusinessDraftTemplate {
  draftType: BusinessDraftType;
  title: string;
  description: string;
  fields: BusinessDraftField[];
  requiredFields: string[];
  optionalFields: string[];
  defaultValues: Record<string, string | number | boolean>;
  relatedRuntimeAction: BusinessRuntimeAction;
  expectedWorkflowType: BusinessWorkflowType;
  defaultExecutionPolicy: BusinessRuntimeAction;
  governanceRequirement: boolean;
  treasuryRequirement: boolean;
  acsRequirement: boolean;
  telemetryRequirement: boolean;
  mock: true;
  readOnly: true;
}

export interface BusinessDraft {
  draftType: BusinessDraftType;
  values: Record<string, string | number | boolean | undefined>;
  requesterIdentityId?: BusinessId;
  mock: true;
  readOnly: true;
}

export interface BusinessDraftValidationIssue {
  field?: string;
  code: string;
  message: string;
  severity: "INFO" | "WARNING" | "ERROR" | "CRITICAL";
  blocking: boolean;
  suggestion: string;
}

export interface BusinessDraftValidationResult {
  valid: boolean;
  missingFields: string[];
  issues: BusinessDraftValidationIssue[];
  mock: true;
  readOnly: true;
}

export interface BusinessDraftRiskReview {
  inferredRiskTier: RiskTier;
  reason: string;
  mock: true;
  readOnly: true;
}

export interface BusinessDraftCapabilityReview {
  requiredCapabilities: BusinessCapability[];
  mock: true;
  readOnly: true;
}

export interface BusinessDraftPermissionReview {
  identityId: BusinessId;
  decision: BusinessPermissionDecision;
  mock: true;
  readOnly: true;
}

export interface BusinessDraftExecutionReview {
  policy: BusinessExecutionPolicy;
  executable: false;
  mock: true;
  readOnly: true;
}

export interface BusinessDraftRuntimeReview {
  draftType: BusinessDraftType;
  inferredRequestCategory: RequestType;
  inferredFundingModel: FundingType;
  riskReview: BusinessDraftRiskReview;
  capabilityReview: BusinessDraftCapabilityReview;
  permissionReview: BusinessDraftPermissionReview;
  executionReview: BusinessDraftExecutionReview;
  governanceRequirement: boolean;
  treasuryRequirement: boolean;
  acsRequirement: boolean;
  telemetryRequirement: boolean;
  workflowTemplate: BusinessWorkflowTemplate;
  missingFields: string[];
  validationWarnings: BusinessDraftValidationIssue[];
  nonExecutionStatus: "MOCK_READ_ONLY";
  mock: true;
  readOnly: true;
}

export interface BusinessDraftPreviewPanel {
  title: string;
  items: { label: string; value: string | number | boolean | string[] }[];
}

export interface BusinessDraftPreviewModel {
  summary: BusinessDraftPreviewPanel;
  fieldGroups: BusinessDraftPreviewPanel[];
  riskPanel: BusinessDraftPreviewPanel;
  capabilityPanel: BusinessDraftPreviewPanel;
  permissionPanel: BusinessDraftPreviewPanel;
  executionPolicyPanel: BusinessDraftPreviewPanel;
  governancePanel: BusinessDraftPreviewPanel;
  treasuryPanel: BusinessDraftPreviewPanel;
  acsPanel: BusinessDraftPreviewPanel;
  telemetryPanel: BusinessDraftPreviewPanel;
  validationPanel: BusinessDraftPreviewPanel;
  nonExecutionNotice: string;
  runtimeReview: BusinessDraftRuntimeReview;
  validation: BusinessDraftValidationResult;
  mock: true;
  readOnly: true;
}

export const BUSINESS_DRAFT_STORE_STATUSES = [
  "LOCAL_DRAFT",
  "PREPARED",
  "VALIDATED",
  "NEEDS_REVIEW",
  "DISCARDED"
] as const;

export type BusinessDraftStoreStatus = (typeof BUSINESS_DRAFT_STORE_STATUSES)[number];

export interface BusinessDraftStoreRecord {
  id: BusinessId;
  draft: BusinessDraft;
  status: BusinessDraftStoreStatus;
  title: string;
  validation: BusinessDraftValidationResult;
  preview: BusinessDraftPreviewModel;
  createdAt: string;
  updatedAt: string;
  mock: true;
  readOnly: true;
}

export interface BusinessDraftStorePatch {
  draft?: BusinessDraft;
  status?: BusinessDraftStoreStatus;
  title?: string;
}

export interface BusinessDraftStorageAdapter {
  list(): BusinessDraftStoreRecord[];
  get(draftId: BusinessId): BusinessDraftStoreRecord | undefined;
  set(record: BusinessDraftStoreRecord): BusinessDraftStoreRecord;
  delete(draftId: BusinessId): boolean;
  clear(): void;
  mock: true;
  readOnly: true;
}

export const BUSINESS_DRAFT_READINESS_CATEGORIES = [
  "STRUCTURAL_READINESS",
  "GOVERNANCE_READINESS",
  "TREASURY_READINESS",
  "ACS_READINESS",
  "IDENTITY_READINESS",
  "FUNDING_READINESS",
  "SECURITY_READINESS",
  "TELEMETRY_READINESS"
] as const;

export type BusinessDraftReadinessCategory = (typeof BUSINESS_DRAFT_READINESS_CATEGORIES)[number];

export interface BusinessDraftReadinessCategoryReview {
  category: BusinessDraftReadinessCategory;
  ready: boolean;
  score: number;
  blockers: string[];
  warnings: string[];
  detail: string;
}

export interface BusinessDraftReadinessReview {
  draftId: BusinessId;
  draftType: BusinessDraftType;
  title: string;
  readinessScore: number;
  categories: BusinessDraftReadinessCategoryReview[];
  blockers: string[];
  warnings: string[];
  requiredReviews: string[];
  nextRecommendedStep: string;
  disabledFutureActions: string[];
  validation: BusinessDraftValidationResult;
  runtimeReview: BusinessDraftRuntimeReview;
  mock: true;
  readOnly: true;
}
