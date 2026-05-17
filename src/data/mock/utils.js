export function withMockMeta(record, source = 'axodus-dev-mock') {
  return { ...record, mock: true, source };
}

export function asPercent(value) {
  return `${value}%`;
}
