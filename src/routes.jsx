import { createBrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { DefiDashboard } from "./modules/defi";
import Settings from "./pages/Settings";
import Overview from "./pages/Overview";
import ConnectWalletPage from "./pages/ConnectWalletPage";
import Business from "./pages/Business";

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
      { path: "defi", element: <DefiDashboard /> },
      { path: "settings", element: <Settings /> },
      { path: "governance", element: <GovernanceLanding /> },
      { path: "governance/console", element: <ProtectedRoute><GovernanceDashboard /></ProtectedRoute> },
      { path: "governance/proposals/:proposalId", element: <ProtectedRoute><ProposalDetail /></ProtectedRoute> },
      { path: "dao", element: <ProtectedRoute><GovernanceDashboard /></ProtectedRoute> },
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
