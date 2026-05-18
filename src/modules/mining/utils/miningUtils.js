export const riskTone = {
  low: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  medium: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  high: 'border-red-400/30 bg-red-400/10 text-red-200',
  critical: 'border-red-500/40 bg-red-500/15 text-red-100'
};

export const diligenceTone = {
  approved: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  conditional: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  'in-review': 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  required: 'border-red-400/30 bg-red-400/10 text-red-200',
  'future-review': 'border-slate-400/30 bg-slate-400/10 text-slate-200'
};

export const governanceTone = {
  approved: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  limited: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  'under-review': 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  paused: 'border-red-400/30 bg-red-400/10 text-red-200',
  'future-only': 'border-slate-400/30 bg-slate-400/10 text-slate-200'
};

export function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value || 0);
}

export function getProviderRisk(provider, riskProfiles) {
  return riskProfiles.find((risk) => risk.providerId === provider.id);
}

export function filterProviders(providers, filters, riskProfiles) {
  return providers.filter((provider) => {
    const risk = getProviderRisk(provider, riskProfiles);
    const matchesStatus = !filters.status || provider.status === filters.status;
    const matchesDiligence = !filters.diligence || provider.dueDiligenceStatus === filters.diligence;
    const matchesRisk = !filters.riskLevel || risk?.riskLevel === filters.riskLevel;
    return matchesStatus && matchesDiligence && matchesRisk;
  });
}

export function sumNotional(items) {
  return items.reduce((total, item) => total + (item.notionalUsd || 0), 0);
}

