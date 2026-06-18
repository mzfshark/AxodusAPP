import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TenantDiscoveryCard } from '../components/cards';
import { governanceTenantsMock } from '@/data/mock';

export default function GovernanceTenants() {
  const { tenants, coreMetrics } = governanceTenantsMock;
  const [searchParams] = useSearchParams();
  const selectedRisks = searchParams.getAll('risk');
  const selectedTypes = searchParams.getAll('type');
  const selectedChains = searchParams.getAll('chain');
  const selectedTiers = searchParams.getAll('tier');
  const selectedStatuses = searchParams.getAll('status');
  const featuredOnly = searchParams.getAll('featured').includes('true');
  const activeFilterCount =
    selectedRisks.length + selectedTypes.length + selectedChains.length + selectedTiers.length + selectedStatuses.length + (featuredOnly ? 1 : 0);

  const filteredTenants = useMemo(
    () =>
      tenants.filter((tenant) => {
        const riskMatch = selectedRisks.length === 0 || selectedRisks.includes(tenant.riskLevel);
        const typeMatch = selectedTypes.length === 0 || tenant.investmentTypes.some((type) => selectedTypes.includes(type));
        const chainMatch = selectedChains.length === 0 || tenant.chains.some((chain) => selectedChains.includes(chain));
        const tierMatch = selectedTiers.length === 0 || selectedTiers.includes(tenant.federationTier);
        const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(tenant.governanceStatus);
        const featuredMatch = !featuredOnly || tenant.featured;

        return riskMatch && typeMatch && chainMatch && tierMatch && statusMatch && featuredMatch;
      }),
    [featuredOnly, selectedChains, selectedRisks, selectedStatuses, selectedTiers, selectedTypes, tenants],
  );

  return (
    <main className="min-h-full bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-lg border border-cyan-300/15 bg-surface-container-highest p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">DAO Tenants</span>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-on-surface md:text-4xl">Discover governed economic organizations.</h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-on-surface-variant">
                Browse tenant DAOs by risk profile, investment type, federation standing, APR, TVL, chains and governance state.
              </p>
            </div>
            <Link to="/governance" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-black text-on-surface">
              Back to Overview
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="rounded-lg border border-white/5 bg-surface-container-highest px-5 py-4">
            <div className="text-sm font-black text-on-surface">{filteredTenants.length} DAO Tenants</div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Filters are controlled from the Governance sidebar. {activeFilterCount ? `${activeFilterCount} active filter${activeFilterCount === 1 ? '' : 's'}.` : 'No filters active.'}
            </p>
          </div>
          <div className="grid gap-4">
            {filteredTenants.map((tenant) => (
              <TenantDiscoveryCard key={tenant.id} tenant={tenant} coreApr={coreMetrics.apr} />
            ))}
          </div>
          {!filteredTenants.length ? (
            <div className="rounded-lg border border-white/5 bg-surface-container-highest p-8 text-center">
              <h2 className="text-xl font-black text-on-surface">No DAO tenants match these filters</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Clear one or more sidebar filters to broaden discovery.</p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
