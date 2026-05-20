
# Axodus Dashboard

Axodus is a comprehensive cryptocurrency trading platform that integrates with Hummingbot API for automated trading strategies. The platform provides portfolio management, real-time market data, trading operations, backtesting, and controller management in a unified interface.

## Features

### Core Features
- **Wallet Integration**: Connect MetaMask or WalletConnect to view crypto assets and portfolio
- **Hummingbot Integration**: Complete API integration for bot management and trading
- **Real-Time Updates**: MQTT/WebSocket integration for live data streaming
- **Portfolio Management**: Multi-exchange portfolio tracking and analysis
- **Market Data**: Real-time prices, order books, and market depth
- **Trading Operations**: Spot trading, market making, and token swaps

### Advanced Features (Phase 4)
- **Backtesting System**: Test trading strategies with historical data
  - Comprehensive metrics (Sharpe ratio, drawdown, win rate, profit factor)
  - Capital curve visualization
  - Trade analysis and performance reports
- **Controller Management**: CRUD interface for trading controllers
  - Pre-configured templates (PMM, Grid, DCA, Directional, Arbitrage)
  - Parameter validation and configuration
  - Real-time status monitoring
- **Strategy Development**: Complete workflow from creation to deployment

### Additional Capabilities
- **Multi-Device Support**: Fully responsive design for all devices
- **Interactive Dashboard**: Real-time charts, tooltips, and dynamic visualizations
- **Transaction History**: Detailed transaction tracking across exchanges

## Installation

Follow these steps to run the Axodus app locally:

### 1. Clone the Repository

```bash
git clone https://github.com/mzfshark/axodus.git
cd axodus
```

### 2. Install Dependencies

Ensure you have **Node.js** and **npm** installed. Then, run the following command to install project dependencies:

```bash
npm install
```

### 3. Start the Development Server

Start the development server to see the app in action:

```bash
npm start
```

By default, the app should be available at `http://localhost:3000`.

## Technologies Used

### Frontend
- **React 19.1.0**: Modern JavaScript library for building user interfaces
- **Vite 6.2.0**: Next-generation frontend build tool
- **Recharts 2.15.3**: Composable charting library for data visualization
- **Axios 1.8.4**: Promise-based HTTP client for API requests
- **MQTT.js**: WebSocket client for real-time data streaming

### Wallet Integration
- **MetaMask**: Browser extension for Ethereum-based assets
- **WalletConnect**: Protocol for mobile wallet connections
- **ethers.js / web3.js**: Blockchain interaction libraries

### State Management
- **React Context API**: Global state management
- **Custom Hooks**: Reusable logic for bots, trading, and real-time updates

### Real-Time System
- **EMQX Broker**: MQTT message broker (WebSocket port 8083)
- **MQTTClient**: Singleton client with pub/sub pattern
- **RealtimeContext**: React context for real-time data distribution

### Backend Integration
- **Hummingbot API**: FastAPI-based trading bot management
- **PostgreSQL 16**: Relational database for bot configurations
- **MongoDB**: Document database for market data
- **Gateway**: Node.js gateway for DEX trading

## Available Routes

### Main Routes
- `/` - Landing page
- `/connect` - Wallet connection
- `/dashboard` - Main dashboard
- `/portfolio` - Portfolio overview
- `/settings` - User settings
- `/transactions` - Transaction history

### Trading Operations
- `/trading/bots` - Bot management
- `/trading/portfolio` - Trading portfolio view
- `/trading/trade` - Spot trading panel
- `/trading/market` - Market data and order books
- `/trading/swap` - Token swap interface

### Advanced Features (Phase 4)
- `/backtesting` - Strategy backtesting interface
- `/controllers` - Controller management

### Mining Nucleus Integration

AxodusAPP exposes Mining as the official unified frontend surface while the standalone Mining workspace remains the mock-first domain/API service.

Development flow:

```bash
cd /mnt/d/Rede/Github/Axodus/Mining
pnpm dev
```

The Mining API should be available at `http://localhost:8787`.

```bash
cd /mnt/d/Rede/Github/Axodus/AxodusAPP
pnpm dev
```

AxodusAPP runs on `http://localhost:5174` by default and reads `VITE_MINING_API_URL=http://localhost:8787`.

Required env:

```bash
VITE_MINING_API_URL=http://localhost:8787
VITE_MINING_USE_MOCKS=false
```

Contract:
- Mining API responses use the v1 envelope: `{ data, meta, errors }`.
- `meta.source` is `mining-api`, `meta.version` is `v1`, `meta.mock` is `true`, and `meta.generatedAt` is an ISO timestamp.
- AxodusAPP reads Mining through `src/modules/mining/services/miningServiceAdapter.js`; pages should not depend on raw API envelopes.
- The local fallback is intentionally minimal and only supports safe offline visibility.

Verification:
- Open `/mining` to confirm the unified Mining overview loads from the Mining API.
- Open `/mining/providers/luxor` to confirm provider detail data resolves through the backend.
- Stop the Mining backend, or set `VITE_MINING_USE_MOCKS=true`, to verify the explicit fallback banner: `Using local mock fallback — Mining API unavailable.`
- Keep Mining read-only in this phase: no wallet claims, minting, staking, treasury movement, provider execution, or smart contract execution.

Troubleshooting:
- Healthcheck: `curl http://localhost:8787/health`
- Summary contract: `curl http://localhost:8787/api/mining/summary`
- CORS must allow AxodusAPP local origin `http://localhost:5174`; add extra origins in Mining with `MINING_CORS_ORIGINS` when needed.
- If the UI shows fallback, confirm the Mining backend is running before debugging frontend routes.

### ACS Operational Intelligence Integration

AxodusAPP exposes ACS as the governance-aware operational visibility interface while the ACS workspace remains the authoritative inspection backend.

Development flow:

```bash
cd /mnt/d/Rede/Github/Axodus/ACS
npm run http
```

The ACS inspection API should be available at `http://localhost:8788/acs`.

```bash
cd /mnt/d/Rede/Github/Axodus/AxodusAPP
pnpm dev
```

AxodusAPP reads `VITE_ACS_API_URL=http://localhost:8788`.

Initial routes:
- `/acs`
- `/acs/capabilities`
- `/acs/services`
- `/acs/products`
- `/acs/policy`
- `/acs/status`
- `/acs/readiness`

Verification:
- Open `/acs/capabilities` to confirm Core, Service, and Product capabilities render from ACS.
- Open `/acs/products` to confirm `product.trading-ignition` appears as one ACS Product Capability.
- Stop the ACS backend, or set `VITE_ACS_USE_MOCKS=true`, to verify the explicit fallback banner: `Using ACS mock fallback`.
- Keep ACS read-only in this phase: no automation, trading execution, CEX calls, API secrets, tenant state mutation, or license mutation.

## Wallet Integration

### MetaMask
Browser extension for managing Ethereum-based assets and interacting with decentralized applications.

### WalletConnect
Open-source protocol connecting decentralized applications to mobile wallets for secure authentication.

## Project Structure

```
/src
  /components                  # React components
    /common                    # Shared components (MetricCard, ConnectionStatus)
    /backtesting               # Backtesting UI components
    /controllers               # Controller management components
    /bots                      # Bot management components
    /trading                   # Trading operation components
    /realtime                  # Real-time data components
  /pages                       # Page components
    /backtesting               # Backtesting interface
    /controllers               # Controller management
    /trading                   # Trading operations
      /bots                    # Bot management page
      /portfolio               # Portfolio overview
      /trade                   # Trading panel
      /market                  # Market data
      /swap                    # Token swap
  /services                    # API and service layer
    /api                       # API clients
      hummingbotClient.js      # Main API client
      backtestingService.js    # Backtesting operations
      controllerService.js     # Controller management
    /websocket                 # WebSocket services
      mqttClient.js            # MQTT singleton client
  /context                     # React Context providers
    BotContext.jsx             # Bot state management
    RealtimeContext.jsx        # Real-time data distribution
  /hooks                       # Custom React hooks
  /utils                       # Utility functions
  /assets                      # Static assets
  /styles                      # Global CSS
  App.jsx                      # Main app component
  routes.jsx                   # Route definitions
  main.jsx                     # Entry point
```

## Contributing

We welcome contributions to improve Axodus! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

### Steps to Contribute:

1. Fork the repository
2. Create a new branch for your feature or fix
3. Commit your changes
4. Push your changes to your fork
5. Open a pull request

Please ensure your code follows the project's code style and that all tests pass.

## Documentation

### Phase Documentation
- **[Phase 3: Real-Time Updates](./PHASE3_DOCUMENTATION.md)** - MQTT integration and WebSocket system
- **[Phase 4: Advanced Features](./PHASE4_DOCUMENTATION.md)** - Backtesting and controller management

### Related Projects
- **[Hummingbot API](../hummingbot-api/README.md)** - Backend API documentation
- **[Gateway](../gateway/README.md)** - DEX trading gateway
- **[MCP Hummingbot](../mcp-hummingbot/README.md)** - Model Context Protocol server

### External Resources
- [Hummingbot Official Docs](https://docs.hummingbot.org)
- [EMQX Documentation](https://www.emqx.io/docs)
- [React Documentation](https://react.dev)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Axodus** - Empowering investors with data-driven decisions.  
For more information, visit [Axodus Finance](https://docs.axodus.finance/).
