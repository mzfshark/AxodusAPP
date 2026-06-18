import { createBusinessRegistry } from "./business.registry.js";

export interface BusinessRegistryValidationResult {
  valid: boolean;
  errors: string[];
}

const requireReference = (errors: string[], label: string, exists: boolean) => {
  if (!exists) errors.push(label);
};

export const validateBusinessRegistryIntegrity = (): BusinessRegistryValidationResult => {
  const registry = createBusinessRegistry();
  const errors: string[] = [];

  for (const project of registry.indexes.projectsById.values()) {
    requireReference(errors, `project ${project.id} missing request ${project.requestId}`, registry.indexes.requestsById.has(project.requestId));
    requireReference(errors, `project ${project.id} missing owner ${project.ownerId}`, registry.indexes.identitiesById.has(project.ownerId));
    requireReference(errors, `project ${project.id} missing funding ${project.fundingId}`, registry.indexes.fundingById.has(project.fundingId));
    requireReference(errors, `project ${project.id} missing asset ${project.assetId}`, registry.indexes.assetsById.has(project.assetId));
  }

  for (const funding of registry.indexes.fundingById.values()) {
    requireReference(errors, `funding ${funding.id} missing project ${funding.projectId}`, registry.indexes.projectsById.has(funding.projectId));
    requireReference(errors, `funding ${funding.id} missing asset ${funding.assetId}`, registry.indexes.assetsById.has(funding.assetId));
    if (funding.debentureId) requireReference(errors, `funding ${funding.id} missing debenture ${funding.debentureId}`, registry.indexes.debenturesById.has(funding.debentureId));
    if (funding.treasuryExposureId) {
      requireReference(errors, `funding ${funding.id} missing treasury exposure ${funding.treasuryExposureId}`, registry.indexes.treasuryExposuresById.has(funding.treasuryExposureId));
    }
  }

  for (const runtimeEvent of registry.runtimeEvents) {
    if (runtimeEvent.relatedProjectId) {
      requireReference(errors, `runtime event ${runtimeEvent.eventId} missing project ${runtimeEvent.relatedProjectId}`, registry.indexes.projectsById.has(runtimeEvent.relatedProjectId));
    }
    if (runtimeEvent.relatedAssetId) {
      requireReference(errors, `runtime event ${runtimeEvent.eventId} missing asset ${runtimeEvent.relatedAssetId}`, registry.indexes.assetsById.has(runtimeEvent.relatedAssetId));
    }
    if (runtimeEvent.relatedFundingId) {
      requireReference(errors, `runtime event ${runtimeEvent.eventId} missing funding ${runtimeEvent.relatedFundingId}`, registry.indexes.fundingById.has(runtimeEvent.relatedFundingId));
    }
    if (runtimeEvent.relatedDebentureId) {
      requireReference(errors, `runtime event ${runtimeEvent.eventId} missing debenture ${runtimeEvent.relatedDebentureId}`, registry.indexes.debenturesById.has(runtimeEvent.relatedDebentureId));
    }
    if (runtimeEvent.relatedACSRuntimeId) {
      requireReference(errors, `runtime event ${runtimeEvent.eventId} missing ACS runtime ${runtimeEvent.relatedACSRuntimeId}`, registry.indexes.acsRuntimesById.has(runtimeEvent.relatedACSRuntimeId));
    }
  }

  if (registry.summary.relationshipEdges <= 0) {
    errors.push("registry summary must expose relationship edges");
  }

  return { valid: errors.length === 0, errors };
};
