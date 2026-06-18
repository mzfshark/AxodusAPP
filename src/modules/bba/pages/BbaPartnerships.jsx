import { useMemo, useState } from 'react';
import BbaPageHeader from '../components/BbaPageHeader';
import BbaFilterBar from '../components/BbaFilterBar';
import PartnerCard from '../components/PartnerCard';
import ProposalPipeline from '../components/ProposalPipeline';
import ChannelMatrix from '../components/ChannelMatrix';
import { bbaViewDefaults } from '../store/bbaStore';
import { filterBbaPartners, getBbaOverview, uniqueValues } from '../services/bbaService';

export default function BbaPartnerships() {
  const bba = getBbaOverview();
  const [filters, setFilters] = useState(bbaViewDefaults.partnerFilters);
  const partners = useMemo(() => filterBbaPartners(filters), [filters]);
  const filterOptions = [
    { key: 'type', label: 'Type', values: uniqueValues(bba.clientPartners, 'type') },
    { key: 'partnershipLevel', label: 'Level', values: uniqueValues(bba.clientPartners, 'partnershipLevel') },
    { key: 'governanceStanding', label: 'Governance', values: uniqueValues(bba.clientPartners, 'governanceStanding') },
  ];

  return (
    <main className="app-view-shell space-y-8">
      <BbaPageHeader
        title="DAO Partnership View"
        description="Partnerships show commercial and institutional relationships across Business, Marketplace, Academy, Governance, ACS, and candidate DAO contexts."
      />
      <BbaFilterBar filters={filters} onChange={setFilters} options={filterOptions} searchPlaceholder="Search partners" />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {partners.map((partner) => <PartnerCard key={partner.id} partner={partner} />)}
      </section>
      <ProposalPipeline proposals={bba.proposals} />
      <ChannelMatrix channels={bba.institutionalChannels} />
    </main>
  );
}
