import type {
  ExecutionAuthoritySummary,
  NucleusId,
  PortfolioRisk,
  PortfolioBlocker,
  PortfolioDependency,
  PortfolioNucleusSummary,
  PortfolioOpportunity,
  PortfolioRegistrySnapshot,
  PortfolioSource,
} from './types';

const source = Object.freeze({
  kind: 'local-static-fixture',
  source: '/opt/Axodus/.instructions portfolio registry artifacts',
  sourceUpdatedAt: '2026-06-10',
  sourceVersioning: 'local-unversioned',
  isReadOnly: true,
} satisfies PortfolioSource);

const nucleusRecords = [
  ['Core', 'BACKLOG', 'L5', 'D3', 'HIGH', 'LOW', 'READINESS_APPROVED', 'Consumer pilot and RC evidence incomplete.'],
  ['Governance', 'HOLD', 'L5', 'D3', 'HIGH', 'MEDIUM', 'READINESS_APPROVED', 'Executor, treasury and mutation paths remain gated.'],
  ['Documentation', 'RECOVER', 'L4 Readiness', 'D2', 'HIGH', 'MEDIUM', 'READINESS_APPROVED', 'Publication authority and root versioning unresolved.'],
  ['Dex', 'BACKLOG', 'L4 Readiness', 'D3', 'HIGH', 'MEDIUM', 'READINESS_READY', 'Swaps, routing execution, liquidity and treasury integrations blocked.'],
  ['Defi', 'ADVANCE', 'L4 Readiness', 'D2', 'MEDIUM', 'HIGH', 'READINESS_ASSESSED', 'Custody, staking and treasury movement not approved.'],
  ['AxodusAPP', 'ADVANCE', 'L4 Readiness', 'D3', 'MEDIUM', 'MEDIUM', 'READINESS_ASSESSED', 'Real backend integration pending; no wallet or transaction flow approved.'],
  ['Business', 'ADVANCE', 'L4 Consolidated', 'D2', 'HIGH', 'MEDIUM', 'READINESS_READY', 'Billing, treasury, governance execution, ACS provisioning and persistence execution blocked.'],
  ['Marketplace', 'ADVANCE', 'L4 Candidate', 'D2', 'HIGH', 'HIGH', 'READINESS_ASSESSED', 'Payment, settlement, minting, wallet and treasury authority unresolved.'],
  ['Academy', 'ADVANCE', 'L4 Candidate', 'D2', 'MEDIUM', 'HIGH', 'READINESS_ASSESSED', 'Rewards, contract deployment, minting and treasury movement blocked.'],
  ['Mining', 'ADVANCE', 'L4 Candidate', 'D2', 'MEDIUM', 'HIGH', 'READINESS_ASSESSED', 'Provider custody, payout and accounting warnings unresolved.'],
  ['ACS', 'HOLD', 'L4 Candidate', 'D2', 'HIGH', 'HIGH', 'READINESS_ASSESSED', 'Execution authority, credentials and autonomous runtime remain blocked.'],
  ['Trading', 'HOLD', 'L4 Candidate', 'D3', 'HIGH', 'HIGH', 'READINESS_ASSESSED', 'Credential vault and production execution gates unresolved.'],
  ['BBA-Agency', 'PAUSE / PORTFOLIO BALANCING', 'L3', 'D2', 'MEDIUM', 'MEDIUM', 'READINESS_ASSESSED', 'Dedicated schema mapping and production claim review remain open.'],
  ['Lottery', 'BACKLOG', 'L3', 'D2', 'MEDIUM', 'HIGH', 'READINESS_ASSESSED', 'Compliance, VRF/randomness, prize, payout, wallet and on-chain execution blocked.'],
] as const;

const authorityByNucleus = Object.fromEntries(nucleusRecords.map(([nucleus]) => [
  nucleus,
  {
    nucleus,
    governanceAuthority: nucleus === 'Governance' ? 'Can prepare/review governance packages; execution blocked.' : 'Review or display only under owner gates.',
    treasuryAuthority: 'No treasury movement authority.',
    executionAuthority: nucleus === 'Business' ? 'NON_EXECUTIVE' : nucleus === 'AxodusAPP' ? 'READ_ONLY_ONLY' : 'BLOCKED',
    productionAuthority: false,
    executionAuthorized: false,
    productionReady: false,
    mutationEnabled: false,
    source,
    isReadOnly: true,
  } satisfies ExecutionAuthoritySummary,
])) as Record<NucleusId, ExecutionAuthoritySummary>;

const opportunities: PortfolioOpportunity[] = ([
  ['OPP-001', 'Business Opportunity Registry', 'Business', 'LOW', '3 = Approved', 'NONE'],
  ['OPP-002', 'Business Product Catalog And Portfolio Registry', 'Business', 'LOW', '3 = Approved', 'NONE'],
  ['OPP-003', 'Portfolio Intelligence', 'Business', 'MEDIUM', '1 = Draft', 'LOW'],
  ['OPP-004', 'Governance.Country', 'Business', 'CRITICAL', '2 = Assessed', 'HIGH'],
  ['OPP-005', 'Vault.Country', 'Business', 'CRITICAL', '2 = Assessed', 'CRITICAL'],
  ['OPP-006', 'Dex.Country', 'Business', 'HIGH', '2 = Assessed', 'HIGH'],
  ['OPP-007', 'Harmony RP Voting Plugin', 'Business', 'HIGH', '2 = Assessed', 'HIGH'],
  ['OPP-008', 'Delegation Voting Plugin', 'Business', 'HIGH', '2 = Assessed', 'HIGH'],
  ['OPP-009', 'Native Token Voting Plugin', 'Business', 'HIGH', '2 = Assessed', 'HIGH'],
  ['OPP-010', 'Sample Enterprise ACS Runtime', 'Business', 'HIGH', '2 = Assessed', 'HIGH'],
  ['OPP-011', 'Business Intake Assistant ACS Runtime', 'Business', 'MEDIUM', '2 = Assessed', 'MEDIUM'],
  ['OPP-012', 'Business Non-Executive Coordination Layer', 'Business', 'MEDIUM', '4 = Ready', 'MEDIUM'],
  ['OPP-013', 'Marketplace Payment And Settlement Readiness', 'Marketplace', 'HIGH', '2 = Assessed', 'HIGH'],
  ['OPP-014', 'Academy Rewards And Certification Readiness', 'Academy', 'HIGH', '2 = Assessed', 'HIGH'],
  ['OPP-015', 'Mining Provider And Payout Readiness', 'Mining', 'HIGH', '2 = Assessed', 'HIGH'],
  ['OPP-016', 'Trading Credential Vault And Execution Gate Readiness', 'Trading', 'CRITICAL', '2 = Assessed', 'CRITICAL'],
  ['OPP-017', 'ACS Execution Authority Readiness', 'ACS', 'CRITICAL', '2 = Assessed', 'CRITICAL'],
  ['OPP-018', 'Defi Phase 3 Treasury Strategy Readiness', 'Defi', 'CRITICAL', '2 = Assessed', 'CRITICAL'],
  ['OPP-019', 'Dex Provider Reliability And Read-Only Data', 'Dex', 'MEDIUM', '4 = Ready', 'LOW'],
  ['OPP-020', 'AxodusAPP Integration Shell Expansion', 'AxodusAPP', 'MEDIUM', '2 = Assessed', 'LOW'],
  ['OPP-021', 'Documentation Publication Readiness', 'Documentation', 'MEDIUM', '3 = Approved', 'NONE'],
  ['OPP-022', 'Lottery Randomness And Payout Readiness', 'Lottery', 'CRITICAL', '2 = Assessed', 'CRITICAL'],
  ['OPP-023', 'BBA-Agency Service Delivery Readiness', 'BBA-Agency', 'MEDIUM', '2 = Assessed', 'MEDIUM'],
  ['OPP-024', 'Core Consumer Pilot And RC Readiness', 'Core', 'MEDIUM', '3 = Approved', 'LOW'],
  ['OPP-025', 'Governance Read-Only API Transport Contract Tests', 'Governance', 'MEDIUM', '3 = Approved', 'LOW'],
] as const).map(([id, title, primaryNucleus, risk, readiness, executionSensitivity]) => ({
  id,
  title,
  primaryNucleus,
  risk,
  readiness,
  executionSensitivity,
  executionAuthorized: false,
  productionReady: false,
  source,
  isReadOnly: true,
} as const));

const dependencies: PortfolioDependency[] = ([
  ['DEP-NN-001', 'Business', 'Core', 'HIGH', 'MEDIUM', 'MAPPED', 'NOT_BLOCKING'],
  ['DEP-NN-002', 'Business', 'Governance', 'CRITICAL', 'HIGH', 'MAPPED', 'BLOCKING_EXECUTION'],
  ['DEP-NN-010', 'Business', 'AxodusAPP', 'HIGH', 'MEDIUM', 'MAPPED', 'NOT_BLOCKING'],
  ['DEP-NN-030', 'Dex', 'AxodusAPP', 'MEDIUM', 'MEDIUM', 'READY', 'NOT_BLOCKING'],
  ['DEP-NN-032', 'AxodusAPP', 'Governance', 'MEDIUM', 'MEDIUM', 'REVIEWED', 'NOT_BLOCKING'],
  ['DEP-NN-033', 'AxodusAPP', 'Business', 'HIGH', 'MEDIUM', 'MAPPED', 'BLOCKING_L4_CONSOLIDATION'],
  ['DEP-OPP-003', 'OPP-003 Portfolio Intelligence', 'AxodusAPP', 'MEDIUM', 'MEDIUM', 'CONCEPT', 'BLOCKING_L4_CONSOLIDATION'],
  ['DEP-OPP-020', 'OPP-020 AxodusAPP Integration Shell Expansion', 'AxodusAPP', 'HIGH', 'MEDIUM', 'MAPPED', 'BLOCKING_L4_CONSOLIDATION'],
] as const).map(([id, sourceNucleusOrOpportunity, targetNucleus, criticality, risk, readiness, blockingStatus]) => ({
  id,
  sourceNucleusOrOpportunity,
  targetNucleus,
  criticality,
  risk,
  readiness,
  blockingStatus,
  executionAuthorized: false,
  productionReady: false,
  source,
  isReadOnly: true,
} as const));

const blockers: PortfolioBlocker[] = nucleusRecords.map(([nucleus, , , , , risk, , description]) => ({
  id: `BLOCKER-${nucleus.toUpperCase().replace(/[^A-Z0-9]/g, '-')}`,
  nucleus,
  severity: (risk === 'HIGH' ? 'HIGH' : risk === 'LOW' ? 'LOW' : 'MEDIUM') as Exclude<PortfolioRisk, 'CRITICAL'>,
  status: 'ACTIVE',
  description,
  source,
  isReadOnly: true,
} as const));

const ownership = nucleusRecords.map(([nucleus, , lLevel, , evidenceQuality, , readiness]) => ({
  nucleus,
  primaryRole: nucleus === 'Business' ? 'Non-executive portfolio coordination owner' : nucleus === 'AxodusAPP' ? 'Integration shell and read-only presentation owner' : `${nucleus} owner`,
  ownershipScope: `${nucleus} owns its portfolio evidence and execution-sensitive boundaries at ${lLevel}.`,
  readiness,
  ownershipConfidence: evidenceQuality === 'HIGH' ? 'HIGH' : 'MEDIUM',
  source,
  isReadOnly: true,
} as const));

const nuclei: PortfolioNucleusSummary[] = nucleusRecords.map(([nucleus, status, lLevel, dLevel, evidenceQuality, risk, readiness]) => ({
  nucleus,
  status,
  lLevel,
  dLevel,
  evidenceQuality,
  risk,
  readiness,
  blockers: blockers.filter((blocker) => blocker.nucleus === nucleus).map((blocker) => blocker.id),
  dependencies: dependencies.filter((dependency) => dependency.targetNucleus === nucleus || dependency.sourceNucleusOrOpportunity === nucleus).map((dependency) => dependency.id),
  opportunities: opportunities.filter((opportunity) => opportunity.primaryNucleus === nucleus).map((opportunity) => opportunity.id),
  authority: authorityByNucleus[nucleus],
  source,
  sourceUpdatedAt: source.sourceUpdatedAt,
  executionAuthorized: false,
  productionReady: false,
  mutationEnabled: false,
  isReadOnly: true,
} as const));

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.freeze(value);
    for (const nestedValue of Object.values(value as Record<string, unknown>)) {
      deepFreeze(nestedValue);
    }
  }
  return value;
}

export const portfolioRegistryFixture = deepFreeze({
  snapshotId: 'axodus-portfolio-registry-2026-06-10',
  generatedAt: '2026-06-10T00:00:00.000Z',
  source,
  sourceUpdatedAt: source.sourceUpdatedAt,
  nuclei,
  blockers,
  opportunities,
  dependencies,
  ownership,
  executionAuthority: Object.values(authorityByNucleus),
  summary: {
    nucleiCount: 14,
    officialOpportunityCount: 25,
    officialDependencyCount: 58,
    blockedActionCount: 26,
    boundaryConflictCount: 14,
    executionAuthorized: false,
    productionReady: false,
    mutationEnabled: false,
    isReadOnly: true,
  },
  executionAuthorized: false,
  productionReady: false,
  mutationEnabled: false,
  isReadOnly: true,
} satisfies PortfolioRegistrySnapshot);
