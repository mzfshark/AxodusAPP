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
import styles from './CandleChart.module.css';

const CandleChart = ({ data, loading, error }) => {
  if (loading && data.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No data available</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Price Chart</h3>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.dot} style={{ backgroundColor: '#4caf50' }}></span>
            Up
          </span>
          <span className={styles.legendItem}>
            <span className={styles.dot} style={{ backgroundColor: '#f44336' }}></span>
            Down
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-muted)" />
          <XAxis
            dataKey="date"
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
            domain={['dataMin - 50', 'dataMax + 50']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface-primary)',
              border: '1px solid var(--color-border-muted)',
              borderRadius: '8px',
              color: 'var(--color-text-primary)',
              padding: '10px',
            }}
            formatter={(value) => `$${parseFloat(value).toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="var(--color-accent)"
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
