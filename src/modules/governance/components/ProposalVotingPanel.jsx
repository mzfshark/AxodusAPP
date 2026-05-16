import GovernanceOperationAction from './GovernanceOperationAction';
import PermissionCheckList from './PermissionCheckList';
import ProposalOperationPanel from './ProposalOperationPanel';
import { compactAddress, formatOperationTarget, getVoteOptionTotals } from '../utils/proposals';

export default function ProposalVotingPanel({
  proposal,
  selectedVoteOption,
  setSelectedVoteOption,
  voteOperation,
  onSubmitVote,
  onSwitchVoteChain,
  isSubmitting,
  isSwitching,
  operatorAddress,
}) {
  const voteTotals = getVoteOptionTotals(proposal);

  return (
    <ProposalOperationPanel
      title="Voting"
      description="Prepared for adapter-backed voting with wallet submission and chain-aware execution guards."
      icon="how_to_vote"
    >
      <div className="grid gap-3">
        {voteTotals.map((option) => (
          <label key={option.key} className="flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-surface-container-high px-4 py-3">
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
          onSubmit={onSubmitVote}
          onSwitchChain={onSwitchVoteChain}
          isSubmitting={isSubmitting}
          isSwitching={isSwitching}
          icon="how_to_vote"
        />
      </div>
      <p className="mt-3 text-xs leading-5 text-on-surface-variant">
        Connected operator: {compactAddress(operatorAddress)}. Adapter status: {voteOperation.status}. {voteOperation.reason}
      </p>
      <p className="mt-2 text-xs leading-5 text-on-surface-variant">{formatOperationTarget(voteOperation)}</p>
      <PermissionCheckList checks={voteOperation.permissionChecks} />
    </ProposalOperationPanel>
  );
}
