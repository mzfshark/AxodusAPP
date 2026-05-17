import GovernanceOperationAction from './GovernanceOperationAction';
import PermissionCheckList from './PermissionCheckList';
import ProposalOperationPanel from './ProposalOperationPanel';
import { formatOperationTarget } from '../utils/proposals';

export default function ProposalExecutionPanel({ executionReadiness, executeOperation, onSubmitExecute, onSwitchExecuteChain, isSubmitting, isSwitching }) {
  return (
    <ProposalOperationPanel title="Execution" description="Execution controls are capability-aware and ready for the transaction adapter layer." icon="bolt">
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
          onSubmit={onSubmitExecute}
          onSwitchChain={onSwitchExecuteChain}
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
  );
}
