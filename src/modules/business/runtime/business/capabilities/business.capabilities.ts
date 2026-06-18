import { businessRuntimeMock } from "../data/business.mock.js";
import { FederationLevel, IdentityType, RiskTier, VerificationLevel } from "../types/business.enums.js";
import type { BusinessId } from "../types/business.types.js";
import type { BusinessRuntimeAction } from "../policies/business.execution-policy.js";

export const BUSINESS_CAPABILITIES = [
  "SUBMIT_BUSINESS_REQUEST",
  "REQUEST_PRIVATE_DEVELOPMENT",
  "REQUEST_DAO_PLUGIN",
  "REQUEST_ACS_SERVICE",
  "REQUEST_TREASURY_SPONSORSHIP",
  "REQUEST_DEBENTURE_FUNDING",
  "VIEW_TREASURY_EXPOSURE",
  "VIEW_REVENUE_ROUTING",
  "VIEW_ACS_RUNTIME",
  "VIEW_TELEMETRY",
  "VIEW_GOVERNANCE_REFERENCES",
  "PREPARE_PROJECT_FOR_GOVERNANCE",
  "PREPARE_PROJECT_FOR_FUNDING",
  "PREPARE_DEBENTURE_DRAFT",
  "PREPARE_ASSET_REGISTRATION"
] as const;

export type BusinessCapability = (typeof BUSINESS_CAPABILITIES)[number];

export interface BusinessCapabilityDecision {
  identityId: BusinessId;
  capability: BusinessCapability;
  allowed: boolean;
  reason: string;
}

const baseViewCapabilities: BusinessCapability[] = [
  "VIEW_TREASURY_EXPOSURE",
  "VIEW_REVENUE_ROUTING",
  "VIEW_ACS_RUNTIME",
  "VIEW_TELEMETRY",
  "VIEW_GOVERNANCE_REFERENCES"
];

const federationRank: Record<FederationLevel, number> = {
  [FederationLevel.LEVEL_0_EXTERNAL_REQUESTER]: 0,
  [FederationLevel.LEVEL_1_VERIFIED_REQUESTER]: 1,
  [FederationLevel.LEVEL_2_OPERATIONAL_PARTNER]: 2,
  [FederationLevel.LEVEL_3_FEDERATED_DAO]: 3,
  [FederationLevel.LEVEL_4_CONSTITUTIONAL_DAO]: 4,
  [FederationLevel.LEVEL_5_AXODUS_NATIVE_ENTITY]: 5
};

const verifiedLevels = new Set<VerificationLevel>([
  VerificationLevel.BASIC_VERIFIED,
  VerificationLevel.OPERATIONAL_VERIFIED,
  VerificationLevel.GOVERNANCE_VERIFIED,
  VerificationLevel.TREASURY_ELIGIBLE,
  VerificationLevel.FEDERATION_APPROVED
]);

const unique = <T>(values: T[]): T[] => [...new Set(values)];

export const getCapabilitiesForIdentity = (identityId: BusinessId): BusinessCapability[] => {
  const identity = businessRuntimeMock.identities.find((record) => record.id === identityId);
  if (!identity) {
    return [];
  }

  const capabilities: BusinessCapability[] = verifiedLevels.has(identity.verificationLevel)
    ? ["SUBMIT_BUSINESS_REQUEST", ...baseViewCapabilities]
    : ["VIEW_TELEMETRY"];

  if (identity.identityType === IdentityType.DAO) {
    capabilities.push("REQUEST_DAO_PLUGIN", "PREPARE_PROJECT_FOR_GOVERNANCE");
  }

  if (identity.identityType === IdentityType.ENTERPRISE) {
    capabilities.push("REQUEST_PRIVATE_DEVELOPMENT", "REQUEST_ACS_SERVICE");
  }

  if (federationRank[identity.federationLevel] >= 2) {
    capabilities.push("PREPARE_ASSET_REGISTRATION", "PREPARE_PROJECT_FOR_FUNDING");
  }

  if (identity.verificationLevel === VerificationLevel.TREASURY_ELIGIBLE || identity.verificationLevel === VerificationLevel.FEDERATION_APPROVED) {
    capabilities.push("REQUEST_TREASURY_SPONSORSHIP", "REQUEST_DEBENTURE_FUNDING", "PREPARE_DEBENTURE_DRAFT");
  }

  return unique(capabilities);
};

export const getCapabilitiesForProject = (projectId: BusinessId): BusinessCapability[] => {
  const project = businessRuntimeMock.projects.find((record) => record.id === projectId);
  if (!project) {
    return [];
  }

  const capabilities = getCapabilitiesForIdentity(project.ownerId);

  if (project.riskTier === RiskTier.TIER_1_CRITICAL_INFRASTRUCTURE || project.governanceReference.constitutionalCompatibility === "REVIEW_REQUIRED") {
    capabilities.push("PREPARE_PROJECT_FOR_GOVERNANCE");
  }

  if (project.riskTier !== RiskTier.TIER_5_VENTURE_RISK) {
    capabilities.push("PREPARE_PROJECT_FOR_FUNDING");
  }

  return unique(capabilities);
};

export const hasCapability = (identityId: BusinessId, capability: BusinessCapability): boolean =>
  getCapabilitiesForIdentity(identityId).includes(capability);

export const explainCapabilityDenial = (identityId: BusinessId, capability: BusinessCapability): BusinessCapabilityDecision => {
  const identity = businessRuntimeMock.identities.find((record) => record.id === identityId);
  const allowed = hasCapability(identityId, capability);

  return {
    identityId,
    capability,
    allowed,
    reason: allowed
      ? "Capability is available in mock/read-only runtime."
      : identity
        ? `Capability ${capability} is unavailable for ${identity.identityType} at ${identity.verificationLevel}.`
        : "Identity was not found in Business mock runtime."
  };
};

export const getRequiredCapabilitiesForAction = (action: BusinessRuntimeAction): BusinessCapability[] => {
  const mapping: Record<BusinessRuntimeAction, BusinessCapability[]> = {
    CREATE_BUSINESS_REQUEST: ["SUBMIT_BUSINESS_REQUEST"],
    CLASSIFY_REQUEST: ["SUBMIT_BUSINESS_REQUEST"],
    PREPARE_GOVERNANCE_REVIEW: ["PREPARE_PROJECT_FOR_GOVERNANCE", "VIEW_GOVERNANCE_REFERENCES"],
    PREPARE_FUNDING_REVIEW: ["PREPARE_PROJECT_FOR_FUNDING", "VIEW_TREASURY_EXPOSURE"],
    PREPARE_DEBENTURE_DRAFT: ["REQUEST_DEBENTURE_FUNDING", "PREPARE_DEBENTURE_DRAFT"],
    PREPARE_ACS_PROVISIONING_REQUEST: ["REQUEST_ACS_SERVICE", "VIEW_ACS_RUNTIME"],
    REGISTER_OPERATIONAL_ASSET_DRAFT: ["PREPARE_ASSET_REGISTRATION"],
    VIEW_TREASURY_EXPOSURE: ["VIEW_TREASURY_EXPOSURE"],
    VIEW_REVENUE_ROUTING: ["VIEW_REVENUE_ROUTING"],
    VIEW_ACS_RUNTIME: ["VIEW_ACS_RUNTIME"],
    VIEW_GOVERNANCE_REFERENCES: ["VIEW_GOVERNANCE_REFERENCES"],
    VIEW_TELEMETRY: ["VIEW_TELEMETRY"],
    SIMULATE_LIFECYCLE_TRANSITION: ["VIEW_TELEMETRY"],
    EXECUTE_GOVERNANCE_PROPOSAL: ["PREPARE_PROJECT_FOR_GOVERNANCE"],
    MOVE_TREASURY_FUNDS: ["VIEW_TREASURY_EXPOSURE"],
    ISSUE_DEBENTURE: ["PREPARE_DEBENTURE_DRAFT"],
    DISTRIBUTE_REVENUE: ["VIEW_REVENUE_ROUTING"],
    PROVISION_ACS_RUNTIME: ["REQUEST_ACS_SERVICE"],
    CALL_CONTRACT: ["VIEW_GOVERNANCE_REFERENCES"]
  };

  return mapping[action];
};
