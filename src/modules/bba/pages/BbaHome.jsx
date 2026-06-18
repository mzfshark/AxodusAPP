import { BarChart3, BriefcaseBusiness, Handshake, Layers, Megaphone, ShieldCheck } from 'lucide-react';
import BbaPageHeader from '../components/BbaPageHeader';
import BbaMetricCard from '../components/BbaMetricCard';
import BrandAssetInventory from '../components/BrandAssetInventory';
import ChannelMatrix from '../components/ChannelMatrix';
import ProposalPipeline from '../components/ProposalPipeline';
import AcsWorkflowPanel from '../components/AcsWorkflowPanel';
import { useBbaData } from '../hooks/useBbaData';

export default function BbaHome() {
  const bba = useBbaData();
  const metrics = [
    { label: 'Active services', value: bba.summary.activeServices, detail: 'Strategic catalog, not execution billing.', icon: BriefcaseBusiness },
    { label: 'Campaigns tracked', value: bba.summary.activeCampaigns, detail: 'Mock strategic execution surfaces.', icon: Megaphone },
    { label: 'Partners mapped', value: bba.summary.activePartners, detail: 'Business, Marketplace, Academy, DAO, and partner contexts.', icon: Handshake },
    { label: 'Service readiness', value: `${bba.readiness.serviceReadinessPct}%`, detail: 'Compliant service coverage in mock data.', icon: ShieldCheck },
  ];

  return (
    <main className="app-view-shell space-y-8">
      <BbaPageHeader
        title="BBA Agency"
        description="Blockchain Business & Advertising is the strategic institutional agency nucleus of Axodus: brand systems, institutional communication, acquisition, partnerships, product positioning, and governance-aware growth."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => <BbaMetricCard key={metric.label} {...metric} />)}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <article className="rounded-lg border border-white/10 bg-surface-container-low p-6 xl:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="text-xl font-bold text-on-surface">Strategic Role</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {['Branding infrastructure', 'Institutional communication', 'Client acquisition', 'DAO partnership enablement', 'Product positioning', 'Marketplace service packaging'].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm font-semibold text-on-surface">
                {item}
              </div>
            ))}
          </div>
        </article>
        <aside className="rounded-lg border border-white/10 bg-surface-container-low p-6">
          <div className="mb-5 flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="text-xl font-bold text-on-surface">MVP Boundaries</h2>
          </div>
          <div className="space-y-3 text-sm leading-6 text-outline">
            <p>No real billing, campaign execution, treasury routing, or live Marketplace checkout is enabled.</p>
            <p>BBA surfaces show operational visibility, communication risk, and constitutional compatibility only.</p>
          </div>
        </aside>
      </section>

      <BrandAssetInventory assets={bba.brandAssets} />
      <ChannelMatrix channels={bba.institutionalChannels} />
      <ProposalPipeline proposals={bba.proposals} />
      <AcsWorkflowPanel workflows={bba.workflows} />
    </main>
  );
}
