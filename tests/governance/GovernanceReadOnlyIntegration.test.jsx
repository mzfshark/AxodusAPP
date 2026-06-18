import { screen, waitFor, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderRouteWithProviders } from '../test-utils/renderWithProviders';
import {
  GovernanceFreshnessBadge,
  GovernanceReadOnlyProposalDetailPage,
  GovernanceReadOnlyProposalListPage,
  MockGovernanceReadOnlyAdapter,
  forbiddenGovernanceMutationMethods,
  mockGovernanceReadOnlyAdapter,
} from '../../src/modules/governance/readOnly';

describe('Governance read-only mock integration', () => {
  test('adapter exposes read-only methods and no mutation surface', async () => {
    const methods = Object.getOwnPropertyNames(MockGovernanceReadOnlyAdapter.prototype);

    expect(methods).toEqual(expect.arrayContaining([
      'listProposals',
      'getProposalDetail',
      'getTenantSummary',
      'listEmergencyActions',
      'getGovernanceTimeline',
      'listDecisionHistory',
    ]));

    for (const forbiddenMethod of forbiddenGovernanceMutationMethods) {
      expect(methods).not.toContain(forbiddenMethod);
      expect(mockGovernanceReadOnlyAdapter[forbiddenMethod]).toBeUndefined();
    }

    const result = await mockGovernanceReadOnlyAdapter.listProposals({ tenantId: 'tenant-root-axodus' });
    expect(result.ok).toBe(true);
    expect(result.value.mode).toBe('local-mock');
    expect(result.value.items.length).toBeGreaterThan(0);
  });

  test('missing tenant returns a safe read-only error', async () => {
    const result = await mockGovernanceReadOnlyAdapter.getTenantSummary({ tenantId: 'tenant-missing' });

    expect(result.ok).toBe(false);
    expect(result.error.code).toBe('TENANT_NOT_FOUND');
  });

  test('renders freshness badge states', () => {
    renderRouteWithProviders('/governance/proposals', '/governance/proposals', (
      <div>
        <GovernanceFreshnessBadge freshness="fresh" />
        <GovernanceFreshnessBadge freshness="stale" />
        <GovernanceFreshnessBadge freshness="unknown" />
        <GovernanceFreshnessBadge freshness="failed" />
      </div>
    ));

    expect(screen.getByText('fresh')).toBeInTheDocument();
    expect(screen.getByText('stale')).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
    expect(screen.getByText('failed')).toBeInTheDocument();
  });

  test('proposal list renders local mock proposals without mutation buttons', async () => {
    renderRouteWithProviders('/governance/proposals', '/governance/proposals', <GovernanceReadOnlyProposalListPage />);

    expect(await screen.findByText(/Governance read-only mock/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ratify read-only Governance backend gate/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions unavailable/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /create|submit|vote|review|approve|reject|execute|sign/i })).not.toBeInTheDocument();
  });

  test('proposal detail renders sanitized read-only data', async () => {
    renderRouteWithProviders(
      '/governance/proposals/gov-prop-core-001',
      '/governance/proposals/:proposalId',
      <GovernanceReadOnlyProposalDetailPage />,
    );

    expect(await screen.findByText(/Ratify read-only Governance backend gate/i)).toBeInTheDocument();
    expect(screen.getByText(/execution intent/i)).toBeInTheDocument();
    expect(screen.getByText(/blocked/i)).toBeInTheDocument();
    expect(screen.getByText(/Sanitized audit reference/i)).toBeInTheDocument();
    expect(screen.queryByText(/private key|secret|raw evidence|risk note/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /create|submit|vote|review|approve|reject|execute|sign/i })).not.toBeInTheDocument();
  });

  test('proposal detail handles missing proposal safely', async () => {
    renderRouteWithProviders(
      '/governance/proposals/not-found',
      '/governance/proposals/:proposalId',
      <GovernanceReadOnlyProposalDetailPage />,
    );

    expect(await screen.findByText(/Proposal not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Governance proposal fixture not found/i)).toBeInTheDocument();
  });

  test('selected tenant mapping can render stale local governance state', async () => {
    renderRouteWithProviders('/governance/proposals', '/governance/proposals', <GovernanceReadOnlyProposalListPage />, {
      tenantId: 'tenant-subdao-governance-labs',
    });

    expect(await screen.findByText(/Prepare tenant read model fixture contract/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('stale')).toBeInTheDocument());
  });

  test('emergency notices render sanitized content on root overview route', async () => {
    renderRouteWithProviders('/governance/proposals', '/governance/proposals', <GovernanceReadOnlyProposalListPage />);

    const banner = await screen.findByText(/No backend query API/i);
    expect(banner).toBeInTheDocument();

    const list = await screen.findByText(/Read-only proposals/i);
    expect(within(list.closest('section')).queryByText(/evidence contents/i)).not.toBeInTheDocument();
  });
});
