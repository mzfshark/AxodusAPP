import { useEffect, useMemo, useState } from 'react';
import { buildCreateProposalRequest } from '../api/createProposalContract';

function observedValue(value) {
  return value || value === 0 ? value : 'Not indexed';
}

function ContextItem({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <div className="text-[11px] font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 break-words text-xs font-semibold text-on-surface">{observedValue(value)}</div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase text-slate-500">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-white/10 bg-surface-container-high px-3 py-2 text-sm font-semibold text-on-surface outline-none placeholder:text-slate-500 focus:border-cyan-300/40';

export default function ProposalCreateDraftModal({ open, onClose, selectedDao, selectedChain, plugins = [], walletAddress, canCreateProposal, onCreateDraft }) {
  const firstPlugin = plugins.find((plugin) => plugin.interfaceType || plugin.pluginType || plugin.address);
  const [draft, setDraft] = useState({
    title: '',
    summary: '',
    pluginId: firstPlugin?.id ?? firstPlugin?.address ?? firstPlugin?.interfaceType ?? '',
    actionType: 'signaling',
    startDate: '',
    endDate: '',
    rationale: '',
  });
  const [preview, setPreview] = useState(null);

  const pluginOptions = useMemo(
    () =>
      plugins.map((plugin, index) => ({
        id: plugin.id ?? plugin.address ?? plugin.interfaceType ?? `plugin-${index}`,
        label: plugin.name ?? plugin.interfaceType ?? plugin.pluginType ?? plugin.address ?? `Plugin ${index + 1}`,
      })),
    [plugins],
  );

  useEffect(() => {
    if (!open || draft.pluginId || pluginOptions.length === 0) return;
    setDraft((current) => ({ ...current, pluginId: pluginOptions[0].id }));
  }, [draft.pluginId, open, pluginOptions]);

  if (!open) return null;

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
    setPreview(null);
  }

  function createLocalDraft(event) {
    event.preventDefault();
    const selectedPlugin = plugins.find((plugin) => (plugin.id ?? plugin.address ?? plugin.interfaceType) === draft.pluginId);
    const pluginLabel = selectedPlugin?.name ?? selectedPlugin?.interfaceType ?? selectedPlugin?.pluginType ?? selectedPlugin?.address;
    const createProposalRequest = buildCreateProposalRequest({
      draft: { ...draft, pluginLabel },
      selectedDao,
      selectedChain,
      walletAddress,
      plugin: selectedPlugin,
    });
    const createdDraft = onCreateDraft?.({
      ...draft,
      pluginLabel,
      createProposalRequest,
    });
    setPreview(
      createdDraft ?? {
        ...draft,
        daoName: selectedDao?.name,
        chainName: selectedChain?.name ?? selectedDao?.network,
        walletAddress,
        createdAt: new Date().toISOString(),
        status: 'Local draft',
      },
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <section className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-cyan-300/20 bg-surface-container-highest shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-white/5 px-5 py-4">
          <div>
            <h2 className="text-lg font-black text-on-surface">Create Proposal Draft</h2>
            <p className="mt-1 text-xs leading-5 text-on-surface-variant">
              Local mock workflow for proposal creation readiness. No backend write, wallet prompt or on-chain transaction is submitted.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-white/5 bg-surface-container p-4">
              <div className="text-xs font-black uppercase text-cyan-200">Observed readiness</div>
              <div className="mt-3 grid gap-2">
                <ContextItem label="DAO" value={selectedDao?.name} />
                <ContextItem label="Network" value={selectedChain?.name ?? selectedDao?.network} />
                <ContextItem label="Wallet" value={walletAddress} />
                <ContextItem label="Plugins" value={plugins.length ? `${plugins.length} observed` : 'No plugin state'} />
                <ContextItem label="Create state" value={canCreateProposal ? 'Draft enabled' : 'Read-only'} />
              </div>
            </div>

            <div className="rounded-lg border border-amber-300/20 bg-amber-950/20 p-4">
              <div className="text-xs font-black uppercase text-amber-100">Boundary</div>
              <p className="mt-2 text-sm leading-6 text-amber-50">
                This modal renders observed governance state only. Constitutional validity, sanctions, permissions and execution remain sourced from contracts,
                registry, indexers, guardrails and backend execution layers.
              </p>
            </div>
          </aside>

          <form className="space-y-4" onSubmit={createLocalDraft}>
            <FormField label="Title">
              <input
                required
                value={draft.title}
                onChange={(event) => updateDraft('title', event.target.value)}
                placeholder="Proposal title"
                className={inputClass}
              />
            </FormField>

            <FormField label="Summary">
              <textarea
                required
                value={draft.summary}
                onChange={(event) => updateDraft('summary', event.target.value)}
                placeholder="Short proposal summary"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Plugin">
                <select value={draft.pluginId} onChange={(event) => updateDraft('pluginId', event.target.value)} className={inputClass}>
                  {pluginOptions.length > 0 ? (
                    pluginOptions.map((plugin) => (
                      <option key={plugin.id} value={plugin.id}>
                        {plugin.label}
                      </option>
                    ))
                  ) : (
                    <option value="">No plugin indexed</option>
                  )}
                </select>
              </FormField>

              <FormField label="Action type">
                <select value={draft.actionType} onChange={(event) => updateDraft('actionType', event.target.value)} className={inputClass}>
                  <option value="signaling">Signaling</option>
                  <option value="treasury-review">Treasury review</option>
                  <option value="plugin-action">Plugin action</option>
                  <option value="constitutional-review">Constitutional review</option>
                </select>
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Voting start">
                <input type="datetime-local" value={draft.startDate} onChange={(event) => updateDraft('startDate', event.target.value)} className={inputClass} />
              </FormField>
              <FormField label="Voting end">
                <input type="datetime-local" value={draft.endDate} onChange={(event) => updateDraft('endDate', event.target.value)} className={inputClass} />
              </FormField>
            </div>

            <FormField label="Rationale / operator note">
              <textarea
                value={draft.rationale}
                onChange={(event) => updateDraft('rationale', event.target.value)}
                placeholder="Optional local note for review"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </FormField>

            <div className="flex flex-col gap-3 border-t border-white/5 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-sm font-black text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={!canCreateProposal}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-black text-on-primary disabled:cursor-not-allowed disabled:bg-surface-container-high disabled:text-slate-500"
              >
                <span className="material-symbols-outlined text-[18px]">draft</span>
                Generate local draft
              </button>
            </div>

            {preview ? (
              <div className="rounded-lg border border-cyan-300/20 bg-cyan-950/20 p-4">
                <div className="text-xs font-black uppercase text-cyan-200">Local draft generated</div>
                <div className="mt-3 grid gap-2 text-xs text-cyan-50">
                  <div>
                    <span className="font-black uppercase text-cyan-200">Title</span>
                    <p className="mt-1">{preview.title}</p>
                  </div>
                  <div>
                    <span className="font-black uppercase text-cyan-200">Context</span>
                    <p className="mt-1">
                      {preview.daoName} · {preview.chainName} · {preview.status}
                    </p>
                  </div>
                  <div>
                    <span className="font-black uppercase text-cyan-200">Summary</span>
                    <p className="mt-1">{preview.summary}</p>
                  </div>
                  <div>
                    <span className="font-black uppercase text-cyan-200">Future interface</span>
                    <p className="mt-1">{preview.createProposalRequest?.submissionMode ?? 'mock-review'} · backend validation required</p>
                  </div>
                  <div>
                    <span className="font-black uppercase text-cyan-200">Reason codes</span>
                    <p className="mt-1">
                      {(preview.createProposalRequest?.guardrails?.reasonCodes ?? []).map((reason) => reason.reasonCode).join(', ') || 'No active reason codes'}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
