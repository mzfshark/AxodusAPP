import { MOCK_DATES } from './constants';

export const reportsMock = [
  { id: 'report-001', title: 'Treasury Snapshot May 2026', type: 'Treasury Report', period: '2026-05', status: 'draft', publishedAt: null, nucleus: 'Defi', summary: 'Mock treasury allocation and risk summary.', route: '/defi' },
  { id: 'report-002', title: 'Governance Operations Review', type: 'Governance Report', period: '2026-05', status: 'published', publishedAt: MOCK_DATES.recent, nucleus: 'Governance', summary: 'Proposal and guardrail status for dev.', route: '/governance/console' },
  { id: 'report-003', title: 'Risk Guardrail Register', type: 'Risk Report', period: '2026-05', status: 'draft', publishedAt: null, nucleus: 'Governance', summary: 'Current constitutional and treasury guardrails.', route: '/governance/console' },
  { id: 'report-004', title: 'MVP Roadmap Update', type: 'Roadmap Update', period: '2026-Q2', status: 'draft', publishedAt: null, nucleus: 'App', summary: 'Governance + ACS + Defi execution plan.', route: '/dashboard' },
  { id: 'report-005', title: 'ACS Operational Report', type: 'Operational Report', period: '2026-05', status: 'published', publishedAt: MOCK_DATES.recent, nucleus: 'ACS', summary: 'Agent, workflow, and review queue status.', route: '/governance/console' },
  { id: 'report-006', title: 'Academy Readiness Report', type: 'Academy Report', period: '2026-05', status: 'draft', publishedAt: null, nucleus: 'Academy', summary: 'Course and tutor validation state.', route: '/academy' },
  { id: 'report-007', title: 'Marketplace Validation Report', type: 'Marketplace Report', period: '2026-05', status: 'draft', publishedAt: null, nucleus: 'Marketplace', summary: 'Seller and product governance validation state.', route: '/marketplace' },
];
