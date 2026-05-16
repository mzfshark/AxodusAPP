import ProposalOperationPanel from './ProposalOperationPanel';

function receiptStatus(receipt) {
  return receipt?.status ?? receipt?.state ?? receipt?.executionStatus ?? 'Indexed';
}

function receiptChain(receipt) {
  return receipt?.chainSlug ?? receipt?.network ?? receipt?.chain ?? receipt?.targetChain ?? 'Target chain not indexed';
}

export default function ProposalExecutionReceiptsPanel({ receipts = [] }) {
  return (
    <ProposalOperationPanel
      title="Execution Receipts"
      description="Multichain execution receipts and LayerZero message state will appear here when indexed."
      icon="fact_check"
    >
      {receipts.length > 0 ? (
        <div className="space-y-3">
          {receipts.map((receipt, index) => (
            <div key={`${receiptChain(receipt)}-${index}`} className="rounded-lg border border-white/5 bg-surface-container-high p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-on-surface">{receiptChain(receipt)}</span>
                <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">{receiptStatus(receipt)}</span>
              </div>
              <div className="mt-2 break-words text-xs text-on-surface-variant">
                {receipt?.txHash ?? receipt?.transactionHash ?? receipt?.messageId ?? 'Receipt identifier not indexed'}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-white/10 bg-surface-container-high p-5 text-center">
          <span className="material-symbols-outlined text-3xl text-cyan-200">hub</span>
          <p className="mt-3 text-sm font-bold text-on-surface">No execution receipts indexed</p>
          <p className="mt-2 text-xs leading-5 text-on-surface-variant">This proposal has no remote execution state in the current backend payload.</p>
        </div>
      )}
    </ProposalOperationPanel>
  );
}
