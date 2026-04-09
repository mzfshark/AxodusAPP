/**
 * Backtesting Page
 * 
 * Interface for running and analyzing backtests
 */

import React, { useState, useEffect } from 'react';
import {
  runBacktest,
  listBacktests,
  getBacktestResults,
  calculateBacktestMetrics,
  formatBacktestForChart,
} from '@services/api/backtestingService';
import { useRealtime } from '@context/RealtimeContext';
import BacktestForm from '@components/backtesting/BacktestForm';
import BacktestResults from '@components/backtesting/BacktestResults';
import BacktestList from '@components/backtesting/BacktestList';
import ConnectionStatus from '@components/realtime/ConnectionStatus';
import styles from './BacktestingPage.module.css';

const BacktestingPage = () => {
  const [backtests, setBacktests] = useState([]);
  const [selectedBacktest, setSelectedBacktest] = useState(null);
  const [results, setResults] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'
  const { subscribeToMarketData } = useRealtime();

  useEffect(() => {
    fetchBacktests();
  }, []);

  // Subscribe to real-time backtest progress updates
  useEffect(() => {
    if (selectedBacktest?.status === 'running') {
      const unsubscribe = subscribeToMarketData('backtesting', selectedBacktest.id, (data) => {
        if (data.type === 'backtest_progress') {
          setSelectedBacktest(prev => ({
            ...prev,
            progress: data.progress,
            status: data.status,
          }));
        }
      });

      return () => {
        if (typeof unsubscribe === 'function') unsubscribe();
      };
    }
  }, [selectedBacktest, subscribeToMarketData]);

  const fetchBacktests = async () => {
    try {
      const data = await listBacktests();
      setBacktests(Array.isArray(data) ? data : []);
    } catch (err) {
      // Evita spam de console quando endpoint não existe
      setBacktests([]);
    }
  };

  const handleRunBacktest = async (config) => {
    setLoading(true);
    setError(null);

    try {
      const result = await runBacktest(config);
      setSelectedBacktest(result);
      setActiveTab('history');
      await fetchBacktests();

      // Fetch results if completed immediately
      if (result.status === 'completed') {
        await handleViewResults(result.id);
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResults = async (backtestId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getBacktestResults(backtestId);
      setResults(data);
      setMetrics(calculateBacktestMetrics(data));
      setSelectedBacktest(backtests.find(b => b.id === backtestId));
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = results ? formatBacktestForChart(results) : [];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Backtesting</h1>
          <p className={styles.subtitle}>
            Test your strategies with historical data
          </p>
        </div>
        <ConnectionStatus />
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'new' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('new')}
        >
          🆕 New Backtest
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📊 History ({backtests.length})
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className={styles.errorBanner}>
          <strong>Error:</strong> {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'new' ? (
          <div className={styles.formSection}>
            <BacktestForm onSubmit={handleRunBacktest} loading={loading} />
          </div>
        ) : (
          <div className={styles.historySection}>
            <div className={styles.historyLayout}>
              <div className={styles.listPanel}>
                <BacktestList
                  backtests={backtests}
                  selectedBacktest={selectedBacktest}
                  onSelect={handleViewResults}
                  onRefresh={fetchBacktests}
                />
              </div>

              <div className={styles.resultsPanel}>
                {loading && !results ? (
                  <div className={styles.loading}>Loading results...</div>
                ) : results ? (
                  <BacktestResults
                    results={results}
                    metrics={metrics}
                    chartData={chartData}
                  />
                ) : (
                  <div className={styles.emptyState}>
                    <p>Select a backtest to view results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BacktestingPage;
