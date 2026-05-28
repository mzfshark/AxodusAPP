import { BUSINESS_NON_EXECUTION_FLAGS } from "../constants/business.constants.js";
import { businessRuntimeMock } from "../data/business.mock.js";
import type { BusinessRuntimeDataset } from "../types/business.types.js";

declare const process: {
  argv: string[];
  exit(code?: number): never;
};

export interface BusinessValidationResult {
  valid: boolean;
  errors: string[];
}

const idSet = (records: { id: string }[]) => new Set(records.map((record) => record.id));

const requireReference = (errors: string[], label: string, id: string | undefined, set: Set<string>) => {
  if (!id || !set.has(id)) {
    errors.push(`${label} references missing id: ${id ?? "undefined"}`);
  }
};

const requireNonNegative = (errors: string[], label: string, value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    errors.push(`${label} must be a non-negative finite number`);
  }
};

export const validateBusinessRuntimeDataset = (dataset: BusinessRuntimeDataset = businessRuntimeMock): BusinessValidationResult => {
  const errors: string[] = [];
  const identityIds = idSet(dataset.identities);
  const requestIds = idSet(dataset.requests);
  const projectIds = idSet(dataset.projects);
  const assetIds = idSet(dataset.assets);
  const fundingIds = idSet(dataset.fundingRecords);
  const debentureIds = idSet(dataset.debentures);
  const exposureIds = idSet(dataset.treasuryExposures);
  const acsRuntimeIds = idSet(dataset.acsRuntimes);

  for (const flag of Object.entries(BUSINESS_NON_EXECUTION_FLAGS)) {
    if (flag[1] !== false) {
      errors.push(`non-execution flag must remain disabled: ${flag[0]}`);
    }
  }

  for (const request of dataset.requests) {
    requireReference(errors, `request ${request.id}.requesterId`, request.requesterId, identityIds);
    requireNonNegative(errors, `request ${request.id}.estimatedBudget.amount`, request.estimatedBudget.amount);
  }

  for (const participant of dataset.federationParticipants) {
    requireReference(errors, `federation ${participant.id}.identityId`, participant.identityId, identityIds);
  }

  for (const project of dataset.projects) {
    requireReference(errors, `project ${project.id}.requestId`, project.requestId, requestIds);
    requireReference(errors, `project ${project.id}.ownerId`, project.ownerId, identityIds);
    requireReference(errors, `project ${project.id}.fundingId`, project.fundingId, fundingIds);
    requireReference(errors, `project ${project.id}.assetId`, project.assetId, assetIds);
    if (!project.telemetryProfile.enabled) {
      errors.push(`project ${project.id} must expose telemetry`);
    }
  }

  for (const asset of dataset.assets) {
    requireReference(errors, `asset ${asset.id}.ownerId`, asset.ownerId, identityIds);
    requireReference(errors, `asset ${asset.id}.projectId`, asset.projectId, projectIds);
    requireReference(errors, `asset ${asset.id}.fundingId`, asset.fundingId, fundingIds);
    requireReference(errors, `asset ${asset.id}.maintenanceOwner`, asset.maintenanceOwner, identityIds);
    if (!asset.telemetryProfile.enabled) {
      errors.push(`asset ${asset.id} must expose telemetry`);
    }
  }

  for (const funding of dataset.fundingRecords) {
    requireReference(errors, `funding ${funding.id}.projectId`, funding.projectId, projectIds);
    requireReference(errors, `funding ${funding.id}.assetId`, funding.assetId, assetIds);
    requireReference(errors, `funding ${funding.id}.issuerId`, funding.issuerId, identityIds);
    requireNonNegative(errors, `funding ${funding.id}.targetAmount`, funding.targetAmount);
    requireNonNegative(errors, `funding ${funding.id}.raisedAmount`, funding.raisedAmount);
    if (funding.treasuryExposureId) {
      requireReference(errors, `funding ${funding.id}.treasuryExposureId`, funding.treasuryExposureId, exposureIds);
    }
    if (funding.debentureId) {
      requireReference(errors, `funding ${funding.id}.debentureId`, funding.debentureId, debentureIds);
    }
  }

  for (const debenture of dataset.debentures) {
    requireReference(errors, `debenture ${debenture.id}.projectId`, debenture.projectId, projectIds);
    requireReference(errors, `debenture ${debenture.id}.assetId`, debenture.assetId, assetIds);
    requireReference(errors, `debenture ${debenture.id}.issuerId`, debenture.issuerId, identityIds);
    requireNonNegative(errors, `debenture ${debenture.id}.targetAmount`, debenture.targetAmount);
    requireNonNegative(errors, `debenture ${debenture.id}.raisedAmount`, debenture.raisedAmount);
  }

  for (const exposure of dataset.treasuryExposures) {
    requireReference(errors, `treasury exposure ${exposure.id}.projectId`, exposure.projectId, projectIds);
    requireReference(errors, `treasury exposure ${exposure.id}.assetId`, exposure.assetId, assetIds);
    requireNonNegative(errors, `treasury exposure ${exposure.id}.requestedAmount`, exposure.requestedAmount);
    requireNonNegative(errors, `treasury exposure ${exposure.id}.approvedAmount`, exposure.approvedAmount);
    requireNonNegative(errors, `treasury exposure ${exposure.id}.consumedAmount`, exposure.consumedAmount);
    if (!exposure.governanceReference.treasuryRestrictions.length) {
      errors.push(`treasury exposure ${exposure.id} must expose treasury restrictions`);
    }
  }

  for (const revenue of dataset.revenueRecords) {
    requireReference(errors, `revenue ${revenue.id}.projectId`, revenue.projectId, projectIds);
    requireReference(errors, `revenue ${revenue.id}.assetId`, revenue.assetId, assetIds);
    for (const [field, value] of Object.entries({
      grossAmount: revenue.grossAmount,
      netAmount: revenue.netAmount,
      treasuryShare: revenue.treasuryShare,
      daoShare: revenue.daoShare,
      builderShare: revenue.builderShare,
      maintainerShare: revenue.maintainerShare,
      debentureShare: revenue.debentureShare,
      reserveShare: revenue.reserveShare
    })) {
      requireNonNegative(errors, `revenue ${revenue.id}.${field}`, value);
    }
    const explicitRoutingTotal =
      revenue.treasuryShare +
      revenue.daoShare +
      revenue.builderShare +
      revenue.maintainerShare +
      revenue.debentureShare +
      revenue.reserveShare;
    if (explicitRoutingTotal !== revenue.netAmount) {
      errors.push(`revenue ${revenue.id} routing shares must equal netAmount`);
    }
  }

  for (const plugin of dataset.plugins) {
    requireReference(errors, `plugin ${plugin.id}.targetDaoId`, plugin.targetDaoId, identityIds);
    requireReference(errors, `plugin ${plugin.id}.projectId`, plugin.projectId, projectIds);
    requireReference(errors, `plugin ${plugin.id}.assetId`, plugin.assetId, assetIds);
    requireReference(errors, `plugin ${plugin.id}.fundingId`, plugin.fundingId, fundingIds);
    requireReference(errors, `plugin ${plugin.id}.maintenanceOwner`, plugin.maintenanceOwner, identityIds);
    if (plugin.executionScope !== "MOCK_ONLY" && plugin.executionScope !== "READ_ONLY" && plugin.executionScope !== "GOVERNANCE_REVIEW_REQUIRED") {
      errors.push(`plugin ${plugin.id} has invalid non-executive scope`);
    }
  }

  for (const runtime of dataset.acsRuntimes) {
    requireReference(errors, `acs runtime ${runtime.id}.ownerId`, runtime.ownerId, identityIds);
    requireReference(errors, `acs runtime ${runtime.id}.relatedProjectId`, runtime.relatedProjectId, projectIds);
    requireNonNegative(errors, `acs runtime ${runtime.id}.computeProfile.mockCpuUnits`, runtime.computeProfile.mockCpuUnits);
    requireNonNegative(errors, `acs runtime ${runtime.id}.computeProfile.mockMemoryMb`, runtime.computeProfile.mockMemoryMb);
    requireNonNegative(errors, `acs runtime ${runtime.id}.computeProfile.mockMonthlyBudget.amount`, runtime.computeProfile.mockMonthlyBudget.amount);
    if (!runtime.permissionProfile.includes("NO_EXECUTION") && !runtime.permissionProfile.includes("NO_PROVISIONING")) {
      errors.push(`acs runtime ${runtime.id} must declare a no-execution/no-provisioning boundary`);
    }
  }

  for (const receipt of dataset.acsReceipts) {
    requireReference(errors, `acs receipt ${receipt.id}.acsRuntimeId`, receipt.acsRuntimeId, acsRuntimeIds);
    requireReference(errors, `acs receipt ${receipt.id}.relatedProjectId`, receipt.relatedProjectId, projectIds);
    if (receipt.relatedAssetId) {
      requireReference(errors, `acs receipt ${receipt.id}.relatedAssetId`, receipt.relatedAssetId, assetIds);
    }
    if (receipt.relatedRequestId) {
      requireReference(errors, `acs receipt ${receipt.id}.relatedRequestId`, receipt.relatedRequestId, requestIds);
    }
  }

  for (const event of dataset.telemetryEvents) {
    if (event.relatedProjectId) {
      requireReference(errors, `telemetry ${event.id}.relatedProjectId`, event.relatedProjectId, projectIds);
    }
    if (event.relatedAssetId) {
      requireReference(errors, `telemetry ${event.id}.relatedAssetId`, event.relatedAssetId, assetIds);
    }
    if (event.relatedRequestId) {
      requireReference(errors, `telemetry ${event.id}.relatedRequestId`, event.relatedRequestId, requestIds);
    }
    if (!event.auditReference) {
      errors.push(`telemetry ${event.id} must expose auditReference`);
    }
  }

  return { valid: errors.length === 0, errors };
};

const nodeProcess = typeof process === "object" ? process : undefined;
const invokedAsValidatorCli = Array.isArray(nodeProcess?.argv) && nodeProcess.argv[1]?.endsWith("business.validators.js");

if (invokedAsValidatorCli) {
  const result = validateBusinessRuntimeDataset();
  if (!result.valid) {
    console.error(result.errors.join("\n"));
    nodeProcess.exit(1);
  }
  console.log("Business runtime mock validation passed.");
}
