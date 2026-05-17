import { GuardrailReasonCode } from './GovernanceStanding';

export default function PermissionCheckList({ checks = [] }) {
  if (!checks.length) return null;

  const statusClass = {
    passed: 'border-emerald-300/20 bg-emerald-950/20 text-emerald-100',
    warning: 'border-amber-300/20 bg-amber-950/20 text-amber-100',
    blocked: 'border-red-300/20 bg-red-950/20 text-red-100',
  };

  return (
    <div className="mt-4 space-y-2">
      {checks.map((check) => (
        <div
          key={`${check.label}-${check.reasonCode ?? check.message}`}
          className={`rounded-lg border px-3 py-2 text-xs ${statusClass[check.status] ?? 'border-white/10 bg-surface-container-high text-on-surface-variant'}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-black uppercase">{check.label}</span>
            {check.source ? <span className="rounded border border-current/20 px-1.5 py-0.5 text-[10px] uppercase opacity-80">{check.source}</span> : null}
          </div>
          <div className="mt-1 leading-5">{check.message}</div>
          <GuardrailReasonCode reasonCode={check.reasonCode} reasonSeverity={check.reasonSeverity} />
        </div>
      ))}
    </div>
  );
}
