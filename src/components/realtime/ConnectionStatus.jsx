/**
 * Connection Status Indicator
 * 
 * Shows real-time connection status to MQTT broker
 */

import React from 'react';
import { useRealtime } from '@context/RealtimeContext';
import './ConnectionStatus.css';

const ConnectionStatus = () => {
  const { connected } = useRealtime();

  return (
    <div className="container">
      <div className={`indicator ${connected ? 'connected' : 'disconnected'}`}>
        <span className="dot"></span>
        <span className="label">{connected ? 'Live' : 'Offline'}</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
