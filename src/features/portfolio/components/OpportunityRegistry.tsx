import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardShell } from '@/components/ui';
import type {
  PortfolioDependency,
  PortfolioNucleusSummary,
  PortfolioOpportunity,
  PortfolioRegistrySnapshot,
} from '../types';

type OpportunityRegistryProps = Readonly<{
  opportunities: readonly PortfolioOpportunity[];
  dependencies: readonly PortfolioDependency[];
  nuclei: readonly PortfolioNucleusSummary[];
  snapshot: PortfolioRegistrySnapshot;
}>;

type FilterValue = 'ALL' | string;

const allFilter = 'ALL';

function getOwner(opportunity: PortfolioOpportunity, nuclei: readonly PortfolioNucleusSummary[]) {
  return nuclei.find((nucleus) => nucleus.nucleus === opportunity.primaryNucleus) ?? null;
}

function getOpportunityDependencies(opportunity: PortfolioOpportunity, dependencies: readonly PortfolioDependency[]) {
  return dependencies.filter((dependency) => dependency.sourceNucleusOrOpportunity.includes(opportunity.id));
}

function getOpportunityBlockers(opportunity: PortfolioOpportunity, owner: PortfolioNucleusSummary | null) {
  const blockers = [];

  if (opportunity.executionSensitivity !== 'NONE') {
    blockers.push(`${opportunity.executionSensitivity} execution sensitivity`);
  }

  if (opportunity.risk === 'HIGH' || opportunity.risk === 'CRITICAL') {
    blockers.push(`${opportunity.risk} risk classification`);
  }

  if (owner?.authority.executionAuthority === 'BLOCKED') {
    blockers.push('Owner execution authority blocked');
  }

  return blockers;
}

function getUniqueValues<T extends string>(values: readonly T[]) {
  return Array.from(new Set(values));
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: Readonly<{
  label: string;
  value: FilterValue;
  options: readonly string[];
  onChange: (value: FilterValue) => void;
}>) {
  return (
    <label className="space-y-2 text-xs font-black uppercase tracking-[0.14em] text-outline">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm font-semibold normal-case tracking-normal text-on-surface"
      >
        <option value={allFilter}>All</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export default function OpportunityRegistry({
  opportunities,
  dependencies,
  nuclei,
  snapshot,
}: OpportunityRegistryProps) {
  const [nucleusFilter, setNucleusFilter] = useState<FilterValue>(allFilter);
  const [readinessFilter, setReadinessFilter] = useState<FilterValue>(allFilter);
  const [riskFilter, setRiskFilter] = useState<FilterValue>(allFilter);
  const [evidenceFilter, setEvidenceFilter] = useState<FilterValue>(allFilter);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(opportunities[0]?.id ?? '');

  const enrichedOpportunities = useMemo(() => opportunities.map((opportunity) => {
    const owner = getOwner(opportunity, nuclei);
    const opportunityDependencies = getOpportunityDependencies(opportunity, dependencies);
    const evidenceQuality = owner?.evidenceQuality ?? 'LOW';

    return {
      opportunity,
      owner,
      dependencies: opportunityDependencies,
      evidenceQuality,
      blockers: getOpportunityBlockers(opportunity, owner),
    };
  }), [dependencies, nuclei, opportunities]);

  const filteredOpportunities = enrichedOpportunities.filter(({ opportunity, evidenceQuality }) => (
    (nucleusFilter === allFilter || opportunity.primaryNucleus === nucleusFilter)
    && (readinessFilter === allFilter || opportunity.readiness === readinessFilter)
    && (riskFilter === allFilter || opportunity.risk === riskFilter)
    && (evidenceFilter === allFilter || evidenceQuality === evidenceFilter)
  ));

  const selectedOpportunity = enrichedOpportunities.find(({ opportunity }) => opportunity.id === selectedOpportunityId)
    ?? filteredOpportunities[0]
    ?? enrichedOpportunities[0];

  const highEvidenceCount = enrichedOpportunities.filter((item) => item.evidenceQuality === 'HIGH').length;
  const mediumEvidenceCount = enrichedOpportunities.filter((item) => item.evidenceQuality === 'MEDIUM').length;
  const highRiskCount = opportunities.filter((opportunity) => opportunity.risk === 'HIGH').length;
  const criticalRiskCount = opportunities.filter((opportunity) => opportunity.risk === 'CRITICAL').length;

  const nucleusOptions = getUniqueValues(opportunities.map((opportunity) => opportunity.primaryNucleus));
  const readinessOptions = getUniqueValues(opportunities.map((opportunity) => opportunity.readiness));
  const riskOptions = getUniqueValues(opportunities.map((opportunity) => opportunity.risk));
  const evidenceOptions = getUniqueValues(enrichedOpportunities.map((item) => item.evidenceQuality));

  return (
    <div className="space-y-6">
      <CardShell
        title="Opportunity Summary"
        subtitle="Official opportunity registry count and risk/evidence distribution"
        scope="protocol"
        maturity="CROSS-REQ-01"
        executionMode="visibility only"
        status={`${snapshot.summary.officialOpportunityCount} opportunities`}
      >
        <div className="grid gap-3 md:grid-cols-5">
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">Total Opportunities</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{snapshot.summary.officialOpportunityCount}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">HIGH Evidence</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{highEvidenceCount}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">MEDIUM Evidence</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{mediumEvidenceCount}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">HIGH Risk</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{highRiskCount}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-black uppercase text-outline">CRITICAL Risk</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{criticalRiskCount}</p>
          </div>
        </div>
      </CardShell>

      <CardShell
        title="Opportunity Filters"
        subtitle="Client-side filtering only"
        scope="protocol"
        maturity="read-only"
        executionMode="visibility only"
        status={`${filteredOpportunities.length} visible`}
      >
        <div className="grid gap-4 md:grid-cols-4">
          <SelectFilter label="By Nucleus" value={nucleusFilter} options={nucleusOptions} onChange={setNucleusFilter} />
          <SelectFilter label="By Readiness" value={readinessFilter} options={readinessOptions} onChange={setReadinessFilter} />
          <SelectFilter label="By Risk" value={riskFilter} options={riskOptions} onChange={setRiskFilter} />
          <SelectFilter label="By Evidence Quality" value={evidenceFilter} options={evidenceOptions} onChange={setEvidenceFilter} />
        </div>
      </CardShell>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <CardShell
          title="Opportunity Registry Table"
          subtitle="Navigable product intelligence"
          scope="protocol"
          maturity="read-only"
          executionMode="visibility only"
          status={`${opportunities.length} official`}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="text-xs uppercase text-outline">
                <tr>
                  <th className="px-3 py-2">Opportunity Name</th>
                  <th className="px-3 py-2">Owning Nucleus</th>
                  <th className="px-3 py-2">Readiness</th>
                  <th className="px-3 py-2">Evidence Quality</th>
                  <th className="px-3 py-2">Risk Classification</th>
                  <th className="px-3 py-2">Dependency Count</th>
                  <th className="px-3 py-2">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredOpportunities.map(({ opportunity, evidenceQuality, dependencies: opportunityDependencies }) => (
                  <tr key={opportunity.id}>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedOpportunityId(opportunity.id)}
                        className="text-left font-black text-primary underline-offset-4 hover:underline"
                      >
                        {opportunity.title}
                      </button>
                      <p className="mt-1 text-xs text-outline">{opportunity.id}</p>
                    </td>
                    <td className="px-3 py-3">
                      <Link to={`/portfolio/${encodeURIComponent(opportunity.primaryNucleus)}`} className="font-semibold text-on-surface">
                        {opportunity.primaryNucleus}
                      </Link>
                    </td>
                    <td className="px-3 py-3"><span className="ax-meta-chip">{opportunity.readiness}</span></td>
                    <td className="px-3 py-3"><span className="ax-meta-chip">{evidenceQuality}</span></td>
                    <td className="px-3 py-3"><span className="ax-meta-chip">{opportunity.risk}</span></td>
                    <td className="px-3 py-3 text-on-surface">{opportunityDependencies.length}</td>
                    <td className="px-3 py-3 text-outline">Visibility Only</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardShell>

        <CardShell
          title="Opportunity Detail"
          subtitle="Selected opportunity intelligence"
          scope="protocol"
          maturity="read-only"
          executionMode="visibility only"
          status={selectedOpportunity?.opportunity.readiness}
        >
          {selectedOpportunity ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">Description</p>
                <h4 className="mt-2 text-lg font-black text-on-surface">{selectedOpportunity.opportunity.title}</h4>
                <p className="mt-2 text-sm leading-6 text-outline">
                  Read-only portfolio opportunity record for {selectedOpportunity.opportunity.title}. The registry exposes owner, readiness, risk and authority-sensitive metadata only.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-surface-container p-3">
                  <p className="text-xs font-black uppercase text-outline">Owner</p>
                  <p className="mt-2 text-sm font-black text-on-surface">{selectedOpportunity.opportunity.primaryNucleus}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-surface-container p-3">
                  <p className="text-xs font-black uppercase text-outline">Readiness</p>
                  <p className="mt-2 text-sm font-black text-on-surface">{selectedOpportunity.opportunity.readiness}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-surface-container p-3">
                  <p className="text-xs font-black uppercase text-outline">Risk</p>
                  <p className="mt-2 text-sm font-black text-on-surface">{selectedOpportunity.opportunity.risk}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-surface-container p-3">
                  <p className="text-xs font-black uppercase text-outline">Authority Requirements</p>
                  <p className="mt-2 text-sm font-black text-on-surface">{selectedOpportunity.opportunity.executionSensitivity}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">Dependencies</p>
                <div className="mt-2 space-y-2">
                  {selectedOpportunity.dependencies.length ? selectedOpportunity.dependencies.map((dependency) => (
                    <p key={dependency.id} className="rounded-lg border border-white/10 bg-surface-container p-3 text-sm text-outline">
                      {dependency.id}: {dependency.sourceNucleusOrOpportunity} to {dependency.targetNucleus}
                    </p>
                  )) : (
                    <p className="rounded-lg border border-white/10 bg-surface-container p-3 text-sm text-outline">
                      No representative dependency record is attached to this opportunity in the local consumer snapshot.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">Blockers</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedOpportunity.blockers.length ? selectedOpportunity.blockers.map((blocker) => (
                    <span key={blocker} className="ax-meta-chip">{blocker}</span>
                  )) : (
                    <span className="ax-meta-chip">No blocking label in local snapshot</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-6 text-outline">No opportunity selected.</p>
          )}
        </CardShell>
      </div>
    </div>
  );
}
