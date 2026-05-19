import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { bbaMock } from '../src/data/mock';
import { BbaHome } from '../src/modules/bba';
import { filterBbaCampaigns, filterBbaServices } from '../src/modules/bba/services/bbaService';

describe('BBA nucleus MVP', () => {
  test('exposes required mock entity collections', () => {
    expect(bbaMock.services.length).toBeGreaterThan(0);
    expect(bbaMock.campaigns.length).toBeGreaterThan(0);
    expect(bbaMock.clientPartners.length).toBeGreaterThan(0);
    expect(bbaMock.proposals.length).toBeGreaterThan(0);
    expect(bbaMock.workflows.length).toBeGreaterThan(0);
    expect(bbaMock.brandAssets.length).toBeGreaterThan(0);
    expect(bbaMock.institutionalChannels.length).toBeGreaterThan(0);
    expect(bbaMock.deliverables.length).toBeGreaterThan(0);
  });

  test('filters services and campaigns by governance and reputation risk', () => {
    const compliantServices = filterBbaServices({ governanceStanding: 'compliant' });
    expect(compliantServices.every((service) => service.constitutionalStanding === 'compliant' || service.governanceStatus === 'compliant')).toBe(true);

    const highRiskCampaigns = filterBbaCampaigns({ reputationRisk: 'high' });
    expect(highRiskCampaigns.every((campaign) => campaign.publicReputationRisk === 'high')).toBe(true);
  });

  test('renders BBA home as read-only institutional agency surface', () => {
    render(
      <MemoryRouter>
        <BbaHome />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'BBA Agency' })).toBeInTheDocument();
    expect(screen.getByText(/strategic institutional agency nucleus/i)).toBeInTheDocument();
    expect(screen.getByText(/mock-driven and read-only/i)).toBeInTheDocument();
  });
});
