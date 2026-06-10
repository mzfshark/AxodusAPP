import { Link, useParams } from 'react-router-dom';
import {
  DecisionHistoryPreview,
  EmergencyNoticeCard,
  GovernanceOverviewCards,
  GovernanceReadOnlyBanner,
  NoGovernanceActionsNotice,
  ProposalDetailPanel,
  ProposalListTable,
  ProposalTimelinePreview,
} from './components';
import { GovernanceReadOnlyProvider } from './provider';
import {
  useGovernanceEmergencyNotices,
  useGovernanceOverview,
  useGovernanceProposalDetail,
  useGovernanceProposalList,
} from './hooks';
import { useGovernanceReadOnlyContext } from './context';

function StateMessage({ title, message }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-6 text-center">
      <h1 className="text-xl font-black text-on-surface">{title}</h1>
      <p className="mt-2 text-sm text-on-surface-variant">{message}</p>
    </section>
  );
}

function GovernanceOverviewContent() {
  const { selectedTenant, governanceTenantId } = useGovernanceReadOnlyContext();
  const overview = useGovernanceOverview();

  if (overview.status === 'loading') {
    return <StateMessage title="Loading Governance read-only model" message="Reading local mock fixtures." />;
  }

  const summary = overview.tenantSummary.data;
  const proposals = overview.proposalList.data?.items ?? [];
  const emergencies = overview.emergencyNotices.data?.items ?? [];

  return (
    <section className="rounded-lg border border-cyan-300/15 bg-surface-container-high p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Read-only backend foundation</span>
          <h2 className="mt-2 text-2xl font-black text-on-surface">Governance read-only mock integration</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">
            Selected app tenant: {selectedTenant?.name ?? 'unknown'} maps to Governance tenant `{governanceTenantId}`.
          </p>
        </div>
        <Link to="/governance/proposals" className="inline-flex w-fit rounded-lg border border-white/10 px-3 py-2 text-sm font-black text-cyan-100">
          Read-only proposals
        </Link>
      </div>
      <div className="mt-5 space-y-5">
        <GovernanceReadOnlyBanner freshness={summary?.metadata?.freshness} />
        <GovernanceOverviewCards summary={summary} />
        <ProposalListTable proposals={proposals.slice(0, 3)} />
        <section className="grid gap-4 lg:grid-cols-2">
          {emergencies.length === 0 ? (
            <StateMessage title="No emergency notices" message="This local mock tenant has no active sanitized emergency notices." />
          ) : emergencies.map((notice) => <EmergencyNoticeCard key={notice.emergencyActionId} notice={notice} />)}
          <NoGovernanceActionsNotice />
        </section>
      </div>
    </section>
  );
}

export function GovernanceReadOnlyOverviewPanel() {
  return (
    <GovernanceReadOnlyProvider>
      <GovernanceOverviewContent />
    </GovernanceReadOnlyProvider>
  );
}

function ProposalListContent() {
  const state = useGovernanceProposalList({ limit: 25 });
  if (state.status === 'loading') return <StateMessage title="Loading proposals" message="Reading local mock read model data." />;
  if (state.status === 'error') return <StateMessage title="Proposal list unavailable" message={state.error?.message ?? 'Read-only mock adapter returned an error.'} />;
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <GovernanceReadOnlyBanner freshness={state.freshness} />
      <ProposalListTable proposals={state.data?.items ?? []} />
      <NoGovernanceActionsNotice />
    </div>
  );
}

export function GovernanceReadOnlyProposalListPage() {
  return (
    <GovernanceReadOnlyProvider>
      <ProposalListContent />
    </GovernanceReadOnlyProvider>
  );
}

function ProposalDetailContent() {
  const { proposalId } = useParams();
  const detail = useGovernanceProposalDetail(proposalId);
  const emergencies = useGovernanceEmergencyNotices();

  if (detail.status === 'loading') return <StateMessage title="Loading proposal" message="Reading local mock proposal detail." />;
  if (detail.status === 'error') return <StateMessage title="Proposal not found" message={detail.error?.message ?? 'No local mock proposal detail exists for this id.'} />;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <Link to="/governance/proposals" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-cyan-200">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Read-only proposals
      </Link>
      <GovernanceReadOnlyBanner freshness={detail.freshness} />
      <ProposalDetailPanel detail={detail.data} />
      <section className="grid gap-5 lg:grid-cols-2">
        <ProposalTimelinePreview entries={detail.data?.auditReferences?.map((reference) => ({
          timelineId: reference.auditId,
          eventType: 'audit.reference',
          summary: 'Sanitized audit reference attached to this proposal.',
          occurredAt: detail.data?.proposal?.updatedAt,
        })) ?? []} />
        <DecisionHistoryPreview decisions={detail.data?.decisions ?? []} />
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {(detail.data?.emergencyActions ?? []).map((notice) => <EmergencyNoticeCard key={notice.emergencyActionId} notice={notice} />)}
        {emergencies.data?.items?.length ? null : <StateMessage title="No tenant emergency notices" message="No active emergency notices in local mock data." />}
        <NoGovernanceActionsNotice />
      </section>
    </div>
  );
}

export function GovernanceReadOnlyProposalDetailPage() {
  return (
    <GovernanceReadOnlyProvider>
      <ProposalDetailContent />
    </GovernanceReadOnlyProvider>
  );
}
