import { screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { appShellNav } from '../../src/config/appShell';
import { AuthorityDashboardView } from '../../src/features/portfolio';
import { renderRouteWithProviders } from '../test-utils/renderWithProviders';

function cardByTitle(title: RegExp | string) {
  const heading = screen.getByRole('heading', { name: title });
  const card = heading.closest('article');
  expect(card).not.toBeNull();
  return within(card as HTMLElement);
}

describe('Authority dashboard view', () => {
  test('renders authority matrix and required classifications', () => {
    renderRouteWithProviders('/portfolio/authority', '/portfolio/authority', <AuthorityDashboardView />);

    expect(screen.getByRole('heading', { name: /Authority & Boundary Dashboard/i })).toBeInTheDocument();

    const matrix = cardByTitle(/Execution Authority Matrix/i);
    expect(matrix.getByRole('columnheader', { name: /Nucleus/i })).toBeInTheDocument();
    expect(matrix.getByRole('columnheader', { name: /Authority Status/i })).toBeInTheDocument();
    expect(matrix.getByRole('columnheader', { name: /Execution Classification/i })).toBeInTheDocument();
    expect(matrix.getByRole('columnheader', { name: /Production Classification/i })).toBeInTheDocument();
    expect(matrix.getByRole('columnheader', { name: /Boundary Classification/i })).toBeInTheDocument();
    expect(matrix.getAllByText(/NON_EXECUTIVE/i).length).toBeGreaterThan(0);
    expect(matrix.getAllByText(/READ_ONLY/i).length).toBeGreaterThan(0);
    expect(matrix.getAllByText(/MOCK_LOCAL/i).length).toBeGreaterThan(0);
    expect(matrix.getAllByText(/GOVERNANCE_GATED/i).length).toBeGreaterThan(0);
    expect(matrix.getAllByText(/TREASURY_GATED/i).length).toBeGreaterThan(0);
    expect(matrix.getAllByText(/EXECUTION_SENSITIVE_BLOCKED/i).length).toBeGreaterThan(0);
  });

  test('renders blocked actions and boundary conflicts from portfolio summary', () => {
    renderRouteWithProviders('/portfolio/authority', '/portfolio/authority', <AuthorityDashboardView />);

    const blockedActions = cardByTitle(/Blocked Action Registry/i);
    expect(blockedActions.getAllByText(/26 blocked actions/i).length).toBeGreaterThan(0);
    expect(blockedActions.getByText(/^Governance$/i)).toBeInTheDocument();
    expect(blockedActions.getByText(/^Treasury$/i)).toBeInTheDocument();
    expect(blockedActions.getByText(/^Trading$/i)).toBeInTheDocument();
    expect(blockedActions.getByText(/^Settlement$/i)).toBeInTheDocument();
    expect(blockedActions.getByText(/^Payout$/i)).toBeInTheDocument();
    expect(blockedActions.getByText(/^Wallet$/i)).toBeInTheDocument();
    expect(blockedActions.getByText(/^Production$/i)).toBeInTheDocument();

    const conflicts = cardByTitle(/Boundary Conflict Viewer/i);
    expect(conflicts.getAllByText(/14 boundary tensions/i).length).toBeGreaterThan(0);
    expect(conflicts.getByText(/^Ownership$/i)).toBeInTheDocument();
    expect(conflicts.getByText(/^Execution$/i)).toBeInTheDocument();
    expect(conflicts.getByText(/^Custody$/i)).toBeInTheDocument();
    expect(conflicts.getByText(/^Governance$/i)).toBeInTheDocument();
  });

  test('renders zero authority summary and boundary notice', () => {
    renderRouteWithProviders('/portfolio/authority', '/portfolio/authority', <AuthorityDashboardView />);

    const summary = cardByTitle(/Ecosystem Authority Summary/i);
    expect(summary.getByText(/Execution Authorized/i)).toBeInTheDocument();
    expect(summary.getByText(/Production Authorized/i)).toBeInTheDocument();
    expect(summary.getByText(/Treasury Authorized/i)).toBeInTheDocument();
    expect(summary.getAllByText('0')).toHaveLength(3);

    expect(screen.getByText(/This Dashboard Grants No Authority/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Visibility only/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/No governance execution/i)).toBeInTheDocument();
    expect(screen.getByText(/No treasury execution/i)).toBeInTheDocument();
    expect(screen.getByText(/No production authority/i)).toBeInTheDocument();
  });

  test('registers route navigation and exposes no authority action controls', () => {
    renderRouteWithProviders('/portfolio/authority', '/portfolio/authority', <AuthorityDashboardView />);

    const portfolioEntry = appShellNav.primary.find((item) => item.id === 'portfolio');
    expect(portfolioEntry?.sections?.some((section) => section.to === '/portfolio/authority')).toBe(true);

    expect(screen.queryByRole('button', { name: /grant|execute|approve|authorize|move treasury|sign wallet/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /grant|execute|approve|authorize|move treasury|sign wallet/i })).not.toBeInTheDocument();
  });
});
