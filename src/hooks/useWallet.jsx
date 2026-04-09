// src/hooks/useWallet.jsx
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from 'wagmi';

export function useWallet() {
  // Preferir wagmi para EVM
  const { address: wagmiAddress, isConnected: wagmiConnected, chainId } = useAccount();
  // Fallback appkit
  const { account, connected, disconnect } = useAppKit();

  const address = wagmiAddress || account?.address || null;
  const isConnected = Boolean(wagmiConnected || connected) && Boolean(address);

  return {
    address,
    isConnected,
    chain: chainId,
    disconnect,
  };
}
