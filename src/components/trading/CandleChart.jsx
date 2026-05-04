/**
 * Candlestick Chart Component
 * 
 * OHLC price visualization
 */

import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
} from 'recharts';
import './CandleChart.module.css';

const CandleChart = ({ data, loading, error }) => {
  if (loading && data.length === 0) {
    return (
      <div className="container">
        <div className="loading">Loading chart data...</div>
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
        <div className="empty">No data available</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h3>Price Chart</h3>
        <div className="legend">
          <span className="legendItem">
            <span className="dot" style={{ backgroundColor: '#4caf50' }}></span>
            Up
          </span>
          <span className="legendItem">
            <span className="dot" style={{ backgroundColor: '#f44336' }}></span>
            Down
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="date"
            stroke="#666"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#666"
            style={{ fontSize: '12px' }}
            domain={['dataMin - 50', 'dataMax + 50']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
            }}
            formatter={(value) => `$${parseFloat(value).toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#4ecdc4"
            strokeWidth={2}
            dot={false}
          />
          <Bar
            dataKey="volume"
            fill="#e0e0e0"
            opacity={0.3}
            yAxisId="volume"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CandleChart;
