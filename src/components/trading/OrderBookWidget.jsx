/**
 * Order Book Widget
 * 
 * Real-time order book display (bids & asks)
 */

import React from 'react';
import styles from './OrderBookWidget.module.css';

const OrderBookWidget = ({ orderBook, loading, error }) => {
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
    ...bids.map((b) => b.total),
    ...asks.map((a) => a.total)
  );

  const renderOrder = (order, isBid) => {
    const percentage = (order.total / maxTotal) * 100;

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
          <span className={styles.total}>${order.total.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Order Book</h3>
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

export default OrderBookWidget;
