import { useCallback, useEffect, useMemo, useState } from 'react';
import { submitCreateProposal } from '../api/createProposalContract';

const storageKey = 'axodus.governance.proposalDrafts.v1';

function readDrafts() {
  try {
    const value = window.localStorage.getItem(storageKey);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeDrafts(drafts) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(drafts));
  } catch {
    // Local draft persistence is a dev convenience only; rendering must keep working without storage.
  }
}

function draftRouteId(draft) {
  return `local-draft-${draft.createdAt.replace(/[^a-zA-Z0-9]/g, '').slice(0, 14)}`;
}

function draftStatusLabel(submissionState) {
  if (submissionState === 'ready-for-review') return 'Ready for review';
  if (submissionState === 'submitting') return 'Submitting';
  if (submissionState === 'mock-submitted') return 'Mock submitted';
  if (submissionState === 'backend-submitted') return 'Backend submitted';
  return 'Submitted for review';
}

export function useProposalDrafts({ selectedDao, selectedChain, walletAddress } = {}) {
  const [drafts, setDrafts] = useState(() => readDrafts());
  const selectedDaoId = selectedDao?.id;

  useEffect(() => {
    writeDrafts(drafts);
  }, [drafts]);

  const createDraft = useCallback(
    (draftInput) => {
      const createdAt = new Date().toISOString();
      const draft = {
        ...draftInput,
        id: draftRouteId({ createdAt }),
        routeId: null,
        entityId: null,
        proposalId: null,
        title: draftInput.title,
        summary: draftInput.summary,
        description: draftInput.summary,
        status: 'Local draft',
        daoId: selectedDao?.id ?? null,
        daoName: selectedDao?.name ?? null,
        network: selectedChain?.network ?? selectedChain?.slug ?? selectedDao?.network ?? null,
        chainName: selectedChain?.name ?? selectedDao?.network ?? null,
        walletAddress: walletAddress ?? null,
        pluginType: draftInput.pluginLabel ?? draftInput.pluginId ?? 'Not indexed',
        interfaceType: draftInput.pluginLabel ?? draftInput.pluginId ?? null,
        createdAt,
        reviewedAt: null,
        submittedAt: null,
        submissionReceipt: null,
        submissionError: null,
        startDate: draftInput.startDate || null,
        endDate: draftInput.endDate || null,
        rationale: draftInput.rationale || null,
        dataSource: 'local-draft',
        submissionMode: 'mock-review',
        submissionState: 'draft',
        createProposalRequest: draftInput.createProposalRequest ?? null,
        executionPreview: 'Local draft only. No backend write, wallet prompt or on-chain transaction has been submitted.',
      };

      setDrafts((current) => [draft, ...current].slice(0, 12));
      return draft;
    },
    [selectedChain, selectedDao, walletAddress],
  );

  const updateDraftState = useCallback((draftId, submissionState, submissionReceipt = null) => {
    const timestampField = submissionState === 'ready-for-review' ? 'reviewedAt' : 'submittedAt';
    setDrafts((current) =>
      current.map((draft) => {
        if (draft.id !== draftId) return draft;

        return {
          ...draft,
          status: draftStatusLabel(submissionState),
          submissionState,
          submissionReceipt: submissionReceipt ?? draft.submissionReceipt,
          submissionError: null,
          [timestampField]: new Date().toISOString(),
        };
      }),
    );
  }, []);

  const updateDraftSubmissionError = useCallback((draftId, error) => {
    setDrafts((current) =>
      current.map((draft) => {
        if (draft.id !== draftId) return draft;

        return {
          ...draft,
          status: 'Submission failed',
          submissionState: 'submit-failed',
          submissionError: {
            message: error?.message ?? 'Create proposal submission failed.',
            reasonCode: 'CREATE_PROPOSAL_SUBMISSION_FAILED',
            reasonSeverity: 'warning',
            source: 'backend submission boundary',
            failedAt: new Date().toISOString(),
          },
        };
      }),
    );
  }, []);

  const submitDraft = useCallback(async (draftId) => {
    const draft = drafts.find((item) => item.id === draftId);
    if (!draft) return null;

    updateDraftState(draftId, 'submitting');

    try {
      const submissionReceipt = await submitCreateProposal({ draft, request: draft.createProposalRequest });
      updateDraftState(draftId, submissionReceipt.status ?? 'submitted-for-review', submissionReceipt);
      return submissionReceipt;
    } catch (error) {
      updateDraftSubmissionError(draftId, error);
      return null;
    }
  }, [drafts, updateDraftState, updateDraftSubmissionError]);

  const selectedContextDrafts = useMemo(() => {
    if (!selectedDaoId) return drafts;
    return drafts.filter((draft) => draft.daoId === selectedDaoId || !draft.daoId);
  }, [drafts, selectedDaoId]);

  return {
    drafts: selectedContextDrafts,
    allDrafts: drafts,
    createDraft,
    markDraftReadyForReview: (draftId) => updateDraftState(draftId, 'ready-for-review'),
    submitDraft,
    mockSubmitDraft: submitDraft,
  };
}
