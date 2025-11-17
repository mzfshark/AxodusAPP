/**
 * Portfolio Service
 * 
 * Service layer para gerenciamento de portfolio
 * Integra balances de CEX e DEX via Hummingbot API
 */

import hummingbotClient from './hummingbotClient';

/**
 * Get complete portfolio state
 * Includes CEX balances, DEX balances, LP positions, active orders
 */
export const getPortfolioState = async (params = {}) => {
  try {
    const response = await hummingbotClient.post('/portfolio/state', params);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio state:', error);
    throw error;
  }
};

/**
 * Get portfolio distribution by asset
 * Returns percentage allocation per token
 */
export const getPortfolioDistribution = async () => {
  try {
    const response = await hummingbotClient.post('/portfolio/distribution', {});
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio distribution:', error);
    throw error;
  }
};

/**
 * Calculate total portfolio value in USD
 */
export const calculateTotalValue = (portfolioState) => {
  if (!portfolioState || !portfolioState.balances) return 0;
  
  let total = 0;
  
  // Sum CEX balances
  Object.values(portfolioState.balances).forEach(exchange => {
    Object.entries(exchange).forEach(([token, data]) => {
      if (data.total_usd) {
        total += parseFloat(data.total_usd);
      }
    });
  });
  
  return total;
};

/**
 * Format portfolio data for charts
 */
export const formatPortfolioForChart = (portfolioState) => {
  if (!portfolioState || !portfolioState.balances) return [];
  
  const chartData = [];
  
  Object.entries(portfolioState.balances).forEach(([exchange, tokens]) => {
    Object.entries(tokens).forEach(([token, data]) => {
      if (data.total_usd && parseFloat(data.total_usd) > 0) {
        chartData.push({
          name: token,
          value: parseFloat(data.total_usd),
          exchange: exchange,
          amount: parseFloat(data.total || 0),
          available: parseFloat(data.available || 0),
          locked: parseFloat(data.locked || 0),
        });
      }
    });
  });
  
  // Sort by value descending
  return chartData.sort((a, b) => b.value - a.value);
};

/**
 * Get top N assets by value
 */
export const getTopAssets = (portfolioState, limit = 10) => {
  const chartData = formatPortfolioForChart(portfolioState);
  return chartData.slice(0, limit);
};

/**
 * Calculate portfolio metrics
 */
export const calculateMetrics = (portfolioState) => {
  if (!portfolioState) return null;
  
  const totalValue = calculateTotalValue(portfolioState);
  const chartData = formatPortfolioForChart(portfolioState);
  
  return {
    totalValue,
    totalAssets: chartData.length,
    topAsset: chartData[0]?.name || 'N/A',
    topAssetValue: chartData[0]?.value || 0,
    exchanges: Object.keys(portfolioState.balances || {}).length,
  };
};

export default {
  getPortfolioState,
  getPortfolioDistribution,
  calculateTotalValue,
  formatPortfolioForChart,
  getTopAssets,
  calculateMetrics,
};
