import { portfolioRegistryService } from '../portfolioRegistryService';
import type { PortfolioRegistrySnapshot } from './businessPortfolioContract';
import { businessPortfolioConsumerContract } from './businessPortfolioContract';

export type BusinessPortfolioContractCheckName =
  | 'contract-boundary-guarantees'
  | 'read-only'
  | 'execution-disabled'
  | 'production-disabled'
  | 'authority-disabled';

export type BusinessPortfolioContractValidationCheck = Readonly<{
  name: BusinessPortfolioContractCheckName;
  passed: boolean;
  detail: string;
}>;

export type BusinessPortfolioContractValidationResult = Readonly<{
  valid: boolean;
  checks: readonly BusinessPortfolioContractValidationCheck[];
}>;

const everyRecordReadOnly = (snapshot: PortfolioRegistrySnapshot) => (
  snapshot.isReadOnly
  && snapshot.summary.isReadOnly
  && snapshot.source.isReadOnly
  && snapshot.nuclei.every((nucleus) => nucleus.isReadOnly && nucleus.source.isReadOnly && nucleus.authority.isReadOnly)
  && snapshot.blockers.every((blocker) => blocker.isReadOnly && blocker.source.isReadOnly)
  && snapshot.opportunities.every((opportunity) => opportunity.isReadOnly && opportunity.source.isReadOnly)
  && snapshot.dependencies.every((dependency) => dependency.isReadOnly && dependency.source.isReadOnly)
  && snapshot.ownership.every((ownership) => ownership.isReadOnly && ownership.source.isReadOnly)
  && snapshot.executionAuthority.every((authority) => authority.isReadOnly && authority.source.isReadOnly)
);

const everyExecutionDisabled = (snapshot: PortfolioRegistrySnapshot) => (
  snapshot.executionAuthorized === false
  && snapshot.summary.executionAuthorized === false
  && snapshot.nuclei.every((nucleus) => nucleus.executionAuthorized === false && nucleus.authority.executionAuthorized === false)
  && snapshot.opportunities.every((opportunity) => opportunity.executionAuthorized === false)
  && snapshot.dependencies.every((dependency) => dependency.executionAuthorized === false)
  && snapshot.executionAuthority.every((authority) => authority.executionAuthorized === false)
);

const everyProductionDisabled = (snapshot: PortfolioRegistrySnapshot) => (
  snapshot.productionReady === false
  && snapshot.summary.productionReady === false
  && snapshot.nuclei.every((nucleus) => nucleus.productionReady === false && nucleus.authority.productionReady === false)
  && snapshot.opportunities.every((opportunity) => opportunity.productionReady === false)
  && snapshot.dependencies.every((dependency) => dependency.productionReady === false)
  && snapshot.executionAuthority.every((authority) => authority.productionReady === false && authority.productionAuthority === false)
);

const everyAuthorityDisabled = (snapshot: PortfolioRegistrySnapshot) => (
  snapshot.mutationEnabled === false
  && snapshot.summary.mutationEnabled === false
  && snapshot.nuclei.every((nucleus) => nucleus.mutationEnabled === false && nucleus.authority.mutationEnabled === false)
  && snapshot.executionAuthority.every((authority) => authority.mutationEnabled === false)
);

export function validateBusinessPortfolioConsumerContract(
  snapshot: PortfolioRegistrySnapshot = portfolioRegistryService.getPortfolioSnapshot(),
): BusinessPortfolioContractValidationResult {
  const guarantees = businessPortfolioConsumerContract.boundaryGuarantees;
  const checks: BusinessPortfolioContractValidationCheck[] = [
    {
      name: 'contract-boundary-guarantees',
      passed: guarantees.readOnly
        && guarantees.executionDisabled
        && guarantees.productionDisabled
        && guarantees.authorityDisabled
        && guarantees.mutationDisabled
        && guarantees.runtimeSyncDisabled
        && guarantees.apiIntegrationDisabled,
      detail: 'The Business-to-AxodusAPP contract declares read-only, no-runtime, no-API and no-authority guarantees.',
    },
    {
      name: 'read-only',
      passed: everyRecordReadOnly(snapshot),
      detail: 'Portfolio snapshot, source records and read models must remain read-only.',
    },
    {
      name: 'execution-disabled',
      passed: everyExecutionDisabled(snapshot),
      detail: 'Portfolio snapshot, nuclei, opportunities, dependencies and authority records must not grant execution.',
    },
    {
      name: 'production-disabled',
      passed: everyProductionDisabled(snapshot),
      detail: 'Portfolio snapshot, nuclei, opportunities, dependencies and authority records must not claim production readiness.',
    },
    {
      name: 'authority-disabled',
      passed: everyAuthorityDisabled(snapshot),
      detail: 'Portfolio snapshot and authority records must not enable mutation or operational authority.',
    },
  ];

  return {
    valid: checks.every((check) => check.passed),
    checks,
  };
}

export function assertBusinessPortfolioConsumerContract(
  snapshot: PortfolioRegistrySnapshot = portfolioRegistryService.getPortfolioSnapshot(),
): PortfolioRegistrySnapshot {
  const result = validateBusinessPortfolioConsumerContract(snapshot);
  if (!result.valid) {
    const failedChecks = result.checks
      .filter((check) => !check.passed)
      .map((check) => check.name)
      .join(', ');
    throw new Error(`Business portfolio consumer contract validation failed: ${failedChecks}`);
  }
  return snapshot;
}
