/**
 * Bot Context
 * 
 * Context global para gerenciamento de estado dos bots Hummingbot
 * Provê acesso a lista de bots, status e operações (start/stop)
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getBotStatus,
  getBotDetails,
  startBot as startBotAPI,
  stopBot as stopBotAPI,
} from '@services/api/hummingbotClient';

// Criar contexto
const BotContext = createContext(null);

// Hook customizado para usar o contexto
export const useBots = () => {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error('useBots deve ser usado dentro de BotProvider');
  }
  return context;
};

/**
 * Bot Provider Component
 */
export const BotProvider = ({ children }) => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  /**
   * Buscar lista de todos os bots
   */
  const fetchBots = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getBotStatus();
      // Normalizar diferentes formatos de resposta em uma lista de bots
      let botsList = [];
      if (Array.isArray(data)) {
        botsList = data;
      } else if (Array.isArray(data?.data)) {
        botsList = data.data;
      } else if (Array.isArray(data?.data?.bots)) {
        botsList = data.data.bots;
      } else if (Array.isArray(data?.bots)) {
        botsList = data.bots;
      } else if (data && typeof data === 'object') {
        // Se vier um objeto indexado por nome/id, converte para array
        botsList = Object.values(data);
      } else {
        botsList = [];
      }

      setBots(botsList);
      setLastUpdate(new Date());
      return data;
    } catch (err) {
      setError(err.message || 'Erro ao buscar bots');
      console.error('Error fetching bots:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Buscar detalhes de um bot específico
   */
  const fetchBotDetails = useCallback(async (botName) => {
    try {
      const details = await getBotDetails(botName);
      
      // Atualizar o bot na lista
      setBots((prevBots) =>
        prevBots.map((bot) =>
          bot.name === botName ? { ...bot, ...details } : bot
        )
      );
      
      return details;
    } catch (err) {
      console.error(`Error fetching details for bot ${botName}:`, err);
      throw err;
    }
  }, []);

  /**
   * Iniciar um bot
   */
  const startBot = useCallback(async (botName) => {
    try {
      const result = await startBotAPI(botName);
      
      // Atualizar status local imediatamente
      setBots((prevBots) =>
        prevBots.map((bot) =>
          bot.name === botName ? { ...bot, status: 'running' } : bot
        )
      );
      
      // Atualizar detalhes após 2 segundos
      setTimeout(() => {
        fetchBotDetails(botName);
      }, 2000);
      
      return result;
    } catch (err) {
      console.error(`Error starting bot ${botName}:`, err);
      throw err;
    }
  }, [fetchBotDetails]);

  /**
   * Parar um bot
   */
  const stopBot = useCallback(async (botName) => {
    try {
      const result = await stopBotAPI(botName);
      
      // Atualizar status local imediatamente
      setBots((prevBots) =>
        prevBots.map((bot) =>
          bot.name === botName ? { ...bot, status: 'stopped' } : bot
        )
      );
      
      // Atualizar detalhes após 2 segundos
      setTimeout(() => {
        fetchBotDetails(botName);
      }, 2000);
      
      return result;
    } catch (err) {
      console.error(`Error stopping bot ${botName}:`, err);
      throw err;
    }
  }, [fetchBotDetails]);

  /**
   * Auto-refresh dos bots a cada 30 segundos
   */
  useEffect(() => {
    // Buscar bots na montagem
    fetchBots();

    // Configurar auto-refresh
    const interval = setInterval(() => {
      fetchBots();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [fetchBots]);

  /**
   * Context value
   */
  const value = {
    bots,
    loading,
    error,
    lastUpdate,
    fetchBots,
    fetchBotDetails,
    startBot,
    stopBot,
  };

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};

export default BotContext;
