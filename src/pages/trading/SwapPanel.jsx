/**
 * Swap Panel (DEX Trading via Gateway)
 * 
 * Interface for executing token swaps on decentralized exchanges
 */

import React, { useState, useEffect } from 'react';
import hummingbotClient from '@services/api/hummingbotClient';
import styles from './SwapPanel.module.css';

const SwapPanel = () => {
  const [chain, setChain] = useState('ethereum');
  const [connector, setConnector] = useState('uniswap');
  const [fromToken, setFromToken] = useState('WETH');
  const [toToken, setToToken] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [estimatedOutput, setEstimatedOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Chain configuration
  const chainConfig = {
    ethereum: {
      connectors: [
        { value: 'uniswap', label: 'Uniswap V3' },
        { value: 'sushiswap', label: 'SushiSwap' },
        { value: 'pancakeswap', label: 'PancakeSwap (ETH)' },
      ],
      tokens: ['WETH', 'USDT', 'USDC', 'DAI', 'WBTC', 'UNI', 'LINK'],
    },
    solana: {
      connectors: [
        { value: 'jupiter', label: 'Jupiter' },
        { value: 'raydium', label: 'Raydium' },
      ],
      tokens: ['SOL', 'USDC', 'USDT', 'RAY', 'SRM', 'ORCA'],
    },
    polygon: {
      connectors: [
        { value: 'quickswap', label: 'QuickSwap' },
        { value: 'sushiswap', label: 'SushiSwap' },
      ],
      tokens: ['WMATIC', 'USDC', 'USDT', 'DAI', 'WETH', 'QUICK'],
    },
  };

  useEffect(() => {
    // Reset connector when chain changes
    const defaultConnector = chainConfig[chain]?.connectors[0]?.value || 'uniswap';
    setConnector(defaultConnector);

    // Reset tokens
    const defaultTokens = chainConfig[chain]?.tokens || [];
    if (defaultTokens.length >= 2) {
      setFromToken(defaultTokens[0]);
      setToToken(defaultTokens[1]);
    }
  }, [chain]);

  useEffect(() => {
    // Fetch quote when inputs change
    if (amount && parseFloat(amount) > 0 && fromToken && toToken) {
      fetchQuote();
    }
  }, [amount, fromToken, toToken, connector, slippage]);

  const fetchQuote = async () => {
    try {
      const response = await hummingbotClient.post('/gateway-swap/quote', {
        chain,
        connector,
        from_token: fromToken,
        to_token: toToken,
        amount: parseFloat(amount),
        slippage: parseFloat(slippage),
      });

      setEstimatedOutput(response.data);
    } catch (err) {
      console.error('Quote fetch error:', err);
      setEstimatedOutput(null);
    }
  };

  const handleSwap = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validate inputs
      if (!amount || parseFloat(amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }

      if (fromToken === toToken) {
        throw new Error('From and To tokens must be different');
      }

      // Execute swap
      const response = await hummingbotClient.post('/gateway-swap/swap', {
        chain,
        connector,
        from_token: fromToken,
        to_token: toToken,
        amount: parseFloat(amount),
        slippage: parseFloat(slippage),
      });

      setSuccess(`Swap executed successfully! Tx: ${response.data.tx_hash}`);
      setAmount('');
      setEstimatedOutput(null);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const currentChainConfig = chainConfig[chain] || chainConfig.ethereum;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>DEX Swap</h1>
        <p className={styles.subtitle}>Trade tokens on decentralized exchanges via Gateway</p>
      </div>

      {/* Chain & Connector Selection */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Blockchain</label>
          <select value={chain} onChange={(e) => setChain(e.target.value)}>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
            <option value="polygon">Polygon</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>DEX Protocol</label>
          <select value={connector} onChange={(e) => setConnector(e.target.value)}>
            {currentChainConfig.connectors.map((conn) => (
              <option key={conn.value} value={conn.value}>
                {conn.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>Slippage Tolerance (%)</label>
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
            step="0.1"
            min="0"
            max="50"
          />
        </div>
      </div>

      {/* Swap Form */}
      <form onSubmit={handleSwap} className={styles.swapForm}>
        {/* From Token */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenHeader}>
            <span className={styles.tokenLabel}>From</span>
          </div>

          <div className={styles.tokenInput}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="any"
              required
            />

            <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
              {currentChainConfig.tokens.map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className={styles.swapButtonContainer}>
          <button type="button" onClick={swapTokens} className={styles.swapButton}>
            ⇅
          </button>
        </div>

        {/* To Token */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenHeader}>
            <span className={styles.tokenLabel}>To</span>
          </div>

          <div className={styles.tokenInput}>
            <input
              type="text"
              value={
                estimatedOutput
                  ? parseFloat(estimatedOutput.estimated_output).toFixed(6)
                  : '0.0'
              }
              readOnly
              placeholder="0.0"
            />

            <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
              {currentChainConfig.tokens.map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quote Details */}
        {estimatedOutput && (
          <div className={styles.quoteDetails}>
            <div className={styles.quoteRow}>
              <span>Estimated Output</span>
              <span className={styles.quoteValue}>
                {parseFloat(estimatedOutput.estimated_output).toFixed(6)} {toToken}
              </span>
            </div>
            <div className={styles.quoteRow}>
              <span>Price Impact</span>
              <span className={styles.quoteValue}>
                {estimatedOutput.price_impact
                  ? `${parseFloat(estimatedOutput.price_impact).toFixed(2)}%`
                  : 'N/A'}
              </span>
            </div>
            <div className={styles.quoteRow}>
              <span>Minimum Received</span>
              <span className={styles.quoteValue}>
                {estimatedOutput.minimum_received
                  ? `${parseFloat(estimatedOutput.minimum_received).toFixed(6)} ${toToken}`
                  : 'N/A'}
              </span>
            </div>
          </div>
        )}

        {/* Messages */}
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? '⏳ Swapping...' : '🔄 Execute Swap'}
        </button>
      </form>

      {/* Warning */}
      <div className={styles.warning}>
        <strong>⚠️ Important:</strong> Ensure Gateway is running and you have sufficient
        balance in your connected wallet. DEX swaps require gas fees and may take several
        seconds to complete.
      </div>
    </div>
  );
};

export default SwapPanel;
