/**
 * Connection Status Indicator
 * 
 * Shows real-time connection status to MQTT broker
 */

import React from 'react';
import { useRealtime } from '@context/RealtimeContext';
import styles from './ConnectionStatus.module.css';

const ConnectionStatus = () => {
  const { connected } = useRealtime();

  return (
    <div className={styles.container}>
      <div className={`${styles.indicator} ${connected ? styles.connected : styles.disconnected}`}>
        <span className={styles.dot}></span>
        <span className={styles.label}>{connected ? 'Live' : 'Offline'}</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
