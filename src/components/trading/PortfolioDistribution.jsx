/**
 * Portfolio Distribution Component
 * 
 * Pie chart showing asset allocation
 */

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './PortfolioDistribution.module.css';

const COLORS = [
  '#4ecdc4',
  '#ff6b6b',
  '#45b7d1',
  '#f9ca24',
  '#6c5ce7',
  '#00b894',
  '#fd79a8',
  '#fdcb6e',
  '#e17055',
  '#74b9ff',
];

const PortfolioDistribution = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading distribution...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="container">
        <div className="empty">No assets to display</div>
      </div>
    );
  }

  // Take top 10 assets
  const topAssets = data.slice(0, 10);
  const othersValue = data.slice(10).reduce((sum, item) => sum + item.value, 0);

  const chartData = [
    ...topAssets,
    ...(othersValue > 0 ? [{ name: 'Others', value: othersValue }] : []),
  ];

  const renderCustomLabel = ({ name, percent }) => {
    return `${name} ${(percent * 100).toFixed(1)}%`;
  };

  return (
    <div className="container">
      <div className="header">
        <h3>Asset Distribution</h3>
        <div className="totalAssets">
          {data.length} asset{data.length !== 1 ? 's' : ''}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [
              `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              'Value',
            ]}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="assetList">
        {chartData.map((asset, index) => (
          <div key={asset.name} className="assetItem">
            <div className="assetColor" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <div className="assetName">{asset.name}</div>
            <div className="assetValue">
              ${parseFloat(asset.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            {asset.amount && (
              <div className="assetAmount">
                {parseFloat(asset.amount).toFixed(4)} {asset.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDistribution;
