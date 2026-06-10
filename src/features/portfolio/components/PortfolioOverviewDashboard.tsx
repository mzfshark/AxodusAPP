import ContentGrid from '@/components/layout/ContentGrid';
import PageShell from '@/components/layout/PageShell';
import SectionShell from '@/components/layout/SectionShell';
import { CardShell } from '@/components/ui';
import { portfolioRegistryService } from '../portfolioRegistryService';
import type { DevelopmentLevel, MaturityLevel, PortfolioNucleusSummary } from '../types';
import PortfolioBoundaryNotice from './PortfolioBoundaryNotice';
import PortfolioMaturityDistribution from './PortfolioMaturityDistribution';
import PortfolioMetricCard from './PortfolioMetricCard';

function groupByLevel<TLevel extends string>(
  nuclei: readonly PortfolioNucleusSummary[],
  getLevel: (nucleus: PortfolioNucleusSummary) => TLevel,
  order: readonly TLevel[],
) {
  return order
    .map((level) => ({
      level,
      nuclei: nuclei.filter((nucleus) => getLevel(nucleus) === level),
    }))
    .filter((group) => group.nuclei.length > 0);
}

function formatDisabledStatus(enabled: boolean) {
  return enabled ? 'Enabled' : 'Disabled';
}

const lLevelOrder: MaturityLevel[] = ['L5', 'L4 Consolidated', 'L4 Readiness', 'L4 Candidate', 'L3'];
const dLevelOrder: DevelopmentLevel[] = ['D3', 'D2'];

export default function PortfolioOverviewDashboard() {
  const snapshot = portfolioRegistryService.getPortfolioSnapshot();
  const nuclei = portfolioRegistryService.getNuclei();
  const opportunities = portfolioRegistryService.getOpportunities();
  const dependencies = portfolioRegistryService.getDependencies();
  const executionAuthority = portfolioRegistryService.getExecutionAuthority();
  const business = portfolioRegistryService.getNucleusById('Business');
  const axodusApp = portfolioRegistryService.getNucleusById('AxodusAPP');

  const lDistribution = groupByLevel(nuclei, (nucleus) => nucleus.lLevel, lLevelOrder);
  const dDistribution = groupByLevel(nuclei, (nucleus) => nucleus.dLevel, dLevelOrder);

  const executionDisabled = !snapshot.executionAuthorized
    && !snapshot.summary.executionAuthorized
    && executionAuthority.every((authority) => !authority.executionAuthorized);
  const productionDisabled = !snapshot.productionReady
    && !snapshot.summary.productionReady
    && executionAuthority.every((authority) => !authority.productionReady);

  const metrics = [
    {
      title: 'Nuclei',
      value: snapshot.summary.nucleiCount,
      detail: 'Total Axodus nuclei represented in the local portfolio registry snapshot.',
      status: 'read-only',
    },
    {
      title: 'Opportunities',
      value: snapshot.summary.officialOpportunityCount,
      detail: `${opportunities.length} official opportunity records are available through the consumer layer.`,
      status: 'visibility only',
    },
    {
      title: 'Dependencies',
      value: snapshot.summary.officialDependencyCount,
      detail: `${dependencies.length} representative dependency records are loaded with the official summary count.`,
      status: 'visibility only',
    },
    {
      title: 'Blocked Actions',
      value: snapshot.summary.blockedActionCount,
      detail: 'Blocked actions remain unresolved and are not executable from AxodusAPP.',
      status: 'blocked',
    },
    {
      title: 'Boundary Conflicts',
      value: snapshot.summary.boundaryConflictCount,
      detail: 'Boundary conflicts are recorded for visibility and do not grant authority.',
      status: 'controlled',
    },
    {
      title: 'Execution Authorized',
      value: formatDisabledStatus(!executionDisabled),
      detail: 'No execution authority is granted by the portfolio snapshot.',
      status: 'disabled',
    },
    {
      title: 'Production Ready',
      value: formatDisabledStatus(!productionDisabled),
      detail: 'No production readiness is claimed by the portfolio snapshot.',
      status: 'disabled',
    },
  ];

  return (
    <PageShell
      title="Portfolio Overview"
      subtitle="Read-only control center for Axodus portfolio maturity, development maturity, opportunities, dependencies and execution boundaries."
      module="Portfolio"
      scope="protocol"
      maturity="L4 Readiness / D3"
      executionMode="read-only"
    >
      <SectionShell
        scope="protocol"
        title="Portfolio Control Center"
        description="Global portfolio state from the AXAPP-REQ-01 consumer layer. This view does not call live APIs or expose transaction controls."
      >
        <ContentGrid columns="four">
          {metrics.map((metric) => (
            <PortfolioMetricCard key={metric.title} {...metric} />
          ))}
        </ContentGrid>
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Maturity Distribution"
        description="L-level and D-level groupings are calculated from the read-only portfolio service."
      >
        <ContentGrid columns="two">
          <PortfolioMaturityDistribution
            title="L-level Distribution"
            description="Organizational maturity and readiness posture by nucleus."
            groups={lDistribution}
          />
          <PortfolioMaturityDistribution
            title="D-level Distribution"
            description="Development maturity and implementation depth by nucleus."
            groups={dDistribution}
          />
        </ContentGrid>
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Selected Nucleus Signals"
        description="Key AXAPP-REQ-02 acceptance signals from the same service-backed snapshot."
      >
        <ContentGrid columns="two">
          <CardShell
            title="Business"
            subtitle="Portfolio coordination owner"
            scope="operator"
            maturity={business?.lLevel}
            executionMode="read-only"
            status={business?.dLevel}
          >
            <p className="text-sm leading-6 text-outline">
              Business is {business?.lLevel} with development maturity {business?.dLevel}. It remains non-executive portfolio coordination and readiness visibility only.
            </p>
          </CardShell>
          <CardShell
            title="AxodusAPP"
            subtitle="Integration shell"
            scope="protocol"
            maturity={axodusApp?.lLevel}
            executionMode="read-only"
            status={axodusApp?.dLevel}
          >
            <p className="text-sm leading-6 text-outline">
              AxodusAPP is {axodusApp?.lLevel} with development maturity {axodusApp?.dLevel}. It consumes portfolio state without backend integration, wallet signing or production authority.
            </p>
          </CardShell>
        </ContentGrid>
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Authority Boundary"
        description="The dashboard exposes status only. All execution-sensitive paths remain disabled or blocked."
      >
        <PortfolioBoundaryNotice />
      </SectionShell>
    </PageShell>
  );
}
