/**
 * Backtest Results Component
 * 
 * Display backtest results with metrics and charts
 */

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import styles from './BacktestResults.module.css';

const BacktestResults = ({ results, metrics, chartData }) => {
  if (!results || !metrics) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No results available</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Backtest Results</h2>
        <span className={styles.strategyBadge}>{results.strategy}</span>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Return</div>
          <div
            className={`${styles.metricValue} ${
              parseFloat(metrics.returnPercentage) >= 0 ? styles.positive : styles.negative
            }`}
          >
            {parseFloat(metrics.returnPercentage) >= 0 ? '+' : ''}
            {metrics.returnPercentage}%
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total PnL</div>
          <div
            className={`${styles.metricValue} ${
              parseFloat(metrics.totalPnL) >= 0 ? styles.positive : styles.negative
            }`}
          >
            ${metrics.totalPnL}
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Win Rate</div>
          <div className={styles.metricValue}>{metrics.winRate}%</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Trades</div>
          <div className={styles.metricValue}>{metrics.totalTrades}</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Sharpe Ratio</div>
          <div className={styles.metricValue}>{metrics.sharpeRatio}</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Max Drawdown</div>
          <div className={`${styles.metricValue} ${styles.negative}`}>
            -{metrics.maxDrawdown}%
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Profit Factor</div>
          <div className={styles.metricValue}>{metrics.profitFactor}</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Final Capital</div>
          <div className={styles.metricValue}>${metrics.finalCapital}</div>
        </div>
      </div>

      {/* Capital Curve Chart */}
      <div className={styles.chartSection}>
        <h3>Capital Curve</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="timestamp"
              stroke="#666"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis stroke="#666" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
              }}
              formatter={(value) => `$${parseFloat(value).toLocaleString()}`}
              labelFormatter={(value) => new Date(value).toLocaleString()}
            />
            <Area
              type="monotone"
              dataKey="capital"
              stroke="#4ecdc4"
              fill="#4ecdc4"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Trade Analysis */}
      <div className={styles.tradeAnalysis}>
        <h3>Trade Analysis</h3>
        <div className={styles.analysisGrid}>
          <div className={styles.analysisItem}>
            <span className={styles.analysisLabel}>Winning Trades:</span>
            <span className={styles.analysisValue}>{metrics.winningTrades}</span>
          </div>
          <div className={styles.analysisItem}>
            <span className={styles.analysisLabel}>Losing Trades:</span>
            <span className={styles.analysisValue}>{metrics.losingTrades}</span>
          </div>
          <div className={styles.analysisItem}>
            <span className={styles.analysisLabel}>Average Win:</span>
            <span className={`${styles.analysisValue} ${styles.positive}`}>
              ${metrics.avgWin}
            </span>
          </div>
          <div className={styles.analysisItem}>
            <span className={styles.analysisLabel}>Average Loss:</span>
            <span className={`${styles.analysisValue} ${styles.negative}`}>
              ${metrics.avgLoss}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      {results.trades && results.trades.length > 0 && (
        <div className={styles.tradesSection}>
          <h3>Recent Trades (Last 10)</h3>
          <div className={styles.tradesTable}>
            <div className={styles.tradesHeader}>
              <span>Date</span>
              <span>Side</span>
              <span>Price</span>
              <span>Amount</span>
              <span>PnL</span>
            </div>
            {results.trades.slice(-10).reverse().map((trade, index) => (
              <div key={index} className={styles.tradeRow}>
                <span>{new Date(trade.timestamp).toLocaleString()}</span>
                <span className={trade.side === 'buy' ? styles.buyBadge : styles.sellBadge}>
                  {trade.side}
                </span>
                <span>${trade.price.toLocaleString()}</span>
                <span>{trade.amount}</span>
                <span
                  className={`${styles.pnlValue} ${
                    trade.pnl >= 0 ? styles.positive : styles.negative
                  }`}
                >
                  {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BacktestResults;
