/**
 * Backtesting Service
 * 
 * API service for running and managing backtests
 */

import hummingbotClient from './hummingbotClient';

/**
 * Run a backtest with given configuration
 */
export const runBacktest = async (config) => {
  try {
    const response = await hummingbotClient.post('/backtesting/run', config);
    return response.data;
  } catch (error) {
    console.error('Run backtest error:', error);
    throw error;
  }
};

/**
 * Get backtest results by ID
 */
export const getBacktestResults = async (backtestId) => {
  try {
    const response = await hummingbotClient.get(`/backtesting/results/${backtestId}`);
    return response.data;
  } catch (error) {
    console.error('Get backtest results error:', error);
    throw error;
  }
};

/**
 * List all backtests
 */
export const listBacktests = async (filters = {}) => {
  try {
    const response = await hummingbotClient.post('/backtesting/list', filters);
    return response.data;
  } catch (error) {
    console.error('List backtests error:', error);
    throw error;
  }
};

/**
 * Delete a backtest
 */
export const deleteBacktest = async (backtestId) => {
  try {
    const response = await hummingbotClient.delete(`/backtesting/${backtestId}`);
    return response.data;
  } catch (error) {
    console.error('Delete backtest error:', error);
    throw error;
  }
};

/**
 * Get backtest performance metrics
 */
export const getBacktestMetrics = async (backtestId) => {
  try {
    const response = await hummingbotClient.get(`/backtesting/metrics/${backtestId}`);
    return response.data;
  } catch (error) {
    console.error('Get backtest metrics error:', error);
    throw error;
  }
};

/**
 * Calculate backtest metrics from results
 */
export const calculateBacktestMetrics = (results) => {
  if (!results || !results.trades || results.trades.length === 0) {
    return null;
  }

  const trades = results.trades;
  const pnlValues = trades.map(t => t.pnl || 0);
  const totalPnL = pnlValues.reduce((sum, pnl) => sum + pnl, 0);
  const winningTrades = trades.filter(t => t.pnl > 0);
  const losingTrades = trades.filter(t => t.pnl < 0);

  const winRate = (winningTrades.length / trades.length) * 100;
  const avgWin = winningTrades.length > 0
    ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length
    : 0;
  const avgLoss = losingTrades.length > 0
    ? losingTrades.reduce((sum, t) => sum + Math.abs(t.pnl), 0) / losingTrades.length
    : 0;
  const profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;

  // Calculate drawdown
  let peak = results.initial_capital;
  let maxDrawdown = 0;
  let currentCapital = results.initial_capital;

  trades.forEach(trade => {
    currentCapital += trade.pnl;
    if (currentCapital > peak) {
      peak = currentCapital;
    }
    const drawdown = ((peak - currentCapital) / peak) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });

  // Calculate Sharpe Ratio (simplified)
  const returns = pnlValues.map(pnl => (pnl / results.initial_capital) * 100);
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  const sharpeRatio = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0;

  return {
    totalTrades: trades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    winRate: winRate.toFixed(2),
    totalPnL: totalPnL.toFixed(2),
    avgWin: avgWin.toFixed(2),
    avgLoss: avgLoss.toFixed(2),
    profitFactor: profitFactor.toFixed(2),
    maxDrawdown: maxDrawdown.toFixed(2),
    sharpeRatio: sharpeRatio.toFixed(2),
    finalCapital: (results.initial_capital + totalPnL).toFixed(2),
    returnPercentage: ((totalPnL / results.initial_capital) * 100).toFixed(2),
  };
};

/**
 * Format backtest results for chart
 */
export const formatBacktestForChart = (results) => {
  if (!results || !results.trades) return [];

  let capital = results.initial_capital;
  const data = [{
    timestamp: results.start_time,
    capital: capital,
    pnl: 0,
  }];

  results.trades.forEach(trade => {
    capital += trade.pnl || 0;
    data.push({
      timestamp: trade.timestamp,
      capital: capital,
      pnl: trade.pnl || 0,
      side: trade.side,
      price: trade.price,
    });
  });

  return data;
};

export default {
  runBacktest,
  getBacktestResults,
  listBacktests,
  deleteBacktest,
  getBacktestMetrics,
  calculateBacktestMetrics,
  formatBacktestForChart,
};
