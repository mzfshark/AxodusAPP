export type MarketplaceEntityKind =
  | 'product'
  | 'seller'
  | 'tenant'
  | 'license'
  | 'purchase'
  | 'subscription'
  | 'billing'
  | 'governance-validation'
  | 'auction'
  | 'bid'
  | 'entitlement';

export const MARKETPLACE_ENTITY_PREFIX = 'mkt';

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'unknown';
}

function cyrb128(value: string) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;

  for (let index = 0; index < value.length; index += 1) {
    const k = value.charCodeAt(index);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }

  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

  return [h1, h2, h3, h4].map((item) => (item >>> 0).toString(16).padStart(8, '0')).join('');
}

export function createDeterministicUuid(seed: string) {
  const hex = cyrb128(seed);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `5${hex.slice(13, 16)}`,
    `${((parseInt(hex.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hex.slice(18, 20)}`,
    hex.slice(20, 32),
  ].join('-');
}

export function createRuntimeUuid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return createDeterministicUuid(`${Date.now()}:${Math.random()}`);
}

export function createMarketplaceEntityRef(kind: MarketplaceEntityKind, sourceId: string) {
  return `${MARKETPLACE_ENTITY_PREFIX}:${kind}:${slugify(sourceId)}`;
}

export function createMarketplaceRuntimeId(kind: MarketplaceEntityKind, sourceId: string) {
  return createDeterministicUuid(createMarketplaceEntityRef(kind, sourceId));
}

export function createNewMarketplaceRuntimeId(kind: MarketplaceEntityKind) {
  return createDeterministicUuid(`${MARKETPLACE_ENTITY_PREFIX}:${kind}:runtime:${createRuntimeUuid()}`);
}

export function normalizeMarketplaceEntity<T extends Record<string, unknown>>(
  kind: MarketplaceEntityKind,
  entity: T,
  sourceId = String(entity.id ?? entity.slug ?? entity.name ?? createRuntimeUuid()),
) {
  return {
    ...entity,
    sourceId,
    entityRef: createMarketplaceEntityRef(kind, sourceId),
    runtimeId: typeof entity.runtimeId === 'string' ? entity.runtimeId : createMarketplaceRuntimeId(kind, sourceId),
  };
}
