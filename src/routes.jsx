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
import {
  MiningAllocations,
  MiningGovernance,
  MiningHashTokens,
  MiningOverview,
  MiningProviderDetails,
  MiningProviders,
  MiningReports,
  MiningRisk,
  MiningTreasury,
  MiningVaults,
} from "./modules/mining";
import {
  MarketplaceCreateSell,
  MarketplaceDashboard,
  MarketplaceExplore,
  MarketplaceGovernance,
  MarketplaceHome,
  MarketplaceLegacyItem,
  MarketplaceLicenses,
  MarketplaceProductDetail,
  MarketplaceSellerProfile,
} from "./modules/marketplace";
import Academy from "./pages/Academy";
import Dex from "./pages/Dex";
import Lottery from "./pages/Lottery";
import Mcps from "./pages/Mcps";
import { GovernanceDashboard, GovernanceLanding, ProposalDetail } from "./modules/governance";
import { BbaCampaigns, BbaGovernance, BbaHome, BbaPartnerships, BbaPortfolio, BbaServices } from "./modules/bba";


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
      { path: "mining", element: <MiningOverview /> },
      { path: "mining/providers", element: <MiningProviders /> },
      { path: "mining/providers/:providerSlug", element: <MiningProviderDetails /> },
      { path: "mining/hash-tokens", element: <MiningHashTokens /> },
      { path: "mining/vaults", element: <MiningVaults /> },
      { path: "mining/allocations", element: <MiningAllocations /> },
      { path: "mining/treasury", element: <MiningTreasury /> },
      { path: "mining/risk", element: <MiningRisk /> },
      { path: "mining/governance", element: <MiningGovernance /> },
      { path: "mining/reports", element: <MiningReports /> },
      { path: "marketplace", element: <MarketplaceHome /> },
      { path: "marketplace/explore", element: <MarketplaceExplore /> },
      { path: "marketplace/create", element: <MarketplaceCreateSell /> },
      { path: "marketplace/sell", element: <MarketplaceCreateSell /> },
      { path: "marketplace/products/:slug", element: <MarketplaceProductDetail /> },
      { path: "marketplace/sellers/:sellerId", element: <MarketplaceSellerProfile /> },
      { path: "marketplace/governance", element: <MarketplaceGovernance /> },
      { path: "marketplace/licenses", element: <MarketplaceLicenses /> },
      { path: "marketplace/dashboard", element: <MarketplaceDashboard /> },
      { path: "item/:chain/:contract/:id", element: <MarketplaceLegacyItem /> },
      { path: "academy", element: <Academy /> },
      { path: "dex", element: <Dex /> },
      { path: "lottery", element: <Lottery /> },
      { path: "bba", element: <BbaHome /> },
      { path: "bba/services", element: <BbaServices /> },
      { path: "bba/portfolio", element: <BbaPortfolio /> },
      { path: "bba/campaigns", element: <BbaCampaigns /> },
      { path: "bba/partnerships", element: <BbaPartnerships /> },
      { path: "bba/governance", element: <BbaGovernance /> },
      { path: "mcps", element: <Mcps /> },
    ],
  },

]);

export default router;
