export const BUSINESS_WORKFLOW_TYPES = [
  "PRIVATE_CONTRACT_WORKFLOW",
  "DAO_PLUGIN_WORKFLOW",
  "TREASURY_SPONSORED_ASSET_WORKFLOW",
  "DEBENTURE_FUNDED_PROJECT_WORKFLOW",
  "ACS_PROVISIONING_WORKFLOW",
  "ECOSYSTEM_PRESERVATION_WORKFLOW"
] as const;

export type BusinessWorkflowType = (typeof BUSINESS_WORKFLOW_TYPES)[number];

export const BUSINESS_WORKFLOW_STEP_STATUSES = [
  "PENDING",
  "ACTIVE",
  "COMPLETED",
  "BLOCKED",
  "SKIPPED"
] as const;

export type BusinessWorkflowStepStatus = (typeof BUSINESS_WORKFLOW_STEP_STATUSES)[number];

export interface BusinessWorkflowStep {
  stepId: string;
  label: string;
  description: string;
  status: BusinessWorkflowStepStatus;
  required: boolean;
  dependsOn: string[];
  governanceRequired: boolean;
  treasuryRequired: boolean;
  acsRequired: boolean;
  telemetryRequired: boolean;
  blockingIssues: string[];
}

export interface BusinessWorkflowTemplate {
  workflowType: BusinessWorkflowType;
  label: string;
  description: string;
  steps: BusinessWorkflowStep[];
  mock: true;
  readOnly: true;
}

export interface BusinessWorkflowInstance extends BusinessWorkflowTemplate {
  projectId: string;
  requestId?: string;
  assetId?: string;
  fundingId?: string;
  debentureId?: string;
}

export interface BusinessWorkflowReadiness {
  projectId: string;
  workflowType: BusinessWorkflowType;
  ready: boolean;
  completedRequiredSteps: number;
  totalRequiredSteps: number;
  blockerCount: number;
  progressPercent: number;
  mock: true;
  readOnly: true;
}

export interface BusinessWorkflowSummary {
  totalWorkflows: number;
  readyWorkflows: number;
  blockedWorkflows: number;
  byType: Record<string, number>;
  averageProgressPercent: number;
  mock: true;
  readOnly: true;
}
