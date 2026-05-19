import { Link } from 'react-router-dom';
import { BadgeDollarSign, Gavel, ShieldAlert, ShieldCheck } from 'lucide-react';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import MarketplaceProductCard from '../components/MarketplaceProductCard';
import MarketplaceBadge from '../components/MarketplaceBadge';
import { useMarketplaceData } from '../hooks/useMarketplaceData';

export default function MarketplaceHome() {
  const marketplace = useMarketplaceData();
  const metrics = [
    { icon: Gavel, label: 'Active listings', value: marketplace.metrics.activeListings, detail: 'Fixed, auction, and license previews.' },
    { icon: ShieldCheck, label: 'NFT-bound assets', value: marketplace.metrics.nftBoundProducts, detail: 'ERC721/1155 ownership models.' },
    { icon: ShieldAlert, label: 'Governance review', value: marketplace.metrics.pendingGovernance, detail: 'Pending validation queue.' },
    { icon: BadgeDollarSign, label: 'Royalty preview', value: `${marketplace.metrics.royaltyPreview} USDC`, detail: 'Mock EIP-2981/custom splits.' },
  ];

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader
        title="Governance-Aware NFT Marketplace"
        description="AxodusAPP integrated marketplace for ERC721/1155 assets, fixed listings, auctions, bids, licenses, Greenfield delivery previews, and governance validation states."
      />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => <MarketplaceMetricCard key={metric.label} {...metric} />)}
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {marketplace.products.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}
        </div>
        <aside className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <h2 className="text-xl font-bold text-on-surface">Phase 2 boundaries</h2>
          <p className="mt-2 text-sm leading-6 text-outline">Prepared integration points. No live execution is enabled.</p>
          <div className="mt-4 space-y-3">
            {marketplace.boundaries.map((boundary) => (
              <article key={boundary.id} className="rounded-lg border border-white/10 bg-surface-container p-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-on-surface">{boundary.label}</h3>
                  <MarketplaceBadge value={boundary.status} />
                </div>
                <p className="mt-2 text-sm leading-5 text-outline">{boundary.description}</p>
              </article>
            ))}
          </div>
          <Link to="/marketplace/create" className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary">
            Create / sell preview
          </Link>
        </aside>
      </section>
    </main>
  );
}
