import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceProductCard from '../components/MarketplaceProductCard';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import { useMarketplaceData } from '../hooks/useMarketplaceData';

export default function MarketplaceGovernance() {
  const marketplace = useMarketplaceData();
  const reviewProducts = marketplace.products.filter((product) => product.governanceStatus !== 'compliant');
  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Governance Validation" description="Product standing, seller standing, ACS moderation workflows, and constitutional review states." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MarketplaceMetricCard label="Compliant" value={marketplace.products.length - reviewProducts.length} detail="Ready for discovery." />
        <MarketplaceMetricCard label="Pending review" value={marketplace.metrics.pendingGovernance} detail="Constitutional or risk review required." />
        <MarketplaceMetricCard label="Restricted" value={marketplace.metrics.restrictedProducts} detail="Blocked from settlement." />
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">ACS workflows</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
          {['Product Validation', 'Seller Review', 'DAO Plugin Audit', 'Risk Escalation', 'License Conflict Review'].map((workflow) => (
            <div key={workflow} className="rounded-lg border border-white/10 bg-surface-container p-3 text-sm font-semibold text-on-surface">{workflow}</div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {reviewProducts.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}
      </section>
    </main>
  );
}
