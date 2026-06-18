import {
  createDebentureReadinessPackage,
  createFinancialHandoffReceipt,
  createFinancialReadinessPackage,
  createFundingReadinessPackage,
  createRevenueRoutingReadinessPackage,
  createTreasuryReadinessPackage,
  getFinancialBridgeBlockers,
  getFinancialBridgeStatus,
  getFinancialBridgeSummary,
  getFinancialRiskSnapshot,
  getSettlementReadinessSnapshot
} from "../financial-bridge/business.financial-bridge.js";
import type {
  BusinessDebentureReadinessPackage,
  BusinessFinancialBridgeBlocker,
  BusinessFinancialBridgePackage,
  BusinessFinancialBridgeStatus,
  BusinessFinancialBridgeSummary,
  BusinessFinancialHandoffReceipt,
  BusinessFinancialRiskSnapshot,
  BusinessFundingReadinessPackage,
  BusinessRevenueRoutingReadinessPackage,
  BusinessSettlementReadinessSnapshot,
  BusinessTreasuryReadinessPackage
} from "../financial-bridge/business.financial-bridge-types.js";
import type { BusinessId } from "../types/business.types.js";
import { createBusinessApiError } from "./business.api-errors.js";
import { businessApiResponse } from "./business.responses.js";
import type { BusinessApiResponse } from "./business.response.types.js";

const bridgePath = (suffix = ""): string => `/api/v1/business/finance/bridge${suffix}`;

const notFound = (entityId: BusinessId): BusinessApiResponse<null> =>
  businessApiResponse(null, {
    errors: [
      createBusinessApiError(
        "FINANCIAL_BRIDGE_ENTITY_NOT_FOUND",
        "Financial bridge entity was not found in draft store or Business registry.",
        "WARNING",
        { entityId },
        "Use a known draft, project, asset, funding, treasury exposure, debenture, revenue or request id."
      )
    ],
    links: { self: bridgePath(`/${entityId}`) },
    action: "PREPARE_FUNDING_REVIEW"
  });

export const getBusinessFinancialBridge = (): BusinessApiResponse<BusinessFinancialBridgeSummary> =>
  businessApiResponse(getFinancialBridgeSummary(), {
    links: { self: bridgePath() },
    action: "PREPARE_FUNDING_REVIEW"
  });

export const getBusinessFinancialBridgeSummary = (): BusinessApiResponse<BusinessFinancialBridgeSummary> =>
  businessApiResponse(getFinancialBridgeSummary(), {
    links: { self: bridgePath("/summary") },
    action: "PREPARE_FUNDING_REVIEW"
  });

export const getBusinessFinancialBridgeStatus = (entityId: BusinessId): BusinessApiResponse<{ entityId: BusinessId; status: BusinessFinancialBridgeStatus; mock: true; readOnly: true; simulationOnly: true; externalSideEffects: false } | null> => {
  const pkg = createFinancialReadinessPackage(entityId);
  if (!pkg) return notFound(entityId);
  return businessApiResponse(
    { entityId, status: getFinancialBridgeStatus(entityId), mock: true, readOnly: true, simulationOnly: true, externalSideEffects: false },
    { links: { self: bridgePath(`/${entityId}`) }, action: "PREPARE_FUNDING_REVIEW" }
  );
};

export const getBusinessFinancialReadinessPackage = (entityId: BusinessId): BusinessApiResponse<BusinessFinancialBridgePackage | null> => {
  const pkg = createFinancialReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(pkg, { links: { self: bridgePath(`/${entityId}`) }, action: "PREPARE_FUNDING_REVIEW" })
    : notFound(entityId);
};

export const getBusinessTreasuryReadinessPackage = (entityId: BusinessId): BusinessApiResponse<BusinessTreasuryReadinessPackage | null> => {
  const pkg = createTreasuryReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(pkg, { links: { self: bridgePath(`/${entityId}/treasury-package`) }, action: "PREPARE_FUNDING_REVIEW" })
    : notFound(entityId);
};

export const getBusinessFundingReadinessPackage = (entityId: BusinessId): BusinessApiResponse<BusinessFundingReadinessPackage | null> => {
  const pkg = createFundingReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(pkg, { links: { self: bridgePath(`/${entityId}/funding-package`) }, action: "PREPARE_FUNDING_REVIEW" })
    : notFound(entityId);
};

export const getBusinessDebentureReadinessPackage = (entityId: BusinessId): BusinessApiResponse<BusinessDebentureReadinessPackage | null> => {
  const pkg = createDebentureReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(pkg, { links: { self: bridgePath(`/${entityId}/debenture-package`) }, action: "PREPARE_DEBENTURE_DRAFT" })
    : notFound(entityId);
};

export const getBusinessRevenueRoutingReadinessPackage = (entityId: BusinessId): BusinessApiResponse<BusinessRevenueRoutingReadinessPackage | null> => {
  const pkg = createRevenueRoutingReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(pkg, { links: { self: bridgePath(`/${entityId}/revenue-package`) }, action: "VIEW_REVENUE_ROUTING" })
    : notFound(entityId);
};

export const getBusinessFinancialRiskSnapshot = (entityId: BusinessId): BusinessApiResponse<BusinessFinancialRiskSnapshot | null> => {
  const snapshot = getFinancialRiskSnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/risk-snapshot`) }, action: "PREPARE_FUNDING_REVIEW" })
    : notFound(entityId);
};

export const getBusinessSettlementReadinessSnapshot = (entityId: BusinessId): BusinessApiResponse<BusinessSettlementReadinessSnapshot | null> => {
  const snapshot = getSettlementReadinessSnapshot(entityId);
  return snapshot
    ? businessApiResponse(snapshot, { links: { self: bridgePath(`/${entityId}/settlement-readiness`) }, action: "VIEW_REVENUE_ROUTING" })
    : notFound(entityId);
};

export const getBusinessFinancialHandoffReceipt = (entityId: BusinessId): BusinessApiResponse<BusinessFinancialHandoffReceipt | null> => {
  const receipt = createFinancialHandoffReceipt(entityId);
  return receipt
    ? businessApiResponse(receipt, { links: { self: bridgePath(`/${entityId}/handoff-receipt`) }, action: "PREPARE_FUNDING_REVIEW" })
    : notFound(entityId);
};

export const getBusinessFinancialBridgeBlockers = (entityId: BusinessId): BusinessApiResponse<BusinessFinancialBridgeBlocker[] | null> => {
  const pkg = createFinancialReadinessPackage(entityId);
  return pkg
    ? businessApiResponse(getFinancialBridgeBlockers(entityId), { links: { self: bridgePath(`/${entityId}/blockers`) }, action: "PREPARE_FUNDING_REVIEW" })
    : notFound(entityId);
};
