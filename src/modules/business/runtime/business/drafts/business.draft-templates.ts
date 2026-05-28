import {
  DebentureType,
  FundingType,
  PluginType,
  RequestType,
  RiskTier
} from "../types/business.enums.js";
import type { BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import type { BusinessWorkflowType } from "../workflows/business.workflow-types.js";
import type { BusinessDraftField, BusinessDraftTemplate, BusinessDraftType } from "./business.draft-types.js";

const options = (values: string[]) => values.map((value) => ({ label: value, value }));

const text = (name: string, label: string, required = true, defaultValue?: string): BusinessDraftField => ({ name, label, fieldType: "TEXT", required, defaultValue });
const textarea = (name: string, label: string, required = true, defaultValue?: string): BusinessDraftField => ({ name, label, fieldType: "TEXTAREA", required, defaultValue });
const number = (name: string, label: string, required = true): BusinessDraftField => ({ name, label, fieldType: "NUMBER", required, defaultValue: "" });
const bool = (name: string, label: string, defaultValue = false): BusinessDraftField => ({ name, label, fieldType: "BOOLEAN", required: false, defaultValue });
const select = (name: string, label: string, allowed: string[], required = true, defaultValue?: string): BusinessDraftField => ({
  name,
  label,
  fieldType: "SELECT",
  required,
  options: options(allowed),
  defaultValue
});

const baseFields = (): BusinessDraftField[] => [
  text("title", "Request title"),
  textarea("description", "Request description"),
  select("requesterIdentity", "Requester identity", ["id-axodus-core", "id-harmony-dao", "id-enterprise-sample"], true, "id-axodus-core"),
  select("requestCategory", "Request category", Object.values(RequestType), true, RequestType.ENTERPRISE_DEVELOPMENT),
  select("fundingModel", "Preferred funding model", Object.values(FundingType), true, FundingType.HYBRID),
  number("estimatedBudget", "Estimated budget", false),
  text("maintenanceNeeds", "Expected maintenance needs", false),
  textarea("ecosystemImpact", "Expected ecosystem impact", false),
  bool("acsRequired", "ACS required"),
  bool("governanceRequired", "Governance required"),
  bool("treasuryExposureExpected", "Treasury exposure expected"),
  text("telemetryRequirements", "Telemetry requirements", false)
];

const template = (
  draftType: BusinessDraftType,
  title: string,
  description: string,
  fields: BusinessDraftField[],
  relatedRuntimeAction: BusinessRuntimeAction,
  expectedWorkflowType: BusinessWorkflowType,
  requirements: { governance?: boolean; treasury?: boolean; acs?: boolean; telemetry?: boolean } = {}
): BusinessDraftTemplate => {
  const requiredFields = fields.filter((field) => field.required).map((field) => field.name);
  const optionalFields = fields.filter((field) => !field.required).map((field) => field.name);
  const defaultValues = Object.fromEntries(fields.flatMap((field) => field.defaultValue !== undefined ? [[field.name, field.defaultValue]] : [])) as Record<string, string | number | boolean>;

  return {
    draftType,
    title,
    description,
    fields,
    requiredFields,
    optionalFields,
    defaultValues,
    relatedRuntimeAction,
    expectedWorkflowType,
    defaultExecutionPolicy: relatedRuntimeAction,
    governanceRequirement: requirements.governance ?? false,
    treasuryRequirement: requirements.treasury ?? false,
    acsRequirement: requirements.acs ?? false,
    telemetryRequirement: requirements.telemetry ?? true,
    mock: true,
    readOnly: true
  };
};

export const BUSINESS_DRAFT_TEMPLATES: Record<BusinessDraftType, BusinessDraftTemplate> = {
  GENERAL_BUSINESS_REQUEST: template(
    "GENERAL_BUSINESS_REQUEST",
    "General Business Request Draft",
    "Prepare a general Business intake request without submission.",
    baseFields(),
    "CREATE_BUSINESS_REQUEST",
    "PRIVATE_CONTRACT_WORKFLOW",
    { telemetry: true }
  ),

  DAO_PLUGIN_REQUEST: template(
    "DAO_PLUGIN_REQUEST",
    "DAO Plugin Request Draft",
    "Prepare a DAO plugin request for governance review only.",
    [
      select("daoIdentity", "DAO identity", ["id-harmony-dao"], true, "id-harmony-dao"),
      text("daoName", "DAO name", true, "Harmony DAO"),
      text("chainNetwork", "Chain / network", true, "Harmony"),
      select("pluginType", "Plugin type", Object.values(PluginType), true, PluginType.GOVERNANCE),
      textarea("pluginPurpose", "Plugin purpose", true, "Voting plugin preparation with governance review only."),
      text("governanceScope", "Governance scope", true, "Proposal lifecycle and voting model compatibility."),
      text("votingModelAffected", "Voting model affected", false, "HIP / RP voting"),
      bool("treasuryInteractionExpected", "Treasury interaction expected"),
      text("federationLevel", "Federation level", false),
      text("maintenanceOwner", "Maintenance owner", true, "id-axodus-core"),
      text("fundingSource", "Funding source", true, "DAO treasury review")
    ],
    "PREPARE_GOVERNANCE_REVIEW",
    "DAO_PLUGIN_WORKFLOW",
    { governance: true, telemetry: true }
  ),

  ACS_SERVICE_REQUEST: template(
    "ACS_SERVICE_REQUEST",
    "ACS Service Request Draft",
    "Prepare an ACS service request without provisioning.",
    [
      select("requesterIdentity", "Requester identity", ["id-enterprise-sample", "id-axodus-core"], true, "id-enterprise-sample"),
      text("acsRuntimeType", "ACS runtime type", true, "DEDICATED_BUSINESS_RUNTIME"),
      text("isolationProfile", "Isolation profile", true, "TENANT_ISOLATED"),
      text("memoryScope", "Memory scope", true, "PROJECT_SCOPED_MEMORY"),
      text("permissionProfile", "Permission profile", true, "READ_ONLY_ANALYSIS"),
      text("computeProfile", "Compute profile", true, "STANDARD_REVIEW_RUNTIME"),
      bool("humanReviewRequirement", "Human review requirement", true),
      textarea("workflowObjective", "Workflow objective", true, "Classify request, summarize requirements and prepare human review."),
      text("operatingScope", "Enterprise or DAO scope", true, "ENTERPRISE"),
      text("telemetryRequirements", "Telemetry requirements", true, "Runtime events, lifecycle telemetry and security validator visibility.")
    ],
    "PREPARE_ACS_PROVISIONING_REQUEST",
    "ACS_PROVISIONING_WORKFLOW",
    { governance: true, acs: true, telemetry: true }
  ),

  TREASURY_SPONSORSHIP_REQUEST: template(
    "TREASURY_SPONSORSHIP_REQUEST",
    "Treasury Sponsorship Request Draft",
    "Prepare treasury sponsorship visibility without movement or allocation.",
    [
      text("projectTitle", "Project title"),
      select("projectCategory", "Project category", Object.values(RequestType), true, RequestType.ECOSYSTEM_INFRASTRUCTURE),
      textarea("strategicJustification", "Strategic justification"),
      number("requestedAmount", "Requested amount"),
      text("currency", "Currency", true),
      select("riskTier", "Risk tier", Object.values(RiskTier), true, RiskTier.TIER_2_ECOSYSTEM_STRATEGIC),
      text("expectedReturn", "Expected return", false),
      text("repaymentModel", "Repayment model", false),
      text("revenueModel", "Revenue model"),
      text("governanceReference", "Governance reference"),
      text("milestoneFundingPreference", "Milestone funding preference", false)
    ],
    "PREPARE_FUNDING_REVIEW",
    "TREASURY_SPONSORED_ASSET_WORKFLOW",
    { governance: true, treasury: true, telemetry: true }
  ),

  DEBENTURE_FUNDING_REQUEST: template(
    "DEBENTURE_FUNDING_REQUEST",
    "Debenture Funding Request Draft",
    "Prepare debenture funding terms without issuance, purchase or conversion.",
    [
      text("projectTitle", "Project title"),
      select("debentureType", "Debenture type", Object.values(DebentureType), true, DebentureType.CONVERTIBLE),
      bool("convertible", "Convertible flag", true),
      number("targetAmount", "Target amount"),
      text("currency", "Currency"),
      text("aprModel", "APR model"),
      text("maturityEstimate", "Maturity estimate"),
      text("repaymentSource", "Repayment source"),
      textarea("fundingPurpose", "Funding purpose"),
      select("riskTier", "Risk tier", Object.values(RiskTier), true, RiskTier.TIER_2_ECOSYSTEM_STRATEGIC),
      bool("governanceRequired", "Governance requirement", true),
      text("treasuryExposureExpectation", "Treasury exposure expectation")
    ],
    "PREPARE_DEBENTURE_DRAFT",
    "DEBENTURE_FUNDED_PROJECT_WORKFLOW",
    { governance: true, treasury: true, telemetry: true }
  ),

  ECOSYSTEM_INFRASTRUCTURE_REQUEST: template(
    "ECOSYSTEM_INFRASTRUCTURE_REQUEST",
    "Ecosystem Infrastructure Request Draft",
    "Prepare an ecosystem infrastructure request for review.",
    [
      ...baseFields(),
      select("riskTier", "Risk tier", Object.values(RiskTier), false, RiskTier.TIER_2_ECOSYSTEM_STRATEGIC)
    ],
    "REGISTER_OPERATIONAL_ASSET_DRAFT",
    "ECOSYSTEM_PRESERVATION_WORKFLOW",
    { governance: true, treasury: true, telemetry: true }
  ),

  PRIVATE_DEVELOPMENT_REQUEST: template(
    "PRIVATE_DEVELOPMENT_REQUEST",
    "Private Development Request Draft",
    "Prepare a private development request without contract or billing execution.",
    baseFields().map((field) => field.name === "requestCategory" ? { ...field, defaultValue: RequestType.ENTERPRISE_DEVELOPMENT } : field),
    "CREATE_BUSINESS_REQUEST",
    "PRIVATE_CONTRACT_WORKFLOW",
    { telemetry: true }
  )
};

export const getBusinessDraftTemplate = (draftType: BusinessDraftType): BusinessDraftTemplate =>
  structuredClone(BUSINESS_DRAFT_TEMPLATES[draftType]);

export const listBusinessDraftTemplates = (): BusinessDraftTemplate[] =>
  Object.values(BUSINESS_DRAFT_TEMPLATES).map((entry) => structuredClone(entry));
