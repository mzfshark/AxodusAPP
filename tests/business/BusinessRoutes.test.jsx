import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, test } from 'vitest';
import { appShellNav } from '../../src/config/appShell';
import {
  BusinessAssets,
  BusinessAssetDetail,
  BusinessEvents,
  BusinessOverview,
  BusinessProjects,
  BusinessProjectDetail,
  BusinessRegistry,
  BusinessRuntime,
  BusinessState,
  BusinessTelemetry,
  BusinessTreasury,
  BusinessWorkflows,
  businessRuntimeClient,
  businessRuntimeSafety
} from '../../src/modules/business';

function renderBusinessRoute(initialEntry, route, element) {
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

afterEach(() => {
  cleanup();
});

describe('AxodusAPP Business routes', () => {
  test('registers Business as a /business shell nucleus', () => {
    const businessEntry = appShellNav.primary.find((item) => item.id === 'business');

    expect(businessEntry).toMatchObject({
      label: 'Business',
      routeBase: '/business',
      summary: 'Operational infrastructure, funding visibility and ACS runtime coordination'
    });
    expect(businessEntry.sections.map((section) => section.to)).toEqual(expect.arrayContaining([
      '/business',
      '/business/projects',
      '/business/assets',
      '/business/registry',
      '/business/workflows',
      '/business/events',
      '/business/runtime'
    ]));
  });

  test('renders Business overview with cards and safety language', async () => {
    renderBusinessRoute('/business', '/business', <BusinessOverview />);

    expect(await screen.findByRole('heading', { name: /Business Runtime/i })).toBeInTheDocument();
    expect(screen.getAllByText(/mock\/read-only/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Treasury Exposure/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Debenture Status/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ACS Runtime/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Telemetry Summary/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Blocked Workflows/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Registry Edges/i)).toBeInTheDocument();
  });

  test('renders project and asset tables from isolated runtime client', async () => {
    renderBusinessRoute('/business/projects', '/business/projects', <BusinessProjects />);

    expect(await screen.findByRole('heading', { name: /Projects/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Governance.Country/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/proj-dex-country/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/assets', '/business/assets', <BusinessAssets />);

    expect(await screen.findByRole('heading', { name: /Operational Assets/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Vault.Country/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/asset-dex-country/i)).toBeInTheDocument();
  });

  test('renders treasury exposure and telemetry feed without execution actions', async () => {
    renderBusinessRoute('/business/treasury', '/business/treasury', <BusinessTreasury />);

    expect(await screen.findByRole('heading', { level: 1, name: /Treasury Exposure/i })).toBeInTheDocument();
    expect(screen.getByText(/tex-dex-country/i)).toBeInTheDocument();
    expect(screen.getByText(/DIRECT_TREASURY_ALLOCATION/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /approve|allocate|move|execute|issue|buy|provision/i })).not.toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/telemetry', '/business/telemetry', <BusinessTelemetry />);

    expect(await screen.findByRole('heading', { level: 1, name: /Telemetry/i })).toBeInTheDocument();
    expect(screen.getByText(/tel-dex-treasury-exposure/i)).toBeInTheDocument();
    expect(screen.getAllByText(/business-runtime-mock/i).length).toBeGreaterThan(0);
  });

  test('consumes Business runtime through isolated mock read-only client', () => {
    const overview = businessRuntimeClient.getOverview();

    expect(overview.cards.length).toBeGreaterThan(0);
    expect(businessRuntimeSafety.mode).toBe('MOCK_READ_ONLY');
    expect(businessRuntimeSafety.treasuryMovementEnabled).toBe(false);
    expect(businessRuntimeSafety.debentureIssuanceEnabled).toBe(false);
    expect(businessRuntimeSafety.acsProvisioningEnabled).toBe(false);
    expect(businessRuntimeSafety.contractCallsEnabled).toBe(false);
  });

  test('renders project and asset detail registry views', async () => {
    renderBusinessRoute('/business/projects/proj-dex-country', '/business/projects/:projectId', <BusinessProjectDetail />);

    expect(await screen.findByRole('heading', { name: /Dex.Country/i })).toBeInTheDocument();
    expect(screen.getByText(/Project Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Timeline/i)).toBeInTheDocument();
    expect(screen.getAllByText(/deb-dex-country/i).length).toBeGreaterThan(0);

    cleanup();
    renderBusinessRoute('/business/assets/asset-dex-country', '/business/assets/:assetId', <BusinessAssetDetail />);

    expect(await screen.findByRole('heading', { name: /Dex.Country/i })).toBeInTheDocument();
    expect(screen.getByText(/Asset Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Asset Event Timeline/i)).toBeInTheDocument();
  });

  test('renders registry, workflow, events, state and runtime console pages', async () => {
    renderBusinessRoute('/business/registry', '/business/registry', <BusinessRegistry />);
    expect(await screen.findByRole('heading', { name: /Runtime Registry/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Relationships/i).length).toBeGreaterThan(0);

    cleanup();
    renderBusinessRoute('/business/workflows', '/business/workflows', <BusinessWorkflows />);
    expect(await screen.findByRole('heading', { name: /Workflows/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Blocked/i).length).toBeGreaterThan(0);

    cleanup();
    renderBusinessRoute('/business/events', '/business/events', <BusinessEvents />);
    expect(await screen.findByRole('heading', { level: 1, name: /Events/i })).toBeInTheDocument();
    expect(screen.getByText(/Runtime Timeline/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/state', '/business/state', <BusinessState />);
    expect(await screen.findByRole('heading', { name: /State Machine/i })).toBeInTheDocument();
    expect(screen.getByText(/Transition Simulation/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/runtime', '/business/runtime', <BusinessRuntime />);
    expect(await screen.findByRole('heading', { name: /Runtime Safety/i })).toBeInTheDocument();
    expect(screen.getByText(/Executable Policies/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /approve|allocate|move|execute|issue|buy|provision|distribute|contract/i })).not.toBeInTheDocument();
  });
});
