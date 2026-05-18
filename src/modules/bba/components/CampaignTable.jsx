import BbaBadge from './BbaBadge';
import { getBbaClient } from '../services/bbaService';

export default function CampaignTable({ campaigns }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-surface-container-low">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-surface-container text-xs uppercase tracking-wider text-outline">
          <tr>
            <th className="px-4 py-3">Campaign</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Governance</th>
            <th className="px-4 py-3">Reputation</th>
            <th className="px-4 py-3">Channels</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td className="px-4 py-4">
                <p className="font-semibold text-on-surface">{campaign.title}</p>
                <p className="mt-1 max-w-md text-xs leading-5 text-outline">{campaign.objective}</p>
              </td>
              <td className="px-4 py-4 text-outline">{getBbaClient(campaign.clientId)?.name ?? 'Unknown'}</td>
              <td className="px-4 py-4"><BbaBadge value={campaign.status} /></td>
              <td className="px-4 py-4"><BbaBadge value={campaign.constitutionalStanding} /></td>
              <td className="px-4 py-4"><BbaBadge value={campaign.publicReputationRisk} /></td>
              <td className="px-4 py-4 text-outline">{campaign.channels.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
