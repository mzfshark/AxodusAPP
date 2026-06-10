import { Link, useParams } from 'react-router-dom';
import ContentGrid from '@/components/layout/ContentGrid';
import PageShell from '@/components/layout/PageShell';
import SectionShell from '@/components/layout/SectionShell';
import { CardShell } from '@/components/ui';
import { portfolioRegistryService } from '../portfolioRegistryService';
import type { NucleusId, PortfolioDependency } from '../types';
import NucleusSummaryCard from '../components/NucleusSummaryCard';

function normalizeNucleusRouteId(value = '') {
  return decodeURIComponent(value).trim().toLowerCase();
}

function resolveNucleusId(routeId: string | undefined): NucleusId | null {
  const normalizedRouteId = normalizeNucleusRouteId(routeId);
  const match = portfolioRegistryService
    .getNuclei()
    .find((nucleus) => nucleus.nucleus.toLowerCase() === normalizedRouteId);

  return match?.nucleus ?? null;
}

function DependencyList({ title, dependencies }: { title: string; dependencies: readonly PortfolioDependency[] }) {
  return (
    <CardShell
      title={title}
      subtitle="Read-only dependency records"
      scope="protocol"
      maturity="portfolio"
      executionMode="read-only"
      status={`${dependencies.length} records`}
    >
      <div className="space-y-3">
        {dependencies.length ? dependencies.map((dependency) => (
          <article key={dependency.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="ax-meta-chip">{dependency.id}</span>
              <span className="ax-meta-chip">{dependency.blockingStatus}</span>
              <span className="ax-meta-chip">{dependency.risk}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-outline">
              {dependency.sourceNucleusOrOpportunity} to {dependency.targetNucleus}. Readiness: {dependency.readiness}. Criticality: {dependency.criticality}.
            </p>
          </article>
        )) : (
          <p className="text-sm leading-6 text-outline">No representative dependency records are attached to this nucleus in the local portfolio snapshot.</p>
        )}
      </div>
    </CardShell>
  );
}

export default function NucleusDetailView() {
  const { nucleusId } = useParams();
  const resolvedNucleusId = resolveNucleusId(nucleusId);
  const nucleus = resolvedNucleusId ? portfolioRegistryService.getNucleusById(resolvedNucleusId) : null;
  const snapshot = portfolioRegistryService.getPortfolioSnapshot();

  if (!nucleus) {
    return (
      <PageShell
        title="Nucleus Not Found"
        subtitle="The requested nucleus is not present in the read-only portfolio registry snapshot."
        module="Portfolio"
        scope="protocol"
        maturity="D3"
        executionMode="read-only"
      >
        <CardShell
          title="Supported Nuclei"
          subtitle="Read-only route recovery"
          scope="protocol"
          maturity="portfolio"
          executionMode="read-only"
          status="not found"
        >
          <div className="flex flex-wrap gap-2">
            {portfolioRegistryService.getNuclei().map((item) => (
              <Link key={item.nucleus} to={`/portfolio/${encodeURIComponent(item.nucleus)}`} className="ax-meta-chip">
                {item.nucleus}
              </Link>
            ))}
          </div>
        </CardShell>
      </PageShell>
    );
  }

  const blockers = portfolioRegistryService.getBlockers().filter((blocker) => blocker.nucleus === nucleus.nucleus);
  const dependencies = portfolioRegistryService.getDependencies();
  const incomingDependencies = dependencies.filter((dependency) => dependency.targetNucleus === nucleus.nucleus);
  const outgoingDependencies = dependencies.filter((dependency) => dependency.sourceNucleusOrOpportunity === nucleus.nucleus);
  const opportunities = portfolioRegistryService.getOpportunities().filter((opportunity) => opportunity.primaryNucleus === nucleus.nucleus);
  const ownership = snapshot.ownership.find((item) => item.nucleus === nucleus.nucleus);
  const authority = nucleus.authority;
  const dependencyBurden = incomingDependencies.length + outgoingDependencies.length;

  return (
    <PageShell
      title={`${nucleus.nucleus} Detail`}
      subtitle="Read-only nucleus detail view over portfolio status, maturity, blockers, dependencies, opportunities, ownership and authority."
      module="Portfolio"
      scope="protocol"
      maturity={`${nucleus.lLevel} / ${nucleus.dLevel}`}
      executionMode="read-only"
    >
      <SectionShell
        scope="protocol"
        title="Nucleus Summary"
        description="Status, L-level, D-level, risk and readiness are read from the portfolio registry service."
      >
        <NucleusSummaryCard nucleus={nucleus} />
      </SectionShell>

      <SectionShell
        scope="operator"
        title="Blockers And Risk Areas"
        description="Active blockers and portfolio-wide blocked action context. This section is visibility only."
      >
        <ContentGrid columns="two">
          <CardShell
            title="Active Blockers"
            subtitle="Nucleus-scoped blocker records"
            scope="operator"
            maturity={nucleus.lLevel}
            executionMode="read-only"
            status={`${blockers.length} active`}
          >
            <div className="space-y-3">
              {blockers.map((blocker) => (
                <article key={blocker.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="ax-meta-chip">{blocker.id}</span>
                    <span className="ax-meta-chip">{blocker.severity}</span>
                    <span className="ax-meta-chip">{blocker.status}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-outline">{blocker.description}</p>
                </article>
              ))}
            </div>
          </CardShell>
          <CardShell
            title="Blocked Actions"
            subtitle="Portfolio-wide blocked action context"
            scope="operator"
            maturity="portfolio"
            executionMode="read-only"
            status="blocked"
          >
            <p className="text-2xl font-black text-on-surface">{snapshot.summary.blockedActionCount}</p>
            <p className="mt-2 text-sm leading-6 text-outline">
              Portfolio blocked actions remain unresolved. {nucleus.nucleus} risk area: {nucleus.risk}. No blocked action is resolved from this view.
            </p>
          </CardShell>
        </ContentGrid>
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Dependencies"
        description="Incoming and outgoing representative dependency records from the portfolio service."
      >
        <ContentGrid columns="three">
          <CardShell
            title="Dependency Burden"
            subtitle="Representative local registry count"
            scope="protocol"
            maturity="portfolio"
            executionMode="read-only"
            status={`${dependencyBurden} total`}
          >
            <p className="text-2xl font-black text-on-surface">{dependencyBurden}</p>
            <p className="mt-2 text-sm leading-6 text-outline">
              Incoming: {incomingDependencies.length}. Outgoing: {outgoingDependencies.length}. Official portfolio dependency summary remains {snapshot.summary.officialDependencyCount}.
            </p>
          </CardShell>
          <DependencyList title="Incoming Dependencies" dependencies={incomingDependencies} />
          <DependencyList title="Outgoing Dependencies" dependencies={outgoingDependencies} />
        </ContentGrid>
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Opportunities"
        description="Official opportunity records owned by this nucleus in the local portfolio snapshot."
      >
        <CardShell
          title="Official Opportunities"
          subtitle="Read-only opportunity visibility"
          scope="protocol"
          maturity="portfolio"
          executionMode="read-only"
          status={`${opportunities.length} records`}
        >
          <div className="space-y-3">
            {opportunities.length ? opportunities.map((opportunity) => (
              <article key={opportunity.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap gap-2">
                  <span className="ax-meta-chip">{opportunity.id}</span>
                  <span className="ax-meta-chip">{opportunity.risk}</span>
                  <span className="ax-meta-chip">{opportunity.readiness}</span>
                </div>
                <h3 className="mt-3 text-base font-black text-on-surface">{opportunity.title}</h3>
                <p className="mt-2 text-sm leading-6 text-outline">
                  Evidence quality: {nucleus.evidenceQuality}. Execution sensitivity: {opportunity.executionSensitivity}. Production ready: Disabled.
                </p>
              </article>
            )) : (
              <p className="text-sm leading-6 text-outline">No official opportunity records are assigned to this nucleus in the local portfolio snapshot.</p>
            )}
          </div>
        </CardShell>
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Ownership And Authority"
        description="Ownership and authority classification remain read-only and non-executive."
      >
        <ContentGrid columns="two">
          <CardShell
            title="Ownership"
            subtitle="Portfolio ownership summary"
            scope="protocol"
            maturity={nucleus.lLevel}
            executionMode="read-only"
            status={ownership?.ownershipConfidence ?? 'unknown'}
          >
            <p className="text-sm font-black text-on-surface">{ownership?.primaryRole ?? `${nucleus.nucleus} owner`}</p>
            <p className="mt-2 text-sm leading-6 text-outline">{ownership?.ownershipScope ?? 'Ownership summary unavailable in the local snapshot.'}</p>
          </CardShell>
          <CardShell
            title="Authority Summary"
            subtitle="Execution and production boundaries"
            scope="protocol"
            maturity={nucleus.lLevel}
            executionMode="read-only"
            status="disabled"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-surface-container p-3">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">Execution Authority</p>
                <p className="mt-2 text-sm font-black text-on-surface">Execution Disabled</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-surface-container p-3">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">Production Readiness</p>
                <p className="mt-2 text-sm font-black text-on-surface">Production Disabled</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-outline">
              Boundary classification: {authority.executionAuthority}. {authority.governanceAuthority} {authority.treasuryAuthority}
            </p>
          </CardShell>
        </ContentGrid>
      </SectionShell>
    </PageShell>
  );
}
