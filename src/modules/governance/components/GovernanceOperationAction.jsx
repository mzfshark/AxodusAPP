function OperationActionButton({ icon, disabled, onClick, variant = 'primary', children }) {
  const variantClass =
    variant === 'secondary'
      ? 'border border-cyan-300/30 bg-cyan-950/30 text-cyan-100 disabled:border-white/5 disabled:bg-surface-container-high disabled:text-slate-500'
      : 'bg-primary text-on-primary disabled:bg-surface-container-high disabled:text-slate-500';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-black disabled:cursor-not-allowed ${variantClass}`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      {children}
    </button>
  );
}

export default function GovernanceOperationAction({ operation, submitLabel, submittingLabel, onSubmit, onSwitchChain, isSubmitting, isSwitching, icon }) {
  if (operation.status === 'wrongChain') {
    return (
      <OperationActionButton icon="sync_alt" disabled={isSwitching} onClick={onSwitchChain} variant="secondary">
        {isSwitching ? 'Switching network' : 'Switch network'}
      </OperationActionButton>
    );
  }

  return (
    <OperationActionButton icon={icon} disabled={!operation.canSubmit || isSubmitting} onClick={onSubmit}>
      {isSubmitting ? submittingLabel : submitLabel}
    </OperationActionButton>
  );
}
