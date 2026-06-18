import { screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import Sidebar from '../../src/components/Sidebar';
import { appShellNav } from '../../src/config/appShell';
import { MarketplaceDashboard, MarketplaceHome } from '../../src/modules/marketplace';
import { renderWithProviders } from '../test-utils/renderWithProviders';

const marketplaceShell = appShellNav.primary.find((item) => item.id === 'marketplace');

beforeAll(() => {
  window.matchMedia = window.matchMedia || vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

function renderWithRouter(ui, initialEntry = '/marketplace') {
  renderWithProviders(ui, {
    initialEntries: [initialEntry],
    tenantId: 'tenant-company-bba',
  });
}

describe('Marketplace navigation cleanup', () => {
  test('renders canonical Marketplace navigation from the nucleus sidebar', () => {
    renderWithRouter(<Sidebar activeShellItem={marketplaceShell} />, '/marketplace/dashboard');

    const marketplaceSections = screen.getByRole('navigation', { name: /Marketplace sections/i });
    expect(marketplaceSections).toBeInTheDocument();

    for (const label of [
      'Overview',
      'Dashboard',
      'Explore',
      'Assets',
      'Create/Sell',
      'Orders / Billing',
      'Subscriptions',
      'Governance',
      'Licenses',
      'Publisher Console',
    ]) {
      expect(within(marketplaceSections).getByRole('link', { name: new RegExp(label, 'i') })).toBeInTheDocument();
    }
  });

  test('does not render duplicated Marketplace route navigation inside page content', () => {
    renderWithRouter(<MarketplaceDashboard />, '/marketplace/dashboard');

    expect(screen.getByRole('heading', { name: /Marketplace Dashboard/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/Marketplace section navigation/i)).not.toBeInTheDocument();
  });

  test('keeps contextual action CTA on Marketplace overview', () => {
    renderWithRouter(<MarketplaceHome />, '/marketplace');

    expect(screen.getByRole('link', { name: /Create \/ sell preview/i })).toHaveAttribute('href', '/marketplace/create');
    expect(screen.queryByRole('link', { name: /Open registry/i })).not.toBeInTheDocument();
  });
});
