import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useWallet } from '@/hooks/useWallet';
import { GovernanceStandingSummary } from '../components/GovernanceStanding';
import GovernanceTransactionPreviewRow from '../components/GovernanceTransactionPreviewRow';
import PermissionCheckList from '../components/PermissionCheckList';
import ProposalExecutionPanel from '../components/ProposalExecutionPanel';
import ProposalExecutionReceiptsPanel from '../components/ProposalExecutionReceiptsPanel';
import ProposalOperationalSummary from '../components/ProposalOperationalSummary';
import ProposalVotingPanel from '../components/ProposalVotingPanel';
import RegistryGuardrailsPanel from '../components/RegistryGuardrailsPanel';
import TransactionAdapterStatePanel from '../components/TransactionAdapterStatePanel';
import { useChainRegistry } from '../hooks/useChainRegistry';
import { useProposalDetail } from '../hooks/useProposalDetail';
import { useGovernanceTransactions } from '../hooks/useGovernanceTransactions';
import {
  compactAddress,
  formatProposalDate,
  getExecutionReadiness,
  getProposalActions,
  getProposalDescription,
  getProposalReceipts,
  getProposalStatus,
  getProposalTitle,
} from '../utils/proposals';
import { collectGovernanceGuardrailReasons } from '../utils/governanceState';

function DetailField({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
      <div className="text-xs font-bold uppercase text-slate-500">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-on-surface">{value ?? 'Not indexed'}</div>
    </div>
  );
}

function LifecycleItem({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-container-high p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container text-cyan-200">
        <span className="material-symbols-outlined text-[19px]">{icon}</span>
      </div>
      <div>
        <div className="text-xs font-bold uppercase text-slate-500">{label}</div>
        <div className="mt-1 text-sm font-semibold text-on-surface">{value}</div>
      </div>
    </div>
  );
}

function capabilityLabel(value) {
  return value ? 'Enabled' : 'Unavailable';
}

function actionTarget(action) {
  return action?.to ?? action?.target ?? action?.address ?? action?.contractAddress ?? 'Not indexed';
}

function actionLabel(action, index) {
  return action?.name ?? action?.functionName ?? action?.method ?? `Action ${index + 1}`;
}

function formatHistoryTime(value) {
  if (!value) return 'Unknown time';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown time';
  return date.toLocaleString();
}

function GovernanceTransactionConfirmation({ operation, proposal, selectedVoteOption, onCancel, onConfirm, isSubmitting }) {
  if (!operation) return null;

  const isVote = operation.action === 'vote';
  const title = isVote ? 'Confirm governance vote' : 'Confirm proposal execution';
  const governanceImpact = isVote
    ? `This will submit a ${selectedVoteOption} vote for this proposal using the connected wallet.`
    : 'This will execute the indexed proposal action payload through the governance plugin.';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-cyan-300/20 bg-surface-container-highest shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-white/5 px-5 py-4">
          <div>
            <h2 className="text-lg font-black text-on-surface">{title}</h2>
            <p className="mt-1 text-xs leading-5 text-on-surface-variant">
              Review the execution context before opening the wallet prompt.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-lg border border-cyan-300/10 bg-cyan-950/20 p-4">
            <div className="text-xs font-black uppercase text-cyan-200">Governance impact</div>
            <p className="mt-2 text-sm leading-6 text-cyan-50">{governanceImpact}</p>
          </div>

          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
            <div className="text-xs font-black uppercase text-slate-500">Permission checks</div>
            <PermissionCheckList checks={operation.permissionChecks} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <GovernanceTransactionPreviewRow label="Proposal" value={getProposalTitle(proposal)} />
            <GovernanceTransactionPreviewRow label="Action" value={operation.action} />
            <GovernanceTransactionPreviewRow label="Plugin type" value={operation.pluginType} />
            <GovernanceTransactionPreviewRow label="Network" value={operation.network} />
            <GovernanceTransactionPreviewRow label="Required chain" value={operation.request?.chainId} />
            <GovernanceTransactionPreviewRow label="Contract" value={operation.request?.address} />
            <GovernanceTransactionPreviewRow label="Function" value={operation.request?.functionName} />
            <GovernanceTransactionPreviewRow label="Network fee" value="Estimated by wallet before signature." />
          </div>

          <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
            <div className="text-[11px] font-black uppercase text-slate-500">Calldata</div>
            <p className="mt-2 max-h-32 overflow-y-auto break-words font-mono text-[11px] leading-5 text-on-surface-variant">
              {operation.request?.data ?? 'No calldata generated.'}
            </p>
          </div>

          <div className="rounded-lg border border-amber-300/20 bg-amber-950/20 p-4">
            <div className="text-xs font-black uppercase text-amber-100">Execution risk</div>
            <p className="mt-2 text-sm leading-6 text-amber-50">
              Wallet prompts are final execution surfaces. Confirm the chain, plugin contract, proposal, and calldata before signing.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/5 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-sm font-black text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-black text-on-primary disabled:cursor-not-allowed disabled:bg-surface-container-high disabled:text-slate-500"
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            {isSubmitting ? 'Submitting' : 'Confirm and open wallet'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default function ProposalDetail() {
  const { proposalId } = useParams();
  const [confirmation, setConfirmation] = useState(null);
  const { address, chain: walletChainId } = useWallet();
  const { chains } = useChainRegistry();
  const { proposal, actions, status, error } = useProposalDetail(proposalId);

  const registryChain = chains.find((entry) => entry.network === proposal?.network || entry.slug === proposal?.network);
  const chain = registryChain ? { ...registryChain, currentWalletChainId: walletChainId } : { currentWalletChainId: walletChainId };
  const decodedActions = getProposalActions(proposal, actions);
  const receipts = getProposalReceipts(proposal);
  const executionReadiness = getExecutionReadiness({ ...proposal, actions: decodedActions }, chain);
  const registryGuardrailReasons = collectGovernanceGuardrailReasons(chain);
  const {
    selectedVoteOption,
    setSelectedVoteOption,
    voteOperation,
    executeOperation,
    transactionState,
    receiptTracking,
    operationHistory,
    isSubmitting,
    isSwitching,
    submitVote,
    submitExecute,
    switchVoteChain,
    switchExecuteChain,
  } = useGovernanceTransactions({
    proposal,
    chain,
    walletAddress: address,
    actions: decodedActions,
  });

  function openConfirmation(operation, submit) {
    if (!operation?.canSubmit) return;
    setConfirmation({ operation, submit });
  }

  async function confirmOperation() {
    const submit = confirmation?.submit;
    setConfirmation(null);
    if (submit) {
      await submit();
    }
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/governance/console" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-cyan-200">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Governance console
        </Link>
        <section className="rounded-lg border border-white/5 bg-surface-container-highest px-5 py-10 text-center">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-lg bg-surface-container-high" />
          <h1 className="mt-4 text-xl font-black text-on-surface">Loading proposal</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Reading indexed governance state from the backend.</p>
        </section>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/governance/console" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-cyan-200">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Governance console
        </Link>
        <section className="rounded-lg border border-red-500/20 bg-red-950/20 px-5 py-8">
          <h1 className="text-xl font-black text-on-surface">Proposal is not reachable</h1>
          <p className="mt-2 text-sm text-red-100">{error?.message ?? 'The backend did not return this proposal.'}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link to="/governance/console" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-cyan-200">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Governance console
        </Link>
        <span className="w-fit rounded-md border border-white/10 px-3 py-1.5 text-xs font-bold text-slate-300">
          {getProposalStatus(proposal)}
        </span>
        {proposal?.dataSource === 'dev-mock' ? (
          <span className="w-fit rounded-md border border-cyan-300/20 bg-cyan-950/20 px-3 py-1.5 text-xs font-black uppercase text-cyan-100">
            Dev mock data
          </span>
        ) : null}
      </div>

      <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5 md:p-6">
        <div className="max-w-4xl">
          <div className="text-xs font-bold uppercase text-cyan-200">Proposal Detail</div>
          <h1 className="mt-3 text-2xl font-black text-on-surface md:text-3xl">{getProposalTitle(proposal)}</h1>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">{getProposalDescription(proposal)}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DetailField label="Proposal ID" value={proposal?.id ?? proposalId} />
        <DetailField label="DAO" value={compactAddress(proposal?.daoAddress ?? proposal?.dao?.address)} />
        <DetailField label="Plugin" value={compactAddress(proposal?.pluginAddress ?? proposal?.plugin?.address)} />
        <DetailField label="Network" value={chain?.name ?? proposal?.network ?? 'Not indexed'} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <LifecycleItem label="Start" value={formatProposalDate(proposal?.startDate ?? proposal?.startAt)} icon="play_circle" />
        <LifecycleItem label="End" value={formatProposalDate(proposal?.endDate ?? proposal?.endAt)} icon="event" />
        <LifecycleItem
          label="Execution"
          value={proposal?.executed ? formatProposalDate(proposal?.executionDate ?? proposal?.executedAt) : 'Pending or not indexed'}
          icon="task_alt"
        />
      </section>

      <ProposalOperationalSummary
        proposal={proposal}
        chain={chain}
        voteOperation={voteOperation}
        executeOperation={executeOperation}
        receipts={receipts}
        guardrailReasons={registryGuardrailReasons}
        decodedActions={decodedActions}
      />

      <section className="grid gap-6 xl:grid-cols-3">
        <ProposalVotingPanel
          proposal={proposal}
          selectedVoteOption={selectedVoteOption}
          setSelectedVoteOption={setSelectedVoteOption}
          voteOperation={voteOperation}
          onSubmitVote={() => openConfirmation(voteOperation, submitVote)}
          onSwitchVoteChain={switchVoteChain}
          isSubmitting={isSubmitting}
          isSwitching={isSwitching}
          operatorAddress={address}
        />
        <ProposalExecutionPanel
          executionReadiness={executionReadiness}
          executeOperation={executeOperation}
          onSubmitExecute={() => openConfirmation(executeOperation, submitExecute)}
          onSwitchExecuteChain={switchExecuteChain}
          isSubmitting={isSubmitting}
          isSwitching={isSwitching}
        />
        <ProposalExecutionReceiptsPanel receipts={receipts} />
      </section>

      <TransactionAdapterStatePanel
        voteOperation={voteOperation}
        executeOperation={executeOperation}
        transactionState={transactionState}
        receiptTracking={receiptTracking}
      />

      {operationHistory.entries.length > 0 ? (
        <section className="rounded-lg border border-white/5 bg-surface-container-highest">
          <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-on-surface">Recent Wallet Operations</h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Local transaction memory for this wallet and proposal while the backend indexer catches up.
              </p>
            </div>
            <button
              type="button"
              onClick={operationHistory.clearEntries}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-black text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              Clear local history
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {operationHistory.entries.map((entry) => (
              <article key={entry.id} className="px-5 py-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2 py-1 text-[11px] font-black uppercase text-cyan-100">
                        {entry.action}
                      </span>
                      <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                        receipt: {entry.receiptStatus}
                      </span>
                      <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                        indexer: {entry.indexerStatus}
                      </span>
                    </div>
                    <p className="mt-2 break-words text-xs text-on-surface-variant">{entry.hash}</p>
                    <p className="mt-2 text-xs text-on-surface-variant">{entry.message}</p>
                  </div>
                  <div className="shrink-0 text-xs text-on-surface-variant lg:text-right">
                    <p>{entry.network ?? 'Unknown network'}</p>
                    <p className="mt-1">chain {entry.chainId ?? 'unknown'}</p>
                    <p className="mt-1">{formatHistoryTime(entry.updatedAt)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border border-white/5 bg-surface-container-highest">
          <div className="border-b border-white/5 px-5 py-4">
            <h2 className="text-lg font-bold text-on-surface">Execution Actions</h2>
            <p className="mt-1 text-xs text-on-surface-variant">
              Remote execution details will be attached here as the multichain adapter starts indexing receipts.
            </p>
          </div>

          {decodedActions.length > 0 ? (
            <div className="divide-y divide-white/5">
              {decodedActions.map((action, index) => (
                <article key={`${actionTarget(action)}-${index}`} className="px-5 py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-sm font-bold text-on-surface">{actionLabel(action, index)}</div>
                      <div className="mt-1 break-words text-xs text-on-surface-variant">{actionTarget(action)}</div>
                    </div>
                    <span className="w-fit rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                      {action?.value ?? '0'} value
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high text-cyan-200">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-on-surface">No actions indexed</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-on-surface-variant">
                This proposal may be vote-only, or the backend has not decoded execution actions yet.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-lg border border-white/5 bg-surface-container-highest">
          <div className="border-b border-white/5 px-5 py-4">
            <h2 className="text-lg font-bold text-on-surface">Governance Context</h2>
            <p className="mt-1 text-xs text-on-surface-variant">Registry-rendered governance standing and capability view for this proposal.</p>
          </div>
          <div className="space-y-3 p-5">
            <GovernanceStandingSummary chain={chain} />
            <DetailField label="Chain role" value={chain?.roles?.join(', ') ?? 'Not registered'} />
            <DetailField label="Governance" value={capabilityLabel(chain?.capabilities?.governance)} />
            <DetailField label="Voting" value={capabilityLabel(chain?.capabilities?.voting)} />
            <DetailField label="Remote execution" value={capabilityLabel(chain?.capabilities?.remoteExecution)} />
            <DetailField label="Local governance models" value={chain?.capabilities?.localGovernanceModels?.join(', ') ?? 'Not indexed'} />
            <DetailField label="Indexer reason code" value={chain?.indexingStatus?.reasonCode ?? 'No active guardrail reason'} />
            <RegistryGuardrailsPanel reasons={registryGuardrailReasons} />
          </div>
        </aside>
      </section>

      <GovernanceTransactionConfirmation
        operation={confirmation?.operation}
        proposal={proposal}
        selectedVoteOption={selectedVoteOption}
        onCancel={() => setConfirmation(null)}
        onConfirm={confirmOperation}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
