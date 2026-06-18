import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { TenantProvider } from '../../src/runtime/tenantContext';

const TENANT_STORAGE_KEY = 'axodus:selectedTenantId';

export function setSelectedTenantForTest(tenantId = 'tenant-root-axodus') {
  window.localStorage.setItem(TENANT_STORAGE_KEY, tenantId);
}

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });
}

export function renderWithProviders(ui, {
  initialEntries = ['/'],
  tenantId = 'tenant-root-axodus',
  queryClient = null,
} = {}) {
  setSelectedTenantForTest(tenantId);

  const tree = (
    <MemoryRouter initialEntries={initialEntries}>
      <TenantProvider>
        {ui}
      </TenantProvider>
    </MemoryRouter>
  );

  return render(queryClient ? <QueryClientProvider client={queryClient}>{tree}</QueryClientProvider> : tree);
}

export function renderRouteWithProviders(initialEntry, route, element, {
  tenantId = 'tenant-root-axodus',
  queryClient = null,
} = {}) {
  setSelectedTenantForTest(tenantId);

  const tree = (
    <MemoryRouter initialEntries={[initialEntry]}>
      <TenantProvider>
        <Routes>
          <Route path={route} element={element} />
        </Routes>
      </TenantProvider>
    </MemoryRouter>
  );

  return render(queryClient ? <QueryClientProvider client={queryClient}>{tree}</QueryClientProvider> : tree);
}
