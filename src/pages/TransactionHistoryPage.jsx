// src/pages/TransactionHistoryPage.jsx
import React from 'react';
import TransactionHistory from '../components/TransactionHistory';
import styles from '../styles/Global.module.css';

const TransactionHistoryPage = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <h1>Transaction History</h1>

      <div className={styles["dashboard-section"]}>
        <TransactionHistory />
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
