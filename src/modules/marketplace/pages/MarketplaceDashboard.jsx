import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import MarketplaceBadge from '../components/MarketplaceBadge';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { getMarketplaceBoundaryReadiness } from '../services/boundaryAdapters';
import { GovernanceValidationService } from '../services/complianceServices';
import { getAcsMarketplaceSummary } from '../services/acsMarketplaceLayer';
import { getMarketplaceGovernanceRuntimeSummary } from '../services/governanceRuntime';
import { getTenantFederationDashboard } from '../services/tenantFederation';

export default function MarketplaceDashboard() {
  const marketplace = useMarketplaceData();
  const adapterReadiness = getMarketplaceBoundaryReadiness();
  const validationSummary = GovernanceValidationService.getValidationSummary();
  const governanceRuntime = getMarketplaceGovernanceRuntimeSummary();
  const federationDashboard = getTenantFederationDashboard();
  const acsSummary = getAcsMarketplaceSummary();
  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Marketplace Dashboard" description="Federated Marketplace telemetry for tenants, sellers, governance alerts, ACS visibility, royalties, and integration boundaries." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Listings" value={marketplace.metrics.activeListings} detail="Mock fixed and auction listings." />
        <MarketplaceMetricCard label="Billing review" value={marketplace.operations.billingReviewRequired} detail="Mock orders awaiting validation." />
        <MarketplaceMetricCard label="Subscription review" value={marketplace.operations.subscriptionsReviewRequired} detail="Lifecycle records needing review." />
        <MarketplaceMetricCard label="Publisher blocked" value={marketplace.operations.publisherBlocked} detail="Listing tasks with blockers." />
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Tenants" value={marketplace.metrics.tenants} detail={`${marketplace.metrics.tenantWarnings} tenant contexts need review.`} />
        <MarketplaceMetricCard label="License models" value={marketplace.metrics.licenseModels} detail="NFT, DAO and enterprise access." />
        <MarketplaceMetricCard label="Mock revenue" value={`${marketplace.metrics.mockRevenuePreview} USDC`} detail="Preview only; no settlement." />
        <MarketplaceMetricCard label="Validation gates" value={validationSummary.requiredReviewCount} detail="Governance, ACS and treasury checks." />
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="Federated tenants" value={federationDashboard.tenantCount} detail={`${federationDashboard.storefrontsInReview} storefronts in review.`} />
        <MarketplaceMetricCard label="Constitutional alerts" value={governanceRuntime.constitutionalAlerts} detail="Product or tenant alignment needs review." />
        <MarketplaceMetricCard label="Seller standing alerts" value={governanceRuntime.sanctionedSellers} detail="Seller sanctions or restricted products." />
        <MarketplaceMetricCard label="ACS packages" value={acsSummary.visiblePackages} detail={`${acsSummary.provisioningReviewRequired} provisioning reviews.`} />
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">Federation dashboard</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="bg-surface-container text-xs uppercase tracking-[0.14em] text-outline">
              <tr>
                <th className="px-4 py-3">Tenant</th>
                <th className="px-4 py-3">Federation</th>
                <th className="px-4 py-3">Standing</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Sellers</th>
                <th className="px-4 py-3">Storefront</th>
                <th className="px-4 py-3">Treasury</th>
                <th className="px-4 py-3">Review authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {federationDashboard.tenants.map((tenant) => (
                <tr key={tenant.tenantId}>
                  <td className="px-4 py-4">
                    <p className="font-bold text-on-surface">{tenant.tenantName}</p>
                    <p className="mt-1 font-mono text-xs text-outline">{tenant.isolationBoundary}</p>
                  </td>
                  <td className="px-4 py-4"><MarketplaceBadge value={tenant.federationTier} /></td>
                  <td className="px-4 py-4"><MarketplaceBadge value={tenant.governanceStanding} /></td>
                  <td className="px-4 py-4 font-mono text-xs text-outline">{tenant.metrics.productCount}</td>
                  <td className="px-4 py-4 font-mono text-xs text-outline">{tenant.metrics.sellerCount}</td>
                  <td className="px-4 py-4">
                    <MarketplaceBadge value={tenant.storefrontReadiness} />
                    <p className="mt-1 text-xs text-outline">DAO storefront: preview only</p>
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-outline">{tenant.treasuryDestination}</td>
                  <td className="px-4 py-4 text-outline">{tenant.governanceAuthority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <h2 className="text-xl font-bold text-on-surface">Governance runtime</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <RuntimeLine label="Restricted products" value={governanceRuntime.restrictedProducts} />
            <RuntimeLine label="Warning products" value={governanceRuntime.warningProducts} />
            <RuntimeLine label="Federation warnings" value={governanceRuntime.federationWarnings} />
            <RuntimeLine label="Authorities" value={governanceRuntime.governanceAuthorities.length} />
          </div>
        </article>
        <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <h2 className="text-xl font-bold text-on-surface">ACS operational metrics</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <RuntimeLine label="MCP services" value={acsSummary.mcpServices} />
            <RuntimeLine label="Runtime packages" value={acsSummary.runtimePackages} />
            <RuntimeLine label="Provisioning blocked" value={acsSummary.provisioningBlocked} />
            <RuntimeLine label="Provisioning enabled" value="No" />
          </div>
        </article>
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">Integration boundaries</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {marketplace.boundaries.map((boundary) => (
            <article key={boundary.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-on-surface">{boundary.label}</h3>
                <MarketplaceBadge value={boundary.status} />
              </div>
              <p className="mt-2 text-sm leading-5 text-outline">{boundary.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <h2 className="text-xl font-bold text-on-surface">Phase 2 adapter readiness</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-5">
          {adapterReadiness.map((boundary) => (
            <article key={boundary.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-on-surface">{boundary.label}</h3>
                <MarketplaceBadge value={boundary.status} />
              </div>
              <p className="mt-3 text-sm leading-5 text-outline">{boundary.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function RuntimeLine({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface-container p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-outline">{label}</p>
      <p className="mt-2 font-mono text-lg font-bold text-on-surface">{value}</p>
    </div>
  );
}
