import { ScopeLegend } from '@/components/uiScope';
import PageShell from '@/components/layout/PageShell';
import { useTenantContext } from '@/runtime/tenantContext';
import { useWallet } from '@/hooks/useWallet';
import { buildDashboardComposition } from './dashboardComposition';
import MyAxodusSection from './components/MyAxodusSection';
import OperationsCenterSection from './components/OperationsCenterSection';
import ProtocolOverviewSection from './components/ProtocolOverviewSection';
import TenantConsoleSummarySection from './components/TenantConsoleSummarySection';

export default function DashboardPage() {
  const { selectedTenant } = useTenantContext();
  const wallet = useWallet();
  const dashboard = buildDashboardComposition({ selectedTenant, wallet });

  return (
    <PageShell
      title="Axodus Operating Dashboard"
      subtitle="Protocol status, connected user context, selected tenant state and non-executable operations readiness in one auditable entry point."
      module="Dashboard"
      scope="protocol"
      maturity="prototype"
      executionMode="read-only"
    >
      <ScopeLegend compact />
      <ProtocolOverviewSection data={dashboard.protocolOverview} moduleHealth={dashboard.moduleHealth} />
      <MyAxodusSection data={dashboard.userOverview} />
      <TenantConsoleSummarySection data={dashboard.tenantOverview} />
      <OperationsCenterSection data={dashboard.operationsOverview} />
    </PageShell>
  );
}
