import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import { MarketplaceProductDetail } from '../../src/modules/marketplace';
import { getNftOwnershipRuntime } from '../../src/modules/marketplace/services/nftOwnershipRuntime';
import { getMarketplaceWalletRuntime, marketplaceWalletSessionMocks } from '../../src/modules/marketplace/services/walletRuntime';

describe('Marketplace NFT ownership runtime', () => {
  test('prepares ERC721 ownership preview without live chain reads', () => {
    const product = marketplaceMock.products.find((item) => item.tokenStandard === 'ERC721')!;
    const wallet = getMarketplaceWalletRuntime({ connected: true, chain: product.supportedChains[0] });
    const ownership = getNftOwnershipRuntime({ product, wallet });

    expect(ownership.nftModel).toBe('GovernanceNFT');
    expect(ownership.status).toBe('preview-owned');
    expect(ownership.ownershipReadEnabled).toBe(false);
    expect(ownership.ownershipVerificationEnabled).toBe(false);
    expect(ownership.reasonCodes).toEqual(expect.arrayContaining(['mock-contract-address', 'no-chain-read']));
  });

  test('handles disconnected and restricted ownership readiness states', () => {
    const product = marketplaceMock.products[0];
    const restrictedProduct = marketplaceMock.products.find((item) => item.governanceStatus === 'restricted')!;
    const disconnected = getNftOwnershipRuntime({
      product,
      wallet: getMarketplaceWalletRuntime(marketplaceWalletSessionMocks.disconnected),
    });
    const restricted = getNftOwnershipRuntime({
      product: restrictedProduct,
      wallet: getMarketplaceWalletRuntime({ connected: true, chain: restrictedProduct.supportedChains[0] }),
    });

    expect(disconnected.status).toBe('disconnected');
    expect(disconnected.reasonCodes).toEqual(expect.arrayContaining(['wallet-disconnected']));
    expect(restricted.status).toBe('restricted');
    expect(restricted.reasonCodes).toEqual(expect.arrayContaining(['governance-restricted-asset']));
  });

  test('renders wallet and ownership runtime panels on product detail', () => {
    render(
      <MemoryRouter initialEntries={['/marketplace/products/governance-dashboard-nft-access']}>
        <Routes>
          <Route path="/marketplace/products/:slug" element={<MarketplaceProductDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Wallet runtime/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Ownership readiness/i })).toBeInTheDocument();
    expect(screen.getByText(/No signature\. No wallet transaction\. No chain write\./i)).toBeInTheDocument();
    expect(screen.getByText(/Ownership read enabled: no/i)).toBeInTheDocument();
  });
});
