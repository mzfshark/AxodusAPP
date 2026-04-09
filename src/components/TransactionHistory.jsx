// src/components/TransactionHistory.jsx
import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

const mockTransactions = [
  { id: 1, type: 'Deposit', token: 'ETH', amount: 1.25, date: '2024-11-12T10:00:00Z' },
  { id: 2, type: 'Withdraw', token: 'MATIC', amount: 540, date: '2024-12-05T14:30:00Z' },
  { id: 3, type: 'Swap', token: 'USDC', amount: 2200, date: '2025-01-20T08:15:00Z' }
];

const TransactionHistory = () => {
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Token</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {mockTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{formatDate(tx.date)}</td>
              <td>{tx.type}</td>
              <td>{tx.token}</td>
              <td>{formatCurrency(tx.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;