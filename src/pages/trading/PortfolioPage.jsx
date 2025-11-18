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
import styles from './PortfolioPage.module.css';

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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Portfolio Dashboard</h1>
          <p className={styles.subtitle}>Track your assets across all exchanges</p>
        </div>
        <div className={styles.headerActions}>
          <ConnectionStatus />
          <button onClick={handleRefresh} className={styles.refreshButton} disabled={loading}>
            {loading ? '⏳' : '🔄'} Refresh
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className={styles.errorBanner}>
          <strong>Error:</strong> {error}
          <button onClick={handleRefresh}>Retry</button>
        </div>
      )}

      {/* Metrics Cards */}
      {metrics && (
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total Portfolio Value</div>
            <div className={styles.metricValue}>
              ${metrics.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total Assets</div>
            <div className={styles.metricValue}>{metrics.totalAssets}</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Top Asset</div>
            <div className={styles.metricValue}>{metrics.topAsset}</div>
            <div className={styles.metricSubvalue}>
              ${metrics.topAssetValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Connected Exchanges</div>
            <div className={styles.metricValue}>{metrics.exchanges}</div>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartFull}>
          <LivePnLChart updateInterval={5000} />
        </div>

        <div className={styles.chartHalf}>
          <PortfolioDistribution data={chartData} loading={loading} error={error} />
        </div>
      </div>

      {/* Balances by Exchange */}
      {portfolioState && portfolioState.balances && (
        <div className={styles.balancesSection}>
          <h2>Balances by Exchange</h2>
          <div className={styles.exchangesGrid}>
            {Object.entries(portfolioState.balances).map(([exchange, tokens]) => (
              <div key={exchange} className={styles.exchangeCard}>
                <h3>{exchange}</h3>
                <div className={styles.tokenList}>
                  {Object.entries(tokens).map(([token, data]) => (
                    <div key={token} className={styles.tokenItem}>
                      <div className={styles.tokenHeader}>
                        <span className={styles.tokenName}>{token}</span>
                        <span className={styles.tokenValue}>
                          ${parseFloat(data.total_usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className={styles.tokenDetails}>
                        <span>Total: {parseFloat(data.total || 0).toFixed(6)}</span>
                        <span>Available: {parseFloat(data.available || 0).toFixed(6)}</span>
                        {data.locked && parseFloat(data.locked) > 0 && (
                          <span className={styles.locked}>Locked: {parseFloat(data.locked).toFixed(6)}</span>
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
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading portfolio data...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && (!portfolioState || Object.keys(portfolioState.balances || {}).length === 0) && (
        <div className={styles.emptyState}>
          <p>📭 No balances found</p>
          <p className={styles.emptyHint}>
            Add exchange credentials in Settings to see your portfolio
          </p>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
