const devMockEnabled = import.meta.env.DEV || import.meta.env.VITE_GOVERNANCE_USE_MOCKS === 'true';

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

const mockPluginAddress = '0x1111111111111111111111111111111111111111';
const mockDaoAddress = '0x2222222222222222222222222222222222222222';

export const mockGovernancePlugins = [
  {
    id: 'dev-token-voting-plugin',
    interfaceType: 'tokenVoting',
    pluginType: 'tokenVoting',
    address: mockPluginAddress,
    status: 'installed',
    isSupported: true,
  },
];

export const mockGovernanceProposals = [
  {
    id: 'dev-sepolia-token-voting-1',
    entityId: 'dev-sepolia-token-voting-1',
    proposalId: 'dev-sepolia-token-voting-1',
    incrementalId: 1,
    proposalIndex: '1',
    onchainProposalId: '1',
    title: 'Dev Mock: Approve Sepolia Treasury Operating Window',
    summary: 'Development-only proposal for validating governance guardrails, permission checks, wallet previews, and registry observability.',
    description:
      'This mock proposal is rendered only in development. It exercises the Axodus Governance Operations Center without depending on live indexed proposals.',
    status: 'Active',
    network: 'ethereum-sepolia',
    daoAddress: mockDaoAddress,
    pluginAddress: mockPluginAddress,
    pluginType: 'tokenVoting',
    interfaceType: 'tokenVoting',
    startDate: new Date(now - day).toISOString(),
    endDate: new Date(now + day).toISOString(),
    executed: false,
    executionTarget: mockPluginAddress,
    tally: {
      yes: '128000',
      no: '24000',
      abstain: '9000',
    },
    metadata: {
      title: 'Dev Mock: Approve Sepolia Treasury Operating Window',
      summary: 'Development-only governance proposal.',
      pluginType: 'tokenVoting',
      pluginAddress: mockPluginAddress,
      proposalIndex: '1',
    },
    actions: [
      {
        name: 'Register operating window',
        functionName: 'setOperatingWindow',
        to: mockDaoAddress,
        value: '0',
      },
    ],
    executionReceipts: [
      {
        chainSlug: 'ethereum-sepolia',
        status: 'Pending indexer reconciliation',
        messageId: 'dev-layerzero-message-1',
      },
    ],
    dataSource: 'dev-mock',
  },
  {
    id: 'dev-harmony-observer-guardrail',
    entityId: 'dev-harmony-observer-guardrail',
    proposalId: 'dev-harmony-observer-guardrail',
    incrementalId: 2,
    proposalIndex: '2',
    onchainProposalId: '2',
    title: 'Dev Mock: Harmony Observer Guardrail Review',
    summary: 'Development-only proposal for validating legacy adapter and observer-tier guardrail rendering.',
    description:
      'This mock proposal demonstrates how Harmony remains a legacy voting/spoke adapter with remote execution guardrails active in Axodus Governance.',
    status: 'Under review',
    network: 'harmony-mainnet',
    daoAddress: mockDaoAddress,
    pluginAddress: mockPluginAddress,
    pluginType: 'harmonyVoting',
    interfaceType: 'harmonyVoting',
    startDate: new Date(now - 2 * day).toISOString(),
    endDate: new Date(now + 2 * day).toISOString(),
    executed: false,
    tally: {
      yes: '42000',
      no: '7000',
      abstain: '3000',
    },
    metadata: {
      title: 'Dev Mock: Harmony Observer Guardrail Review',
      summary: 'Development-only legacy adapter guardrail proposal.',
      pluginType: 'harmonyVoting',
      pluginAddress: mockPluginAddress,
      proposalIndex: '2',
    },
    actions: [],
    dataSource: 'dev-mock',
  },
];

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
