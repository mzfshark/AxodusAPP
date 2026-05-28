import React from 'react';
import '@/styles/Global.css';
import { Link } from 'react-router-dom';
import { academyMock, acsMock, defiMock, ecosystemMock, governanceMock, marketplaceMock, walletMock } from '@/data/mock';
import { ScopeLegend, ScopeSection, ScopedCard } from '@/components/uiScope';
import { axodusModuleRegistry, getModulesByScope } from '@/config/moduleRegistry';
import { ContentGrid, PageShell, SectionShell } from '@/components/layout';
import { CardShell } from '@/components/ui';

const dashboardBlocks = [
  {
    meta: {
      id: 'dashboard-protocol-overview',
      title: 'Protocol Overview',
      module: 'ecosystem',
      scope: 'protocol',
      surface: 'dashboard',
      maturity: 'mock',
      executionMode: 'read-only',
      walletAware: false,
      tenantAware: false,
      governanceAware: true,
      acsAware: true,
    },
    route: '/governance',
    description: 'Global Axodus state, active nuclei, governance-first posture and protocol readiness.',
  },
  {
    meta: {
      id: 'dashboard-my-axodus',
      title: 'My Axodus',
      module: 'account',
      scope: 'user',
      surface: 'dashboard',
      maturity: 'mock',
      executionMode: 'read-only',
      walletAware: true,
      tenantAware: false,
      governanceAware: true,
      acsAware: false,
    },
    route: '/connect',
    description: 'Connected wallet, Academy progress, permissions, marketplace access and personal activity.',
  },
  {
    meta: {
      id: 'dashboard-tenant-console',
      title: 'Tenant Console',
      module: 'governance',
      scope: 'tenant',
      surface: 'console',
      maturity: 'prototype',
      executionMode: 'preview',
      walletAware: true,
      tenantAware: true,
      governanceAware: true,
      acsAware: true,
    },
    route: '/governance/tenants',
    description: 'Selected DAO, company or Sub-DAO operating context, treasury posture and local governance readiness.',
  },
  {
    meta: {
      id: 'dashboard-operations',
      title: 'Operations',
      module: 'acs',
      scope: 'operator',
      surface: 'operations',
      maturity: 'prototype',
      executionMode: 'simulation',
      walletAware: false,
      tenantAware: true,
      governanceAware: true,
      acsAware: true,
    },
    route: '/business/review-queue',
    description: 'ACS, Business intake, review queues, blocked workflows and supervised execution-control visibility.',
  },
];

function RegistryCard({ module }) {
  return (
    <CardShell
      title={module.name}
      subtitle={module.route}
      scope={module.primaryScope}
      maturity={module.maturity}
      executionMode="read-only"
    >
      <p className="mt-3 text-sm text-outline">Primary scope: <strong className="text-on-surface">{module.primaryScope}</strong></p>
      <p className="mt-1 text-xs text-outline">Supported: {module.supportedScopes.join(', ')}</p>
    </CardShell>
  );
}

const Overview = () => {
  const protocolModules = getModulesByScope('protocol');
  const connectedState = walletMock.states.find((state) => state.id === 'wallet-state-connected') ?? walletMock.states[0];
  const academyProgress = academyMock.learningProgress?.[0];
  const primaryDao = governanceMock.daoRegistry?.[0];
  const activeWorkflows = acsMock.workflows?.filter((workflow) => workflow.status !== 'completed') ?? [];

  return (
    <PageShell
      title="Ecosystem dashboard by information ownership"
      subtitle="The dashboard now separates protocol, user, tenant and operator information so no surface has to guess whether data belongs to Axodus, a wallet, a DAO/company or an operations queue."
      module="AxodusAPP Information Architecture"
      scope="protocol"
      maturity="prototype"
      executionMode="read-only"
    >

        <ScopeLegend />

        <ContentGrid columns="four">
          {dashboardBlocks.map((block) => (
            <CardShell
              key={block.meta.id}
              title={block.meta.title}
              scope={block.meta.scope}
              maturity={block.meta.maturity}
              executionMode={block.meta.executionMode}
              status={block.meta.surface}
            >
              <p className="text-sm leading-6 text-outline">{block.description}</p>
              <Link to={block.route} className="mt-5 inline-flex rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm font-black text-on-surface hover:border-primary">
                Open surface
              </Link>
            </CardShell>
          ))}
        </ContentGrid>

        <ScopeSection
          scope="protocol"
          title="Protocol Overview"
          description="Global ecosystem state, module readiness, constitutional posture and read-only protocol finance."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ScopedCard meta={{
              id: 'protocol-ecosystem-health',
              title: 'Ecosystem Health',
              module: 'ecosystem',
              scope: 'protocol',
              surface: 'dashboard',
              maturity: 'mock',
              executionMode: 'read-only',
              walletAware: false,
              tenantAware: false,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-2xl font-black text-on-surface">{ecosystemMock.overview.mvpPhase}</p>
              <p className="mt-2 text-sm leading-6 text-outline">{ecosystemMock.overview.mockNotice}</p>
            </ScopedCard>
            <ScopedCard meta={{
              id: 'protocol-governance-summary',
              title: 'Constitutional Governance',
              module: 'governance',
              scope: 'protocol',
              surface: 'dashboard',
              maturity: 'mock',
              executionMode: 'read-only',
              walletAware: false,
              tenantAware: false,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-2xl font-black text-on-surface">{governanceMock.summary.constitutionalStatus}</p>
              <p className="mt-2 text-sm text-outline">{governanceMock.summary.totalDaos} DAOs, {governanceMock.summary.activeProposals} active proposals.</p>
            </ScopedCard>
            <ScopedCard meta={{
              id: 'protocol-defi-readonly',
              title: 'Defi Read-Only State',
              module: 'defi',
              scope: 'protocol',
              surface: 'dashboard',
              maturity: 'mock',
              executionMode: 'executable-disabled',
              walletAware: false,
              tenantAware: true,
              governanceAware: true,
              acsAware: false,
            }}>
              <p className="text-2xl font-black text-on-surface">{defiMock.summary.treasuryValueMock}</p>
              <p className="mt-2 text-sm text-outline">{defiMock.summary.financialDisclaimer}</p>
            </ScopedCard>
            <ScopedCard meta={{
              id: 'protocol-module-registry',
              title: 'Module Registry',
              module: 'ecosystem',
              scope: 'protocol',
              surface: 'dashboard',
              maturity: 'prototype',
              executionMode: 'read-only',
              walletAware: false,
              tenantAware: false,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-2xl font-black text-on-surface">{axodusModuleRegistry.length}</p>
              <p className="mt-2 text-sm text-outline">{protocolModules.length} modules expose protocol-level surfaces.</p>
            </ScopedCard>
          </div>
        </ScopeSection>

        <ScopeSection
          scope="user"
          title="My Axodus"
          description="Wallet and account-specific data stays separate from protocol and tenant operations."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ScopedCard meta={{
              id: 'user-wallet-state',
              title: 'Wallet State',
              module: 'connect',
              scope: 'user',
              surface: 'dashboard',
              maturity: 'mock',
              executionMode: 'read-only',
              walletAware: true,
              tenantAware: false,
              governanceAware: false,
              acsAware: false,
            }}>
              <p className="text-xl font-black text-on-surface">{connectedState.shortAddress ?? connectedState.status}</p>
              <p className="mt-2 text-sm text-outline">{connectedState.message}</p>
            </ScopedCard>
            <ScopedCard meta={{
              id: 'user-academy-progress',
              title: 'Academy Progress',
              module: 'academy',
              scope: 'user',
              surface: 'dashboard',
              maturity: 'mock',
              executionMode: 'read-only',
              walletAware: true,
              tenantAware: false,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-xl font-black text-on-surface">{academyProgress?.progress ?? 0}% complete</p>
              <p className="mt-2 text-sm text-outline">Certificate: {academyProgress?.certificateStatus ?? 'mock-pending'}.</p>
            </ScopedCard>
            <ScopedCard meta={{
              id: 'user-marketplace-access',
              title: 'Marketplace Access',
              module: 'marketplace',
              scope: 'user',
              surface: 'dashboard',
              maturity: 'mock',
              executionMode: 'preview',
              walletAware: true,
              tenantAware: false,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-xl font-black text-on-surface">{marketplaceMock.orders?.length ?? 0} mock orders</p>
              <p className="mt-2 text-sm text-outline">Access is shown as mock/read-only. Settlement is disabled.</p>
            </ScopedCard>
          </div>
        </ScopeSection>

        <ScopeSection
          scope="tenant"
          title="Tenant Console"
          description="DAO/company context is grouped as tenant information, not protocol-wide truth."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <ScopedCard meta={{
              id: 'tenant-dao-profile',
              title: primaryDao?.name ?? 'Selected DAO',
              module: 'governance',
              scope: 'tenant',
              surface: 'console',
              maturity: 'mock',
              executionMode: 'preview',
              walletAware: true,
              tenantAware: true,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-sm leading-6 text-outline">{primaryDao?.description}</p>
              <p className="mt-3 text-sm text-outline">Standing: <strong className="text-on-surface">{primaryDao?.standing}</strong></p>
            </ScopedCard>
            <ScopedCard meta={{
              id: 'tenant-business-readiness',
              title: 'Business Runtime Boundary',
              module: 'business',
              scope: 'tenant',
              surface: 'operations',
              maturity: 'prototype',
              executionMode: 'simulation',
              walletAware: false,
              tenantAware: true,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-sm leading-6 text-outline">Business data is tenant/workspace operational visibility. It remains mock-first and non-executing.</p>
              <Link to="/business" className="mt-5 inline-flex rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm font-black text-on-surface hover:border-primary">
                Open Business
              </Link>
            </ScopedCard>
          </div>
        </ScopeSection>

        <ScopeSection
          scope="operator"
          title="Operations"
          description="ACS, review, blocker and execution-control information is visibly operator-scoped."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <ScopedCard meta={{
              id: 'operator-acs-summary',
              title: 'ACS Operations',
              module: 'acs',
              scope: 'operator',
              surface: 'operations',
              maturity: 'mock',
              executionMode: 'simulation',
              walletAware: false,
              tenantAware: true,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-xl font-black text-on-surface">{acsMock.summary.activeWorkflows} active workflows</p>
              <p className="mt-2 text-sm text-outline">{acsMock.summary.pendingReviews} pending reviews, {acsMock.summary.riskAlerts} risk alerts.</p>
            </ScopedCard>
            <ScopedCard meta={{
              id: 'operator-workflow-queue',
              title: 'Workflow Queue',
              module: 'business',
              scope: 'operator',
              surface: 'operations',
              maturity: 'mock',
              executionMode: 'simulation',
              walletAware: false,
              tenantAware: true,
              governanceAware: true,
              acsAware: true,
            }}>
              <p className="text-xl font-black text-on-surface">{activeWorkflows.length} active items</p>
              <p className="mt-2 text-sm text-outline">Queues are preview-only and require human/governance review before any future execution.</p>
            </ScopedCard>
          </div>
        </ScopeSection>

        <SectionShell scope="protocol" title="Module Scope Registry" description="Minimal route metadata for future normalization and audit work.">
          <ContentGrid columns="three">
            {axodusModuleRegistry.map((module) => <RegistryCard key={module.id} module={module} />)}
          </ContentGrid>
        </SectionShell>
    </PageShell>
  );
};

export default Overview;
