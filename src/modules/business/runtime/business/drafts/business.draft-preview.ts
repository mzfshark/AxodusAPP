import type { BusinessDraft, BusinessDraftPreviewModel, BusinessDraftPreviewPanel } from "./business.draft-types.js";
import { getBusinessDraftTemplate } from "./business.draft-templates.js";
import { getBusinessDraftRuntimeReview } from "./business.draft-review.js";
import { validateBusinessDraft } from "./business.draft-validation.js";

const panel = (title: string, items: BusinessDraftPreviewPanel["items"]): BusinessDraftPreviewPanel => ({ title, items });

export const getBusinessDraftPreviewModel = (draft: BusinessDraft): BusinessDraftPreviewModel => {
  const template = getBusinessDraftTemplate(draft.draftType);
  const runtimeReview = getBusinessDraftRuntimeReview(draft);
  const validation = validateBusinessDraft(draft);
  const fieldsByName = new Map(template.fields.map((field) => [field.name, field]));

  return {
    summary: panel("Draft Summary", [
      { label: "Draft type", value: draft.draftType },
      { label: "Template", value: template.title },
      { label: "Request category", value: runtimeReview.inferredRequestCategory },
      { label: "Funding model", value: runtimeReview.inferredFundingModel },
      { label: "Runtime mode", value: runtimeReview.nonExecutionStatus }
    ]),
    fieldGroups: [
      panel("Required Fields", template.requiredFields.map((field) => ({ label: fieldsByName.get(field)?.label ?? field, value: String(draft.values[field] ?? "") }))),
      panel("Optional Fields", template.optionalFields.map((field) => ({ label: fieldsByName.get(field)?.label ?? field, value: String(draft.values[field] ?? "") })))
    ],
    riskPanel: panel("Risk", [
      { label: "Inferred risk tier", value: runtimeReview.riskReview.inferredRiskTier },
      { label: "Reason", value: runtimeReview.riskReview.reason }
    ]),
    capabilityPanel: panel("Capabilities", [
      { label: "Required capabilities", value: runtimeReview.capabilityReview.requiredCapabilities }
    ]),
    permissionPanel: panel("Permission", [
      { label: "Identity", value: runtimeReview.permissionReview.identityId },
      { label: "Mode", value: runtimeReview.permissionReview.decision.mode },
      { label: "Allowed", value: runtimeReview.permissionReview.decision.allowed },
      { label: "Reason", value: runtimeReview.permissionReview.decision.reason }
    ]),
    executionPolicyPanel: panel("Execution Policy", [
      { label: "Action", value: runtimeReview.executionReview.policy.action },
      { label: "Mode", value: runtimeReview.executionReview.policy.mode },
      { label: "Executable", value: runtimeReview.executionReview.policy.executable },
      { label: "Reason", value: runtimeReview.executionReview.policy.reason }
    ]),
    governancePanel: panel("Governance", [
      { label: "Required", value: runtimeReview.governanceRequirement }
    ]),
    treasuryPanel: panel("Treasury", [
      { label: "Required", value: runtimeReview.treasuryRequirement }
    ]),
    acsPanel: panel("ACS", [
      { label: "Required", value: runtimeReview.acsRequirement }
    ]),
    telemetryPanel: panel("Telemetry", [
      { label: "Required", value: runtimeReview.telemetryRequirement }
    ]),
    validationPanel: panel("Validation", [
      { label: "Valid", value: validation.valid },
      { label: "Missing fields", value: validation.missingFields },
      { label: "Issue count", value: validation.issues.length }
    ]),
    nonExecutionNotice: "Business draft preview is mock/read-only. It cannot submit governance proposals, move treasury, issue debentures, provision ACS/MCP, distribute revenue, bill, require wallet signing or call contracts.",
    runtimeReview,
    validation,
    mock: true,
    readOnly: true
  };
};
