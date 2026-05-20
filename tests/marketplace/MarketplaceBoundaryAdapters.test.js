import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import {
  AuctionService,
  LayerZeroBridgeService,
  MarketplaceContractAdapter,
  RoyaltyService,
  StorageAccessService,
  getMarketplaceBoundaryReadiness,
} from '../../src/modules/marketplace/services/boundaryAdapters';

describe('Marketplace boundary adapters', () => {
  test('keeps NFT listing standards and listing types explicit for Phase 2 contracts', () => {
    expect(MarketplaceContractAdapter.getSupportedTokenStandards()).toEqual(['ERC721', 'ERC1155']);
    expect(MarketplaceContractAdapter.getSupportedListingTypes()).toEqual(['fixed', 'english-auction', 'dutch-auction']);

    const standards = marketplaceMock.products.map((product) => product.tokenStandard);
    const listingTypes = marketplaceMock.products.map((product) => product.listingType);

    expect(standards).toEqual(expect.arrayContaining(['ERC721', 'ERC1155']));
    expect(listingTypes).toEqual(expect.arrayContaining(['fixed', 'english-auction', 'dutch-auction']));
  });

  test('returns mock-only execution boundaries with governance guardrails', () => {
    const restrictedProduct = marketplaceMock.products.find((product) => product.governanceStatus === 'restricted');
    const boundary = MarketplaceContractAdapter.getExecutionBoundary(restrictedProduct);

    expect(boundary.adapter).toBe('MarketplaceContractAdapter');
    expect(boundary.settlementEnabled).toBe(false);
    expect(boundary.guardrails).toEqual(expect.arrayContaining(['restricted-from-settlement']));
  });

  test('previews EIP-2981 royalties without treasury execution', () => {
    const eip2981Product = marketplaceMock.products.find((product) => product.royaltyModel.standard === 'EIP-2981');
    const preview = RoyaltyService.previewForProduct(eip2981Product);

    expect(preview.service).toBe('RoyaltyService');
    expect(preview.eip2981Ready).toBe(true);
    expect(preview.settlementEnabled).toBe(false);
    expect(preview.previewAmount).toBeGreaterThan(0);
  });

  test('exposes auction, storage, and bridge readiness as replaceable service boundaries', () => {
    const auctionProduct = marketplaceMock.products.find((product) => product.auction);
    const auctionState = AuctionService.getAuctionState(auctionProduct);
    const storageState = StorageAccessService.getAccessModel(auctionProduct);
    const bridgeState = LayerZeroBridgeService.getReadiness(auctionProduct);
    const readiness = getMarketplaceBoundaryReadiness().map((boundary) => boundary.label);

    expect(auctionState.service).toBe('AuctionService');
    expect(auctionState.bidEnabled).toBe(true);
    expect(storageState.service).toBe('StorageAccessService');
    expect(storageState.signedUrlPreviewAvailable).toBe(true);
    expect(bridgeState.service).toBe('LayerZeroBridgeService');
    expect(bridgeState.bridgeExecutionEnabled).toBe(false);
    expect(readiness).toEqual(
      expect.arrayContaining([
        'MarketplaceContractAdapter',
        'RoyaltyService',
        'AuctionService',
        'StorageAccessService',
        'LayerZeroBridgeService',
      ]),
    );
  });
});
