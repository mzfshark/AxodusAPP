import { useCallback } from 'react';
import { useSwitchChain, useWriteContract } from 'wagmi';

function requestForWrite(request) {
  if (!request) return null;

  return {
    address: request.address,
    abi: request.abi,
    functionName: request.functionName,
    args: request.args,
    chainId: request.chainId,
  };
}

export function useGovernanceWalletWriter({ currentChainId } = {}) {
  const { writeContractAsync, isPending } = useWriteContract();
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain();

  const submitOperation = useCallback(
    async (operation) => {
      if (!operation?.request) {
        throw new Error(operation?.reason ?? 'No governance transaction request is prepared.');
      }

      if (!operation.canSubmit) {
        throw new Error(operation.reason ?? 'Governance transaction is not submittable.');
      }

      if (currentChainId !== operation.request.chainId) {
        throw new Error(`Wallet is connected to chain ${currentChainId ?? 'unknown'}, but this operation requires chain ${operation.request.chainId}.`);
      }

      const hash = await writeContractAsync(requestForWrite(operation.request));
      return { hash };
    },
    [currentChainId, writeContractAsync],
  );

  const switchToOperationChain = useCallback(
    async (operation) => {
      if (!operation?.request?.chainId) {
        throw new Error(operation?.reason ?? 'No governance operation chain is available.');
      }

      if (currentChainId === operation.request.chainId) {
        return { chainId: currentChainId };
      }

      const chain = await switchChainAsync({ chainId: operation.request.chainId });
      return { chainId: chain?.id ?? operation.request.chainId };
    },
    [currentChainId, switchChainAsync],
  );

  return {
    isPending,
    isSwitching,
    submitOperation,
    switchToOperationChain,
  };
}
