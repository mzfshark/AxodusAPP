// src/hooks/useWallet.jsx
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { useAccount } from 'wagmi';

export function useWallet() {
  // Preferir wagmi para EVM
  const { address: wagmiAddress, isConnected: wagmiConnected, chainId } = useAccount();
  
  // AppKit v1 hooks
  const { address: akAddress, isConnected: akConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  const address = wagmiAddress || akAddress || null;
  const isConnected = Boolean(wagmiConnected || akConnected) && Boolean(address);

  return {
    address,
    isConnected,
    chain: chainId,
    disconnect,
    openAppKit: open
  };
}
