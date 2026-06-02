import { createContext, useContext } from 'react';

export const GovernanceReadOnlyContext = createContext(null);

export function useGovernanceReadOnlyContext() {
  const value = useContext(GovernanceReadOnlyContext);
  if (!value) {
    throw new Error('useGovernanceReadOnlyContext must be used within GovernanceReadOnlyProvider');
  }
  return value;
}
