/**
 * Enhanced BotManagement with Real-time Updates
 * 
 * Integrates MQTT real-time bot status streaming
 */

import React, { useState, useEffect } from 'react';
import { useBots } from '@context/BotContext';
import { useRealtime } from '@context/RealtimeContext';
import ConnectionStatus from '@components/realtime/ConnectionStatus';
import './BotManagement.css';

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
      running: { label: 'Running', className: 'statusRunning' },
      stopped: { label: 'Stopped', className: 'statusStopped' },
      error: { label: 'Error', className: 'statusError' },
      starting: { label: 'Starting', className: 'statusStarting' },
    };

    const config = statusMap[status] || { label: status, className: '' };
    return <span className={`statusBadge ${config.className}`}>{config.label}</span>;
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
      <div className="container">
        <div className="loading">Loading bots...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
        <button onClick={fetchBots} className="retryButton">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Bot Management</h1>
          <p className="subtitle">Monitor and control your trading bots</p>
        </div>
        <ConnectionStatus />
      </div>

      <div className="layout">
        {/* Bot Grid */}
        <div className="botGrid">
          {enhancedBots.length === 0 ? (
            <div className="emptyState">
              <p>No bots configured</p>
              <p className="emptySubtext">Deploy your first bot to get started</p>
            </div>
          ) : (
            enhancedBots.map((bot) => (
              <div
                key={bot.id}
                className={`botCard ${
                  selectedBot?.id === bot.id ? 'botCardSelected' : ''
                }`}
                onClick={() => handleBotClick(bot)}
              >
                <div className="botHeader">
                  <h3>{bot.name || bot.id}</h3>
                  {getStatusBadge(bot.status)}
                </div>

                <div className="botInfo">
                  <div className="infoRow">
                    <span className="infoLabel">Strategy:</span>
                    <span className="infoValue">{bot.strategy || 'N/A'}</span>
                  </div>
                  <div className="infoRow">
                    <span className="infoLabel">Exchange:</span>
                    <span className="infoValue">{bot.exchange || 'N/A'}</span>
                  </div>
                  {bot.performance && (
                    <div className="infoRow">
                      <span className="infoLabel">PnL:</span>
                      <span
                        className={`infoValue ${
                          parseFloat(bot.performance.pnl) >= 0
                            ? 'positive'
                            : 'negative'
                        }`}
                      >
                        {parseFloat(bot.performance.pnl) >= 0 ? '+' : ''}
                        {bot.performance.pnl}%
                      </span>
                    </div>
                  )}
                  {bot.lastUpdate && (
                    <div className="infoRow">
                      <span className="infoLabel">Last Update:</span>
                      <span className="infoValue">
                        {new Date(bot.lastUpdate).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="botActions">
                  {bot.status === 'running' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStop(bot.id);
                      }}
                      disabled={actionLoading === bot.id}
                      className="stopButton"
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
                      className="startButton"
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
          <div className="detailsPanel">
            <h2>Bot Details</h2>
            <div className="detailsContent">
              <div className="detailSection">
                <h3>Configuration</h3>
                <div className="detailGrid">
                  <div className="detailItem">
                    <span className="detailLabel">ID:</span>
                    <span className="detailValue">{selectedBot.id}</span>
                  </div>
                  <div className="detailItem">
                    <span className="detailLabel">Name:</span>
                    <span className="detailValue">{selectedBot.name}</span>
                  </div>
                  <div className="detailItem">
                    <span className="detailLabel">Strategy:</span>
                    <span className="detailValue">{selectedBot.strategy}</span>
                  </div>
                  <div className="detailItem">
                    <span className="detailLabel">Exchange:</span>
                    <span className="detailValue">{selectedBot.exchange}</span>
                  </div>
                </div>
              </div>

              {selectedBot.config && (
                <div className="detailSection">
                  <h3>Parameters</h3>
                  <pre className="configCode">
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
