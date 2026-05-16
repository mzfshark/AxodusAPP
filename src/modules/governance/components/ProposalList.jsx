import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import {
  formatProposalDate,
  getProposalDescription,
  getProposalNetwork,
  getProposalPluginType,
  getProposalRouteId,
  getProposalStatus,
  getProposalTitle,
} from '../utils/proposals';

function proposalMatchesQuery(proposal, query) {
  if (!query) return true;

  const haystack = [
    getProposalTitle(proposal),
    getProposalDescription(proposal),
    getProposalNetwork(proposal),
    getProposalPluginType(proposal),
    getProposalStatus(proposal),
    proposal?.id,
    proposal?.proposalId,
    proposal?.proposalIndex,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function ProposalMeta({ label, value }) {
  return (
    <div className="rounded-md bg-surface-container-high px-3 py-2">
      <div className="text-[10px] font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 break-words text-xs font-semibold text-on-surface">{value}</div>
    </div>
  );
}

export default function ProposalList({ proposals, selectedDao, canCreateProposal }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = useMemo(() => {
    const statuses = Array.from(new Set(proposals.map((proposal) => getProposalStatus(proposal)).filter(Boolean)));
    return ['all', ...statuses];
  }, [proposals]);

  const filteredProposals = useMemo(
    () =>
      proposals.filter((proposal) => {
        const statusMatches = statusFilter === 'all' || getProposalStatus(proposal) === statusFilter;
        return statusMatches && proposalMatchesQuery(proposal, query);
      }),
    [proposals, query, statusFilter],
  );

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
        <div className="border-b border-white/5 px-5 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block lg:min-w-80">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-500">
                search
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search proposals, networks, plugins"
                className="w-full rounded-lg border border-white/10 bg-surface-container-high py-2 pl-10 pr-3 text-sm font-semibold text-on-surface outline-none placeholder:text-slate-500 focus:border-cyan-300/40"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-black uppercase ${
                    statusFilter === status
                      ? 'border-cyan-300/30 bg-cyan-950/30 text-cyan-100'
                      : 'border-white/10 text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 text-xs text-on-surface-variant">
            Showing {filteredProposals.length} of {proposals.length} proposals from indexed or development data.
          </div>
        </div>
      ) : null}

      {filteredProposals.length > 0 ? (
        <div className="divide-y divide-white/5">
          {filteredProposals.map((proposal) => {
            const proposalRouteId = getProposalRouteId(proposal);
            const content = (
              <div className="grid gap-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-on-surface">{getProposalTitle(proposal)}</div>
                    <div className="mt-1 text-xs leading-5 text-on-surface-variant">{getProposalDescription(proposal)}</div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
                    <span className="w-fit rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                      {getProposalStatus(proposal)}
                    </span>
                    {proposal.dataSource === 'dev-mock' ? (
                      <span className="w-fit rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2 py-1 text-[11px] font-black uppercase text-cyan-100">
                        Dev mock
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-4">
                  <ProposalMeta label="Network" value={getProposalNetwork(proposal)} />
                  <ProposalMeta label="Plugin" value={getProposalPluginType(proposal)} />
                  <ProposalMeta label="Start" value={formatProposalDate(proposal?.startDate ?? proposal?.startAt)} />
                  <ProposalMeta label="End" value={formatProposalDate(proposal?.endDate ?? proposal?.endAt)} />
                </div>
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
      ) : proposals.length > 0 ? (
        <div className="px-5 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high text-cyan-200">
            <span className="material-symbols-outlined">filter_alt_off</span>
          </div>
          <h3 className="mt-4 text-base font-bold text-on-surface">No proposals match the current filters</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-on-surface-variant">
            Adjust the search text or status filter to inspect another proposal set.
          </p>
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
