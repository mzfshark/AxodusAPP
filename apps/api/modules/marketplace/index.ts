import { MarketplaceApiSchemas } from './contracts';

export const marketplaceApiModule = {
  id: 'marketplace',
  basePath: '/api/marketplace',
  executionMode: 'mock-contract-only',
  settlementEnabled: false,
  routes: MarketplaceApiSchemas,
  notes: [
    'Sprint 01 defines API contracts and validation schemas only.',
    'No production handlers, database writes, wallet transactions, treasury execution, or settlement are enabled.',
  ],
} as const;

export * from './contracts';
