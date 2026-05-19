import { useState } from 'react';
import { Gavel, ShoppingCart, X } from 'lucide-react';
import { AuctionService, MarketplaceContractAdapter } from '../services/boundaryAdapters';

export default function PurchasePreviewModal({ product, onClose }) {
  const [record, setRecord] = useState(null);
  const [bidAmount, setBidAmount] = useState(AuctionService.minimumBid(product) ?? product.pricing.amount);

  async function buyNow() {
    const result = await MarketplaceContractAdapter.buyNow(product);
    setRecord(result.purchase);
  }

  async function placeBid() {
    const result = await MarketplaceContractAdapter.placeBid(product, bidAmount);
    setRecord({
      id: `bid-${Date.now()}`,
      buyer: '0xAxoD...Mock',
      amount: result.amount,
      currency: product.pricing.currency,
      status: 'pending-governance-review',
      licenseIssued: 'pending-auction-settlement',
    });
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
      <section className="w-full max-w-xl rounded-lg border border-white/10 bg-surface-container-low shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Mock settlement</p>
            <h2 className="text-xl font-bold text-on-surface">{product.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg border border-white/10 p-2 text-outline hover:text-on-surface" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <p className="text-sm leading-6 text-outline">Preview only. No wallet signature, payment, contract write, bridge action, or treasury routing is executed.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={buyNow} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-on-primary">
              <ShoppingCart className="h-4 w-4" /> Buy now preview
            </button>
            <div className="flex gap-2">
              <input className="min-w-0 flex-1 rounded-lg border border-white/10 bg-surface px-3 py-2 text-on-surface" type="number" value={bidAmount} onChange={(event) => setBidAmount(Number(event.target.value))} />
              <button type="button" onClick={placeBid} disabled={!AuctionService.canBid(product)} className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-on-surface disabled:opacity-50">
                <Gavel className="h-4 w-4" /> Bid
              </button>
            </div>
          </div>
          {record && (
            <div className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              <p className="font-bold">Mock record: {record.status}</p>
              <p>{record.amount} {record.currency} | license {record.licenseIssued}</p>
              {record.signedUrlPreview && <p className="mt-2 break-all">Signed URL preview: {record.signedUrlPreview}</p>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
