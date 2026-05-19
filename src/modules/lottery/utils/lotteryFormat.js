export function formatDate(value) {
  if (!value) return 'Pending';
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(value),
  );
}

export function formatSimulatedAmount(value, currency = 'SIMULATED') {
  return `${Number(value).toLocaleString('en')} ${currency} - simulated`;
}

export function titleize(value) {
  return String(value).replaceAll('-', ' ');
}
