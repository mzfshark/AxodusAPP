// src/providers/AppKitProvider.jsx
import React, { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiAdapter } from '@adapters/wagmiAdapter';
import { initializeAppKit } from '../appkit.config';

const queryClient = new QueryClient();

export const AppKitProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      initializeAppKit();
      setInitialized(true);
    } catch (error) {
      console.error('Failed to initialize AppKit:', error);
      setInitialized(true); // Continue mesmo com erro
    }
  }, []);

  if (!initialized) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div>Initializing...</div>
      </div>
    );
  }

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};
