import BbaBadge from './BbaBadge';

export default function ChannelMatrix({ channels }) {
  return (
    <section className="rounded-lg border border-white/10 bg-surface-container-low p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-on-surface">Institutional Channel Matrix</h2>
        <p className="mt-1 text-sm text-outline">Public communication channels with governance state and reputation exposure.</p>
      </div>
      <div className="space-y-3">
        {channels.map((channel) => (
          <article key={channel.id} className="grid grid-cols-1 gap-4 rounded-lg border border-white/10 bg-surface-container p-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{channel.type}</p>
              <h3 className="mt-1 font-bold text-on-surface">{channel.title}</h3>
              <p className="mt-1 text-sm text-outline">{channel.audience}</p>
            </div>
            <BbaBadge value={channel.status} />
            <BbaBadge value={channel.publicReputationRisk} label="Risk" />
          </article>
        ))}
      </div>
    </section>
  );
}
