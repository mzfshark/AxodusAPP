import { screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { appShellNav } from '../../src/config/appShell';
import { PortfolioOverviewDashboard } from '../../src/features/portfolio';
import PortfolioOverview from '../../src/pages/PortfolioOverview';
import { renderRouteWithProviders } from '../test-utils/renderWithProviders';

function cardByTitle(title: RegExp | string) {
  const heading = screen.getByRole('heading', { name: title });
  const card = heading.closest('article');
  expect(card).not.toBeNull();
  return within(card as HTMLElement);
}

describe('Portfolio overview dashboard', () => {
  test('renders service-backed portfolio metrics and maturity signals', () => {
    renderRouteWithProviders('/portfolio', '/portfolio', <PortfolioOverviewDashboard />);

    expect(screen.getByRole('heading', { name: /Portfolio Overview/i })).toBeInTheDocument();
    expect(cardByTitle(/Nuclei/i).getByText('14')).toBeInTheDocument();
    expect(cardByTitle(/Opportunities/i).getByText('25')).toBeInTheDocument();
    expect(cardByTitle(/Dependencies/i).getByText('58')).toBeInTheDocument();
    expect(cardByTitle(/Blocked Actions/i).getByText('26')).toBeInTheDocument();
    expect(cardByTitle(/Boundary Conflicts/i).getByText('14')).toBeInTheDocument();
    expect(cardByTitle(/Execution Authorized/i).getAllByText(/Disabled/i).length).toBeGreaterThan(0);
    expect(cardByTitle(/Production Ready/i).getAllByText(/Disabled/i).length).toBeGreaterThan(0);

    expect(screen.getByText(/Business is L4 Consolidated with development maturity D2/i)).toBeInTheDocument();
    expect(screen.getByText(/AxodusAPP is L4 Readiness with development maturity D3/i)).toBeInTheDocument();
    expect(screen.getAllByText(/No execution authority is granted/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/No production readiness is claimed/i).length).toBeGreaterThan(0);
  });

  test('renders L-level and D-level distributions from service data', () => {
    renderRouteWithProviders('/portfolio', '/portfolio', <PortfolioOverviewDashboard />);

    const lDistribution = cardByTitle(/L-level Distribution/i);
    expect(lDistribution.getByText('L5')).toBeInTheDocument();
    expect(lDistribution.getByText('Core')).toBeInTheDocument();
    expect(lDistribution.getByText('Governance')).toBeInTheDocument();
    expect(lDistribution.getByText('L4 Consolidated')).toBeInTheDocument();
    expect(lDistribution.getByText('Business')).toBeInTheDocument();
    expect(lDistribution.getByText('L4 Readiness')).toBeInTheDocument();
    expect(lDistribution.getByText('AxodusAPP')).toBeInTheDocument();
    expect(lDistribution.getByText('L3')).toBeInTheDocument();
    expect(lDistribution.getByText('BBA-Agency')).toBeInTheDocument();
    expect(lDistribution.getByText('Lottery')).toBeInTheDocument();

    const dDistribution = cardByTitle(/D-level Distribution/i);
    expect(dDistribution.getByText('D3')).toBeInTheDocument();
    expect(dDistribution.getByText('Trading')).toBeInTheDocument();
    expect(dDistribution.getByText('D2')).toBeInTheDocument();
    expect(dDistribution.getByText('Marketplace')).toBeInTheDocument();
  });

  test('does not render forbidden action controls or labels as actions', () => {
    renderRouteWithProviders('/portfolio', '/portfolio', <PortfolioOverviewDashboard />);

    expect(screen.queryByRole('button', { name: /execute|trade|swap|settle|payout|withdraw|sign wallet|deploy contract|approve transaction/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /execute|trade|swap|settle|payout|withdraw|sign wallet|deploy contract|approve transaction/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/^Execute$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Trade$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Swap$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Settle$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Payout$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Withdraw$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Sign Wallet$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Deploy Contract$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Approve Transaction$/i)).not.toBeInTheDocument();
  });

  test('page and app shell route integration are registered as read-only protocol navigation', () => {
    renderRouteWithProviders('/portfolio', '/portfolio', <PortfolioOverview />);

    const portfolioEntry = appShellNav.primary.find((item) => item.id === 'portfolio');
    expect(portfolioEntry).toMatchObject({
      label: 'Portfolio',
      routeBase: '/portfolio',
      scope: 'protocol',
      maturity: 'D3',
    });
    expect(screen.getByRole('heading', { name: /Portfolio Overview/i })).toBeInTheDocument();
  });
});
