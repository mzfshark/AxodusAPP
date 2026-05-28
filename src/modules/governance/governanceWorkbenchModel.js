export function buildGovernanceWorkbenchModel({ chains = [], governanceConsole, proposalDrafts, summary = {}, source }) {
  const selectedTenant = governanceConsole?.selectedTenant;
  const selectedDao = governanceConsole?.selectedDao;
  const selectedChain = governanceConsole?.selectedChain;
  const proposals = [...(proposalDrafts?.drafts ?? []), ...(governanceConsole?.proposals ?? [])];
  const guardrails = governanceConsole?.selectedGuardrailReasons ?? [];

  return {
    protocolCards: [
      {
        id: 'gov-protocol-constitutional',
        title: 'Constitutional Layer',
        value: selectedChain?.constitutionalLayer?.standing ?? selectedChain?.constitutionalStanding ?? 'compatible',
        detail: `Registry source: ${source}. ${chains.length} chains are visible in the governance registry.`,
        status: 'protocol',
      },
      {
        id: 'gov-protocol-chain-registry',
        title: 'Chain Registry',
        value: String(summary.totalChains ?? chains.length),
        detail: `${summary.evmCount ?? 0} EVM networks · ${summary.pluginTypes ?? 0} plugin types.`,
        status: 'read-only',
      },
      {
        id: 'gov-protocol-guardrails',
        title: 'Global Guardrails',
        value: String((summary.guardrailReasons ?? []).length),
        detail: 'Reason codes describe constitutional compatibility and registry readiness.',
        status: 'reason-codes',
      },
    ],
    tenantCards: [
      {
        id: 'gov-tenant-selected',
        title: 'Selected DAO Tenant',
        value: selectedTenant?.name ?? selectedDao?.name ?? 'No tenant selected',
        detail: `${selectedTenant?.governanceStatus ?? selectedDao?.governanceStatus ?? 'unknown'} governance · ${selectedTenant?.federationTier ?? 'federation pending'}`,
        status: selectedTenant?.treasury?.policyStatus ?? 'tenant',
      },
      {
        id: 'gov-tenant-proposals',
        title: 'Tenant Proposals',
        value: String(proposals.length),
        detail: `${proposalDrafts?.drafts?.length ?? 0} local drafts · ${(governanceConsole?.proposals ?? []).length} indexed proposals.`,
        status: 'preview',
      },
      {
        id: 'gov-tenant-readiness',
        title: 'Tenant Readiness',
        value: governanceConsole?.canCreateProposal ? 'ready' : 'guarded',
        detail: `${guardrails.length} selected-context guardrail reasons currently visible.`,
        status: governanceConsole?.status ?? 'mock',
      },
    ],
    userCards: [
      {
        id: 'gov-user-wallet',
        title: 'Wallet Eligibility',
        value: governanceConsole?.walletAddress ? 'connected' : 'not connected',
        detail: governanceConsole?.walletAddress ? `${governanceConsole.walletAddress.slice(0, 6)}...${governanceConsole.walletAddress.slice(-4)}` : 'Voting and proposal actions require wallet context.',
        status: governanceConsole?.walletAddress ? 'wallet-aware' : 'wallet-required',
      },
      {
        id: 'gov-user-role',
        title: 'Tenant Role',
        value: selectedTenant?.members?.roles?.[0] ?? 'observer',
        detail: 'Role is shown from mock/indexed tenant context and does not grant execution by itself.',
        status: 'read-only',
      },
    ],
    operationsCards: [
      {
        id: 'gov-ops-executor',
        title: 'Execution Control',
        value: governanceConsole?.executorResolution?.status ?? 'preview',
        detail: 'Executor readiness and permission checks are operator-scoped and guarded.',
        status: governanceConsole?.executorSource ?? 'operator',
        executionMode: 'executable-disabled',
      },
      {
        id: 'gov-ops-approvals',
        title: 'Required Approvals',
        value: String(guardrails.length),
        detail: 'Selected context guardrails require review before future execution surfaces can be enabled.',
        status: 'ACS/Governance',
        executionMode: 'simulation',
      },
    ],
  };
}
