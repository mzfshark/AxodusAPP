import BbaBadge from './BbaBadge';
import { getBbaClient } from '../services/bbaService';

export default function ProposalPipeline({ proposals }) {
  return (
    <section className="rounded-lg border border-white/10 bg-surface-container-low p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-on-surface">Proposal Pipeline</h2>
        <p className="mt-1 text-sm text-outline">Planning requests before execution. Treasury and governance reviews remain explicit.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {proposals.map((proposal) => (
          <article key={proposal.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
            <BbaBadge value={proposal.status} />
            <h3 className="mt-3 font-bold text-on-surface">{proposal.title}</h3>
            <p className="mt-2 text-sm text-outline">{getBbaClient(proposal.clientId)?.name}</p>
            <p className="mt-3 text-sm leading-6 text-outline">{proposal.scope}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <BbaBadge value={proposal.publicReputationRisk} label="Risk" />
              {proposal.treasuryReviewRequired && <BbaBadge value="under-review" label="Treasury" />}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
