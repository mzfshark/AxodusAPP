/**
 * Notification Center
 * 
 * Displays real-time notifications from MQTT
 * Toast-style notifications for bot events, orders, etc.
 */

import React from 'react';
import { useRealtime } from '@context/RealtimeContext';
import './NotificationCenter.css';

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
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <div className="container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${getClassName(notification.type)}`}
        >
          <div className="icon">{getIcon(notification.type)}</div>

          <div className="content">
            {notification.title && (
              <div className="title">{notification.title}</div>
            )}
            <div className="message">{notification.message}</div>
            {notification.details && (
              <div className="details">{notification.details}</div>
            )}
          </div>

          <button
            className="closeButton"
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
