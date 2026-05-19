import { useMemo, useState } from 'react';
import BbaPageHeader from '../components/BbaPageHeader';
import BbaFilterBar from '../components/BbaFilterBar';
import ServiceCard from '../components/ServiceCard';
import { bbaViewDefaults } from '../store/bbaStore';
import { filterBbaServices, getBbaOverview, uniqueValues } from '../services/bbaService';

export default function BbaServices() {
  const bba = getBbaOverview();
  const [filters, setFilters] = useState(bbaViewDefaults.serviceFilters);
  const services = useMemo(() => filterBbaServices(filters), [filters]);
  const filterOptions = [
    { key: 'category', label: 'Category', values: uniqueValues(bba.services, 'category') },
    { key: 'governanceStanding', label: 'Governance', values: ['compliant', 'review-ready', 'under-review', 'planning'] },
    { key: 'institutionalCategory', label: 'Institutional', values: uniqueValues(bba.services, 'institutionalCategory') },
    { key: 'reputationRisk', label: 'Reputation', values: ['low', 'medium', 'high'] },
  ];

  return (
    <main className="app-view-shell space-y-8">
      <BbaPageHeader
        title="Services Explorer"
        description="BBA services are catalog offerings. Campaigns, proposals, workflows, and deliverables remain separate operational objects."
      />
      <BbaFilterBar filters={filters} onChange={setFilters} options={filterOptions} searchPlaceholder="Search services" />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => <ServiceCard key={service.id} service={service} />)}
      </section>
    </main>
  );
}
