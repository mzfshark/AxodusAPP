import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import ConstitutionalLayerPanel from './ConstitutionalLayerPanel';
import ProposalCreateDraftModal from './ProposalCreateDraftModal';
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

function GovernanceSourceList({ sources = [] }) {
  if (!sources.length) return null;

  return (
    <div className="mt-3 rounded-lg border border-white/5 bg-surface-container-high p-3">
      <div className="text-[10px] font-black uppercase text-slate-500">Observed governance sources</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {sources.map((source) => (
          <span key={source.key} className="rounded border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
            {source.key}: {source.status}
          </span>
        ))}
      </div>
    </div>
  );
}

function LocalDraftInspection({ proposal }) {
  const request = proposal?.createProposalRequest;
  const reasons = request?.guardrails?.reasonCodes ?? [];
  const receipt = proposal?.submissionReceipt;
  const receiptReasons = receipt?.reasonCodes ?? [];
  const submissionError = proposal?.submissionError;

  if (!request) {
    return (
      <div className="rounded-lg border border-white/5 bg-surface-container-high p-4 text-xs leading-5 text-on-surface-variant">
        No create proposal request preview is attached to this local draft.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-cyan-300/20 bg-cyan-950/10 p-4">
      <div className="mb-3 text-xs font-black uppercase text-cyan-200">Create proposal request preview</div>
      <div className="grid gap-2 md:grid-cols-3">
        <ProposalMeta label="Submission mode" value={request.submissionMode} />
        <ProposalMeta label="DAO" value={request.dao?.name ?? 'Not indexed'} />
        <ProposalMeta label="Chain" value={request.chain?.network ?? 'Not indexed'} />
        <ProposalMeta label="Plugin adapter" value={request.plugin?.createProposalAdapter?.family ?? request.adapterPayload?.adapterFamily ?? 'Not indexed'} />
        <ProposalMeta label="Adapter intent" value={request.plugin?.createProposalAdapter?.executionIntent ?? request.adapterPayload?.executionIntent ?? 'Not indexed'} />
        <ProposalMeta label="Backend adapter" value={request.plugin?.createProposalAdapter?.expectedBackendAdapter ?? request.adapterPayload?.expectedBackendAdapter ?? 'Not indexed'} />
      </div>
      <GovernanceSourceList sources={request.governanceContext?.observedSources ?? []} />
      <div className="mt-3">
        <ConstitutionalLayerPanel
          chain={{
            name: request.chain?.name,
            network: request.chain?.network,
            roles: request.governanceContext?.federationModel?.federationRoles ?? [],
            governanceStatus: request.chain?.governanceStatus,
            federationMember: request.chain?.federationMember,
            federationTier: request.chain?.federationTier,
            constitutionalStanding: request.chain?.constitutionalStanding,
            constitutionalLayer: request.governanceContext?.constitutionalLayer ?? request.chain?.constitutionalLayer,
          }}
          compact
        />
      </div>
      <div className="mt-3 grid gap-2">
        {reasons.map((reason) => (
          <div key={reason.reasonCode} className="rounded-md border border-white/5 bg-surface-container-high px-3 py-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-black text-on-surface">{reason.reasonCode}</span>
              <span className="rounded border border-white/10 px-2 py-0.5 text-[10px] font-black uppercase text-slate-300">{reason.reasonSeverity}</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-on-surface-variant">{reason.message}</p>
          </div>
        ))}
      </div>
      {receipt ? (
        <div className="mt-3 rounded-lg border border-emerald-300/20 bg-emerald-950/10 p-3">
          <div className="text-xs font-black uppercase text-emerald-100">
            {receipt.submissionMode === 'backend' ? 'Backend submission receipt' : 'Mock submission receipt'}
          </div>
          <div className="mt-2 grid gap-2 md:grid-cols-3">
            <ProposalMeta label="Receipt" value={receipt.id} />
            <ProposalMeta label="Status" value={receipt.status} />
            <ProposalMeta label="Indexer" value={receipt.indexerReconciliation?.status ?? 'Not indexed'} />
            <ProposalMeta label="Storage" value={receipt.storageMode ?? receipt.storage?.mode ?? 'Not indexed'} />
            <ProposalMeta label="Source" value={receipt.source ?? receipt.storage?.source ?? 'Not indexed'} />
            <ProposalMeta label="Observed request" value={receipt.indexerReconciliation?.observedRequestId ?? receipt.id ?? 'Not indexed'} />
          </div>
          <p className="mt-2 text-xs leading-5 text-emerald-50">{receipt.message}</p>
          <p className="mt-1 font-mono text-[11px] text-emerald-100">{receipt.indexerReconciliation?.reasonCode}</p>
          {receipt.storage?.message ? <p className="mt-1 text-xs leading-5 text-emerald-100/80">{receipt.storage.message}</p> : null}
          {receiptReasons.length > 0 ? (
            <div className="mt-3 grid gap-2">
              {receiptReasons.map((reason) => (
                <div key={`${receipt.id}-${reason.reasonCode}-${reason.source}`} className="rounded-md border border-emerald-300/10 bg-emerald-950/10 px-3 py-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-black uppercase text-emerald-50">{reason.reasonCode}</span>
                    <span className="rounded border border-emerald-300/20 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-100">
                      {reason.reasonSeverity ?? 'info'}
                    </span>
                  </div>
                  {reason.message ? <p className="mt-1 text-xs leading-5 text-emerald-100/80">{reason.message}</p> : null}
                  {reason.source ? <p className="mt-1 text-[11px] uppercase text-emerald-100/70">{reason.source}</p> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {submissionError ? (
        <div className="mt-3 rounded-lg border border-amber-300/20 bg-amber-950/20 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase text-amber-100">Submission error</span>
            <span className="rounded border border-white/10 px-2 py-0.5 text-[10px] font-black uppercase text-amber-100">
              {submissionError.reasonSeverity}
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-amber-50">{submissionError.message}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-amber-100">{submissionError.reasonCode}</span>
            {submissionError.status ? <span className="font-mono text-[11px] text-amber-100">HTTP {submissionError.status}</span> : null}
          </div>
          {submissionError.source ? <p className="mt-1 text-[11px] uppercase text-amber-100/80">{submissionError.source}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

function LocalDraftActions({ proposal, inspected, onInspect, onMarkReadyForReview, onSubmitDraft }) {
  if (proposal?.dataSource !== 'local-draft') return null;

  const submissionMode = proposal.createProposalRequest?.submissionMode ?? proposal.submissionMode ?? 'mock-review';
  const liveBackendMode = submissionMode === 'backend';
  const submitted =
    Boolean(proposal.submissionReceipt) ||
    proposal.submissionState === 'mock-submitted' ||
    proposal.submissionState === 'backend-submitted' ||
    proposal.submissionState === 'backend-review-queued';
  const submitting = proposal.submissionState === 'submitting';
  const failed = proposal.submissionState === 'submit-failed';
  const reviewReady = proposal.submissionState === 'ready-for-review' || failed || submitted;
  const submitLabel = liveBackendMode ? 'Submit to backend' : 'Mock submit';
  const retryLabel = liveBackendMode ? 'Retry backend' : 'Retry submit';

  return (
    <div className="flex flex-col gap-2 border-t border-white/5 pt-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs leading-5 text-on-surface-variant">
        Browser-local draft. Review state is local; submission follows the observed createProposal integration mode and never opens a wallet prompt or direct on-chain
        transaction.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onInspect?.(inspected ? null : proposal.id)}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-black uppercase text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100"
        >
          {inspected ? 'Hide request' : 'Inspect request'}
        </button>
        <button
          type="button"
          disabled={reviewReady || submitting}
          onClick={() => onMarkReadyForReview?.(proposal.id)}
          className="rounded-md border border-amber-300/20 px-3 py-1.5 text-xs font-black uppercase text-amber-100 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-slate-500"
        >
          Ready for review
        </button>
        <button
          type="button"
          disabled={!reviewReady || submitted || submitting}
          onClick={() => onSubmitDraft?.(proposal.id)}
          className="rounded-md border border-cyan-300/20 px-3 py-1.5 text-xs font-black uppercase text-cyan-100 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-slate-500"
        >
          {submitting ? 'Submitting' : failed ? retryLabel : submitLabel}
        </button>
      </div>
    </div>
  );
}

export default function ProposalList({
  proposals,
  selectedDao,
  selectedChain,
  plugins = [],
  walletAddress,
  canCreateProposal,
  onCreateDraft,
  onMarkReadyForReview,
  onSubmitDraft,
}) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [inspectedDraftId, setInspectedDraftId] = useState(null);

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
          onClick={() => setCreateModalOpen(true)}
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
            const proposalRouteId = proposal.dataSource === 'local-draft' ? null : getProposalRouteId(proposal);
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
                    {proposal.dataSource === 'local-draft' ? (
                      <span className="w-fit rounded-md border border-amber-300/20 bg-amber-950/20 px-2 py-1 text-[11px] font-black uppercase text-amber-100">
                        Local draft
                      </span>
                    ) : null}
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
                <LocalDraftActions
                  proposal={proposal}
                  inspected={inspectedDraftId === proposal.id}
                  onInspect={setInspectedDraftId}
                  onMarkReadyForReview={onMarkReadyForReview}
                  onSubmitDraft={onSubmitDraft}
                />
                {inspectedDraftId === proposal.id ? <LocalDraftInspection proposal={proposal} /> : null}
              </div>
            );

            return (
              <article key={proposalRouteId ?? proposal.id ?? proposal.proposalIndex} className="px-5 py-4 transition-colors hover:bg-white/[0.03]">
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

      <ProposalCreateDraftModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        selectedDao={selectedDao}
        selectedChain={selectedChain}
        plugins={plugins}
        walletAddress={walletAddress}
        canCreateProposal={canCreateProposal}
        onCreateDraft={onCreateDraft}
      />
    </section>
  );
}
