function actionTarget(action) {
  return action?.to ?? action?.target ?? action?.address ?? action?.contractAddress ?? 'Not indexed';
}

function actionLabel(action, index) {
  return action?.name ?? action?.functionName ?? action?.method ?? `Action ${index + 1}`;
}

export default function ProposalExecutionActionsPanel({ actions = [] }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="border-b border-white/5 px-5 py-4">
        <h2 className="text-lg font-bold text-on-surface">Execution Actions</h2>
        <p className="mt-1 text-xs text-on-surface-variant">
          Remote execution details will be attached here as the multichain adapter starts indexing receipts.
        </p>
      </div>

      {actions.length > 0 ? (
        <div className="divide-y divide-white/5">
          {actions.map((action, index) => (
            <article key={`${actionTarget(action)}-${index}`} className="px-5 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-sm font-bold text-on-surface">{actionLabel(action, index)}</div>
                  <div className="mt-1 break-words text-xs text-on-surface-variant">{actionTarget(action)}</div>
                </div>
                <span className="w-fit rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                  {action?.value ?? '0'} value
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high text-cyan-200">
            <span className="material-symbols-outlined">receipt_long</span>
          </div>
          <h3 className="mt-4 text-base font-bold text-on-surface">No actions indexed</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-on-surface-variant">
            This proposal may be vote-only, or the backend has not decoded execution actions yet.
          </p>
        </div>
      )}
    </div>
  );
}
