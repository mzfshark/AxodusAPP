import { useParams } from 'react-router-dom';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceProductCard from '../components/MarketplaceProductCard';
import { getMarketplaceSeller, filterMarketplaceProducts } from '../services/marketplaceService';

export default function MarketplaceSellerProfile() {
  const { sellerId } = useParams();
  const seller = getMarketplaceSeller(sellerId);
  const products = filterMarketplaceProducts({}).filter((product) => product.sellerId === sellerId);

  if (!seller) return <main className="app-view-shell"><MarketplacePageHeader title="Seller not found" /></main>;

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title={seller.name} description={seller.description} />
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <div className="flex flex-wrap gap-2">
          <MarketplaceBadge value={seller.governanceStanding} />
          <MarketplaceBadge value={seller.verificationStatus} />
          <MarketplaceBadge value={seller.constitutionalBound ? 'aligned' : 'requires-review'} label="Constitutional" />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
          <Info label="Reputation" value={`${seller.reputation}/100`} />
          <Info label="Risk score" value={`${seller.riskScore}/100`} />
          <Info label="Products" value={seller.productsPublished} />
          <Info label="Treasury linked" value={seller.treasuryLinked ? 'yes' : 'no'} />
        </dl>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}
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
