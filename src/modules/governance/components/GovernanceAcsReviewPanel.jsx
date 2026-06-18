import { CardShell } from '@/components/ui';

export default function GovernanceAcsReviewPanel({ review }) {
  return (
    <CardShell
      title="ACS Review State"
      subtitle="ACS is shown as operational review/control. It is not final governance authority."
      scope="operator"
      maturity="prototype"
      executionMode="simulation"
      status={review.state}
    >
      <div className="grid gap-3 md:grid-cols-4">
        <Info label="ACS state" value={review.state} />
        <Info label="Pending reviews" value={review.pendingReviews} />
        <Info label="Review source" value={review.reviewSource} />
        <Info label="Last mock evaluation" value={new Date(review.lastEvaluatedAt).toLocaleString()} />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <List title="Policy checks" items={review.policyChecks} />
        <List title="Blocked actions" items={review.blockedActions} empty="No ACS blocked actions are visible." />
      </div>
    </CardShell>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <p className="text-[10px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-on-surface">{value}</p>
    </div>
  );
}

function List({ title, items = [], empty = 'No items visible.' }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <p className="text-[10px] font-black uppercase text-slate-500">{title}</p>
      {items.length ? (
        <ul className="mt-2 space-y-2 text-xs leading-5 text-outline">
          {items.map((item) => <li key={item}>- {item}</li>)}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-outline">{empty}</p>
      )}
    </div>
  );
}
