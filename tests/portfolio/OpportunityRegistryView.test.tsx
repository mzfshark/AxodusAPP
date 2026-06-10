import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { appShellNav } from '../../src/config/appShell';
import { OpportunityRegistryView } from '../../src/features/portfolio';
import { renderRouteWithProviders } from '../test-utils/renderWithProviders';

function cardByTitle(title: RegExp | string) {
  const heading = screen.getByRole('heading', { name: title });
  const card = heading.closest('article');
  expect(card).not.toBeNull();
  return within(card as HTMLElement);
}

describe('Opportunity registry view', () => {
  test('renders official opportunity summary, risk labels and readiness labels', () => {
    renderRouteWithProviders('/portfolio/opportunities', '/portfolio/opportunities', <OpportunityRegistryView />);

    expect(screen.getByRole('heading', { name: /^Opportunity Registry$/i })).toBeInTheDocument();
    expect(cardByTitle(/Opportunity Summary/i).getByText('25')).toBeInTheDocument();

    const table = cardByTitle(/Opportunity Registry Table/i);
    expect(table.getByText(/Business Opportunity Registry/i)).toBeInTheDocument();
    expect(table.getAllByText(/CRITICAL/i).length).toBeGreaterThan(0);
    expect(table.getAllByText(/HIGH/i).length).toBeGreaterThan(0);
    expect(table.getAllByText(/2 = Assessed/i).length).toBeGreaterThan(0);
    expect(table.getAllByText(/3 = Approved/i).length).toBeGreaterThan(0);
  });

  test('filters opportunities by nucleus, readiness, risk and evidence quality', () => {
    renderRouteWithProviders('/portfolio/opportunities', '/portfolio/opportunities', <OpportunityRegistryView />);

    fireEvent.change(screen.getByLabelText(/By Nucleus/i), { target: { value: 'Trading' } });
    let table = cardByTitle(/Opportunity Registry Table/i);
    expect(table.getByText(/Trading Credential Vault And Execution Gate Readiness/i)).toBeInTheDocument();
    expect(table.queryByText(/Business Opportunity Registry/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/By Nucleus/i), { target: { value: 'ALL' } });
    fireEvent.change(screen.getByLabelText(/By Readiness/i), { target: { value: '4 = Ready' } });
    table = cardByTitle(/Opportunity Registry Table/i);
    expect(table.getByText(/Business Non-Executive Coordination Layer/i)).toBeInTheDocument();
    expect(table.getByText(/Dex Provider Reliability And Read-Only Data/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/By Readiness/i), { target: { value: 'ALL' } });
    fireEvent.change(screen.getByLabelText(/By Risk/i), { target: { value: 'CRITICAL' } });
    table = cardByTitle(/Opportunity Registry Table/i);
    expect(table.getByText(/Vault.Country/i)).toBeInTheDocument();
    expect(table.queryByText(/Business Product Catalog And Portfolio Registry/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/By Risk/i), { target: { value: 'ALL' } });
    fireEvent.change(screen.getByLabelText(/By Evidence Quality/i), { target: { value: 'MEDIUM' } });
    table = cardByTitle(/Opportunity Registry Table/i);
    expect(table.getByText(/AxodusAPP Integration Shell Expansion/i)).toBeInTheDocument();
  });

  test('renders opportunity detail and authority boundary notice', () => {
    renderRouteWithProviders('/portfolio/opportunities', '/portfolio/opportunities', <OpportunityRegistryView />);

    fireEvent.click(screen.getByRole('button', { name: /AxodusAPP Integration Shell Expansion/i }));

    const detail = cardByTitle(/Opportunity Detail/i);
    expect(detail.getByText(/Read-only portfolio opportunity record/i)).toBeInTheDocument();
    expect(detail.getByText(/^Owner$/i)).toBeInTheDocument();
    expect(detail.getByText(/^Dependencies$/i)).toBeInTheDocument();
    expect(detail.getByText(/^Authority Requirements$/i)).toBeInTheDocument();
    expect(detail.getByText(/^Blockers$/i)).toBeInTheDocument();

    expect(screen.getByText(/Viewing Opportunity Intelligence Only/i)).toBeInTheDocument();
    expect(screen.getByText(/No approval authority/i)).toBeInTheDocument();
    expect(screen.getByText(/No promotion authority/i)).toBeInTheDocument();
    expect(screen.getByText(/No execution authority/i)).toBeInTheDocument();
  });

  test('registers route navigation and does not expose forbidden authority controls', () => {
    renderRouteWithProviders('/portfolio/opportunities', '/portfolio/opportunities', <OpportunityRegistryView />);

    const portfolioEntry = appShellNav.primary.find((item) => item.id === 'portfolio');
    expect(portfolioEntry?.sections?.some((section) => section.to === '/portfolio/opportunities')).toBe(true);

    expect(screen.queryByRole('button', { name: /approve|promote|execute workflow|grant authority/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /approve|promote|execute workflow|grant authority/i })).not.toBeInTheDocument();
  });
});
