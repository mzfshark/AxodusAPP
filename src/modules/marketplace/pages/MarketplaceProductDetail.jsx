import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import PurchasePreviewModal from '../components/PurchasePreviewModal';
import { getMarketplaceProduct, getMarketplaceSeller } from '../services/marketplaceService';

export default function MarketplaceProductDetail() {
  const { slug } = useParams();
  const product = getMarketplaceProduct(slug);
  const seller = product ? getMarketplaceSeller(product.sellerId) : null;
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  if (!product) {
    return (
      <main className="app-view-shell">
        <MarketplacePageHeader title="Product not found" description="The requested Marketplace product is not present in the mock registry." />
      </main>
    );
  }

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title={product.title} description={product.description} />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <img src={product.image} alt="" className="min-h-96 rounded-lg border border-white/10 object-cover" />
        <aside className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <div className="flex flex-wrap gap-2">
            <MarketplaceBadge value={product.governanceStatus} />
            <MarketplaceBadge value={product.tokenStandard} />
            <MarketplaceBadge value={product.listingType} />
            <MarketplaceBadge value={product.constitutionalStanding} />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Info label="Price" value={`${product.pricing.amount} ${product.pricing.currency}`} />
            <Info label="Royalty" value={`${product.royaltyModel.bps / 100}% ${product.royaltyModel.standard}`} />
            <Info label="Delivery" value={product.deliveryType} />
            <Info label="Access" value={product.accessModel} />
            <Info label="Contract" value={product.contractAddress ?? 'mock offchain'} />
            <Info label="Token ID" value={product.tokenId ?? 'not minted'} />
          </dl>
          <button type="button" onClick={() => setPurchaseOpen(true)} className="mt-5 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-on-primary">
            Open buy-now / bid preview
          </button>
        </aside>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Seller">
          {seller && <Link to={`/marketplace/sellers/${seller.id}`} className="font-bold text-primary">{seller.name}</Link>}
          {seller && <p className="mt-2 text-outline">Standing: {seller.governanceStanding} / reputation {seller.reputation}</p>}
        </Panel>
        <Panel title="Greenfield delivery">
          <p>Bucket: {product.greenfieldBucket ?? 'not required'}</p>
          <p>Signed URL preview: {product.signedUrlPreviewAvailable ? 'available after mock purchase' : 'not available'}</p>
        </Panel>
        <Panel title="LayerZero readiness">
          <p>Ready: {product.bridgeReadiness.layerZeroReady ? 'yes' : 'no'}</p>
          <p>Source: {product.bridgeReadiness.sourceChain}</p>
          <p>Destinations: {product.bridgeReadiness.destinationChains.join(', ') || 'none'}</p>
        </Panel>
      </section>
      {purchaseOpen && <PurchasePreviewModal product={product} onClose={() => setPurchaseOpen(false)} />}
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-surface-container p-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-outline">{label}</dt>
      <dd className="mt-1 break-all font-semibold text-on-surface">{value}</dd>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5 text-sm leading-6 text-outline">
      <h2 className="mb-3 text-lg font-bold text-on-surface">{title}</h2>
      {children}
    </article>
  );
}
