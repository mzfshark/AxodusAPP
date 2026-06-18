import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import MarketplaceLifecycleRail from '../components/MarketplaceLifecycleRail';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { getMarketplaceProductById } from '../services/marketplaceService';

export default function MarketplaceSubscriptions() {
  const marketplace = useMarketplaceData();

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader
        title="Subscriptions"
        description="Subscription access is lifecycle visibility only. Renewal, revocation, and billing execution remain disabled in MVP."
      />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Subscriptions" value={marketplace.subscriptions.length} detail="DAO and license access records." />
        <MarketplaceMetricCard label="Review required" value={marketplace.operations.subscriptionsReviewRequired} detail="Governance, ACS, or access blockers." />
        <MarketplaceMetricCard label="Restricted" value={marketplace.metrics.subscriptionsRestricted} detail="Access cannot renew." />
        <MarketplaceMetricCard label="Renewal execution" value="Disabled" detail="Preview lifecycle only." />
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {marketplace.subscriptions.map((subscription) => {
          const product = getMarketplaceProductById(subscription.productId);
          const readiness = marketplace.operations.subscriptionPreviews.find((item) => item.subscriptionId === subscription.id);
          return (
            <article key={subscription.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-outline">{subscription.id}</p>
                  <h2 className="mt-2 text-xl font-bold text-on-surface">{subscription.plan}</h2>
                  <p className="mt-1 text-sm text-outline">{product?.title}</p>
                </div>
                <MarketplaceBadge value={subscription.status} />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Info label="Holder" value={subscription.holder} />
                <Info label="Cycle" value={subscription.renewalCycle} />
                <Info label="Access scope" value={subscription.accessScope} />
                <Info label="Governance" value={subscription.governanceStanding} />
              </dl>
              <p className="mt-4 rounded-lg bg-surface-container p-3 font-mono text-xs leading-5 text-outline">{subscription.treasuryDestination}</p>
              <div className="mt-4 rounded-lg border border-white/10 bg-surface-container p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold text-on-surface">{readiness.service}</p>
                  <MarketplaceBadge value={readiness.status} />
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-3">
                  <Info label="Days to review" value={readiness.daysToReview} />
                <Info label="Access preview" value={readiness.accessPreviewEnabled ? 'available' : 'blocked'} />
                <Info label="Renewal" value={readiness.renewalEnabled ? 'enabled' : 'disabled'} />
                <Info label="Revocation" value={readiness.revocationPreviewEnabled ? 'preview' : 'disabled'} />
                <Info label="Pause" value={readiness.pausePreviewEnabled ? 'preview' : 'disabled'} />
                <Info label="Cancel" value={readiness.cancellationPreviewEnabled ? 'preview' : 'disabled'} />
                <Info label="Billing" value={readiness.billingLifecycle} />
                <Info label="License" value={readiness.licenseLifecycle} />
              </dl>
                <div className="mt-3">
                  <MarketplaceLifecycleRail title="Subscription lifecycle" steps={readiness.subscriptionTimeline} compact />
                </div>
                <p className="mt-3 text-xs text-outline">{readiness.blockedReasons.join(', ') || 'mock clear, renewal execution disabled'}</p>
                <p className="mt-2 rounded-lg border border-yellow-400/20 bg-yellow-500/10 p-2 text-xs text-yellow-100">{readiness.disclaimer}</p>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-surface-container p-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-outline">{label}</dt>
      <dd className="mt-1 font-semibold text-on-surface">{value}</dd>
    </div>
  );
}
