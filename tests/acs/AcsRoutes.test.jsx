import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { appShellNav } from '../../src/config/appShell';
import {
  AcsCapabilities,
  AcsOverview,
  AcsPolicy,
  AcsProducts,
  AcsReadiness,
  AcsStatus,
  AcsTenantServices
} from '../../src/modules/acs';

function renderAcsRoute(initialEntry, route, element) {
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
    throw new Error('ACS API unavailable');
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('AxodusAPP ACS routes', () => {
  test('registers ACS as a tenant-aware shell nucleus', () => {
    const acsEntry = appShellNav.primary.find((item) => item.id === 'acs');

    expect(acsEntry).toMatchObject({
      label: 'ACS',
      routeBase: '/acs',
      summary: 'Operational intelligence, tenant services and policy visibility'
    });
    expect(acsEntry.sections.map((section) => section.to)).toEqual(expect.arrayContaining([
      '/acs',
      '/acs/capabilities',
      '/acs/services',
      '/acs/products',
      '/acs/policy',
      '/acs/status',
      '/acs/readiness'
    ]));
  });

  test('renders ACS overview with fallback state and no automation language', async () => {
    renderAcsRoute('/acs', '/acs', <AcsOverview />);

    expect(await screen.findByRole('heading', { name: /Operational Intelligence/i })).toBeInTheDocument();
    expect(screen.getByText(/Using ACS mock fallback/i)).toBeInTheDocument();
    expect(screen.getByText(/autonomous execution blocked/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Capabilities$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Readiness$/i })).not.toBeInTheDocument();
  });

  test('renders capability explorer from ACS responses', async () => {
    renderAcsRoute('/acs/capabilities', '/acs/capabilities', <AcsCapabilities />);

    expect(await screen.findByRole('heading', { name: /Capability Explorer/i })).toBeInTheDocument();
    expect(screen.getByText(/CORE capabilities/i)).toBeInTheDocument();
    expect(screen.getByText(/Trading Ignition/i)).toBeInTheDocument();
  });

  test('renders tenant services and blocked state data', async () => {
    renderAcsRoute('/acs/services', '/acs/services', <AcsTenantServices />);

    expect(await screen.findByRole('heading', { name: /Tenant Service Explorer/i })).toBeInTheDocument();
    expect(screen.getAllByText(/dao-alpha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Tenant Risk Analysis/i)).toBeInTheDocument();
  });

  test('renders product access and policy visibility', async () => {
    renderAcsRoute('/acs/products', '/acs/products', <AcsProducts />);
    expect(await screen.findByRole('heading', { name: /Product Access/i })).toBeInTheDocument();
    expect(screen.getByText(/product.trading-ignition/i)).toBeInTheDocument();
    expect(screen.getByText(/License Loss State/i)).toBeInTheDocument();
    expect(screen.getAllByText(/license_expired/i).length).toBeGreaterThan(0);

    renderAcsRoute('/acs/policy', '/acs/policy', <AcsPolicy />);
    expect(await screen.findByRole('heading', { name: /Policy Visibility/i })).toBeInTheDocument();
    expect(screen.getAllByText(/manual_approval/i).length).toBeGreaterThan(0);
  });

  test('renders readiness pipeline', async () => {
    renderAcsRoute('/acs/readiness', '/acs/readiness', <AcsReadiness />);

    expect(await screen.findByRole('heading', { name: /Readiness Dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/Wallet connected/i)).toBeInTheDocument();
    expect(screen.getByText(/Exchange API withdrawals disabled/i)).toBeInTheDocument();
  });

  test('renders operational status without content navigation duplication', async () => {
    renderAcsRoute('/acs/status', '/acs/status', <AcsStatus />);

    expect(await screen.findByRole('heading', { name: /Operational Status/i })).toBeInTheDocument();
    expect(screen.getByText(/No real execution, CEX API or automation is enabled/i)).toBeInTheDocument();
    expect(screen.getByText(/User Status Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Emergency Stop Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance Records/i)).toBeInTheDocument();
    expect(screen.getByText(/Receipt Audit Preview/i)).toBeInTheDocument();
    expect(screen.getByText(/API Secret Safety/i)).toBeInTheDocument();
    expect(screen.getAllByText(/disable withdrawal/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/use IP permission/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Products$/i })).not.toBeInTheDocument();
  });
});
