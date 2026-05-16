import { GuardrailReasonCode } from './GovernanceStanding';

export default function RegistryGuardrailsPanel({ reasons = [] }) {
  if (!reasons.length) {
    return (
      <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
        <div className="text-xs font-bold uppercase text-slate-500">Registry guardrails</div>
        <div className="mt-2 break-words text-sm font-semibold text-on-surface">No active registry guardrail reasons</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
      <div className="text-xs font-bold uppercase text-slate-500">Registry guardrails</div>
      <div className="mt-3 space-y-3">
        {reasons.map((reason, index) => (
          <div key={`${reason.reasonCode}-${reason.scope ?? 'scope'}-${index}`} className="rounded-lg border border-white/5 bg-surface-container px-3 py-2">
            <div className="flex flex-wrap items-center gap-2">
              {reason.source ? <span className="rounded border border-current/20 px-1.5 py-0.5 text-[10px] font-black uppercase opacity-80">{reason.source}</span> : null}
              {reason.scope ? <span className="text-[11px] font-semibold text-on-surface-variant">{reason.scope}</span> : null}
            </div>
            <GuardrailReasonCode reasonCode={reason.reasonCode} reasonSeverity={reason.reasonSeverity} />
          </div>
        ))}
      </div>
    </div>
  );
}
