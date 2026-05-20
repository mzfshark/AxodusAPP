import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import { MarketplaceAssetGallery } from '../../src/modules/marketplace';

function renderGallery(initialEntry = '/marketplace/assets') {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/marketplace/assets" element={<MarketplaceAssetGallery />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Marketplace asset gallery', () => {
  test('renders NFT and license assets from centralized marketplace mock data', () => {
    renderGallery();

    expect(screen.getByRole('heading', { name: /Asset Gallery/i })).toBeInTheDocument();
    expect(screen.getByText(/Registry assets/i)).toBeInTheDocument();
    expect(screen.getByText(/NFT bound/i)).toBeInTheDocument();
    expect(screen.getByText(/Signed URL ready/i)).toBeInTheDocument();
    expect(screen.getByText(/Bridge ready/i)).toBeInTheDocument();

    for (const product of marketplaceMock.products) {
      expect(screen.getByRole('link', { name: new RegExp(product.title, 'i') })).toBeInTheDocument();
    }
  });

  test('filters gallery by token standard through URL query params', () => {
    renderGallery('/marketplace/assets?tokenStandard=ERC1155');

    expect(screen.getByRole('link', { name: /Academy Certification ERC1155 Bundle/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Governance Dashboard NFT Access/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /MCP Agent Template License/i })).not.toBeInTheDocument();
  });
});
