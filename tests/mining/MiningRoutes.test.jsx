import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { appShellNav } from '../../src/config/appShell';
import {
  MiningGovernance,
  MiningOverview,
  MiningProviderDetails,
  MiningProviders,
  MiningReports,
  MiningRisk,
  MiningTreasury,
  MiningVaults
} from '../../src/modules/mining';

function renderMiningRoute(initialEntry, route, element) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0
      }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path={route} element={element} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => {
    throw new Error('Mining API unavailable');
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('AxodusAPP Mining routes', () => {
  test('registers Mining as a first-class shell nucleus with tokenized exposure language', () => {
    const miningEntry = appShellNav.primary.find((item) => item.id === 'mining');

    expect(miningEntry).toMatchObject({
      label: 'Mining',
      routeBase: '/mining',
      summary: 'Tokenized mining exposure, provider risk and treasury allocation readiness'
    });
    expect(miningEntry.sections.map((section) => section.to)).toEqual(expect.arrayContaining([
      '/mining',
      '/mining/providers',
      '/mining/treasury',
      '/mining/risk',
      '/mining/governance',
      '/mining/reports'
    ]));
  });

  test('renders the Mining overview with explicit backend fallback state', async () => {
    renderMiningRoute('/mining', '/mining', <MiningOverview />);

    expect(await screen.findByRole('heading', { name: /Tokenized Hash Allocation Hub/i })).toBeInTheDocument();
    expect(screen.getByText(/Using local mock fallback/i)).toBeInTheDocument();
    expect(screen.getByText(/Provider Exposure Registry/i)).toBeInTheDocument();
  });

  test('renders provider registry and provider detail from fallback data when backend is unavailable', async () => {
    renderMiningRoute('/mining/providers', '/mining/providers', <MiningProviders />);

    expect(await screen.findByRole('heading', { name: /Providers/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Luxor/i).length).toBeGreaterThan(0);

    renderMiningRoute('/mining/providers/luxor', '/mining/providers/:providerSlug', <MiningProviderDetails />);

    expect(await screen.findByRole('heading', { name: /Luxor/i })).toBeInTheDocument();
    expect(screen.getByText(/Provider Readiness/i)).toBeInTheDocument();
    expect(screen.getByText(/Governance Validation/i)).toBeInTheDocument();
  });

  test('renders treasury, risk, vault, governance, and report institutional surfaces', async () => {
    renderMiningRoute('/mining/treasury', '/mining/treasury', <MiningTreasury />);
    expect(await screen.findByRole('heading', { name: /Treasury Routing/i })).toBeInTheDocument();
    expect(screen.getByText(/By Risk Level/i)).toBeInTheDocument();

    renderMiningRoute('/mining/risk', '/mining/risk', <MiningRisk />);
    expect(await screen.findByRole('heading', { name: /Risk Console/i })).toBeInTheDocument();
    expect(screen.getAllByText(/regulatory/i).length).toBeGreaterThan(0);

    renderMiningRoute('/mining/vaults', '/mining/vaults', <MiningVaults />);
    expect(await screen.findByRole('heading', { name: /Mining Vaults/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Core Treasury Hash Vault/i).length).toBeGreaterThan(0);

    renderMiningRoute('/mining/governance', '/mining/governance', <MiningGovernance />);
    expect(await screen.findByRole('heading', { name: /Governance Validation/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Reason codes/i).length).toBeGreaterThan(0);

    renderMiningRoute('/mining/reports', '/mining/reports', <MiningReports />);
    expect(await screen.findByRole('heading', { level: 1, name: /Reports/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Mining/i).length).toBeGreaterThan(0);
  });
});
