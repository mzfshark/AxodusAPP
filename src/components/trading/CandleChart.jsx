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

  // Custom candlestick shape
  const CandleStick = (props) => {
    const { x, y, width, height, fill, payload } = props;
    
    if (!payload || !payload.open || !payload.close) return null;

    const isGreen = payload.close >= payload.open;
    const color = isGreen ? '#4caf50' : '#f44336';
    
    const yHigh = y;
    const yLow = y + height;
    const yOpen = isGreen ? yLow : y;
    const yClose = isGreen ? y : yLow;
    const bodyHeight = Math.abs(yClose - yOpen);

    return (
      <g>
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={yHigh}
          x2={x + width / 2}
          y2={yLow}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x}
          y={Math.min(yOpen, yClose)}
          width={width}
          height={Math.max(bodyHeight, 1)}
          fill={color}
          stroke={color}
        />
      </g>
    );
  };

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
