/**
 * Portfolio Page
 * 
 * Complete portfolio dashboard with:
 * - Live PnL chart
 * - Asset distribution
 * - Balance details by exchange
 * - Total portfolio metrics
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  getPortfolioState,
  calculateMetrics,
  formatPortfolioForChart,
} from '@services/api/portfolioService';
import { useRealtime } from '@context/RealtimeContext';
import LivePnLChart from '@components/trading/LivePnLChart';
import PortfolioDistribution from '@components/trading/PortfolioDistribution';
import ConnectionStatus from '@components/realtime/ConnectionStatus';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [portfolioState, setPortfolioState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { subscribeToPortfolio, portfolioUpdate } = useRealtime();
  const inFlightRef = useRef(false);

  useEffect(() => {
    fetchPortfolio();

    // Subscribe to real-time portfolio updates
    const unsubscribe = subscribeToPortfolio();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [refreshKey]);

  // Update portfolio when real-time data arrives
  useEffect(() => {
    if (portfolioUpdate?.data) {
      setPortfolioState(portfolioUpdate.data);
    }
  }, [portfolioUpdate]);

  const fetchPortfolio = async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await getPortfolioState({});
      setPortfolioState(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const metrics = portfolioState ? calculateMetrics(portfolioState) : null;
  const chartData = portfolioState ? formatPortfolioForChart(portfolioState) : [];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div>
          <h1>Portfolio Dashboard</h1>
          <p className="subtitle">Track your assets across all exchanges</p>
        </div>
        <div className="headerActions">
          <ConnectionStatus />
          <button onClick={handleRefresh} className="refreshButton" disabled={loading}>
            {loading ? '⏳' : '🔄'} Refresh
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="errorBanner">
          <strong>Error:</strong> {error}
          <button onClick={handleRefresh}>Retry</button>
        </div>
      )}

      {/* Metrics Cards */}
      {metrics && (
        <div className="metricsGrid">
          <div className="metricCard">
            <div className="metricLabel">Total Portfolio Value</div>
            <div className="metricValue">
              ${metrics.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="metricCard">
            <div className="metricLabel">Total Assets</div>
            <div className="metricValue">{metrics.totalAssets}</div>
          </div>

          <div className="metricCard">
            <div className="metricLabel">Top Asset</div>
            <div className="metricValue">{metrics.topAsset}</div>
            <div className="metricSubvalue">
              ${metrics.topAssetValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="metricCard">
            <div className="metricLabel">Connected Exchanges</div>
            <div className="metricValue">{metrics.exchanges}</div>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="chartsGrid">
        <div className="chartFull">
          <LivePnLChart updateInterval={5000} />
        </div>

        <div className="chartHalf">
          <PortfolioDistribution data={chartData} loading={loading} error={error} />
        </div>
      </div>

      {/* Balances by Exchange */}
      {portfolioState && portfolioState.balances && (
        <div className="balancesSection">
          <h2>Balances by Exchange</h2>
          <div className="exchangesGrid">
            {Object.entries(portfolioState.balances).map(([exchange, tokens]) => (
              <div key={exchange} className="exchangeCard">
                <h3>{exchange}</h3>
                <div className="tokenList">
                  {Object.entries(tokens).map(([token, data]) => (
                    <div key={token} className="tokenItem">
                      <div className="tokenHeader">
                        <span className="tokenName">{token}</span>
                        <span className="tokenValue">
                          ${parseFloat(data.total_usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="tokenDetails">
                        <span>Total: {parseFloat(data.total || 0).toFixed(6)}</span>
                        <span>Available: {parseFloat(data.available || 0).toFixed(6)}</span>
                        {data.locked && parseFloat(data.locked) > 0 && (
                          <span className="locked">Locked: {parseFloat(data.locked).toFixed(6)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && !portfolioState && (
        <div className="loadingState">
          <div className="spinner"></div>
          <p>Loading portfolio data...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && (!portfolioState || Object.keys(portfolioState.balances || {}).length === 0) && (
        <div className="emptyState">
          <p>📭 No balances found</p>
          <p className="emptyHint">
            Add exchange credentials in Settings to see your portfolio
          </p>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
