import { ACSRuntimeStatus, FundingStatus, ProjectStatus, ProjectType, TreasuryExposureStatus } from "../types/business.enums.js";
import type { BusinessProjectRegistryView } from "../registry/business.registry.js";
import type { BusinessWorkflowInstance, BusinessWorkflowReadiness, BusinessWorkflowStep, BusinessWorkflowType } from "./business.workflow-types.js";

export const workflowTypeForProject = (view: BusinessProjectRegistryView): BusinessWorkflowType => {
  if (view.project.projectType === ProjectType.DAO_PLUGIN) return "DAO_PLUGIN_WORKFLOW";
  if (view.project.projectType === ProjectType.ENTERPRISE_ACS) return "ACS_PROVISIONING_WORKFLOW";
  if (view.funding?.debentureId) return "DEBENTURE_FUNDED_PROJECT_WORKFLOW";
  if (view.project.projectType === ProjectType.TREASURY_SPONSORED_ASSET) return "TREASURY_SPONSORED_ASSET_WORKFLOW";
  if (view.project.riskTier === "TIER_1_CRITICAL_INFRASTRUCTURE") return "ECOSYSTEM_PRESERVATION_WORKFLOW";
  return "PRIVATE_CONTRACT_WORKFLOW";
};

const projectIsOperational = (view: BusinessProjectRegistryView): boolean =>
  [ProjectStatus.ACTIVE, ProjectStatus.MAINTENANCE, ProjectStatus.DEPLOYED].includes(view.project.status);

const hasGovernanceReference = (view: BusinessProjectRegistryView): boolean =>
  Boolean(view.project.governanceReference.constitutionalCompatibility && view.project.governanceReference.treasuryRestrictions.length > 0);

const hasTreasuryVisibility = (view: BusinessProjectRegistryView): boolean =>
  view.treasuryExposures.length > 0 && view.treasuryExposures.every((exposure) => exposure.governanceReference.treasuryRestrictions.length > 0);

const hasFundingProgress = (view: BusinessProjectRegistryView): boolean =>
  Boolean(view.funding && view.funding.status !== FundingStatus.DRAFT && view.funding.targetAmount >= 0);

const hasACSVisibility = (view: BusinessProjectRegistryView): boolean => view.acsRuntimes.length > 0;

const hasTelemetry = (view: BusinessProjectRegistryView): boolean => view.telemetryEvents.length > 0 || view.runtimeEvents.length > 0;

const stepComplete = (step: BusinessWorkflowStep, view: BusinessProjectRegistryView): boolean => {
  if (step.stepId.includes("intake")) return Boolean(view.request);
  if (step.stepId.includes("identity") || step.stepId.includes("federation")) return Boolean(view.owner);
  if (step.stepId.includes("governance") || step.stepId.includes("risk")) return hasGovernanceReference(view);
  if (step.stepId.includes("funding")) return hasFundingProgress(view);
  if (step.stepId.includes("treasury") || step.stepId.includes("debenture")) return hasTreasuryVisibility(view) && (!step.stepId.includes("debenture") || Boolean(view.debenture));
  if (step.stepId.includes("asset")) return Boolean(view.asset);
  if (step.stepId.includes("revenue")) return view.revenueRecords.length > 0;
  if (step.stepId.includes("acs") || step.stepId.includes("isolation") || step.stepId.includes("runtime") || step.stepId.includes("monitoring")) return hasACSVisibility(view);
  if (step.stepId.includes("continuity") || step.stepId.includes("readiness") || step.stepId.includes("delivery")) return projectIsOperational(view);
  return false;
};

const blockersForStep = (step: BusinessWorkflowStep, view: BusinessProjectRegistryView): string[] => {
  const blockers: string[] = [];
  if (step.governanceRequired && !hasGovernanceReference(view)) blockers.push("governance reference is missing");
  if (step.treasuryRequired && !hasTreasuryVisibility(view)) blockers.push("treasury exposure visibility is missing");
  if (step.acsRequired && !hasACSVisibility(view)) blockers.push("ACS runtime visibility is missing");
  if (step.acsRequired && view.acsRuntimes.some((runtime) => runtime.status === ACSRuntimeStatus.REQUESTED)) blockers.push("ACS runtime remains requested and is not provisioned");
  if (step.telemetryRequired && !hasTelemetry(view)) blockers.push("telemetry visibility is missing");
  if (step.stepId.includes("funding") && (view.funding?.status === FundingStatus.DRAFT || view.funding?.status === FundingStatus.GOVERNANCE_REVIEW)) blockers.push("funding remains under review");
  if (step.stepId.includes("revenue") && view.revenueRecords.length === 0) blockers.push("revenue routing record is missing");
  if (step.stepId.includes("debenture") && !view.debenture) blockers.push("debenture record is missing");
  if (step.stepId.includes("treasury") && view.treasuryExposures.some((exposure) => exposure.status === TreasuryExposureStatus.UNDER_REVIEW)) blockers.push("treasury exposure remains under review");
  return blockers;
};

export const hydrateWorkflowSteps = (workflow: BusinessWorkflowInstance, view: BusinessProjectRegistryView): BusinessWorkflowStep[] => {
  const completed = new Set<string>();

  return workflow.steps.map((step) => {
    const dependencyComplete = step.dependsOn.every((dependency) => completed.has(dependency));
    const blockingIssues = blockersForStep(step, view);
    const complete = dependencyComplete && stepComplete(step, view);
    const status: BusinessWorkflowStep["status"] = complete
      ? "COMPLETED"
      : blockingIssues.length > 0
        ? "BLOCKED"
        : dependencyComplete
          ? "ACTIVE"
          : "PENDING";

    if (status === "COMPLETED") completed.add(step.stepId);

    return {
      ...step,
      status,
      blockingIssues
    };
  });
};

export const calculateWorkflowReadiness = (workflow: BusinessWorkflowInstance): BusinessWorkflowReadiness => {
  const requiredSteps = workflow.steps.filter((step) => step.required);
  const completedRequiredSteps = requiredSteps.filter((step) => step.status === "COMPLETED").length;
  const blockerCount = workflow.steps.reduce((sum, step) => sum + step.blockingIssues.length, 0);
  const progressPercent = requiredSteps.length === 0 ? 100 : Math.round((completedRequiredSteps / requiredSteps.length) * 100);

  return {
    projectId: workflow.projectId,
    workflowType: workflow.workflowType,
    ready: blockerCount === 0 && completedRequiredSteps === requiredSteps.length,
    completedRequiredSteps,
    totalRequiredSteps: requiredSteps.length,
    blockerCount,
    progressPercent,
    mock: true,
    readOnly: true
  };
};
