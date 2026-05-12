# Axodus Documentation - Phase 3 Implementation

## Real-time Updates System (Fase 3)

### Overview
Complete WebSocket/MQTT integration for live data streaming across all trading components.

### Architecture

```
EMQX Broker (Port 8083/WebSocket)
    ↓
MQTTClient (Singleton)
    ↓
RealtimeContext (Provider)
    ↓
Components (Subscribers)
```

### Components Created

#### 1. **MQTTClient** (`src/services/websocket/mqttClient.js`)
Singleton WebSocket client for EMQX broker connection.

**Features:**
- Auto-reconnect with exponential backoff
- Topic subscription management with wildcard support
- Pub/Sub pattern implementation
- Connection state monitoring
- Message parsing and routing

**Configuration:**
```env
VITE_MQTT_HOST=localhost
VITE_MQTT_PORT=8083
VITE_MQTT_USERNAME=admin
VITE_MQTT_PASSWORD=public
```

**Topic Convention:**
```
hummingbot/bots/{bot_id}/status      - Bot status updates
hummingbot/bots/{bot_id}/orders      - Order execution events
hummingbot/portfolio/balances        - Portfolio balance updates
hummingbot/market/{exchange}/{pair}  - Market data streams
hummingbot/notifications             - System notifications
```

#### 2. **RealtimeContext** (`src/context/RealtimeContext.jsx`)
React Context provider for real-time data subscriptions.

**Hooks Provided:**
```javascript
const {
  connected,                    // Connection status
  botUpdates,                   // { [botId]: update }
  subscribeToBotStatus,         // Subscribe to bot status
  subscribeToBotOrders,         // Subscribe to bot orders
  portfolioUpdate,              // Latest portfolio data
  subscribeToPortfolio,         // Subscribe to portfolio
  orderExecutions,              // Order execution log
  subscribeToMarketData,        // Subscribe to market data
  notifications,                // System notifications
  dismissNotification,          // Dismiss notification
  publishCommand,               // Publish command to broker
} = useRealtime();
```

#### 3. **NotificationCenter** (`src/components/notifications/NotificationCenter.jsx`)
Toast-style notification system for real-time events.

**Features:**
- Auto-dismiss after 5 seconds
- Multiple notification types (success, error, warning, info, order, bot)
- Slide-in animation
- Manual dismiss
- Color-coded by type

#### 4. **ConnectionStatus** (`src/components/realtime/ConnectionStatus.jsx`)
Visual indicator for MQTT connection status.

**States:**
- 🟢 **Live** - Connected with pulsing animation
- 🔴 **Offline** - Disconnected

#### 5. **BotManagementRealtime** (`src/pages/trading/BotManagementRealtime.jsx`)
Enhanced bot management with live status updates.

**Features:**
- Real-time bot status streaming
- Live order execution notifications
- Performance metrics updates
- Last update timestamp
- Auto-merge with API data

#### 6. **OrderBookWidgetRealtime** (`src/components/trading/OrderBookWidgetRealtime.jsx`)
Live order book with WebSocket streaming.

**Features:**
- Real-time bid/ask updates
- Price depth visualization
- Spread calculation
- Live badge indicator

### Integration Points

#### App.jsx
```jsx
<RealtimeProvider>
  <BotProvider>
    <RouterProvider router={router} />
    <NotificationCenter />
  </BotProvider>
</RealtimeProvider>
```

#### PortfolioPage.jsx
```javascript
const { subscribeToPortfolio, portfolioUpdate } = useRealtime();

useEffect(() => {
  const unsubscribe = subscribeToPortfolio();
  return () => unsubscribe?.();
}, []);

useEffect(() => {
  if (portfolioUpdate?.data) {
    setPortfolioState(portfolioUpdate.data);
  }
}, [portfolioUpdate]);
```

#### BotManagement.jsx
```javascript
const { subscribeToBotStatus, subscribeToBotOrders, botUpdates } = useRealtime();

useEffect(() => {
  const unsubscribers = bots.map(bot => 
    subscribeToBotStatus(bot.id)
  );
  return () => unsubscribers.forEach(unsub => unsub?.());
}, [bots]);
```

### Message Format

**Bot Status Update:**
```json
{
  "bot_id": "pmm_bot_1",
  "status": "running",
  "performance": {
    "pnl": "2.34",
    "trades": 145,
    "volume": "10234.56"
  },
  "timestamp": "2025-11-17T10:30:00Z"
}
```

**Order Execution:**
```json
{
  "type": "order",
  "bot_id": "pmm_bot_1",
  "order_id": "abc123",
  "side": "buy",
  "price": 50000,
  "amount": 0.01,
  "status": "filled",
  "timestamp": "2025-11-17T10:30:00Z"
}
```

**Portfolio Update:**
```json
{
  "type": "portfolio",
  "data": {
    "total_value": 10000,
    "exchanges": {
      "binance": { "USDT": 5000, "BTC": 0.1 },
      "okx": { "USDT": 5000 }
    }
  },
  "timestamp": "2025-11-17T10:30:00Z"
}
```

**Notification:**
```json
{
  "type": "success",
  "title": "Order Filled",
  "message": "Buy order for 0.01 BTC filled at $50,000",
  "details": "Order ID: abc123",
  "timestamp": "2025-11-17T10:30:00Z"
}
```

### Backend MQTT Publishing (Example)

To enable real-time updates, the Hummingbot API needs to publish to these topics:

```python
# In hummingbot-api/services/mqtt_publisher.py
import paho.mqtt.client as mqtt

mqtt_client = mqtt.Client()
mqtt_client.connect("localhost", 1883)

# Publish bot status
mqtt_client.publish(
    f"hummingbot/bots/{bot_id}/status",
    json.dumps({
        "bot_id": bot_id,
        "status": "running",
        "performance": {...}
    })
)

# Publish order execution
mqtt_client.publish(
    f"hummingbot/bots/{bot_id}/orders",
    json.dumps({
        "type": "order",
        "order_id": order_id,
        "side": "buy",
        ...
    })
)
```

### Testing

#### Test MQTT Connection
```bash
# Subscribe to all topics
mosquitto_sub -h localhost -p 1883 -u admin -P public -t "hummingbot/#" -v

# Publish test message
mosquitto_pub -h localhost -p 1883 -u admin -P public \
  -t "hummingbot/notifications" \
  -m '{"type":"info","message":"Test notification"}'
```

#### Frontend Testing
```javascript
// In browser console
const { publishCommand } = useRealtime();

publishCommand('hummingbot/notifications', {
  type: 'success',
  title: 'Test',
  message: 'This is a test notification'
});
```

### Performance Considerations

- **Connection pooling**: Single MQTT client instance shared across app
- **Subscription cleanup**: Unsubscribe on component unmount
- **Message throttling**: Consider debouncing high-frequency updates
- **Reconnection**: Automatic reconnect with max 10 attempts
- **QoS level**: Using QoS 1 (at least once delivery)

### Next Steps (Phase 4)

1. **Advanced Features:**
   - Backtesting UI with real-time progress
   - Controller management interface
   - Strategy configuration wizard
   - Performance analytics dashboard

2. **Backend Integration:**
   - Implement MQTT publisher in Hummingbot API
   - Add WebSocket endpoints for historical data
   - Create bot event emitters

3. **Testing & Documentation:**
   - Unit tests for MQTT client
   - Integration tests for real-time context
   - E2E tests for bot management
   - API documentation updates

### Troubleshooting

**Connection Issues:**
```bash
# Check EMQX is running
docker ps | grep emqx

# View EMQX dashboard
http://localhost:18083
# Username: admin, Password: public

# Check WebSocket port
netstat -an | grep 8083
```

**Subscription Not Working:**
- Verify topic naming convention
- Check MQTT credentials in .env
- Ensure EMQX ACL allows subscription
- Monitor browser console for errors

**High Latency:**
- Check network between frontend and EMQX
- Verify MQTT keepalive settings
- Consider increasing reconnectPeriod
- Monitor EMQX broker metrics
