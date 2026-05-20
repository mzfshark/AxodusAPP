import { Link } from 'react-router-dom';
import MarketplaceBadge from './MarketplaceBadge';
import { getMarketplaceSeller } from '../services/marketplaceService';

export default function MarketplaceListingsTable({ products }) {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-surface-container-low">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead className="bg-surface-container text-xs uppercase tracking-[0.14em] text-outline">
            <tr>
              <th className="px-4 py-3">Listing</th>
              <th className="px-4 py-3">DAO / Vendor</th>
              <th className="px-4 py-3">Governance</th>
              <th className="px-4 py-3">Treasury</th>
              <th className="px-4 py-3">Execution</th>
              <th className="px-4 py-3">ACS / Risk</th>
              <th className="px-4 py-3">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => {
              const seller = getMarketplaceSeller(product.sellerId);
              return (
                <tr key={product.id} className="align-top">
                  <td className="px-4 py-4">
                    <Link to={`/marketplace/products/${product.slug}`} className="font-bold text-on-surface hover:text-primary">
                      {product.title}
                    </Link>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-outline">{product.shortDescription}</p>
                    <p className="mt-2 font-mono text-[11px] text-outline">{product.tokenStandard} / {product.tokenId ?? product.id}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-on-surface">{product.daoOwner}</p>
                    {seller && <Link to={`/marketplace/sellers/${seller.id}`} className="mt-1 block text-xs text-primary">{seller.name}</Link>}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <MarketplaceBadge value={product.governanceStatus} />
                      <MarketplaceBadge value={product.constitutionalStanding} />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="max-w-[180px] font-mono text-xs leading-5 text-outline">{product.treasuryDestination}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-on-surface">{product.executionType}</p>
                    <p className="mt-1 text-xs text-outline">{product.subscriptionStatus}</p>
                    <p className="mt-1 text-xs text-outline">{product.supportedChains.join(', ')}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <MarketplaceBadge value={product.acsValidationState} label="ACS" />
                      <MarketplaceBadge value={product.operationalRisk} label="Risk" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-mono font-semibold text-on-surface">{product.pricing.amount} {product.pricing.currency}</p>
                    <p className="mt-1 text-xs text-outline">{product.royaltyModel.bps / 100}% royalty</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
