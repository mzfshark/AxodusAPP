import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { APRComparisonBadge, FederationStatusBadge, RiskIndicator } from '../components/TenantDiscoveryCards';
import { governanceTenantsMock } from '@/data/mock';

const riskFilters = ['low', 'moderate', 'balanced', 'high', 'experimental'];
const investmentTypeFilters = ['Mining', 'Trading', 'DeFi', 'Staking', 'Yield', 'AI Infrastructure', 'Compute', 'Marketplace', 'Education', 'Treasury', 'Venture'];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    notation: value >= 1000000 ? 'compact' : 'standard',
  }).format(value ?? 0);
}

function formatPercent(value) {
  return `${Number(value ?? 0).toFixed(2)}%`;
}

function toggleSelection(current, value) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-xs font-black uppercase transition ${
        active ? 'border-cyan-300/30 bg-cyan-950/30 text-cyan-100' : 'border-white/10 bg-surface-container-high text-on-surface-variant hover:text-on-surface'
      }`}
    >
      {children}
    </button>
  );
}

function TenantListingCard({ tenant, coreApr }) {
  return (
    <article className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase text-cyan-200">{tenant.symbol}</span>
            {tenant.featured ? (
              <span className="rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2 py-1 text-[10px] font-black uppercase text-cyan-100">
                Featured
              </span>
            ) : null}
          </div>
          <h2 className="mt-2 text-xl font-black text-on-surface">{tenant.name}</h2>
          <p className="mt-1 text-xs font-bold text-on-surface-variant">{tenant.category}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-on-surface-variant">{tenant.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 xl:justify-end">
          <RiskIndicator riskLevel={tenant.riskLevel} />
          <FederationStatusBadge status={tenant.governanceStatus} tier={tenant.federationTier} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-[10px] font-black uppercase text-slate-500">APR</div>
          <div className="mt-1 font-mono text-sm font-black text-on-surface">{formatPercent(tenant.apr)}</div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3 md:col-span-2">
          <div className="text-[10px] font-black uppercase text-slate-500">APR vs CORE</div>
          <div className="mt-1">
            <APRComparisonBadge tenantApr={tenant.apr} coreApr={coreApr} />
          </div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-[10px] font-black uppercase text-slate-500">TVL</div>
          <div className="mt-1 font-mono text-sm font-black text-on-surface">{formatCurrency(tenant.tvl)}</div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-[10px] font-black uppercase text-slate-500">Members</div>
          <div className="mt-1 font-mono text-sm font-black text-on-surface">{tenant.members.toLocaleString('en-US')}</div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <div>
          <div className="text-[10px] font-black uppercase text-slate-500">Investment types</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tenant.investmentTypes.map((type) => (
              <span key={type} className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                {type}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase text-slate-500">Chains</div>
          <div className="mt-2 font-mono text-[11px] leading-5 text-on-surface-variant">{tenant.chains.join(' / ')}</div>
        </div>
        <Link to={tenant.route} className="rounded-lg border border-white/10 bg-surface-container-high px-4 py-2 text-center text-sm font-black text-on-surface">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default function GovernanceTenants() {
  const { tenants, coreMetrics } = governanceTenantsMock;
  const [selectedRisks, setSelectedRisks] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filteredTenants = useMemo(
    () =>
      tenants.filter((tenant) => {
        const riskMatch = selectedRisks.length === 0 || selectedRisks.includes(tenant.riskLevel);
        const typeMatch = selectedTypes.length === 0 || tenant.investmentTypes.some((type) => selectedTypes.includes(type));
        const featuredMatch = !featuredOnly || tenant.featured;

        return riskMatch && typeMatch && featuredMatch;
      }),
    [featuredOnly, selectedRisks, selectedTypes, tenants],
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

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-on-surface">Filters</h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedRisks([]);
                  setSelectedTypes([]);
                  setFeaturedOnly(false);
                }}
                className="text-xs font-black uppercase text-cyan-200"
              >
                Reset
              </button>
            </div>

            <div className="mt-5">
              <div className="text-[10px] font-black uppercase tracking-wide text-slate-500">Risk Level</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {riskFilters.map((risk) => (
                  <FilterButton key={risk} active={selectedRisks.includes(risk)} onClick={() => setSelectedRisks((current) => toggleSelection(current, risk))}>
                    {risk}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[10px] font-black uppercase tracking-wide text-slate-500">Investment Type</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {investmentTypeFilters.map((type) => (
                  <FilterButton key={type} active={selectedTypes.includes(type)} onClick={() => setSelectedTypes((current) => toggleSelection(current, type))}>
                    {type}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <FilterButton active={featuredOnly} onClick={() => setFeaturedOnly((current) => !current)}>
                Featured only
              </FilterButton>
            </div>
          </aside>

          <section className="flex flex-col gap-4">
            <div className="rounded-lg border border-white/5 bg-surface-container-highest px-5 py-4">
              <div className="text-sm font-black text-on-surface">{filteredTenants.length} DAO Tenants</div>
              <p className="mt-1 text-xs text-on-surface-variant">Filters support multiple risk levels and investment types at the same time.</p>
            </div>
            {filteredTenants.map((tenant) => (
              <TenantListingCard key={tenant.id} tenant={tenant} coreApr={coreMetrics.apr} />
            ))}
            {!filteredTenants.length ? (
              <div className="rounded-lg border border-white/5 bg-surface-container-highest p-8 text-center">
                <h2 className="text-xl font-black text-on-surface">No DAO tenants match these filters</h2>
                <p className="mt-2 text-sm text-on-surface-variant">Clear one or more filters to broaden discovery.</p>
              </div>
            ) : null}
          </section>
        </section>
      </div>
    </main>
  );
}
