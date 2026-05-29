import { CardShell } from '@/components/ui';
import { getTenantEnabledModules } from '@/runtime/moduleRegistry/moduleRegistry';
import { useTenantContext } from '@/runtime/tenantContext';

export default function TenantIdentityPanel({ moduleId, className = '' }) {
  const { getModuleState, selectedTenant } = useTenantContext();
  const moduleState = moduleId ? getModuleState(moduleId) : null;
  const enabledModules = getTenantEnabledModules(selectedTenant);

  return (
    <CardShell
      title={selectedTenant.displayName}
      subtitle={`${selectedTenant.type} tenant on ${selectedTenant.primaryChain}`}
      scope="tenant"
      maturity={selectedTenant.maturity}
      executionMode={selectedTenant.executionMode}
      status={selectedTenant.governanceStatus}
      className={className}
    >
      <div className="tenant-identity-grid">
        <Info label="Federation" value={selectedTenant.federationTier} />
        <Info label="ACS state" value={selectedTenant.acsState} />
        <Info label="Treasury mode" value={selectedTenant.treasuryMode} />
        <Info label="Risk" value={selectedTenant.riskState} />
      </div>

      {moduleState ? (
        <div className={`tenant-module-state ${moduleState.enabled ? 'is-enabled' : 'is-blocked'}`}>
          <span>{moduleId}</span>
          <strong>{moduleState.enabled ? 'enabled for tenant' : moduleState.reason}</strong>
        </div>
      ) : null}

      <div className="tenant-identity-section">
        <p className="tenant-identity-label">Roles</p>
        <div className="tenant-chip-row">
          {selectedTenant.roles.map((role) => <span key={role} className="ax-meta-chip">{role}</span>)}
        </div>
      </div>

      <div className="tenant-identity-section">
        <p className="tenant-identity-label">Enabled modules</p>
        <div className="tenant-chip-row">
          {enabledModules.map((module) => <span key={module.id} className="ax-meta-chip">{module.name}</span>)}
        </div>
      </div>

      {selectedTenant.restrictions.length ? (
        <div className="tenant-restrictions">
          <p className="tenant-identity-label">Restrictions</p>
          <ul>
            {selectedTenant.restrictions.map((restriction) => <li key={restriction}>{restriction}</li>)}
          </ul>
        </div>
      ) : null}
    </CardShell>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
