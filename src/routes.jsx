import { createBrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Defi from "./pages/Defi";
import Settings from "./pages/Settings";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import Overview from "./pages/Overview";
import ConnectWalletPage from "./pages/ConnectWalletPage";
import Business from "./pages/Business";
import BotManagement from "./pages/trading/BotManagement";
import PortfolioPage from "./pages/trading/PortfolioPage";
import TradingPanel from "./pages/trading/TradingPanel";
import MarketDataPage from "./pages/trading/MarketDataPage";
import SwapPanel from "./pages/trading/SwapPanel";
import BacktestingPage from "./pages/backtesting/BacktestingPage";
import ControllerManagementPage from "./pages/controllers/ControllerManagementPage";

// Importações dos novos componentes estáticos
import Mining from "./pages/Mining";
import Marketplace from "./pages/Marketplace";
import Academy from "./pages/Academy";
import Dex from "./pages/Dex";
import Lottery from "./pages/Lottery";
import Mcps from "./pages/Mcps";
import { GovernanceDashboard, GovernanceLanding, ProposalDetail } from "./modules/governance";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "connect", element: <ConnectWalletPage /> },
      { path: "account", element: <Business /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "defi", element: <Defi /> },
      { path: "settings", element: <Settings /> },
      { path: "governance", element: <GovernanceLanding /> },
      { path: "governance/console", element: <ProtectedRoute><GovernanceDashboard /></ProtectedRoute> },
      { path: "governance/proposals/:proposalId", element: <ProtectedRoute><ProposalDetail /></ProtectedRoute> },
      { path: "dao", element: <ProtectedRoute><GovernanceDashboard /></ProtectedRoute> },
      { path: "transactions", element: <TransactionHistoryPage /> },
      { path: "trading/bots", element: <BotManagement /> },
      { path: "trading/portfolio", element: <PortfolioPage /> },
      { path: "trading/trade", element: <TradingPanel /> },
      { path: "trading/market", element: <MarketDataPage /> },
      { path: "trading/swap", element: <SwapPanel /> },
      { path: "backtesting", element: <BacktestingPage /> },
      { path: "controllers", element: <ControllerManagementPage /> },
      { path: "mining", element: <Mining /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "academy", element: <Academy /> },
      { path: "dex", element: <Dex /> },
      { path: "lottery", element: <Lottery /> },
      { path: "mcps", element: <Mcps /> },
    ],
  },

]);

export default router;
