import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceLifecycleRail from '../components/MarketplaceLifecycleRail';
import PurchasePreviewModal from '../components/PurchasePreviewModal';
import {
  AuctionService,
  LayerZeroBridgeService,
  MarketplaceContractAdapter,
  RoyaltyService,
  StorageAccessService,
} from '../services/boundaryAdapters';
import { getMarketplaceProduct, getMarketplaceProductContext } from '../services/marketplaceService';
import {
  GovernanceValidationLifecycle,
  ProductLifecycle,
  buildLifecycleTimeline,
  getGovernanceLifecycle,
  getProductLifecycle,
} from '../utils/stateMachines';

export default function MarketplaceProductDetail() {
  const { slug } = useParams();
  const product = getMarketplaceProduct(slug);
  const context = product ? getMarketplaceProductContext(product) : {};
  const seller = context.seller;
  const tenant = context.tenant;
  const executionBoundary = product ? MarketplaceContractAdapter.getExecutionBoundary(product) : null;
  const royaltyPreview = product ? RoyaltyService.previewForProduct(product) : null;
  const auctionState = product ? AuctionService.getAuctionState(product) : null;
  const storageAccess = product ? StorageAccessService.getAccessModel(product) : null;
  const bridgeReadiness = product ? LayerZeroBridgeService.getReadiness(product) : null;
  const productLifecycle = product ? getProductLifecycle(product) : null;
  const governanceLifecycle = product ? getGovernanceLifecycle(product) : null;
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
            <MarketplaceBadge value={productLifecycle} />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Info label="Price" value={`${product.pricing.amount} ${product.pricing.currency}`} />
            <Info label="Royalty" value={`${product.royaltyModel.bps / 100}% ${product.royaltyModel.standard}`} />
            <Info label="Delivery" value={product.deliveryType} />
            <Info label="Access" value={product.accessModel} />
            <Info label="DAO owner" value={product.daoOwner} />
            <Info label="Risk" value={product.operationalRisk} />
            <Info label="Contract" value={product.contractAddress ?? 'mock offchain'} />
            <Info label="Token ID" value={product.tokenId ?? 'not minted'} />
            <Info label="Lifecycle" value={productLifecycle} />
            <Info label="Validation" value={product.validationStatus} />
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
        <Panel title="Tenant / DAO owner">
          <p className="font-bold text-on-surface">{tenant?.name ?? product.daoOwner}</p>
          <p className="mt-2">Review authority: {tenant?.reviewAuthority ?? 'mock governance review'}</p>
          <p>Constitutional status: {tenant?.constitutionalStanding ?? product.constitutionalStanding}</p>
        </Panel>
        <Panel title="Treasury destination">
          <p className="font-mono">{product.treasuryDestination}</p>
          <p className="mt-2">Settlement mode: {product.pricing.settlementMode}</p>
          <p>Royalty recipient: {royaltyPreview.recipient}</p>
          <p>Royalty service: {royaltyPreview.standard} / {royaltyPreview.bps} bps</p>
        </Panel>
        <Panel title="ACS validation">
          <p>State: {product.acsValidationState}</p>
          <p>Operational risk: {product.operationalRisk}</p>
          <p>Execution type: {product.executionType}</p>
        </Panel>
        <Panel title="Contract adapter">
          <p>Adapter: {executionBoundary.adapter}</p>
          <p>Mode: {executionBoundary.mode}</p>
          <p>Settlement enabled: {executionBoundary.settlementEnabled ? 'yes' : 'no'}</p>
          <p>Guardrails: {executionBoundary.guardrails.join(', ')}</p>
        </Panel>
        <Panel title="Auction service">
          <p>Status: {auctionState.status}</p>
          <p>Bid enabled: {auctionState.bidEnabled ? 'yes' : 'no'}</p>
          <p>Minimum bid: {auctionState.minimumBid ?? 'not applicable'}</p>
          <p>Bridge or settlement execution: disabled</p>
        </Panel>
        <Panel title="Greenfield delivery">
          <p>Bucket: {storageAccess.greenfieldBucket ?? 'not required'}</p>
          <p>Delivery: {storageAccess.deliveryType}</p>
          <p>Signed URL preview: {storageAccess.signedUrlPreviewAvailable ? 'available after mock purchase' : 'not available'}</p>
        </Panel>
        <Panel title="LayerZero readiness">
          <p>Ready: {bridgeReadiness.ready ? 'yes' : 'no'}</p>
          <p>Source: {bridgeReadiness.sourceChain}</p>
          <p>Destinations: {bridgeReadiness.destinationChains.join(', ') || 'none'}</p>
          <p>Bridge execution: {bridgeReadiness.bridgeExecutionEnabled ? 'enabled' : 'disabled'}</p>
        </Panel>
      </section>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <MarketplaceLifecycleRail title="Product lifecycle" steps={buildLifecycleTimeline(Object.values(ProductLifecycle), productLifecycle)} />
        <MarketplaceLifecycleRail title="Governance validation lifecycle" steps={buildLifecycleTimeline(Object.values(GovernanceValidationLifecycle), governanceLifecycle)} />
      </section>
      <section className="rounded-lg border border-yellow-400/20 bg-yellow-500/10 p-4 text-sm text-yellow-100">
        Preview only. No settlement. No wallet transaction. No treasury execution. No contract write. Simulated license issuance only.
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
