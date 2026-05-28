function standingValue(standing) {
  if (!standing) return 'under-review';
  if (typeof standing === 'string') return standing;
  return standing.status ?? 'under-review';
}

function normalizeProposalStatus(status) {
  const value = String(status ?? 'draft').toLowerCase();
  if (value.includes('review')) return 'under-review';
  if (value.includes('voting') || value.includes('active')) return 'voting';
  if (value.includes('approved') || value.includes('passed')) return 'approved';
  if (value.includes('rejected') || value.includes('failed')) return 'rejected';
  if (value.includes('blocked')) return 'blocked';
  if (value.includes('expired')) return 'expired';
  if (value.includes('queued')) return 'queued';
  if (value.includes('submitted')) return 'submitted';
  return value.includes('draft') ? 'draft' : 'under-review';
}

function statusCounts(items, readStatus) {
  return items.reduce((counts, item) => {
    const status = readStatus(item);
    return { ...counts, [status]: (counts[status] ?? 0) + 1 };
  }, {});
}

export function buildGovernanceConsoleModel({
  chains = [],
  summary = {},
  source,
  governanceConsole,
  proposalDrafts,
  appTenant,
}) {
  const selectedDao = governanceConsole.selectedDao;
  const selectedTenant = governanceConsole.selectedTenant;
  const selectedChain = governanceConsole.selectedChain;
  const visibleProposals = [...(proposalDrafts?.drafts ?? []), ...(governanceConsole.proposals ?? [])];
  const guardrails = governanceConsole.selectedGuardrailReasons ?? [];
  const protocolGuardrails = summary.guardrailReasons ?? [];
  const isRootContext = Boolean(selectedDao?.isVirtual || selectedTenant?.tenantType === 'root');
  const constitutionalStanding = standingValue(selectedTenant?.constitutionalStanding ?? selectedDao?.constitutionalStanding);
  const localGovernanceStatus = selectedTenant?.governanceStatus ?? selectedDao?.governanceStatus ?? 'under-review';
  const executionMode = governanceConsole.canCreateProposal ? 'preview' : 'executable-disabled';
  const acsState = appTenant?.acsState ?? (guardrails.length ? 'review-required' : 'online');
  const proposalSummaries = visibleProposals.slice(0, 8).map((proposal) => {
    const status = normalizeProposalStatus(proposal.status);
    const reasons = proposal.reasonCodes ?? proposal.createProposalRequest?.guardrails?.reasonCodes ?? [];

    return {
      id: proposal.id ?? proposal.proposalId ?? proposal.routeId ?? proposal.title,
      title: proposal.title ?? proposal.name ?? 'Untitled proposal',
      scope: proposal.daoId && proposal.daoId === selectedDao?.id ? 'tenant' : proposal.scope ?? 'tenant',
      owner: selectedTenant?.name ?? selectedDao?.name ?? appTenant?.displayName ?? 'Governance tenant',
      status,
      readiness: reasons.length ? 'review-required' : status === 'draft' ? 'draft' : 'preview-ready',
      acsState: reasons.length ? 'review-required' : acsState,
      executionMode: 'executable-disabled',
      category: proposal.category ?? proposal.actionType ?? 'governance',
    };
  });
  const proposalStateCounts = statusCounts(proposalSummaries, (proposal) => proposal.status);
  const blockers = [
    ...(!governanceConsole.canCreateProposal ? ['Wallet, DAO, chain or plugin readiness is incomplete for proposal creation.'] : []),
    ...(guardrails.length ? [`${guardrails.length} selected-context constitutional guardrail reason(s) require review.`] : []),
    ...(appTenant?.restrictions ?? []).map((restriction) => `Tenant restriction: ${restriction}`),
    ...(executionMode === 'executable-disabled' ? ['Frontend execution is disabled for governance actions.'] : []),
  ];
  const warnings = [
    ...(source === 'fallback' ? ['Governance registry is rendering from a fallback snapshot.'] : []),
    ...(governanceConsole.executorResolution?.blocked ? ['Canonical executor resolution is blocked.'] : []),
    ...(selectedTenant?.treasury?.policyStatus && selectedTenant.treasury.policyStatus !== 'certified'
      ? [`Tenant treasury policy is ${selectedTenant.treasury.policyStatus}.`]
      : []),
  ];
  const readinessScore = Math.max(0, 100 - blockers.length * 20 - warnings.length * 10);

  return {
    context: {
      selectedTenantName: selectedTenant?.name ?? appTenant?.displayName ?? selectedDao?.name ?? 'No tenant selected',
      tenantType: isRootContext ? 'Axodus Root / Protocol' : selectedTenant?.tenantType ?? appTenant?.type ?? 'Sub-DAO / Tenant',
      isRootContext,
      governanceMode: isRootContext ? 'Constitutional Governance' : 'Local Governance inside Axodus Root constraints',
      federationTier: selectedTenant?.federationTier ?? appTenant?.federationTier ?? 'unassigned',
      constitutionalStanding,
      localGovernanceStatus,
      acsState,
      executionMode,
      walletState: governanceConsole.walletAddress ? 'connected' : 'disconnected',
      walletAddress: governanceConsole.walletAddress,
      primaryChain: selectedChain?.name ?? appTenant?.primaryChain ?? 'No chain selected',
      appTenantName: appTenant?.displayName,
    },
    authoritySplit: {
      root: {
        title: 'Axodus Root',
        authority: 'Constitutional authority',
        guardrails: protocolGuardrails.length,
        federationPolicy: 'Root federation policy',
        chainPolicy: `${summary.totalChains ?? chains.length} chain records`,
        execution: 'read-only authority placeholder',
      },
      tenant: {
        title: selectedTenant?.name ?? selectedDao?.name ?? appTenant?.displayName ?? 'Selected tenant',
        authority: 'Local governance inside Root constraints',
        proposals: visibleProposals.length,
        roles: selectedTenant?.members?.roles ?? appTenant?.roles ?? [],
        localPolicy: selectedTenant?.treasury?.policyStatus ?? appTenant?.treasuryMode ?? 'not-configured',
        inheritedRestrictions: guardrails.length + (appTenant?.restrictions?.length ?? 0),
      },
    },
    constitutional: {
      standing: constitutionalStanding,
      guardrails: protocolGuardrails,
      guardrailCount: protocolGuardrails.length,
      reasonCategories: statusCounts(protocolGuardrails, (reason) => reason.reasonSeverity ?? reason.severity ?? 'constitutional'),
      federationRules: ['Root authority defines federation membership', 'Tenant autonomy is bounded by constitutional standing', 'Execution requires governance and ACS review'],
      chainPolicy: {
        totalChains: summary.totalChains ?? chains.length,
        evmCount: summary.evmCount ?? 0,
        votingChains: summary.roleCounts?.voting ?? 0,
        executionChains: summary.roleCounts?.execution ?? 0,
      },
      restrictions: ['frontend-execution-disabled', 'treasury-actions-governance-gated', 'constitutional-guardrails-required'],
      inheritedByTenant: guardrails.slice(0, 5),
    },
    local: {
      identity: {
        tenantId: selectedTenant?.id ?? appTenant?.id ?? selectedDao?.id,
        tenantName: selectedTenant?.name ?? appTenant?.displayName ?? selectedDao?.name,
        tenantType: selectedTenant?.tenantType ?? appTenant?.type ?? 'tenant',
        federationTier: selectedTenant?.federationTier ?? appTenant?.federationTier ?? 'unassigned',
        constitutionalStanding,
        localGovernanceStatus,
        primaryChain: selectedChain?.name ?? appTenant?.primaryChain,
        governanceModel: selectedTenant?.localGovernanceModel ?? selectedDao?.votingType ?? 'Not indexed',
        executionMode,
        roles: selectedTenant?.members?.roles ?? appTenant?.roles ?? [],
        enabledModules: selectedTenant?.productsEnabled ?? appTenant?.enabledModules ?? [],
      },
      votingModel: selectedTenant?.localGovernanceModel ?? selectedDao?.votingType ?? 'Not indexed',
      proposalCounts: proposalStateCounts,
      proposalTotal: visibleProposals.length,
      treasuryGovernanceMode: selectedTenant?.treasury?.policyStatus ?? appTenant?.treasuryMode ?? 'not-configured',
      restrictions: [...guardrails.map((reason) => reason.reasonCode), ...(appTenant?.restrictions ?? [])],
    },
    proposals: {
      items: proposalSummaries,
      counts: proposalStateCounts,
      total: proposalSummaries.length,
    },
    readiness: {
      score: readinessScore,
      label: blockers.length ? 'Not ready for execution' : 'Preview-ready only',
      blockers,
      warnings,
      missingApprovals: [
        ...(guardrails.length ? ['Constitutional guardrail review'] : []),
        ...(acsState !== 'online' ? ['ACS review'] : []),
        ...(governanceConsole.walletAddress ? [] : ['Wallet connection for user participation']),
      ],
      dependencies: ['Tenant context', 'Governance registry', 'Plugin registry', 'ACS review', 'Wallet for user actions'],
      executionMode,
    },
    acsReview: {
      state: acsState,
      pendingReviews: guardrails.length + (governanceConsole.executorResolution?.blocked ? 1 : 0),
      policyChecks: ['constitutional-standing', 'tenant-policy', 'executor-resolution', 'proposal-readiness'],
      blockedActions: blockers,
      warnings,
      reviewSource: governanceConsole.executorSource ?? 'frontend-dev-fixture',
      lastEvaluatedAt: new Date().toISOString(),
    },
    userParticipation: {
      walletConnected: Boolean(governanceConsole.walletAddress),
      walletAddress: governanceConsole.walletAddress,
      role: (appTenant?.roles ?? selectedTenant?.members?.roles ?? ['observer'])[0] ?? 'observer',
      votingEligibility: governanceConsole.walletAddress && selectedDao && !selectedDao.isVirtual ? 'mock-eligible' : 'not-eligible',
      delegationState: 'not-delegated',
      votingPower: 'placeholder',
      attentionItems: proposalSummaries.filter((proposal) => ['under-review', 'voting'].includes(proposal.status)).length,
    },
  };
}
