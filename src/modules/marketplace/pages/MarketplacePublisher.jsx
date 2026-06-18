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
        <MarketplaceMetricCard label="Mock ready" value={marketplace.operations.publisherReady} detail="Can move to review package." />
        <MarketplaceMetricCard label="Checklist items" value={marketplace.operations.publisherChecklistItems} detail="Pre-publish controls tracked." />
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
                  <p className="mt-1 text-sm text-outline">{seller?.name} / {readiness.product?.title}</p>
                </div>
                <MarketplaceBadge value={task.status} />
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-4">
                <Info label="Registry" value={readiness.targetRegistry} />
                <Info label="Scope" value={readiness.publishingScope} />
                <Info label="Escalation" value={readiness.escalationTarget} />
                <Info label="Metadata" value={readiness.metadataState} />
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                {readiness.requiredReviews.map((review) => <MarketplaceBadge key={review.id} value={review.status} label={review.label} />)}
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-surface-container">
                <div className="border-b border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-outline">
                  Pre-publish checklist
                </div>
                <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
                  {readiness.checklist.map((item) => (
                    <div key={item.id} className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-on-surface">{item.label}</p>
                        <MarketplaceBadge value={item.status} />
                      </div>
                      <p className="mt-2 text-xs text-outline">{item.detail}</p>
                    </div>
                  ))}
                </div>
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

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-surface-container p-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-outline">{label}</dt>
      <dd className="mt-1 font-semibold text-on-surface">{value}</dd>
    </div>
  );
}
