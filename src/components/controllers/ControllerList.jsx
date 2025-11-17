/**
 * Controller List Component
 * 
 * List of available controllers
 */

import React from 'react';
import styles from './ControllerList.module.css';

const ControllerList = ({ controllers, selectedController, onSelect, onRefresh }) => {
  const getTypeBadge = (type) => {
    const typeMap = {
      pmm: { label: 'PMM', color: '#4ecdc4' },
      directional: { label: 'Directional', color: '#ff9f43' },
      dca: { label: 'DCA', color: '#4caf50' },
      grid: { label: 'Grid', color: '#9b59b6' },
      arbitrage: { label: 'Arbitrage', color: '#e74c3c' },
    };

    const config = typeMap[type] || { label: type, color: '#666' };
    return (
      <span className={styles.typeBadge} style={{ borderColor: config.color, color: config.color }}>
        {config.label}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Controllers</h3>
        <button onClick={onRefresh} className={styles.refreshButton}>
          🔄
        </button>
      </div>

      {controllers.length === 0 ? (
        <div className={styles.empty}>No controllers</div>
      ) : (
        <div className={styles.list}>
          {controllers.map((controller) => (
            <div
              key={controller.name}
              className={`${styles.item} ${
                selectedController?.name === controller.name ? styles.itemSelected : ''
              }`}
              onClick={() => onSelect(controller)}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{controller.name}</span>
                {getTypeBadge(controller.type)}
              </div>
              
              {controller.description && (
                <p className={styles.itemDescription}>{controller.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ControllerList;
