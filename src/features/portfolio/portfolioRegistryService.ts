import { assertPortfolioBoundaryGuards } from './portfolioBoundaries';
import { localPortfolioSourceAdapter, type LocalPortfolioSourceAdapter } from './portfolioSourceAdapter';
import type { NucleusId, PortfolioRegistrySnapshot } from './types';

export const forbiddenPortfolioMutationMethods = [
  'createPortfolioEntry',
  'updatePortfolioEntry',
  'deletePortfolioEntry',
  'executePortfolioAction',
  'approvePortfolioAction',
  'settlePortfolioAction',
  'payPortfolioAction',
  'tradePortfolioAction',
  'swapPortfolioAction',
  'signPortfolioAction',
  'submitPortfolioAction',
  'deployPortfolioAction',
  'mintPortfolioAction',
  'withdrawPortfolioAction',
  'create',
  'update',
  'delete',
  'execute',
  'approve',
  'settle',
  'pay',
  'trade',
  'swap',
  'sign',
  'submit',
  'deploy',
  'mint',
  'withdraw',
] as const;

export class PortfolioRegistryService {
  constructor(private readonly adapter: LocalPortfolioSourceAdapter = localPortfolioSourceAdapter) {}

  getPortfolioSnapshot(): PortfolioRegistrySnapshot {
    return assertPortfolioBoundaryGuards(this.adapter.getPortfolioSnapshot());
  }

  getNuclei() {
    return this.getPortfolioSnapshot().nuclei;
  }

  getNucleusById(id: NucleusId) {
    return this.getPortfolioSnapshot().nuclei.find((nucleus) => nucleus.nucleus === id) ?? null;
  }

  getBlockers() {
    return this.getPortfolioSnapshot().blockers;
  }

  getOpportunities() {
    return this.getPortfolioSnapshot().opportunities;
  }

  getDependencies() {
    return this.getPortfolioSnapshot().dependencies;
  }

  getExecutionAuthority() {
    return this.getPortfolioSnapshot().executionAuthority;
  }
}

export const portfolioRegistryService = new PortfolioRegistryService();
