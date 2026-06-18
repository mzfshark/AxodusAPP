export const ProductLifecycle = {
  DRAFT: 'draft',
  PENDING_VALIDATION: 'pending-validation',
  APPROVED: 'approved',
  RESTRICTED: 'restricted',
  SUSPENDED: 'suspended',
  ARCHIVED: 'archived',
};

export const GovernanceValidationLifecycle = {
  NOT_SUBMITTED: 'not-submitted',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under-review',
  APPROVED: 'approved',
  WARNING: 'warning',
  RESTRICTED: 'restricted',
  REJECTED: 'rejected',
};

export const PurchaseLifecycle = {
  INITIALIZED: 'initialized',
  VALIDATING: 'validating',
  ELIGIBLE: 'eligible',
  PREVIEW_ISSUED: 'preview-issued',
  COMPLETED_MOCK: 'completed-mock',
  FAILED_MOCK: 'failed-mock',
  CANCELLED: 'cancelled',
};

export const LicenseLifecycle = {
  PREVIEW: 'preview',
  ISSUED: 'issued',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  SUSPENDED: 'suspended',
};

export const SubscriptionLifecycle = {
  NOT_SUBSCRIBED: 'not-subscribed',
  TRIAL_MOCK_PREVIEW: 'trial-mock-preview',
  ACTIVE: 'active',
  PAYMENT_PENDING: 'payment-pending',
  RENEWAL_DUE: 'renewal-due',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
};

export const BillingLifecycle = {
  ESTIMATE: 'estimate',
  INVOICE_PREVIEW: 'invoice-preview',
  PENDING_MOCK_PAYMENT: 'pending-mock-payment',
  PAID_MOCK: 'paid-mock',
  FAILED_MOCK: 'failed-mock',
  REFUNDED_MOCK: 'refunded-mock',
};

export const marketplaceLifecycleLabels = {
  [ProductLifecycle.DRAFT]: 'Draft',
  [ProductLifecycle.PENDING_VALIDATION]: 'Pending validation',
  [ProductLifecycle.APPROVED]: 'Approved',
  [ProductLifecycle.RESTRICTED]: 'Restricted',
  [ProductLifecycle.SUSPENDED]: 'Suspended',
  [ProductLifecycle.ARCHIVED]: 'Archived',
  [GovernanceValidationLifecycle.NOT_SUBMITTED]: 'Not submitted',
  [GovernanceValidationLifecycle.SUBMITTED]: 'Submitted',
  [GovernanceValidationLifecycle.UNDER_REVIEW]: 'Under review',
  [GovernanceValidationLifecycle.APPROVED]: 'Approved',
  [GovernanceValidationLifecycle.WARNING]: 'Warning',
  [GovernanceValidationLifecycle.RESTRICTED]: 'Restricted',
  [GovernanceValidationLifecycle.REJECTED]: 'Rejected',
  [PurchaseLifecycle.INITIALIZED]: 'Initialized',
  [PurchaseLifecycle.VALIDATING]: 'Validating',
  [PurchaseLifecycle.ELIGIBLE]: 'Eligible',
  [PurchaseLifecycle.PREVIEW_ISSUED]: 'Preview issued',
  [PurchaseLifecycle.COMPLETED_MOCK]: 'Completed mock',
  [PurchaseLifecycle.FAILED_MOCK]: 'Failed mock',
  [PurchaseLifecycle.CANCELLED]: 'Cancelled',
  [LicenseLifecycle.PREVIEW]: 'Preview',
  [LicenseLifecycle.ISSUED]: 'Issued',
  [LicenseLifecycle.ACTIVE]: 'Active',
  [LicenseLifecycle.EXPIRED]: 'Expired',
  [LicenseLifecycle.REVOKED]: 'Revoked',
  [LicenseLifecycle.SUSPENDED]: 'Suspended',
  [SubscriptionLifecycle.NOT_SUBSCRIBED]: 'Not subscribed',
  [SubscriptionLifecycle.TRIAL_MOCK_PREVIEW]: 'Trial/mock preview',
  [SubscriptionLifecycle.ACTIVE]: 'Active',
  [SubscriptionLifecycle.PAYMENT_PENDING]: 'Payment pending',
  [SubscriptionLifecycle.RENEWAL_DUE]: 'Renewal due',
  [SubscriptionLifecycle.PAUSED]: 'Paused',
  [SubscriptionLifecycle.CANCELLED]: 'Cancelled',
  [SubscriptionLifecycle.EXPIRED]: 'Expired',
  [BillingLifecycle.ESTIMATE]: 'Estimate',
  [BillingLifecycle.INVOICE_PREVIEW]: 'Invoice preview',
  [BillingLifecycle.PENDING_MOCK_PAYMENT]: 'Pending mock payment',
  [BillingLifecycle.PAID_MOCK]: 'Paid mock',
  [BillingLifecycle.FAILED_MOCK]: 'Failed mock',
  [BillingLifecycle.REFUNDED_MOCK]: 'Refunded mock',
};

export function buildLifecycleTimeline(steps, currentState) {
  const currentIndex = steps.findIndex((step) => step === currentState);
  return steps.map((step, index) => ({
    state: step,
    label: marketplaceLifecycleLabels[step] ?? step,
    position: index + 1,
    status: index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'upcoming',
  }));
}

export function getProductLifecycle(product) {
  if (product.lifecycleStatus) return product.lifecycleStatus;
  if (product.governanceStatus === 'restricted') return ProductLifecycle.RESTRICTED;
  if (product.governanceStatus === 'suspended') return ProductLifecycle.SUSPENDED;
  if (product.governanceStatus === 'under-review') return ProductLifecycle.PENDING_VALIDATION;
  if (product.status === 'listed') return ProductLifecycle.APPROVED;
  return ProductLifecycle.DRAFT;
}

export function getGovernanceLifecycle(product) {
  if (product.governanceLifecycle) return product.governanceLifecycle;
  if (product.governanceStatus === 'compliant') return GovernanceValidationLifecycle.APPROVED;
  if (product.governanceStatus === 'restricted') return GovernanceValidationLifecycle.RESTRICTED;
  if (product.governanceStatus === 'under-review') return GovernanceValidationLifecycle.UNDER_REVIEW;
  return GovernanceValidationLifecycle.NOT_SUBMITTED;
}

export function getPurchaseLifecycle(order) {
  if (order.purchaseLifecycle) return order.purchaseLifecycle;
  if (order.status === 'blocked') return PurchaseLifecycle.FAILED_MOCK;
  if (order.status === 'mock-issued') return PurchaseLifecycle.COMPLETED_MOCK;
  if (order.status === 'pending-validation') return PurchaseLifecycle.VALIDATING;
  return PurchaseLifecycle.PREVIEW_ISSUED;
}

export function getBillingLifecycle(record) {
  if (record.billingLifecycle) return record.billingLifecycle;
  if (record.status === 'blocked') return BillingLifecycle.FAILED_MOCK;
  if (record.status === 'mock-issued') return BillingLifecycle.PAID_MOCK;
  return BillingLifecycle.INVOICE_PREVIEW;
}

export function getSubscriptionLifecycle(subscription) {
  if (subscription.subscriptionLifecycle) return subscription.subscriptionLifecycle;
  if (subscription.status === 'restricted') return SubscriptionLifecycle.PAUSED;
  if (subscription.status === 'review-ready') return SubscriptionLifecycle.TRIAL_MOCK_PREVIEW;
  return SubscriptionLifecycle.NOT_SUBSCRIBED;
}

export function getLicenseLifecycle(recordOrLicense) {
  if (recordOrLicense?.licenseLifecycle) return recordOrLicense.licenseLifecycle;
  if (recordOrLicense?.status === 'blocked') return LicenseLifecycle.SUSPENDED;
  if (recordOrLicense?.licenseIssued && !String(recordOrLicense.licenseIssued).startsWith('pending')) return LicenseLifecycle.ISSUED;
  return LicenseLifecycle.PREVIEW;
}
