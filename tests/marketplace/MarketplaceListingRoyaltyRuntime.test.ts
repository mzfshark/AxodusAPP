import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import { getBidRuntimePreview, getListingRuntimeState } from '../../src/modules/marketplace/services/listingRuntime';
import { getRoyaltyAccountingSummary, getRoyaltyRuntimePreview } from '../../src/modules/marketplace/services/royaltyRuntime';

describe('Marketplace listing and royalty runtime', () => {
  test('models fixed listing runtime without settlement', () => {
    const product = marketplaceMock.products.find((item) => item.listingType === 'fixed')!;
    const listing = getListingRuntimeState(product);

    expect(listing.lifecycle).toBe('active');
    expect(listing.listingType).toBe('fixed');
    expect(listing.settlementEnabled).toBe(false);
    expect(listing.contractWriteEnabled).toBe(false);
    expect(listing.reasonCodes).toEqual(expect.arrayContaining(['no-settlement', 'no-contract-write']));
  });

  test('models auction and bid lifecycle previews', () => {
    const product = marketplaceMock.products.find((item) => item.auction)!;
    const listing = getListingRuntimeState(product, new Date('2026-05-20T12:00:00.000Z'));
    const bid = getBidRuntimePreview(product, 100);

    expect(listing.listingType).toBe('english-auction');
    expect(listing.lifecycle).toBe('pending');
    expect(listing.settlementEnabled).toBe(false);
    expect(bid.lifecycle).toBe('eligible');
    expect(bid.walletTransactionEnabled).toBe(false);
    expect(bid.reasonCodes).toEqual(expect.arrayContaining(['preview-only', 'no-bid-placement']));
  });

  test('blocks restricted listing runtime before settlement readiness', () => {
    const product = marketplaceMock.products.find((item) => item.governanceStatus === 'restricted')!;
    const listing = getListingRuntimeState(product);
    const bid = getBidRuntimePreview(product, 250);

    expect(listing.lifecycle).toBe('restricted');
    expect(listing.reasonCodes).toEqual(expect.arrayContaining(['governance-restricted-asset']));
    expect(bid.lifecycle).toBe('restricted');
  });

  test('prepares EIP-2981 royalty accounting previews without settlement', () => {
    const product = marketplaceMock.products.find((item) => item.royaltyModel.standard === 'EIP-2981')!;
    const preview = getRoyaltyRuntimePreview(product);
    const summary = getRoyaltyAccountingSummary(marketplaceMock.products);

    expect(preview.eip2981ReadPrepared).toBe(true);
    expect(preview.eip2981ReadEnabled).toBe(false);
    expect(preview.royaltySettlementEnabled).toBe(false);
    expect(preview.creatorSplitPreview.amount).toBeGreaterThan(0);
    expect(summary.eip2981PreparedCount).toBeGreaterThan(0);
    expect(summary.royaltySettlementEnabled).toBe(false);
  });
});
