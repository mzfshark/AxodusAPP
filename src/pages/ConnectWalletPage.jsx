// src/pages/ConnectWalletPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WalletConnectButton from "../components/WalletConnectButton";
import { useWallet } from "../hooks/useWallet";
import styles from "../styles/Global.module.css";

export default function ConnectWalletPage() {
  const { isConnected } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/dashboard";

  useEffect(() => {
    if (isConnected) {
      navigate(redirectTo, { replace: true });
    }
  }, [isConnected, redirectTo, navigate]);

  return (
    <div className={styles["dashboard-container"]} style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Connect your Wallet</h1>
      <p>You must connect a wallet to access this page.</p>
      <div style={{ marginTop: "2rem" }}>
        <WalletConnectButton />
      </div>
    </div>
  );
}
