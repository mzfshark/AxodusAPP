/**
 * Realtime Context Provider
 * 
 * Manages real-time data subscriptions via MQTT
 * Provides hooks for live updates across the application
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import mqttClient from '@services/websocket/mqttClient';

const RealtimeContext = createContext(null);

export const RealtimeProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [botUpdates, setBotUpdates] = useState({});
  const [portfolioUpdate, setPortfolioUpdate] = useState(null);
  const [orderExecutions, setOrderExecutions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Connect to MQTT broker on mount
    mqttClient.connect();

    // Monitor connection status
    const checkConnection = setInterval(() => {
      setConnected(mqttClient.isConnected());
    }, 1000);

    // Subscribe to global notifications
    const unsubNotifications = mqttClient.subscribe(
      'hummingbot/notifications',
      handleNotification
    );

    return () => {
      clearInterval(checkConnection);
      if (unsubNotifications) unsubNotifications();
      // Release MQTT client reference (reference-counted)
      mqttClient.disconnect();
    };
  }, []);

  const handleNotification = useCallback((payload) => {
    const notification = {
      id: Date.now(),
      timestamp: new Date(),
      ...payload,
    };

    setNotifications((prev) => [notification, ...prev.slice(0, 49)]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 5000);
  }, []);

  /**
   * Subscribe to bot status updates
   */
  const subscribeToBotStatus = useCallback((botId) => {
    const topic = `hummingbot/bots/${botId}/status`;

    const handleBotUpdate = (payload) => {
      setBotUpdates((prev) => ({
        ...prev,
        [botId]: {
          ...payload,
          timestamp: new Date(),
        },
      }));
    };

    return mqttClient.subscribe(topic, handleBotUpdate);
  }, []);

  /**
   * Subscribe to bot orders
   */
  const subscribeToBotOrders = useCallback((botId) => {
    const topic = `hummingbot/bots/${botId}/orders`;

    const handleOrderUpdate = (payload) => {
      setOrderExecutions((prev) => [
        {
          ...payload,
          botId,
          timestamp: new Date(),
        },
        ...prev.slice(0, 99),
      ]);
    };

    return mqttClient.subscribe(topic, handleOrderUpdate);
  }, []);

  /**
   * Subscribe to portfolio balance updates
   */
  const subscribeToPortfolio = useCallback(() => {
    const topic = 'hummingbot/portfolio/balances';

    const handlePortfolioUpdate = (payload) => {
      setPortfolioUpdate({
        ...payload,
        timestamp: new Date(),
      });
    };

    return mqttClient.subscribe(topic, handlePortfolioUpdate);
  }, []);

  /**
   * Subscribe to market data stream
   */
  const subscribeToMarketData = useCallback((exchange, pair, callback) => {
    const topic = `hummingbot/market/${exchange}/${pair}`;
    return mqttClient.subscribe(topic, callback);
  }, []);

  /**
   * Publish a command
   */
  const publishCommand = useCallback(async (topic, command) => {
    try {
      await mqttClient.publish(topic, command);
      return { success: true };
    } catch (error) {
      console.error('[Realtime] Publish error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  /**
   * Clear bot updates
   */
  const clearBotUpdates = useCallback(() => {
    setBotUpdates({});
  }, []);

  /**
   * Clear order executions
   */
  const clearOrderExecutions = useCallback(() => {
    setOrderExecutions([]);
  }, []);

  /**
   * Dismiss notification
   */
  const dismissNotification = useCallback((notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  }, []);

  const value = {
    // Connection status
    connected,

    // Bot updates
    botUpdates,
    subscribeToBotStatus,
    subscribeToBotOrders,
    clearBotUpdates,

    // Portfolio updates
    portfolioUpdate,
    subscribeToPortfolio,

    // Order executions
    orderExecutions,
    clearOrderExecutions,

    // Market data
    subscribeToMarketData,

    // Notifications
    notifications,
    dismissNotification,

    // Commands
    publishCommand,
  };

  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>;
};

/**
 * Hook to access realtime context
 */
export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within RealtimeProvider');
  }
  return context;
};

export default RealtimeContext;
