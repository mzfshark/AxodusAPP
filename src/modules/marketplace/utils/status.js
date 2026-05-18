export const marketplaceTone = {
  compliant: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  verified: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  aligned: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  'under-review': 'border-yellow-400/25 bg-yellow-500/10 text-yellow-100',
  'requires-review': 'border-yellow-400/25 bg-yellow-500/10 text-yellow-100',
  warning: 'border-yellow-400/25 bg-yellow-500/10 text-yellow-100',
  restricted: 'border-red-400/25 bg-red-500/10 text-red-100',
  suspended: 'border-red-400/25 bg-red-500/10 text-red-100',
  mocked: 'border-sky-400/25 bg-sky-500/10 text-sky-100',
  'ready-boundary': 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  deferred: 'border-slate-400/25 bg-slate-500/10 text-slate-100',
};

export function formatMarketplaceStatus(value) {
  return String(value ?? 'unknown').replace(/-/g, ' ');
}

export function getMarketplaceTone(value) {
  return marketplaceTone[value] ?? 'border-white/10 bg-surface-container text-outline';
}
