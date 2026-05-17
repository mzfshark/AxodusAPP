import { useCallback, useEffect, useMemo, useState } from 'react';

const storagePrefix = 'axodus.governance.operations';
const maxHistoryEntries = 12;

function storageAvailable() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function proposalHistoryId(proposal) {
  return proposal?.id ?? proposal?.slug ?? proposal?.proposalId ?? proposal?.incrementalId ?? null;
}

function historyKey({ walletAddress, proposal }) {
  const wallet = walletAddress?.toLowerCase();
  const proposalId = proposalHistoryId(proposal);

  if (!wallet || !proposalId) return null;
  return `${storagePrefix}.${wallet}.${proposalId}`;
}

function readHistory(key) {
  if (!key || !storageAvailable()) return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(key, entries) {
  if (!key || !storageAvailable()) return;
  window.localStorage.setItem(key, JSON.stringify(entries.slice(0, maxHistoryEntries)));
}

function formatReceiptNumber(value) {
  if (value === undefined || value === null) return null;
  return typeof value === 'bigint' ? value.toString() : String(value);
}

function buildHistoryEntry({ proposal, walletAddress, transactionState, receiptTracking }) {
  const operation = transactionState?.operation;
  const hash = operation?.hash;

  if (!hash) return null;

  return {
    id: `${operation.action}-${hash}`,
    hash,
    action: operation.action,
    network: operation.network ?? proposal?.network ?? null,
    chainId: operation.request?.chainId ?? receiptTracking?.chainId ?? null,
    proposalId: proposalHistoryId(proposal),
    walletAddress,
    pluginType: operation.pluginType ?? null,
    transactionStatus: transactionState.status,
    receiptStatus: receiptTracking?.status ?? 'idle',
    indexerStatus: receiptTracking?.indexerStatus?.status ?? 'idle',
    indexerProcessed: Boolean(receiptTracking?.indexerStatus?.isProcessed),
    blockNumber: formatReceiptNumber(receiptTracking?.receipt?.blockNumber),
    gasUsed: formatReceiptNumber(receiptTracking?.receipt?.gasUsed),
    message: receiptTracking?.indexerStatus?.message ?? receiptTracking?.message ?? transactionState.message,
    updatedAt: new Date().toISOString(),
  };
}

export function useGovernanceOperationHistory({ proposal, walletAddress, transactionState, receiptTracking } = {}) {
  const key = useMemo(() => historyKey({ walletAddress, proposal }), [proposal, walletAddress]);
  const [entries, setEntries] = useState(() => readHistory(key));

  useEffect(() => {
    setEntries(readHistory(key));
  }, [key]);

  const upsertEntry = useCallback(
    (entry) => {
      if (!key || !entry) return;

      setEntries((current) => {
        const existing = current.find((item) => item.id === entry.id);
        const createdAt = existing?.createdAt ?? entry.updatedAt;
        const nextEntry = { ...existing, ...entry, createdAt };
        const next = [nextEntry, ...current.filter((item) => item.id !== entry.id)].slice(0, maxHistoryEntries);
        writeHistory(key, next);
        return next;
      });
    },
    [key],
  );

  const clearEntries = useCallback(() => {
    if (!key) return;
    writeHistory(key, []);
    setEntries([]);
  }, [key]);

  useEffect(() => {
    const entry = buildHistoryEntry({ proposal, walletAddress, transactionState, receiptTracking });
    upsertEntry(entry);
  }, [proposal, receiptTracking, transactionState, upsertEntry, walletAddress]);

  return {
    entries,
    clearEntries,
  };
}
