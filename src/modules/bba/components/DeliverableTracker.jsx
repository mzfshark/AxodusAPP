import BbaBadge from './BbaBadge';
import { getBbaCampaign, getBbaClient } from '../services/bbaService';

export default function DeliverableTracker({ deliverables }) {
  return (
    <section className="rounded-lg border border-white/10 bg-surface-container-low p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-on-surface">Deliverable Tracker</h2>
        <p className="mt-1 text-sm text-outline">Agency outputs remain tracked separately from services, campaigns, proposals, and workflows.</p>
      </div>
      <div className="space-y-3">
        {deliverables.map((deliverable) => {
          const campaign = getBbaCampaign(deliverable.campaignId);
          const client = getBbaClient(deliverable.clientId);
          return (
            <article key={deliverable.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{deliverable.type}</p>
                  <h3 className="mt-1 font-bold text-on-surface">{deliverable.title}</h3>
                  <p className="mt-1 text-sm text-outline">{client?.name} / {campaign?.title}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <BbaBadge value={deliverable.status} />
                  <BbaBadge value={deliverable.publicReputationRisk} label="Risk" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
