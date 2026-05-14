import { getConstitutionalStanding, severityForReason } from '../utils/governanceState';

function checkResult(label, status, message, reasonCode = null, source = null, reasonSeverity = null) {
  return { label, status, message, reasonCode, source, reasonSeverity: reasonSeverity ?? severityForReason(reasonCode, status) };
}

function blockOperation(operation, reason, permissionChecks) {
  const blockingCheck = permissionChecks.find((check) => check.status === 'blocked');

  return {
    ...operation,
    status: 'blocked',
    canSubmit: false,
    reason,
    reasonCode: blockingCheck?.reasonCode ?? null,
    reasonSeverity: blockingCheck?.reasonSeverity ?? null,
    permissionChecks,
  };
}

function proposalDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function proposalWindow(proposal) {
  return {
    start: proposalDate(proposal?.startDate ?? proposal?.startAt ?? proposal?.startTime ?? proposal?.metadata?.startDate),
    end: proposalDate(proposal?.endDate ?? proposal?.endAt ?? proposal?.endTime ?? proposal?.metadata?.endDate),
  };
}

function isProposalExecuted(proposal) {
  return proposal?.executed === true || Boolean(proposal?.executed?.status);
}

function hasPluginCapability(chain, pluginType) {
  const supported = chain?.capabilities?.supportedPluginTypes;
  return !Array.isArray(supported) || supported.includes(pluginType);
}

function getPluginCapability(chain, pluginType) {
  return chain?.capabilities?.pluginCapabilities?.[pluginType];
}

function pluginActionEnabled(pluginCapability, action) {
  if (!pluginCapability?.actions) return true;
  return pluginCapability.actions[action] !== false;
}

function lifecycleChecks({ proposal, action, now }) {
  const checks = [];

  if (isProposalExecuted(proposal)) {
    checks.push(checkResult('Proposal lifecycle', 'blocked', 'Proposal is already executed.', 'PROPOSAL_ALREADY_EXECUTED', 'execution status'));
    return checks;
  }

  const { start, end } = proposalWindow(proposal);

  if (action === 'vote') {
    if (start && now < start) {
      checks.push(checkResult('Proposal lifecycle', 'blocked', 'Voting has not started yet.', 'PROPOSAL_VOTING_NOT_STARTED', 'execution status'));
      return checks;
    }

    if (end && now > end) {
      checks.push(checkResult('Proposal lifecycle', 'blocked', 'Voting period is already closed.', 'PROPOSAL_VOTING_CLOSED', 'execution status'));
      return checks;
    }

    checks.push(checkResult('Proposal lifecycle', 'passed', 'Proposal is available for voting based on indexed timing.', null, 'execution status'));
    return checks;
  }

  if (action === 'execute') {
    if (end && now < end) {
      checks.push(
        checkResult('Proposal lifecycle', 'warning', 'Voting period has not ended according to indexed timing.', 'PROPOSAL_VOTING_OPEN', 'execution status'),
      );
      return checks;
    }

    checks.push(checkResult('Proposal lifecycle', 'passed', 'Proposal is not marked as executed.', null, 'execution status'));
  }

  return checks;
}

export function applyGovernanceActionGuards({ operation, proposal, chain, walletAddress, now = new Date() }) {
  if (!operation) return operation;

  const permissionChecks = [];
  const action = operation.action;

  if (!walletAddress) {
    permissionChecks.push(checkResult('Wallet', 'blocked', 'Wallet connection is required.', 'WALLET_NOT_CONNECTED', 'wallet or DAO permission state'));
  } else {
    permissionChecks.push(checkResult('Wallet', 'passed', 'Wallet is connected.', null, 'wallet or DAO permission state'));
  }

  if (!chain?.capabilities?.governance) {
    permissionChecks.push(
      checkResult(
        'Constitutional Governance',
        'blocked',
        'Governance capability is not enabled for this chain.',
        'CHAIN_NOT_CONSTITUTIONALLY_ENABLED',
        'Constitutional Governance',
      ),
    );
  } else {
    permissionChecks.push(
      checkResult('Constitutional Governance', 'passed', 'Governance capability is enabled.', null, 'Constitutional Governance'),
    );
  }

  const chainStanding = getConstitutionalStanding(chain?.capabilities);

  if (chainStanding?.status === 'restricted' || chainStanding?.status === 'incompatible') {
    const reasonCode = chainStanding.reasonCodes?.[0] ?? 'LOCAL_GOVERNANCE_MODEL_INCOMPATIBLE';
    permissionChecks.push(
      checkResult(
        'Constitutional standing',
        'blocked',
        'This local governance context has restricted constitutional standing.',
        reasonCode,
        'Constitutional Governance',
        chainStanding.reasonSeverity,
      ),
    );
  } else if (chainStanding?.status === 'under-review' || chainStanding?.status === 'requires-review') {
    const reasonCode = chainStanding.reasonCodes?.[0] ?? 'LOCAL_GOVERNANCE_MODEL_INCOMPATIBLE';
    permissionChecks.push(
      checkResult(
        'Constitutional standing',
        'warning',
        'This local governance context requires constitutional review.',
        reasonCode,
        'Constitutional Governance',
        chainStanding.reasonSeverity,
      ),
    );
  } else {
    permissionChecks.push(
      checkResult('Constitutional standing', 'passed', 'Local governance standing is compliant in the current registry view.', null, 'Constitutional Governance'),
    );
  }

  if (action === 'vote') {
    if (!chain?.capabilities?.voting) {
      permissionChecks.push(checkResult('Voting capability', 'blocked', 'Voting capability is not enabled for this chain.', 'VOTING_POWER_SOURCE_NOT_VERIFIED', 'chain capability'));
    } else {
      permissionChecks.push(checkResult('Voting capability', 'passed', 'Voting capability is enabled.', null, 'chain capability'));
    }
  }

  if (action === 'execute') {
    const spokeRequiresRemoteExecution = chain?.roles?.includes('spoke') && !chain?.capabilities?.remoteExecution;
    if (spokeRequiresRemoteExecution) {
      permissionChecks.push(
        checkResult('Execution capability', 'blocked', 'Remote execution is not enabled for this spoke chain.', 'REMOTE_EXECUTION_GUARDRAIL_ACTIVE', 'chain capability'),
      );
    } else {
      permissionChecks.push(checkResult('Execution capability', 'passed', 'Execution capability is allowed for this chain role.', null, 'chain capability'));
    }
  }

  const pluginCapability = getPluginCapability(chain, operation.pluginType);
  const pluginStanding = getConstitutionalStanding(pluginCapability);

  if (!operation.pluginType) {
    permissionChecks.push(checkResult('Plugin capability', 'blocked', 'Proposal plugin type is not indexed yet.', 'PLUGIN_CAPABILITY_NOT_REGISTERED', 'plugin capability'));
  } else if (!hasPluginCapability(chain, operation.pluginType)) {
    permissionChecks.push(
      checkResult('Plugin capability', 'blocked', `${operation.pluginType} is not enabled in this chain registry entry.`, 'PLUGIN_CAPABILITY_NOT_REGISTERED', 'plugin capability'),
    );
  } else if (!pluginActionEnabled(pluginCapability, action)) {
    permissionChecks.push(
      checkResult(
        'Plugin capability',
        'blocked',
        `${operation.pluginType} does not allow ${action} through the chain registry policy.`,
        'PLUGIN_CAPABILITY_NOT_REGISTERED',
        'plugin capability',
      ),
    );
  } else if (pluginStanding?.status === 'restricted' || pluginStanding?.status === 'incompatible') {
    const reasonCode = pluginStanding.reasonCodes?.[0] ?? 'LOCAL_GOVERNANCE_MODEL_INCOMPATIBLE';
    permissionChecks.push(
      checkResult(
        'Plugin constitutional standing',
        'blocked',
        `${operation.pluginType} has restricted constitutional standing for this governance context.`,
        reasonCode,
        'Local Governance',
        pluginStanding.reasonSeverity,
      ),
    );
  } else if (pluginStanding?.status === 'under-review' || pluginStanding?.status === 'requires-review') {
    const reasonCode = pluginStanding.reasonCodes?.[0] ?? 'LOCAL_GOVERNANCE_MODEL_INCOMPATIBLE';
    permissionChecks.push(
      checkResult(
        'Plugin constitutional standing',
        'warning',
        `${operation.pluginType} requires constitutional review before full execution confidence.`,
        reasonCode,
        'Local Governance',
        pluginStanding.reasonSeverity,
      ),
    );
  } else {
    const strategy = pluginCapability?.votingPowerStrategy ? ` using ${pluginCapability.votingPowerStrategy}` : '';
    permissionChecks.push(checkResult('Plugin capability', 'passed', `${operation.pluginType} is enabled for ${action}${strategy}.`, null, 'plugin capability'));
  }

  if (pluginCapability?.requiresIndexer && chain?.indexingStatus?.status === 'notConfigured') {
    permissionChecks.push(
      checkResult(
        'Indexer readiness',
        'warning',
        'Indexer RPC is not configured for this chain; wallet submission can proceed but reconciliation may be delayed.',
        chain.indexingStatus.reasonCode ?? 'INDEXER_STATE_NOT_READY',
        'indexer readiness',
      ),
    );
  } else if (pluginCapability?.requiresIndexer && chain?.indexingStatus?.status === 'disabled') {
    permissionChecks.push(
      checkResult(
        'Indexer readiness',
        'warning',
        'Indexer is disabled for this chain; execution receipts may remain local until indexing is enabled.',
        chain.indexingStatus.reasonCode ?? 'INDEXER_STATE_NOT_READY',
        'indexer readiness',
      ),
    );
  } else if (pluginCapability?.requiresIndexer) {
    permissionChecks.push(checkResult('Indexer readiness', 'passed', 'Indexer is configured for this chain.', null, 'indexer readiness'));
  }

  permissionChecks.push(...lifecycleChecks({ proposal, action, now }));

  const blockingCheck = permissionChecks.find((check) => check.status === 'blocked');
  if (blockingCheck) {
    return blockOperation(operation, blockingCheck.message, permissionChecks);
  }

  return {
    ...operation,
    permissionChecks,
  };
}
