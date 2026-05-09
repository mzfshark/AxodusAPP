function checkResult(label, status, message) {
  return { label, status, message };
}

function blockOperation(operation, reason, permissionChecks) {
  return {
    ...operation,
    status: 'blocked',
    canSubmit: false,
    reason,
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
    checks.push(checkResult('Proposal lifecycle', 'blocked', 'Proposal is already executed.'));
    return checks;
  }

  const { start, end } = proposalWindow(proposal);

  if (action === 'vote') {
    if (start && now < start) {
      checks.push(checkResult('Proposal lifecycle', 'blocked', 'Voting has not started yet.'));
      return checks;
    }

    if (end && now > end) {
      checks.push(checkResult('Proposal lifecycle', 'blocked', 'Voting period is already closed.'));
      return checks;
    }

    checks.push(checkResult('Proposal lifecycle', 'passed', 'Proposal is available for voting based on indexed timing.'));
    return checks;
  }

  if (action === 'execute') {
    if (end && now < end) {
      checks.push(checkResult('Proposal lifecycle', 'warning', 'Voting period has not ended according to indexed timing.'));
      return checks;
    }

    checks.push(checkResult('Proposal lifecycle', 'passed', 'Proposal is not marked as executed.'));
  }

  return checks;
}

export function applyGovernanceActionGuards({ operation, proposal, chain, walletAddress, now = new Date() }) {
  if (!operation) return operation;

  const permissionChecks = [];
  const action = operation.action;

  if (!walletAddress) {
    permissionChecks.push(checkResult('Wallet', 'blocked', 'Wallet connection is required.'));
  } else {
    permissionChecks.push(checkResult('Wallet', 'passed', 'Wallet is connected.'));
  }

  if (!chain?.capabilities?.governance) {
    permissionChecks.push(checkResult('Governance capability', 'blocked', 'Governance capability is not enabled for this chain.'));
  } else {
    permissionChecks.push(checkResult('Governance capability', 'passed', 'Governance capability is enabled.'));
  }

  if (action === 'vote') {
    if (!chain?.capabilities?.voting) {
      permissionChecks.push(checkResult('Voting capability', 'blocked', 'Voting capability is not enabled for this chain.'));
    } else {
      permissionChecks.push(checkResult('Voting capability', 'passed', 'Voting capability is enabled.'));
    }
  }

  if (action === 'execute') {
    const spokeRequiresRemoteExecution = chain?.roles?.includes('spoke') && !chain?.capabilities?.remoteExecution;
    if (spokeRequiresRemoteExecution) {
      permissionChecks.push(checkResult('Execution capability', 'blocked', 'Remote execution is not enabled for this spoke chain.'));
    } else {
      permissionChecks.push(checkResult('Execution capability', 'passed', 'Execution capability is compatible with this chain role.'));
    }
  }

  const pluginCapability = getPluginCapability(chain, operation.pluginType);

  if (!operation.pluginType) {
    permissionChecks.push(checkResult('Plugin capability', 'blocked', 'Proposal plugin type is not indexed yet.'));
  } else if (!hasPluginCapability(chain, operation.pluginType)) {
    permissionChecks.push(checkResult('Plugin capability', 'blocked', `${operation.pluginType} is not enabled in this chain registry entry.`));
  } else if (!pluginActionEnabled(pluginCapability, action)) {
    permissionChecks.push(
      checkResult('Plugin capability', 'blocked', `${operation.pluginType} does not allow ${action} through the chain registry policy.`),
    );
  } else {
    const strategy = pluginCapability?.votingPowerStrategy ? ` using ${pluginCapability.votingPowerStrategy}` : '';
    permissionChecks.push(checkResult('Plugin capability', 'passed', `${operation.pluginType} is enabled for ${action}${strategy}.`));
  }

  if (pluginCapability?.requiresIndexer && chain?.indexingStatus?.status === 'notConfigured') {
    permissionChecks.push(
      checkResult('Indexer readiness', 'warning', 'Indexer RPC is not configured for this chain; wallet submission can proceed but reconciliation may be delayed.'),
    );
  } else if (pluginCapability?.requiresIndexer && chain?.indexingStatus?.status === 'disabled') {
    permissionChecks.push(
      checkResult('Indexer readiness', 'warning', 'Indexer is disabled for this chain; execution receipts may remain local until indexing is enabled.'),
    );
  } else if (pluginCapability?.requiresIndexer) {
    permissionChecks.push(checkResult('Indexer readiness', 'passed', 'Indexer is configured for this chain.'));
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
