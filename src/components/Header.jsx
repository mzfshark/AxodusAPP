// src/components/Header.jsx
import { Link } from "react-router-dom";
import WalletConnectButton from "./WalletConnectButton";
import { useAppKitAccount, useAppKitNetwork, useDisconnect } from "@reown/appkit/react";
import "../styles/Global.module.css";
import logo from '../assets/logo.png';

export default function Header() {
  const { address: account } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { network } = useAppKitNetwork();

  return (
    <header className="appHeader">
      <div className="appHeaderLeft">
        <Link to="/">
          <img src={logo} alt="Axodus" style={{ height: "32px" }} />
        </Link>
      </div>

      <div className="appHeaderRight">
        {!account ? (
          <WalletConnectButton />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 35px" }}>
            {network?.logoUrl && (
              <img src={network.logoUrl} alt={network.name} style={{ height: "20px" }} />
            )}
            <span className="walletAddress">
              {account.slice(0, 6)}…{account.slice(-4)}
            </span>
            <button onClick={disconnect} className="disconnectButton">
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
