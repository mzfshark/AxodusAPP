import { MOCK_DATES } from './constants';

export const acsMock = {
  summary: { agentsOnline: 5, agentsDegraded: 2, agentsOffline: 1, activeWorkflows: 6, pendingReviews: 4, completedTasks: 18, riskAlerts: 3, lastSync: MOCK_DATES.recent },
  agents: [
    { id: 'acs-agent-001', name: 'Morpheus', role: 'Orchestration lead', status: 'online', nucleus: 'ACS', permissions: ['read', 'review'], lastHeartbeat: MOCK_DATES.recent, currentTask: 'Governance workflow triage', riskMode: 'guarded', autonomyLevel: 'supervised', description: 'Coordinates frontend workflow observability.' },
    { id: 'acs-agent-002', name: 'Trinity', role: 'Validation operator', status: 'online', nucleus: 'Governance', permissions: ['read', 'validate'], lastHeartbeat: MOCK_DATES.recent, currentTask: 'Proposal guard review', riskMode: 'strict', autonomyLevel: 'human-approved', description: 'Validates proposal and guardrail presentation.' },
    { id: 'acs-agent-003', name: 'Agent Smith', role: 'Policy auditor', status: 'degraded', nucleus: 'Governance', permissions: ['read'], lastHeartbeat: MOCK_DATES.recent, currentTask: 'DAO standing check', riskMode: 'strict', autonomyLevel: 'read-only', description: 'Reviews compliance and federation state.' },
    { id: 'acs-agent-004', name: 'Coder', role: 'Frontend execution', status: 'online', nucleus: 'AxodusAPP', permissions: ['read', 'suggest'], lastHeartbeat: MOCK_DATES.recent, currentTask: 'Mock data layer implementation', riskMode: 'guarded', autonomyLevel: 'supervised', description: 'Maintains UI-facing development data.' },
    { id: 'acs-agent-005', name: 'RedHat Dev', role: 'Infrastructure observer', status: 'offline', nucleus: 'MCPs', permissions: ['read'], lastHeartbeat: '2026-05-14T12:00:00.000Z', currentTask: 'No active task', riskMode: 'blocked', autonomyLevel: 'none', description: 'Infrastructure observability placeholder.' },
    { id: 'acs-agent-006', name: 'Governance Analyst', role: 'Governance reviewer', status: 'online', nucleus: 'Governance', permissions: ['read', 'review'], lastHeartbeat: MOCK_DATES.recent, currentTask: 'Constitutional review', riskMode: 'strict', autonomyLevel: 'human-approved', description: 'Reviews proposal categories and reason codes.' },
    { id: 'acs-agent-007', name: 'Risk Analyst', role: 'Treasury risk reviewer', status: 'degraded', nucleus: 'Defi', permissions: ['read', 'review'], lastHeartbeat: MOCK_DATES.recent, currentTask: 'Treasury risk snapshot', riskMode: 'strict', autonomyLevel: 'human-approved', description: 'Reviews risk indicators for financial modules.' },
    { id: 'acs-agent-008', name: 'Product Analyst', role: 'Product validator', status: 'online', nucleus: 'Marketplace', permissions: ['read', 'review'], lastHeartbeat: MOCK_DATES.recent, currentTask: 'Course listing review', riskMode: 'guarded', autonomyLevel: 'supervised', description: 'Validates product metadata and marketplace readiness.' },
  ],
  workflows: [
    { id: 'acs-workflow-001', title: 'Governance Sanitization Review', nucleus: 'Governance', status: 'active', phase: 'validation', assignedAgents: ['acs-agent-002', 'acs-agent-006'], createdAt: MOCK_DATES.recent, updatedAt: MOCK_DATES.recent, priority: 'high', blockers: [], deliverables: ['mock proposal set', 'guardrail list'], validationRequired: true },
    { id: 'acs-workflow-002', title: 'Defi Read-Only Module Planning', nucleus: 'Defi', status: 'active', phase: 'planning', assignedAgents: ['acs-agent-007'], createdAt: MOCK_DATES.recent, updatedAt: MOCK_DATES.recent, priority: 'high', blockers: ['adapter not connected'], deliverables: ['risk snapshot', 'vault mocks'], validationRequired: true },
    { id: 'acs-workflow-003', title: 'Academy Token Lock Flow Review', nucleus: 'Academy', status: 'review', phase: 'policy', assignedAgents: ['acs-agent-008'], createdAt: MOCK_DATES.recent, updatedAt: MOCK_DATES.recent, priority: 'medium', blockers: [], deliverables: ['reward policy notes'], validationRequired: true },
    { id: 'acs-workflow-004', title: 'Marketplace Course Listing Review', nucleus: 'Marketplace', status: 'review', phase: 'content', assignedAgents: ['acs-agent-008'], createdAt: MOCK_DATES.recent, updatedAt: MOCK_DATES.recent, priority: 'medium', blockers: [], deliverables: ['listing validation'], validationRequired: true },
    { id: 'acs-workflow-005', title: 'Treasury Risk Snapshot', nucleus: 'Defi', status: 'active', phase: 'risk', assignedAgents: ['acs-agent-007'], createdAt: MOCK_DATES.recent, updatedAt: MOCK_DATES.recent, priority: 'high', blockers: ['live indexer absent'], deliverables: ['mock risk overview'], validationRequired: true },
    { id: 'acs-workflow-006', title: 'Business Intake Evaluation', nucleus: 'Business', status: 'queued', phase: 'intake', assignedAgents: ['acs-agent-001'], createdAt: MOCK_DATES.recent, updatedAt: MOCK_DATES.recent, priority: 'low', blockers: [], deliverables: ['intake checklist'], validationRequired: false },
  ],
  events: [
    { id: 'acs-event-001', type: 'agent-started', title: 'Morpheus started', createdAt: MOCK_DATES.recent, severity: 'info' },
    { id: 'acs-event-002', type: 'validation-requested', title: 'Governance validation requested', createdAt: MOCK_DATES.recent, severity: 'medium' },
    { id: 'acs-event-003', type: 'workflow-escalated', title: 'Treasury risk workflow escalated', createdAt: MOCK_DATES.recent, severity: 'high' },
    { id: 'acs-event-004', type: 'governance-review-required', title: 'Human approval pending for policy change', createdAt: MOCK_DATES.recent, severity: 'high' },
    { id: 'acs-event-005', type: 'task-completed', title: 'Marketplace listing validation completed', createdAt: MOCK_DATES.recent, severity: 'info' },
  ],
};
