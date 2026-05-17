import { getProposalNetwork, getProposalPluginType, getProposalStatus } from '../utils/proposals';

function OperationalStateTile({ label, value, detail, icon, tone = 'neutral' }) {
  const toneClass = {
    neutral: 'border-white/5 bg-surface-container-high text-slate-300',
    active: 'border-cyan-300/20 bg-cyan-950/20 text-cyan-100',
    warning: 'border-amber-300/20 bg-amber-950/20 text-amber-100',
    blocked: 'border-red-300/20 bg-red-950/20 text-red-100',
  };

  return (
    <div className={`rounded-lg border p-4 ${toneClass[tone] ?? toneClass.neutral}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/15">
          <span className="material-symbols-outlined text-[19px]">{icon}</span>
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase opacity-80">{label}</div>
          <div className="mt-1 break-words text-sm font-black">{value}</div>
          {detail ? <p className="mt-2 text-xs leading-5 opacity-80">{detail}</p> : null}
        </div>
      </div>
    </div>
  );
}

function operationTone(operation) {
  if (operation?.canSubmit) return 'active';
  if (operation?.status === 'wrongChain') return 'warning';
  if (operation?.status === 'blocked') return 'blocked';
  return 'neutral';
}

export default function ProposalOperationalSummary({ proposal, chain, voteOperation, executeOperation, receipts, guardrailReasons, decodedActions }) {
  const network = chain?.name ?? getProposalNetwork(proposal);
  const pluginType = getProposalPluginType(proposal);

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="border-b border-white/5 px-5 py-4">
        <h2 className="text-lg font-bold text-on-surface">Operational State</h2>
        <p className="mt-1 text-xs leading-5 text-on-surface-variant">
          Registry, adapter and indexer state rendered for operator visibility. Enforcement remains outside the frontend.
        </p>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
        <OperationalStateTile
          label="Governance surface"
          value={network}
          detail={`Plugin: ${pluginType}`}
          icon="account_tree"
          tone={proposal?.dataSource === 'dev-mock' ? 'warning' : 'active'}
        />
        <OperationalStateTile
          label="Voting adapter"
          value={voteOperation?.status ?? 'Not prepared'}
          detail={voteOperation?.reason}
          icon="how_to_vote"
          tone={operationTone(voteOperation)}
        />
        <OperationalStateTile
          label="Execution adapter"
          value={executeOperation?.status ?? 'Not prepared'}
          detail={executeOperation?.reason}
          icon="bolt"
          tone={operationTone(executeOperation)}
        />
        <OperationalStateTile
          label="Guardrail reasons"
          value={guardrailReasons.length ? `${guardrailReasons.length} active` : 'No active reasons'}
          detail={guardrailReasons[0]?.reasonCode ?? 'No registry guardrail reason for the selected context.'}
          icon="policy"
          tone={guardrailReasons.length ? 'warning' : 'active'}
        />
        <OperationalStateTile
          label="Indexed receipts"
          value={receipts.length ? `${receipts.length} receipt${receipts.length === 1 ? '' : 's'}` : 'No receipts'}
          detail={receipts.length ? 'Execution receipt data is available in the proposal payload.' : 'No execution receipt payload indexed yet.'}
          icon="fact_check"
          tone={receipts.length ? 'active' : 'neutral'}
        />
        <OperationalStateTile
          label="Decoded actions"
          value={decodedActions.length ? `${decodedActions.length} action${decodedActions.length === 1 ? '' : 's'}` : 'No actions'}
          detail={decodedActions.length ? 'Execution actions are available for inspection.' : 'This may be a vote-only proposal or undecoded backend state.'}
          icon="receipt_long"
          tone={decodedActions.length ? 'active' : 'neutral'}
        />
        <OperationalStateTile
          label="Proposal source"
          value={proposal?.dataSource === 'dev-mock' ? 'Development mock' : 'Backend/indexer'}
          detail={proposal?.dataSource === 'dev-mock' ? 'Fixture data for local UI validation.' : 'Proposal data returned by governance data sources.'}
          icon="database"
          tone={proposal?.dataSource === 'dev-mock' ? 'warning' : 'active'}
        />
        <OperationalStateTile
          label="Proposal status"
          value={getProposalStatus(proposal)}
          detail="Rendered status from proposal payload."
          icon="timeline"
          tone="neutral"
        />
      </div>
    </section>
  );
}
