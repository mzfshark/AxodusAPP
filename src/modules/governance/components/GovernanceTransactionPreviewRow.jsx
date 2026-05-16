export default function GovernanceTransactionPreviewRow({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <div className="text-[11px] font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 break-words text-xs font-semibold text-on-surface">{value ?? 'Not available'}</div>
    </div>
  );
}
