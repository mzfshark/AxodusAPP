export function buildBusinessWorkbenchModel({ dashboard, summary, registry, workflows, events, selectedTenant }) {
  const tenant = selectedTenant ?? {
    displayName: 'No tenant selected',
    type: 'sandbox',
    federationTier: 'unassigned',
    governanceStatus: 'unknown',
    executionMode: 'read-only',
    roles: ['observer'],
    permissions: [],
  };

  return {
    protocolCards: [
      {
        id: 'business-protocol-purpose',
        title: 'Business Nucleus',
        value: 'tenant operations',
        detail: 'Business defines company/workspace intake, project, asset, funding, treasury and runtime visibility.',
        status: 'protocol-service',
      },
      {
        id: 'business-protocol-capabilities',
        title: 'Runtime Capabilities',
        value: String(summary.capabilitySummary?.totalCapabilities ?? 0),
        detail: `${summary.executionPolicySummary?.totalPolicies ?? 0} execution policies remain read-only in the frontend.`,
        status: 'mock-runtime',
      },
      {
        id: 'business-protocol-safety',
        title: 'Safety Validators',
        value: summary.securityValidatorStatus?.valid ? 'PASS' : 'REVIEW',
        detail: 'No treasury movement, billing, KYC, debenture issuance or ACS provisioning is enabled.',
        status: summary.securityValidatorStatus?.valid ? 'approved' : 'warning',
      },
    ],
    tenantCards: [
      {
        id: 'business-tenant-selected',
        title: 'Selected Tenant',
        value: tenant.displayName,
        detail: `${tenant.type} · ${tenant.federationTier} · ${tenant.governanceStatus}`,
        status: tenant.executionMode,
      },
      {
        id: 'business-tenant-registry',
        title: 'Registry Relationships',
        value: String(registry.data.relationshipEdges),
        detail: `${registry.data.totalProjects} projects · ${registry.data.totalAssets} assets in the read model.`,
        status: 'tenant graph',
      },
      {
        id: 'business-tenant-workflows',
        title: 'Workflow Readiness',
        value: `${workflows.data.readyWorkflows}/${workflows.data.totalWorkflows}`,
        detail: `${workflows.data.blockedWorkflows} blocked workflows · ${workflows.data.averageProgressPercent}% average progress.`,
        status: workflows.data.blockedWorkflows ? 'blocked' : 'ready',
      },
    ],
    userCards: [
      {
        id: 'business-user-role',
        title: 'User Role',
        value: tenant.roles[0] ?? 'observer',
        detail: tenant.permissions.slice(0, 3).join(', ') || 'No explicit permissions in mock tenant context.',
        status: 'mock-role',
      },
      {
        id: 'business-user-reviews',
        title: 'Assigned Reviews',
        value: String(summary.activeGovernanceReviews ?? 0),
        detail: 'Review counts are mock/runtime visibility and do not grant approval authority.',
        status: 'read-only',
      },
    ],
    operationsCards: [
      {
        id: 'business-ops-blockers',
        title: 'Blocked Workflows',
        value: String(workflows.data.blockedWorkflows),
        detail: 'Workflow blockers are operator-scoped and require review before future execution.',
        status: workflows.data.blockedWorkflows ? 'warning' : 'clear',
        executionMode: 'simulation',
      },
      {
        id: 'business-ops-events',
        title: 'Runtime Events',
        value: String(events.data.totalEvents),
        detail: `${summary.criticalTelemetryEvents ?? 0} critical telemetry events visible in the mock runtime.`,
        status: summary.criticalTelemetryEvents ? 'critical' : 'notice',
        executionMode: 'read-only',
      },
      {
        id: 'business-ops-risk',
        title: 'Risk Visibility',
        value: String((dashboard.riskIndicators ?? []).length),
        detail: 'Risk tiers are informational; no finance, debenture or treasury action is executable.',
        status: 'operator',
        executionMode: 'executable-disabled',
      },
    ],
  };
}
