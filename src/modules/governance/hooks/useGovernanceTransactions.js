import { useCallback, useMemo, useState } from 'react';
import { applyGovernanceActionGuards } from '../transactions/governanceActionGuards';
import { createGovernanceTransactionAdapter } from '../transactions/governanceTransactionAdapter';
import { useGovernanceOperationHistory } from './useGovernanceOperationHistory';
import { useGovernanceReceiptTracker } from './useGovernanceReceiptTracker';
import { useGovernanceWalletWriter } from './useGovernanceWalletWriter';

const initialState = {
  status: 'idle',
  message: null,
  operation: null,
};

export function useGovernanceTransactions({ proposal, chain, walletAddress, actions }) {
  const [selectedVoteOption, setSelectedVoteOption] = useState('yes');
  const [transactionState, setTransactionState] = useState(initialState);
  const { isPending, isSwitching, submitOperation, switchToOperationChain } = useGovernanceWalletWriter({
    currentChainId: chain?.currentWalletChainId,
  });
  const receiptTracking = useGovernanceReceiptTracker({ transactionState });
  const operationHistory = useGovernanceOperationHistory({
    proposal,
    walletAddress,
    transactionState,
    receiptTracking,
  });

  const adapter = useMemo(
    () =>
      createGovernanceTransactionAdapter({
        proposal,
        chain,
        walletAddress,
        actions,
      }),
    [actions, chain, proposal, walletAddress],
  );

  const withWalletChainGuard = useCallback((operation) => {
    if (!operation?.request || !operation.canSubmit) return operation;

    if (chain?.currentWalletChainId !== operation.request.chainId) {
      return {
        ...operation,
        canSubmit: false,
        status: 'wrongChain',
        reason: `Switch wallet from chain ${chain?.currentWalletChainId ?? 'unknown'} to chain ${operation.request.chainId} before submitting.`,
      };
    }

    return operation;
  }, [chain?.currentWalletChainId]);

  const voteOperation = useMemo(
    () =>
      withWalletChainGuard(
        applyGovernanceActionGuards({
          operation: adapter.vote(selectedVoteOption),
          proposal,
          chain,
          walletAddress,
        }),
      ),
    [adapter, chain, proposal, selectedVoteOption, walletAddress, withWalletChainGuard],
  );
  const executeOperation = useMemo(
    () =>
      withWalletChainGuard(
        applyGovernanceActionGuards({
          operation: adapter.execute(),
          proposal,
          chain,
          walletAddress,
        }),
      ),
    [adapter, chain, proposal, walletAddress, withWalletChainGuard],
  );

  async function submitVote() {
    setTransactionState({
      status: voteOperation.canSubmit ? 'submitting' : 'blocked',
      message: voteOperation.reason,
      operation: voteOperation,
    });

    if (!voteOperation.canSubmit) return voteOperation;

    try {
      const result = await submitOperation(voteOperation);
      setTransactionState({
        status: 'submitted',
        message: `Vote transaction submitted: ${result.hash}`,
        operation: { ...voteOperation, hash: result.hash },
      });
      return result;
    } catch (error) {
      setTransactionState({
        status: 'error',
        message: error?.message ?? 'Vote transaction failed before submission.',
        operation: voteOperation,
      });
      return null;
    }
  }

  async function submitExecute() {
    setTransactionState({
      status: executeOperation.canSubmit ? 'submitting' : 'blocked',
      message: executeOperation.reason,
      operation: executeOperation,
    });

    if (!executeOperation.canSubmit) return executeOperation;

    try {
      const result = await submitOperation(executeOperation);
      setTransactionState({
        status: 'submitted',
        message: `Execution transaction submitted: ${result.hash}`,
        operation: { ...executeOperation, hash: result.hash },
      });
      return result;
    } catch (error) {
      setTransactionState({
        status: 'error',
        message: error?.message ?? 'Execution transaction failed before submission.',
        operation: executeOperation,
      });
      return null;
    }
  }

  async function switchVoteChain() {
    setTransactionState({
      status: 'switchingChain',
      message: voteOperation.reason,
      operation: voteOperation,
    });

    try {
      const result = await switchToOperationChain(voteOperation);
      setTransactionState({
        status: 'chainSwitchRequested',
        message: `Wallet switched to chain ${result.chainId}.`,
        operation: voteOperation,
      });
      return result;
    } catch (error) {
      setTransactionState({
        status: 'error',
        message: error?.message ?? 'Wallet network switch failed.',
        operation: voteOperation,
      });
      return null;
    }
  }

  async function switchExecuteChain() {
    setTransactionState({
      status: 'switchingChain',
      message: executeOperation.reason,
      operation: executeOperation,
    });

    try {
      const result = await switchToOperationChain(executeOperation);
      setTransactionState({
        status: 'chainSwitchRequested',
        message: `Wallet switched to chain ${result.chainId}.`,
        operation: executeOperation,
      });
      return result;
    } catch (error) {
      setTransactionState({
        status: 'error',
        message: error?.message ?? 'Wallet network switch failed.',
        operation: executeOperation,
      });
      return null;
    }
  }

  return {
    selectedVoteOption,
    setSelectedVoteOption,
    voteOperation,
    executeOperation,
    transactionState,
    receiptTracking,
    operationHistory,
    isSubmitting: isPending || transactionState.status === 'submitting',
    isSwitching,
    submitVote,
    submitExecute,
    switchVoteChain,
    switchExecuteChain,
  };
}
