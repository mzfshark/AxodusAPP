/**
 * Enhanced OrderBookWidget with Real-time Updates
 * 
 * WebSocket streaming for live order book data
 */

import React, { useEffect, useState } from 'react';
import { useRealtime } from '@context/RealtimeContext';
import styles from './OrderBookWidget.module.css';

const OrderBookWidgetRealtime = ({ connector, tradingPair, orderBook: initialOrderBook, loading, error }) => {
  const { subscribeToMarketData } = useRealtime();
  const [orderBook, setOrderBook] = useState(initialOrderBook || { bids: [], asks: [] });

  // Subscribe to real-time order book updates
  useEffect(() => {
    if (!connector || !tradingPair) return;

    const exchange = connector.toLowerCase();
    const pair = tradingPair.replace('-', '_').toLowerCase();

    const unsubscribe = subscribeToMarketData(exchange, pair, (data) => {
      if (data.type === 'orderbook' && data.orderbook) {
        setOrderBook({
          bids: data.orderbook.bids || [],
          asks: data.orderbook.asks || [],
        });
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [connector, tradingPair, subscribeToMarketData]);

  // Update from props
  useEffect(() => {
    if (initialOrderBook) {
      setOrderBook(initialOrderBook);
    }
  }, [initialOrderBook]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading order book...</div>
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

  const { bids = [], asks = [] } = orderBook;

  if (bids.length === 0 && asks.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No order book data</div>
      </div>
    );
  }

  // Calculate max total for bar visualization
  const maxTotal = Math.max(
    ...bids.map((b) => b.total || b.price * b.amount),
    ...asks.map((a) => a.total || a.price * a.amount)
  );

  const renderOrder = (order, isBid) => {
    const total = order.total || order.price * order.amount;
    const percentage = (total / maxTotal) * 100;

    return (
      <div key={order.price} className={styles.orderRow}>
        <div
          className={styles.barBackground}
          style={{
            width: `${percentage}%`,
            background: isBid
              ? 'rgba(76, 175, 80, 0.1)'
              : 'rgba(244, 67, 54, 0.1)',
          }}
        />
        <div className={styles.orderData}>
          <span className={isBid ? styles.bidPrice : styles.askPrice}>
            ${order.price.toLocaleString()}
          </span>
          <span className={styles.amount}>{order.amount.toFixed(6)}</span>
          <span className={styles.total}>${total.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Order Book</h3>
        <span className={styles.liveBadge}>Live</span>
      </div>

      <div className={styles.columns}>
        <span>Price</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      {/* Asks (Sell orders) - displayed in reverse */}
      <div className={styles.asks}>
        <div className={styles.sectionLabel}>
          <span className={styles.askLabel}>Asks (Sell)</span>
        </div>
        {asks.slice(0, 10).reverse().map((ask) => renderOrder(ask, false))}
      </div>

      {/* Spread */}
      {bids.length > 0 && asks.length > 0 && (
        <div className={styles.spread}>
          <span className={styles.spreadLabel}>Spread:</span>
          <span className={styles.spreadValue}>
            ${(asks[0].price - bids[0].price).toFixed(2)}
          </span>
        </div>
      )}

      {/* Bids (Buy orders) */}
      <div className={styles.bids}>
        <div className={styles.sectionLabel}>
          <span className={styles.bidLabel}>Bids (Buy)</span>
        </div>
        {bids.slice(0, 10).map((bid) => renderOrder(bid, true))}
      </div>
    </div>
  );
};

export default OrderBookWidgetRealtime;
