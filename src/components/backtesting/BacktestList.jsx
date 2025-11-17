/**
 * Backtest List Component
 * 
 * List of historical backtests
 */

import React from 'react';
import styles from './BacktestList.module.css';

const BacktestList = ({ backtests, selectedBacktest, onSelect, onRefresh }) => {
  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { label: 'Completed', className: styles.statusCompleted },
      running: { label: 'Running', className: styles.statusRunning },
      failed: { label: 'Failed', className: styles.statusFailed },
      pending: { label: 'Pending', className: styles.statusPending },
    };

    const config = statusMap[status] || { label: status, className: '' };
    return <span className={`${styles.statusBadge} ${config.className}`}>{config.label}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Backtest History</h3>
        <button onClick={onRefresh} className={styles.refreshButton}>
          🔄
        </button>
      </div>

      {backtests.length === 0 ? (
        <div className={styles.empty}>No backtests yet</div>
      ) : (
        <div className={styles.list}>
          {backtests.map((backtest) => (
            <div
              key={backtest.id}
              className={`${styles.item} ${
                selectedBacktest?.id === backtest.id ? styles.itemSelected : ''
              }`}
              onClick={() => onSelect(backtest.id)}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>
                  {backtest.strategy || 'Unknown'}
                </span>
                {getStatusBadge(backtest.status)}
              </div>

              <div className={styles.itemDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Pair:</span>
                  <span className={styles.detailValue}>{backtest.trading_pair}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>
                    {formatDate(backtest.created_at)}
                  </span>
                </div>
                {backtest.return_percentage && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Return:</span>
                    <span
                      className={`${styles.detailValue} ${
                        parseFloat(backtest.return_percentage) >= 0
                          ? styles.positive
                          : styles.negative
                      }`}
                    >
                      {parseFloat(backtest.return_percentage) >= 0 ? '+' : ''}
                      {backtest.return_percentage}%
                    </span>
                  </div>
                )}
              </div>

              {backtest.status === 'running' && backtest.progress && (
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${backtest.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BacktestList;
