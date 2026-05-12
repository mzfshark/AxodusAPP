/**
 * Backtest List Component
 * 
 * List of historical backtests
 */

import React from 'react';
import './BacktestList.css';

const BacktestList = ({ backtests, selectedBacktest, onSelect, onRefresh }) => {
  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { label: 'Completed', className: 'statusCompleted' },
      running: { label: 'Running', className: 'statusRunning' },
      failed: { label: 'Failed', className: 'statusFailed' },
      pending: { label: 'Pending', className: 'statusPending' },
    };

    const config = statusMap[status] || { label: status, className: '' };
    return <span className={`statusBadge ${config.className}`}>{config.label}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h3>Backtest History</h3>
        <button onClick={onRefresh} className="refreshButton">
          🔄
        </button>
      </div>

      {backtests.length === 0 ? (
        <div className="empty">No backtests yet</div>
      ) : (
        <div className="list">
          {backtests.map((backtest) => (
            <div
              key={backtest.id}
              className={`item ${
                selectedBacktest?.id === backtest.id ? 'itemSelected' : ''
              }`}
              onClick={() => onSelect(backtest.id)}
            >
              <div className="itemHeader">
                <span className="itemTitle">
                  {backtest.strategy || 'Unknown'}
                </span>
                {getStatusBadge(backtest.status)}
              </div>

              <div className="itemDetails">
                <div className="detailRow">
                  <span className="detailLabel">Pair:</span>
                  <span className="detailValue">{backtest.trading_pair}</span>
                </div>
                <div className="detailRow">
                  <span className="detailLabel">Date:</span>
                  <span className="detailValue">
                    {formatDate(backtest.created_at)}
                  </span>
                </div>
                {backtest.return_percentage && (
                  <div className="detailRow">
                    <span className="detailLabel">Return:</span>
                    <span
                      className={`detailValue ${
                        parseFloat(backtest.return_percentage) >= 0
                          ? 'positive'
                          : 'negative'
                      }`}
                    >
                      {parseFloat(backtest.return_percentage) >= 0 ? '+' : ''}
                      {backtest.return_percentage}%
                    </span>
                  </div>
                )}
              </div>

              {backtest.status === 'running' && backtest.progress && (
                <div className="progressBar">
                  <div
                    className="progressFill"
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
