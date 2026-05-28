import { businessRuntimeMock } from "../data/business.mock.js";
import type {
  ACSEligibility,
  BusinessIdentityAdapterContract,
  IdentityDebentureEligibility,
  FederationEligibility,
  OperationalIdentityProfile,
  TreasuryEligibility
} from "../contracts/identity.contract.js";
import { FederationLevel, IdentityType, VerificationLevel } from "../types/business.enums.js";
import type { BusinessId, BusinessIdentity } from "../types/business.types.js";

const findIdentity = (identityId: BusinessId): BusinessIdentity | undefined =>
  businessRuntimeMock.identities.find((record) => record.id === identityId);

const treasuryEligibleLevels = new Set<VerificationLevel>([
  VerificationLevel.TREASURY_ELIGIBLE,
  VerificationLevel.FEDERATION_APPROVED
]);

export const identityAdapter = {
  mock: true,
  readOnly: true,

  getBusinessIdentity(identityId: BusinessId): BusinessIdentity | undefined {
    return structuredClone(findIdentity(identityId));
  },

  getRequesterIdentity(requesterId: BusinessId): BusinessIdentity | undefined {
    const identity = findIdentity(requesterId);
    return identity?.identityType === IdentityType.REQUESTER ? structuredClone(identity) : undefined;
  },

  getDAOIdentity(daoId: BusinessId): BusinessIdentity | undefined {
    const identity = findIdentity(daoId);
    return identity?.identityType === IdentityType.DAO ? structuredClone(identity) : undefined;
  },

  getEnterpriseIdentity(enterpriseId: BusinessId): BusinessIdentity | undefined {
    const identity = findIdentity(enterpriseId);
    return identity?.identityType === IdentityType.ENTERPRISE ? structuredClone(identity) : undefined;
  },

  getVerificationLevel(identityId: BusinessId): VerificationLevel | "UNKNOWN_IDENTITY" {
    return findIdentity(identityId)?.verificationLevel ?? "UNKNOWN_IDENTITY";
  },

  getFederationLevel(identityId: BusinessId): FederationLevel | "UNKNOWN_IDENTITY" {
    return findIdentity(identityId)?.federationLevel ?? "UNKNOWN_IDENTITY";
  },

  isTreasuryEligible(identityId: BusinessId): TreasuryEligibility {
    const identity = findIdentity(identityId);
    const eligible = Boolean(identity && treasuryEligibleLevels.has(identity.verificationLevel));
    return {
      identityId,
      eligible,
      reason: eligible ? "Identity has mock treasury eligibility." : "Identity is not treasury eligible in mock profile."
    };
  },

  isDebentureEligible(identityId: BusinessId): IdentityDebentureEligibility {
    const treasuryEligibility = this.isTreasuryEligible(identityId);
    return {
      identityId,
      eligible: treasuryEligibility.eligible,
      reason: treasuryEligibility.eligible ? "Identity may prepare debenture drafts only." : "Identity cannot prepare debenture drafts."
    };
  },

  isACSEligible(identityId: BusinessId): ACSEligibility {
    const identity = findIdentity(identityId);
    const eligible = Boolean(identity && identity.identityType !== IdentityType.AGENT);
    return {
      identityId,
      eligible,
      reason: eligible ? "Identity can request ACS review only." : "Agent identities cannot request ACS provisioning."
    };
  },

  getOperationalIdentityProfile(identityId: BusinessId): OperationalIdentityProfile | undefined {
    const identity = this.getBusinessIdentity(identityId);
    if (!identity) return undefined;

    const federationEligible: FederationEligibility = {
      identityId,
      level: identity.federationLevel,
      eligible: identity.federationLevel !== FederationLevel.LEVEL_0_EXTERNAL_REQUESTER,
      reason: identity.federationLevel === FederationLevel.LEVEL_0_EXTERNAL_REQUESTER ? "Identity is not federated." : "Identity has federation context."
    };

    return {
      identity,
      federationEligible,
      treasuryEligible: this.isTreasuryEligible(identityId),
      debentureEligible: this.isDebentureEligible(identityId),
      acsEligible: this.isACSEligible(identityId)
    };
  }
} satisfies BusinessIdentityAdapterContract;
