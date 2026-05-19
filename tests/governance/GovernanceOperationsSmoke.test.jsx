import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const executionChain = {
  slug: 'ethereum-sepolia',
  network: 'ethereum-sepolia',
  name: 'Ethereum Sepolia',
  chainId: 11155111,
  adapter: 'evm',
  roles: ['execution', 'voting'],
  governanceStatus: 'compliant',
  federationMember: true,
  federationTier: 'root',
  constitutionalStanding: { status: 'compliant', reasonCodes: [], reasonSeverity: null },
  capabilities: {
    governance: true,
    execution: true,
    voting: true,
    plugins: true,
    constitutionalLayer: {
      capabilities: [{ key: 'execution-authority', label: 'Execution authority', status: 'enabled', source: 'Constitutional Governance' }],
      conditions: [],
      authorityModel: {
        authoritySource: '$Neurons',
        executionAuthority: 'constitutional-root',
        treasuryAuthorityBoundary: 'Treasury-sensitive actions require policy review.',
        agentAuthorityBoundary: 'Agent execution requires scoped authorization.',
        localAutonomyBoundary: 'Local autonomy remains inside the Axodus constitutional model.',
      },
      federationModel: {
        federationMember: true,
        federationTier: 'root',
        roles: ['execution', 'voting'],
        legacyAdapter: false,
        localGovernanceAutonomy: 'bounded-by-constitution',
      },
      executionModel: {
        executionChainAuthorized: true,
        executionAuthority: 'constitutional-root',
        remoteExecutionGuardrail: false,
        treasuryReviewRequired: false,
        reasonCodes: [],
        reasonSeverity: null,
      },
    },
  },
  finality: { confirmationBlocks: 12 },
};

const registrySummary = {
  totalChains: 1,
  evmCount: 1,
  legacyCount: 0,
  pluginTypes: 1,
  roleCounts: { execution: 1, voting: 1, spoke: 0 },
  governanceStatusCounts: { compliant: 1 },
  federationTierCounts: { root: 1 },
  reasonSeverityCounts: {},
  guardrailReasons: [],
};

const selectedDao = {
  id: 'axodus-executive-dao',
  name: 'Axodus Executive DAO',
  network: 'ethereum-sepolia',
  address: '0x1111111111111111111111111111111111111111',
  federationMember: true,
  federationTier: 'partner',
  governanceStatus: 'compliant',
  constitutionalStanding: { status: 'compliant', reasonCodes: [], reasonSeverity: null },
};

const selectedTenant = {
  id: 'tenant-executive-dao',
  daoId: selectedDao.id,
  name: 'Axodus Executive DAO',
  legalOrPublicName: 'Axodus Executive DAO',
  tenantType: 'internal',
  federationTier: 'partner',
  constitutionalStanding: 'compliant',
  governanceStatus: 'compliant',
  constitutionalAuthority: { source: 'Axodus Constitution', layer: 'Constitutional Governance', authorityModel: 'federated-execution-tenant' },
  localGovernanceModel: '$Neurons token voting',
  treasury: { address: selectedDao.address, chainId: 11155111, assets: [], policyStatus: 'review-required' },
  members: { total: 3, roles: ['executor', 'treasury-reviewer'] },
  productsEnabled: ['Governance', 'Treasury', 'ACS'],
  agentsAssigned: ['proposal-review-agent'],
  activeProposals: 1,
  pendingOperations: 2,
  executionReceipts: 1,
  reasonCodes: [{ reasonCode: 'TREASURY_POLICY_REQUIRES_REVIEW', reasonSeverity: 'constitutional', source: 'treasury policy' }],
};

const governancePlugin = {
  id: 'token-voting-plugin',
  name: 'Token Voting',
  interfaceType: 'tokenVoting',
  status: 'installed',
  address: '0x2222222222222222222222222222222222222222',
};

const walletMock = vi.hoisted(() => ({
  state: {
    address: null,
    isConnected: false,
    chain: null,
    disconnect: vi.fn(),
  },
}));

vi.mock('@/hooks/useWallet', () => ({
  useWallet: () => walletMock.state,
}));

vi.mock('../../src/modules/governance/hooks/useChainRegistry', () => ({
  useChainRegistry: () => ({
    chains: [executionChain],
    summary: registrySummary,
    source: 'fallback',
    status: 'success',
    error: null,
  }),
}));

vi.mock('../../src/modules/governance/hooks/useGovernanceConsole', () => ({
  useGovernanceConsole: () => ({
    daos: [selectedDao],
    selectedDao,
    selectedTenant,
    tenants: [selectedTenant],
    tenantSource: 'test-fixture',
    selectedDaoId: selectedDao.id,
    setSelectedDaoId: vi.fn(),
    selectedChain: executionChain,
    proposals: [],
    plugins: [governancePlugin],
    status: 'success',
    error: null,
    canCreateProposal: true,
    walletAddress: '0xAxoD000000000000000000000000000000000001',
    selectedGuardrailReasons: [],
  }),
}));

async function renderLanding() {
  vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'false');
  const { default: GovernanceLanding } = await import('../../src/modules/governance/pages/GovernanceLanding');
  render(
    <MemoryRouter initialEntries={['/governance']}>
      <GovernanceLanding />
    </MemoryRouter>,
  );
}

async function renderDashboard() {
  vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'false');
  const { default: GovernanceDashboard } = await import('../../src/modules/governance/pages/GovernanceDashboard');
  render(
    <MemoryRouter initialEntries={['/governance/console']}>
      <GovernanceDashboard />
    </MemoryRouter>,
  );
}

describe('Governance Operations Center smoke', () => {
  beforeEach(() => {
    walletMock.state = {
      address: null,
      isConnected: false,
      chain: null,
      disconnect: vi.fn(),
    };
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    window.localStorage.clear();
  });

  test('renders the public governance landing with topology and Constitutional Layer', async () => {
    await renderLanding();

    expect(screen.getByRole('heading', { name: /federated dao governance/i })).toBeInTheDocument();
    expect(screen.getByText(/featured dao tenants/i)).toBeInTheDocument();
    expect(screen.getByText(/dao federation marketplace/i)).toBeInTheDocument();
    expect(screen.getByText(/axodus trading alpha dao/i)).toBeInTheDocument();
    expect(screen.getAllByText(/above CORE APR/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Axodus CORE baseline/i)).toBeInTheDocument();
    expect(screen.getByText('Axodus Constitution')).toBeInTheDocument();
    expect(screen.getByText('Federation Registry')).toBeInTheDocument();
    expect(screen.getByText(/constitutional governance layer/i)).toBeInTheDocument();
    expect(screen.getByText(/local governance layer/i)).toBeInTheDocument();
    expect(screen.getAllByText('Ethereum Sepolia').length).toBeGreaterThan(0);
  });

  test('prioritizes user DAO tenant allocations when wallet is connected', async () => {
    walletMock.state = {
      address: '0xAxoD000000000000000000000000000000000001',
      isConnected: true,
      chain: 11155111,
      disconnect: vi.fn(),
    };

    await renderLanding();

    expect(screen.getByText(/my dao tenants/i)).toBeInTheDocument();
    expect(screen.getByText(/multi-DAO allocation workspace/i)).toBeInTheDocument();
    expect(screen.getByText(/federal CORE-only allocation remains available/i)).toBeInTheDocument();
    expect(screen.getByText(/12,840 vNEURONS/i)).toBeInTheDocument();
    expect(screen.getByText(/4.10%/i)).toBeInTheDocument();
  });

  test('renders the Governance Operations Center with scoped createProposal observability', async () => {
    await renderDashboard();

    expect(screen.getByRole('heading', { name: /dao tenant operations center/i })).toBeInTheDocument();
    expect(screen.getByText(/dao tenant account/i)).toBeInTheDocument();
    expect(screen.getByText(/products enabled/i)).toBeInTheDocument();
    expect(screen.getByText(/agents assigned/i)).toBeInTheDocument();
    expect(screen.getAllByText(/treasury status/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/governance health/i)).toBeInTheDocument();
    expect(screen.getByText(/treasury execution/i)).toBeInTheDocument();
    expect(screen.getAllByText(/proposal activity/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/operations readiness/i)).toBeInTheDocument();
    expect(screen.getByText(/create proposal integration status/i)).toBeInTheDocument();
    expect(screen.getByText(/DAO: Axodus Executive DAO/i)).toBeInTheDocument();
    expect(screen.getByText(/Chain: Ethereum Sepolia/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create proposal/i })).toBeEnabled();
  });

  test('creates a local proposal draft from the console modal without on-chain submission', async () => {
    await renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: /create proposal/i }));
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Smoke proposal draft' } });
    fireEvent.change(screen.getByLabelText(/summary/i), { target: { value: 'Validate Governance Operations Center modal flow.' } });
    fireEvent.click(screen.getByRole('button', { name: /generate local draft/i }));

    expect(await screen.findByText(/local draft generated/i)).toBeInTheDocument();
    expect(screen.getAllByText('Smoke proposal draft').length).toBeGreaterThan(0);
    expect(screen.getByText(/mock-review · backend validation required/i)).toBeInTheDocument();
    expect(screen.getByText(/evm-voting · vote-only/i)).toBeInTheDocument();
    expect(screen.getByText(/constitutional-root · execution chain authorized/i)).toBeInTheDocument();
    expect(screen.getAllByText(/CREATE_PROPOSAL_BACKEND_NOT_ENABLED/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByRole('button', { name: /^close$/i }).at(-1));

    await waitFor(() => {
      expect(screen.queryByText(/local draft generated/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/browser-local draft/i)).toBeInTheDocument();
  });
});
