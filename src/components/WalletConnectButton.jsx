// src/components/WalletConnectButton.jsx
import React, { useState } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { ChevronDown, LogOut, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { hasWalletConnectProjectId } from '../appkit.config';

const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

function ConfiguredWalletButton() {
  const { open } = useAppKit();
  const { address, chain, disconnect, isConnected } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isConnected) {
    return (
      <button
        type="button"
        onClick={() => open?.()}
        className="flex min-w-[156px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary transition-opacity hover:opacity-90"
      >
        <Wallet className="h-4 w-4" aria-hidden="true" />
        Connect wallet
      </button>
    );
  }

  return (
    <div className="relative min-w-[156px]">
      <button
        type="button"
        onClick={() => setIsMenuOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-surface-container-low px-3 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container"
        aria-expanded={isMenuOpen}
      >
        <span className="flex min-w-0 flex-col items-start leading-tight">
          <span className="max-w-[110px] truncate">{shortenAddress(address)}</span>
          <span className="text-[10px] font-medium text-outline">Chain {chain ?? 'unknown'}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-outline" aria-hidden="true" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[90] w-48 rounded-lg border border-white/10 bg-surface-container p-2 shadow-2xl">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              disconnect?.();
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-on-surface hover:bg-surface-container-high"
          >
            <LogOut className="h-4 w-4 text-outline" aria-hidden="true" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

const WalletConnectButton = () => {
  if (!hasWalletConnectProjectId) {
    return (
      <div className="min-w-[156px] rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs font-semibold text-yellow-200">
        Wallet env missing
      </div>
    );
  }

  return <ConfiguredWalletButton />;
};

export default WalletConnectButton;

