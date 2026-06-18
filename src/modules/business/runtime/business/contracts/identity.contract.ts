import type { BusinessId, BusinessIdentity } from "../types/business.types.js";
import type { FederationLevel, VerificationLevel } from "../types/business.enums.js";

export type IdentityVerificationStatus = VerificationLevel | "UNKNOWN_IDENTITY";

export interface FederationEligibility {
  identityId: BusinessId;
  level?: FederationLevel;
  eligible: boolean;
  reason: string;
}

export interface TreasuryEligibility {
  identityId: BusinessId;
  eligible: boolean;
  reason: string;
}

export interface IdentityDebentureEligibility {
  identityId: BusinessId;
  eligible: boolean;
  reason: string;
}

export interface ACSEligibility {
  identityId: BusinessId;
  eligible: boolean;
  reason: string;
}

export interface OperationalIdentityProfile {
  identity: BusinessIdentity;
  federationEligible: FederationEligibility;
  treasuryEligible: TreasuryEligibility;
  debentureEligible: IdentityDebentureEligibility;
  acsEligible: ACSEligibility;
}

export interface BusinessIdentityAdapterContract {
  readonly mock: true;
  readonly readOnly: true;
  getBusinessIdentity(identityId: BusinessId): BusinessIdentity | undefined;
  getRequesterIdentity(requesterId: BusinessId): BusinessIdentity | undefined;
  getDAOIdentity(daoId: BusinessId): BusinessIdentity | undefined;
  getEnterpriseIdentity(enterpriseId: BusinessId): BusinessIdentity | undefined;
  getVerificationLevel(identityId: BusinessId): IdentityVerificationStatus;
  getFederationLevel(identityId: BusinessId): FederationLevel | "UNKNOWN_IDENTITY";
  isTreasuryEligible(identityId: BusinessId): TreasuryEligibility;
  isDebentureEligible(identityId: BusinessId): IdentityDebentureEligibility;
  isACSEligible(identityId: BusinessId): ACSEligibility;
  getOperationalIdentityProfile(identityId: BusinessId): OperationalIdentityProfile | undefined;
}
