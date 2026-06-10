import type { PortfolioRegistrySnapshot } from './types';

export function assertPortfolioReadOnly(snapshot: PortfolioRegistrySnapshot): PortfolioRegistrySnapshot {
  const hasMutableNucleus = snapshot.nuclei.some((nucleus) => !nucleus.isReadOnly || nucleus.mutationEnabled);
  if (!snapshot.isReadOnly || snapshot.mutationEnabled || hasMutableNucleus) {
    throw new Error('Portfolio registry snapshot must remain read-only.');
  }
  return snapshot;
}

export function assertNoExecutionAuthority(snapshot: PortfolioRegistrySnapshot): PortfolioRegistrySnapshot {
  const hasExecutionAuthority = snapshot.executionAuthorized
    || snapshot.summary.executionAuthorized
    || snapshot.nuclei.some((nucleus) => nucleus.executionAuthorized || nucleus.authority.executionAuthorized);

  if (hasExecutionAuthority) {
    throw new Error('Portfolio registry snapshot must not grant execution authority.');
  }
  return snapshot;
}

export function assertNoProductionReadiness(snapshot: PortfolioRegistrySnapshot): PortfolioRegistrySnapshot {
  const hasProductionReadiness = snapshot.productionReady
    || snapshot.summary.productionReady
    || snapshot.nuclei.some((nucleus) => nucleus.productionReady || nucleus.authority.productionReady);

  if (hasProductionReadiness) {
    throw new Error('Portfolio registry snapshot must not claim production readiness.');
  }
  return snapshot;
}

export function assertPortfolioBoundaryGuards(snapshot: PortfolioRegistrySnapshot): PortfolioRegistrySnapshot {
  assertPortfolioReadOnly(snapshot);
  assertNoExecutionAuthority(snapshot);
  assertNoProductionReadiness(snapshot);
  return snapshot;
}
