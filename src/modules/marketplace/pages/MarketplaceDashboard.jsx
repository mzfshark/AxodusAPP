import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import MarketplaceBadge from '../components/MarketplaceBadge';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { getMarketplaceBoundaryReadiness } from '../services/boundaryAdapters';

export default function MarketplaceDashboard() {
  const marketplace = useMarketplaceData();
  const adapterReadiness = getMarketplaceBoundaryReadiness();
  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Marketplace Dashboard" description="Mock operational telemetry for listings, sellers, governance alerts, royalties, and integration boundaries." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Listings" value={marketplace.metrics.activeListings} detail="Mock fixed and auction listings." />
        <MarketplaceMetricCard label="Billing review" value={marketplace.operations.billingReviewRequired} detail="Mock orders awaiting validation." />
        <MarketplaceMetricCard label="Subscription review" value={marketplace.operations.subscriptionsReviewRequired} detail="Lifecycle records needing review." />
        <MarketplaceMetricCard label="Publisher blocked" value={marketplace.operations.publisherBlocked} detail="Listing tasks with blockers." />
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
