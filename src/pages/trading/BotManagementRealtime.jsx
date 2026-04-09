/**
 * Enhanced BotManagement with Real-time Updates
 * 
 * Integrates MQTT real-time bot status streaming
 */

import React, { useState, useEffect } from 'react';
import { useBots } from '@context/BotContext';
import { useRealtime } from '@context/RealtimeContext';
import ConnectionStatus from '@components/realtime/ConnectionStatus';
import styles from './BotManagement.module.css';

const BotManagement = () => {
  const { bots, loading, error, startBot, stopBot, fetchBots, fetchBotDetails } = useBots();
  const { subscribeToBotStatus, subscribeToBotOrders, botUpdates } = useRealtime();
  const [selectedBot, setSelectedBot] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchBots();
    
    // Auto-refresh every 30 seconds
    const intervalId = setInterval(fetchBots, 30000);
    return () => clearInterval(intervalId);
  }, []);

  // Subscribe to real-time updates for all bots
  useEffect(() => {
    if (!bots || bots.length === 0) return;

    const unsubscribers = [];

    bots.forEach((bot) => {
      if (bot.id) {
        // Subscribe to bot status
        const unsubStatus = subscribeToBotStatus(bot.id);
        if (unsubStatus) unsubscribers.push(unsubStatus);

        // Subscribe to bot orders
        const unsubOrders = subscribeToBotOrders(bot.id);
        if (unsubOrders) unsubscribers.push(unsubOrders);
      }
    });

    return () => {
      unsubscribers.forEach((unsub) => {
        if (typeof unsub === 'function') unsub();
      });
    };
  }, [bots, subscribeToBotStatus, subscribeToBotOrders]);

  const handleStart = async (botId) => {
    setActionLoading(botId);
    try {
      await startBot(botId);
    } finally {
      setActionLoading(null);
    }
  };

  const handleStop = async (botId) => {
    setActionLoading(botId);
    try {
      await stopBot(botId);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBotClick = async (bot) => {
    setSelectedBot(bot);
    const details = await fetchBotDetails(bot.id);
    if (details) {
      setSelectedBot({ ...bot, ...details });
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      running: { label: 'Running', className: styles.statusRunning },
      stopped: { label: 'Stopped', className: styles.statusStopped },
      error: { label: 'Error', className: styles.statusError },
      starting: { label: 'Starting', className: styles.statusStarting },
    };

    const config = statusMap[status] || { label: status, className: '' };
    return <span className={`${styles.statusBadge} ${config.className}`}>{config.label}</span>;
  };

  // Merge real-time updates with bot data
  const getEnhancedBots = () => {
    if (!bots) return [];

    return bots.map((bot) => {
      const realtimeUpdate = botUpdates[bot.id];
      if (realtimeUpdate) {
        return {
          ...bot,
          status: realtimeUpdate.status || bot.status,
          performance: realtimeUpdate.performance || bot.performance,
          lastUpdate: realtimeUpdate.timestamp,
        };
      }
      return bot;
    });
  };

  const enhancedBots = getEnhancedBots();

  if (loading && enhancedBots.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading bots...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error: {error}</div>
        <button onClick={fetchBots} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Bot Management</h1>
          <p className={styles.subtitle}>Monitor and control your trading bots</p>
        </div>
        <ConnectionStatus />
      </div>

      <div className={styles.layout}>
        {/* Bot Grid */}
        <div className={styles.botGrid}>
          {enhancedBots.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No bots configured</p>
              <p className={styles.emptySubtext}>Deploy your first bot to get started</p>
            </div>
          ) : (
            enhancedBots.map((bot) => (
              <div
                key={bot.id}
                className={`${styles.botCard} ${
                  selectedBot?.id === bot.id ? styles.botCardSelected : ''
                }`}
                onClick={() => handleBotClick(bot)}
              >
                <div className={styles.botHeader}>
                  <h3>{bot.name || bot.id}</h3>
                  {getStatusBadge(bot.status)}
                </div>

                <div className={styles.botInfo}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Strategy:</span>
                    <span className={styles.infoValue}>{bot.strategy || 'N/A'}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Exchange:</span>
                    <span className={styles.infoValue}>{bot.exchange || 'N/A'}</span>
                  </div>
                  {bot.performance && (
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>PnL:</span>
                      <span
                        className={`${styles.infoValue} ${
                          parseFloat(bot.performance.pnl) >= 0
                            ? styles.positive
                            : styles.negative
                        }`}
                      >
                        {parseFloat(bot.performance.pnl) >= 0 ? '+' : ''}
                        {bot.performance.pnl}%
                      </span>
                    </div>
                  )}
                  {bot.lastUpdate && (
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Last Update:</span>
                      <span className={styles.infoValue}>
                        {new Date(bot.lastUpdate).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.botActions}>
                  {bot.status === 'running' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStop(bot.id);
                      }}
                      disabled={actionLoading === bot.id}
                      className={styles.stopButton}
                    >
                      {actionLoading === bot.id ? '⏳' : '⏹'} Stop
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStart(bot.id);
                      }}
                      disabled={actionLoading === bot.id}
                      className={styles.startButton}
                    >
                      {actionLoading === bot.id ? '⏳' : '▶'} Start
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bot Details Panel */}
        {selectedBot && (
          <div className={styles.detailsPanel}>
            <h2>Bot Details</h2>
            <div className={styles.detailsContent}>
              <div className={styles.detailSection}>
                <h3>Configuration</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>ID:</span>
                    <span className={styles.detailValue}>{selectedBot.id}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Name:</span>
                    <span className={styles.detailValue}>{selectedBot.name}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Strategy:</span>
                    <span className={styles.detailValue}>{selectedBot.strategy}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Exchange:</span>
                    <span className={styles.detailValue}>{selectedBot.exchange}</span>
                  </div>
                </div>
              </div>

              {selectedBot.config && (
                <div className={styles.detailSection}>
                  <h3>Parameters</h3>
                  <pre className={styles.configCode}>
                    {JSON.stringify(selectedBot.config, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotManagement;
