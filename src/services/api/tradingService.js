/**
 * Trading Service
 * 
 * Service layer para operações de trading
 * Orders, active positions, trade history
 */

import hummingbotClient from './hummingbotClient';

/**
 * Place a new order
 */
export const placeOrder = async (orderData) => {
  try {
    const response = await hummingbotClient.post('/trading/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

/**
 * Cancel an order
 */
export const cancelOrder = async (accountName, connectorName, orderId) => {
  try {
    const response = await hummingbotClient.delete('/trading/orders', {
      data: {
        account_name: accountName,
        connector_name: connectorName,
        order_id: orderId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error canceling order:', error);
    throw error;
  }
};

/**
 * Get active orders
 */
export const getActiveOrders = async (accountName, connectorName) => {
  try {
    const response = await hummingbotClient.post('/trading/active-orders', {
      account_name: accountName,
      connector_name: connectorName,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching active orders:', error);
    throw error;
  }
};

/**
 * Format order for display
 */
export const formatOrder = (order) => {
  return {
    orderId: order.order_id || order.id,
    symbol: order.trading_pair || order.symbol,
    side: order.trade_type || order.side,
    type: order.order_type || order.type,
    price: parseFloat(order.price),
    amount: parseFloat(order.amount),
    filled: parseFloat(order.filled || 0),
    remaining: parseFloat(order.amount) - parseFloat(order.filled || 0),
    status: order.status,
    timestamp: order.timestamp || order.created_at,
  };
};

/**
 * Calculate order total
 */
export const calculateOrderTotal = (price, amount) => {
  return (parseFloat(price) * parseFloat(amount)).toFixed(8);
};

/**
 * Validate order inputs
 */
export const validateOrder = (orderData) => {
  const errors = [];
  
  if (!orderData.account_name) {
    errors.push('Account name is required');
  }
  
  if (!orderData.connector_name) {
    errors.push('Connector name is required');
  }
  
  if (!orderData.trading_pair) {
    errors.push('Trading pair is required');
  }
  
  if (!orderData.trade_type || !['buy', 'sell'].includes(orderData.trade_type.toLowerCase())) {
    errors.push('Trade type must be buy or sell');
  }
  
  if (!orderData.order_type || !['market', 'limit'].includes(orderData.order_type.toLowerCase())) {
    errors.push('Order type must be market or limit');
  }
  
  if (!orderData.amount || parseFloat(orderData.amount) <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  if (orderData.order_type === 'limit' && (!orderData.price || parseFloat(orderData.price) <= 0)) {
    errors.push('Price must be greater than 0 for limit orders');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Quick order templates
 */
export const orderTemplates = {
  marketBuy: (accountName, connectorName, tradingPair, amount) => ({
    account_name: accountName,
    connector_name: connectorName,
    trading_pair: tradingPair,
    order_type: 'market',
    trade_type: 'buy',
    amount: amount.toString(),
  }),
  
  marketSell: (accountName, connectorName, tradingPair, amount) => ({
    account_name: accountName,
    connector_name: connectorName,
    trading_pair: tradingPair,
    order_type: 'market',
    trade_type: 'sell',
    amount: amount.toString(),
  }),
  
  limitBuy: (accountName, connectorName, tradingPair, price, amount) => ({
    account_name: accountName,
    connector_name: connectorName,
    trading_pair: tradingPair,
    order_type: 'limit',
    trade_type: 'buy',
    price: price.toString(),
    amount: amount.toString(),
  }),
  
  limitSell: (accountName, connectorName, tradingPair, price, amount) => ({
    account_name: accountName,
    connector_name: connectorName,
    trading_pair: tradingPair,
    order_type: 'limit',
    trade_type: 'sell',
    price: price.toString(),
    amount: amount.toString(),
  }),
};

export default {
  placeOrder,
  cancelOrder,
  getActiveOrders,
  formatOrder,
  calculateOrderTotal,
  validateOrder,
  orderTemplates,
};
