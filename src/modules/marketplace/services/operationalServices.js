import { marketplaceMock } from '@/data/mock';
import { getMarketplaceProductById, getMarketplaceSeller } from './marketplaceService';
import { RoyaltyService, StorageAccessService } from './boundaryAdapters';
import {
  BillingLifecycle,
  LicenseLifecycle,
  PurchaseLifecycle,
  SubscriptionLifecycle,
  getBillingLifecycle,
  getLicenseLifecycle,
  getPurchaseLifecycle,
  getSubscriptionLifecycle,
  buildLifecycleTimeline,
} from '../utils/stateMachines';

const protocolFeeBps = 250;

function money(amount) {
  return Number(amount.toFixed(4));
}

export const BillingPreviewService = {
  getOrderSettlementPreview: (order) => {
    const product = getMarketplaceProductById(order.productId);
    const royalty = product ? RoyaltyService.previewForProduct(product) : null;
    const protocolFee = money((Number(order.amount) * protocolFeeBps) / 10000);
    const royaltyAmount = royalty ? royalty.previewAmount : 0;
    const sellerNet = money(Number(order.amount) - protocolFee - royaltyAmount);
    const blockedReasons = [
      order.status === 'blocked' ? 'order-blocked' : null,
      order.governanceReviewRequired ? 'governance-review-required' : null,
      product?.governanceStatus === 'restricted' ? 'product-restricted' : null,
      product?.acsValidationState !== 'validated' ? `acs-${product?.acsValidationState}` : null,
    ].filter(Boolean);

    return {
      service: 'BillingPreviewService',
      orderId: order.id,
      product,
      purchaseLifecycle: getPurchaseLifecycle(order),
      purchaseTimeline: buildLifecycleTimeline(Object.values(PurchaseLifecycle), getPurchaseLifecycle(order)),
      billingLifecycle: getBillingLifecycle(order),
      billingTimeline: buildLifecycleTimeline(Object.values(BillingLifecycle), getBillingLifecycle(order)),
      licenseLifecycle: getLicenseLifecycle(order),
      licenseTimeline: buildLifecycleTimeline(Object.values(LicenseLifecycle), getLicenseLifecycle(order)),
      settlementEnabled: false,
      settlementMode: order.settlementMode,
      amount: order.amount,
      currency: order.currency,
      protocolFeeBps,
      protocolFee,
      royaltyAmount,
      sellerNet,
      treasuryDestination: order.treasuryDestination,
      acceptedCurrencies: product?.acceptedCurrencies ?? [order.currency],
      status: blockedReasons.length ? 'review-required' : 'mock-clear',
      blockedReasons,
      disclaimer: 'Invoice preview only. No settlement, no wallet transaction, no treasury execution.',
    };
  },
  getTreasuryRoutePreview: (route) => ({
    service: 'BillingPreviewService',
    routeId: route.id,
    destination: route.destination,
    accountingHook: route.accountingHook,
    settlementEnabled: false,
    status: route.status === 'compliant' ? 'mock-clear' : 'review-required',
    blockedReasons: route.status === 'compliant' ? [] : [`treasury-${route.status}`],
  }),
};

export const SubscriptionLifecycleService = {
  getSubscriptionReadiness: (subscription) => {
    const product = getMarketplaceProductById(subscription.productId);
    const reviewDate = new Date(subscription.nextReviewAt);
    const daysToReview = Math.ceil((reviewDate.getTime() - Date.now()) / 86400000);
    const storage = product ? StorageAccessService.getAccessModel(product) : null;
    const blockedReasons = [
      subscription.status === 'restricted' ? 'subscription-restricted' : null,
      subscription.governanceStanding !== 'compliant' && subscription.governanceStanding !== 'verified' ? `governance-${subscription.governanceStanding}` : null,
      product?.governanceStatus === 'restricted' ? 'product-restricted' : null,
      product?.acsValidationState !== 'validated' ? `acs-${product?.acsValidationState}` : null,
    ].filter(Boolean);

    return {
      service: 'SubscriptionLifecycleService',
      subscriptionId: subscription.id,
      product,
      storage,
      subscriptionLifecycle: getSubscriptionLifecycle(subscription),
      subscriptionTimeline: buildLifecycleTimeline(Object.values(SubscriptionLifecycle), getSubscriptionLifecycle(subscription)),
      billingLifecycle: getBillingLifecycle(subscription),
      licenseLifecycle: getLicenseLifecycle(subscription),
      daysToReview,
      renewalEnabled: false,
      pausePreviewEnabled: true,
      cancellationPreviewEnabled: true,
      revocationPreviewEnabled: true,
      accessPreviewEnabled: Boolean(storage?.signedUrlPreviewAvailable && subscription.status !== 'restricted'),
      status: blockedReasons.length ? 'review-required' : 'mock-clear',
      blockedReasons,
      disclaimer: 'Subscription lifecycle preview only. No recurring billing execution.',
    };
  },
};

export const PublisherReadinessService = {
  getTaskReadiness: (task) => {
    const seller = getMarketplaceSeller(task.sellerId);
    const product = getMarketplaceProductById(task.productId);
    const blockedReasons = [
      task.blocker,
      product?.governanceStatus === 'restricted' ? 'product-restricted' : null,
      product?.acsValidationState !== 'validated' ? `acs-${product?.acsValidationState}` : null,
      seller?.governanceStanding !== 'verified' ? `seller-${seller?.governanceStanding}` : null,
      seller?.treasuryLinked ? null : 'seller-treasury-not-linked',
    ].filter(Boolean);
    const checklist = [
      {
        id: `${task.id}-metadata`,
        label: 'Metadata package',
        status: task.metadataState === 'ready' ? 'mock-clear' : 'pending-validation',
        detail: task.metadataState,
      },
      {
        id: `${task.id}-seller`,
        label: 'Seller standing',
        status: seller?.governanceStanding === 'verified' ? 'mock-clear' : 'review-required',
        detail: seller?.governanceStanding ?? 'unknown',
      },
      {
        id: `${task.id}-treasury`,
        label: 'Treasury link',
        status: seller?.treasuryLinked ? 'mock-clear' : 'review-required',
        detail: seller?.treasuryLinked ? 'linked' : 'not linked',
      },
      {
        id: `${task.id}-product`,
        label: 'Product standing',
        status: product?.governanceStatus === 'compliant' ? 'mock-clear' : 'review-required',
        detail: product?.governanceStatus ?? 'unknown',
      },
      {
        id: `${task.id}-execution`,
        label: 'Publish execution',
        status: 'deferred',
        detail: 'disabled in MVP',
      },
    ];

    return {
      service: 'PublisherReadinessService',
      taskId: task.id,
      seller,
      product,
      publishEnabled: false,
      mockReady: blockedReasons.length === 0,
      targetRegistry: task.targetRegistry,
      publishingScope: task.publishingScope,
      escalationTarget: task.escalationTarget,
      metadataState: task.metadataState,
      checklist,
      requiredReviews: task.requiredReviews.map((review) => ({
        id: `${task.id}-${review}`,
        label: review,
        status: task.blocker ? 'pending-validation' : 'review-ready',
      })),
      blockedReasons,
    };
  },
};

export function getMarketplaceOperationalSummary() {
  const orderPreviews = marketplaceMock.orders.map(BillingPreviewService.getOrderSettlementPreview);
  const subscriptionPreviews = marketplaceMock.subscriptions.map(SubscriptionLifecycleService.getSubscriptionReadiness);
  const publisherPreviews = marketplaceMock.publisherQueue.map(PublisherReadinessService.getTaskReadiness);
  const treasuryPreviews = marketplaceMock.treasuryRoutes.map(BillingPreviewService.getTreasuryRoutePreview);

  return {
    orderPreviews,
    subscriptionPreviews,
    publisherPreviews,
    treasuryPreviews,
    billingReviewRequired: orderPreviews.filter((preview) => preview.status === 'review-required').length,
    subscriptionsReviewRequired: subscriptionPreviews.filter((preview) => preview.status === 'review-required').length,
    publisherBlocked: publisherPreviews.filter((preview) => preview.blockedReasons.length > 0).length,
    publisherReady: publisherPreviews.filter((preview) => preview.mockReady).length,
    publisherChecklistItems: publisherPreviews.reduce((sum, preview) => sum + preview.checklist.length, 0),
    treasuryReviewRequired: treasuryPreviews.filter((preview) => preview.status === 'review-required').length,
  };
}
