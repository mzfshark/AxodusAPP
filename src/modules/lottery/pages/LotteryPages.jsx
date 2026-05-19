import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Archive, Landmark, ShieldAlert, Ticket } from 'lucide-react';
import { useLotteryData } from '../hooks/useLotteryData';
import { filterDraws, getDrawBySlug, initialDrawFilters } from '../services/lotteryService';
import {
  Badge,
  DrawCard,
  EmptyState,
  InfoRow,
  LifecycleBadge,
  LotteryPageShell,
  MetricCard,
} from '../components/LotteryUi';
import { formatDate, formatSimulatedAmount, titleize } from '../utils/lotteryFormat';

const pieColors = ['#c0c1ff', '#41e4b8', '#ffb783', '#8083ff', '#dae2fd'];

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.16em] text-outline">
      {label}
      <select
        className="rounded-lg border-white/10 bg-surface-container text-sm normal-case tracking-normal text-on-surface focus:border-primary focus:ring-primary"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === 'all' ? 'All' : titleize(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function uniqueOptions(draws, key) {
  return ['all', ...new Set(draws.map((draw) => draw[key]))];
}

export function LotteryDashboard() {
  const lottery = useLotteryData();
  const metrics = [
    {
      icon: Archive,
      label: 'Active draw records',
      value: lottery.summary.activeDraws,
      detail: 'Read-only lifecycle data.',
    },
    {
      icon: Landmark,
      label: 'Prize pool previews',
      value: lottery.summary.simulatedPrizePools.toLocaleString('en'),
      detail: 'Simulated, non-executable accounting.',
    },
    {
      icon: Ticket,
      label: 'Ticket previews',
      value: lottery.summary.ticketsPreviewed,
      detail: 'Future NFT-compatible records.',
    },
    {
      icon: ShieldAlert,
      label: 'Governance alerts',
      value: lottery.summary.governanceAlerts,
      detail: 'Reason-coded review queue.',
    },
  ];

  return (
    <LotteryPageShell
      eyebrow="Lottery nucleus / CryptoDraw concept"
      title="Probabilistic reward infrastructure, modeled for auditability"
      description="Mock-only Lottery frontend integrated into AxodusAPP for draw lifecycle visibility, ticket architecture, prize pool accounting, randomness proof previews, ACS review, and governance validation."
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {lottery.draws.slice(0, 2).map((draw) => (
            <DrawCard key={draw.id} draw={draw} />
          ))}
        </div>
        <aside className="space-y-4">
          <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <h2 className="text-xl font-black text-on-surface">Treasury exposure preview</h2>
            <p className="mt-2 text-sm leading-6 text-outline">Read-only simulated exposure by draw.</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lottery.treasuryExposure}>
                  <XAxis dataKey="label" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="exposure" fill="#41e4b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <h2 className="text-xl font-black text-on-surface">ACS review queue</h2>
            <div className="mt-4 space-y-3">
              {lottery.acsReviews.map((review) => (
                <article key={review.id} className="rounded-lg border border-white/10 bg-surface-container p-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-on-surface">{review.workflow}</h3>
                    <Badge tone="mock">{review.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-5 text-outline">{review.finding}</p>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </LotteryPageShell>
  );
}

export function LotteryDraws() {
  const lottery = useLotteryData();
  const [filters, setFilters] = useState(initialDrawFilters);
  const filteredDraws = useMemo(() => filterDraws(lottery.draws, filters), [lottery.draws, filters]);

  return (
    <LotteryPageShell
      eyebrow="Draw lifecycle"
      title="Active draw records"
      description="Filter mock draw records by model, chain, lifecycle state, governance standing, prize range, and randomness status."
    >
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-4">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <FilterSelect label="Game type" value={filters.gameType} options={uniqueOptions(lottery.draws, 'gameType')} onChange={(gameType) => setFilters({ ...filters, gameType })} />
          <FilterSelect label="Chain" value={filters.chain} options={uniqueOptions(lottery.draws, 'chain')} onChange={(chain) => setFilters({ ...filters, chain })} />
          <FilterSelect label="Lifecycle" value={filters.lifecycleState} options={uniqueOptions(lottery.draws, 'lifecycleState')} onChange={(lifecycleState) => setFilters({ ...filters, lifecycleState })} />
          <FilterSelect label="Governance" value={filters.governanceStanding} options={uniqueOptions(lottery.draws, 'constitutionalStanding')} onChange={(governanceStanding) => setFilters({ ...filters, governanceStanding })} />
          <FilterSelect label="Randomness" value={filters.randomnessStatus} options={uniqueOptions(lottery.draws, 'vrfStatus')} onChange={(randomnessStatus) => setFilters({ ...filters, randomnessStatus })} />
          <FilterSelect label="Prize range" value={filters.prizeRange} options={['all', 'under-60000', '60000-plus']} onChange={(prizeRange) => setFilters({ ...filters, prizeRange })} />
        </div>
      </section>
      {filteredDraws.length ? (
        <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filteredDraws.map((draw) => (
            <DrawCard key={draw.id} draw={draw} />
          ))}
        </section>
      ) : (
        <EmptyState title="No draw records match these filters" description="Adjust filters to review simulated lifecycle and governance data." />
      )}
    </LotteryPageShell>
  );
}

export function LotteryDrawDetails() {
  const { slug } = useParams();
  const lottery = useLotteryData();
  const draw = getDrawBySlug(slug);

  if (!draw) {
    return (
      <LotteryPageShell eyebrow="Draw details" title="Draw record not found" description="The requested mock draw slug is not available.">
        <EmptyState title="No draw record" description="Return to draw records to select an available mock draw." />
      </LotteryPageShell>
    );
  }

  const validation = lottery.governanceValidations.find((item) => item.drawId === draw.id);
  const randomness = lottery.randomnessRecords.find((item) => item.drawId === draw.id);

  return (
    <LotteryPageShell eyebrow="Draw details" title={draw.name} description={draw.description}>
      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-lg border border-white/10 bg-surface-container-low p-5 lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            <LifecycleBadge state={draw.lifecycleState} />
            <Badge tone="mock">non-executable record</Badge>
          </div>
          <dl className="mt-5 grid gap-3 md:grid-cols-2">
            <InfoRow label="Game model" value={titleize(draw.gameType)} />
            <InfoRow label="Chain" value={draw.chain} />
            <InfoRow label="Cutoff" value={formatDate(draw.cutoffDate)} />
            <InfoRow label="Draw date" value={formatDate(draw.drawDate)} />
            <InfoRow label="Numbers required" value={draw.numbersRequired} />
            <InfoRow label="Available numbers" value={draw.availableNumbers} />
            <InfoRow label="Rounds supported" value={`1-${draw.roundsSupported}`} />
            <InfoRow label="Prize pool" value={formatSimulatedAmount(draw.prizePool, draw.currency)} />
          </dl>
        </article>
        <aside className="space-y-4">
          <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <h2 className="text-lg font-black text-on-surface">Governance validation</h2>
            <p className="mt-2 text-sm text-outline">{validation?.operationalApprovalState}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {validation?.reasonCodes.map((code) => (
                <Badge key={code} tone="info">{code}</Badge>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <h2 className="text-lg font-black text-on-surface">Randomness relation</h2>
            <p className="mt-2 text-sm text-outline">{randomness?.provider ?? draw.vrfProvider}</p>
            <p className="mt-2 rounded-lg border border-white/10 bg-surface-container p-3 font-mono text-xs text-on-surface">
              {randomness?.requestId ?? 'mock request not created'}
            </p>
          </section>
        </aside>
      </section>
    </LotteryPageShell>
  );
}

export function LotteryGameModels() {
  const lottery = useLotteryData();

  return (
    <LotteryPageShell
      eyebrow="Game models"
      title="Rules preview and number selection models"
      description="Lotofacil-inspired, SuperSete-inspired, and custom Axodus models prepared for review with cutoff policy and consecutive round support."
    >
      <section className="grid gap-4 lg:grid-cols-3">
        {lottery.gameModels.map((model) => (
          <article key={model.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <div className="flex flex-wrap gap-2">
              <LifecycleBadge state={model.status} />
              <Badge tone="mock">rules preview</Badge>
            </div>
            <h2 className="mt-4 text-xl font-black text-on-surface">{model.name}</h2>
            <p className="mt-1 text-sm text-outline">{titleize(model.type)}</p>
            <dl className="mt-4 grid gap-3 text-sm">
              <InfoRow label="Number selection" value={model.numberSelection} />
              <InfoRow label="Rules preview" value={model.rulesPreview} />
              <InfoRow label="Cutoff policy" value={model.cutoffPolicy} />
              <InfoRow label="Consecutive rounds" value={`${model.consecutiveRounds.min}-${model.consecutiveRounds.max}`} />
            </dl>
          </article>
        ))}
      </section>
    </LotteryPageShell>
  );
}

export function LotteryTickets() {
  const lottery = useLotteryData();

  return (
    <LotteryPageShell
      eyebrow="Ticket architecture preview"
      title="Future NFT-compatible ticket viewer"
      description="Tickets are mock records only. Mint, claim, burn, transfer, and payout actions are intentionally unavailable."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {lottery.tickets.map((ticket) => {
          const draw = lottery.draws.find((item) => item.id === ticket.drawId);
          return (
            <article key={ticket.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
              <div className="flex flex-wrap gap-2">
                <Badge tone="mock">mock ticket</Badge>
                <Badge tone={ticket.soulbound ? 'info' : 'neutral'}>{ticket.soulbound ? 'future soulbound mode' : 'future transferable mode'}</Badge>
                <Badge tone="warning">no mint / no claim</Badge>
              </div>
              <h2 className="mt-4 text-xl font-black text-on-surface">{ticket.id}</h2>
              <p className="mt-1 text-sm text-outline">{draw?.name}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ticket.numbers.map((number, index) => (
                  <span key={`${ticket.id}-${number}-${index}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface-container text-sm font-bold text-on-surface">
                    {String(number).padStart(2, '0')}
                  </span>
                ))}
              </div>
              <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
                <InfoRow label="Validity per round" value={`Rounds ${ticket.rounds.join(', ')}`} />
                <InfoRow label="Expiration" value={formatDate(ticket.expirationDate)} />
                <InfoRow label="Mint status" value={ticket.mintStatus} />
                <InfoRow label="Burn policy" value={ticket.burnPolicy} />
              </dl>
            </article>
          );
        })}
      </section>
    </LotteryPageShell>
  );
}

export function LotteryPrizePools() {
  const lottery = useLotteryData();

  return (
    <LotteryPageShell eyebrow="Prize pool accounting" title="Simulated prize pool allocation" description="Read-only prize pool records for treasury compatibility, reserve visibility, community allocation, and governance fee disclosure.">
      <section className="grid gap-4 xl:grid-cols-3">
        {lottery.prizePools.map((pool) => {
          const draw = lottery.draws.find((item) => item.id === pool.drawId);
          const chartData = [
            { name: 'Treasury allocation', value: pool.treasuryAllocation },
            { name: 'Community allocation', value: pool.communityAllocation },
            { name: 'Reserve allocation', value: pool.reserveAllocation },
            { name: 'Operational fee', value: pool.operationalFee },
            { name: 'Governance fee', value: pool.governanceFee },
          ];
          return (
            <article key={pool.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
              <div className="flex flex-wrap gap-2">
                <Badge tone="mock">simulated accounting</Badge>
                <Badge tone="warning">non-executable payout</Badge>
              </div>
              <h2 className="mt-4 text-lg font-black text-on-surface">{draw?.name}</h2>
              <p className="mt-1 text-sm text-outline">{pool.payoutStatus}</p>
              <div className="mt-4 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" innerRadius={52} outerRadius={78} paddingAngle={2}>
                      {chartData.map((entry, index) => (
                        <Cell key={entry.name} fill={pieColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="rounded-lg border border-white/10 bg-surface-container p-3 text-sm font-bold text-on-surface">
                {formatSimulatedAmount(pool.totalAmount, draw?.currency)}
              </p>
            </article>
          );
        })}
      </section>
    </LotteryPageShell>
  );
}

export function LotteryGovernance() {
  const lottery = useLotteryData();

  return (
    <LotteryPageShell eyebrow="Governance validation" title="Constitutional standing and operational review" description="Reason-coded validation records for treasury risk, ACS review, operational approval state, and lifecycle readiness.">
      <section className="grid gap-4 lg:grid-cols-2">
        {lottery.governanceValidations.map((validation) => {
          const draw = lottery.draws.find((item) => item.id === validation.drawId);
          return (
            <article key={validation.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
              <div className="flex flex-wrap gap-2">
                <Badge tone={validation.severity === 'low' ? 'success' : 'warning'}>severity: {validation.severity}</Badge>
                <Badge tone="mock">governance outcome simulated</Badge>
              </div>
              <h2 className="mt-4 text-xl font-black text-on-surface">{draw?.name}</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <InfoRow label="Constitutional standing" value={titleize(validation.constitutionalStanding)} />
                <InfoRow label="Treasury risk" value={validation.treasuryRisk} />
                <InfoRow label="ACS review" value={validation.acsReview} />
                <InfoRow label="Operational approval state" value={validation.operationalApprovalState} />
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                {validation.reasonCodes.map((code) => (
                  <Badge key={code} tone="info">{code}</Badge>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </LotteryPageShell>
  );
}

export function LotteryRandomness() {
  const lottery = useLotteryData();

  return (
    <LotteryPageShell eyebrow="Randomness explorer" title="Mock VRF proof and lifecycle visibility" description="Provider, request id, seed/proof, verification status, and draw lifecycle relation are shown as mock records only.">
      <section className="grid gap-4 lg:grid-cols-2">
        {lottery.randomnessRecords.map((record) => {
          const draw = lottery.draws.find((item) => item.id === record.drawId);
          return (
            <article key={record.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
              <div className="flex flex-wrap gap-2">
                <LifecycleBadge state={record.lifecycleState} />
                <Badge tone="mock">mock provider data</Badge>
              </div>
              <h2 className="mt-4 text-xl font-black text-on-surface">{draw?.name}</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <InfoRow label="Provider" value={record.provider} />
                <InfoRow label="Request id" value={record.requestId} />
                <InfoRow label="Seed / proof" value={record.verificationHash} />
                <InfoRow label="Verification status" value={record.verificationStatus} />
                <InfoRow label="Generated at" value={formatDate(record.generatedAt)} />
              </dl>
            </article>
          );
        })}
      </section>
    </LotteryPageShell>
  );
}

export function LotteryDrawHistory() {
  const lottery = useLotteryData();

  return (
    <LotteryPageShell eyebrow="Audit history" title="Draw and audit log timeline" description="Mock audit trail for lifecycle changes, ACS monitoring, governance records, and future execution receipts.">
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-5">
        <div className="space-y-4">
          {lottery.auditLog.map((entry) => (
            <article key={entry.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-black text-on-surface">{entry.action}</h2>
                  <p className="text-sm text-outline">{entry.actor} to {entry.target}</p>
                </div>
                <Badge tone="mock">audit mock</Badge>
              </div>
              <p className="mt-3 text-sm text-outline">{formatDate(entry.timestamp)}</p>
            </article>
          ))}
        </div>
      </section>
    </LotteryPageShell>
  );
}
