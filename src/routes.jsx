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
import ProtectedRoute from "./components/ProtectedRoute";
import BotManagement from "./pages/trading/BotManagement";
import PortfolioPage from "./pages/trading/PortfolioPage";
import TradingPanel from "./pages/trading/TradingPanel";
import MarketDataPage from "./pages/trading/MarketDataPage";
import SwapPanel from "./pages/trading/SwapPanel";
import BacktestingPage from "./pages/backtesting/BacktestingPage";
import ControllerManagementPage from "./pages/controllers/ControllerManagementPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "connect", element: <ConnectWalletPage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "portfolio",
        element: (
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute>
            <TransactionHistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/bots",
        element: (
          <ProtectedRoute>
            <BotManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/portfolio",
        element: (
          <ProtectedRoute>
            <PortfolioPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/trade",
        element: (
          <ProtectedRoute>
            <TradingPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/market",
        element: (
          <ProtectedRoute>
            <MarketDataPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "trading/swap",
        element: (
          <ProtectedRoute>
            <SwapPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "backtesting",
        element: (
          <ProtectedRoute>
            <BacktestingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "controllers",
        element: (
          <ProtectedRoute>
            <ControllerManagementPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
