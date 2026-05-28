import type { BusinessWorkflowStep, BusinessWorkflowTemplate, BusinessWorkflowType } from "./business.workflow-types.js";

const step = (
  stepId: string,
  label: string,
  description: string,
  dependsOn: string[] = [],
  flags: Partial<Pick<BusinessWorkflowStep, "governanceRequired" | "treasuryRequired" | "acsRequired" | "telemetryRequired">> = {}
): BusinessWorkflowStep => ({
  stepId,
  label,
  description,
  status: "PENDING",
  required: true,
  dependsOn,
  governanceRequired: flags.governanceRequired ?? false,
  treasuryRequired: flags.treasuryRequired ?? false,
  acsRequired: flags.acsRequired ?? false,
  telemetryRequired: flags.telemetryRequired ?? true,
  blockingIssues: []
});

const template = (
  workflowType: BusinessWorkflowType,
  label: string,
  description: string,
  steps: BusinessWorkflowStep[]
): BusinessWorkflowTemplate => ({
  workflowType,
  label,
  description,
  steps,
  mock: true,
  readOnly: true
});

export const BUSINESS_WORKFLOW_TEMPLATES: Record<BusinessWorkflowType, BusinessWorkflowTemplate> = {
  PRIVATE_CONTRACT_WORKFLOW: template("PRIVATE_CONTRACT_WORKFLOW", "Private Contract Workflow", "Private development request lifecycle for enterprise or private clients.", [
    step("intake", "Intake", "Register and classify the private development request."),
    step("identity-review", "Identity Review", "Confirm requester profile and scope.", ["intake"]),
    step("scope-definition", "Scope Definition", "Define delivery scope and operational constraints.", ["identity-review"]),
    step("funding-review", "Funding Review", "Review funding model without billing execution.", ["scope-definition"], { treasuryRequired: true }),
    step("delivery-readiness", "Delivery Readiness", "Prepare development readiness without deployment execution.", ["funding-review"])
  ]),

  DAO_PLUGIN_WORKFLOW: template("DAO_PLUGIN_WORKFLOW", "DAO Plugin Workflow", "DAO plugin review, funding and governance preparation lifecycle.", [
    step("dao-intake", "DAO Intake", "Register DAO plugin request."),
    step("federation-context", "Federation Context", "Verify DAO federation standing.", ["dao-intake"], { governanceRequired: true }),
    step("governance-review", "Governance Review", "Prepare constitutional and plugin governance review.", ["federation-context"], { governanceRequired: true }),
    step("funding-selection", "Funding Selection", "Prepare funding path without treasury movement.", ["governance-review"], { treasuryRequired: true }),
    step("plugin-readiness", "Plugin Readiness", "Prepare plugin lifecycle visibility without deployment.", ["funding-selection"])
  ]),

  TREASURY_SPONSORED_ASSET_WORKFLOW: template("TREASURY_SPONSORED_ASSET_WORKFLOW", "Treasury Sponsored Asset Workflow", "Operational asset lifecycle with visible treasury exposure and governance constraints.", [
    step("asset-intake", "Asset Intake", "Register treasury-sponsored asset proposal."),
    step("governance-compatibility", "Governance Compatibility", "Check governance compatibility.", ["asset-intake"], { governanceRequired: true }),
    step("treasury-exposure-review", "Treasury Exposure Review", "Validate exposure visibility and limits.", ["governance-compatibility"], { treasuryRequired: true }),
    step("asset-runtime-readiness", "Asset Runtime Readiness", "Prepare lifecycle and telemetry visibility.", ["treasury-exposure-review"]),
    step("revenue-visibility", "Revenue Visibility", "Expose routing model without distribution.", ["asset-runtime-readiness"], { treasuryRequired: true })
  ]),

  DEBENTURE_FUNDED_PROJECT_WORKFLOW: template("DEBENTURE_FUNDED_PROJECT_WORKFLOW", "Debenture Funded Project Workflow", "Debenture-backed project planning and visibility lifecycle.", [
    step("project-intake", "Project Intake", "Register project and linked funding intent."),
    step("governance-review", "Governance Review", "Prepare governance review before debenture planning.", ["project-intake"], { governanceRequired: true }),
    step("debenture-draft", "Debenture Draft", "Prepare debenture terms without issuance.", ["governance-review"], { treasuryRequired: true }),
    step("treasury-exposure", "Treasury Exposure", "Expose treasury/debenture exposure.", ["debenture-draft"], { treasuryRequired: true }),
    step("revenue-phase-readiness", "Revenue Phase Readiness", "Prepare revenue routing visibility.", ["treasury-exposure"], { treasuryRequired: true })
  ]),

  ACS_PROVISIONING_WORKFLOW: template("ACS_PROVISIONING_WORKFLOW", "ACS Provisioning Workflow", "ACS service request visibility lifecycle without provisioning.", [
    step("acs-intake", "ACS Intake", "Register ACS request and project context.", [], { acsRequired: true }),
    step("identity-scope", "Identity Scope", "Validate requester and enterprise scope.", ["acs-intake"], { acsRequired: true }),
    step("isolation-review", "Isolation Review", "Prepare isolation and memory boundaries.", ["identity-scope"], { acsRequired: true }),
    step("governance-check", "Governance Check", "Prepare governance review where required.", ["isolation-review"], { governanceRequired: true, acsRequired: true }),
    step("runtime-readiness", "Runtime Readiness", "Expose runtime status without MCP provisioning.", ["governance-check"], { acsRequired: true })
  ]),

  ECOSYSTEM_PRESERVATION_WORKFLOW: template("ECOSYSTEM_PRESERVATION_WORKFLOW", "Ecosystem Preservation Workflow", "Critical infrastructure preservation lifecycle for Axodus ecosystem assets.", [
    step("preservation-intake", "Preservation Intake", "Register critical infrastructure preservation scope."),
    step("risk-classification", "Risk Classification", "Classify infrastructure risk and continuity needs.", ["preservation-intake"], { governanceRequired: true }),
    step("treasury-continuity", "Treasury Continuity", "Expose treasury continuity requirements.", ["risk-classification"], { treasuryRequired: true }),
    step("operational-monitoring", "Operational Monitoring", "Expose telemetry and ACS monitoring.", ["treasury-continuity"], { acsRequired: true }),
    step("continuity-readiness", "Continuity Readiness", "Prepare continuity status for governance review.", ["operational-monitoring"], { governanceRequired: true })
  ])
};

export const getWorkflowTemplate = (workflowType: BusinessWorkflowType): BusinessWorkflowTemplate =>
  structuredClone(BUSINESS_WORKFLOW_TEMPLATES[workflowType]);
