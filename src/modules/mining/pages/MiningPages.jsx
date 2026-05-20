import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Boxes, Landmark, Pickaxe, ShieldAlert } from 'lucide-react';
import {
  Badge,
  DiligenceBadge,
  EmptyState,
  ErrorState,
  GovernanceBadge,
  LoadingState,
  MetricCard,
  MiningHeader,
  Panel,
  ProviderTable,
  RiskBadge
} from '../components/MiningUi';
import {
  useMiningAllocations,
  useMiningDiligence,
  useMiningGovernance,
  useMiningHashTokens,
  useMiningProvider,
  useMiningProviders,
  useMiningReports,
  useMiningRisk,
  useMiningSummary,
  useMiningTreasury,
  useMiningVaults
} from '../hooks/useMiningData';
import { formatUsd, sumNotional } from '../utils/miningUtils';

export function MiningOverview() {
  const summary = useMiningSummary();
  const providers = useMiningProviders();
  const risk = useMiningRisk();
  const allocations = useMiningAllocations();

  if (summary.isLoading || providers.isLoading || risk.isLoading || allocations.isLoading) return <LoadingState />;
  if (summary.isError || providers.isError || risk.isError || allocations.isError) return <ErrorState message="Mining overview data is unavailable." />;

  const chartData = (allocations.data || []).map((allocation) => ({
    name: allocation.allocationName,
    value: allocation.notionalUsd
  }));

  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader
        title="Tokenized Hash Allocation Hub"
        description="Mining in AxodusAPP is a governed, read-only surface for provider exposure, tokenized hash products, treasury routing, risk review, due diligence, and reporting. It does not execute purchases, mint tokens, stake assets, or move treasury."
      />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Pickaxe} label="Mock providers" value={String(summary.data.totalProviders)} detail={`${summary.data.activeMockProviders} active mock providers under visibility.`} />
        <MetricCard icon={Landmark} label="Treasury exposure" value={formatUsd(summary.data.treasuryExposureUsd)} detail="Read-only notional routing; no treasury movement." />
        <MetricCard icon={ShieldAlert} label="High risk providers" value={String(summary.data.highRiskProviders)} detail="Restricted until diligence and governance reviews close." />
        <MetricCard icon={Boxes} label="Native Hash" value="Future" detail={summary.data.nativeHashStatus} />
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Panel title="Provider Exposure Registry" description="Providers are visible with due diligence, governance standing, risk level, and treasury compatibility.">
            <ProviderTable providers={providers.data || []} riskProfiles={risk.data?.riskProfiles || []} />
          </Panel>
        </div>
        <Panel title="Allocation Routing" description="Mock notional routing by treasury, DAO, research, or strategic reserve context.">
          <div className="h-80 min-h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={280}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.12)" />
                <XAxis type="number" tickFormatter={(value) => `$${Number(value) / 1000}k`} stroke="#9ca3af" />
                <YAxis dataKey="name" type="category" width={96} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Tooltip formatter={(value) => formatUsd(Number(value))} contentStyle={{ background: '#101827', border: '1px solid rgba(255,255,255,.12)', color: '#fff' }} />
                <Bar dataKey="value" fill="#c0c1ff" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </section>
    </main>
  );
}

export function MiningProviders() {
  const [status, setStatus] = useState('');
  const [diligence, setDiligence] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const filters = useMemo(() => ({ status, diligence, riskLevel }), [status, diligence, riskLevel]);
  const providers = useMiningProviders(filters);
  const risk = useMiningRisk();

  if (providers.isLoading || risk.isLoading) return <LoadingState />;
  if (providers.isError || risk.isError) return <ErrorState message="Mining provider registry is unavailable." />;

  const selectClass = 'rounded-lg border border-white/10 bg-surface-container-low px-3 py-2 text-sm text-on-surface';

  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title="Providers" description="External providers and future native hash infrastructure are tracked as mock, read-only exposure candidates." />
      <Panel
        title="Provider Discovery"
        description="Filter provider exposure by operational state, diligence status, and risk level."
        action={(
          <div className="flex flex-wrap gap-2">
            <select className={selectClass} value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">All statuses</option><option value="active-mock">Active mock</option><option value="reviewing">Reviewing</option><option value="future">Future</option>
            </select>
            <select className={selectClass} value={diligence} onChange={(event) => setDiligence(event.target.value)}>
              <option value="">All diligence</option><option value="approved">Approved</option><option value="conditional">Conditional</option><option value="in-review">In review</option><option value="required">Required</option><option value="future-review">Future review</option>
            </select>
            <select className={selectClass} value={riskLevel} onChange={(event) => setRiskLevel(event.target.value)}>
              <option value="">All risk</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
            </select>
          </div>
        )}
      >
        {providers.data?.length ? <ProviderTable providers={providers.data} riskProfiles={risk.data?.riskProfiles || []} /> : <EmptyState message="No providers match the current filters." />}
      </Panel>
    </main>
  );
}

export function MiningProviderDetails() {
  const { providerSlug = '' } = useParams();
  const details = useMiningProvider(providerSlug);

  if (details.isLoading) return <LoadingState />;
  if (details.isError) return <ErrorState message="Mining provider details are unavailable." />;
  if (!details.data) return <EmptyState message="Provider was not found in the Mining registry." />;

  const {
    provider,
    riskProfile,
    liquidity,
    hashTokens = [],
    allocations = [],
    dueDiligence,
    governanceValidations = [],
    telemetry
  } = details.data;

  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title={provider.name} description={provider.description} />
      <section className="flex flex-wrap gap-2">
        <DiligenceBadge status={provider.dueDiligenceStatus} />
        <GovernanceBadge standing={provider.governanceStanding} />
        {riskProfile ? <RiskBadge level={riskProfile.riskLevel} /> : null}
        <Badge>{provider.status}</Badge>
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Exposure Assumptions">
          <div className="space-y-4 text-sm leading-6 text-outline">
            <p><strong className="text-on-surface">Provider type:</strong> {provider.providerType}</p>
            <p><strong className="text-on-surface">Hash model:</strong> {provider.tokenizedHashModel || provider.allocationMode}</p>
            <p><strong className="text-on-surface">Custody:</strong> {provider.custodyModel || provider.custodyAssumption}</p>
            <p><strong className="text-on-surface">Accounting:</strong> {provider.rewardAccounting}</p>
            <p><strong className="text-on-surface">Treasury eligibility:</strong> {provider.treasuryCompatible ? 'eligible with controls' : 'not eligible'}</p>
          </div>
        </Panel>
        <Panel title="Risk And Liquidity">
          <div className="space-y-4 text-sm leading-6 text-outline">
            <p>{riskProfile?.explanation || riskProfile?.notes}</p>
            <p>Composite score: <strong className="text-on-surface">{riskProfile?.compositeScore ?? 'n/a'}</strong></p>
            <p>Exposure limit: <strong className="text-on-surface">{riskProfile?.treasuryExposureLimitPct || provider.recommendedAllocationLimitPct || 0}%</strong></p>
            <p>Liquidity: <strong className="text-on-surface">{liquidity?.liquidityStatus || provider.liquidityProfile || 'unknown'}</strong>. {liquidity?.liquidityNotes}</p>
            <p>Governance recommendation: <strong className="text-on-surface">{riskProfile?.governanceRecommendation || 'No recommendation recorded.'}</strong></p>
          </div>
        </Panel>
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Provider Readiness">
          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <Badge>{provider.operationalMaturity || telemetry?.operationalMaturity || 'maturity unknown'}</Badge>
            <Badge>{provider.integrationReadiness || 'integration unknown'}</Badge>
            <Badge>{provider.apiAvailability || telemetry?.apiAvailability || 'API unknown'}</Badge>
            <Badge>{provider.publicStatus || 'status unknown'}</Badge>
          </div>
          <p className="mt-4 text-sm leading-6 text-outline">{provider.complianceNotes}</p>
          <p className="mt-3 text-sm leading-6 text-outline">{provider.strategicNotes}</p>
        </Panel>
        <Panel title="Mock Telemetry">
          <div className="space-y-3 text-sm leading-6 text-outline">
            <p><strong className="text-on-surface">Reporting:</strong> {telemetry?.reportingStatus || 'manual mock reporting'}</p>
            <p><strong className="text-on-surface">Latest signal:</strong> {telemetry?.latestMockSignal || 'provider observable'}</p>
            <p><strong className="text-on-surface">Supported assets:</strong> {(provider.supportedAssets || []).join(' / ') || provider.primaryAsset}</p>
            <p><strong className="text-on-surface">Chains:</strong> {(provider.supportedChains || []).join(' / ') || 'not specified'}</p>
          </div>
        </Panel>
      </section>
      <Panel title="Hash Tokens">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {hashTokens.map((token) => (
            <article key={token.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <h2 className="text-lg font-bold text-on-surface">{token.symbol}</h2>
              <p className="mt-1 text-sm text-outline">{token.name}</p>
              <p className="mt-3 text-xs leading-5 text-outline">{token.notes}</p>
            </article>
          ))}
        </div>
      </Panel>
      <Panel title="Allocations And Due Diligence">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            {allocations.map((allocation) => (
              <div key={allocation.id} className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm">
                <p className="font-bold text-on-surface">{allocation.allocationName}</p>
                <p className="mt-1 text-outline">{formatUsd(allocation.notionalUsd)}</p>
              </div>
            ))}
          </div>
          {dueDiligence ? (
            <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm">
              <DiligenceBadge status={dueDiligence.status} />
              <p className="mt-3 leading-6 text-outline">{dueDiligence.blockerSummary}</p>
              <p className="mt-3 text-xs text-outline">{(dueDiligence.documents || []).join(' / ') || 'No documents provided'}</p>
              <div className="mt-4 space-y-2">
                {(dueDiligence.checklist || []).map((item) => (
                  <div key={item.item} className="rounded-md border border-white/10 bg-surface-container-low p-3">
                    <p className="font-bold text-on-surface">{item.item}</p>
                    <p className="mt-1 text-xs text-outline">{item.status}: {item.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Panel>
      <Panel title="Governance Validation">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {governanceValidations.length ? governanceValidations.map((validation) => (
            <article key={validation.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-outline">{validation.validationType}</p>
                  <p className="mt-2 text-sm leading-6 text-outline">{validation.summary}</p>
                </div>
                <GovernanceBadge standing={validation.status} />
              </div>
              <p className="mt-3 text-xs text-outline">Reason codes: {(validation.reasonCodes || []).join(' / ') || 'none'}</p>
            </article>
          )) : <EmptyState message="No provider-specific governance validation was returned." />}
        </div>
      </Panel>
    </main>
  );
}

export function MiningHashTokens() {
  const tokens = useMiningHashTokens();
  const providers = useMiningProviders();
  if (tokens.isLoading || providers.isLoading) return <LoadingState />;
  if (tokens.isError || providers.isError) return <ErrorState message="Mining hash token registry is unavailable." />;
  const tokenList = tokens.data || [];
  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title="Hash Tokens" description="Observable tokenized hash products. No production contract addresses or execution flows are configured." />
      <Panel title="Tokenized Hash Registry">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tokenList.length ? tokenList.map((token) => {
            const provider = (providers.data || []).find((item) => item.id === token.providerId);
            return (
              <article key={token.id} className="rounded-lg border border-white/10 bg-surface-container p-5">
                <div className="flex items-start justify-between gap-4">
                  <div><h2 className="text-xl font-black text-on-surface">{token.symbol}</h2><p className="mt-1 text-sm text-outline">{token.name}</p></div>
                  <Badge>{token.status}</Badge>
                </div>
                <dl className="mt-5 space-y-3 text-sm text-outline">
                  <div><dt className="font-bold text-on-surface">Provider</dt><dd>{provider?.name || token.providerId}</dd></div>
                  <div><dt className="font-bold text-on-surface">Chain</dt><dd>{token.chain}</dd></div>
                  <div><dt className="font-bold text-on-surface">Transferability</dt><dd>{token.transferability}</dd></div>
                </dl>
                <p className="mt-4 text-xs leading-5 text-outline">{token.notes}</p>
              </article>
            );
          }) : <EmptyState message="No hash tokens are available from the Mining service." />}
        </div>
      </Panel>
    </main>
  );
}

export function MiningVaults() {
  const vaults = useMiningVaults();
  if (vaults.isLoading) return <LoadingState />;
  if (vaults.isError) return <ErrorState message="Mining vault data is unavailable." />;
  const vaultList = vaults.data || [];
  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title="Mining Vaults" description="Vaults define mock allocation boundaries, concentration limits, and governance standing." />
      <Panel title="Vault Registry">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {vaultList.length ? vaultList.map((vault) => (
            <article key={vault.id} className="rounded-lg border border-white/10 bg-surface-container p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div><h2 className="text-lg font-bold text-on-surface">{vault.name}</h2><p className="mt-1 text-sm leading-6 text-outline">{vault.description}</p></div>
                <GovernanceBadge standing={vault.governanceStanding} />
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                <div><p className="text-xs font-bold uppercase text-outline">Current</p><p className="mt-1 font-bold text-on-surface">{formatUsd(vault.currentExposureUsd)}</p></div>
                <div><p className="text-xs font-bold uppercase text-outline">Target</p><p className="mt-1 font-bold text-on-surface">{formatUsd(vault.targetExposureUsd)}</p></div>
                <div><p className="text-xs font-bold uppercase text-outline">Concentration</p><p className="mt-1 font-bold text-on-surface">{vault.maxProviderConcentrationPct}%</p></div>
              </div>
              <p className="mt-4 text-xs leading-5 text-outline">{vault.riskPolicy}</p>
            </article>
          )) : <EmptyState message="No Mining vaults are available from the Mining service." />}
        </div>
      </Panel>
    </main>
  );
}

export function MiningAllocations() {
  const allocations = useMiningAllocations();
  const providers = useMiningProviders();
  const vaults = useMiningVaults();
  if (allocations.isLoading || providers.isLoading || vaults.isLoading) return <LoadingState />;
  if (allocations.isError || providers.isError || vaults.isError) return <ErrorState message="Mining allocation data is unavailable." />;
  const allocationList = allocations.data || [];
  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title="Allocations" description="Read-only mock allocation routes by provider, vault, governance standing, and risk level." />
      <Panel title="Allocation Ledger" description={`Total mock notional: ${formatUsd(sumNotional(allocationList))}`}>
        {allocationList.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead><tr className="text-xs uppercase tracking-widest text-outline"><th className="px-3 py-3">Allocation</th><th className="px-3 py-3">Provider</th><th className="px-3 py-3">Vault</th><th className="px-3 py-3">Notional</th><th className="px-3 py-3">Governance</th><th className="px-3 py-3">Risk</th><th className="px-3 py-3">Status</th></tr></thead>
            <tbody className="divide-y divide-white/10">
              {allocationList.map((allocation) => {
                const provider = (providers.data || []).find((item) => item.id === allocation.providerId);
                const vault = (vaults.data || []).find((item) => item.id === allocation.vaultId);
                return <tr key={allocation.id}><td className="px-3 py-4 font-bold text-on-surface">{allocation.allocationName}</td><td className="px-3 py-4 text-outline">{provider?.name}</td><td className="px-3 py-4 text-outline">{vault?.name}</td><td className="px-3 py-4 font-bold text-on-surface">{formatUsd(allocation.notionalUsd)}</td><td className="px-3 py-4"><GovernanceBadge standing={allocation.governanceStanding} /></td><td className="px-3 py-4"><RiskBadge level={allocation.riskLevel} /></td><td className="px-3 py-4"><Badge>{allocation.status}</Badge></td></tr>;
              })}
            </tbody>
          </table>
        </div>
        ) : <EmptyState message="No Mining allocations are available from the Mining service." />}
      </Panel>
    </main>
  );
}

export function MiningTreasury() {
  const treasury = useMiningTreasury();
  const providers = useMiningProviders();
  if (treasury.isLoading || providers.isLoading) return <LoadingState />;
  if (treasury.isError || providers.isError) return <ErrorState message="Mining treasury data is unavailable." />;
  const totalExposure = treasury.data.totalExposureUsd ?? sumNotional(treasury.data.exposures || []);
  const groupedRisk = Object.entries(treasury.data.exposureByRiskLevel || {});
  const groupedAssets = Object.entries(treasury.data.exposureByAsset || {});
  const groupedCustody = Object.entries(treasury.data.exposureByCustodyModel || {});
  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title="Treasury Routing" description="Treasury exposure is mock-only and read-only. This interface does not move funds or execute allocations." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard icon={Landmark} label="Mock Treasury Exposure" value={formatUsd(totalExposure)} detail="All routes require governance and diligence visibility." />
        <MetricCard label="Providers" value={String(treasury.data.diversification?.providerCount || 0)} detail="Diversification is calculated by provider exposure route." />
        <MetricCard label="Largest route" value={`${treasury.data.diversification?.largestProviderExposurePct || 0}%`} detail="Mock concentration guardrail for treasury allocation." />
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="By Risk Level">
          <div className="space-y-2">{groupedRisk.map(([level, value]) => <div key={level} className="flex items-center justify-between text-sm"><RiskBadge level={level} /><strong className="text-on-surface">{formatUsd(value)}</strong></div>)}</div>
        </Panel>
        <Panel title="By Asset">
          <div className="space-y-2">{groupedAssets.map(([asset, value]) => <div key={asset} className="flex items-center justify-between text-sm text-outline"><span>{asset}</span><strong className="text-on-surface">{formatUsd(value)}</strong></div>)}</div>
        </Panel>
        <Panel title="By Custody Model">
          <div className="space-y-2">{groupedCustody.map(([custody, value]) => <div key={custody} className="flex items-center justify-between gap-4 text-sm text-outline"><span>{custody}</span><strong className="text-on-surface">{formatUsd(value)}</strong></div>)}</div>
        </Panel>
      </section>
      <Panel title="Exposure Routes">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {(treasury.data.exposures || []).map((exposure) => {
            const provider = providers.data.find((item) => item.id === exposure.providerId);
            return <article key={exposure.id} className="rounded-lg border border-white/10 bg-surface-container p-5"><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold text-on-surface">{provider?.name}</h2><p className="mt-1 text-sm text-outline">{exposure.treasuryRoute}</p></div><DiligenceBadge status={exposure.reviewStatus} /></div><div className="mt-4 flex flex-wrap gap-2"><Badge>{exposure.exposurePct}% exposure</Badge><Badge>{exposure.reserveImpact} reserve impact</Badge><Badge>{exposure.approvedByGovernance ? 'governance approved' : 'not approved'}</Badge></div><p className="mt-4 text-2xl font-black text-on-surface">{formatUsd(exposure.notionalUsd)}</p></article>;
          })}
        </div>
      </Panel>
    </main>
  );
}

export function MiningRisk() {
  const risk = useMiningRisk();
  const providers = useMiningProviders();
  if (risk.isLoading || providers.isLoading) return <LoadingState />;
  if (risk.isError || providers.isError) return <ErrorState message="Mining risk data is unavailable." />;
  const riskProfiles = risk.data?.riskProfiles || [];
  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title="Risk Console" description="Provider risk is shown across counterparty, liquidity, custody, operational, regulatory, transparency, smart contract, volatility, and concentration dimensions." />
      <Panel title="Provider Risk Profiles">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {riskProfiles.length ? riskProfiles.map((profile) => {
            const provider = (providers.data || []).find((item) => item.id === profile.providerId);
            const liquidity = (risk.data?.liquidity || []).find((item) => item.providerId === profile.providerId);
            return <article key={profile.id} className="rounded-lg border border-white/10 bg-surface-container p-5"><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold text-on-surface">{provider?.name}</h2><p className="mt-1 text-sm leading-6 text-outline">{profile.explanation || profile.notes}</p></div><RiskBadge level={profile.riskLevel} /></div><div className="mt-5 grid grid-cols-1 gap-2 text-sm md:grid-cols-3"><Badge>counterparty {profile.counterpartyRisk}</Badge><Badge>custody {profile.custodyRisk}</Badge><Badge>liquidity {profile.liquidityRisk}</Badge><Badge>operations {profile.operationalRisk}</Badge><Badge>regulatory {profile.regulatoryRisk}</Badge><Badge>transparency {profile.transparencyRisk}</Badge><Badge>contract {profile.smartContractRisk}</Badge><Badge>volatility {profile.marketVolatilityRisk}</Badge><Badge>concentration {profile.concentrationRisk}</Badge></div><p className="mt-4 text-sm text-outline">Score: <strong className="text-on-surface">{profile.compositeScore}</strong>. Treasury limit: <strong className="text-on-surface">{profile.treasuryExposureLimitPct}%</strong>. Liquidity: <strong className="text-on-surface">{liquidity?.liquidityStatus}</strong>.</p><p className="mt-3 text-sm text-outline">{profile.governanceRecommendation}</p></article>;
          }) : <EmptyState message="No Mining risk profiles are available from the Mining service." />}
        </div>
      </Panel>
    </main>
  );
}

export function MiningGovernance() {
  const validations = useMiningGovernance();
  if (validations.isLoading) return <LoadingState />;
  if (validations.isError) return <ErrorState message="Mining governance validations are unavailable." />;
  const validationList = validations.data || [];
  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title="Governance Validation" description="Mining provider exposure remains subordinate to governance review, treasury limits, and constitutional controls." />
      <Panel title="Validation Queue">
        <div className="space-y-3">{validationList.length ? validationList.map((validation) => <article key={validation.id} className="rounded-lg border border-white/10 bg-surface-container p-5"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-outline">{validation.targetType} / {validation.validationType}</p><h2 className="mt-1 font-bold text-on-surface">{validation.reviewer}</h2><p className="mt-2 text-sm leading-6 text-outline">{validation.summary}</p></div><GovernanceBadge standing={validation.status} /></div><div className="mt-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-3"><Badge>{validation.providerWhitelistingStatus}</Badge><Badge>{validation.treasuryAllocationApprovalStatus}</Badge><Badge>pause {validation.emergencyPauseRecommendation}</Badge></div><p className="mt-3 text-xs text-outline">Reason codes: {(validation.reasonCodes || []).join(' / ') || 'none'}</p>{validation.restrictionReasons?.length ? <p className="mt-2 text-xs text-outline">Restrictions: {validation.restrictionReasons.join(' / ')}</p> : null}</article>) : <EmptyState message="No governance validations are available from the Mining service." />}</div>
      </Panel>
    </main>
  );
}

export function MiningReports() {
  const reports = useMiningReports();
  const diligence = useMiningDiligence();
  if (reports.isLoading || diligence.isLoading) return <LoadingState />;
  if (reports.isError || diligence.isError) return <ErrorState message="Mining reports are unavailable." />;
  const reportList = reports.data || [];
  const diligenceList = diligence.data || [];
  return (
    <main className="app-view-shell space-y-8">
      <MiningHeader title="Reports" description="Reporting focuses on treasury exposure, provider review, governance queues, and due diligence blockers." />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Mining Reports">
          <div className="space-y-3">{reportList.length ? reportList.map((report) => <article key={report.id} className="rounded-lg border border-white/10 bg-surface-container p-4"><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold text-on-surface">{report.title}</h2><p className="mt-1 text-sm leading-6 text-outline">{report.summary}</p></div><Badge>{report.status}</Badge></div><p className="mt-3 text-xs font-bold uppercase tracking-widest text-outline">{report.reportType} / {report.period}</p><div className="mt-4 space-y-3">{(report.sections || []).map((section) => <div key={section.title} className="rounded-md border border-white/10 bg-surface-container-low p-3"><p className="font-bold text-on-surface">{section.title}</p><ul className="mt-2 space-y-1 text-xs leading-5 text-outline">{(section.findings || []).map((finding) => <li key={finding}>{finding}</li>)}</ul></div>)}</div>{report.nextActions?.length ? <p className="mt-3 text-xs text-outline">Next actions: {report.nextActions.join(' / ')}</p> : null}</article>) : <EmptyState message="No Mining reports are available from the Mining service." />}</div>
        </Panel>
        <Panel title="Due Diligence Blockers">
          <div className="space-y-3">{diligenceList.length ? diligenceList.map((item) => <article key={item.id} className="rounded-lg border border-white/10 bg-surface-container p-4"><div className="flex items-start justify-between gap-4"><p className="font-bold text-on-surface">{item.providerId}</p><DiligenceBadge status={item.status} /></div><p className="mt-2 text-sm leading-6 text-outline">{item.blockerSummary}</p><p className="mt-3 text-xs text-outline">Documents: {item.documents.length ? item.documents.join(' / ') : 'not provided'}</p></article>) : <EmptyState message="No due diligence records are available from the Mining service." />}</div>
        </Panel>
      </section>
    </main>
  );
}
