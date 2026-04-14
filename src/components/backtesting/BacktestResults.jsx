/**
 * Backtest Results Component
 * 
 * Display backtest results with metrics and charts
 */

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import './BacktestResults.css';

const BacktestResults = ({ results, metrics, chartData }) => {
  if (!results || !metrics) {
    return (
      <div className="container">
        <div className="empty">No results available</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Backtest Results</h2>
        <span className="strategyBadge">{results.strategy}</span>
      </div>

      {/* Metrics Grid */}
      <div className="metricsGrid">
        <div className="metricCard">
          <div className="metricLabel">Total Return</div>
          <div
            className={`metricValue ${
              parseFloat(metrics.returnPercentage) >= 0 ? 'positive' : 'negative'
            }`}
          >
            {parseFloat(metrics.returnPercentage) >= 0 ? '+' : ''}
            {metrics.returnPercentage}%
          </div>
        </div>

        <div className="metricCard">
          <div className="metricLabel">Total PnL</div>
          <div
            className={`metricValue ${
              parseFloat(metrics.totalPnL) >= 0 ? 'positive' : 'negative'
            }`}
          >
            ${metrics.totalPnL}
          </div>
        </div>

        <div className="metricCard">
          <div className="metricLabel">Win Rate</div>
          <div className="metricValue">{metrics.winRate}%</div>
        </div>

        <div className="metricCard">
          <div className="metricLabel">Total Trades</div>
          <div className="metricValue">{metrics.totalTrades}</div>
        </div>

        <div className="metricCard">
          <div className="metricLabel">Sharpe Ratio</div>
          <div className="metricValue">{metrics.sharpeRatio}</div>
        </div>

        <div className="metricCard">
          <div className="metricLabel">Max Drawdown</div>
          <div className="metricValue negative">
            -{metrics.maxDrawdown}%
          </div>
        </div>

        <div className="metricCard">
          <div className="metricLabel">Profit Factor</div>
          <div className="metricValue">{metrics.profitFactor}</div>
        </div>

        <div className="metricCard">
          <div className="metricLabel">Final Capital</div>
          <div className="metricValue">${metrics.finalCapital}</div>
        </div>
      </div>

      {/* Capital Curve Chart */}
      <div className="chartSection">
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
      <div className="tradeAnalysis">
        <h3>Trade Analysis</h3>
        <div className="analysisGrid">
          <div className="analysisItem">
            <span className="analysisLabel">Winning Trades:</span>
            <span className="analysisValue">{metrics.winningTrades}</span>
          </div>
          <div className="analysisItem">
            <span className="analysisLabel">Losing Trades:</span>
            <span className="analysisValue">{metrics.losingTrades}</span>
          </div>
          <div className="analysisItem">
            <span className="analysisLabel">Average Win:</span>
            <span className={`analysisValue positive`}>
              ${metrics.avgWin}
            </span>
          </div>
          <div className="analysisItem">
            <span className="analysisLabel">Average Loss:</span>
            <span className={`analysisValue negative`}>
              ${metrics.avgLoss}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      {results.trades && results.trades.length > 0 && (
        <div className="tradesSection">
          <h3>Recent Trades (Last 10)</h3>
          <div className="tradesTable">
            <div className="tradesHeader">
              <span>Date</span>
              <span>Side</span>
              <span>Price</span>
              <span>Amount</span>
              <span>PnL</span>
            </div>
            {results.trades.slice(-10).reverse().map((trade, index) => (
              <div key={index} className="tradeRow">
                <span>{new Date(trade.timestamp).toLocaleString()}</span>
                <span className={trade.side === 'buy' ? 'buyBadge' : 'sellBadge'}>
                  {trade.side}
                </span>
                <span>${trade.price.toLocaleString()}</span>
                <span>{trade.amount}</span>
                <span
                  className={`pnlValue ${
                    trade.pnl >= 0 ? 'positive' : 'negative'
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
