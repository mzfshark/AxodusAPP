import { useMemo, useState } from 'react';
import { createGovernanceTransactionAdapter } from '../transactions/governanceTransactionAdapter';

const initialState = {
  status: 'idle',
  message: null,
  operation: null,
};

export function useGovernanceTransactions({ proposal, chain, walletAddress, actions }) {
  const [selectedVoteOption, setSelectedVoteOption] = useState('yes');
  const [transactionState, setTransactionState] = useState(initialState);

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

  const voteOperation = useMemo(() => adapter.vote(selectedVoteOption), [adapter, selectedVoteOption]);
  const executeOperation = useMemo(() => adapter.execute(), [adapter]);

  function prepareVote() {
    setTransactionState({
      status: voteOperation.canSubmit ? 'ready' : 'blocked',
      message: voteOperation.reason,
      operation: voteOperation,
    });
    return voteOperation;
  }

  function prepareExecute() {
    setTransactionState({
      status: executeOperation.canSubmit ? 'ready' : 'blocked',
      message: executeOperation.reason,
      operation: executeOperation,
    });
    return executeOperation;
  }

  return {
    selectedVoteOption,
    setSelectedVoteOption,
    voteOperation,
    executeOperation,
    transactionState,
    prepareVote,
    prepareExecute,
  };
}
