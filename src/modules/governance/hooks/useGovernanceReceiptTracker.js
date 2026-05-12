import { useEffect, useMemo, useState } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { fetchGovernanceTransactionIndexingStatus } from '../api/governanceClient';

const indexCheckTypes = {
  vote: 'proposalVote',
  execute: 'proposalExecute',
};

const initialIndexerStatus = {
  status: 'idle',
  isProcessed: false,
  data: null,
  error: null,
  message: 'No confirmed transaction to reconcile.',
};

function receiptFinality(receipt) {
  if (!receipt) return null;
  return receipt.status === 'success' ? 'confirmed' : 'reverted';
}

export function useGovernanceReceiptTracker({ transactionState } = {}) {
  const hash = transactionState?.operation?.hash;
  const chainId = transactionState?.operation?.request?.chainId;
  const network = transactionState?.operation?.network;
  const action = transactionState?.operation?.action;
  const indexCheckType = indexCheckTypes[action];
  const [indexerStatus, setIndexerStatus] = useState(initialIndexerStatus);

  const receiptQuery = useWaitForTransactionReceipt({
    hash,
    chainId,
    query: {
      enabled: Boolean(hash && chainId),
    },
  });

  useEffect(() => {
    const finality = receiptFinality(receiptQuery.data);

    if (!hash || !network || !indexCheckType || finality !== 'confirmed') {
      setIndexerStatus(initialIndexerStatus);
      return undefined;
    }

    const controller = new AbortController();

    async function reconcile() {
      setIndexerStatus((current) => ({
        ...current,
        status: current.status === 'processed' ? 'processed' : 'checking',
        message: current.status === 'processed' ? current.message : 'Checking governance indexer state.',
      }));

      try {
        const data = await fetchGovernanceTransactionIndexingStatus({
          network,
          txHash: hash,
          type: indexCheckType,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setIndexerStatus({
          status: data?.isProcessed ? 'processed' : 'pending',
          isProcessed: Boolean(data?.isProcessed),
          data,
          error: null,
          message: data?.isProcessed
            ? 'Transaction has been processed by the governance indexer.'
            : 'Transaction is confirmed on-chain but not indexed yet.',
        });

        if (data?.isProcessed && intervalId) {
          clearInterval(intervalId);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        setIndexerStatus({
          status: 'error',
          isProcessed: false,
          data: null,
          error,
          message: error?.message ?? 'Governance indexer reconciliation failed.',
        });
      }
    }

    const intervalId = setInterval(reconcile, 5000);
    reconcile();

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [hash, indexCheckType, network, receiptQuery.data]);

  return useMemo(() => {
    if (!hash || !chainId) {
      return {
        status: 'idle',
        hash: null,
        chainId: null,
        receipt: null,
        indexerStatus,
        error: null,
        message: 'No transaction submitted.',
      };
    }

    if (receiptQuery.isError) {
      return {
        status: 'error',
        hash,
        chainId,
        receipt: null,
        indexerStatus,
        error: receiptQuery.error,
        message: receiptQuery.error?.message ?? 'Transaction receipt lookup failed.',
      };
    }

    const finality = receiptFinality(receiptQuery.data);

    if (finality) {
      return {
        status: finality,
        hash,
        chainId,
        receipt: receiptQuery.data,
        indexerStatus,
        error: null,
        message: finality === 'confirmed' ? 'Transaction confirmed on-chain.' : 'Transaction reverted on-chain.',
      };
    }

    return {
      status: 'confirming',
      hash,
      chainId,
      receipt: null,
      indexerStatus,
      error: null,
      message: 'Transaction submitted. Waiting for on-chain receipt.',
    };
  }, [chainId, hash, indexerStatus, receiptQuery.data, receiptQuery.error, receiptQuery.isError]);
}
