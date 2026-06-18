import { bbaMock } from '@/data/mock';

const normalize = (value) => String(value ?? '').toLowerCase();

const byId = (items, id) => items.find((item) => item.id === id);

export function getBbaOverview() {
  return bbaMock;
}

export function getBbaClient(clientId) {
  return byId(bbaMock.clientPartners, clientId);
}

export function getBbaCampaign(campaignId) {
  return byId(bbaMock.campaigns, campaignId);
}

export function getBbaService(serviceId) {
  return byId(bbaMock.services, serviceId);
}

export function filterBbaServices(filters = {}) {
  return bbaMock.services.filter((service) => {
    const category = !filters.category || service.category === filters.category;
    const standing = !filters.governanceStanding || service.constitutionalStanding === filters.governanceStanding || service.governanceStatus === filters.governanceStanding;
    const institutionalCategory = !filters.institutionalCategory || service.institutionalCategory === filters.institutionalCategory;
    const reputation = !filters.reputationRisk || service.publicReputationRisk === filters.reputationRisk;
    const query = !filters.query || normalize(`${service.title} ${service.description} ${service.category}`).includes(normalize(filters.query));
    return category && standing && institutionalCategory && reputation && query;
  });
}

export function filterBbaCampaigns(filters = {}) {
  return bbaMock.campaigns.filter((campaign) => {
    const type = !filters.type || campaign.type === filters.type;
    const status = !filters.status || campaign.status === filters.status;
    const standing = !filters.governanceStanding || campaign.constitutionalStanding === filters.governanceStanding;
    const reputation = !filters.reputationRisk || campaign.publicReputationRisk === filters.reputationRisk;
    const query = !filters.query || normalize(`${campaign.title} ${campaign.objective} ${campaign.type}`).includes(normalize(filters.query));
    return type && status && standing && reputation && query;
  });
}

export function filterBbaPartners(filters = {}) {
  return bbaMock.clientPartners.filter((partner) => {
    const level = !filters.partnershipLevel || partner.partnershipLevel === filters.partnershipLevel;
    const standing = !filters.governanceStanding || partner.governanceStanding === filters.governanceStanding;
    const type = !filters.type || partner.type === filters.type;
    const query = !filters.query || normalize(`${partner.name} ${partner.description} ${partner.type}`).includes(normalize(filters.query));
    return level && standing && type && query;
  });
}

export function filterBbaDeliverables(filters = {}) {
  return bbaMock.deliverables.filter((deliverable) => {
    const type = !filters.type || deliverable.type === filters.type;
    const status = !filters.status || deliverable.status === filters.status;
    const reputation = !filters.reputationRisk || deliverable.publicReputationRisk === filters.reputationRisk;
    return type && status && reputation;
  });
}

export function filterBbaChannels(filters = {}) {
  return bbaMock.institutionalChannels.filter((channel) => {
    const type = !filters.type || channel.type === filters.type;
    const status = !filters.status || channel.status === filters.status;
    const reputation = !filters.reputationRisk || channel.publicReputationRisk === filters.reputationRisk;
    return type && status && reputation;
  });
}

export function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))];
}

export function getBbaReadiness() {
  const highRiskCampaigns = bbaMock.campaigns.filter((campaign) => campaign.publicReputationRisk === 'high').length;
  const reviewDeliverables = bbaMock.deliverables.filter((deliverable) => deliverable.governanceReviewRequired).length;
  const compliantServices = bbaMock.services.filter((service) => service.constitutionalStanding === 'compliant').length;

  return {
    highRiskCampaigns,
    reviewDeliverables,
    compliantServices,
    serviceReadinessPct: Math.round((compliantServices / bbaMock.services.length) * 100),
  };
}
