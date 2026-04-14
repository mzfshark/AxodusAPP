/**
 * Bot Management Page
 * 
 * Interface para gerenciamento de bots Hummingbot
 * Lista bots ativos, permite iniciar/parar e visualizar status
 */

import React, { useState } from 'react';
import { useBots } from '@context/BotContext';
import './BotManagement.css';

const BotManagement = () => {
  const { bots, loading, error, lastUpdate, fetchBots, startBot, stopBot } = useBots();
  const [selectedBot, setSelectedBot] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  /**
   * Handle bot action (start/stop)
   */
  const handleBotAction = async (botName, action) => {
    setActionLoading(botName);
    
    try {
      if (action === 'start') {
        await startBot(botName);
        alert(`Bot ${botName} iniciado com sucesso!`);
      } else if (action === 'stop') {
        await stopBot(botName);
        alert(`Bot ${botName} parado com sucesso!`);
      }
    } catch (err) {
      alert(`Erro ao ${action === 'start' ? 'iniciar' : 'parar'} bot: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  /**
   * Get status badge color
   */
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'running':
        return 'green';
      case 'stopped':
        return 'red';
      case 'error':
        return 'orange';
      default:
        return 'gray';
    }
  };

  /**
   * Render loading state
   */
  if (loading && bots.length === 0) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando bots...</p>
        </div>
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h2>❌ Erro ao conectar com a API</h2>
          <p>{error}</p>
          <button onClick={fetchBots} className="retryButton">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div>
          <h1>Gerenciamento de Bots</h1>
          <p className="subtitle">
            {bots.length} bot{bots.length !== 1 ? 's' : ''} encontrado{bots.length !== 1 ? 's' : ''}
            {lastUpdate && (
              <span className="lastUpdate">
                {' • Última atualização: '}
                {lastUpdate.toLocaleTimeString('pt-BR')}
              </span>
            )}
          </p>
        </div>
        <button onClick={fetchBots} className="refreshButton" disabled={loading}>
          {loading ? '⏳' : '🔄'} Atualizar
        </button>
      </div>

      {/* Bot List */}
      {bots.length === 0 ? (
        <div className="emptyState">
          <p>📭 Nenhum bot encontrado</p>
          <p className="emptyHint">
            Crie um novo bot usando o Dashboard ou API
          </p>
        </div>
      ) : (
        <div className="botGrid">
          {bots.map((bot) => (
            <div
              key={bot.name || bot.id}
              className={`botCard ${
                selectedBot?.name === bot.name ? 'selected' : ''
              }`}
              onClick={() => setSelectedBot(bot)}
            >
              {/* Bot Header */}
              <div className="botHeader">
                <h3>{bot.name || bot.id}</h3>
                <span
                  className="statusBadge"
                  style={{ backgroundColor: getStatusColor(bot.status) }}
                >
                  {bot.status || 'unknown'}
                </span>
              </div>

              {/* Bot Info */}
              <div className="botInfo">
                {bot.script && (
                  <div className="infoRow">
                    <span className="label">Script:</span>
                    <span className="value">{bot.script}</span>
                  </div>
                )}
                {bot.connector && (
                  <div className="infoRow">
                    <span className="label">Connector:</span>
                    <span className="value">{bot.connector}</span>
                  </div>
                )}
                {bot.trading_pair && (
                  <div className="infoRow">
                    <span className="label">Par:</span>
                    <span className="value">{bot.trading_pair}</span>
                  </div>
                )}
                {bot.uptime && (
                  <div className="infoRow">
                    <span className="label">Uptime:</span>
                    <span className="value">{bot.uptime}</span>
                  </div>
                )}
              </div>

              {/* Bot Actions */}
              <div className="botActions">
                {bot.status?.toLowerCase() !== 'running' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBotAction(bot.name, 'start');
                    }}
                    className="startButton"
                    disabled={actionLoading === bot.name}
                  >
                    {actionLoading === bot.name ? '⏳' : '▶️'} Iniciar
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBotAction(bot.name, 'stop');
                    }}
                    className="stopButton"
                    disabled={actionLoading === bot.name}
                  >
                    {actionLoading === bot.name ? '⏳' : '⏸️'} Parar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Bot Details (optional) */}
      {selectedBot && (
        <div className="detailsPanel">
          <h2>Detalhes: {selectedBot.name}</h2>
          <pre>{JSON.stringify(selectedBot, null, 2)}</pre>
          <button onClick={() => setSelectedBot(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default BotManagement;
