import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, test } from 'vitest';
import { appShellNav } from '../../src/config/appShell';
import {
  BusinessAssets,
  BusinessAssetDetail,
  BusinessACSReadiness,
  BusinessAccess,
  BusinessEvents,
  BusinessFinance,
  BusinessIntakePage,
  BusinessGovernanceReadiness,
  BusinessOverview,
  BusinessProjects,
  BusinessProjectDetail,
  BusinessRegistry,
  BusinessRuntime,
  BusinessState,
  BusinessTelemetry,
  BusinessTreasury,
  BusinessWorkflows,
  businessRuntimeClient,
  businessRuntimeSafety
} from '../../src/modules/business';

function renderBusinessRoute(initialEntry, route, element) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0
      }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path={route} element={element} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

afterEach(() => {
  cleanup();
});

describe('AxodusAPP Business routes', () => {
  test('registers Business as a /business shell nucleus', () => {
    const businessEntry = appShellNav.primary.find((item) => item.id === 'business');

    expect(businessEntry).toMatchObject({
      label: 'Business',
      routeBase: '/business',
      summary: 'Operational infrastructure, funding visibility and ACS runtime coordination'
    });
    expect(businessEntry.sections.map((section) => section.to)).toEqual(expect.arrayContaining([
      '/business',
      '/business/intake',
      '/business/projects',
      '/business/assets',
      '/business/registry',
      '/business/workflows',
      '/business/events',
      '/business/governance',
      '/business/finance',
      '/business/acs/readiness',
      '/business/access',
      '/business/runtime'
    ]));
  });

  test('renders Business overview with cards and safety language', async () => {
    renderBusinessRoute('/business', '/business', <BusinessOverview />);

    expect(await screen.findByRole('heading', { name: /Business Runtime/i })).toBeInTheDocument();
    expect(screen.getAllByText(/mock\/read-only/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Treasury Exposure/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Debenture Status/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ACS Runtime/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Telemetry Summary/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Blocked Workflows/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Registry Edges/i)).toBeInTheDocument();
  });

  test('renders Business intake overview with general draft form and preview', async () => {
    renderBusinessRoute('/business/intake', '/business/intake', <BusinessIntakePage />);

    expect(await screen.findByRole('heading', { name: /Business Intake/i })).toBeInTheDocument();
    expect(screen.getByText(/Ecosystem Infrastructure Request Draft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Request title/i)).toBeInTheDocument();
    expect(screen.getByText(/Preview Request/i)).toBeInTheDocument();
    expect(screen.getByText(/Capability And Permission Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Execution Policy/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Mock \/ Read-only|mock\/read-only/i).length).toBeGreaterThan(0);
  });

  test('renders specialized intake draft forms', async () => {
    renderBusinessRoute('/business/intake/dao-plugin', '/business/intake/dao-plugin', <BusinessIntakePage />);
    expect(await screen.findByText(/DAO Plugin Request Draft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plugin type/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/HIP \/ RP voting/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/intake/acs-service', '/business/intake/acs-service', <BusinessIntakePage />);
    expect(await screen.findByText(/ACS Service Request Draft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Isolation profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Human review requirement/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/intake/treasury-sponsorship', '/business/intake/treasury-sponsorship', <BusinessIntakePage />);
    expect(await screen.findByText(/Treasury Sponsorship Request Draft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Requested amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Governance reference/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/intake/debenture-funding', '/business/intake/debenture-funding', <BusinessIntakePage />);
    expect(await screen.findByText(/Debenture Funding Request Draft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Debenture type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Convertible flag/i)).toBeInTheDocument();
  });

  test('validates draft locally and keeps dangerous actions absent', async () => {
    renderBusinessRoute('/business/intake/new', '/business/intake/new', <BusinessIntakePage />);

    expect(await screen.findByText(/General Business Request Draft/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Request title/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /Validate Structure/i }));

    expect(screen.getByText(/Missing required field: title/i)).toBeInTheDocument();
    expect(screen.getByText(/CREATE_BUSINESS_REQUEST/i)).toBeInTheDocument();
    expect(screen.getAllByText(/PREPARE_ONLY/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /submit to dao|issue debenture|move treasury|deploy acs|create contract|buy|invest now/i })).not.toBeInTheDocument();
  });

  test('stores drafts locally and renders preview by draft id', async () => {
    businessRuntimeClient.resetDraftStore();
    const draft = businessRuntimeClient.createDraftTemplate('GENERAL_BUSINESS_REQUEST');
    draft.values = {
      title: 'Stored intake draft',
      description: 'Prepare request structure only',
      requesterIdentity: 'id-axodus-core',
      requestCategory: 'ENTERPRISE_DEVELOPMENT',
      fundingModel: 'HYBRID'
    };
    const record = businessRuntimeClient.createDraftStoreRecord(draft);

    expect(businessRuntimeClient.listDraftStoreRecords()).toHaveLength(1);
    expect(businessRuntimeClient.getDraftPreviewById(record.id).summary.items[0].value).toBe('GENERAL_BUSINESS_REQUEST');
    expect(businessRuntimeClient.validateDraftById(record.id).valid).toBe(true);

    renderBusinessRoute('/business/intake/drafts', '/business/intake/drafts', <BusinessIntakePage />);
    expect(await screen.findByRole('heading', { name: /Business Drafts/i })).toBeInTheDocument();
    expect(screen.getByText(/Stored intake draft/i)).toBeInTheDocument();
    expect(screen.getByText(record.id)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute(`/business/intake/preview/${record.id}`, '/business/intake/preview/:draftId', <BusinessIntakePage />);
    expect(await screen.findByRole('heading', { name: /Business Intake/i })).toBeInTheDocument();
    expect(screen.getByText(/Stored as/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /submit to dao|issue debenture|move treasury|deploy acs|create contract|buy|invest now/i })).not.toBeInTheDocument();

    expect(businessRuntimeClient.deleteDraftStoreRecord(record.id)).toBe(true);
    expect(businessRuntimeClient.listDraftStoreRecords()).toHaveLength(0);
  });

  test('renders project and asset tables from isolated runtime client', async () => {
    renderBusinessRoute('/business/projects', '/business/projects', <BusinessProjects />);

    expect(await screen.findByRole('heading', { name: /Projects/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Governance.Country/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/proj-dex-country/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/assets', '/business/assets', <BusinessAssets />);

    expect(await screen.findByRole('heading', { name: /Operational Assets/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Vault.Country/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/asset-dex-country/i)).toBeInTheDocument();
  });

  test('renders treasury exposure and telemetry feed without execution actions', async () => {
    renderBusinessRoute('/business/treasury', '/business/treasury', <BusinessTreasury />);

    expect(await screen.findByRole('heading', { level: 1, name: /Treasury Exposure/i })).toBeInTheDocument();
    expect(screen.getByText(/tex-dex-country/i)).toBeInTheDocument();
    expect(screen.getByText(/DIRECT_TREASURY_ALLOCATION/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /approve|allocate|move|execute|issue|buy|provision/i })).not.toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/telemetry', '/business/telemetry', <BusinessTelemetry />);

    expect(await screen.findByRole('heading', { level: 1, name: /Telemetry/i })).toBeInTheDocument();
    expect(screen.getByText(/tel-dex-treasury-exposure/i)).toBeInTheDocument();
    expect(screen.getAllByText(/business-runtime-mock/i).length).toBeGreaterThan(0);
  });

  test('consumes Business runtime through isolated mock read-only client', () => {
    const overview = businessRuntimeClient.getOverview();

    expect(overview.cards.length).toBeGreaterThan(0);
    expect(businessRuntimeSafety.mode).toBe('MOCK_READ_ONLY');
    expect(businessRuntimeSafety.treasuryMovementEnabled).toBe(false);
    expect(businessRuntimeSafety.debentureIssuanceEnabled).toBe(false);
    expect(businessRuntimeSafety.acsProvisioningEnabled).toBe(false);
    expect(businessRuntimeSafety.contractCallsEnabled).toBe(false);
  });

  test('renders project and asset detail registry views', async () => {
    renderBusinessRoute('/business/projects/proj-dex-country', '/business/projects/:projectId', <BusinessProjectDetail />);

    expect(await screen.findByRole('heading', { name: /Dex.Country/i })).toBeInTheDocument();
    expect(screen.getByText(/Project Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Timeline/i)).toBeInTheDocument();
    expect(screen.getAllByText(/deb-dex-country/i).length).toBeGreaterThan(0);

    cleanup();
    renderBusinessRoute('/business/assets/asset-dex-country', '/business/assets/:assetId', <BusinessAssetDetail />);

    expect(await screen.findByRole('heading', { name: /Dex.Country/i })).toBeInTheDocument();
    expect(screen.getByText(/Asset Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Asset Event Timeline/i)).toBeInTheDocument();
  });

  test('renders registry, workflow, events, state and runtime console pages', async () => {
    renderBusinessRoute('/business/registry', '/business/registry', <BusinessRegistry />);
    expect(await screen.findByRole('heading', { name: /Runtime Registry/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Relationships/i).length).toBeGreaterThan(0);

    cleanup();
    renderBusinessRoute('/business/workflows', '/business/workflows', <BusinessWorkflows />);
    expect(await screen.findByRole('heading', { name: /Workflows/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Blocked/i).length).toBeGreaterThan(0);

    cleanup();
    renderBusinessRoute('/business/events', '/business/events', <BusinessEvents />);
    expect(await screen.findByRole('heading', { level: 1, name: /Events/i })).toBeInTheDocument();
    expect(screen.getByText(/Runtime Timeline/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/state', '/business/state', <BusinessState />);
    expect(await screen.findByRole('heading', { name: /State Machine/i })).toBeInTheDocument();
    expect(screen.getByText(/Transition Simulation/i)).toBeInTheDocument();

    cleanup();
    renderBusinessRoute('/business/runtime', '/business/runtime', <BusinessRuntime />);
    expect(await screen.findByRole('heading', { name: /Runtime Safety/i })).toBeInTheDocument();
    expect(screen.getByText(/Executable Policies/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /approve|allocate|move|execute|issue|buy|provision|distribute|contract/i })).not.toBeInTheDocument();
  });

  test('renders identity, capability and permission access console without grant actions', async () => {
    renderBusinessRoute('/business/access', '/business/access', <BusinessAccess />);

    expect(await screen.findByRole('heading', { name: /Access Control/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Business Identities/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Axodus Core/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Harmony DAO/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/LEVEL_5_AXODUS_NATIVE_ENTITY/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /Capability Matrix/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Permission Matrix/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Denial Explanations/i })).toBeInTheDocument();
    expect(screen.getAllByText(/MOVE_TREASURY_FUNDS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/FORBIDDEN/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /grant|verify kyc|change federation|release access|sign|approve/i })).not.toBeInTheDocument();
  });

  test('renders governance readiness with compatibility, blockers and mock proposal references', async () => {
    renderBusinessRoute('/business/governance', '/business/governance', <BusinessGovernanceReadiness />);

    expect(await screen.findByRole('heading', { name: /Governance Readiness/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Governance Required Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Constitutional Compatibility/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Governance Restrictions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Governance Blockers/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Proposal References/i })).toBeInTheDocument();
    expect(screen.getAllByText(/gov-ref-business-sprint-1/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/REVIEW_REQUIRED/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PREPARE_GOVERNANCE_REVIEW/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /create proposal|submit to dao|vote|execute proposal|approve funding|unlock treasury/i })).not.toBeInTheDocument();
  });

  test('renders finance risk console with treasury, funding, debenture and revenue visibility only', async () => {
    renderBusinessRoute('/business/finance', '/business/finance', <BusinessFinance />);

    expect(await screen.findByRole('heading', { name: /Finance Risk/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Treasury Safety Status/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Risk Tier Distribution/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Treasury Exposure By Project/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Funding Eligibility/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Debenture Planning/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /Revenue Routing/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/NO_TREASURY_MOVEMENT/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/deb-dex-country/i)).toBeInTheDocument();
    expect(screen.getByText(/rev-dex-country/i)).toBeInTheDocument();
    expect(screen.getAllByText(/FORBIDDEN_IN_CURRENT_RUNTIME/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/mock\/read-only/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /move treasury|approve allocation|issue debenture|buy debenture|convert debenture|pay apr|distribute revenue|execute settlement|swap|contract call/i })).not.toBeInTheDocument();
  });

  test('renders ACS readiness with isolation, permission, receipts and human review visibility only', async () => {
    renderBusinessRoute('/business/acs/readiness', '/business/acs/readiness', <BusinessACSReadiness />);

    expect(await screen.findByRole('heading', { name: /ACS Readiness/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ACS Safety Status/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ACS Required Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ACS Runtime Status/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ACS Isolation Profiles/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ACS Permission Profiles/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Compute Usage Mock/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ACS Orchestration Receipts/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Human Review Requirements/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Blocked ACS Actions/i })).toBeInTheDocument();
    expect(screen.getAllByText(/acs-enterprise-sample/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/DEDICATED/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/TENANT_SCOPED/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/READ_ENTERPRISE_SCOPE/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/receipt-business-intake-1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/PROVISION_ACS_RUNTIME/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/mock\/read-only/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /provision mcp|start agent|deploy acs|access memory|execute workflow|escalate permissions|bypass human review/i })).not.toBeInTheDocument();
  });
});
