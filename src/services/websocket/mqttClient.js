/**
 * MQTT Client for Real-time Updates
 * 
 * Connects to EMQX broker for live data streaming:
 * - Bot status updates
 * - Portfolio balance changes
 * - Order execution notifications
 * - Market data streams
 */

import mqtt from 'mqtt';

class MQTTClient {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscriptions = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this._refCount = 0;
    this._disconnectTimer = null;
  }

  /**
   * Connect to EMQX broker
   */
  connect(options = {}) {
    // Reference-counted connect to tolerate React StrictMode double-mount
    this._refCount = Math.max(this._refCount, 0) + 1;
    // If there is a pending delayed disconnect, cancel it
    if (this._disconnectTimer) {
      clearTimeout(this._disconnectTimer);
      this._disconnectTimer = null;
    }
    if (this.client) {
      // Already initialized; avoid creating a second connection
      return this;
    }
    const {
      host = import.meta.env.VITE_MQTT_HOST || 'localhost',
      port = import.meta.env.VITE_MQTT_PORT || 1883,
      protocol = 'ws',
      username = import.meta.env.VITE_MQTT_USERNAME || 'admin',
      password = import.meta.env.VITE_MQTT_PASSWORD || 'public',
    } = options;

    const brokerUrl = `${protocol}://${host}:${port}/mqtt`;

    console.log('[MQTT] Connecting to:', brokerUrl);

    this.client = mqtt.connect(brokerUrl, {
      username,
      password,
      clientId: `axodus_${Math.random().toString(16).slice(3)}`,
      clean: true,
      reconnectPeriod: 5000,
      connectTimeout: 30000,
      keepalive: 60,
    });

    this.client.on('connect', () => {
      console.log('[MQTT] Connected successfully');
      this.connected = true;
      this.reconnectAttempts = 0;

      // Resubscribe to all topics
      this.subscriptions.forEach((callbacks, topic) => {
        this.client.subscribe(topic, { qos: 1 });
      });
    });

    this.client.on('error', (error) => {
      console.error('[MQTT] Connection error:', error);
      this.connected = false;
    });

    this.client.on('close', () => {
      console.log('[MQTT] Connection closed');
      this.connected = false;
    });

    this.client.on('reconnect', () => {
      this.reconnectAttempts++;
      console.log(`[MQTT] Reconnecting... (attempt ${this.reconnectAttempts})`);

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('[MQTT] Max reconnect attempts reached');
        this.disconnect();
      }
    });

    this.client.on('message', (topic, message) => {
      this.handleMessage(topic, message);
    });

    return this;
  }

  /**
   * Handle incoming messages
   */
  handleMessage(topic, message) {
    try {
      const payload = JSON.parse(message.toString());
      console.log('[MQTT] Message received:', { topic, payload });

      // Call all registered callbacks for this topic
      const callbacks = this.subscriptions.get(topic);
      if (callbacks) {
        callbacks.forEach((callback) => callback(payload));
      }

      // Handle wildcard subscriptions
      this.subscriptions.forEach((callbacks, subscribedTopic) => {
        if (this.matchTopic(topic, subscribedTopic)) {
          callbacks.forEach((callback) => callback(payload));
        }
      });
    } catch (error) {
      console.error('[MQTT] Error parsing message:', error);
    }
  }

  /**
   * Match topic with wildcard support
   */
  matchTopic(topic, pattern) {
    if (topic === pattern) return true;

    const topicParts = topic.split('/');
    const patternParts = pattern.split('/');

    if (patternParts.length > topicParts.length) return false;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i] === '#') return true;
      if (patternParts[i] === '+') continue;
      if (patternParts[i] !== topicParts[i]) return false;
    }

    return patternParts.length === topicParts.length;
  }

  /**
   * Subscribe to a topic
   */
  subscribe(topic, callback) {
    if (!this.client) {
      console.error('[MQTT] Client not initialized');
      return null;
    }

    if (!this.subscriptions.has(topic)) {
      console.log('[MQTT] Subscribing to:', topic);
      this.subscriptions.set(topic, new Set());
      
      if (this.connected) {
        this.client.subscribe(topic, { qos: 1 }, (error) => {
          if (error) {
            console.error('[MQTT] Subscribe error:', error);
          }
        });
      }
    }

    this.subscriptions.get(topic).add(callback);

    // Return unsubscribe function
    return () => this.unsubscribe(topic, callback);
  }

  /**
   * Unsubscribe from a topic
   */
  unsubscribe(topic, callback) {
    const callbacks = this.subscriptions.get(topic);
    if (callbacks) {
      callbacks.delete(callback);

      if (callbacks.size === 0) {
        this.subscriptions.delete(topic);
        if (this.connected) {
          this.client.unsubscribe(topic);
        }
      }
    }
  }

  /**
   * Publish a message
   */
  publish(topic, message, options = {}) {
    if (!this.client || !this.connected) {
      console.error('[MQTT] Cannot publish - not connected');
      return Promise.reject(new Error('Not connected'));
    }

    const payload = typeof message === 'string' ? message : JSON.stringify(message);

    return new Promise((resolve, reject) => {
      this.client.publish(topic, payload, { qos: 1, ...options }, (error) => {
        if (error) {
          console.error('[MQTT] Publish error:', error);
          reject(error);
        } else {
          console.log('[MQTT] Published to:', topic);
          resolve();
        }
      });
    });
  }

  /**
   * Disconnect from broker
   */
  disconnect() {
    // Decrease reference; only actually disconnect when no more users
    this._refCount = Math.max(0, this._refCount - 1);
    if (this.client && this._refCount === 0) {
      // Delay actual disconnect slightly to avoid StrictMode double-unmount churn
      if (this._disconnectTimer) clearTimeout(this._disconnectTimer);
      this._disconnectTimer = setTimeout(() => {
        // If no one reconnected in the meantime
        if (this._refCount === 0 && this.client) {
          console.log('[MQTT] Disconnecting...');
          this.client.end(true);
          this.client = null;
          this.connected = false;
        }
        this._disconnectTimer = null;
      }, 1500);
    }
  }

  /**
   * Check connection status
   */
  isConnected() {
    return this.connected;
  }
}

// Singleton instance
const mqttClient = new MQTTClient();

export default mqttClient;

/**
 * Topic naming conventions:
 * 
 * - hummingbot/bots/{bot_id}/status - Bot status updates
 * - hummingbot/bots/{bot_id}/orders - Order execution events
 * - hummingbot/portfolio/balances - Portfolio balance updates
 * - hummingbot/market/{exchange}/{pair} - Market data streams
 * - hummingbot/notifications - System notifications
 */
