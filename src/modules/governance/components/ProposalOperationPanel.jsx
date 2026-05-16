export default function ProposalOperationPanel({ title, description, icon, children }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="flex items-start gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-cyan-200">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-on-surface">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
