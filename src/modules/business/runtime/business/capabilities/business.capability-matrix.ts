import { businessRuntimeMock } from "../data/business.mock.js";
import type { BusinessId } from "../types/business.types.js";
import {
  BUSINESS_CAPABILITIES,
  getCapabilitiesForIdentity,
  getCapabilitiesForProject,
  type BusinessCapability
} from "./business.capabilities.js";

export interface BusinessCapabilityMatrixEntry {
  subjectId: BusinessId;
  subjectType: "IDENTITY" | "PROJECT";
  capabilities: BusinessCapability[];
  mock: true;
  readOnly: true;
}

export const getBusinessCapabilityMatrix = (): BusinessCapabilityMatrixEntry[] => [
  ...businessRuntimeMock.identities.map((identity) => ({
    subjectId: identity.id,
    subjectType: "IDENTITY" as const,
    capabilities: getCapabilitiesForIdentity(identity.id),
    mock: true as const,
    readOnly: true as const
  })),
  ...businessRuntimeMock.projects.map((project) => ({
    subjectId: project.id,
    subjectType: "PROJECT" as const,
    capabilities: getCapabilitiesForProject(project.id),
    mock: true as const,
    readOnly: true as const
  }))
];

export const getCapabilityMatrixSummary = () => {
  const matrix = getBusinessCapabilityMatrix();
  return {
    totalSubjects: matrix.length,
    totalCapabilities: BUSINESS_CAPABILITIES.length,
    readOnly: matrix.every((entry) => entry.readOnly),
    mock: matrix.every((entry) => entry.mock)
  };
};
