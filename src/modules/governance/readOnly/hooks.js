import { useCallback, useEffect, useState } from 'react';
import { useGovernanceReadOnlyContext } from './context';

const initialState = {
  status: 'loading',
  data: null,
  error: null,
  freshness: 'unknown',
  mode: 'local-mock',
  readOnly: true,
};

function useReadOnlyQuery(queryFn) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let active = true;
    setState(initialState);

    queryFn()
      .then((result) => {
        if (!active) return;
        if (!result.ok) {
          setState({
            status: 'error',
            data: null,
            error: result.error,
            freshness: 'unknown',
            mode: 'local-mock',
            readOnly: true,
          });
          return;
        }

        setState({
          status: 'success',
          data: result.value,
          error: null,
          freshness: result.value?.metadata?.freshness ?? 'unknown',
          mode: result.value?.mode ?? 'local-mock',
          readOnly: true,
        });
      })
      .catch(() => {
        if (!active) return;
        setState({
          status: 'error',
          data: null,
          error: { code: 'READ_ONLY_QUERY_FAILED', message: 'Governance read-only mock query failed.' },
          freshness: 'failed',
          mode: 'local-mock',
          readOnly: true,
        });
      });

    return () => {
      active = false;
    };
  }, [queryFn]);

  return state;
}

export function useGovernanceProposalList(input = {}) {
  const { adapter, governanceTenantId } = useGovernanceReadOnlyContext();
  const queryFn = useCallback(() => adapter.listProposals({
    tenantId: governanceTenantId,
    status: input.status,
    limit: input.limit,
    offset: input.offset,
  }), [adapter, governanceTenantId, input.status, input.limit, input.offset]);
  return useReadOnlyQuery(queryFn);
}

export function useGovernanceProposalDetail(proposalId) {
  const { adapter, governanceTenantId } = useGovernanceReadOnlyContext();
  const queryFn = useCallback(() => adapter.getProposalDetail({ tenantId: governanceTenantId, proposalId }), [adapter, governanceTenantId, proposalId]);
  return useReadOnlyQuery(queryFn);
}

export function useGovernanceTenantSummary() {
  const { adapter, governanceTenantId } = useGovernanceReadOnlyContext();
  const queryFn = useCallback(() => adapter.getTenantSummary({ tenantId: governanceTenantId }), [adapter, governanceTenantId]);
  return useReadOnlyQuery(queryFn);
}

export function useGovernanceEmergencyNotices() {
  const { adapter, governanceTenantId } = useGovernanceReadOnlyContext();
  const queryFn = useCallback(() => adapter.listEmergencyActions({ tenantId: governanceTenantId }), [adapter, governanceTenantId]);
  return useReadOnlyQuery(queryFn);
}

export function useGovernanceOverview() {
  const proposalList = useGovernanceProposalList({ limit: 5 });
  const tenantSummary = useGovernanceTenantSummary();
  const emergencyNotices = useGovernanceEmergencyNotices();

  return {
    status: [proposalList.status, tenantSummary.status, emergencyNotices.status].includes('loading') ? 'loading' : 'success',
    proposalList,
    tenantSummary,
    emergencyNotices,
    readOnly: true,
    mode: 'local-mock',
  };
}
