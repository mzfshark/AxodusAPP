import ScopeBadge from './ScopeBadge';
import { scopeDescriptions } from './scopeMetadata';

const scopes = ['protocol', 'user', 'tenant', 'operator'];

export default function ScopeLegend({ compact = false }) {
  return (
    <section className="rounded-lg border border-white/10 bg-surface-container-highest p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-black text-on-surface">Information scope legend</h2>
          <p className="mt-1 text-sm text-outline">Every major surface should make ownership of information explicit.</p>
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-outline">Sprint 00B</span>
      </div>
      <div className={`mt-4 grid gap-3 ${compact ? 'md:grid-cols-4' : 'md:grid-cols-2 xl:grid-cols-4'}`}>
        {scopes.map((scope) => (
          <div key={scope} className="rounded-lg border border-white/10 bg-surface-container p-3">
            <ScopeBadge scope={scope} />
            <p className="mt-3 text-sm leading-5 text-outline">{scopeDescriptions[scope]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
