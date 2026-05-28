import {
  createACSHandoffReceipt,
  createACSProvisioningPlan,
  createACSReadinessPackage,
  getACSBridgeBlockers,
  getACSBridgeStatus,
  getACSBridgeSummary,
  getACSComputeSnapshot,
  getACSHumanReviewSnapshot,
  getACSIsolationSnapshot,
  getACSPermissionSnapshot
} from "../acs-bridge/business.acs-bridge.js";
import type {
  BusinessACSBridgeBlocker,
  BusinessACSBridgeStatus,
  BusinessACSBridgeSummary,
  BusinessACSComputeSnapshot,
  BusinessACSHandoffReceipt,
  BusinessACSHumanReviewSnapshot,
  BusinessACSIsolationSnapshot,
  BusinessACSPermissionSnapshot,
  BusinessACSProvisioningPlan,
  BusinessACSReadinessPackage
} from "../acs-bridge/business.acs-bridge-types.js";
import type { BusinessId } from "../types/business.types.js";
import { createBusinessApiError } from "./business.api-errors.js";
import { businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse } from "./business.response.types.js";

const bridgePath = (suffix = ""): string => `/api/v1/business/acs/bridge${suffix}`;

const notFound = (entityId: BusinessId): BusinessApiResponse<null> =>
  businessApiResponse(null, {
    errors: [
      createBusinessApiError(
        "ACS_BRIDGE_ENTITY_NOT_FOUND",
        "ACS bridge entity was not found in draft store or Business registry.",
        "WARNING",
        { entityId },
        "Use a known draft, project, asset, request or ACS runtime id."
      )
    ],
    links: { self: bridgePath(`/${entityId}`) },
    action: "PREPARE_ACS_PROVISIONING_REQUEST"
  });

export const getBusinessACSBridge = (): BusinessApiResponse<BusinessACSBridgeSummary> =>
  businessApiResponse(getACSBridgeSummary(), {
    links: { self: bridgePath() },
    action: "PREPARE_ACS_PROVISIONING_REQUEST"
  });

export const getBusinessACSBridgeSummary = (): BusinessApiResponse<BusinessACSBridgeSummary> =>
  businessApiResponse(getACSBridgeSummary(), {
    links: { self: bridgePath("/summary") },
    action: "PREPARE_ACS_PROVISIONING_REQUEST"
  });

export const getBusinessACSBridgeStatus = (entityId: BusinessId): BusinessApiResponse<{ entityId: BusinessId; status: BusinessACSBridgeStatus; mock: true; readOnly: true; simulationOnly: true; externalSideEffects: false } | null> => {
  const pkg = createACSReadinessPackage(entityId);
  if (!pkg) return notFound(entityId);
  return businessApiResponse(
    { entityId, status: getACSBridgeStatus(entityId), mock: true, readOnly: true, simulationOnly: true, externalSideEffects: false },
    { links: { self: bridgePath(`/${entityId}`) }, action: "PREPARE_ACS_PROVISIONING_REQUEST" }
  );
};

export const getBusinessACSReadinessPackage = (entityId: BusinessId): BusinessApiResponse<BusinessACSReadinessPackage | null> => {
  const pkg = createACSReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(pkg, { links: { self: bridgePath(`/${entityId}/readiness-package`) }, action: "PREPARE_ACS_PROVISIONING_REQUEST" })
    : notFound(entityId);
};

export const getBusinessACSProvisioningPlan = (entityId: BusinessId): BusinessApiResponse<BusinessACSProvisioningPlan | null> => {
  const plan = createACSProvisioningPlan(entityId);
  return plan
    ? businessApiResponse(plan, { links: { self: bridgePath(`/${entityId}/provisioning-plan`) }, action: "PREPARE_ACS_PROVISIONING_REQUEST" })
    : notFound(entityId);
};

export const getBusinessACSIsolationBridgeSnapshot = (entityId: BusinessId): BusinessApiResponse<BusinessACSIsolationSnapshot | null> => {
  const snapshot = getACSIsolationSnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/isolation`) }, action: "VIEW_ACS_RUNTIME" })
    : notFound(entityId);
};

export const getBusinessACSPermissionBridgeSnapshot = (entityId: BusinessId): BusinessApiResponse<BusinessACSPermissionSnapshot | null> => {
  const snapshot = getACSPermissionSnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/permissions`) }, action: "VIEW_ACS_RUNTIME" })
    : notFound(entityId);
};

export const getBusinessACSComputeBridgeSnapshot = (entityId: BusinessId): BusinessApiResponse<BusinessACSComputeSnapshot | null> => {
  const snapshot = getACSComputeSnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/compute`) }, action: "VIEW_ACS_RUNTIME" })
    : notFound(entityId);
};

export const getBusinessACSHumanReviewBridgeSnapshot = (entityId: BusinessId): BusinessApiResponse<BusinessACSHumanReviewSnapshot | null> => {
  const snapshot = getACSHumanReviewSnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/human-review`) }, action: "PREPARE_ACS_PROVISIONING_REQUEST" })
    : notFound(entityId);
};

export const getBusinessACSHandoffReceipt = (entityId: BusinessId): BusinessApiResponse<BusinessACSHandoffReceipt | null> => {
  const receipt = createACSHandoffReceipt(entityId);
  return receipt
    ? businessApiResponse(receipt, { links: { self: bridgePath(`/${entityId}/handoff-receipt`) }, action: "PREPARE_ACS_PROVISIONING_REQUEST" })
    : notFound(entityId);
};

export const getBusinessACSBridgeBlockers = (entityId: BusinessId): BusinessApiResponse<BusinessACSBridgeBlocker[] | null> => {
  const pkg = createACSReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(getACSBridgeBlockers(entityId), { links: { self: bridgePath(`/${entityId}/blockers`) }, action: "PREPARE_ACS_PROVISIONING_REQUEST" })
    : notFound(entityId);
};
