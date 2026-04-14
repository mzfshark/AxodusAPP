import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import Overview from "./pages/Overview";
import ConnectWalletPage from "./pages/ConnectWalletPage";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BotManagement from "./pages/trading/BotManagement";
import PortfolioPage from "./pages/trading/PortfolioPage";
import TradingPanel from "./pages/trading/TradingPanel";
import MarketDataPage from "./pages/trading/MarketDataPage";
import SwapPanel from "./pages/trading/SwapPanel";
import BacktestingPage from "./pages/backtesting/BacktestingPage";
import ControllerManagementPage from "./pages/controllers/ControllerManagementPage";

// Importações dos novos componentes estáticos
import Academy from "./pages/static/Academy";
import Business from "./pages/static/Business";
import Dao from "./pages/static/Dao";
import Defi from "./pages/static/Defi";
import Dex from "./pages/static/Dex";
import OverviewStatic from "./pages/static/OverviewStatic";
import Lottery from "./pages/static/Lottery";
import Marketplace from "./pages/static/Marketplace";
import Mcps from "./pages/static/Mcps";
import Mining from "./pages/static/Mining";
import TradingBots from "./pages/static/TradingBots";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "connect", element: <ConnectWalletPage /> },
      {
        path: "account",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "portfolio",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <Portfolio />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <TransactionHistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/bots",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <BotManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/portfolio",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <PortfolioPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/trade",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <TradingPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/market",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <MarketDataPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/swap",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <SwapPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "backtesting",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <BacktestingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "controllers",
        element: (
          <ProtectedRoute requiredRoles={["user"]}>
            <ControllerManagementPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Rotas Estáticas (Preview) - Sem o Layout original
  {
    path: "/static",
    children: [
      { path: "overview", element: <OverviewStatic /> },
      { path: "academy", element: <Academy /> },
      { path: "business", element: <Business /> },
      { path: "dao", element: <Dao /> },
      { path: "defi", element: <Defi /> },
      { path: "dex", element: <Dex /> },
      { path: "lottery", element: <Lottery /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "mcps", element: <Mcps /> },
      { path: "mining", element: <Mining /> },
      { path: "trading-bots", element: <TradingBots /> },
    ],
  },
]);

export default router;
