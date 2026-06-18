import { Link } from 'react-router-dom';
import { Clock, Landmark, Layers, ShieldCheck } from 'lucide-react';
import MarketplaceBadge from './MarketplaceBadge';
import { getMarketplaceSeller } from '../services/marketplaceService';

export default function MarketplaceProductCard({ product }) {
  const seller = getMarketplaceSeller(product.sellerId);
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <MarketplaceBadge value={product.governanceStatus} />
          <MarketplaceBadge value={product.tokenStandard} />
          <MarketplaceBadge value={product.operationalRisk} label="Risk" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{product.category}</p>
          <Link to={`/marketplace/products/${product.slug}`} className="mt-2 block text-lg font-bold text-on-surface hover:text-primary">
            {product.title}
          </Link>
          <p className="mt-2 text-sm leading-6 text-outline">{product.shortDescription}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-surface-container p-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-outline">Price</dt>
            <dd className="mt-1 font-semibold text-on-surface">{product.pricing.amount} {product.pricing.currency}</dd>
          </div>
          <div className="rounded-lg bg-surface-container p-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-outline">Execution</dt>
            <dd className="mt-1 font-semibold text-on-surface">{product.executionType}</dd>
          </div>
          <div className="rounded-lg bg-surface-container p-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-outline">DAO owner</dt>
            <dd className="mt-1 font-semibold text-on-surface">{product.daoOwner}</dd>
          </div>
          <div className="rounded-lg bg-surface-container p-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-outline">ACS</dt>
            <dd className="mt-1 font-semibold text-on-surface">{product.acsValidationState}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-3 text-xs text-outline">
          <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> {product.supportedChains.join(', ')}</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> {product.constitutionalStanding}</span>
          <span className="flex items-center gap-1"><Landmark className="h-3.5 w-3.5" /> {product.treasuryDestination}</span>
          {product.auction && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {product.auction.bidCount} bids</span>}
        </div>
        {seller && (
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <Link to={`/marketplace/sellers/${seller.id}`} className="text-sm font-semibold text-on-surface hover:text-primary">{seller.name}</Link>
            <MarketplaceBadge value={seller.governanceStanding} />
          </div>
        )}
      </div>
    </article>
  );
}
