/**
 * Notification Center
 * 
 * Displays real-time notifications from MQTT
 * Toast-style notifications for bot events, orders, etc.
 */

import React from 'react';
import { useRealtime } from '@context/RealtimeContext';
import styles from './NotificationCenter.module.css';

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useRealtime();

  if (notifications.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'order':
        return '📊';
      case 'bot':
        return '🤖';
      default:
        return '🔔';
    }
  };

  const getClassName = (type) => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return styles.default;
    }
  };

  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.notification} ${getClassName(notification.type)}`}
        >
          <div className={styles.icon}>{getIcon(notification.type)}</div>

          <div className={styles.content}>
            {notification.title && (
              <div className={styles.title}>{notification.title}</div>
            )}
            <div className={styles.message}>{notification.message}</div>
            {notification.details && (
              <div className={styles.details}>{notification.details}</div>
            )}
          </div>

          <button
            className={styles.closeButton}
            onClick={() => dismissNotification(notification.id)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
