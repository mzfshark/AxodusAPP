import { marketplaceMock } from '@/data/mock';

interface RoyaltyProductLike {
  id: string;
  pricing?: {
    amount?: number;
    currency?: string;
  };
  royaltyModel?: {
    standard?: string;
    bps?: number;
    recipient?: string;
    previewAmount?: number;
  };
  treasuryDestination?: string;
  sellerId?: string;
}

export function getRoyaltyRuntimePreview(product: RoyaltyProductLike) {
  const amount = Number(product.pricing?.amount ?? 0);
  const bps = Number(product.royaltyModel?.bps ?? 0);
  const previewAmount = Number(product.royaltyModel?.previewAmount ?? ((amount * bps) / 10000).toFixed(4));
  const platformFee = Number((amount * 0.025).toFixed(4));
  const treasurySplit = Number(Math.max(amount - previewAmount - platformFee, 0).toFixed(4));

  return {
    service: 'RoyaltyRuntimeService',
    mode: 'mock-only',
    productId: product.id,
    standard: product.royaltyModel?.standard ?? 'None',
    eip2981ReadPrepared: product.royaltyModel?.standard === 'EIP-2981',
    eip2981ReadEnabled: false,
    royaltySettlementEnabled: false,
    accountingWriteEnabled: false,
    bps,
    recipient: product.royaltyModel?.recipient ?? 'pending-recipient',
    currency: product.pricing?.currency ?? 'USDC',
    creatorSplitPreview: {
      recipient: product.royaltyModel?.recipient ?? product.sellerId ?? 'pending-recipient',
      amount: previewAmount,
      bps,
    },
    treasurySplitPreview: {
      destination: product.treasuryDestination ?? 'pending-treasury-route',
      amount: treasurySplit,
    },
    platformFeePreview: {
      recipient: 'Axodus Marketplace Treasury',
      amount: platformFee,
      bps: 250,
    },
    accountingPreview: {
      grossAmount: amount,
      royaltyAmount: previewAmount,
      platformFee,
      netTreasuryPreview: treasurySplit,
    },
    reasonCodes: [
      product.royaltyModel?.standard === 'EIP-2981' ? 'eip-2981-preview-ready' : 'custom-royalty-preview',
      'preview-only',
      'no-royalty-settlement',
      'no-treasury-execution',
      'no-contract-read',
    ],
    disclaimer: 'Royalty runtime is accounting-preview only. No EIP-2981 read or royalty settlement is executed.',
  };
}

export function getRoyaltyAccountingSummary(products: RoyaltyProductLike[] = marketplaceMock.products) {
  const previews = products.map((product) => getRoyaltyRuntimePreview(product));
  return {
    service: 'RoyaltyRuntimeSummary',
    mode: 'mock-only',
    productCount: previews.length,
    eip2981PreparedCount: previews.filter((preview) => preview.eip2981ReadPrepared).length,
    totalRoyaltyPreview: Number(previews.reduce((sum, preview) => sum + preview.accountingPreview.royaltyAmount, 0).toFixed(4)),
    totalPlatformFeePreview: Number(previews.reduce((sum, preview) => sum + preview.accountingPreview.platformFee, 0).toFixed(4)),
    royaltySettlementEnabled: false,
    treasuryExecutionEnabled: false,
  };
}
