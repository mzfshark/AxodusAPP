import { ContentGrid, SectionShell } from '@/components/layout';
import { TenantIdentityPanel } from '@/components/tenant';
import DashboardInfoCard from './DashboardInfoCard';

export default function TenantConsoleSummarySection({ data }) {
  return (
    <SectionShell
      scope="tenant"
      title="Tenant Console Summary"
      description="Selected Sub-DAO, company or workspace context. This is tenant state, not protocol-wide truth."
    >
      <TenantIdentityPanel moduleId="business" />
      <ContentGrid columns="three">
        {data.cards.map((card) => (
          <DashboardInfoCard key={card.id} card={card} scope="tenant" maturity={data.selectedTenant.maturity} executionMode={data.selectedTenant.executionMode} />
        ))}
      </ContentGrid>
    </SectionShell>
  );
}
