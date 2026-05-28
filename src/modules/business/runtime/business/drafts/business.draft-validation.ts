import { FundingType } from "../types/business.enums.js";
import { BUSINESS_DRAFT_TYPES, type BusinessDraft, type BusinessDraftValidationIssue, type BusinessDraftValidationResult } from "./business.draft-types.js";
import { getBusinessDraftTemplate } from "./business.draft-templates.js";

const issue = (
  code: string,
  message: string,
  field: string | undefined,
  severity: BusinessDraftValidationIssue["severity"],
  blocking: boolean,
  suggestion: string
): BusinessDraftValidationIssue => ({ code, message, field, severity, blocking, suggestion });

const isBlank = (value: unknown): boolean => value === undefined || value === null || String(value).trim() === "";

export const getBusinessDraftMissingFields = (draft: BusinessDraft): string[] => {
  if (!BUSINESS_DRAFT_TYPES.includes(draft.draftType)) return ["draftType"];
  const template = getBusinessDraftTemplate(draft.draftType);
  return template.requiredFields.filter((field) => isBlank(draft.values[field]));
};

export const getBusinessDraftWarnings = (draft: BusinessDraft): BusinessDraftValidationIssue[] => {
  const issues: BusinessDraftValidationIssue[] = [];
  const values = draft.values;
  const fundingModel = values.fundingModel;
  const title = `${values.title ?? values.projectTitle ?? ""} ${values.description ?? ""}`.toLowerCase();

  if (!BUSINESS_DRAFT_TYPES.includes(draft.draftType)) {
    issues.push(issue("INVALID_DRAFT_TYPE", `Draft type ${draft.draftType} is not supported.`, "draftType", "ERROR", true, "Use a BusinessDraftType exported by the runtime."));
    return issues;
  }

  for (const field of getBusinessDraftMissingFields(draft)) {
    issues.push(issue("MISSING_REQUIRED_FIELD", `Missing required field: ${field}.`, field, "ERROR", true, "Complete this field before review."));
  }

  if (Number(values.requestedAmount ?? values.targetAmount ?? values.estimatedBudget ?? 0) < 0) {
    issues.push(issue("NEGATIVE_AMOUNT", "Financial amount cannot be negative.", undefined, "ERROR", true, "Use zero or a positive estimate."));
  }

  if (draft.draftType === "TREASURY_SPONSORSHIP_REQUEST" && isBlank(values.riskTier)) {
    issues.push(issue("TREASURY_RISK_TIER_REQUIRED", "Treasury sponsorship requires visible risk tier.", "riskTier", "ERROR", true, "Select a risk tier for treasury review."));
  }

  if (draft.draftType === "DEBENTURE_FUNDING_REQUEST") {
    if (isBlank(values.maturityEstimate)) {
      issues.push(issue("DEBENTURE_MATURITY_REQUIRED", "Debenture draft requires maturity estimate.", "maturityEstimate", "ERROR", true, "Add a draft maturity estimate."));
    }
    if (isBlank(values.aprModel)) {
      issues.push(issue("DEBENTURE_APR_REQUIRED", "Debenture draft requires APR model.", "aprModel", "ERROR", true, "Declare an APR model as draft-only."));
    }
    issues.push(issue("DEBENTURE_NON_EXECUTION", "Debenture draft cannot issue, sell, convert or repay instruments.", undefined, "WARNING", false, "Keep this as planning visibility only."));
  }

  if (draft.draftType === "ACS_SERVICE_REQUEST" && isBlank(values.isolationProfile)) {
    issues.push(issue("ACS_ISOLATION_REQUIRED", "ACS service request requires isolation profile.", "isolationProfile", "ERROR", true, "Declare tenant/runtime isolation boundaries."));
  }

  if (draft.draftType === "DAO_PLUGIN_REQUEST") {
    if (isBlank(values.daoIdentity)) {
      issues.push(issue("DAO_IDENTITY_REQUIRED", "DAO plugin request requires DAO identity.", "daoIdentity", "ERROR", true, "Select a DAO identity."));
    }
    if (isBlank(values.governanceScope)) {
      issues.push(issue("PLUGIN_SCOPE_REQUIRED", "DAO plugin request requires plugin governance scope.", "governanceScope", "ERROR", true, "Declare the plugin scope."));
    }
  }

  if ((values.governanceRequired === true || ["DAO_PLUGIN_REQUEST", "TREASURY_SPONSORSHIP_REQUEST", "DEBENTURE_FUNDING_REQUEST"].includes(draft.draftType)) && isBlank(values.governanceReference) && draft.draftType !== "DAO_PLUGIN_REQUEST") {
    issues.push(issue("GOVERNANCE_CONTEXT_REQUIRED", "Governance-required draft should expose governance context.", "governanceReference", "WARNING", false, "Use a mock/preparatory governance reference."));
  }

  if (draft.draftType === "DEBENTURE_FUNDING_REQUEST" && fundingModel && fundingModel !== FundingType.DEBENTURE) {
    issues.push(issue("FUNDING_MODEL_INCOMPATIBLE", "Debenture funding draft should use DEBENTURE funding model.", "fundingModel", "WARNING", false, "Use DEBENTURE for funding model when available."));
  }

  if (/(execute|submit to dao|issue|buy|invest now|move treasury|deploy|provision|contract call)/i.test(title)) {
    issues.push(issue("REAL_EXECUTION_LANGUAGE", "Draft text suggests real execution, which is forbidden in this runtime.", undefined, "CRITICAL", true, "Use prepare, preview, validate or review language."));
  }

  return issues;
};

export const validateBusinessDraft = (draft: BusinessDraft): BusinessDraftValidationResult => {
  const issues = getBusinessDraftWarnings(draft);
  return {
    valid: issues.every((entry) => !entry.blocking),
    missingFields: getBusinessDraftMissingFields(draft),
    issues,
    mock: true,
    readOnly: true
  };
};
