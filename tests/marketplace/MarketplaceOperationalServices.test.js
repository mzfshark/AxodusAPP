import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import {
  BillingPreviewService,
  PublisherReadinessService,
  SubscriptionLifecycleService,
  getMarketplaceOperationalSummary,
} from '../../src/modules/marketplace/services/operationalServices';

describe('Marketplace operational services', () => {
  test('previews order settlement without enabling payment execution', () => {
    const order = marketplaceMock.orders.find((item) => item.status === 'review-queued');
    const preview = BillingPreviewService.getOrderSettlementPreview(order);

    expect(preview.service).toBe('BillingPreviewService');
    expect(preview.settlementEnabled).toBe(false);
    expect(preview.protocolFeeBps).toBe(250);
    expect(preview.protocolFee).toBeGreaterThan(0);
    expect(preview.blockedReasons).toEqual(expect.arrayContaining(['governance-review-required']));
  });

  test('keeps restricted subscriptions blocked while exposing access lifecycle state', () => {
    const subscription = marketplaceMock.subscriptions.find((item) => item.status === 'restricted');
    const readiness = SubscriptionLifecycleService.getSubscriptionReadiness(subscription);

    expect(readiness.service).toBe('SubscriptionLifecycleService');
    expect(readiness.renewalEnabled).toBe(false);
    expect(readiness.revocationPreviewEnabled).toBe(true);
    expect(readiness.status).toBe('review-required');
    expect(readiness.blockedReasons).toEqual(expect.arrayContaining(['subscription-restricted']));
  });

  test('publisher readiness blocks unverified sellers and missing treasury links', () => {
    const task = marketplaceMock.publisherQueue.find((item) => item.sellerId === 'seller-mcp-labs');
    const readiness = PublisherReadinessService.getTaskReadiness(task);

    expect(readiness.service).toBe('PublisherReadinessService');
    expect(readiness.publishEnabled).toBe(false);
    expect(readiness.mockReady).toBe(false);
    expect(readiness.blockedReasons).toEqual(expect.arrayContaining(['seller-warning', 'seller-treasury-not-linked']));
  });

  test('summarizes billing, subscription, treasury, and publisher review queues', () => {
    const summary = getMarketplaceOperationalSummary();

    expect(summary.billingReviewRequired).toBeGreaterThan(0);
    expect(summary.subscriptionsReviewRequired).toBeGreaterThan(0);
    expect(summary.publisherBlocked).toBeGreaterThan(0);
    expect(summary.treasuryReviewRequired).toBeGreaterThan(0);
  });
});
