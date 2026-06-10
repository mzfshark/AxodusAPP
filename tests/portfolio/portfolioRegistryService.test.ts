import { describe, expect, test } from 'vitest';
import {
  assertNoExecutionAuthority,
  assertNoProductionReadiness,
  assertPortfolioReadOnly,
  forbiddenPortfolioMutationMethods,
  localPortfolioSourceAdapter,
  PortfolioRegistryService,
  portfolioRegistryService,
  type PortfolioRegistrySnapshot,
} from '../../src/features/portfolio';

describe('Portfolio registry consumer layer', () => {
  test('service returns a local read-only portfolio snapshot', () => {
    const snapshot = portfolioRegistryService.getPortfolioSnapshot();

    expect(snapshot.snapshotId).toBe('axodus-portfolio-registry-2026-06-10');
    expect(snapshot.source.kind).toBe('local-static-fixture');
    expect(snapshot.source.sourceVersioning).toBe('local-unversioned');
    expect(snapshot.isReadOnly).toBe(true);
    expect(snapshot.summary.nucleiCount).toBe(14);
    expect(snapshot.nuclei).toHaveLength(14);
  });

  test('all required nuclei are present with L-level and D-level data', () => {
    const nuclei = portfolioRegistryService.getNuclei();

    expect(nuclei.map((nucleus) => nucleus.nucleus)).toEqual(expect.arrayContaining([
      'Core',
      'Governance',
      'Documentation',
      'Dex',
      'Defi',
      'AxodusAPP',
      'Business',
      'Marketplace',
      'Academy',
      'Mining',
      'ACS',
      'Trading',
      'BBA-Agency',
      'Lottery',
    ]));
    expect(nuclei.every((nucleus) => nucleus.lLevel && nucleus.dLevel)).toBe(true);
  });

  test('Business and AxodusAPP maturity states match the portfolio handoff', () => {
    const business = portfolioRegistryService.getNucleusById('Business');
    const app = portfolioRegistryService.getNucleusById('AxodusAPP');

    expect(business).toMatchObject({
      nucleus: 'Business',
      lLevel: 'L4 Consolidated',
      dLevel: 'D2',
      isReadOnly: true,
      executionAuthorized: false,
      productionReady: false,
    });
    expect(app).toMatchObject({
      nucleus: 'AxodusAPP',
      lLevel: 'L4 Readiness',
      dLevel: 'D3',
      isReadOnly: true,
      executionAuthorized: false,
      productionReady: false,
    });
  });

  test('opportunity, dependency, blocked action and conflict counts are represented', () => {
    const snapshot = portfolioRegistryService.getPortfolioSnapshot();

    expect(snapshot.summary.officialOpportunityCount).toBe(25);
    expect(snapshot.summary.officialDependencyCount).toBe(58);
    expect(snapshot.summary.blockedActionCount).toBe(26);
    expect(snapshot.summary.boundaryConflictCount).toBe(14);
    expect(snapshot.opportunities).toHaveLength(25);
    expect(snapshot.dependencies.length).toBeGreaterThan(0);
    expect(snapshot.blockers.length).toBeGreaterThan(0);
  });

  test('execution, production and mutation boundaries are disabled', () => {
    const snapshot = portfolioRegistryService.getPortfolioSnapshot();

    expect(snapshot.executionAuthorized).toBe(false);
    expect(snapshot.productionReady).toBe(false);
    expect(snapshot.mutationEnabled).toBe(false);
    expect(snapshot.summary.executionAuthorized).toBe(false);
    expect(snapshot.summary.productionReady).toBe(false);
    expect(snapshot.summary.mutationEnabled).toBe(false);
    expect(snapshot.nuclei.every((nucleus) => (
      nucleus.executionAuthorized === false
      && nucleus.productionReady === false
      && nucleus.mutationEnabled === false
      && nucleus.authority.executionAuthorized === false
      && nucleus.authority.productionReady === false
      && nucleus.authority.mutationEnabled === false
    ))).toBe(true);
  });

  test('forbidden mutation and execution methods do not exist', () => {
    const serviceMethods = Object.getOwnPropertyNames(PortfolioRegistryService.prototype);
    const adapterMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(localPortfolioSourceAdapter));

    expect(serviceMethods).toEqual(expect.arrayContaining([
      'getPortfolioSnapshot',
      'getNuclei',
      'getNucleusById',
      'getBlockers',
      'getOpportunities',
      'getDependencies',
      'getExecutionAuthority',
    ]));

    for (const forbiddenMethod of forbiddenPortfolioMutationMethods) {
      expect(serviceMethods).not.toContain(forbiddenMethod);
      expect(adapterMethods).not.toContain(forbiddenMethod);
      expect(portfolioRegistryService[forbiddenMethod as keyof typeof portfolioRegistryService]).toBeUndefined();
      expect(localPortfolioSourceAdapter[forbiddenMethod as keyof typeof localPortfolioSourceAdapter]).toBeUndefined();
    }
  });

  test('boundary guards pass for fixture data and fail closed for unsafe snapshots', () => {
    const snapshot = portfolioRegistryService.getPortfolioSnapshot();

    expect(assertPortfolioReadOnly(snapshot)).toBe(snapshot);
    expect(assertNoExecutionAuthority(snapshot)).toBe(snapshot);
    expect(assertNoProductionReadiness(snapshot)).toBe(snapshot);

    expect(() => assertPortfolioReadOnly({ ...snapshot, mutationEnabled: true } as unknown as PortfolioRegistrySnapshot)).toThrow(/read-only/i);
    expect(() => assertNoExecutionAuthority({ ...snapshot, executionAuthorized: true } as unknown as PortfolioRegistrySnapshot)).toThrow(/execution authority/i);
    expect(() => assertNoProductionReadiness({ ...snapshot, productionReady: true } as unknown as PortfolioRegistrySnapshot)).toThrow(/production readiness/i);
  });
});
