import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { getMarketplaceProductById } from '../services/marketplaceService';

export default function MarketplaceOrders() {
  const marketplace = useMarketplaceData();

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader
        title="Orders"
        description="Read-only order operations for mock purchases, auction bids, license issuance, governance review, and treasury routing visibility."
      />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Orders" value={marketplace.orders.length} detail="Mock purchase and bid records." />
        <MarketplaceMetricCard label="Review required" value={marketplace.operations.billingReviewRequired} detail="Governance, ACS, or product restrictions." />
        <MarketplaceMetricCard label="Settlement" value="Disabled" detail="No payment or contract execution." />
        <MarketplaceMetricCard label="Protocol fee" value="2.5%" detail="Preview only, no routing." />
      </section>
      <section className="overflow-hidden rounded-lg border border-white/10 bg-surface-container-low">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1160px] text-left text-sm">
            <thead className="bg-surface-container text-xs uppercase tracking-[0.14em] text-outline">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Buyer / DAO</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">License</th>
                <th className="px-4 py-3">Treasury</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Settlement preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {marketplace.orders.map((order) => {
                const product = getMarketplaceProductById(order.productId);
                const preview = marketplace.operations.orderPreviews.find((item) => item.orderId === order.id);
                return (
                  <tr key={order.id} className="align-top">
                    <td className="px-4 py-4 font-mono text-xs text-outline">{order.id}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-on-surface">{product?.title ?? order.productId}</p>
                      <p className="mt-1 text-xs text-outline">{product?.tokenStandard} / {product?.listingType}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-on-surface">{order.buyer}</p>
                      <p className="mt-1 text-xs text-outline">{order.daoContext}</p>
                    </td>
                    <td className="px-4 py-4">
                      <MarketplaceBadge value={order.status} />
                      {order.governanceReviewRequired && <p className="mt-2 text-xs text-outline">Governance review required</p>}
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-outline">{order.licenseIssued}</td>
                    <td className="px-4 py-4 max-w-[220px] font-mono text-xs text-outline">{order.treasuryDestination}</td>
                    <td className="px-4 py-4">
                      <p className="font-mono font-semibold text-on-surface">{order.amount} {order.currency}</p>
                      <p className="mt-1 text-xs text-outline">{order.settlementMode}</p>
                    </td>
                    <td className="px-4 py-4">
                      <MarketplaceBadge value={preview.status} />
                      <p className="mt-2 font-mono text-xs text-outline">fee {preview.protocolFee} / royalty {preview.royaltyAmount} / net {preview.sellerNet}</p>
                      <p className="mt-1 text-xs text-outline">{preview.blockedReasons.join(', ') || 'mock clear, settlement disabled'}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
