import { screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { NucleusDetailView } from '../../src/features/portfolio';
import { renderRouteWithProviders } from '../test-utils/renderWithProviders';

function cardByTitle(title: RegExp | string) {
  const heading = screen.getByRole('heading', { name: title });
  const card = heading.closest('article');
  expect(card).not.toBeNull();
  return within(card as HTMLElement);
}

describe('Nucleus detail view', () => {
  test('renders Business portfolio detail as read-only L4 Consolidated nucleus', () => {
    renderRouteWithProviders('/portfolio/Business', '/portfolio/:nucleusId', <NucleusDetailView />);

    expect(screen.getByRole('heading', { name: /Business Detail/i })).toBeInTheDocument();
    expect(cardByTitle(/^Business$/i).getAllByText('L4 Consolidated').length).toBeGreaterThan(0);
    expect(cardByTitle(/^Business$/i).getAllByText('D2').length).toBeGreaterThan(0);
    expect(screen.getByText(/READINESS_READY/i)).toBeInTheDocument();
    expect(screen.getByText(/Billing, treasury, governance execution, ACS provisioning and persistence execution blocked/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Dependencies$/i })).toBeInTheDocument();
    expect(screen.getByText(/Dependency Burden/i)).toBeInTheDocument();
    expect(screen.getByText(/Business Opportunity Registry/i)).toBeInTheDocument();
    expect(screen.getByText(/Non-executive portfolio coordination owner/i)).toBeInTheDocument();
  });

  test('renders AxodusAPP L4 Readiness and D3 with disabled authority', () => {
    renderRouteWithProviders('/portfolio/AxodusAPP', '/portfolio/:nucleusId', <NucleusDetailView />);

    expect(screen.getByRole('heading', { name: /AxodusAPP Detail/i })).toBeInTheDocument();
    expect(cardByTitle(/^AxodusAPP$/i).getAllByText('L4 Readiness').length).toBeGreaterThan(0);
    expect(cardByTitle(/^AxodusAPP$/i).getAllByText('D3').length).toBeGreaterThan(0);
    expect(screen.getByText(/Real backend integration pending; no wallet or transaction flow approved/i)).toBeInTheDocument();
    expect(screen.getAllByText(/AxodusAPP Integration Shell Expansion/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Integration shell and read-only presentation owner/i)).toBeInTheDocument();
    expect(screen.getByText(/Execution Disabled/i)).toBeInTheDocument();
    expect(screen.getByText(/Production Disabled/i)).toBeInTheDocument();
    expect(screen.getByText(/Boundary classification: READ_ONLY_ONLY/i)).toBeInTheDocument();
  });

  test('handles unsupported nucleus routes safely', () => {
    renderRouteWithProviders('/portfolio/Unknown', '/portfolio/:nucleusId', <NucleusDetailView />);

    expect(screen.getByRole('heading', { name: /Nucleus Not Found/i })).toBeInTheDocument();
    expect(screen.getByText(/Supported Nuclei/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Business/i })).toHaveAttribute('href', '/portfolio/Business');
  });

  test('does not expose forbidden execution controls', () => {
    renderRouteWithProviders('/portfolio/Business', '/portfolio/:nucleusId', <NucleusDetailView />);

    expect(screen.queryByRole('button', { name: /execute|approve|trade|swap|settle|withdraw|sign|deploy|pay|provision/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /execute|approve|trade|swap|settle|withdraw|sign|deploy|pay|provision/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/^Execute$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Approve$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Trade$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Swap$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Settle$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Withdraw$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Sign$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Deploy$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Pay$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Provision$/i)).not.toBeInTheDocument();
  });
});
