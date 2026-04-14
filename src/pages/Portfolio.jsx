// src/pages/Portfolio.jsx
import React from 'react';
import TokenBalance from '../components/TokenBalance';
import InvestmentCard from '../components/InvestmentCard';
import "../styles/Global.css";

const mockInvestments = [
  { name: 'Avalanche', value: 12200, change: 1.8, icon: '/assets/icons/avax.svg' },
  { name: 'Fantom', value: 6400, change: 2.2, icon: '/assets/icons/ftm.svg' },
];

const Portfolio = () => {
  return (
    <div className="dashboard-container">
      <h1>My Portfolio</h1>

      <div className="dashboard-summary">
        {mockInvestments.map((inv) => (
          <InvestmentCard key={inv.name} {...inv} />
        ))}
      </div>

      <div className="dashboard-section">
        <TokenBalance />
      </div>
    </div>
  );
};

export default Portfolio;
