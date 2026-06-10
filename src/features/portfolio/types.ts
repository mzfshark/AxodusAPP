export type NucleusId =
  | 'Core'
  | 'Governance'
  | 'Documentation'
  | 'Dex'
  | 'Defi'
  | 'AxodusAPP'
  | 'Business'
  | 'Marketplace'
  | 'Academy'
  | 'Mining'
  | 'ACS'
  | 'Trading'
  | 'BBA-Agency'
  | 'Lottery';

export type NucleusStatus = 'ADVANCE' | 'HOLD' | 'RECOVER' | 'BACKLOG' | 'PAUSE / PORTFOLIO BALANCING';
export type MaturityLevel = 'L3' | 'L4 Candidate' | 'L4 Readiness' | 'L4 Consolidated' | 'L5';
export type DevelopmentLevel = 'D2' | 'D3';
export type EvidenceQuality = 'HIGH' | 'MEDIUM' | 'LOW';
export type PortfolioRisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ReadinessState = 'READINESS_ASSESSED' | 'READINESS_APPROVED' | 'READINESS_READY';
export type OwnershipConfidence = 'HIGH' | 'MEDIUM';

export type PortfolioSource = Readonly<{
  kind: 'local-static-fixture';
  source: string;
  sourceUpdatedAt: string;
  sourceVersioning: 'local-unversioned';
  isReadOnly: true;
}>;

export type PortfolioBlocker = Readonly<{
  id: string;
  nucleus: NucleusId;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'BLOCKED';
  description: string;
  source: PortfolioSource;
  isReadOnly: true;
}>;

export type PortfolioOpportunity = Readonly<{
  id: string;
  title: string;
  primaryNucleus: NucleusId;
  risk: PortfolioRisk;
  readiness: '1 = Draft' | '2 = Assessed' | '3 = Approved' | '4 = Ready';
  executionSensitivity: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  executionAuthorized: false;
  productionReady: false;
  source: PortfolioSource;
  isReadOnly: true;
}>;

export type PortfolioDependency = Readonly<{
  id: string;
  sourceNucleusOrOpportunity: string;
  targetNucleus: NucleusId;
  criticality: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  risk: PortfolioRisk;
  readiness: 'CONCEPT' | 'MAPPED' | 'REVIEWED' | 'APPROVED' | 'READY';
  blockingStatus: 'NOT_BLOCKING' | 'BLOCKING_L4_CONSOLIDATION' | 'BLOCKING_EXECUTION' | 'BLOCKING_PRODUCTION';
  executionAuthorized: false;
  productionReady: false;
  source: PortfolioSource;
  isReadOnly: true;
}>;

export type OwnershipSummary = Readonly<{
  nucleus: NucleusId;
  primaryRole: string;
  ownershipScope: string;
  readiness: ReadinessState;
  ownershipConfidence: OwnershipConfidence;
  source: PortfolioSource;
  isReadOnly: true;
}>;

export type ExecutionAuthoritySummary = Readonly<{
  nucleus: NucleusId;
  governanceAuthority: string;
  treasuryAuthority: string;
  executionAuthority: 'NONE' | 'NON_EXECUTIVE' | 'READ_ONLY_ONLY' | 'BLOCKED';
  productionAuthority: false;
  executionAuthorized: false;
  productionReady: false;
  mutationEnabled: false;
  source: PortfolioSource;
  isReadOnly: true;
}>;

export type PortfolioNucleusSummary = Readonly<{
  nucleus: NucleusId;
  status: NucleusStatus;
  lLevel: MaturityLevel;
  dLevel: DevelopmentLevel;
  evidenceQuality: EvidenceQuality;
  risk: PortfolioRisk;
  readiness: ReadinessState;
  blockers: readonly string[];
  dependencies: readonly string[];
  opportunities: readonly string[];
  authority: ExecutionAuthoritySummary;
  source: PortfolioSource;
  sourceUpdatedAt: string;
  executionAuthorized: false;
  productionReady: false;
  mutationEnabled: false;
  isReadOnly: true;
}>;

export type PortfolioRegistrySnapshot = Readonly<{
  snapshotId: string;
  generatedAt: string;
  source: PortfolioSource;
  sourceUpdatedAt: string;
  nuclei: readonly PortfolioNucleusSummary[];
  blockers: readonly PortfolioBlocker[];
  opportunities: readonly PortfolioOpportunity[];
  dependencies: readonly PortfolioDependency[];
  ownership: readonly OwnershipSummary[];
  executionAuthority: readonly ExecutionAuthoritySummary[];
  summary: Readonly<{
    nucleiCount: 14;
    officialOpportunityCount: 25;
    officialDependencyCount: 58;
    blockedActionCount: 26;
    boundaryConflictCount: 14;
    executionAuthorized: false;
    productionReady: false;
    mutationEnabled: false;
    isReadOnly: true;
  }>;
  executionAuthorized: false;
  productionReady: false;
  mutationEnabled: false;
  isReadOnly: true;
}>;
