export type ListingRuntimeLifecycle =
  | 'active'
  | 'pending'
  | 'sold'
  | 'expired'
  | 'cancelled'
  | 'restricted'
  | 'settlement-pending';

export type ListingRuntimeType = 'fixed' | 'english-auction' | 'dutch-auction' | 'reserve-listing' | 'license-preview';

export type BidRuntimeLifecycle =
  | 'initialized'
  | 'preview-issued'
  | 'eligible'
  | 'under-minimum'
  | 'restricted'
  | 'expired'
  | 'cancelled'
  | 'settlement-pending';

interface ListingProductLike {
  id: string;
  listingType?: string;
  status?: string;
  lifecycleStatus?: string;
  governanceStatus?: string;
  validationStatus?: string;
  purchaseLifecycle?: string;
  auction?: {
    status?: string;
    reservePrice?: number;
    highestBid?: number;
    bidCount?: number;
    endsAt?: string;
    type?: string;
  };
  pricing?: {
    amount?: number;
    currency?: string;
    settlementMode?: string;
  };
}

export function getListingRuntimeState(product: ListingProductLike, now: Date = new Date()) {
  const lifecycle = resolveListingLifecycle(product, now);
  const listingType = normalizeListingType(product.listingType);
  const isAuction = ['english-auction', 'dutch-auction', 'reserve-listing'].includes(listingType);

  return {
    service: 'ListingRuntimeService',
    mode: 'mock-only',
    productId: product.id,
    lifecycle,
    listingType,
    bidLifecycle: getDefaultBidLifecycle(product, lifecycle),
    isAuction,
    fixedPrice: listingType === 'fixed' ? product.pricing?.amount ?? null : null,
    reservePrice: product.auction?.reservePrice ?? null,
    highestBid: product.auction?.highestBid ?? null,
    bidCount: product.auction?.bidCount ?? 0,
    endsAt: product.auction?.endsAt ?? null,
    currency: product.pricing?.currency ?? 'USDC',
    settlementMode: product.pricing?.settlementMode ?? 'mock-only',
    settlementEnabled: false,
    contractWriteEnabled: false,
    reasonCodes: getListingReasonCodes(product, lifecycle),
    disclaimer: 'Listing runtime is prepared for NFT marketplace flows. No settlement or contract write is enabled.',
  };
}

export function getBidRuntimePreview(product: ListingProductLike, amount?: number) {
  const listingRuntime = getListingRuntimeState(product);
  const minimumBid = getMinimumBid(product);
  const numericAmount = Number(amount ?? minimumBid ?? 0);
  const lifecycle = resolveBidLifecycle({
    listingLifecycle: listingRuntime.lifecycle,
    listingType: listingRuntime.listingType,
    amount: numericAmount,
    minimumBid,
  });

  return {
    service: 'BidRuntimeService',
    mode: 'mock-only',
    productId: product.id,
    lifecycle,
    amount: numericAmount,
    minimumBid,
    bidEligible: lifecycle === 'eligible' || lifecycle === 'preview-issued',
    settlementEnabled: false,
    contractWriteEnabled: false,
    walletTransactionEnabled: false,
    reasonCodes: [
      listingRuntime.isAuction ? null : 'not-auction-listing',
      minimumBid === null || numericAmount >= minimumBid ? null : 'bid-under-minimum',
      listingRuntime.lifecycle === 'restricted' ? 'listing-restricted' : null,
      listingRuntime.lifecycle === 'expired' ? 'listing-expired' : null,
      'preview-only',
      'no-bid-placement',
      'no-contract-write',
    ].filter(Boolean) as string[],
  };
}

function resolveListingLifecycle(product: ListingProductLike, now: Date): ListingRuntimeLifecycle {
  if (product.governanceStatus === 'restricted' || product.validationStatus === 'restricted' || product.lifecycleStatus === 'restricted') return 'restricted';
  if (product.status === 'sold' || product.purchaseLifecycle === 'completed-mock') return 'sold';
  if (product.status === 'cancelled') return 'cancelled';
  if (product.purchaseLifecycle === 'validating') return 'settlement-pending';
  if (product.auction?.endsAt && new Date(product.auction.endsAt).getTime() < now.getTime()) return 'expired';
  if (['pending-validation', 'draft'].includes(product.lifecycleStatus ?? '') || ['under-review', 'submitted'].includes(product.governanceStatus ?? '')) return 'pending';
  return 'active';
}

function normalizeListingType(listingType?: string): ListingRuntimeType {
  if (listingType === 'english-auction' || listingType === 'dutch-auction' || listingType === 'fixed' || listingType === 'license-preview') return listingType;
  if (listingType === 'reserve') return 'reserve-listing';
  return 'fixed';
}

function getDefaultBidLifecycle(product: ListingProductLike, lifecycle: ListingRuntimeLifecycle): BidRuntimeLifecycle {
  if (lifecycle === 'restricted') return 'restricted';
  if (lifecycle === 'expired') return 'expired';
  if (lifecycle === 'cancelled') return 'cancelled';
  if (lifecycle === 'settlement-pending') return 'settlement-pending';
  if (product.auction) return lifecycle === 'active' ? 'preview-issued' : 'initialized';
  return 'initialized';
}

function resolveBidLifecycle({
  listingLifecycle,
  listingType,
  amount,
  minimumBid,
}: {
  listingLifecycle: ListingRuntimeLifecycle;
  listingType: ListingRuntimeType;
  amount: number;
  minimumBid: number | null;
}): BidRuntimeLifecycle {
  if (listingLifecycle === 'restricted') return 'restricted';
  if (listingLifecycle === 'expired') return 'expired';
  if (listingLifecycle === 'cancelled') return 'cancelled';
  if (listingLifecycle === 'settlement-pending') return 'settlement-pending';
  if (!['english-auction', 'dutch-auction', 'reserve-listing'].includes(listingType)) return 'initialized';
  if (minimumBid !== null && amount < minimumBid) return 'under-minimum';
  return 'eligible';
}

function getMinimumBid(product: ListingProductLike) {
  if (!product.auction) return null;
  return Math.max(product.auction.reservePrice ?? 0, (product.auction.highestBid ?? 0) + 1);
}

function getListingReasonCodes(product: ListingProductLike, lifecycle: ListingRuntimeLifecycle) {
  return [
    lifecycle === 'restricted' ? 'governance-restricted-asset' : null,
    lifecycle === 'pending' ? 'governance-validation-pending' : null,
    lifecycle === 'expired' ? 'auction-expired' : null,
    product.listingType ? null : 'listing-type-defaulted',
    'preview-only',
    'no-settlement',
    'no-contract-write',
  ].filter(Boolean) as string[];
}
