import type { RiskTier } from "../types/business.enums.js";
import type { BusinessId } from "../types/business.types.js";
import {
  cloneRegistryView,
  createBusinessRegistry,
  eventsForProject,
  type BusinessACSRuntimeRegistryView,
  type BusinessAssetRegistryView,
  type BusinessFundingRegistryView,
  type BusinessIdentityRegistryView,
  type BusinessProjectRegistryView,
  type BusinessRegistrySummary,
  type BusinessRiskTierRegistryView,
  type BusinessTreasuryExposureRegistryView
} from "./business.registry.js";

const allByProject = <T>(map: Map<BusinessId, T[]>, projectId: BusinessId): T[] => map.get(projectId) ?? [];

export const getProjectRegistryView = (projectId: BusinessId): BusinessProjectRegistryView | undefined => {
  const registry = createBusinessRegistry();
  const project = registry.indexes.projectsById.get(projectId);
  if (!project) return undefined;
  const funding = registry.indexes.fundingById.get(project.fundingId);
  const acsRuntimes = allByProject(registry.indexes.acsByProjectId, projectId);

  return cloneRegistryView({
    project,
    request: registry.indexes.requestsById.get(project.requestId),
    owner: registry.indexes.identitiesById.get(project.ownerId),
    asset: registry.indexes.assetsById.get(project.assetId),
    funding,
    debenture: funding?.debentureId ? registry.indexes.debenturesById.get(funding.debentureId) : undefined,
    treasuryExposures: allByProject(registry.indexes.treasuryByProjectId, projectId),
    revenueRecords: allByProject(registry.indexes.revenueByProjectId, projectId),
    plugins: allByProject(registry.indexes.pluginsByProjectId, projectId),
    acsRuntimes,
    acsReceipts: acsRuntimes.flatMap((runtime) => registry.indexes.acsReceiptsByRuntimeId.get(runtime.id) ?? []),
    telemetryEvents: allByProject(registry.indexes.telemetryByProjectId, projectId),
    runtimeEvents: eventsForProject(registry, projectId),
    mock: true,
    readOnly: true
  });
};

export const getAssetRegistryView = (assetId: BusinessId): BusinessAssetRegistryView | undefined => {
  const registry = createBusinessRegistry();
  const asset = registry.indexes.assetsById.get(assetId);
  if (!asset) return undefined;

  return cloneRegistryView({
    asset,
    project: registry.indexes.projectsById.get(asset.projectId),
    owner: registry.indexes.identitiesById.get(asset.ownerId),
    funding: registry.indexes.fundingById.get(asset.fundingId),
    treasuryExposures: allByProject(registry.indexes.treasuryByProjectId, asset.projectId).filter((record) => record.assetId === assetId),
    revenueRecords: allByProject(registry.indexes.revenueByProjectId, asset.projectId).filter((record) => record.assetId === assetId),
    plugins: allByProject(registry.indexes.pluginsByProjectId, asset.projectId).filter((record) => record.assetId === assetId),
    telemetryEvents: allByProject(registry.indexes.telemetryByProjectId, asset.projectId).filter((record) => record.relatedAssetId === assetId),
    runtimeEvents: registry.runtimeEvents.filter((event) => event.relatedAssetId === assetId),
    mock: true,
    readOnly: true
  });
};

export const getRequesterRegistryView = (requesterId: BusinessId): BusinessIdentityRegistryView | undefined => {
  const registry = createBusinessRegistry();
  const identity = registry.indexes.identitiesById.get(requesterId);
  if (!identity) return undefined;
  const requests = [...registry.indexes.requestsById.values()].filter((request) => request.requesterId === requesterId);

  return cloneRegistryView({
    identity,
    requests,
    projects: registry.indexes.projectsByOwnerId.get(requesterId) ?? [],
    assets: registry.indexes.assetsByOwnerId.get(requesterId) ?? [],
    federationParticipants: registry.indexes.federationByIdentityId.get(requesterId) ?? [],
    plugins: registry.indexes.pluginsByDaoId.get(requesterId) ?? [],
    acsRuntimes: [...registry.indexes.acsRuntimesById.values()].filter((runtime) => runtime.ownerId === requesterId),
    mock: true,
    readOnly: true
  });
};

export const getDAORegistryView = (daoId: BusinessId): BusinessIdentityRegistryView | undefined => getRequesterRegistryView(daoId);

export const getFundingRegistryView = (fundingId: BusinessId): BusinessFundingRegistryView | undefined => {
  const registry = createBusinessRegistry();
  const funding = registry.indexes.fundingById.get(fundingId);
  if (!funding) return undefined;

  return cloneRegistryView({
    funding,
    project: registry.indexes.projectsById.get(funding.projectId),
    asset: registry.indexes.assetsById.get(funding.assetId),
    debenture: funding.debentureId ? registry.indexes.debenturesById.get(funding.debentureId) : undefined,
    treasuryExposure: funding.treasuryExposureId ? registry.indexes.treasuryExposuresById.get(funding.treasuryExposureId) : undefined,
    revenueRecords: allByProject(registry.indexes.revenueByProjectId, funding.projectId),
    runtimeEvents: registry.runtimeEvents.filter((event) => event.relatedFundingId === fundingId),
    mock: true,
    readOnly: true
  });
};

export const getRiskTierRegistryView = (riskTier: RiskTier): BusinessRiskTierRegistryView => {
  const registry = createBusinessRegistry();
  const projects = registry.indexes.projectsByRiskTier.get(riskTier) ?? [];
  const projectIds = new Set(projects.map((project) => project.id));

  return cloneRegistryView({
    riskTier,
    projects,
    assets: [...registry.indexes.assetsById.values()].filter((asset) => projectIds.has(asset.projectId)),
    fundingRecords: [...registry.indexes.fundingById.values()].filter((funding) => projectIds.has(funding.projectId)),
    treasuryExposures: [...registry.indexes.treasuryExposuresById.values()].filter((exposure) => exposure.riskTier === riskTier),
    debentures: [...registry.indexes.debenturesById.values()].filter((debenture) => projectIds.has(debenture.projectId)),
    runtimeEvents: registry.runtimeEvents.filter((event) => event.relatedProjectId && projectIds.has(event.relatedProjectId)),
    mock: true,
    readOnly: true
  }) as BusinessRiskTierRegistryView;
};

export const getTreasuryExposureRegistryView = (exposureId: BusinessId): BusinessTreasuryExposureRegistryView | undefined => {
  const registry = createBusinessRegistry();
  const treasuryExposure = registry.indexes.treasuryExposuresById.get(exposureId);
  if (!treasuryExposure) return undefined;

  return cloneRegistryView({
    treasuryExposure,
    project: registry.indexes.projectsById.get(treasuryExposure.projectId),
    asset: registry.indexes.assetsById.get(treasuryExposure.assetId),
    fundingRecords: allByProject(registry.indexes.fundingByProjectId, treasuryExposure.projectId).filter((funding) => funding.treasuryExposureId === exposureId),
    revenueRecords: allByProject(registry.indexes.revenueByProjectId, treasuryExposure.projectId),
    runtimeEvents: registry.runtimeEvents.filter((event) => event.relatedProjectId === treasuryExposure.projectId && event.source === "business-treasury"),
    mock: true,
    readOnly: true
  });
};

export const getACSRuntimeRegistryView = (runtimeId: BusinessId): BusinessACSRuntimeRegistryView | undefined => {
  const registry = createBusinessRegistry();
  const acsRuntime = registry.indexes.acsRuntimesById.get(runtimeId);
  if (!acsRuntime) return undefined;

  return cloneRegistryView({
    acsRuntime,
    owner: registry.indexes.identitiesById.get(acsRuntime.ownerId),
    project: registry.indexes.projectsById.get(acsRuntime.relatedProjectId),
    receipts: registry.indexes.acsReceiptsByRuntimeId.get(runtimeId) ?? [],
    telemetryEvents: allByProject(registry.indexes.telemetryByProjectId, acsRuntime.relatedProjectId),
    runtimeEvents: registry.runtimeEvents.filter((event) => event.relatedACSRuntimeId === runtimeId),
    mock: true,
    readOnly: true
  });
};

export const getBusinessRegistrySummary = (): BusinessRegistrySummary => cloneRegistryView(createBusinessRegistry().summary) as BusinessRegistrySummary;
