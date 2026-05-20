import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Boxes, FileKey2, Landmark, Layers3, ShieldCheck } from 'lucide-react';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { getMarketplaceSeller } from '../services/marketplaceService';

const galleryModes = [
  { id: '', label: 'All assets' },
  { id: 'ERC721', label: 'ERC721' },
  { id: 'ERC1155', label: 'ERC1155' },
  { id: 'OffchainLicense', label: 'Licenses' },
];

export default function MarketplaceAssetGallery() {
  const marketplace = useMarketplaceData();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStandard = searchParams.get('tokenStandard') ?? '';
  const assets = marketplace.products.filter((product) => !selectedStandard || product.tokenStandard === selectedStandard);
  const nftAssets = marketplace.products.filter((product) => product.nftBound).length;
  const signedUrlAssets = marketplace.products.filter((product) => product.signedUrlPreviewAvailable).length;
  const bridgeReadyAssets = marketplace.products.filter((product) => product.bridgeReadiness?.layerZeroReady).length;

  const setMode = (tokenStandard) => {
    const next = new URLSearchParams(searchParams);
    if (tokenStandard) next.set('tokenStandard', tokenStandard);
    else next.delete('tokenStandard');
    setSearchParams(next);
  };

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader
        title="Asset Gallery"
        description="Operational gallery for NFT-bound access, ERC1155 bundles, offchain licenses, Greenfield delivery previews, and governance-aware asset inspection."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard icon={Boxes} label="Registry assets" value={marketplace.products.length} detail="Mock-driven product assets." />
        <MarketplaceMetricCard icon={FileKey2} label="NFT bound" value={nftAssets} detail="ERC721/1155 or NFT access." />
        <MarketplaceMetricCard icon={Layers3} label="Signed URL ready" value={signedUrlAssets} detail="Greenfield/access preview available." />
        <MarketplaceMetricCard icon={ShieldCheck} label="Bridge ready" value={bridgeReadyAssets} detail="LayerZero readiness only." />
      </section>

      <section className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-surface-container-low p-3">
        {galleryModes.map((mode) => (
          <button
            key={mode.label}
            type="button"
            onClick={() => setMode(mode.id)}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              selectedStandard === mode.id
                ? 'border-primary/40 bg-primary/15 text-on-surface'
                : 'border-white/10 bg-surface-container text-outline hover:text-on-surface'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {assets.map((product) => <AssetGalleryCard key={product.id} product={product} />)}
      </section>
    </main>
  );
}

function AssetGalleryCard({ product }) {
  const seller = getMarketplaceSeller(product.sellerId);
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-surface-container-low">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
        <div className="relative min-h-56 border-b border-white/10 bg-surface-container md:border-b-0 md:border-r">
          <img src={product.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/40 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
            <MarketplaceBadge value={product.tokenStandard} />
            <MarketplaceBadge value={product.listingType} />
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{product.category} / {product.subcategory}</p>
              <Link to={`/marketplace/products/${product.slug}`} className="mt-2 inline-flex items-center gap-2 text-xl font-bold text-on-surface hover:text-primary">
                {product.title}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <MarketplaceBadge value={product.governanceStatus} />
          </div>

          <p className="text-sm leading-6 text-outline">{product.shortDescription}</p>

          <dl className="grid grid-cols-2 gap-3 text-sm xl:grid-cols-4">
            <Info label="Asset ID" value={product.tokenId ?? product.id} mono />
            <Info label="Price" value={`${product.pricing.amount} ${product.pricing.currency}`} />
            <Info label="Delivery" value={product.deliveryType} />
            <Info label="Risk" value={product.operationalRisk} />
          </dl>

          <div className="grid grid-cols-1 gap-3 text-sm lg:grid-cols-3">
            <OperationalLine icon={Landmark} label="Treasury" value={product.treasuryDestination} />
            <OperationalLine icon={ShieldCheck} label="ACS" value={product.acsValidationState} />
            <OperationalLine icon={Layers3} label="Chains" value={product.supportedChains.join(', ')} />
          </div>

          {seller && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Link to={`/marketplace/sellers/${seller.id}`} className="text-sm font-bold text-on-surface hover:text-primary">{seller.name}</Link>
              <div className="flex flex-wrap gap-2">
                <MarketplaceBadge value={seller.governanceStanding} />
                <MarketplaceBadge value={product.constitutionalStanding} />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Info({ label, value, mono }) {
  return (
    <div className="rounded-lg bg-surface-container p-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-outline">{label}</dt>
      <dd className={`mt-1 break-all font-semibold text-on-surface ${mono ? 'font-mono text-xs' : ''}`}>{value}</dd>
    </div>
  );
}

function OperationalLine({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface-container p-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-outline">
        <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 text-on-surface">{value}</p>
    </div>
  );
}
