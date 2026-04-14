// src/components/InvestmentCard.jsx
import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import '@styles/Global.module.css';

const InvestmentCard = ({ name, value, change, icon }) => {
  return (
    <div className="dashboard-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {icon && <img src={icon} alt={name} width={40} height={40} />}
        <div>
          <h3>{name}</h3>
          <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatCurrency(value)}</p>
          <span style={{ color: change >= 0 ? 'green' : 'red' }}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
