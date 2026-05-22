import type { MarketplaceWalletSession } from './walletRuntime';
import { WalletOwnershipReadAdapter } from './walletRuntime';

export type NftOwnershipPreviewStatus =
  | 'disconnected'
  | 'unsupported-chain'
  | 'chain-mismatch'
  | 'restricted'
  | 'verification-placeholder'
  | 'preview-owned'
  | 'preview-not-owned';

export type NftAssetModel =
  | 'ERC721'
  | 'ERC1155'
  | 'LicenseBoundNFT'
  | 'AccessNFT'
  | 'GovernanceNFT'
  | 'OffchainLicense';

interface OwnershipProductLike {
  id: string;
  category?: string;
  licenseType?: string;
  accessModel?: string;
  nftBound?: boolean;
  supportedChains?: string[];
  tokenStandard?: string;
  contractAddress?: string;
  tokenId?: string;
  governanceStatus?: string;
  validationStatus?: string;
}

export function getNftOwnershipRuntime({ product, wallet }: { product: OwnershipProductLike; wallet: MarketplaceWalletSession }) {
  const supportedChain = Boolean(wallet.chain && product.supportedChains?.includes(wallet.chain));
  const restricted = product.governanceStatus === 'restricted' || product.validationStatus === 'restricted';
  const status = resolveOwnershipStatus({ wallet, supportedChain, restricted, product });
  const readPreview = WalletOwnershipReadAdapter.previewOwnershipRead({ wallet, product });

  return {
    service: 'NftOwnershipRuntime',
    mode: 'mock-only',
    productId: product.id,
    status,
    nftModel: resolveNftAssetModel(product),
    tokenStandard: product.tokenStandard ?? 'OffchainLicense',
    contractAddress: product.contractAddress ?? 'mock:offchain-license',
    tokenId: product.tokenId ?? 'not-minted',
    walletAddress: wallet.address,
    walletChain: wallet.chain,
    requiredChains: product.supportedChains ?? [],
    supportedChain,
    ownershipPreview: status === 'preview-owned' ? 'owned-preview' : 'not-owned-preview',
    ownershipReadEnabled: false,
    ownershipVerificationEnabled: false,
    chainReadEnabled: false,
    reasonCodes: getOwnershipReasonCodes({ wallet, supportedChain, restricted, product }),
    readPreview,
    disclaimer: 'Mock ownership readiness only. No live NFT ownership read, signature, or contract call.',
  };
}

export function resolveNftAssetModel(product: OwnershipProductLike): NftAssetModel {
  if (product.tokenStandard === 'ERC721') {
    if (product.category === 'Governance' || product.licenseType?.includes('Governance')) return 'GovernanceNFT';
    if (product.accessModel?.includes('wallet') || product.licenseType?.includes('Access')) return 'AccessNFT';
    return 'ERC721';
  }

  if (product.tokenStandard === 'ERC1155') {
    if (product.licenseType?.includes('Subscription') || product.licenseType?.includes('License')) return 'LicenseBoundNFT';
    return 'ERC1155';
  }

  return product.nftBound ? 'LicenseBoundNFT' : 'OffchainLicense';
}

function resolveOwnershipStatus({
  wallet,
  supportedChain,
  restricted,
  product,
}: {
  wallet: MarketplaceWalletSession;
  supportedChain: boolean;
  restricted: boolean;
  product: OwnershipProductLike;
}): NftOwnershipPreviewStatus {
  if (!wallet.connected) return 'disconnected';
  if (!wallet.supportedNetwork) return 'unsupported-chain';
  if (!supportedChain) return 'chain-mismatch';
  if (restricted) return 'restricted';
  if (!product.nftBound) return 'verification-placeholder';
  return product.validationStatus === 'approved' || product.governanceStatus === 'compliant' ? 'preview-owned' : 'preview-not-owned';
}

function getOwnershipReasonCodes({
  wallet,
  supportedChain,
  restricted,
  product,
}: {
  wallet: MarketplaceWalletSession;
  supportedChain: boolean;
  restricted: boolean;
  product: OwnershipProductLike;
}) {
  return [
    wallet.connected ? null : 'wallet-disconnected',
    wallet.supportedNetwork ? null : 'unsupported-network',
    supportedChain ? null : 'chain-mismatch',
    product.nftBound ? null : 'not-nft-bound',
    restricted ? 'governance-restricted-asset' : null,
    product.contractAddress ? null : 'contract-placeholder-missing',
    product.contractAddress?.startsWith('mock:') ? 'mock-contract-address' : null,
    'preview-only',
    'ownership-verification-disabled',
    'no-chain-read',
  ].filter(Boolean) as string[];
}
