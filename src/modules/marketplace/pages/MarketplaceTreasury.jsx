import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import { useMarketplaceData } from '../hooks/useMarketplaceData';

export default function MarketplaceTreasury() {
  const marketplace = useMarketplaceData();

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader
        title="Treasury Routing"
        description="Mock accounting hooks for marketplace revenue, royalty previews, review escrow, and DAO allocation visibility. No treasury movement is enabled."
      />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MarketplaceMetricCard label="Treasury routes" value={marketplace.metrics.treasuryDestinations} detail="Visible mock destinations." />
        <MarketplaceMetricCard label="Under review" value={marketplace.operations.treasuryReviewRequired} detail="Routes needing governance or treasury validation." />
        <MarketplaceMetricCard label="Royalty preview" value={`${marketplace.metrics.royaltyPreview} USDC`} detail="EIP-2981/custom preview only." />
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {marketplace.treasuryRoutes.map((route) => (
          <TreasuryRouteCard key={route.id} route={route} preview={marketplace.operations.treasuryPreviews.find((item) => item.routeId === route.id)} />
        ))}
      </section>
    </main>
  );
}

function TreasuryRouteCard({ route, preview }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{route.routeType}</p>
          <h2 className="mt-2 text-lg font-bold text-on-surface">{route.destination}</h2>
        </div>
        <MarketplaceBadge value={route.status} />
      </div>
      <dl className="mt-5 space-y-3 text-sm">
        <Row label="DAO owner" value={route.daoOwner} />
        <Row label="Allocation" value={route.allocationPreview} />
        <Row label="Settlement" value={route.settlementMode} />
        <Row label="Accounting hook" value={route.accountingHook} mono />
      </dl>
      <div className="mt-5 rounded-lg border border-white/10 bg-surface-container p-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold text-on-surface">BillingPreviewService</p>
          <MarketplaceBadge value={preview.status} />
        </div>
        <p className="mt-2 font-mono text-xs text-outline">{preview.accountingHook}</p>
        <p className="mt-2 text-xs text-outline">{preview.blockedReasons.join(', ') || 'mock clear, treasury movement disabled'}</p>
      </div>
    </article>
  );
}

function Row({ label, value, mono }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.14em] text-outline">{label}</dt>
      <dd className={`mt-1 text-on-surface ${mono ? 'font-mono text-xs' : 'font-semibold'}`}>{value}</dd>
    </div>
  );
}
