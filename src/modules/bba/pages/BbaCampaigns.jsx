import { useMemo, useState } from 'react';
import { BarChart3, Megaphone, ShieldAlert, Target } from 'lucide-react';
import BbaPageHeader from '../components/BbaPageHeader';
import BbaMetricCard from '../components/BbaMetricCard';
import BbaFilterBar from '../components/BbaFilterBar';
import CampaignTable from '../components/CampaignTable';
import DeliverableTracker from '../components/DeliverableTracker';
import AcsWorkflowPanel from '../components/AcsWorkflowPanel';
import { bbaViewDefaults } from '../store/bbaStore';
import { filterBbaCampaigns, getBbaOverview, uniqueValues } from '../services/bbaService';

export default function BbaCampaigns() {
  const bba = getBbaOverview();
  const [filters, setFilters] = useState(bbaViewDefaults.campaignFilters);
  const campaigns = useMemo(() => filterBbaCampaigns(filters), [filters]);
  const filterOptions = [
    { key: 'type', label: 'Type', values: uniqueValues(bba.campaigns, 'type') },
    { key: 'status', label: 'Status', values: uniqueValues(bba.campaigns, 'status') },
    { key: 'governanceStanding', label: 'Governance', values: ['compliant', 'under-review', 'restricted'] },
    { key: 'reputationRisk', label: 'Reputation', values: ['low', 'medium', 'high'] },
  ];
  const activeCampaigns = bba.campaigns.filter((campaign) => campaign.status === 'active').length;
  const reviewCampaigns = bba.campaigns.filter((campaign) => campaign.status === 'under-review').length;

  return (
    <main className="app-view-shell space-y-8">
      <BbaPageHeader
        title="Campaign Dashboard"
        description="Campaigns represent strategic execution surfaces. They do not create billing, media buying, treasury routing, or live publication in MVP."
      />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <BbaMetricCard icon={Megaphone} label="Campaigns" value={bba.campaigns.length} detail="Mock strategic surfaces." />
        <BbaMetricCard icon={Target} label="Active" value={activeCampaigns} detail="Read-only status visibility." />
        <BbaMetricCard icon={ShieldAlert} label="Under review" value={reviewCampaigns} detail="Governance or claim review required." />
        <BbaMetricCard icon={BarChart3} label="High reputation risk" value={bba.readiness?.highRiskCampaigns ?? bba.campaigns.filter((campaign) => campaign.publicReputationRisk === 'high').length} detail="Public messaging risk monitor." />
      </section>
      <BbaFilterBar filters={filters} onChange={setFilters} options={filterOptions} searchPlaceholder="Search campaigns" />
      <div className="overflow-x-auto">
        <CampaignTable campaigns={campaigns} />
      </div>
      <DeliverableTracker deliverables={bba.deliverables} />
      <AcsWorkflowPanel workflows={bba.workflows} />
    </main>
  );
}
