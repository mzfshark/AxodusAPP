import { useContext } from 'react';
import { TenantContext } from './TenantContextValue';

export function useTenantContext() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenantContext must be used within TenantProvider');
  }
  return context;
}
