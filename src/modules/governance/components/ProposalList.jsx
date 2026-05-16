import { Link } from 'react-router-dom';
import { getProposalDescription, getProposalRouteId, getProposalStatus, getProposalTitle } from '../utils/proposals';

export default function ProposalList({ proposals, selectedDao, canCreateProposal }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Proposals</h2>
          <p className="text-xs text-on-surface-variant">
            {selectedDao?.isVirtual
              ? 'Federal proposal flow is not deployed yet.'
              : `Proposal activity for ${selectedDao?.name ?? 'selected DAO'}.`}
          </p>
        </div>
        <button
          type="button"
          disabled={!canCreateProposal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-black text-on-primary disabled:cursor-not-allowed disabled:bg-surface-container-high disabled:text-slate-500"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Create proposal
        </button>
      </div>

      {proposals.length > 0 ? (
        <div className="divide-y divide-white/5">
          {proposals.map((proposal) => {
            const proposalRouteId = getProposalRouteId(proposal);
            const content = (
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-sm font-bold text-on-surface">{getProposalTitle(proposal)}</div>
                  <div className="mt-1 text-xs text-on-surface-variant">{getProposalDescription(proposal)}</div>
                </div>
                <span className="w-fit rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                  {getProposalStatus(proposal)}
                </span>
                {proposal.dataSource === 'dev-mock' ? (
                  <span className="w-fit rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2 py-1 text-[11px] font-black uppercase text-cyan-100">
                    Dev mock
                  </span>
                ) : null}
              </div>
            );

            return (
              <article key={proposalRouteId ?? proposal.proposalIndex} className="px-5 py-4 transition-colors hover:bg-white/[0.03]">
                {proposalRouteId ? (
                  <Link to={`/governance/proposals/${encodeURIComponent(proposalRouteId)}`} className="block">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high text-cyan-200">
            <span className="material-symbols-outlined">ballot</span>
          </div>
          <h3 className="mt-4 text-base font-bold text-on-surface">No proposals available</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-on-surface-variant">
            Proposal data will appear here after a deployed Axodus DAO or sub-DAO is indexed by the governance backend.
          </p>
        </div>
      )}
    </section>
  );
}
