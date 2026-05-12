// src/hooks/useAuth.jsx
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAppKitAccount } from '@reown/appkit/react';
import { deriveRoles } from '../auth/accessControl';

export function useAuth() {
  // Wagmi fonte primária para conexão EVM
  const { address: wagmiAddress, isConnected: wagmiConnected, chainId } = useAccount();

  // AppKit v1
  const { address: akAddress, isConnected: akConnected } = useAppKitAccount();

  // Sinal unificado
  const address = wagmiAddress || akAddress || null;
  const isConnected = Boolean(wagmiConnected || akConnected) && Boolean(address);

  const roles = useMemo(() => deriveRoles(address), [address]);

  return {
    address,
    isConnected,
    chainId,
    roles,
  };
}
