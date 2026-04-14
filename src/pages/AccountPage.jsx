// src/pages/AccountPage.jsx
import React, { useState } from "react";
import "../styles/Global.module.css";
import ProfileForm from "../components/account/ProfileForm";
import ApiKeysManager from "../components/account/ApiKeysManager";

export default function AccountPage() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="dashboard-container">
      <h1>Account</h1>
      <p>Gerencie seu perfil e integrações (CEX/DEX/Gateway).</p>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button
          className={tab === "profile" ? "primaryButton" : "secondaryButton"}
          onClick={() => setTab("profile")}
        >
          Perfil
        </button>
        <button
          className={tab === "keys" ? "primaryButton" : "secondaryButton"}
          onClick={() => setTab("keys")}
        >
          API Keys
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {tab === "profile" ? <ProfileForm /> : <ApiKeysManager />}
      </div>
    </div>
  );
}
