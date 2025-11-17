/**
 * Controller Details Component
 * 
 * Display controller configuration and actions
 */

import React from 'react';
import styles from './ControllerDetails.module.css';

const ControllerDetails = ({ controller, onEdit, onDelete, loading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>{controller.name}</h2>
          {controller.description && (
            <p className={styles.description}>{controller.description}</p>
          )}
        </div>
        <span className={styles.typeBadge}>{controller.type.toUpperCase()}</span>
      </div>

      <div className={styles.section}>
        <h3>Configuration</h3>
        <div className={styles.configGrid}>
          {controller.parameters && Object.entries(controller.parameters).map(([key, value]) => (
            <div key={key} className={styles.configItem}>
              <span className={styles.configLabel}>
                {key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}:
              </span>
              <span className={styles.configValue}>
                {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.editButton} disabled={loading}>
          ✏️ Edit Configuration
        </button>
        <button onClick={onDelete} className={styles.deleteButton} disabled={loading}>
          🗑️ Delete Controller
        </button>
      </div>
    </div>
  );
};

export default ControllerDetails;
