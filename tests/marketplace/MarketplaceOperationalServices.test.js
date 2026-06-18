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
    expect(preview.purchaseLifecycle).toBe('preview-issued');
    expect(preview.billingLifecycle).toBe('invoice-preview');
    expect(preview.licenseLifecycle).toBe('issued');
    expect(preview.purchaseTimeline.length).toBeGreaterThan(0);
    expect(preview.protocolFeeBps).toBe(250);
    expect(preview.protocolFee).toBeGreaterThan(0);
    expect(preview.blockedReasons).toEqual(expect.arrayContaining(['governance-review-required']));
  });

  test('keeps restricted subscriptions blocked while exposing access lifecycle state', () => {
    const subscription = marketplaceMock.subscriptions.find((item) => item.status === 'restricted');
    const readiness = SubscriptionLifecycleService.getSubscriptionReadiness(subscription);

    expect(readiness.service).toBe('SubscriptionLifecycleService');
    expect(readiness.renewalEnabled).toBe(false);
    expect(readiness.pausePreviewEnabled).toBe(true);
    expect(readiness.cancellationPreviewEnabled).toBe(true);
    expect(readiness.subscriptionLifecycle).toBe('paused');
    expect(readiness.subscriptionTimeline.length).toBeGreaterThan(0);
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
    expect(readiness.targetRegistry).toBe('DAO plugin license registry');
    expect(readiness.escalationTarget).toBe('ACS Plugin Audit');
    expect(readiness.checklist.map((item) => item.label)).toEqual(
      expect.arrayContaining(['Metadata package', 'Seller standing', 'Treasury link', 'Product standing', 'Publish execution']),
    );
    expect(readiness.blockedReasons).toEqual(expect.arrayContaining(['seller-warning', 'seller-treasury-not-linked', 'product-restricted']));
  });

  test('summarizes billing, subscription, treasury, and publisher review queues', () => {
    const summary = getMarketplaceOperationalSummary();

    expect(summary.billingReviewRequired).toBeGreaterThan(0);
    expect(summary.subscriptionsReviewRequired).toBeGreaterThan(0);
    expect(summary.publisherBlocked).toBeGreaterThan(0);
    expect(summary.publisherReady).toBeGreaterThan(0);
    expect(summary.publisherChecklistItems).toBe(marketplaceMock.publisherQueue.length * 5);
    expect(summary.treasuryReviewRequired).toBeGreaterThan(0);
  });
});
