import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { MarketplaceDashboard } from '../../src/modules/marketplace';

describe('Marketplace dashboard', () => {
  test('renders tenant, license, billing and adapter readiness metrics', () => {
    render(
      <MemoryRouter initialEntries={['/marketplace/dashboard']}>
        <MarketplaceDashboard />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Marketplace Dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/Federation dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/License models/i)).toBeInTheDocument();
    expect(screen.getByText(/Billing review/i)).toBeInTheDocument();
    expect(screen.getByText(/BillingProviderAdapter/i)).toBeInTheDocument();
    expect(screen.getByText(/TreasurySettlementAdapter/i)).toBeInTheDocument();
    expect(screen.getByText(/Governance runtime/i)).toBeInTheDocument();
    expect(screen.getByText(/ACS operational metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/Constitutional alerts/i)).toBeInTheDocument();
  });
});
