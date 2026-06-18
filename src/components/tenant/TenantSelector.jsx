import { ChevronDown } from 'lucide-react';
import { useTenantContext } from '@/runtime/tenantContext';

export default function TenantSelector({ compact = false }) {
  const { selectedTenant, selectTenant, tenants } = useTenantContext();

  return (
    <label className={`tenant-selector ${compact ? 'tenant-selector-compact' : ''}`}>
      <span className="sr-only">Selected tenant</span>
      <div className="tenant-selector-summary">
        <span className="tenant-selector-kicker">Tenant</span>
        <span className="tenant-selector-name">{selectedTenant.displayName}</span>
        {!compact ? (
          <span className="tenant-selector-meta">
            {selectedTenant.type} · {selectedTenant.federationTier} · {selectedTenant.governanceStatus}
          </span>
        ) : null}
      </div>
      <select
        value={selectedTenant.id}
        onChange={(event) => selectTenant(event.target.value)}
        className="tenant-selector-control"
        aria-label="Switch selected tenant"
      >
        {tenants.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.displayName}
          </option>
        ))}
      </select>
      <ChevronDown className="tenant-selector-icon" aria-hidden="true" />
    </label>
  );
}
