import { marketplaceMock } from '@/data/mock';

const normalize = (value) => String(value ?? '').toLowerCase();

export function getMarketplaceOverview() {
  return marketplaceMock;
}

export function getMarketplaceSeller(sellerId) {
  return marketplaceMock.sellers.find((seller) => seller.id === sellerId);
}

export function getMarketplaceProduct(slug) {
  return marketplaceMock.products.find((product) => product.slug === slug);
}

export function getMarketplaceProductById(productId) {
  return marketplaceMock.products.find((product) => product.id === productId);
}

export function getMarketplaceProductByItemRef(chain, contract, tokenId) {
  return marketplaceMock.products.find((product) => (
    product.supportedChains.some((supportedChain) => normalize(supportedChain) === normalize(chain)) &&
    normalize(product.contractAddress) === normalize(contract) &&
    normalize(product.tokenId) === normalize(tokenId)
  ));
}

export function getMarketplaceLicenseForProduct(product) {
  return marketplaceMock.licenses.find((license) => license.type === product?.licenseType) ?? marketplaceMock.licenses[0];
}

export function filterMarketplaceProducts(filters = {}) {
  return marketplaceMock.products.filter((product) => {
    const seller = getMarketplaceSeller(product.sellerId);
    const query = !filters.query || normalize(`${product.title} ${product.shortDescription} ${product.category} ${product.tags.join(' ')}`).includes(normalize(filters.query));
    const category = !filters.category || product.category === filters.category;
    const governance = !filters.governanceStatus || product.governanceStatus === filters.governanceStatus;
    const chain = !filters.chain || product.supportedChains.includes(filters.chain);
    const listing = !filters.listingType || product.listingType === filters.listingType;
    const risk = !filters.operationalRisk || product.operationalRisk === filters.operationalRisk;
    const acs = !filters.acsValidationState || product.acsValidationState === filters.acsValidationState;
    const reputation = !filters.minReputation || (seller?.reputation ?? 0) >= Number(filters.minReputation);
    return query && category && governance && chain && listing && risk && acs && reputation;
  });
}

export function getMarketplaceMetrics() {
  const products = marketplaceMock.products;
  return {
    activeListings: products.filter((product) => product.status === 'listed').length,
    nftBoundProducts: products.filter((product) => product.nftBound).length,
    pendingGovernance: products.filter((product) => product.governanceStatus === 'under-review').length,
    restrictedProducts: products.filter((product) => product.governanceStatus === 'restricted').length,
    highRiskProducts: products.filter((product) => product.operationalRisk === 'high').length,
    acsReviewProducts: products.filter((product) => product.acsValidationState !== 'validated').length,
    verifiedSellers: marketplaceMock.sellers.filter((seller) => seller.governanceStanding === 'verified').length,
    royaltyPreview: products.reduce((sum, product) => sum + product.royaltyModel.previewAmount, 0),
    treasuryDestinations: [...new Set(products.map((product) => product.treasuryDestination))].length,
    ordersPendingReview: marketplaceMock.orders.filter((order) => order.status !== 'mock-issued').length,
    subscriptionsRestricted: marketplaceMock.subscriptions.filter((subscription) => subscription.status === 'restricted').length,
    treasuryRoutesUnderReview: marketplaceMock.treasuryRoutes.filter((route) => route.status !== 'compliant').length,
    publisherTasksBlocked: marketplaceMock.publisherQueue.filter((task) => Boolean(task.blocker)).length,
    categories: products.reduce((acc, product) => ({ ...acc, [product.category]: (acc[product.category] ?? 0) + 1 }), {}),
  };
}

export function issueMockPurchase(product, buyer = '0xAxoD...Mock') {
  const license = getMarketplaceLicenseForProduct(product);
  const blocked = product.governanceStatus === 'restricted' || product.governanceStatus === 'suspended';
  return {
    id: `purchase-${product.id}-${Date.now()}`,
    buyer,
    productId: product.id,
    sellerId: product.sellerId,
    timestamp: new Date().toISOString(),
    amount: product.pricing.amount,
    currency: product.pricing.currency,
    licenseIssued: license.id,
    status: blocked ? 'blocked' : product.governanceRequired ? 'pending-governance-review' : 'mock-issued',
    governanceReviewRequired: product.governanceRequired,
    signedUrlPreview: product.signedUrlPreviewAvailable ? `https://greenfield.mock.axodus.local/access/${product.slug}?signature=preview` : null,
  };
}

export function createDraftListingPreview(input) {
  return {
    id: `draft-listing-${Date.now()}`,
    input,
    status: input.governanceReviewRequired ? 'requires-governance-review' : 'draft-created',
    contractAdapterAction: 'createListing',
    royaltyPreviewAmount: Number(((Number(input.price) * Number(input.royaltyBps)) / 10000).toFixed(4)),
    txPreview: `mock-tx:create-listing:${input.tokenStandard}:${input.listingType}:${input.chain}`,
  };
}
