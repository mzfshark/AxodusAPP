import { createDraftListingPreview, issueMockPurchase } from './marketplaceService';

export const reownWalletStateMock = {
  connected: true,
  address: '0xAxoD...Mock',
  chain: 'Polygon',
  networkMode: 'mock',
};

export const MarketplaceContractAdapter = {
  buyNow: async (product) => ({
    mode: 'mock-contract-call',
    action: 'buyNow',
    txPreview: `mock-tx:${product.id}:buy-now`,
    purchase: issueMockPurchase(product),
  }),
  placeBid: async (product, amount) => ({
    mode: 'mock-contract-call',
    action: 'placeBid',
    amount,
    txPreview: `mock-tx:${product.id}:bid:${amount}`,
  }),
  createDraftListing: async (input) => ({
    mode: 'mock-contract-call',
    action: 'createListing',
    preview: createDraftListingPreview(input),
  }),
};

export const AuctionService = {
  canBid: (product) => Boolean(product.auction && product.auction.status === 'active' && product.governanceStatus !== 'suspended'),
  minimumBid: (product) => (product.auction ? Math.max(product.auction.reservePrice, (product.auction.highestBid ?? 0) + 1) : null),
};
