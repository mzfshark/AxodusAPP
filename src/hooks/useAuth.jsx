// src/hooks/useAuth.jsx
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { deriveRoles } from '../auth/accessControl';

export function useAuth() {
  const { address, isConnected: wagmiConnected, chainId } = useAccount();
  const isConnected = Boolean(wagmiConnected && address);

  const roles = useMemo(() => deriveRoles(address), [address]);

  return {
    address,
    isConnected,
    chainId,
    roles,
  };
}
