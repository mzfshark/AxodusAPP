/**
 * Bot Management Page
 * 
 * Interface para gerenciamento de bots Hummingbot
 * Lista bots ativos, permite iniciar/parar e visualizar status
 */

import React, { useState } from 'react';
import { useBots } from '@context/BotContext';
import styles from './BotManagement.module.css';

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
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
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
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>❌ Erro ao conectar com a API</h2>
          <p>{error}</p>
          <button onClick={fetchBots} className={styles.retryButton}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Gerenciamento de Bots</h1>
          <p className={styles.subtitle}>
            {bots.length} bot{bots.length !== 1 ? 's' : ''} encontrado{bots.length !== 1 ? 's' : ''}
            {lastUpdate && (
              <span className={styles.lastUpdate}>
                {' • Última atualização: '}
                {lastUpdate.toLocaleTimeString('pt-BR')}
              </span>
            )}
          </p>
        </div>
        <button onClick={fetchBots} className={styles.refreshButton} disabled={loading}>
          {loading ? '⏳' : '🔄'} Atualizar
        </button>
      </div>

      {/* Bot List */}
      {bots.length === 0 ? (
        <div className={styles.emptyState}>
          <p>📭 Nenhum bot encontrado</p>
          <p className={styles.emptyHint}>
            Crie um novo bot usando o Dashboard ou API
          </p>
        </div>
      ) : (
        <div className={styles.botGrid}>
          {bots.map((bot) => (
            <div
              key={bot.name || bot.id}
              className={`${styles.botCard} ${
                selectedBot?.name === bot.name ? styles.selected : ''
              }`}
              onClick={() => setSelectedBot(bot)}
            >
              {/* Bot Header */}
              <div className={styles.botHeader}>
                <h3>{bot.name || bot.id}</h3>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(bot.status) }}
                >
                  {bot.status || 'unknown'}
                </span>
              </div>

              {/* Bot Info */}
              <div className={styles.botInfo}>
                {bot.script && (
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Script:</span>
                    <span className={styles.value}>{bot.script}</span>
                  </div>
                )}
                {bot.connector && (
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Connector:</span>
                    <span className={styles.value}>{bot.connector}</span>
                  </div>
                )}
                {bot.trading_pair && (
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Par:</span>
                    <span className={styles.value}>{bot.trading_pair}</span>
                  </div>
                )}
                {bot.uptime && (
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Uptime:</span>
                    <span className={styles.value}>{bot.uptime}</span>
                  </div>
                )}
              </div>

              {/* Bot Actions */}
              <div className={styles.botActions}>
                {bot.status?.toLowerCase() !== 'running' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBotAction(bot.name, 'start');
                    }}
                    className={styles.startButton}
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
                    className={styles.stopButton}
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
        <div className={styles.detailsPanel}>
          <h2>Detalhes: {selectedBot.name}</h2>
          <pre>{JSON.stringify(selectedBot, null, 2)}</pre>
          <button onClick={() => setSelectedBot(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default BotManagement;
