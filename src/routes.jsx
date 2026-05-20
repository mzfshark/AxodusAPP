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
  AcademyCertifications,
  AcademyCourseDetails,
  AcademyCourses,
  AcademyDashboard,
  AcademyGovernanceEligibility,
  AcademyGovernanceReview,
  AcademyHome,
  AcademyLearningWorkspace,
  AcademyPathViewer,
  AcademyProgressEngine,
  AcademyRewards,
  AcademyTutorProfile,
} from "./modules/academy";
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
  MarketplaceListings,
  MarketplaceLegacyItem,
  MarketplaceLicenses,
  MarketplaceProductDetail,
  MarketplaceOrders,
  MarketplacePublisher,
  MarketplaceSellerProfile,
  MarketplaceSubscriptions,
  MarketplaceTreasury,
} from "./modules/marketplace";
import Dex from "./pages/Dex";
import Mcps from "./pages/Mcps";
import { DaoTenantDetail, GovernanceDashboard, GovernanceLanding, GovernanceTenants, ProposalDetail } from "./modules/governance";
import { BbaCampaigns, BbaGovernance, BbaHome, BbaPartnerships, BbaPortfolio, BbaServices } from "./modules/bba";
import {
  LotteryDashboard,
  LotteryDrawDetails,
  LotteryDrawHistory,
  LotteryDraws,
  LotteryGameModels,
  LotteryGovernance,
  LotteryPrizePools,
  LotteryRandomness,
  LotteryTickets,
} from "./modules/lottery";


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
      { path: "governance/overview", element: <GovernanceLanding /> },
      { path: "governance/tenants", element: <GovernanceTenants /> },
      { path: "governance/dao/:daoId", element: <DaoTenantDetail /> },
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
      { path: "marketplace/listings", element: <MarketplaceListings /> },
      { path: "marketplace/create", element: <MarketplaceCreateSell /> },
      { path: "marketplace/sell", element: <MarketplaceCreateSell /> },
      { path: "marketplace/products/:slug", element: <MarketplaceProductDetail /> },
      { path: "marketplace/sellers/:sellerId", element: <MarketplaceSellerProfile /> },
      { path: "marketplace/orders", element: <ProtectedRoute><MarketplaceOrders /></ProtectedRoute> },
      { path: "marketplace/subscriptions", element: <ProtectedRoute><MarketplaceSubscriptions /></ProtectedRoute> },
      { path: "marketplace/treasury", element: <ProtectedRoute><MarketplaceTreasury /></ProtectedRoute> },
      { path: "marketplace/publisher", element: <ProtectedRoute><MarketplacePublisher /></ProtectedRoute> },
      { path: "marketplace/governance", element: <MarketplaceGovernance /> },
      { path: "marketplace/licenses", element: <MarketplaceLicenses /> },
      { path: "marketplace/dashboard", element: <MarketplaceDashboard /> },
      { path: "item/:chain/:contract/:id", element: <MarketplaceLegacyItem /> },
      { path: "academy", element: <AcademyHome /> },
      { path: "academy/courses", element: <AcademyCourses /> },
      { path: "academy/courses/:courseSlug", element: <AcademyCourseDetails /> },
      { path: "academy/workspace/:courseSlug", element: <AcademyLearningWorkspace /> },
      { path: "academy/dashboard", element: <AcademyDashboard /> },
      { path: "academy/progress", element: <AcademyProgressEngine /> },
      { path: "academy/eligibility", element: <AcademyGovernanceEligibility /> },
      { path: "academy/tutors/:tutorId", element: <AcademyTutorProfile /> },
      { path: "academy/certifications", element: <AcademyCertifications /> },
      { path: "academy/rewards", element: <AcademyRewards /> },
      { path: "academy/governance-review", element: <AcademyGovernanceReview /> },
      { path: "academy/paths/:pathId", element: <AcademyPathViewer /> },
      { path: "dex", element: <Dex /> },
      { path: "lottery", element: <LotteryDashboard /> },
      { path: "lottery/draws", element: <LotteryDraws /> },
      { path: "lottery/draws/:slug", element: <LotteryDrawDetails /> },
      { path: "lottery/game-models", element: <LotteryGameModels /> },
      { path: "lottery/tickets", element: <LotteryTickets /> },
      { path: "lottery/prizes", element: <LotteryPrizePools /> },
      { path: "lottery/governance", element: <LotteryGovernance /> },
      { path: "lottery/randomness", element: <LotteryRandomness /> },
      { path: "lottery/history", element: <LotteryDrawHistory /> },
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
