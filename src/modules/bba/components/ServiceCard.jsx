import { ArrowUpRight } from 'lucide-react';
import BbaBadge from './BbaBadge';

export default function ServiceCard({ service }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{service.category}</p>
          <h2 className="mt-2 text-xl font-bold text-on-surface">{service.title}</h2>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-outline" aria-hidden="true" />
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-outline">{service.shortDescription}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <BbaBadge value={service.constitutionalStanding} />
        <BbaBadge value={service.publicReputationRisk} label="Risk" />
        <BbaBadge value={service.treasuryCompatible ? 'compliant' : 'under-review'} label="Treasury" />
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-outline">Delivery</dt>
          <dd className="mt-1 font-semibold text-on-surface">{service.deliveryModel}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-outline">Maturity</dt>
          <dd className="mt-1 font-semibold text-on-surface">{service.maturity}</dd>
        </div>
      </dl>
    </article>
  );
}
