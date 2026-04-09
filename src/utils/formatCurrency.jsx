// src/utils/formatCurrency.jsx

/**
 * Format number as currency
 * @param {number} amount - Numeric value to format
 * @param {string} currency - ISO currency code (default: USD)
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  