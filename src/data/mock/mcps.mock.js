export const mcpsMock = {
  summary: { totalMcpServices: 7, activeMcpServices: 4, disabledMcpServices: 1, pendingValidation: 2, governanceControlled: true },
  services: [
    { id: 'mcp-service-001', name: 'Governance Registry Reader', category: 'Governance', status: 'active', owner: 'Axodus Core', accessLevel: 'read', requiredLicense: 'none', governanceApproved: true, description: 'Reads DAO and proposal registry data.' },
    { id: 'mcp-service-002', name: 'Business Intake Parser', category: 'Business', status: 'pending-validation', owner: 'Business Ops', accessLevel: 'review', requiredLicense: 'Business operator', governanceApproved: false, description: 'Processes enterprise intake metadata.' },
    { id: 'mcp-service-003', name: 'Trading Legacy Observer', category: 'Trading', status: 'disabled', owner: 'Legacy', accessLevel: 'none', requiredLicense: 'disabled', governanceApproved: false, description: 'Disabled placeholder; no Hummingbot runtime dependency.' },
    { id: 'mcp-service-004', name: 'Academy Course Validator', category: 'Academy', status: 'active', owner: 'Academy', accessLevel: 'review', requiredLicense: 'Tutor license', governanceApproved: true, description: 'Validates course metadata.' },
    { id: 'mcp-service-005', name: 'Treasury Data Snapshot', category: 'Data', status: 'active', owner: 'Defi', accessLevel: 'read', requiredLicense: 'none', governanceApproved: true, description: 'Creates mock treasury snapshots.' },
    { id: 'mcp-service-006', name: 'Automation Queue Monitor', category: 'Automation', status: 'pending-validation', owner: 'ACS', accessLevel: 'read', requiredLicense: 'ACS operator', governanceApproved: false, description: 'Observes workflow queue health.' },
    { id: 'mcp-service-007', name: 'Security Guard Reporter', category: 'Security', status: 'active', owner: 'Risk', accessLevel: 'read', requiredLicense: 'none', governanceApproved: true, description: 'Reports guardrail and risk indicators.' },
  ],
};
