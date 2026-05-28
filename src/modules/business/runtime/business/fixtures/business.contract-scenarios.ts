import { acsAdapter } from "../adapters/acs.adapter.js";
import { debentureAdapter } from "../adapters/debenture.adapter.js";
import { financialAdapter } from "../adapters/financial.adapter.js";
import { governanceAdapter } from "../adapters/governance.adapter.js";
import { treasuryAdapter } from "../adapters/treasury.adapter.js";
import { explainCapabilityDenial, getCapabilitiesForIdentity } from "../capabilities/business.capabilities.js";
import { explainPermissionDecision } from "../permissions/business.permissions.js";
import { getExecutionPolicy } from "../policies/business.execution-policy.js";

export const businessContractScenarios = {
  treasuryRiskScenario: {
    id: "scenario-treasury-risk",
    projectId: "proj-dex-country",
    riskTier: "TIER_2_ECOSYSTEM_STRATEGIC",
    fundingRestrictions: treasuryAdapter.getTreasuryRestrictions("proj-dex-country"),
    governanceRequirement: governanceAdapter.requiresGovernanceApproval("PREPARE_FUNDING_REVIEW"),
    treasuryApprovalRequirement: getExecutionPolicy("PREPARE_FUNDING_REVIEW"),
    allocationDecision: treasuryAdapter.canAllocateTreasury("proj-dex-country", 100000)
  },
  daoPluginReviewScenario: {
    id: "scenario-dao-plugin-review",
    identityId: "id-harmony-dao",
    projectId: "proj-harmony-rp-voting",
    pluginId: "plugin-harmony-rp-voting",
    capabilities: getCapabilitiesForIdentity("id-harmony-dao"),
    governanceDecision: governanceAdapter.canProceedUnderGovernance("proj-harmony-rp-voting", "PREPARE_GOVERNANCE_REVIEW"),
    fundingContext: financialAdapter.getFundingStatus("proj-harmony-rp-voting")
  },
  acsIsolationScenario: {
    id: "scenario-acs-isolation",
    identityId: "id-enterprise-sample",
    projectId: "proj-enterprise-acs",
    runtimeId: "acs-enterprise-sample",
    isolationProfile: acsAdapter.getACSIsolationProfile("acs-enterprise-sample"),
    permissionProfile: acsAdapter.getACSPermissionProfile("acs-enterprise-sample"),
    humanReviewRequirement: acsAdapter.requiresHumanReview("PREPARE_ACS_PROVISIONING_REQUEST")
  },
  debenturePlanningScenario: {
    id: "scenario-debenture-planning",
    projectId: "proj-dex-country",
    debentureId: "deb-dex-country",
    eligibility: debentureAdapter.getDebentureEligibility("proj-dex-country"),
    fundingProgress: debentureAdapter.getDebentureFundingProgress("deb-dex-country"),
    issuanceDecision: debentureAdapter.canIssueDebenture("proj-dex-country"),
    executionPolicy: getExecutionPolicy("ISSUE_DEBENTURE")
  },
  revenueRoutingScenario: {
    id: "scenario-revenue-routing",
    assetId: "asset-dex-country",
    routingPolicy: financialAdapter.getRevenueRouting("asset-dex-country"),
    executionPolicy: getExecutionPolicy("DISTRIBUTE_REVENUE")
  },
  governanceRestrictionScenario: {
    id: "scenario-governance-restriction",
    identityId: "id-enterprise-sample",
    projectId: "proj-enterprise-acs",
    capabilityDenial: explainCapabilityDenial("id-enterprise-sample", "REQUEST_DEBENTURE_FUNDING"),
    permissionDenial: explainPermissionDecision("id-enterprise-sample", "ISSUE_DEBENTURE"),
    executionPolicy: getExecutionPolicy("ISSUE_DEBENTURE")
  }
} as const;

export const listBusinessContractScenarios = () => structuredClone(businessContractScenarios);
