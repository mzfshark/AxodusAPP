// src/pages/Settings.jsx
import React from 'react';
import styles from '../styles/Global.module.css';

const Settings = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <h1>Settings</h1>

      <p>Configure your preferences, notifications and wallet connections.</p>

      <ul>
        <li>⚙️ Theme preference (light/dark)</li>
        <li>🔔 Notification settings</li>
        <li>🔐 Wallet auto-connect behavior</li>
      </ul>
    </div>
  );
};

export default Settings;
