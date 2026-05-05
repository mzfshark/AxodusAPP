/**
 * Live PnL Chart Component
 * 
 * Real-time profit and loss visualization
 * Updates every 5 seconds with portfolio total value
 */

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getPortfolioState, calculateTotalValue } from '@services/api/portfolioService';
import styles from './LivePnLChart.module.css';

const LivePnLChart = ({ updateInterval = 5000 }) => {
  const [pnlData, setPnlData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPnL = async () => {
      try {
        const portfolio = await getPortfolioState({});
        const totalValue = calculateTotalValue(portfolio);

        if (isMounted) {
          setPnlData((prev) => {
            const newData = [
              ...prev,
              {
                timestamp: Date.now(),
                time: new Date().toLocaleTimeString('pt-BR'),
                value: totalValue,
              },
            ];

            // Keep only last 50 data points
            return newData.slice(-50);
          });

          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchPnL();

    // Setup interval
    const interval = setInterval(fetchPnL, updateInterval);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [updateInterval]);

  // Calculate PnL change
  const calculateChange = () => {
    if (pnlData.length < 2) return { value: 0, percentage: 0 };

    const first = pnlData[0].value;
    const last = pnlData[pnlData.length - 1].value;
    const change = last - first;
    const percentage = ((change / first) * 100).toFixed(2);

    return { value: change.toFixed(2), percentage };
  };

  const change = calculateChange();
  const currentValue = pnlData.length > 0 ? pnlData[pnlData.length - 1].value : 0;

  if (loading && pnlData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading PnL data...</div>
      </div>
    );
  }

  if (error && pnlData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3>Live Portfolio Value</h3>
          <div className={styles.currentValue}>
            ${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`${styles.change} ${parseFloat(change.value) >= 0 ? styles.positive : styles.negative}`}>
            {parseFloat(change.value) >= 0 ? '+' : ''}
            ${change.value} ({change.percentage}%)
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.dataPoints}>
            {pnlData.length} data points
          </div>
          <div className={styles.updateTime}>
            Last update: {pnlData.length > 0 ? pnlData[pnlData.length - 1].time : 'N/A'}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={pnlData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-muted)" />
          <XAxis
            dataKey="time"
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface-primary)',
              border: '1px solid var(--color-border-muted)',
              borderRadius: '8px',
              color: 'var(--color-text-primary)',
              padding: '10px',
            }}
            formatter={(value) => [
              `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              'Portfolio Value',
            ]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-accent)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LivePnLChart;
