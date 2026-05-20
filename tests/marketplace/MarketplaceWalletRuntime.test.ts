import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import {
  EvmProviderRuntimeAdapter,
  ReownAppKitRuntimeAdapter,
  evaluateWalletActionReadiness,
  getMarketplaceWalletRuntime,
  marketplaceWalletSessionMocks,
} from '../../src/modules/marketplace/services/walletRuntime';

describe('Marketplace wallet runtime', () => {
  test('models connected Reown/AppKit sessions without execution paths', async () => {
    const wallet = await ReownAppKitRuntimeAdapter.getSessionPreview(marketplaceWalletSessionMocks.connected);
    const provider = EvmProviderRuntimeAdapter.getProviderReadiness(wallet);

    expect(wallet.lifecycle).toBe('connected');
    expect(wallet.supportedNetwork).toBe(true);
    expect(wallet.signatureRequestEnabled).toBe(false);
    expect(wallet.transactionEnabled).toBe(false);
    expect(wallet.chainWriteEnabled).toBe(false);
    expect(provider.providerReadEnabled).toBe(true);
    expect(provider.transactionEnabled).toBe(false);
  });

  test('reports disconnected and unsupported network states', () => {
    const disconnected = getMarketplaceWalletRuntime(marketplaceWalletSessionMocks.disconnected);
    const unsupported = getMarketplaceWalletRuntime(marketplaceWalletSessionMocks.unsupportedNetwork);

    expect(disconnected.lifecycle).toBe('disconnected');
    expect(disconnected.reasonCodes).toEqual(expect.arrayContaining(['wallet-disconnected']));
    expect(unsupported.lifecycle).toBe('unsupported-network');
    expect(unsupported.reasonCodes).toEqual(expect.arrayContaining(['unsupported-network']));
  });

  test('evaluates permission-aware preview actions with chain mismatch and governance restrictions', () => {
    const product = marketplaceMock.products[0];
    const restrictedProduct = marketplaceMock.products.find((item) => item.governanceStatus === 'restricted')!;
    const mismatchWallet = getMarketplaceWalletRuntime(marketplaceWalletSessionMocks.chainMismatch);
    const matchedWallet = getMarketplaceWalletRuntime({ connected: true, chain: product.supportedChains[0] });

    const mismatch = evaluateWalletActionReadiness({ wallet: mismatchWallet, product, action: 'preview-buy-now' });
    const restricted = evaluateWalletActionReadiness({ wallet: matchedWallet, product: restrictedProduct, action: 'preview-buy-now' });

    expect(mismatch.eligible).toBe(false);
    expect(mismatch.reasonCodes).toEqual(expect.arrayContaining(['product-chain-mismatch', 'no-contract-write']));
    expect(restricted.eligible).toBe(false);
    expect(restricted.reasonCodes).toEqual(expect.arrayContaining(['governance-restricted-asset']));
  });
});
