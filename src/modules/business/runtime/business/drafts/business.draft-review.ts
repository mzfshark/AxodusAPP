import { getExecutionPolicy } from "../policies/business.execution-policy.js";
import { FundingType, RequestType } from "../types/business.enums.js";
import { getWorkflowTemplate } from "../workflows/business.workflow-templates.js";
import { getBusinessDraftTemplate } from "./business.draft-templates.js";
import type { BusinessDraft, BusinessDraftRuntimeReview } from "./business.draft-types.js";
import { getBusinessDraftCapabilityReview } from "./business.draft-capabilities.js";
import { getBusinessDraftPermissionReview } from "./business.draft-permissions.js";
import { getBusinessDraftRiskReview } from "./business.draft-risk.js";
import { getBusinessDraftMissingFields, getBusinessDraftWarnings } from "./business.draft-validation.js";

export const createBusinessDraftTemplate = (draftType: BusinessDraft["draftType"]): BusinessDraft => {
  const template = getBusinessDraftTemplate(draftType);
  return {
    draftType,
    values: structuredClone(template.defaultValues),
    requesterIdentityId: typeof template.defaultValues.requesterIdentity === "string" ? template.defaultValues.requesterIdentity : "id-axodus-core",
    mock: true,
    readOnly: true
  };
};

export const getBusinessDraftExecutionPolicy = (draft: BusinessDraft) =>
  getExecutionPolicy(getBusinessDraftTemplate(draft.draftType).relatedRuntimeAction);

export const getBusinessDraftWorkflowTemplate = (draft: BusinessDraft) =>
  getWorkflowTemplate(getBusinessDraftTemplate(draft.draftType).expectedWorkflowType);

const requestCategoryByDraftType: Record<BusinessDraft["draftType"], RequestType> = {
  GENERAL_BUSINESS_REQUEST: RequestType.ENTERPRISE_DEVELOPMENT,
  DAO_PLUGIN_REQUEST: RequestType.DAO_INFRASTRUCTURE,
  ACS_SERVICE_REQUEST: RequestType.ENTERPRISE_DEVELOPMENT,
  TREASURY_SPONSORSHIP_REQUEST: RequestType.ECOSYSTEM_INFRASTRUCTURE,
  DEBENTURE_FUNDING_REQUEST: RequestType.INTERNAL_AXODUS_PRODUCT,
  ECOSYSTEM_INFRASTRUCTURE_REQUEST: RequestType.ECOSYSTEM_INFRASTRUCTURE,
  PRIVATE_DEVELOPMENT_REQUEST: RequestType.ENTERPRISE_DEVELOPMENT
};

const fundingModelByDraftType: Record<BusinessDraft["draftType"], FundingType> = {
  GENERAL_BUSINESS_REQUEST: FundingType.HYBRID,
  DAO_PLUGIN_REQUEST: FundingType.HYBRID,
  ACS_SERVICE_REQUEST: FundingType.DIRECT,
  TREASURY_SPONSORSHIP_REQUEST: FundingType.TREASURY,
  DEBENTURE_FUNDING_REQUEST: FundingType.DEBENTURE,
  ECOSYSTEM_INFRASTRUCTURE_REQUEST: FundingType.TREASURY,
  PRIVATE_DEVELOPMENT_REQUEST: FundingType.DIRECT
};

export const getBusinessDraftRuntimeReview = (draft: BusinessDraft): BusinessDraftRuntimeReview => {
  const template = getBusinessDraftTemplate(draft.draftType);
  const executionPolicy = getBusinessDraftExecutionPolicy(draft);

  return {
    draftType: draft.draftType,
    inferredRequestCategory: typeof draft.values.requestCategory === "string" ? draft.values.requestCategory as RequestType : requestCategoryByDraftType[draft.draftType],
    inferredFundingModel: typeof draft.values.fundingModel === "string" ? draft.values.fundingModel as FundingType : fundingModelByDraftType[draft.draftType],
    riskReview: getBusinessDraftRiskReview(draft),
    capabilityReview: getBusinessDraftCapabilityReview(draft),
    permissionReview: getBusinessDraftPermissionReview(draft),
    executionReview: {
      policy: executionPolicy,
      executable: false,
      mock: true,
      readOnly: true
    },
    governanceRequirement: template.governanceRequirement || executionPolicy.governanceRequired,
    treasuryRequirement: template.treasuryRequirement || executionPolicy.treasuryApprovalRequired,
    acsRequirement: template.acsRequirement || draft.values.acsRequired === true,
    telemetryRequirement: template.telemetryRequirement,
    workflowTemplate: getWorkflowTemplate(template.expectedWorkflowType),
    missingFields: getBusinessDraftMissingFields(draft),
    validationWarnings: getBusinessDraftWarnings(draft),
    nonExecutionStatus: "MOCK_READ_ONLY",
    mock: true,
    readOnly: true
  };
};
