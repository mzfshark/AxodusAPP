// src/components/WalletConnectButton.jsx
import React from 'react';
import { AppKitAccountButton, AppKitConnectButton } from '@reown/appkit/react';
import { useWallet } from '../hooks/useWallet';

const WalletConnectButton = () => {
  const { isConnected } = useWallet();

  return (
    <div className="flex min-w-[156px] justify-center">
      {isConnected ? <AppKitAccountButton /> : <AppKitConnectButton />}
    </div>
  );
};

export default WalletConnectButton;

