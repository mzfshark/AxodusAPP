import GovernanceTransactionPreviewRow from './GovernanceTransactionPreviewRow';
import { formatOperationTarget, formatReceiptValue } from '../utils/proposals';

function PreparedOperationPreview({ title, operation, icon }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container text-cyan-200">
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-black text-on-surface">{title}</h3>
            <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
              {operation?.status ?? 'Not prepared'}
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-on-surface-variant">{operation?.reason ?? 'No adapter reason available.'}</p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <GovernanceTransactionPreviewRow label="Action" value={operation?.action} />
            <GovernanceTransactionPreviewRow label="Plugin type" value={operation?.pluginType} />
            <GovernanceTransactionPreviewRow label="Network" value={operation?.network} />
            <GovernanceTransactionPreviewRow label="Target" value={formatOperationTarget(operation)} />
            <GovernanceTransactionPreviewRow label="Contract" value={operation?.request?.address} />
            <GovernanceTransactionPreviewRow label="Function" value={operation?.request?.functionName} />
          </div>
          <div className="mt-3 rounded-lg border border-white/5 bg-surface-container p-3">
            <div className="text-[11px] font-black uppercase text-slate-500">Prepared calldata</div>
            <p className="mt-2 max-h-24 overflow-y-auto break-words font-mono text-[11px] leading-5 text-on-surface-variant">
              {operation?.request?.data ?? 'No calldata generated.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TransactionAdapterStatePanel({ voteOperation, executeOperation, transactionState, receiptTracking }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="border-b border-white/5 px-5 py-4">
        <h2 className="text-lg font-bold text-on-surface">Transaction Adapter State</h2>
        <p className="mt-1 text-xs leading-5 text-on-surface-variant">
          Prepared wallet calls, latest local submission state and indexer reconciliation view.
        </p>
      </div>
      <div className="grid gap-4 p-5 xl:grid-cols-2">
        <PreparedOperationPreview title="Prepared vote operation" operation={voteOperation} icon="how_to_vote" />
        <PreparedOperationPreview title="Prepared execution operation" operation={executeOperation} icon="play_arrow" />
      </div>
      <div className="grid gap-4 border-t border-white/5 p-5 lg:grid-cols-3">
        <GovernanceTransactionPreviewRow label="Wallet transaction state" value={transactionState.status} />
        <GovernanceTransactionPreviewRow label="Wallet transaction message" value={transactionState.message ?? 'No local transaction submitted in this session.'} />
        <GovernanceTransactionPreviewRow label="Wallet receipt tracking" value={receiptTracking.status} />
        <GovernanceTransactionPreviewRow label="Receipt hash" value={receiptTracking.hash} />
        <GovernanceTransactionPreviewRow label="Receipt block" value={formatReceiptValue(receiptTracking.receipt?.blockNumber)} />
        <GovernanceTransactionPreviewRow label="Gas used" value={formatReceiptValue(receiptTracking.receipt?.gasUsed)} />
        <div className="lg:col-span-3">
          <GovernanceTransactionPreviewRow
            label="Indexer reconciliation"
            value={`${receiptTracking.indexerStatus?.status ?? 'idle'} · ${receiptTracking.indexerStatus?.message ?? 'Indexer reconciliation not started.'}`}
          />
        </div>
      </div>
    </section>
  );
}
