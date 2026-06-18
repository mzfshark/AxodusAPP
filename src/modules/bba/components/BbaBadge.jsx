import { formatStatus, getTone } from '../utils/status';

export default function BbaBadge({ value, label }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getTone(value)}`}>
      {label ? `${label}: ` : ''}
      {formatStatus(value)}
    </span>
  );
}
