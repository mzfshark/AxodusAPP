import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import MarketplaceBadge from '../components/MarketplaceBadge';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { getMarketplaceBoundaryReadiness } from '../services/boundaryAdapters';
import { GovernanceValidationService } from '../services/complianceServices';

export default function MarketplaceDashboard() {
  const marketplace = useMarketplaceData();
  const adapterReadiness = getMarketplaceBoundaryReadiness();
  const validationSummary = GovernanceValidationService.getValidationSummary();
  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Marketplace Dashboard" description="Mock operational telemetry for listings, sellers, governance alerts, royalties, and integration boundaries." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Listings" value={marketplace.metrics.activeListings} detail="Mock fixed and auction listings." />
        <MarketplaceMetricCard label="Billing review" value={marketplace.operations.billingReviewRequired} detail="Mock orders awaiting validation." />
        <MarketplaceMetricCard label="Subscription review" value={marketplace.operations.subscriptionsReviewRequired} detail="Lifecycle records needing review." />
        <MarketplaceMetricCard label="Publisher blocked" value={marketplace.operations.publisherBlocked} detail="Listing tasks with blockers." />
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Tenants" value={marketplace.metrics.tenants} detail={`${marketplace.metrics.tenantWarnings} tenant contexts need review.`} />
        <MarketplaceMetricCard label="License models" value={marketplace.metrics.licenseModels} detail="NFT, DAO and enterprise access." />
        <MarketplaceMetricCard label="Mock revenue" value={`${marketplace.metrics.mockRevenuePreview} USDC`} detail="Preview only; no settlement." />
        <MarketplaceMetricCard label="Validation gates" value={validationSummary.requiredReviewCount} detail="Governance, ACS and treasury checks." />
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">Tenant commerce overview</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-surface-container text-xs uppercase tracking-[0.14em] text-outline">
              <tr>
                <th className="px-4 py-3">Tenant</th>
                <th className="px-4 py-3">Standing</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Treasury</th>
                <th className="px-4 py-3">Review authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {marketplace.tenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td className="px-4 py-4">
                    <p className="font-bold text-on-surface">{tenant.name}</p>
                    <p className="mt-1 text-xs text-outline">{tenant.type}</p>
                  </td>
                  <td className="px-4 py-4"><MarketplaceBadge value={tenant.governanceStanding} /></td>
                  <td className="px-4 py-4 font-mono text-xs text-outline">{marketplace.products.filter((product) => product.tenantId === tenant.id).length}</td>
                  <td className="px-4 py-4 font-mono text-xs text-outline">{tenant.treasuryDestination}</td>
                  <td className="px-4 py-4 text-outline">{tenant.reviewAuthority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">Integration boundaries</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {marketplace.boundaries.map((boundary) => (
            <article key={boundary.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-on-surface">{boundary.label}</h3>
                <MarketplaceBadge value={boundary.status} />
              </div>
              <p className="mt-2 text-sm leading-5 text-outline">{boundary.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">Phase 2 adapter readiness</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-5">
          {adapterReadiness.map((boundary) => (
            <article key={boundary.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-on-surface">{boundary.label}</h3>
                <MarketplaceBadge value={boundary.status} />
              </div>
              <p className="mt-3 text-sm leading-5 text-outline">{boundary.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
