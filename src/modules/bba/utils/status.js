export const riskTone = {
  low: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  medium: 'border-yellow-400/25 bg-yellow-500/10 text-yellow-100',
  high: 'border-red-400/25 bg-red-500/10 text-red-100',
};

export const standingTone = {
  compliant: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  'review-ready': 'border-sky-400/25 bg-sky-500/10 text-sky-100',
  'under-review': 'border-yellow-400/25 bg-yellow-500/10 text-yellow-100',
  planning: 'border-indigo-400/25 bg-indigo-500/10 text-indigo-100',
  pending: 'border-slate-400/25 bg-slate-500/10 text-slate-100',
  restricted: 'border-red-400/25 bg-red-500/10 text-red-100',
  blocked: 'border-red-400/25 bg-red-500/10 text-red-100',
  active: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  paused: 'border-yellow-400/25 bg-yellow-500/10 text-yellow-100',
  completed: 'border-slate-400/25 bg-slate-500/10 text-slate-100',
  'in-progress': 'border-sky-400/25 bg-sky-500/10 text-sky-100',
  approved: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  planned: 'border-indigo-400/25 bg-indigo-500/10 text-indigo-100',
  'review-gated': 'border-yellow-400/25 bg-yellow-500/10 text-yellow-100',
};

export function formatStatus(value) {
  return String(value ?? 'unknown').replace(/-/g, ' ');
}

export function getTone(value, fallback = 'border-white/10 bg-surface-container text-outline') {
  return standingTone[value] ?? riskTone[value] ?? fallback;
}
