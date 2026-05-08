import { useEffect, useState } from 'react';
import { fetchGovernanceProposal, fetchGovernanceProposalActions } from '../api/governanceClient';

export function useProposalDetail(proposalId) {
  const [proposal, setProposal] = useState(null);
  const [actions, setActions] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProposal() {
      if (!proposalId) {
        setProposal(null);
        setActions(null);
        setStatus('error');
        setError(new Error('Proposal id is required'));
        return;
      }

      setStatus('loading');
      setError(null);

      try {
        const detail = await fetchGovernanceProposal({ proposalId, signal: controller.signal });
        setProposal(detail);

        try {
          const decodedActions = await fetchGovernanceProposalActions({ proposalId, signal: controller.signal });
          setActions(decodedActions);
        } catch {
          if (!controller.signal.aborted) {
            setActions(null);
          }
        }

        if (!controller.signal.aborted) {
          setStatus('success');
        }
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setProposal(null);
        setActions(null);
        setStatus('error');
        setError(requestError);
      }
    }

    loadProposal();

    return () => controller.abort();
  }, [proposalId]);

  return {
    proposal,
    actions,
    status,
    error,
  };
}
