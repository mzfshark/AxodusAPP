import { AlertTriangle, ShieldCheck } from 'lucide-react';
import BbaPageHeader from '../components/BbaPageHeader';
import BbaBadge from '../components/BbaBadge';
import AcsWorkflowPanel from '../components/AcsWorkflowPanel';
import { useBbaData } from '../hooks/useBbaData';

export default function BbaGovernance() {
  const bba = useBbaData();

  return (
    <main className="app-view-shell space-y-8">
      <BbaPageHeader
        title="Governance Validation"
        description="Lightweight BBA validation for constitutional compatibility, communication safety, treasury-safe messaging, and public reputation risk. This does not replace Governance or Business."
      />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {bba.governanceReviews.map((review) => (
          <article key={review.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              <BbaBadge value={review.severity === 'constitutional' ? 'compliant' : review.severity} />
            </div>
            <h2 className="text-lg font-bold text-on-surface">{review.title}</h2>
            <p className="mt-3 text-sm leading-6 text-outline">{review.description}</p>
            <p className="mt-4 rounded-lg bg-surface-container px-3 py-2 font-mono text-xs text-outline">{review.reasonCode}</p>
          </article>
        ))}
      </section>
      <section className="rounded-lg border border-yellow-400/20 bg-yellow-500/10 p-5 text-yellow-100">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <h2 className="font-bold">Communication restrictions</h2>
            <p className="mt-2 text-sm leading-6">
              BBA must not publish unrealistic APY promises, deceptive claims, predatory financial messaging, unverified partner claims, or governance-incompatible content.
            </p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {bba.campaigns.map((campaign) => (
          <article key={campaign.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{campaign.type}</p>
                <h2 className="mt-2 text-lg font-bold text-on-surface">{campaign.title}</h2>
              </div>
              <BbaBadge value={campaign.publicReputationRisk} label="Risk" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <BbaBadge value={campaign.constitutionalStanding} />
              <BbaBadge value={campaign.governanceValidated ? 'compliant' : 'under-review'} label="Validated" />
            </div>
            <ul className="mt-4 space-y-2 text-sm text-outline">
              {campaign.complianceRisks.map((risk) => <li key={risk}>- {risk}</li>)}
            </ul>
          </article>
        ))}
      </section>
      <AcsWorkflowPanel workflows={bba.workflows} />
    </main>
  );
}
