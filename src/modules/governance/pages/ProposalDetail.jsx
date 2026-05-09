import { Link, useParams } from 'react-router-dom';
import { useWallet } from '@/hooks/useWallet';
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

export default function ProposalDetail() {
  const { proposalId } = useParams();
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
              onSubmit={submitVote}
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
              onSubmit={submitExecute}
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
            <div>
              <h2 className="text-sm font-black uppercase text-cyan-100">Governance Transaction Adapter</h2>
              <p className="mt-1 text-sm leading-6 text-cyan-50">{transactionState.message}</p>
              <p className="mt-1 break-words text-xs leading-5 text-cyan-100">
                {transactionState.operation?.request?.data ?? 'No calldata generated.'}
              </p>
            </div>
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
            <p className="mt-1 text-xs text-on-surface-variant">Chain capability view for this proposal.</p>
          </div>
          <div className="space-y-3 p-5">
            <DetailField label="Chain role" value={chain?.roles?.join(', ') ?? 'Not registered'} />
            <DetailField label="Governance" value={capabilityLabel(chain?.capabilities?.governance)} />
            <DetailField label="Voting" value={capabilityLabel(chain?.capabilities?.voting)} />
            <DetailField label="Remote execution" value={capabilityLabel(chain?.capabilities?.remoteExecution)} />
          </div>
        </aside>
      </section>
    </div>
  );
}
