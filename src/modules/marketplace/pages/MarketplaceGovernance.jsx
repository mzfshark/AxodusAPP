import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceProductCard from '../components/MarketplaceProductCard';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceLifecycleRail from '../components/MarketplaceLifecycleRail';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { GovernanceValidationService } from '../services/complianceServices';
import { getMarketplaceTenant } from '../services/marketplaceService';
import { getAcsMarketplaceSummary } from '../services/acsMarketplaceLayer';
import { getMarketplaceGovernanceRuntime, getMarketplaceGovernanceRuntimeSummary } from '../services/governanceRuntime';
import { getTenantFederationDashboard } from '../services/tenantFederation';

export default function MarketplaceGovernance() {
  const marketplace = useMarketplaceData();
  const reviewProducts = marketplace.products.filter((product) => product.governanceStatus !== 'compliant');
  const validationSummary = GovernanceValidationService.getValidationSummary();
  const governanceRuntime = getMarketplaceGovernanceRuntimeSummary();
  const federationDashboard = getTenantFederationDashboard();
  const acsSummary = getAcsMarketplaceSummary();
  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Governance Validation" description="Federated governance runtime for product standing, seller standing, tenant authority, ACS moderation workflows, and constitutional review states." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Compliant" value={marketplace.products.length - reviewProducts.length} detail="Ready for discovery." />
        <MarketplaceMetricCard label="Review gates" value={validationSummary.requiredReviewCount} detail="Constitutional, ACS, treasury and DAO gates." />
        <MarketplaceMetricCard label="Blocked" value={validationSummary.blockedProducts} detail="Cannot activate or settle." />
        <MarketplaceMetricCard label="Settlement ready" value={validationSummary.settlementReady} detail="Preview only; no execution." />
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Tenant federation" value={federationDashboard.tenantCount} detail={`${federationDashboard.storefrontsInReview} storefronts review-gated.`} />
        <MarketplaceMetricCard label="Constitutional alerts" value={governanceRuntime.constitutionalAlerts} detail="Tenant or product standing needs review." />
        <MarketplaceMetricCard label="Federation warnings" value={governanceRuntime.federationWarnings} detail="Seller or tenant standing warning." />
        <MarketplaceMetricCard label="ACS provisioning" value={acsSummary.provisioningReviewRequired} detail="Review-only runtime packages." />
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">ACS workflows</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
          {['Product Validation', 'Seller Review', 'DAO Plugin Audit', 'Risk Escalation', 'License Conflict Review'].map((workflow) => (
            <div key={workflow} className="rounded-lg border border-white/10 bg-surface-container p-3 text-sm font-semibold text-on-surface">{workflow}</div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">ACS marketplace visibility</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {acsSummary.packages.map((pkg) => (
            <article key={pkg.productId} className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-on-surface">{pkg.title}</h3>
                <MarketplaceBadge value={pkg.packageType} />
                <MarketplaceBadge value={pkg.provisioningStatus} />
              </div>
              <p className="mt-3 text-outline">Provisioning enabled: {pkg.provisioningEnabled ? 'yes' : 'no'}</p>
              <p className="text-outline">Runtime execution: {pkg.runtimeExecutionEnabled ? 'enabled' : 'disabled'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pkg.reviewQueue.map((review) => <MarketplaceBadge key={review} value={review} />)}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="overflow-hidden rounded-lg border border-white/10 bg-surface-container-low">
        <div className="border-b border-white/10 p-5">
          <h2 className="text-xl font-bold text-on-surface">Validation queue</h2>
          <p className="mt-2 text-sm leading-6 text-outline">Read-only activation readiness. Governance approval, ACS review and treasury routing remain mocked.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1320px] text-left text-sm">
            <thead className="bg-surface-container text-xs uppercase tracking-[0.14em] text-outline">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Seller</th>
                <th className="px-4 py-3">Tenant</th>
                <th className="px-4 py-3">Standing</th>
                <th className="px-4 py-3">Lifecycle</th>
                <th className="px-4 py-3">Required reviews</th>
                <th className="px-4 py-3">Blockers</th>
                <th className="px-4 py-3">Activation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {validationSummary.validations.map((validation) => {
                const product = marketplace.products.find((item) => item.id === validation.productId);
                const tenant = getMarketplaceTenant(product?.tenantId);
                const runtime = product ? getMarketplaceGovernanceRuntime(product) : null;
                return (
                <tr key={validation.productId} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-bold text-on-surface">{product?.title}</p>
                    <p className="mt-1 font-mono text-xs text-outline">{validation.productId}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-on-surface">{validation.seller?.name}</p>
                    <p className="mt-1 text-xs text-outline">{validation.seller?.governanceStanding}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-on-surface">{tenant?.name}</p>
                    <p className="mt-1 text-xs text-outline">{tenant?.reviewAuthority}</p>
                    {runtime && <p className="mt-1 text-xs text-outline">{runtime.federationTier}</p>}
                  </td>
                  <td className="px-4 py-4">
                    <MarketplaceBadge value={runtime?.restrictionState ?? validation.standing} />
                    {runtime && <p className="mt-2 text-xs text-outline">{runtime.operationalApprovalState}</p>}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <MarketplaceBadge value={validation.productLifecycle} label="Product" />
                      <MarketplaceBadge value={validation.governanceLifecycle} label="Governance" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {validation.requiredReviews.map((review) => <MarketplaceBadge key={review.id} value={review.status} label={review.label} />)}
                    </div>
                  </td>
                  <td className="px-4 py-4 max-w-[260px] text-xs text-outline">{[...(runtime?.warnings ?? []), ...(runtime?.sanctions ?? []), ...validation.blockers].join(', ') || 'none'}</td>
                  <td className="px-4 py-4">
                    <MarketplaceBadge value={validation.activationEnabled ? 'mock-clear' : 'deferred'} label={validation.activationEnabled ? 'enabled' : 'disabled'} />
                    <p className="mt-2 text-xs text-outline">Settlement {validation.settlementAllowed ? 'eligible after approval' : 'blocked or review-only'}</p>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {validationSummary.validations.map((validation) => (
          <article key={`${validation.productId}-timeline`} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-outline">{validation.productId}</p>
                <h2 className="mt-2 text-lg font-bold text-on-surface">Validation timeline</h2>
              </div>
              <MarketplaceBadge value={validation.governanceLifecycle} />
            </div>
            <div className="mt-4 space-y-3">
              <MarketplaceLifecycleRail title="Product lifecycle" steps={validation.productTimeline} />
              <MarketplaceLifecycleRail title="Governance validation lifecycle" steps={validation.governanceTimeline} />
            </div>
            <p className="mt-4 rounded-lg border border-yellow-400/20 bg-yellow-500/10 p-3 text-xs text-yellow-100">
              Mock validation. No settlement. No contract write. Recommendations are review-only.
            </p>
          </article>
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {reviewProducts.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}
      </section>
    </main>
  );
}
