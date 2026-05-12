/**
 * Trading Panel
 * 
 * Interface para executar ordens (market e limit)
 * Suporta buy/sell em CEXs via Hummingbot API
 */

import React, { useState, useEffect } from 'react';
import {
  placeOrder,
  getActiveOrders,
  cancelOrder,
  validateOrder,
  calculateOrderTotal,
  formatOrder,
} from '@services/api/tradingService';
import { listAccounts } from '@services/api/hummingbotClient';
import { getPrices } from '@services/api/marketDataService';
import './TradingPanel.css';

const TradingPanel = () => {
  // Form state
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [connector, setConnector] = useState('binance');
  const [tradingPair, setTradingPair] = useState('BTC-USDT');
  const [orderType, setOrderType] = useState('limit');
  const [tradeType, setTradeType] = useState('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  // State
  const [currentPrice, setCurrentPrice] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch accounts on mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  // Fetch current price
  useEffect(() => {
    if (connector && tradingPair) {
      fetchCurrentPrice();
    }
  }, [connector, tradingPair]);

  // Fetch active orders
  useEffect(() => {
    if (selectedAccount && connector) {
      fetchActiveOrders();
    }
  }, [selectedAccount, connector]);

  const fetchAccounts = async () => {
    try {
      const data = await listAccounts();
      setAccounts(data);
      if (data.length > 0) {
        setSelectedAccount(data[0].name || data[0].id);
      }
    } catch (err) {
      console.error('Error fetching accounts:', err);
    }
  };

  const fetchCurrentPrice = async () => {
    try {
      const data = await getPrices(connector, [tradingPair]);
      if (data && data[tradingPair]) {
        setCurrentPrice(data[tradingPair].price);
        if (orderType === 'limit' && !price) {
          setPrice(data[tradingPair].price);
        }
      }
    } catch (err) {
      console.error('Error fetching price:', err);
    }
  };

  const fetchActiveOrders = async () => {
    try {
      const data = await getActiveOrders(selectedAccount, connector);
      setActiveOrders(data.map(formatOrder));
    } catch (err) {
      console.error('Error fetching active orders:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const orderData = {
      account_name: selectedAccount,
      connector_name: connector,
      trading_pair: tradingPair,
      order_type: orderType,
      trade_type: tradeType,
      amount: amount,
      ...(orderType === 'limit' && { price: price }),
    };

    // Validate
    const validation = validateOrder(orderData);
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return;
    }

    setLoading(true);

    try {
      const result = await placeOrder(orderData);
      setSuccessMessage(`Order placed successfully! Order ID: ${result.order_id || result.id}`);
      
      // Reset form
      setAmount('');
      if (orderType === 'market') {
        setPrice('');
      }
      
      // Refresh active orders
      setTimeout(fetchActiveOrders, 1000);
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!confirm(`Cancel order ${orderId}?`)) return;

    try {
      await cancelOrder(selectedAccount, connector, orderId);
      setSuccessMessage(`Order ${orderId} canceled successfully!`);
      fetchActiveOrders();
    } catch (err) {
      setError(`Failed to cancel order: ${err.message}`);
    }
  };

  const total = calculateOrderTotal(price || currentPrice || 0, amount || 0);

  return (
    <div className="container">
      <div className="header">
        <h1>Trading Panel</h1>
        <p className="subtitle">Execute market and limit orders</p>
      </div>

      <div className="layout">
        {/* Order Form */}
        <div className="formSection">
          <h2>Place Order</h2>

          {/* Current Price */}
          {currentPrice && (
            <div className="currentPrice">
              Current Price: <strong>${parseFloat(currentPrice).toLocaleString()}</strong>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Account Selection */}
            <div className="formGroup">
              <label>Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                required
              >
                <option key="__placeholder__" value="">Select Account</option>
                {accounts.map((acc) => (
                  <option key={acc.name || acc.id} value={acc.name || acc.id}>
                    {acc.name || acc.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Connector */}
            <div className="formGroup">
              <label>Exchange</label>
              <select value={connector} onChange={(e) => setConnector(e.target.value)}>
                <option value="binance">Binance</option>
                <option value="okx">OKX</option>
                <option value="kraken">Kraken</option>
                <option value="coinbase">Coinbase</option>
              </select>
            </div>

            {/* Trading Pair */}
            <div className="formGroup">
              <label>Trading Pair</label>
              <input
                type="text"
                value={tradingPair}
                onChange={(e) => setTradingPair(e.target.value.toUpperCase())}
                placeholder="BTC-USDT"
                required
              />
            </div>

            {/* Order Type Tabs */}
            <div className="tabs">
              <button
                type="button"
                className={`tab ${orderType === 'limit' ? 'active' : ''}`}
                onClick={() => setOrderType('limit')}
              >
                Limit
              </button>
              <button
                type="button"
                className={`tab ${orderType === 'market' ? 'active' : ''}`}
                onClick={() => setOrderType('market')}
              >
                Market
              </button>
            </div>

            {/* Trade Type Tabs */}
            <div className="tabs">
              <button
                type="button"
                className={`tab buyTab ${tradeType === 'buy' ? 'active' : ''}`}
                onClick={() => setTradeType('buy')}
              >
                Buy
              </button>
              <button
                type="button"
                className={`tab sellTab ${tradeType === 'sell' ? 'active' : ''}`}
                onClick={() => setTradeType('sell')}
              >
                Sell
              </button>
            </div>

            {/* Price (for limit orders) */}
            {orderType === 'limit' && (
              <div className="formGroup">
                <label>Price</label>
                <input
                  type="number"
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            )}

            {/* Amount */}
            <div className="formGroup">
              <label>Amount</label>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            {/* Total */}
            <div className="total">
              <span>Total:</span>
              <strong>${total}</strong>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`submitButton ${tradeType === 'buy' ? 'buyButton' : 'sellButton'}`}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${tradingPair.split('-')[0]}`}
            </button>
          </form>

          {/* Messages */}
          {error && <div className="errorMessage">{error}</div>}
          {successMessage && <div className="successMessage">{successMessage}</div>}
        </div>

        {/* Active Orders */}
        <div className="ordersSection">
          <div className="ordersHeader">
            <h2>Active Orders</h2>
            <button onClick={fetchActiveOrders} className="refreshButton">
              🔄
            </button>
          </div>

          {activeOrders.length === 0 ? (
            <div className="emptyOrders">No active orders</div>
          ) : (
            <div className="ordersList">
              {activeOrders.map((order) => (
                <div key={order.orderId} className="orderCard">
                  <div className="orderHeader">
                    <span className="orderSymbol">{order.symbol}</span>
                    <span className={`orderSide ${order.side === 'buy' ? 'buy' : 'sell'}`}>
                      {order.side.toUpperCase()}
                    </span>
                  </div>
                  <div className="orderDetails">
                    <div>Type: {order.type}</div>
                    <div>Price: ${parseFloat(order.price).toLocaleString()}</div>
                    <div>Amount: {parseFloat(order.amount).toFixed(6)}</div>
                    <div>Filled: {parseFloat(order.filled).toFixed(6)}</div>
                    <div>Status: <span className="status">{order.status}</span></div>
                  </div>
                  <button
                    onClick={() => handleCancelOrder(order.orderId)}
                    className="cancelButton"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;
