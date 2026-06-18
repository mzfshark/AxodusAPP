import { useEffect, useMemo, useState } from 'react';
import {
  fetchGovernanceDaos,
  fetchGovernancePlugins,
  fetchGovernanceProposals,
  fetchGovernanceTenantExecutor,
  fetchGovernanceTenants,
  getFederalDaoRecord,
} from '../api/governanceClient';
import { getMockGovernancePlugins, getMockGovernanceProposals, getMockGovernanceTenants, shouldUseGovernanceMocks } from '../api/mockGovernanceData';
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

function normalizeTenant(tenant) {
  return {
    ...tenant,
    id: tenant.id ?? tenant.tenantId ?? tenant.daoId,
    daoId: tenant.daoId ?? tenant.id,
    name: tenant.name ?? tenant.legalOrPublicName ?? 'Unnamed DAO tenant',
    tenantType: tenant.tenantType ?? 'partner',
    federationTier: tenant.federationTier ?? 'partner',
    constitutionalStanding: tenant.constitutionalStanding ?? tenant.governanceStatus ?? 'under-review',
    governanceStatus: tenant.governanceStatus ?? tenant.constitutionalStanding ?? 'under-review',
    treasury: {
      address: tenant.treasury?.address ?? null,
      chainId: tenant.treasury?.chainId ?? null,
      assets: tenant.treasury?.assets ?? [],
      policyStatus: tenant.treasury?.policyStatus ?? 'not-configured',
    },
    members: {
      total: tenant.members?.total ?? 0,
      roles: tenant.members?.roles ?? [],
    },
    productsEnabled: tenant.productsEnabled ?? [],
    agentsAssigned: tenant.agentsAssigned ?? [],
    activeProposals: tenant.activeProposals ?? 0,
    pendingOperations: tenant.pendingOperations ?? 0,
    executionReceipts: tenant.executionReceipts ?? 0,
    reasonCodes: tenant.reasonCodes ?? [],
    source: tenant.source ?? 'observed-governance-source',
  };
}

function tenantFromDao(dao) {
  if (!dao) return null;

  return normalizeTenant({
    id: dao.isVirtual ? 'tenant-axodus-root' : `tenant-${dao.id}`,
    daoId: dao.id,
    name: dao.isVirtual ? 'Axodus Root DAO' : dao.name,
    legalOrPublicName: dao.name,
    tenantType: dao.isVirtual ? 'root' : 'partner',
    federationTier: dao.federationTier,
    constitutionalStanding: dao.constitutionalStanding?.status ?? dao.governanceStatus,
    governanceStatus: dao.governanceStatus,
    constitutionalAuthority: {
      source: dao.isVirtual ? '$Neurons' : 'Axodus Constitution',
      layer: dao.isVirtual ? 'Constitutional Governance' : 'Local Governance',
      authorityModel: dao.isVirtual ? 'constitutional-root' : 'federated-tenant',
    },
    localGovernanceModel: dao.votingType ?? 'Not indexed',
    treasury: {
      address: dao.address ?? null,
      chainId: null,
      assets: [],
      policyStatus: dao.treasuryPolicyStatus ?? 'not-configured',
    },
    members: { total: 0, roles: [] },
    productsEnabled: dao.pluginsEnabled ?? ['Governance'],
    agentsAssigned: [],
    activeProposals: 0,
    pendingOperations: 0,
    executionReceipts: 0,
    reasonCodes: (dao.constitutionalStanding?.reasonCodes ?? []).map((reasonCode) => ({
      reasonCode,
      reasonSeverity: dao.constitutionalStanding?.reasonSeverity ?? 'constitutional',
      source: 'DAO federation standing',
    })),
    source: 'dao-fallback-derived-tenant',
  });
}

export function useGovernanceConsole(chains) {
  const { address, isConnected } = useWallet();
  const [subDaos, setSubDaos] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [tenantSource, setTenantSource] = useState('loading');
  const [selectedDaoId, setSelectedDaoId] = useState(getFederalDaoRecord().id);
  const [proposals, setProposals] = useState([]);
  const [plugins, setPlugins] = useState([]);
  const [executorResolution, setExecutorResolution] = useState(null);
  const [executorSource, setExecutorSource] = useState('loading');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const daos = useMemo(() => [getFederalDaoRecord(), ...subDaos], [subDaos]);
  const selectedDao = useMemo(() => daos.find((dao) => dao.id === selectedDaoId) ?? daos[0], [daos, selectedDaoId]);
  const selectedTenant = useMemo(
    () => tenants.find((tenant) => tenant.daoId === selectedDao?.id || tenant.id === selectedDao?.id) ?? tenantFromDao(selectedDao),
    [selectedDao, tenants],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadTenants() {
      try {
        const result = await fetchGovernanceTenants({ signal: controller.signal });
        const normalized = result.items.map(normalizeTenant);
        setTenants(normalized.length ? normalized : getMockGovernanceTenants().map(normalizeTenant));
        setTenantSource(result.source ?? 'governance-api');
      } catch {
        if (controller.signal.aborted) return;
        setTenants(getMockGovernanceTenants().map(normalizeTenant));
        setTenantSource('frontend-dev-fixture');
      }
    }

    loadTenants();

    return () => controller.abort();
  }, []);

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

  useEffect(() => {
    const controller = new AbortController();

    async function loadExecutor() {
      if (!selectedTenant?.id) {
        setExecutorResolution(null);
        setExecutorSource('frontend-empty-request');
        return;
      }

      try {
        const result = await fetchGovernanceTenantExecutor({
          tenantId: selectedTenant.id,
          signal: controller.signal,
        });
        setExecutorResolution(result.resolution);
        setExecutorSource(result.source ?? 'governance-api');
      } catch {
        if (controller.signal.aborted) return;
        setExecutorResolution(null);
        setExecutorSource('frontend-dev-fixture');
      }
    }

    loadExecutor();

    return () => controller.abort();
  }, [selectedTenant?.id]);

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
    const tenantReasons = (selectedTenant?.reasonCodes ?? []).map((reason) => ({
      reasonCode: reason.reasonCode,
      reasonSeverity: reason.reasonSeverity ?? 'constitutional',
      source: reason.source ?? 'DAO tenant registry',
      scope: selectedTenant.name,
      network: selectedDao?.network,
    }));

    return [...tenantReasons, ...daoReasons, ...chainReasons];
  }, [selectedChain, selectedDao, selectedTenant]);

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
    selectedTenant,
    tenants,
    tenantSource,
    executorResolution,
    executorSource,
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
