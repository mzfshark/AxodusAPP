/**
 * Backtest Form Component
 * 
 * Form for configuring and starting a backtest
 */

import React, { useState } from 'react';
import './BacktestForm.css';

const BacktestForm = ({ onSubmit, loading }) => {
  const [config, setConfig] = useState({
    strategy: 'pmm',
    exchange: 'binance',
    trading_pair: 'BTC-USDT',
    start_date: '',
    end_date: '',
    initial_capital: 10000,
    // PMM specific
    bid_spread: 0.5,
    ask_spread: 0.5,
    order_amount: 100,
    order_refresh_time: 30,
  });

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(config);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Configure Backtest</h2>

      {/* Strategy Selection */}
      <div className="section">
        <h3>Strategy</h3>
        <div className="field">
          <label>Strategy Type</label>
          <select
            value={config.strategy}
            onChange={(e) => handleChange('strategy', e.target.value)}
            required
          >
            <option value="pmm">Pure Market Making</option>
            <option value="grid">Grid Trading</option>
            <option value="dca">Dollar Cost Averaging</option>
            <option value="directional">Directional Trading</option>
          </select>
        </div>
      </div>

      {/* Market Configuration */}
      <div className="section">
        <h3>Market</h3>
        <div className="fieldGroup">
          <div className="field">
            <label>Exchange</label>
            <select
              value={config.exchange}
              onChange={(e) => handleChange('exchange', e.target.value)}
              required
            >
              <option value="binance">Binance</option>
              <option value="okx">OKX</option>
              <option value="kraken">Kraken</option>
              <option value="coinbase">Coinbase</option>
            </select>
          </div>

          <div className="field">
            <label>Trading Pair</label>
            <input
              type="text"
              value={config.trading_pair}
              onChange={(e) => handleChange('trading_pair', e.target.value.toUpperCase())}
              placeholder="BTC-USDT"
              required
            />
          </div>
        </div>
      </div>

      {/* Time Range */}
      <div className="section">
        <h3>Time Range</h3>
        <div className="fieldGroup">
          <div className="field">
            <label>Start Date</label>
            <input
              type="date"
              value={config.start_date}
              onChange={(e) => handleChange('start_date', e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>End Date</label>
            <input
              type="date"
              value={config.end_date}
              onChange={(e) => handleChange('end_date', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Capital */}
      <div className="section">
        <h3>Capital</h3>
        <div className="field">
          <label>Initial Capital (USDT)</label>
          <input
            type="number"
            value={config.initial_capital}
            onChange={(e) => handleChange('initial_capital', parseFloat(e.target.value))}
            min="100"
            step="100"
            required
          />
        </div>
      </div>

      {/* Strategy Parameters */}
      {config.strategy === 'pmm' && (
        <div className="section">
          <h3>PMM Parameters</h3>
          <div className="fieldGroup">
            <div className="field">
              <label>Bid Spread (%)</label>
              <input
                type="number"
                value={config.bid_spread}
                onChange={(e) => handleChange('bid_spread', parseFloat(e.target.value))}
                min="0.1"
                max="5"
                step="0.1"
                required
              />
            </div>

            <div className="field">
              <label>Ask Spread (%)</label>
              <input
                type="number"
                value={config.ask_spread}
                onChange={(e) => handleChange('ask_spread', parseFloat(e.target.value))}
                min="0.1"
                max="5"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="fieldGroup">
            <div className="field">
              <label>Order Amount (USDT)</label>
              <input
                type="number"
                value={config.order_amount}
                onChange={(e) => handleChange('order_amount', parseFloat(e.target.value))}
                min="10"
                step="10"
                required
              />
            </div>

            <div className="field">
              <label>Order Refresh Time (s)</label>
              <input
                type="number"
                value={config.order_refresh_time}
                onChange={(e) => handleChange('order_refresh_time', parseInt(e.target.value))}
                min="1"
                max="300"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" className="submitButton" disabled={loading}>
        {loading ? '⏳ Running Backtest...' : '🚀 Start Backtest'}
      </button>
    </form>
  );
};

export default BacktestForm;
