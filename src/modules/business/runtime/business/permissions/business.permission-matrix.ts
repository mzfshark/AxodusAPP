import { businessRuntimeMock } from "../data/business.mock.js";
import {
  BUSINESS_RUNTIME_ACTIONS,
  type BusinessRuntimeAction
} from "../policies/business.execution-policy.js";
import {
  getPermissionForAction,
  type BusinessPermissionDecision
} from "./business.permissions.js";

export interface BusinessPermissionMatrixEntry extends BusinessPermissionDecision {
  mock: true;
  readOnly: true;
}

export const getBusinessPermissionMatrix = (): BusinessPermissionMatrixEntry[] =>
  businessRuntimeMock.identities.flatMap((identity) =>
    BUSINESS_RUNTIME_ACTIONS.map((action: BusinessRuntimeAction) => ({
      ...getPermissionForAction(identity.id, action),
      mock: true as const,
      readOnly: true as const
    }))
  );

export const getPermissionMatrixSummary = () => {
  const matrix = getBusinessPermissionMatrix();
  return {
    totalDecisions: matrix.length,
    forbiddenDecisions: matrix.filter((entry) => entry.mode === "FORBIDDEN").length,
    blockedDecisions: matrix.filter((entry) => entry.mode === "BLOCKED").length,
    readOnly: matrix.every((entry) => entry.readOnly),
    mock: matrix.every((entry) => entry.mock)
  };
};
