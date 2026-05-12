import { useEffect, useMemo, useState } from 'react';
import { fetchChainRegistry, getFallbackChainRegistry, summarizeChainRegistry } from '../api/chainRegistry';

export function useChainRegistry() {
  const [chains, setChains] = useState(() => getFallbackChainRegistry());
  const [source, setSource] = useState('fallback');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRegistry() {
      setStatus('loading');
      setError(null);

      try {
        const remoteChains = await fetchChainRegistry();
        if (cancelled) return;

        setChains(remoteChains);
        setSource('backend');
        setStatus('success');
      } catch (requestError) {
        if (cancelled) return;

        setChains(getFallbackChainRegistry());
        setSource('fallback');
        setStatus('error');
        setError(requestError);
      }
    }

    loadRegistry();

    return () => {
      cancelled = true;
    };
  }, []);

  const summary = useMemo(() => summarizeChainRegistry(chains), [chains]);

  return { chains, summary, source, status, error };
}
