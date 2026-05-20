import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import MarketplaceMetricCard from '../components/MarketplaceMetricCard';
import { useMarketplaceData } from '../hooks/useMarketplaceData';
import { LicenseComplianceService } from '../services/complianceServices';

export default function MarketplaceLicenses() {
  const marketplace = useMarketplaceData();
  const licenseReadiness = marketplace.licenses.map((license) => LicenseComplianceService.getLicenseReadiness(license));
  const nftBoundLicenses = marketplace.licenses.filter((license) => license.nftBound).length;
  const transferableLicenses = marketplace.licenses.filter((license) => license.transferable).length;
  const reviewLicenses = licenseReadiness.filter((readiness) => readiness.status === 'review-required').length;

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="License Registry" description="NFT access, DAO, enterprise, and subscription license models prepared for future ownership validation." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MarketplaceMetricCard label="License models" value={marketplace.licenses.length} detail="Mock license registry." />
        <MarketplaceMetricCard label="NFT bound" value={nftBoundLicenses} detail="Future ownership checks." />
        <MarketplaceMetricCard label="Transferable" value={transferableLicenses} detail="Transfer preview only." />
        <MarketplaceMetricCard label="Review required" value={reviewLicenses} detail="License/product conflicts." />
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {marketplace.licenses.map((license) => {
          const readiness = licenseReadiness.find((item) => item.licenseId === license.id);
          return (
          <article key={license.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{license.ownershipModel}</p>
            <h2 className="mt-2 text-xl font-bold text-on-surface">{license.type}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <MarketplaceBadge value={license.nftBound ? 'verified' : 'deferred'} label="NFT" />
              <MarketplaceBadge value={license.governanceControlled ? 'compliant' : 'under-review'} label="Governance" />
              <MarketplaceBadge value={readiness.status} />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Info label="Transfer" value={license.transferable ? 'preview' : 'disabled'} />
              <Info label="Revocation" value={license.revokable ? 'governed' : 'disabled'} />
              <Info label="Ownership check" value={readiness.ownershipCheckEnabled ? 'enabled' : 'mock-only'} />
              <Info label="Attached products" value={readiness.attachedProducts.length} />
            </dl>
            <div className="mt-5 rounded-lg border border-white/10 bg-surface-container p-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-outline">Permissions</p>
              <ul className="mt-3 space-y-2 text-sm text-outline">
                {license.permissions.map((permission) => <li key={permission}>- {permission}</li>)}
              </ul>
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-surface-container p-3 text-sm">
              <p className="font-bold text-on-surface">{readiness.service}</p>
              <p className="mt-2 text-xs text-outline">Revocation execution: {readiness.revocationExecutionEnabled ? 'enabled' : 'disabled'}</p>
              <p className="mt-2 text-xs text-outline">Blockers: {readiness.blockers.join(', ') || 'none'}</p>
            </div>
          </article>
          );
        })}
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-surface-container p-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-outline">{label}</dt>
      <dd className="mt-1 font-semibold text-on-surface">{value}</dd>
    </div>
  );
}
