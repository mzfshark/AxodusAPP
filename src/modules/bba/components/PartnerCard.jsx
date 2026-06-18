import BbaBadge from './BbaBadge';

export default function PartnerCard({ partner }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{partner.type}</p>
          <h2 className="mt-2 text-xl font-bold text-on-surface">{partner.name}</h2>
        </div>
        <BbaBadge value={partner.governanceStanding} />
      </div>
      <p className="mt-3 text-sm leading-6 text-outline">{partner.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-surface-container p-3">
          <p className="text-xs uppercase tracking-[0.14em] text-outline">Level</p>
          <p className="mt-1 font-semibold capitalize text-on-surface">{partner.partnershipLevel}</p>
        </div>
        <div className="rounded-lg bg-surface-container p-3">
          <p className="text-xs uppercase tracking-[0.14em] text-outline">Risk score</p>
          <p className="mt-1 font-semibold text-on-surface">{partner.riskScore}/100</p>
        </div>
      </div>
    </article>
  );
}
