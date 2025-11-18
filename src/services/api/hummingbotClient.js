/* global console */
/**
 * Hummingbot API Client
 * 
 * Cliente HTTP para comunicação com Hummingbot REST API
 * Suporta autenticação Basic Auth e interceptors para error handling
 */

import axios from 'axios';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_USERNAME = import.meta.env.VITE_API_USERNAME || 'admin';
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD || 'admin';

// Criar instância do axios com configuração padrão
const hummingbotClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: API_USERNAME,
    password: API_PASSWORD,
  },
});

// Interceptor para requests (logging e modificações)
hummingbotClient.interceptors.request.use(
  (config) => {
    // Log da requisição em desenvolvimento com redação de segredos
    if (import.meta.env.DEV) {
      let dataToLog = config.data;
      try {
        if (dataToLog && typeof dataToLog === 'object') {
          const clone = Array.isArray(dataToLog) ? [...dataToLog] : { ...dataToLog };
          const redactKeys = ['api_key', 'api_secret', 'private_key', 'secret', 'password'];
          const redactDeep = (obj) => {
            if (!obj || typeof obj !== 'object') return obj;
            Object.keys(obj).forEach((k) => {
              if (redactKeys.includes(k)) {
                obj[k] = '***';
              } else if (typeof obj[k] === 'object') {
                obj[k] = redactDeep(Array.isArray(obj[k]) ? [...obj[k]] : { ...obj[k] });
              }
            });
            return obj;
          };
          dataToLog = redactDeep(clone);
        }
      } catch {
        // ignore redaction errors
      }
      console.log(`[Hummingbot API] ${config.method?.toUpperCase()} ${config.url}`, dataToLog);
    }
    return config;
  },
  (error) => {
    console.error('[Hummingbot API] Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses (error handling)
hummingbotClient.interceptors.response.use(
  (response) => {
    // Log da resposta em desenvolvimento
    if (import.meta.env.DEV) {
      console.log(`[Hummingbot API] Response from ${response.config.url}:`, response.data);
    }
    return response;
  },
  (error) => {
    // Error handling centralizado
    if (error.response) {
      // Erro do servidor (4xx, 5xx)
      console.error('[Hummingbot API] Server error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });

      // Mensagens de erro customizadas
      switch (error.response.status) {
        case 401:
          error.message = 'Autenticação falhou. Verifique suas credenciais.';
          break;
        case 403:
          error.message = 'Acesso negado. Você não tem permissão para esta operação.';
          break;
        case 404:
          error.message = 'Recurso não encontrado.';
          break;
        case 500:
          error.message = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
        default:
          error.message = error.response.data?.detail || 'Erro ao comunicar com a API.';
      }
    } else if (error.request) {
      // Erro de rede (sem resposta)
      console.error('[Hummingbot API] Network error:', error.request);
      error.message = 'Erro de conexão. Verifique se a API está rodando.';
    } else {
      // Erro na configuração da requisição
      console.error('[Hummingbot API] Config error:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * API Methods
 */

// Health Check
export const healthCheck = async () => {
  const response = await hummingbotClient.get('/');
  return response.data;
};

// Bot Orchestration
export const getBotStatus = async () => {
  const response = await hummingbotClient.get('/bot-orchestration/status');
  return response.data;
};

export const getBotDetails = async (botName) => {
  const response = await hummingbotClient.get(`/bot-orchestration/${botName}/status`);
  return response.data;
};

export const startBot = async (botName) => {
  const response = await hummingbotClient.post(`/bot-orchestration/${botName}/start`);
  return response.data;
};

export const stopBot = async (botName) => {
  const response = await hummingbotClient.post(`/bot-orchestration/${botName}/stop`);
  return response.data;
};

export const deployV2Script = async (config) => {
  const response = await hummingbotClient.post('/bot-orchestration/deploy-v2-script', config);
  return response.data;
};

// Portfolio
export const getPortfolioState = async (params = {}) => {
  const response = await hummingbotClient.post('/portfolio/state', params);
  return response.data;
};

export const getPortfolioDistribution = async () => {
  const response = await hummingbotClient.post('/portfolio/distribution', {});
  return response.data;
};

// Market Data
export const getMarketPrices = async (connectorName, tradingPairs) => {
  const response = await hummingbotClient.post('/market-data/prices', {
    connector_name: connectorName,
    trading_pairs: tradingPairs,
  });
  return response.data;
};

export const getCandles = async (connectorName, tradingPair, interval = '1h', startTime, endTime) => {
  const response = await hummingbotClient.post('/market-data/candles', {
    connector_name: connectorName,
    trading_pair: tradingPair,
    interval,
    start_time: startTime,
    end_time: endTime,
  });
  return response.data;
};

export const getOrderBook = async (connectorName, tradingPair, depth = 10) => {
  const response = await hummingbotClient.post('/market-data/order-book', {
    connector_name: connectorName,
    trading_pair: tradingPair,
    depth,
  });
  return response.data;
};

// Trading
export const placeOrder = async (orderData) => {
  const response = await hummingbotClient.post('/trading/orders', orderData);
  return response.data;
};

export const cancelOrder = async (accountName, connectorName, orderId) => {
  const response = await hummingbotClient.delete('/trading/orders', {
    data: {
      account_name: accountName,
      connector_name: connectorName,
      order_id: orderId,
    },
  });
  return response.data;
};

export const getActiveOrders = async (accountName, connectorName) => {
  const response = await hummingbotClient.post('/trading/active-orders', {
    account_name: accountName,
    connector_name: connectorName,
  });
  return response.data;
};

// Accounts
export const listAccounts = async () => {
  const response = await hummingbotClient.get('/accounts');
  return response.data;
};

export const addCredential = async ({ account_name, connector_name, credentials }) => {
  const response = await hummingbotClient.post(
    `/accounts/add-credential/${encodeURIComponent(account_name)}/${encodeURIComponent(connector_name)}`,
    credentials
  );
  return response.data;
};

// Connectors
export const listConnectors = async () => {
  const response = await hummingbotClient.get('/connectors');
  return response.data;
};

// Controllers
export const listControllers = async () => {
  const response = await hummingbotClient.get('/controllers');
  return response.data;
};

// Scripts
export const listScripts = async () => {
  const response = await hummingbotClient.get('/scripts');
  return response.data;
};

// Backtesting
export const runBacktest = async (backtestConfig) => {
  const response = await hummingbotClient.post('/backtesting/run', backtestConfig);
  return response.data;
};

// Gateway
export const getGatewayStatus = async () => {
  const response = await hummingbotClient.get('/gateway/status');
  return response.data;
};

export const gatewaySwap = async (swapData) => {
  const response = await hummingbotClient.post('/gateway-swap/swap', swapData);
  return response.data;
};

export default hummingbotClient;
