import { marketplaceMock } from '@/data/mock';

export type MarketplaceWalletLifecycle =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'unsupported-network'
  | 'chain-mismatch'
  | 'restricted';

export type MarketplaceWalletPermission =
  | 'view-listing'
  | 'preview-buy-now'
  | 'preview-bid'
  | 'preview-ownership'
  | 'preview-license';

export interface MarketplaceWalletSession {
  adapter: 'ReownAppKitRuntimeAdapter';
  mode: 'mock-only';
  lifecycle: MarketplaceWalletLifecycle;
  connected: boolean;
  address: string | null;
  chain: string | null;
  chainId: number | null;
  supportedNetwork: boolean;
  signatureRequestEnabled: false;
  transactionEnabled: false;
  chainWriteEnabled: false;
  permissions: MarketplaceWalletPermission[];
  reasonCodes: string[];
  disclaimer: string;
}

const chainIds: Record<string, number> = {
  Ethereum: 1,
  Polygon: 137,
  Arbitrum: 42161,
  BNB: 56,
};

export const supportedMarketplaceChains = Object.freeze(Object.keys(chainIds));

export const marketplaceWalletSessionMocks = Object.freeze({
  disconnected: {
    connected: false,
    address: null,
    chain: null,
  },
  connected: {
    connected: true,
    address: '0xAxoD00000000000000000000000000000000Mock',
    chain: 'Polygon',
  },
  unsupportedNetwork: {
    connected: true,
    address: '0xAxoD00000000000000000000000000000000Mock',
    chain: 'Harmony',
  },
  chainMismatch: {
    connected: true,
    address: '0xAxoD00000000000000000000000000000000Mock',
    chain: 'BNB',
  },
});

export function createMarketplaceWalletSession(input: Partial<MarketplaceWalletSession> & { chain?: string | null; connected?: boolean; address?: string | null } = {}): MarketplaceWalletSession {
  const connected = Boolean(input.connected);
  const chain = input.chain ?? null;
  const supportedNetwork = Boolean(chain && supportedMarketplaceChains.includes(chain));
  const lifecycle = resolveWalletLifecycle({
    connected,
    chain,
    requestedLifecycle: input.lifecycle,
  });

  return {
    adapter: 'ReownAppKitRuntimeAdapter',
    mode: 'mock-only',
    lifecycle,
    connected,
    address: connected ? input.address ?? marketplaceWalletSessionMocks.connected.address : null,
    chain,
    chainId: chain ? chainIds[chain] ?? null : null,
    supportedNetwork,
    signatureRequestEnabled: false,
    transactionEnabled: false,
    chainWriteEnabled: false,
    permissions: connected && supportedNetwork
      ? ['view-listing', 'preview-buy-now', 'preview-bid', 'preview-ownership', 'preview-license']
      : ['view-listing'],
    reasonCodes: getWalletReasonCodes({ connected, chain, supportedNetwork, lifecycle }),
    disclaimer: 'Preview only. No wallet signature, transaction, or chain write is enabled.',
  };
}

export function getMarketplaceWalletRuntime(input: Partial<MarketplaceWalletSession> & { chain?: string | null; connected?: boolean; address?: string | null } = {}): MarketplaceWalletSession {
  return createMarketplaceWalletSession({
    ...marketplaceWalletSessionMocks.connected,
    ...input,
  });
}

export function evaluateWalletActionReadiness({
  wallet,
  product,
  action,
}: {
  wallet: MarketplaceWalletSession;
  product?: { supportedChains?: string[]; governanceStatus?: string; validationStatus?: string; nftBound?: boolean } | null;
  action: MarketplaceWalletPermission;
}) {
  const productSupportsWalletChain = Boolean(wallet.chain && product?.supportedChains?.includes(wallet.chain));
  const restricted = product?.governanceStatus === 'restricted' || product?.validationStatus === 'restricted';
  const eligible = Boolean(
    wallet.connected
      && wallet.supportedNetwork
      && productSupportsWalletChain
      && !restricted
      && wallet.permissions.includes(action),
  );

  const reasonCodes = [
    wallet.connected ? null : 'wallet-disconnected',
    wallet.supportedNetwork ? null : 'unsupported-network',
    productSupportsWalletChain ? null : 'product-chain-mismatch',
    restricted ? 'governance-restricted-asset' : null,
    wallet.permissions.includes(action) ? null : 'permission-unavailable',
    'preview-only',
    'no-wallet-transaction',
    'no-contract-write',
  ].filter(Boolean) as string[];

  return {
    service: 'WalletActionReadiness',
    action,
    eligible,
    lifecycle: restricted ? 'restricted' : eligible ? 'connected' : wallet.lifecycle,
    productSupportsWalletChain,
    permissionAware: true,
    signatureRequestEnabled: false,
    transactionEnabled: false,
    chainWriteEnabled: false,
    reasonCodes,
  };
}

export const ReownAppKitRuntimeAdapter = {
  getSessionPreview: async (input: Partial<MarketplaceWalletSession> & { chain?: string | null; connected?: boolean; address?: string | null } = {}) => getMarketplaceWalletRuntime(input),
  getSupportedChains: () => supportedMarketplaceChains,
};

export const EvmProviderRuntimeAdapter = {
  getProviderReadiness: (wallet: MarketplaceWalletSession) => ({
    adapter: 'EvmProviderRuntimeAdapter',
    mode: 'mock-only',
    connected: wallet.connected,
    chain: wallet.chain,
    chainId: wallet.chainId,
    providerReadEnabled: wallet.connected && wallet.supportedNetwork,
    signatureRequestEnabled: false,
    transactionEnabled: false,
    chainWriteEnabled: false,
    reasonCodes: wallet.reasonCodes,
    disclaimer: 'Provider runtime is read-prepared only. No signature or write path is enabled.',
  }),
};

export const WalletOwnershipReadAdapter = {
  previewOwnershipRead: ({
    wallet,
    product,
  }: {
    wallet: MarketplaceWalletSession;
    product: { id: string; supportedChains?: string[]; tokenStandard?: string; contractAddress?: string; tokenId?: string; nftBound?: boolean };
  }) => ({
    adapter: 'WalletOwnershipReadAdapter',
    mode: 'mock-only',
    productId: product.id,
    walletAddress: wallet.address,
    chain: wallet.chain,
    supportedChain: Boolean(wallet.chain && product.supportedChains?.includes(wallet.chain)),
    tokenStandard: product.tokenStandard ?? 'OffchainLicense',
    contractAddress: product.contractAddress ?? 'mock:offchain-license',
    tokenId: product.tokenId ?? 'not-minted',
    ownershipReadEnabled: false,
    ownershipVerificationEnabled: false,
    disclaimer: 'Ownership reads are preview-shaped only. No live chain read is performed.',
  }),
};

export function getWalletRuntimeSummary() {
  return {
    service: 'WalletRuntimeService',
    supportedChains: supportedMarketplaceChains,
    supportedProductChains: [...new Set(marketplaceMock.products.flatMap((product) => product.supportedChains ?? []))],
    reownAppKitPrepared: true,
    evmProviderPrepared: true,
    ownershipReadPrepared: true,
    signatureRequestEnabled: false,
    transactionEnabled: false,
    chainWriteEnabled: false,
  };
}

function resolveWalletLifecycle({
  connected,
  chain,
  requestedLifecycle,
}: {
  connected: boolean;
  chain: string | null;
  requestedLifecycle?: MarketplaceWalletLifecycle;
}): MarketplaceWalletLifecycle {
  if (requestedLifecycle) return requestedLifecycle;
  if (!connected) return 'disconnected';
  if (!chain || !supportedMarketplaceChains.includes(chain)) return 'unsupported-network';
  return 'connected';
}

function getWalletReasonCodes({
  connected,
  chain,
  supportedNetwork,
  lifecycle,
}: {
  connected: boolean;
  chain: string | null;
  supportedNetwork: boolean;
  lifecycle: MarketplaceWalletLifecycle;
}) {
  return [
    connected ? null : 'wallet-disconnected',
    chain ? null : 'chain-unavailable',
    supportedNetwork ? null : 'unsupported-network',
    lifecycle === 'chain-mismatch' ? 'chain-mismatch' : null,
    lifecycle === 'restricted' ? 'wallet-action-restricted' : null,
    'preview-only',
    'no-signature-request',
    'no-wallet-transaction',
    'no-chain-write',
  ].filter(Boolean) as string[];
}
