import { createBusinessRegistry } from "../registry/business.registry.js";
import { getProjectRegistryView } from "../registry/business.registry-selectors.js";
import type { BusinessWorkflowInstance, BusinessWorkflowStep, BusinessWorkflowSummary, BusinessWorkflowType } from "./business.workflow-types.js";
import { getWorkflowTemplate } from "./business.workflow-templates.js";
import { calculateWorkflowReadiness, hydrateWorkflowSteps, workflowTypeForProject } from "./business.workflow-readiness.js";

const clone = <T>(value: T): T | undefined => (value === undefined ? undefined : structuredClone(value));

export const getWorkflowForProject = (projectId: string): BusinessWorkflowInstance | undefined => {
  const projectView = getProjectRegistryView(projectId);
  if (!projectView) return undefined;

  const workflowType = workflowTypeForProject(projectView);
  const template = getWorkflowTemplate(workflowType);
  const workflow: BusinessWorkflowInstance = {
    ...template,
    projectId,
    requestId: projectView.request?.id,
    assetId: projectView.asset?.id,
    fundingId: projectView.funding?.id,
    debentureId: projectView.debenture?.id,
    steps: template.steps
  };

  workflow.steps = hydrateWorkflowSteps(workflow, projectView);
  return clone(workflow);
};

export { getWorkflowTemplate } from "./business.workflow-templates.js";

export const getWorkflowReadiness = (projectId: string) => {
  const workflow = getWorkflowForProject(projectId);
  return workflow ? calculateWorkflowReadiness(workflow) : undefined;
};

export const getWorkflowBlockers = (projectId: string): BusinessWorkflowStep[] => {
  const workflow = getWorkflowForProject(projectId);
  return workflow ? workflow.steps.filter((step) => step.blockingIssues.length > 0) : [];
};

export const getWorkflowProgress = (projectId: string): number => getWorkflowReadiness(projectId)?.progressPercent ?? 0;

export const getActiveWorkflowSteps = (projectId: string): BusinessWorkflowStep[] => {
  const workflow = getWorkflowForProject(projectId);
  return workflow ? workflow.steps.filter((step) => step.status === "ACTIVE" || step.status === "BLOCKED") : [];
};

export const listBusinessWorkflows = (): BusinessWorkflowInstance[] => {
  const registry = createBusinessRegistry();
  return [...registry.indexes.projectsById.keys()]
    .map((projectId) => getWorkflowForProject(projectId))
    .filter((workflow): workflow is BusinessWorkflowInstance => Boolean(workflow));
};

export const getBusinessWorkflowSummary = (): BusinessWorkflowSummary => {
  const workflows = listBusinessWorkflows();
  const readiness = workflows.map((workflow) => calculateWorkflowReadiness(workflow));

  return {
    totalWorkflows: workflows.length,
    readyWorkflows: readiness.filter((entry) => entry.ready).length,
    blockedWorkflows: readiness.filter((entry) => entry.blockerCount > 0).length,
    byType: workflows.reduce<Record<BusinessWorkflowType, number>>((acc, workflow) => {
      acc[workflow.workflowType] = (acc[workflow.workflowType] ?? 0) + 1;
      return acc;
    }, {} as Record<BusinessWorkflowType, number>),
    averageProgressPercent: readiness.length === 0 ? 0 : Math.round(readiness.reduce((sum, entry) => sum + entry.progressPercent, 0) / readiness.length),
    mock: true,
    readOnly: true
  };
};
