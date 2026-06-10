import { screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { appShellNav } from '../../src/config/appShell';
import { DependencyGraphView } from '../../src/features/portfolio';
import { renderRouteWithProviders } from '../test-utils/renderWithProviders';

function cardByTitle(title: RegExp | string) {
  const heading = screen.getByRole('heading', { name: title });
  const card = heading.closest('article');
  expect(card).not.toBeNull();
  return within(card as HTMLElement);
}

describe('Dependency graph view', () => {
  test('renders official dependency summary and service-backed matrix', () => {
    renderRouteWithProviders('/portfolio/dependencies', '/portfolio/dependencies', <DependencyGraphView />);

    expect(screen.getByRole('heading', { name: /^Dependency Graph$/i })).toBeInTheDocument();
    const summary = cardByTitle(/Dependency Graph Summary/i);
    expect(summary.getByText('58')).toBeInTheDocument();
    expect(summary.getByText('33')).toBeInTheDocument();
    expect(summary.getByText('25')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Source Nucleus/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Target Nucleus/i })).toBeInTheDocument();
    expect(screen.getByText(/DEP-NN-002/i)).toBeInTheDocument();
    expect(screen.getAllByText(/BLOCKING_EXECUTION/i).length).toBeGreaterThan(0);
  });

  test('renders critical chains, dependency burden and ecosystem hubs', () => {
    renderRouteWithProviders('/portfolio/dependencies', '/portfolio/dependencies', <DependencyGraphView />);

    expect(screen.getByText(/Vault.Country -> Defi -> Governance\/Core/i)).toBeInTheDocument();
    expect(screen.getByText(/Trading Credential Vault -> Trading -> Governance -> Defi -> ACS/i)).toBeInTheDocument();
    expect(screen.getByText(/Marketplace Settlement -> Marketplace -> Defi -> Governance -> AxodusAPP/i)).toBeInTheDocument();
    expect(screen.getByText(/Dex.Country -> Dex -> Defi -> Governance -> AxodusAPP/i)).toBeInTheDocument();

    const burden = cardByTitle(/Dependency Burden Summary/i);
    expect(burden.getAllByText(/LOW|MEDIUM|HIGH|CRITICAL/i).length).toBeGreaterThan(0);
    expect(burden.getByText(/Business/i)).toBeInTheDocument();
    expect(burden.getByText(/AxodusAPP/i)).toBeInTheDocument();

    const hubs = cardByTitle(/Ecosystem Hub View/i);
    expect(hubs.getByText(/Core/i)).toBeInTheDocument();
    expect(hubs.getByText(/Governance/i)).toBeInTheDocument();
    expect(hubs.getByText(/Business/i)).toBeInTheDocument();
    expect(hubs.getByText(/Defi/i)).toBeInTheDocument();
    expect(hubs.getByText(/AxodusAPP/i)).toBeInTheDocument();
  });

  test('renders visualization-only boundary and route navigation', () => {
    renderRouteWithProviders('/portfolio/dependencies', '/portfolio/dependencies', <DependencyGraphView />);

    expect(screen.getAllByText(/Visualization Only/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/No integration execution/i)).toBeInTheDocument();
    expect(screen.getByText(/No dependency resolution/i)).toBeInTheDocument();
    expect(screen.getByText(/Execution Disabled/i)).toBeInTheDocument();
    expect(screen.getAllByText(/No production behavior/i).length).toBeGreaterThan(0);

    const portfolioEntry = appShellNav.primary.find((item) => item.id === 'portfolio');
    expect(portfolioEntry?.sections?.some((section) => section.to === '/portfolio/dependencies')).toBe(true);
  });

  test('does not expose forbidden dependency action controls', () => {
    renderRouteWithProviders('/portfolio/dependencies', '/portfolio/dependencies', <DependencyGraphView />);

    expect(screen.queryByRole('button', { name: /create integration|execute dependency|enable api|trigger workflow|grant authority|resolve dependency/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /create integration|execute dependency|enable api|trigger workflow|grant authority|resolve dependency/i })).not.toBeInTheDocument();
  });
});
