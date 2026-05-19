import { formatMarketplaceStatus, getMarketplaceTone } from '../utils/status';

export default function MarketplaceBadge({ value, label }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getMarketplaceTone(value)}`}>
      {label ? `${label}: ` : ''}{formatMarketplaceStatus(value)}
    </span>
  );
}
