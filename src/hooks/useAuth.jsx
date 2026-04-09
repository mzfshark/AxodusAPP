// src/hooks/useAuth.jsx
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { deriveRoles } from '../auth/accessControl';

export function useAuth() {
  // Wagmi fonte primária para conexão EVM
  const { address: wagmiAddress, isConnected: wagmiConnected, chainId } = useAccount();

  // AppKit (multi-chain) – usado como fallback/compatível
  const appkit = useAppKit?.() || {};
  const akConnected = appkit?.connected ?? appkit?.isConnected ?? false;
  const akAccount = appkit?.account?.address;

  // Sinal unificado
  const address = wagmiAddress || akAccount || null;
  const isConnected = Boolean(wagmiConnected || akConnected) && Boolean(address);

  const roles = useMemo(() => deriveRoles(address), [address]);

  return {
    address,
    isConnected,
    chainId,
    roles,
  };
}
