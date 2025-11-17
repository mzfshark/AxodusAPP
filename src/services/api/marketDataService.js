/**
 * Market Data Service
 * 
 * Service layer para dados de mercado
 * Prices, candles, orderbook via Hummingbot API
 */

import hummingbotClient from './hummingbotClient';

/**
 * Get current prices for trading pairs
 */
export const getPrices = async (connectorName, tradingPairs) => {
  try {
    const response = await hummingbotClient.post('/market-data/prices', {
      connector_name: connectorName,
      trading_pairs: tradingPairs,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
};

/**
 * Get historical candles
 */
export const getCandles = async (connectorName, tradingPair, interval = '1h', startTime = null, endTime = null) => {
  try {
    const params = {
      connector_name: connectorName,
      trading_pair: tradingPair,
      interval,
    };
    
    if (startTime) params.start_time = startTime;
    if (endTime) params.end_time = endTime;
    
    const response = await hummingbotClient.post('/market-data/candles', params);
    return response.data;
  } catch (error) {
    console.error('Error fetching candles:', error);
    throw error;
  }
};

/**
 * Get order book
 */
export const getOrderBook = async (connectorName, tradingPair, depth = 10) => {
  try {
    const response = await hummingbotClient.post('/market-data/order-book', {
      connector_name: connectorName,
      trading_pair: tradingPair,
      depth,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order book:', error);
    throw error;
  }
};

/**
 * Format candles for Recharts
 */
export const formatCandlesForChart = (candles) => {
  if (!candles || !Array.isArray(candles)) return [];
  
  return candles.map(candle => ({
    timestamp: candle.timestamp,
    date: new Date(candle.timestamp * 1000).toLocaleString(),
    open: parseFloat(candle.open),
    high: parseFloat(candle.high),
    low: parseFloat(candle.low),
    close: parseFloat(candle.close),
    volume: parseFloat(candle.volume),
  }));
};

/**
 * Format order book for display
 */
export const formatOrderBook = (orderBook) => {
  if (!orderBook) return { bids: [], asks: [] };
  
  const formatOrders = (orders) => {
    return orders.map(order => ({
      price: parseFloat(order[0]),
      amount: parseFloat(order[1]),
      total: parseFloat(order[0]) * parseFloat(order[1]),
    }));
  };
  
  return {
    bids: formatOrders(orderBook.bids || []),
    asks: formatOrders(orderBook.asks || []),
  };
};

/**
 * Calculate price change percentage
 */
export const calculatePriceChange = (candles) => {
  if (!candles || candles.length < 2) return 0;
  
  const firstCandle = candles[0];
  const lastCandle = candles[candles.length - 1];
  
  const change = ((lastCandle.close - firstCandle.open) / firstCandle.open) * 100;
  return change.toFixed(2);
};

/**
 * Get market summary
 */
export const getMarketSummary = (candles) => {
  if (!candles || candles.length === 0) return null;
  
  const formattedCandles = formatCandlesForChart(candles);
  const lastCandle = formattedCandles[formattedCandles.length - 1];
  
  const high24h = Math.max(...formattedCandles.map(c => c.high));
  const low24h = Math.min(...formattedCandles.map(c => c.low));
  const volume24h = formattedCandles.reduce((sum, c) => sum + c.volume, 0);
  
  return {
    lastPrice: lastCandle.close,
    priceChange: calculatePriceChange(formattedCandles),
    high24h,
    low24h,
    volume24h,
  };
};

export default {
  getPrices,
  getCandles,
  getOrderBook,
  formatCandlesForChart,
  formatOrderBook,
  calculatePriceChange,
  getMarketSummary,
};
