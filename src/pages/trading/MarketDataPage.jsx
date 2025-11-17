/**
 * Market Data Page
 * 
 * Real-time market data visualization
 * Candlestick charts, order book, price ticker
 */

import React, { useState, useEffect } from 'react';
import {
  getCandles,
  getOrderBook,
  formatCandlesForChart,
  formatOrderBook,
  getMarketSummary,
} from '@services/api/marketDataService';
import CandleChart from '@components/trading/CandleChart';
import OrderBookWidget from '@components/trading/OrderBookWidget';
import styles from './MarketDataPage.module.css';

const MarketDataPage = () => {
  const [connector, setConnector] = useState('binance');
  const [tradingPair, setTradingPair] = useState('BTC-USDT');
  const [interval, setInterval] = useState('1h');
  const [candles, setCandles] = useState([]);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [connector, tradingPair, interval]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch candles
      const candlesData = await getCandles(connector, tradingPair, interval);
      setCandles(candlesData);

      // Fetch order book
      const orderBookData = await getOrderBook(connector, tradingPair, 20);
      setOrderBook(formatOrderBook(orderBookData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const summary = candles.length > 0 ? getMarketSummary(candles) : null;
  const formattedCandles = formatCandlesForChart(candles);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Market Data</h1>
        <p className={styles.subtitle}>Real-time price and orderbook data</p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Exchange</label>
          <select value={connector} onChange={(e) => setConnector(e.target.value)}>
            <option value="binance">Binance</option>
            <option value="okx">OKX</option>
            <option value="kraken">Kraken</option>
            <option value="coinbase">Coinbase</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>Trading Pair</label>
          <input
            type="text"
            value={tradingPair}
            onChange={(e) => setTradingPair(e.target.value.toUpperCase())}
            placeholder="BTC-USDT"
          />
        </div>

        <div className={styles.controlGroup}>
          <label>Interval</label>
          <select value={interval} onChange={(e) => setInterval(e.target.value)}>
            <option value="1m">1 Minute</option>
            <option value="5m">5 Minutes</option>
            <option value="15m">15 Minutes</option>
            <option value="1h">1 Hour</option>
            <option value="4h">4 Hours</option>
            <option value="1d">1 Day</option>
          </select>
        </div>

        <button onClick={fetchData} className={styles.refreshButton} disabled={loading}>
          {loading ? '⏳' : '🔄'} Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className={styles.errorBanner}>
          Error: {error}
          <button onClick={fetchData}>Retry</button>
        </div>
      )}

      {/* Market Summary */}
      {summary && (
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Last Price</div>
            <div className={styles.summaryValue}>
              ${parseFloat(summary.lastPrice).toLocaleString()}
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>24h Change</div>
            <div
              className={`${styles.summaryValue} ${
                parseFloat(summary.priceChange) >= 0 ? styles.positive : styles.negative
              }`}
            >
              {parseFloat(summary.priceChange) >= 0 ? '+' : ''}
              {summary.priceChange}%
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>24h High</div>
            <div className={styles.summaryValue}>
              ${parseFloat(summary.high24h).toLocaleString()}
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>24h Low</div>
            <div className={styles.summaryValue}>
              ${parseFloat(summary.low24h).toLocaleString()}
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>24h Volume</div>
            <div className={styles.summaryValue}>
              {parseFloat(summary.volume24h).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Charts Layout */}
      <div className={styles.chartsLayout}>
        <div className={styles.chartMain}>
          <CandleChart data={formattedCandles} loading={loading} error={error} />
        </div>

        <div className={styles.chartSide}>
          <OrderBookWidget orderBook={orderBook} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default MarketDataPage;
