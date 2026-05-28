import { academyMock, acsMock, defiMock, ecosystemMock, governanceMock, marketplaceMock, walletMock } from '@/data/mock';
import { axodusModuleRegistry } from '@/config/moduleRegistry';
import { getTenantEnabledModules } from '@/runtime/moduleRegistry/moduleRegistry';

const countBy = (items, key) => items.reduce((acc, item) => {
  const value = item[key] ?? 'unknown';
  acc[value] = (acc[value] ?? 0) + 1;
  return acc;
}, {});

function resolveWalletState(wallet) {
  if (wallet?.isConnected) {
    return {
      ...walletMock.states.find((state) => state.id === 'wallet-state-connected'),
      address: wallet.address,
      shortAddress: wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Connected',
      chainId: wallet.chain,
      chainName: wallet.chain ? `Chain ${wallet.chain}` : 'Unknown chain',
      status: 'connected',
      message: 'Wallet connected through the local Reown/Wagmi runtime.',
      actionLabel: 'Open wallet',
    };
  }

  return walletMock.states.find((state) => state.id === 'wallet-state-disconnected') ?? walletMock.states[0];
}

export function buildDashboardComposition({ selectedTenant, wallet }) {
  const walletState = resolveWalletState(wallet);
  const maturityCounts = countBy(axodusModuleRegistry, 'maturity');
  const enabledTenantModules = getTenantEnabledModules(selectedTenant);
  const blockedWorkflows = acsMock.workflows.filter((workflow) => workflow.blockers?.length);
  const reviewWorkflows = acsMock.workflows.filter((workflow) => ['review', 'queued', 'active'].includes(workflow.status));
  const mockModules = axodusModuleRegistry.filter((module) => module.maturity === 'mock');
  const prototypeModules = axodusModuleRegistry.filter((module) => module.maturity === 'prototype');

  return {
    protocolOverview: {
      cards: [
        {
          id: 'protocol-status',
          title: 'Protocol Status',
          value: ecosystemMock.overview.governanceFirstStatus,
          detail: `${ecosystemMock.overview.mvpPhase} · ${ecosystemMock.overview.environment}`,
          route: '/governance',
          status: ecosystemMock.overview.version,
        },
        {
          id: 'constitutional-governance',
          title: 'Constitutional Governance',
          value: governanceMock.summary.constitutionalStatus,
          detail: `${governanceMock.summary.totalDaos} DAOs · ${governanceMock.summary.activeProposals} active proposals`,
          route: '/governance',
          status: governanceMock.summary.federationStatus,
        },
        {
          id: 'acs-readiness',
          title: 'ACS Readiness',
          value: `${acsMock.summary.agentsOnline} online`,
          detail: `${acsMock.summary.pendingReviews} pending reviews · ${acsMock.summary.riskAlerts} risk alerts`,
          route: '/acs',
          status: `${acsMock.summary.agentsDegraded} degraded`,
        },
        {
          id: 'treasury-mode',
          title: 'Treasury Mode',
          value: defiMock.summary.liquidityStatus,
          detail: `${defiMock.summary.treasuryValueMock} · ${defiMock.summary.pendingGovernanceActions} pending governance actions`,
          route: '/defi',
          status: defiMock.summary.riskScore,
        },
      ],
      warnings: [
        ecosystemMock.overview.riskNotice,
        ecosystemMock.overview.mockNotice,
      ],
    },
    userOverview: {
      walletState,
      cards: [
        {
          id: 'wallet-state',
          title: 'Wallet',
          value: walletState.shortAddress ?? walletState.status,
          detail: walletState.message,
          route: '/connect',
          status: walletState.chainName ?? walletState.status,
        },
        {
          id: 'academy-progress',
          title: 'Academy Progress',
          value: `${academyMock.student.completedCourses} completed`,
          detail: `${academyMock.student.activeCourses} active courses · trust ${academyMock.student.trustScore}`,
          route: '/academy/progress',
          status: academyMock.student.acsEligibility,
        },
        {
          id: 'marketplace-access',
          title: 'Marketplace Access',
          value: `${marketplaceMock.orders?.length ?? 0} mock orders`,
          detail: 'Personal purchases and access are mock/read-only in this dashboard.',
          route: '/marketplace/orders',
          status: 'preview',
        },
      ],
    },
    tenantOverview: {
      selectedTenant,
      enabledTenantModules,
      cards: [
        {
          id: 'tenant-governance',
          title: 'Governance Status',
          value: selectedTenant.governanceStatus,
          detail: `${selectedTenant.federationTier} federation · ${selectedTenant.primaryChain}`,
          route: '/governance/tenants',
          status: selectedTenant.riskState,
        },
        {
          id: 'tenant-modules',
          title: 'Enabled Modules',
          value: String(enabledTenantModules.length),
          detail: enabledTenantModules.map((module) => module.name).join(', '),
          route: '/business',
          status: selectedTenant.executionMode,
        },
        {
          id: 'tenant-acs',
          title: 'ACS State',
          value: selectedTenant.acsState,
          detail: selectedTenant.restrictions.length ? selectedTenant.restrictions.join(', ') : 'No active tenant restrictions in mock registry.',
          route: '/acs/services',
          status: selectedTenant.treasuryMode,
        },
      ],
    },
    operationsOverview: {
      cards: [
        {
          id: 'pending-reviews',
          title: 'Pending Reviews',
          value: String(acsMock.summary.pendingReviews),
          detail: `${reviewWorkflows.length} workflows need review or supervision.`,
          route: '/business/review-queue',
          status: 'operator',
        },
        {
          id: 'blocked-actions',
          title: 'Blocked Actions',
          value: String(blockedWorkflows.length + selectedTenant.restrictions.length),
          detail: 'Blocked items are preview/read-only and require governance or ACS review.',
          route: '/acs/status',
          status: 'simulation',
        },
        {
          id: 'module-review',
          title: 'Modules Needing Review',
          value: String(mockModules.length),
          detail: `${prototypeModules.length} prototype modules · ${mockModules.length} mock modules.`,
          route: '/acs/readiness',
          status: 'read-only',
        },
      ],
      recommendedActions: [
        { id: 'inspect-governance', label: 'Inspect Governance Console', route: '/governance/console', scope: 'operator' },
        { id: 'review-business', label: 'Review Business Queue', route: '/business/review-queue', scope: 'operator' },
        { id: 'open-tenant', label: 'Open Tenant Discovery', route: '/governance/tenants', scope: 'tenant' },
      ],
    },
    moduleHealth: {
      maturityCounts,
      modules: axodusModuleRegistry,
    },
  };
}
