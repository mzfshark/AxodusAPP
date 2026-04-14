// src/pages/TransactionHistoryPage.jsx
import React from 'react';
import TransactionHistory from '../components/TransactionHistory';
import "../styles/Global.css";

const TransactionHistoryPage = () => {
  return (
    <div className="dashboard-container">
      <h1>Transaction History</h1>

      <div className="dashboard-section">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
