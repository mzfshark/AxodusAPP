import { MOCK_DATES } from './constants';

export const notificationsMock = [
  { id: 'notification-001', type: 'governance', title: 'Proposal review pending', message: 'Treasury operating window requires review.', severity: 'medium', nucleus: 'Governance', createdAt: MOCK_DATES.recent, read: false, actionRoute: '/governance/console' },
  { id: 'notification-002', type: 'risk', title: 'Risk guard active', message: 'Defi execution remains disabled until adapters are approved.', severity: 'high', nucleus: 'Defi', createdAt: MOCK_DATES.recent, read: false, actionRoute: '/defi' },
  { id: 'notification-003', type: 'system', title: 'Mock mode enabled', message: 'Frontend is using centralized dev mock data.', severity: 'info', nucleus: 'App', createdAt: MOCK_DATES.recent, read: true, actionRoute: '/dashboard' },
  { id: 'notification-004', type: 'wallet', title: 'Wallet project id check', message: 'Wallet modal requires VITE_WALLETCONNECT_PROJECT_ID.', severity: 'medium', nucleus: 'Connect', createdAt: MOCK_DATES.recent, read: false, actionRoute: '/connect' },
  { id: 'notification-005', type: 'academy', title: 'Tutor validation pending', message: 'Three tutors await governance validation.', severity: 'low', nucleus: 'Academy', createdAt: MOCK_DATES.recent, read: true, actionRoute: '/academy' },
  { id: 'notification-006', type: 'marketplace', title: 'Product validation queued', message: 'Marketplace report pack is pending review.', severity: 'low', nucleus: 'Marketplace', createdAt: MOCK_DATES.recent, read: true, actionRoute: '/marketplace' },
  { id: 'notification-007', type: 'defi', title: 'Treasury snapshot ready', message: 'Mock treasury snapshot is available for UI validation.', severity: 'info', nucleus: 'Defi', createdAt: MOCK_DATES.recent, read: true, actionRoute: '/defi' },
  { id: 'notification-008', type: 'acs', title: 'Workflow escalated', message: 'Treasury risk workflow needs human approval.', severity: 'high', nucleus: 'ACS', createdAt: MOCK_DATES.recent, read: false, actionRoute: '/governance/console' },
];
