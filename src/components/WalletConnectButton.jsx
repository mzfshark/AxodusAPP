// src/components/WalletConnectButton.jsx
import React from 'react';

// carrega o web‑component e registra-o no customElements
import '@reown/appkit-wallet-button/react';


const WalletConnectButton = () => (
  <div style={{display:'flex',justifyContent:'center',padding:'0 3rem'}}>
    {/* web‑component */}
    <appkit-connect-button />
  </div>
);

export default WalletConnectButton;

