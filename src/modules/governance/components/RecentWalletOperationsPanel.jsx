function formatHistoryTime(value) {
  if (!value) return 'Unknown time';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown time';
  return date.toLocaleString();
}

export default function RecentWalletOperationsPanel({ operationHistory }) {
  if (!operationHistory?.entries?.length) return null;

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Recent Wallet Operations</h2>
          <p className="mt-1 text-xs text-on-surface-variant">
            Local transaction memory for this wallet and proposal while the backend indexer catches up.
          </p>
        </div>
        <button
          type="button"
          onClick={operationHistory.clearEntries}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-black text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
          Clear local history
        </button>
      </div>
      <div className="divide-y divide-white/5">
        {operationHistory.entries.map((entry) => (
          <article key={entry.id} className="px-5 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2 py-1 text-[11px] font-black uppercase text-cyan-100">
                    {entry.action}
                  </span>
                  <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                    receipt: {entry.receiptStatus}
                  </span>
                  <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                    indexer: {entry.indexerStatus}
                  </span>
                </div>
                <p className="mt-2 break-words text-xs text-on-surface-variant">{entry.hash}</p>
                <p className="mt-2 text-xs text-on-surface-variant">{entry.message}</p>
              </div>
              <div className="shrink-0 text-xs text-on-surface-variant lg:text-right">
                <p>{entry.network ?? 'Unknown network'}</p>
                <p className="mt-1">chain {entry.chainId ?? 'unknown'}</p>
                <p className="mt-1">{formatHistoryTime(entry.updatedAt)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
