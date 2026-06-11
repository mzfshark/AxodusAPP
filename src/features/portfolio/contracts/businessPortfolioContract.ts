import type {
  ExecutionAuthoritySummary,
  NucleusId,
  PortfolioDependency,
  PortfolioNucleusSummary,
  PortfolioOpportunity,
  PortfolioRegistrySnapshot as PortfolioRegistrySnapshotModel,
} from '../types';

export type PortfolioRegistrySnapshot = PortfolioRegistrySnapshotModel;
export type PortfolioNucleusRecord = PortfolioNucleusSummary;
export type PortfolioOpportunityRecord = PortfolioOpportunity;
export type PortfolioDependencyRecord = PortfolioDependency;
export type PortfolioAuthorityRecord = ExecutionAuthoritySummary;

export type PortfolioContractParticipant = Readonly<{
  nucleus: NucleusId;
  role: string;
  responsibilities: readonly string[];
}>;

export type BusinessPortfolioBoundaryGuarantees = Readonly<{
  readOnly: true;
  executionDisabled: true;
  productionDisabled: true;
  authorityDisabled: true;
  mutationDisabled: true;
  runtimeSyncDisabled: true;
  apiIntegrationDisabled: true;
}>;

export type BusinessPortfolioConsumerContract = Readonly<{
  id: 'BUSINESS_AXODUSAPP_PORTFOLIO_CONSUMER_CONTRACT';
  version: '2026-06-10';
  status: 'READ_ONLY_CONTRACT';
  owner: 'Business';
  consumer: 'AxodusAPP';
  producer: PortfolioContractParticipant;
  consumerResponsibilities: PortfolioContractParticipant;
  readModels: readonly [
    'PortfolioRegistrySnapshot',
    'PortfolioNucleusRecord',
    'PortfolioOpportunityRecord',
    'PortfolioDependencyRecord',
    'PortfolioAuthorityRecord',
  ];
  dataDomains: readonly string[];
  refreshModel: 'manual-snapshot-refresh';
  boundaryGuarantees: BusinessPortfolioBoundaryGuarantees;
}>;

export const businessPortfolioConsumerContract = {
  id: 'BUSINESS_AXODUSAPP_PORTFOLIO_CONSUMER_CONTRACT',
  version: '2026-06-10',
  status: 'READ_ONLY_CONTRACT',
  owner: 'Business',
  consumer: 'AxodusAPP',
  producer: {
    nucleus: 'Business',
    role: 'portfolio-intelligence-producer',
    responsibilities: [
      'Maintain portfolio intelligence source material.',
      'Define official portfolio read models for consumer use.',
      'Preserve non-executive portfolio coordination boundaries.',
      'Escalate execution-sensitive gaps to Governance, Treasury, or owning nuclei.',
    ],
  },
  consumerResponsibilities: {
    nucleus: 'AxodusAPP',
    role: 'read-only-portfolio-consumer',
    responsibilities: [
      'Render portfolio intelligence through read-only product surfaces.',
      'Consume the Portfolio Registry Consumer Layer instead of raw fixtures.',
      'Preserve execution-disabled and production-disabled portfolio boundaries.',
      'Avoid API, polling, wallet, transaction, approval, or mutation behavior.',
    ],
  },
  readModels: [
    'PortfolioRegistrySnapshot',
    'PortfolioNucleusRecord',
    'PortfolioOpportunityRecord',
    'PortfolioDependencyRecord',
    'PortfolioAuthorityRecord',
  ],
  dataDomains: [
    'nuclei',
    'maturity',
    'development-maturity',
    'ownership',
    'opportunities',
    'dependencies',
    'blockers',
    'authority',
    'boundaries',
  ],
  refreshModel: 'manual-snapshot-refresh',
  boundaryGuarantees: {
    readOnly: true,
    executionDisabled: true,
    productionDisabled: true,
    authorityDisabled: true,
    mutationDisabled: true,
    runtimeSyncDisabled: true,
    apiIntegrationDisabled: true,
  },
} as const satisfies BusinessPortfolioConsumerContract;
