import { useEffect, useMemo, useState } from 'react';
import { fetchGovernanceDaos, fetchGovernancePlugins, fetchGovernanceProposals, getFederalDaoRecord } from '../api/governanceClient';
import { getMockGovernancePlugins, getMockGovernanceProposals, shouldUseGovernanceMocks } from '../api/mockGovernanceData';
import { useWallet } from '@/hooks/useWallet';
import { collectGovernanceGuardrailReasons, getConstitutionalStanding } from '../utils/governanceState';

function normalizeDao(dao) {
  const hasStanding = dao.constitutionalStanding || dao.constitutionalCompliance || dao.constitutionalCompatibility;
  const constitutionalStanding = hasStanding
    ? getConstitutionalStanding(dao)
    : { status: 'under-review', reasonCodes: [], reasonSeverity: null };

  return {
    ...dao,
    id: dao.id ?? dao.entityId ?? `${dao.network}:${dao.address}`,
    name: dao.name ?? dao.ens ?? dao.subdomain ?? 'Unnamed DAO',
    federationRole: dao.federationRole ?? 'subdao',
    federationMember: dao.federationMember ?? true,
    federationTier: dao.federationTier ?? 'partner',
    governanceStatus: dao.governanceStatus ?? constitutionalStanding.status ?? 'under-review',
    constitutionalStanding,
    status: dao.status ?? 'indexed',
  };
}

export function useGovernanceConsole(chains) {
  const { address, isConnected } = useWallet();
  const [subDaos, setSubDaos] = useState([]);
  const [selectedDaoId, setSelectedDaoId] = useState(getFederalDaoRecord().id);
  const [proposals, setProposals] = useState([]);
  const [plugins, setPlugins] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const daos = useMemo(() => [getFederalDaoRecord(), ...subDaos], [subDaos]);
  const selectedDao = useMemo(() => daos.find((dao) => dao.id === selectedDaoId) ?? daos[0], [daos, selectedDaoId]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDaos() {
      setStatus('loading');
      setError(null);

      try {
        const result = await fetchGovernanceDaos({
          memberAddress: isConnected ? address : undefined,
          signal: controller.signal,
        });
        const normalized = result.items.map(normalizeDao);
        setSubDaos(normalized);
        setStatus('success');
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setSubDaos([]);
        setStatus('error');
        setError(requestError);
      }
    }

    loadDaos();

    return () => controller.abort();
  }, [address, isConnected]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDaoState() {
      if (!selectedDao || selectedDao.isVirtual) {
        setProposals(shouldUseGovernanceMocks() ? getMockGovernanceProposals() : []);
        setPlugins(shouldUseGovernanceMocks() ? getMockGovernancePlugins() : []);
        return;
      }

      try {
        const [proposalResult, pluginResult] = await Promise.all([
          fetchGovernanceProposals({ daoId: selectedDao.id, signal: controller.signal }),
          fetchGovernancePlugins({ dao: selectedDao, signal: controller.signal }),
        ]);

        setProposals(proposalResult.items);
        setPlugins(Array.isArray(pluginResult) ? pluginResult : pluginResult?.data ?? []);
      } catch {
        if (controller.signal.aborted) return;
        setProposals(shouldUseGovernanceMocks() ? getMockGovernanceProposals() : []);
        setPlugins(shouldUseGovernanceMocks() ? getMockGovernancePlugins() : []);
      }
    }

    loadDaoState();

    return () => controller.abort();
  }, [selectedDao]);

  const selectedChain = useMemo(
    () => chains.find((chain) => chain.network === selectedDao?.network || chain.slug === selectedDao?.network),
    [chains, selectedDao?.network],
  );
  const selectedGuardrailReasons = useMemo(() => {
    const chainReasons = collectGovernanceGuardrailReasons(selectedChain);
    const daoReasons = (selectedDao?.constitutionalStanding?.reasonCodes ?? []).map((reasonCode) => ({
      reasonCode,
      reasonSeverity: selectedDao.constitutionalStanding.reasonSeverity ?? 'constitutional',
      source: 'DAO federation standing',
      scope: selectedDao.name,
      network: selectedDao.network,
    }));

    return [...daoReasons, ...chainReasons];
  }, [selectedChain, selectedDao]);

  const canCreateProposal = Boolean(
    selectedDao &&
      !selectedDao.isVirtual &&
      isConnected &&
      selectedChain?.capabilities?.governance &&
      plugins.some((plugin) => plugin.interfaceType && plugin.status !== 'uninstalled'),
  );

  return {
    daos,
    selectedDao,
    selectedDaoId,
    setSelectedDaoId,
    selectedChain,
    proposals,
    plugins,
    status,
    error,
    canCreateProposal,
    walletAddress: address,
    selectedGuardrailReasons,
  };
}
