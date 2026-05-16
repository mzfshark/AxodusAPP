import { GovernanceStandingSummary } from './GovernanceStanding';
import RegistryGuardrailsPanel from './RegistryGuardrailsPanel';

function DetailField({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
      <div className="text-xs font-bold uppercase text-slate-500">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-on-surface">{value ?? 'Not indexed'}</div>
    </div>
  );
}

function capabilityLabel(value) {
  return value ? 'Enabled' : 'Unavailable';
}

export default function ProposalGovernanceContextPanel({ chain, registryGuardrailReasons = [] }) {
  return (
    <aside className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="border-b border-white/5 px-5 py-4">
        <h2 className="text-lg font-bold text-on-surface">Governance Context</h2>
        <p className="mt-1 text-xs text-on-surface-variant">Registry-rendered governance standing and capability view for this proposal.</p>
      </div>
      <div className="space-y-3 p-5">
        <GovernanceStandingSummary chain={chain} />
        <DetailField label="Chain role" value={chain?.roles?.join(', ') ?? 'Not registered'} />
        <DetailField label="Governance" value={capabilityLabel(chain?.capabilities?.governance)} />
        <DetailField label="Voting" value={capabilityLabel(chain?.capabilities?.voting)} />
        <DetailField label="Remote execution" value={capabilityLabel(chain?.capabilities?.remoteExecution)} />
        <DetailField label="Local governance models" value={chain?.capabilities?.localGovernanceModels?.join(', ') ?? 'Not indexed'} />
        <DetailField label="Indexer reason code" value={chain?.indexingStatus?.reasonCode ?? 'No active guardrail reason'} />
        <RegistryGuardrailsPanel reasons={registryGuardrailReasons} />
      </div>
    </aside>
  );
}
