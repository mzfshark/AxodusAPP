import { governanceMock } from '@/data/mock';

const devMockEnabled = import.meta.env.DEV || import.meta.env.VITE_GOVERNANCE_USE_MOCKS === 'true';

export const mockGovernancePlugins = governanceMock.plugins;
export const mockGovernanceProposals = governanceMock.proposals;

export function shouldUseGovernanceMocks() {
  return devMockEnabled;
}

export function getMockGovernanceProposals() {
  return shouldUseGovernanceMocks() ? mockGovernanceProposals : [];
}

export function getMockGovernanceProposal(proposalId) {
  if (!shouldUseGovernanceMocks()) return null;

  return mockGovernanceProposals.find(
    (proposal) =>
      proposal.id === proposalId ||
      proposal.entityId === proposalId ||
      proposal.proposalId === proposalId ||
      String(proposal.proposalIndex) === String(proposalId),
  );
}

export function getMockGovernanceProposalActions(proposalId) {
  const proposal = getMockGovernanceProposal(proposalId);
  return proposal?.actions ?? [];
}

export function getMockGovernancePlugins() {
  return shouldUseGovernanceMocks() ? mockGovernancePlugins : [];
}
