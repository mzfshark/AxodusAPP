import { createMockMarketplaceRepositories, type MarketplaceRepositories } from '../repositories';
import { MarketplaceEntitlementSchema, type MarketplaceEntitlementDto } from '../schemas';
import { normalizeMarketplaceEntity } from '../utils/runtimeIds';

export interface MarketplaceEntitlementInput {
  owner: string;
  repositories?: MarketplaceRepositories;
}

export async function buildMarketplaceEntitlementReadModel({
  owner,
  repositories = createMockMarketplaceRepositories(),
}: MarketplaceEntitlementInput): Promise<MarketplaceEntitlementDto> {
  const [products, licenses, purchases, subscriptions, validations] = await Promise.all([
    repositories.products.list(),
    repositories.licenses.list(),
    repositories.purchases.list({ buyer: owner }),
    repositories.subscriptions.list({ holder: owner }),
    repositories.governanceValidations.list(),
  ]);

  const productById = new Map(products.map((product) => [product.id, product]));
  const licenseById = new Map(licenses.map((license) => [license.id, license]));
  const licenseByType = new Map(licenses.map((license) => [license.type, license]));

  const ownedProducts = purchases
    .filter((purchase) => !['blocked', 'failed-mock', 'cancelled'].includes(purchase.status))
    .map((purchase) => ({
      productId: purchase.productId,
      licenseId: licenseById.get(purchase.licenseIssued)?.id ?? purchase.licenseIssued ?? null,
      source: 'purchase-preview',
    }));

  const activeLicenses = purchases
    .filter((purchase) => ['issued', 'active', 'preview'].includes(purchase.licenseLifecycle ?? 'preview'))
    .map((purchase) => ({
      licenseId: licenseById.get(purchase.licenseIssued)?.id ?? purchase.licenseIssued,
      productId: purchase.productId,
      lifecycle: purchase.licenseLifecycle ?? 'preview',
    }));

  const subscriptionReadModels = subscriptions.map((subscription) => ({
    subscriptionId: subscription.id,
    productId: subscription.productId,
    lifecycle: subscription.subscriptionLifecycle,
    accessScope: subscription.accessScope,
  }));

  const entitlementProductIds = new Set([
    ...ownedProducts.map((item) => item.productId),
    ...subscriptionReadModels.map((item) => item.productId),
  ]);

  const governanceRestrictions = validations
    .filter((validation) => entitlementProductIds.has(validation.productId))
    .flatMap((validation) => validation.blockers.map((reason) => ({
      productId: validation.productId,
      reason,
      severity: validation.settlementAllowed ? 'warning' : 'restricted',
    })));

  const deliveryPermissions = [...entitlementProductIds]
    .map((productId) => {
      const product = productById.get(productId);
      if (!product) return null;
      const license = licenseByType.get(product.licenseType) ?? licenses[0];
      return {
        productId,
        deliveryType: product.deliveryType,
        permissions: license?.permissions ?? [],
        signedUrlPreviewAvailable: product.signedUrlPreviewAvailable,
      };
    })
    .filter(Boolean);

  const nftOwnershipReadiness = [...entitlementProductIds]
    .map((productId) => {
      const product = productById.get(productId);
      if (!product) return null;
      return {
        productId,
        tokenStandard: product.tokenStandard,
        contractAddress: product.contractAddress ?? null,
        tokenId: product.tokenId ?? null,
        ownershipValidationEnabled: false as const,
      };
    })
    .filter(Boolean);

  return MarketplaceEntitlementSchema.parse(normalizeMarketplaceEntity('entitlement', {
    id: `entitlement-${owner}`,
    owner,
    ownedProducts,
    activeLicenses,
    subscriptions: subscriptionReadModels,
    governanceRestrictions,
    deliveryPermissions,
    nftOwnershipReadiness,
  }, `entitlement-${owner}`));
}
