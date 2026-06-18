import { describe, expect, test } from 'vitest';
import {
  assertBusinessPortfolioConsumerContract,
  businessPortfolioConsumerContract,
  businessPortfolioRefreshPolicy,
  portfolioRegistryService,
  validateBusinessPortfolioConsumerContract,
  type PortfolioRegistrySnapshot,
} from '../../src/features/portfolio';

function getCheck(name: ReturnType<typeof validateBusinessPortfolioConsumerContract>['checks'][number]['name']) {
  const result = validateBusinessPortfolioConsumerContract(portfolioRegistryService.getPortfolioSnapshot());
  return result.checks.find((check) => check.name === name);
}

describe('Business to AxodusAPP portfolio consumer contract', () => {
  test('contract validation passes for the current registry snapshot', () => {
    const snapshot = portfolioRegistryService.getPortfolioSnapshot();
    const result = validateBusinessPortfolioConsumerContract(snapshot);

    expect(result.valid).toBe(true);
    expect(result.checks.every((check) => check.passed)).toBe(true);
    expect(assertBusinessPortfolioConsumerContract(snapshot)).toBe(snapshot);
  });

  test('read-only flags pass for contract and snapshot records', () => {
    const check = getCheck('read-only');

    expect(check?.passed).toBe(true);
    expect(businessPortfolioConsumerContract.boundaryGuarantees.readOnly).toBe(true);
    expect(businessPortfolioConsumerContract.boundaryGuarantees.mutationDisabled).toBe(true);
  });

  test('execution disabled flags pass and unsafe execution fails validation', () => {
    const snapshot = portfolioRegistryService.getPortfolioSnapshot();
    const unsafeSnapshot = { ...snapshot, executionAuthorized: true } as unknown as PortfolioRegistrySnapshot;

    expect(getCheck('execution-disabled')?.passed).toBe(true);
    expect(businessPortfolioConsumerContract.boundaryGuarantees.executionDisabled).toBe(true);
    expect(validateBusinessPortfolioConsumerContract(unsafeSnapshot).valid).toBe(false);
  });

  test('production disabled flags pass and unsafe production readiness fails validation', () => {
    const snapshot = portfolioRegistryService.getPortfolioSnapshot();
    const unsafeSnapshot = { ...snapshot, productionReady: true } as unknown as PortfolioRegistrySnapshot;

    expect(getCheck('production-disabled')?.passed).toBe(true);
    expect(businessPortfolioConsumerContract.boundaryGuarantees.productionDisabled).toBe(true);
    expect(validateBusinessPortfolioConsumerContract(unsafeSnapshot).valid).toBe(false);
  });

  test('authority disabled and refresh policy remain non-runtime', () => {
    expect(getCheck('authority-disabled')?.passed).toBe(true);
    expect(businessPortfolioConsumerContract.boundaryGuarantees.authorityDisabled).toBe(true);
    expect(businessPortfolioRefreshPolicy.mode).toBe('manual-snapshot-refresh');
    expect(businessPortfolioRefreshPolicy.runtimePollingEnabled).toBe(false);
    expect(businessPortfolioRefreshPolicy.apiIntegrationEnabled).toBe(false);
    expect(businessPortfolioRefreshPolicy.productionCredentialUseEnabled).toBe(false);
  });
});
