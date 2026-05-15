// src/hooks/useWallet.jsx
import { useAccount, useDisconnect } from 'wagmi';

export function useWallet() {
  const { address, isConnected: wagmiConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const isConnected = Boolean(wagmiConnected && address);

  return {
    address,
    isConnected,
    chain: chainId,
    disconnect,
  };
}
