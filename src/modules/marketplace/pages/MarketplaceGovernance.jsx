import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceProductCard from '../components/MarketplaceProductCard';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import MarketplaceBadge from '../components/MarketplaceBadge';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { GovernanceValidationService } from '../services/complianceServices';

export default function MarketplaceGovernance() {
  const marketplace = useMarketplaceData();
  const reviewProducts = marketplace.products.filter((product) => product.governanceStatus !== 'compliant');
  const validationSummary = GovernanceValidationService.getValidationSummary();
  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Governance Validation" description="Product standing, seller standing, ACS moderation workflows, and constitutional review states." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Compliant" value={marketplace.products.length - reviewProducts.length} detail="Ready for discovery." />
        <MarketplaceMetricCard label="Review gates" value={validationSummary.requiredReviewCount} detail="Constitutional, ACS, treasury and DAO gates." />
        <MarketplaceMetricCard label="Blocked" value={validationSummary.blockedProducts} detail="Cannot activate or settle." />
        <MarketplaceMetricCard label="Settlement ready" value={validationSummary.settlementReady} detail="Preview only; no execution." />
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">ACS workflows</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
          {['Product Validation', 'Seller Review', 'DAO Plugin Audit', 'Risk Escalation', 'License Conflict Review'].map((workflow) => (
            <div key={workflow} className="rounded-lg border border-white/10 bg-surface-container p-3 text-sm font-semibold text-on-surface">{workflow}</div>
          ))}
        </div>
      </section>
      <section className="overflow-hidden rounded-lg border border-white/10 bg-surface-container-low">
        <div className="border-b border-white/10 p-5">
          <h2 className="text-xl font-bold text-on-surface">Validation queue</h2>
          <p className="mt-2 text-sm leading-6 text-outline">Read-only activation readiness. Governance approval, ACS review and treasury routing remain mocked.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-surface-container text-xs uppercase tracking-[0.14em] text-outline">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Seller</th>
                <th className="px-4 py-3">Standing</th>
                <th className="px-4 py-3">Required reviews</th>
                <th className="px-4 py-3">Blockers</th>
                <th className="px-4 py-3">Activation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {validationSummary.validations.map((validation) => (
                <tr key={validation.productId} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-bold text-on-surface">{marketplace.products.find((product) => product.id === validation.productId)?.title}</p>
                    <p className="mt-1 font-mono text-xs text-outline">{validation.productId}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-on-surface">{validation.seller?.name}</p>
                    <p className="mt-1 text-xs text-outline">{validation.seller?.governanceStanding}</p>
                  </td>
                  <td className="px-4 py-4"><MarketplaceBadge value={validation.standing} /></td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {validation.requiredReviews.map((review) => <MarketplaceBadge key={review.id} value={review.status} label={review.label} />)}
                    </div>
                  </td>
                  <td className="px-4 py-4 max-w-[260px] text-xs text-outline">{validation.blockers.join(', ') || 'none'}</td>
                  <td className="px-4 py-4">
                    <MarketplaceBadge value={validation.activationEnabled ? 'mock-clear' : 'deferred'} label={validation.activationEnabled ? 'enabled' : 'disabled'} />
                    <p className="mt-2 text-xs text-outline">Settlement {validation.settlementAllowed ? 'eligible after approval' : 'blocked or review-only'}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {reviewProducts.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}
      </section>
    </main>
  );
}
