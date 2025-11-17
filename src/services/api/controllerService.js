/**
 * Controller Service
 * 
 * API service for managing Hummingbot controllers
 */

import hummingbotClient from './hummingbotClient';

/**
 * List all available controllers
 */
export const listControllers = async () => {
  try {
    const response = await hummingbotClient.get('/controllers/list');
    return response.data;
  } catch (error) {
    console.error('List controllers error:', error);
    throw error;
  }
};

/**
 * Get controller configuration
 */
export const getControllerConfig = async (controllerName) => {
  try {
    const response = await hummingbotClient.get(`/controllers/${controllerName}`);
    return response.data;
  } catch (error) {
    console.error('Get controller config error:', error);
    throw error;
  }
};

/**
 * Create a new controller configuration
 */
export const createController = async (config) => {
  try {
    const response = await hummingbotClient.post('/controllers/create', config);
    return response.data;
  } catch (error) {
    console.error('Create controller error:', error);
    throw error;
  }
};

/**
 * Update controller configuration
 */
export const updateController = async (controllerName, config) => {
  try {
    const response = await hummingbotClient.put(`/controllers/${controllerName}`, config);
    return response.data;
  } catch (error) {
    console.error('Update controller error:', error);
    throw error;
  }
};

/**
 * Delete a controller
 */
export const deleteController = async (controllerName) => {
  try {
    const response = await hummingbotClient.delete(`/controllers/${controllerName}`);
    return response.data;
  } catch (error) {
    console.error('Delete controller error:', error);
    throw error;
  }
};

/**
 * Get controller templates
 */
export const getControllerTemplates = () => {
  return {
    pmm: {
      name: 'Pure Market Making',
      type: 'pmm',
      description: 'Market making strategy with bid/ask spread',
      parameters: {
        bid_spread: { type: 'number', default: 0.5, min: 0.1, max: 5, step: 0.1 },
        ask_spread: { type: 'number', default: 0.5, min: 0.1, max: 5, step: 0.1 },
        order_amount: { type: 'number', default: 100, min: 10, max: 10000, step: 10 },
        order_refresh_time: { type: 'number', default: 30, min: 1, max: 300, step: 1 },
        filled_order_delay: { type: 'number', default: 60, min: 0, max: 600, step: 10 },
      },
    },
    directional: {
      name: 'Directional Trading',
      type: 'directional',
      description: 'Trend following with indicators',
      parameters: {
        side: { type: 'select', options: ['buy', 'sell'], default: 'buy' },
        stop_loss: { type: 'number', default: 2, min: 0.5, max: 10, step: 0.5 },
        take_profit: { type: 'number', default: 5, min: 1, max: 20, step: 0.5 },
        trailing_stop: { type: 'boolean', default: false },
        position_size: { type: 'number', default: 100, min: 10, max: 10000, step: 10 },
      },
    },
    dca: {
      name: 'Dollar Cost Averaging',
      type: 'dca',
      description: 'Systematic accumulation strategy',
      parameters: {
        interval_hours: { type: 'number', default: 24, min: 1, max: 168, step: 1 },
        order_amount: { type: 'number', default: 100, min: 10, max: 10000, step: 10 },
        price_threshold: { type: 'number', default: 0, min: 0, max: 100, step: 0.1 },
        max_orders: { type: 'number', default: 10, min: 1, max: 100, step: 1 },
      },
    },
    grid: {
      name: 'Grid Trading',
      type: 'grid',
      description: 'Buy low, sell high within a range',
      parameters: {
        lower_price: { type: 'number', default: 40000, min: 0, step: 100 },
        upper_price: { type: 'number', default: 60000, min: 0, step: 100 },
        grid_levels: { type: 'number', default: 10, min: 2, max: 50, step: 1 },
        order_amount: { type: 'number', default: 100, min: 10, max: 10000, step: 10 },
      },
    },
    arbitrage: {
      name: 'Arbitrage',
      type: 'arbitrage',
      description: 'Exploit price differences across exchanges',
      parameters: {
        min_spread: { type: 'number', default: 0.5, min: 0.1, max: 5, step: 0.1 },
        order_amount: { type: 'number', default: 100, min: 10, max: 10000, step: 10 },
        exchange_a: { type: 'text', default: 'binance' },
        exchange_b: { type: 'text', default: 'okx' },
      },
    },
  };
};

/**
 * Validate controller configuration
 */
export const validateControllerConfig = (type, config) => {
  const templates = getControllerTemplates();
  const template = templates[type];

  if (!template) {
    return { valid: false, errors: ['Invalid controller type'] };
  }

  const errors = [];

  Object.entries(template.parameters).forEach(([key, param]) => {
    const value = config[key];

    if (value === undefined || value === null) {
      errors.push(`Missing required parameter: ${key}`);
      return;
    }

    if (param.type === 'number') {
      if (typeof value !== 'number') {
        errors.push(`${key} must be a number`);
      } else if (param.min !== undefined && value < param.min) {
        errors.push(`${key} must be at least ${param.min}`);
      } else if (param.max !== undefined && value > param.max) {
        errors.push(`${key} must be at most ${param.max}`);
      }
    } else if (param.type === 'select') {
      if (!param.options.includes(value)) {
        errors.push(`${key} must be one of: ${param.options.join(', ')}`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};

export default {
  listControllers,
  getControllerConfig,
  createController,
  updateController,
  deleteController,
  getControllerTemplates,
  validateControllerConfig,
};
