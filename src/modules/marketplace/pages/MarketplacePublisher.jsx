import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { getMarketplaceSeller } from '../services/marketplaceService';

export default function MarketplacePublisher() {
  const marketplace = useMarketplaceData();

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader
        title="Publisher Console"
        description="Publisher queue for listing readiness, metadata review, plugin audits, and governance escalation. Publishing remains mock-only."
      />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Publisher tasks" value={marketplace.publisherQueue.length} detail="Mock listing readiness queue." />
        <MarketplaceMetricCard label="Blocked" value={marketplace.operations.publisherBlocked} detail="Seller, treasury, or review blockers." />
        <MarketplaceMetricCard label="Publish execution" value="Disabled" detail="No live listing activation." />
        <MarketplaceMetricCard label="Reviews" value={marketplace.publisherQueue.reduce((sum, task) => sum + task.requiredReviews.length, 0)} detail="Governance and ACS checks." />
      </section>
      <section className="space-y-4">
        {marketplace.publisherQueue.map((task) => {
          const seller = getMarketplaceSeller(task.sellerId);
          const readiness = marketplace.operations.publisherPreviews.find((item) => item.taskId === task.id);
          return (
            <article key={task.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="font-mono text-xs text-outline">{task.id}</p>
                  <h2 className="mt-2 text-xl font-bold text-on-surface">{task.title}</h2>
                  <p className="mt-1 text-sm text-outline">{seller?.name}</p>
                </div>
                <MarketplaceBadge value={task.status} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {readiness.requiredReviews.map((review) => <MarketplaceBadge key={review.id} value={review.status} label={review.label} />)}
              </div>
              <div className="mt-4 rounded-lg border border-white/10 bg-surface-container p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold text-on-surface">{readiness.service}</p>
                  <MarketplaceBadge value={readiness.mockReady ? 'mock-clear' : 'review-required'} />
                </div>
                <p className="mt-2 text-outline">Publish execution: {readiness.publishEnabled ? 'enabled' : 'disabled'}</p>
                <p className="mt-2 text-xs text-outline">{readiness.blockedReasons.join(', ') || 'mock ready, live publishing disabled'}</p>
              </div>
              {task.blocker && (
                <p className="mt-4 rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                  Blocker: {task.blocker}
                </p>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
