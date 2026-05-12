import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useWallet } from '@/hooks/useWallet';
import { GovernanceStandingSummary, GuardrailReasonCode } from '../components/GovernanceStanding';
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
  getVoteOptionTotals,
} from '../utils/proposals';

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

function receiptStatus(receipt) {
  return receipt?.status ?? receipt?.state ?? receipt?.executionStatus ?? 'Indexed';
}

function receiptChain(receipt) {
  return receipt?.chainSlug ?? receipt?.network ?? receipt?.chain ?? receipt?.targetChain ?? 'Target chain not indexed';
}

function formatOperationTarget(operation) {
  if (!operation?.request) return 'No transaction request prepared.';
  return `${operation.request.functionName} on ${compactAddress(operation.request.address)} · chain ${operation.request.chainId}`;
}

function formatReceiptValue(value) {
  if (value === undefined || value === null) return 'Not available';
  return typeof value === 'bigint' ? value.toString() : String(value);
}

function formatHistoryTime(value) {
  if (!value) return 'Unknown time';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown time';
  return date.toLocaleString();
}

function ProposalOperationPanel({ title, description, icon, children }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="flex items-start gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-cyan-200">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-on-surface">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function OperationActionButton({ icon, disabled, onClick, variant = 'primary', children }) {
  const variantClass =
    variant === 'secondary'
      ? 'border border-cyan-300/30 bg-cyan-950/30 text-cyan-100 disabled:border-white/5 disabled:bg-surface-container-high disabled:text-slate-500'
      : 'bg-primary text-on-primary disabled:bg-surface-container-high disabled:text-slate-500';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-black disabled:cursor-not-allowed ${variantClass}`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      {children}
    </button>
  );
}

function GovernanceOperationAction({ operation, submitLabel, submittingLabel, onSubmit, onSwitchChain, isSubmitting, isSwitching, icon }) {
  if (operation.status === 'wrongChain') {
    return (
      <OperationActionButton icon="sync_alt" disabled={isSwitching} onClick={onSwitchChain} variant="secondary">
        {isSwitching ? 'Switching network' : 'Switch network'}
      </OperationActionButton>
    );
  }

  return (
    <OperationActionButton icon={icon} disabled={!operation.canSubmit || isSubmitting} onClick={onSubmit}>
      {isSubmitting ? submittingLabel : submitLabel}
    </OperationActionButton>
  );
}

function PermissionCheckList({ checks = [] }) {
  if (!checks.length) return null;

  const statusClass = {
    passed: 'border-emerald-300/20 bg-emerald-950/20 text-emerald-100',
    warning: 'border-amber-300/20 bg-amber-950/20 text-amber-100',
    blocked: 'border-red-300/20 bg-red-950/20 text-red-100',
  };

  return (
    <div className="mt-4 space-y-2">
      {checks.map((check) => (
        <div
          key={`${check.label}-${check.reasonCode ?? check.message}`}
          className={`rounded-lg border px-3 py-2 text-xs ${statusClass[check.status] ?? 'border-white/10 bg-surface-container-high text-on-surface-variant'}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-black uppercase">{check.label}</span>
            {check.source ? <span className="rounded border border-current/20 px-1.5 py-0.5 text-[10px] uppercase opacity-80">{check.source}</span> : null}
          </div>
          <div className="mt-1 leading-5">{check.message}</div>
          <GuardrailReasonCode reasonCode={check.reasonCode} reasonSeverity={check.reasonSeverity} />
        </div>
      ))}
    </div>
  );
}

function TransactionPreviewRow({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <div className="text-[11px] font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 break-words text-xs font-semibold text-on-surface">{value ?? 'Not available'}</div>
    </div>
  );
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
            <TransactionPreviewRow label="Proposal" value={getProposalTitle(proposal)} />
            <TransactionPreviewRow label="Action" value={operation.action} />
            <TransactionPreviewRow label="Plugin type" value={operation.pluginType} />
            <TransactionPreviewRow label="Network" value={operation.network} />
            <TransactionPreviewRow label="Required chain" value={operation.request?.chainId} />
            <TransactionPreviewRow label="Contract" value={operation.request?.address} />
            <TransactionPreviewRow label="Function" value={operation.request?.functionName} />
            <TransactionPreviewRow label="Network fee" value="Estimated by wallet before signature." />
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
  const voteTotals = getVoteOptionTotals(proposal);
  const executionReadiness = getExecutionReadiness({ ...proposal, actions: decodedActions }, chain);
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

      <section className="grid gap-6 xl:grid-cols-3">
        <ProposalOperationPanel
          title="Voting"
          description="Prepared for adapter-backed voting with wallet submission and chain-aware execution guards."
          icon="how_to_vote"
        >
          <div className="grid gap-3">
            {voteTotals.map((option) => (
              <label
                key={option.key}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-surface-container-high px-4 py-3"
              >
                <span className="flex items-center gap-3 text-sm font-bold text-on-surface">
                  <input
                    type="radio"
                    name="governance-vote-option"
                    value={option.key}
                    checked={selectedVoteOption === option.key}
                    onChange={() => setSelectedVoteOption(option.key)}
                    className="h-4 w-4 accent-cyan-300"
                  />
                  {option.label}
                </span>
                <span className="text-sm font-semibold text-on-surface-variant">{option.value}</span>
              </label>
            ))}
          </div>
          <div className="mt-4">
            <GovernanceOperationAction
              operation={voteOperation}
              submitLabel="Submit vote"
              submittingLabel="Submitting"
              onSubmit={() => openConfirmation(voteOperation, submitVote)}
              onSwitchChain={switchVoteChain}
              isSubmitting={isSubmitting}
              isSwitching={isSwitching}
              icon="how_to_vote"
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-on-surface-variant">
            Connected operator: {compactAddress(address)}. Adapter status: {voteOperation.status}. {voteOperation.reason}
          </p>
          <p className="mt-2 text-xs leading-5 text-on-surface-variant">{formatOperationTarget(voteOperation)}</p>
          <PermissionCheckList checks={voteOperation.permissionChecks} />
        </ProposalOperationPanel>

        <ProposalOperationPanel
          title="Execution"
          description="Execution controls are capability-aware and ready for the transaction adapter layer."
          icon="bolt"
        >
          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
            <div className="text-xs font-bold uppercase text-slate-500">Readiness</div>
            <div className="mt-2 text-sm font-semibold text-on-surface">{executionReadiness.canExecute ? 'Ready for adapter' : 'Blocked'}</div>
            <p className="mt-2 text-xs leading-5 text-on-surface-variant">{executionReadiness.reason}</p>
          </div>
          <div className="mt-4">
            <GovernanceOperationAction
              operation={executeOperation}
              submitLabel="Execute proposal"
              submittingLabel="Submitting"
              onSubmit={() => openConfirmation(executeOperation, submitExecute)}
              onSwitchChain={switchExecuteChain}
              isSubmitting={isSubmitting}
              isSwitching={isSwitching}
              icon="play_arrow"
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-on-surface-variant">
            Adapter status: {executeOperation.status}. {executeOperation.reason}
          </p>
          <p className="mt-2 text-xs leading-5 text-on-surface-variant">{formatOperationTarget(executeOperation)}</p>
          <PermissionCheckList checks={executeOperation.permissionChecks} />
        </ProposalOperationPanel>

        <ProposalOperationPanel
          title="Execution Receipts"
          description="Multichain execution receipts and LayerZero message state will appear here when indexed."
          icon="fact_check"
        >
          {receipts.length > 0 ? (
            <div className="space-y-3">
              {receipts.map((receipt, index) => (
                <div key={`${receiptChain(receipt)}-${index}`} className="rounded-lg border border-white/5 bg-surface-container-high p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-on-surface">{receiptChain(receipt)}</span>
                    <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">{receiptStatus(receipt)}</span>
                  </div>
                  <div className="mt-2 break-words text-xs text-on-surface-variant">
                    {receipt?.txHash ?? receipt?.transactionHash ?? receipt?.messageId ?? 'Receipt identifier not indexed'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/10 bg-surface-container-high p-5 text-center">
              <span className="material-symbols-outlined text-3xl text-cyan-200">hub</span>
              <p className="mt-3 text-sm font-bold text-on-surface">No execution receipts indexed</p>
              <p className="mt-2 text-xs leading-5 text-on-surface-variant">This proposal has no remote execution state in the current backend payload.</p>
            </div>
          )}
        </ProposalOperationPanel>
      </section>

      {transactionState.status !== 'idle' ? (
        <section className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-cyan-200">account_tree</span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-black uppercase text-cyan-100">Governance Transaction Adapter</h2>
              <p className="mt-1 text-sm leading-6 text-cyan-50">{transactionState.message}</p>
              {receiptTracking.status !== 'idle' ? (
                <div className="mt-3 grid gap-2 rounded-lg border border-cyan-300/10 bg-cyan-950/30 p-3 text-xs text-cyan-50 md:grid-cols-2">
                  <div>
                    <span className="font-black uppercase text-cyan-200">Receipt</span>
                    <p className="mt-1">{receiptTracking.message}</p>
                  </div>
                  <div>
                    <span className="font-black uppercase text-cyan-200">Status</span>
                    <p className="mt-1">{receiptTracking.status}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-black uppercase text-cyan-200">Hash</span>
                    <p className="mt-1 break-words">{receiptTracking.hash}</p>
                  </div>
                  {receiptTracking.receipt ? (
                    <>
                      <div>
                        <span className="font-black uppercase text-cyan-200">Block</span>
                        <p className="mt-1">{formatReceiptValue(receiptTracking.receipt.blockNumber)}</p>
                      </div>
                      <div>
                        <span className="font-black uppercase text-cyan-200">Gas used</span>
                        <p className="mt-1">{formatReceiptValue(receiptTracking.receipt.gasUsed)}</p>
                      </div>
                    </>
                  ) : null}
                  <div className="md:col-span-2">
                    <span className="font-black uppercase text-cyan-200">Indexer</span>
                    <p className="mt-1">{receiptTracking.indexerStatus?.message ?? 'Indexer reconciliation not started.'}</p>
                    <p className="mt-1">Status: {receiptTracking.indexerStatus?.status ?? 'idle'}</p>
                  </div>
                </div>
              ) : null}
              <p className="mt-1 break-words text-xs leading-5 text-cyan-100">
                {transactionState.operation?.request?.data ?? 'No calldata generated.'}
              </p>
            </div>
          </div>
        </section>
      ) : null}

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
