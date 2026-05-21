import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { MarketplaceGovernance } from '../../src/modules/marketplace';

describe('Marketplace federation rendering', () => {
  test('renders governance, tenant federation, and ACS visibility in the governance view', () => {
    render(
      <MemoryRouter initialEntries={['/marketplace/governance']}>
        <MarketplaceGovernance />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Governance Validation/i })).toBeInTheDocument();
    expect(screen.getByText(/Tenant federation/i)).toBeInTheDocument();
    expect(screen.getByText(/ACS marketplace visibility/i)).toBeInTheDocument();
    expect(screen.getAllByText(/MCP Agent Template License/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Provisioning enabled: no/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/working-group/i).length).toBeGreaterThan(0);
  });
});
