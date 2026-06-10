import { portfolioRegistryFixture } from './portfolioRegistry.fixture';
import type { PortfolioRegistrySnapshot } from './types';

function cloneReadonlySnapshot(snapshot: PortfolioRegistrySnapshot): PortfolioRegistrySnapshot {
  return structuredClone(snapshot);
}

export class LocalPortfolioSourceAdapter {
  readonly mode = 'local-static-fixture';

  getPortfolioSnapshot(): PortfolioRegistrySnapshot {
    return cloneReadonlySnapshot(portfolioRegistryFixture);
  }
}

export const localPortfolioSourceAdapter = new LocalPortfolioSourceAdapter();
