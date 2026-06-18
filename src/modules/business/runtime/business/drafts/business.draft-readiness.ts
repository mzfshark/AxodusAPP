import { identityAdapter } from "../adapters/identity.adapter.js";
import { validateBusinessContractHardening } from "../security/business.security-validators.js";
import type { BusinessId } from "../types/business.types.js";
import { getDraftStoreRecordById } from "./business.draft-store.js";
import type {
  BusinessDraftReadinessCategory,
  BusinessDraftReadinessCategoryReview,
  BusinessDraftReadinessReview,
  BusinessDraftStoreRecord
} from "./business.draft-types.js";

const disabledFutureActions = [
  "Submit to governance",
  "Approve treasury allocation",
  "Issue debenture",
  "Purchase debenture",
  "Distribute revenue",
  "Provision ACS/MCP",
  "Deploy agent",
  "Call contract",
  "Persist to backend"
];

const category = (
  categoryName: BusinessDraftReadinessCategory,
  ready: boolean,
  score: number,
  blockers: string[],
  warnings: string[],
  detail: string
): BusinessDraftReadinessCategoryReview => ({
  category: categoryName,
  ready,
  score: Math.max(0, Math.min(100, Math.round(score))),
  blockers,
  warnings,
  detail
});

const resolveIdentityId = (record: BusinessDraftStoreRecord): BusinessId =>
  record.draft.requesterIdentityId ?? String(record.draft.values.requesterIdentity ?? record.draft.values.daoIdentity ?? "id-axodus-core");

const unique = (items: string[]): string[] => [...new Set(items.filter(Boolean))];

const requiredReviewsFor = (record: BusinessDraftStoreRecord): string[] => {
  const review = record.preview.runtimeReview;
  return unique([
    review.governanceRequirement ? "GOVERNANCE_REVIEW" : "",
    review.treasuryRequirement ? "TREASURY_REVIEW" : "",
    review.acsRequirement ? "ACS_REVIEW" : "",
    review.executionReview.policy.humanReviewRequired ? "HUMAN_REVIEW" : "",
    review.telemetryRequirement ? "TELEMETRY_REVIEW" : "",
    review.permissionReview.decision.allowed ? "" : "PERMISSION_REVIEW"
  ]);
};

const nextStepFor = (blockers: string[], requiredReviews: string[], validationValid: boolean): string => {
  if (blockers.length > 0) return "Resolve blocking issues before any future review queue.";
  if (!validationValid) return "Complete structural validation before readiness review.";
  if (requiredReviews.length > 0) return `Prepare for ${requiredReviews.join(", ")}.`;
  return "Ready for future Business review queue when a real backend and approval flow exist.";
};

const buildReadinessReview = (record: BusinessDraftStoreRecord): BusinessDraftReadinessReview => {
  const validation = record.validation;
  const runtimeReview = record.preview.runtimeReview;
  const identityId = resolveIdentityId(record);
  const identityProfile = identityAdapter.getOperationalIdentityProfile(identityId);
  const security = validateBusinessContractHardening();

  const blockingValidationIssues = validation.issues.filter((issue) => issue.blocking);
  const nonBlockingValidationIssues = validation.issues.filter((issue) => !issue.blocking);
  const structural = category(
    "STRUCTURAL_READINESS",
    validation.valid,
    validation.valid ? 100 : Math.max(0, 100 - blockingValidationIssues.length * 25 - validation.missingFields.length * 15),
    blockingValidationIssues.map((issue) => issue.message),
    nonBlockingValidationIssues.map((issue) => issue.message),
    "Required fields and draft-only language are validated by the runtime."
  );

  const governanceWarnings = runtimeReview.governanceRequirement ? ["Governance review is required before future progression."] : [];
  const governance = category(
    "GOVERNANCE_READINESS",
    true,
    runtimeReview.governanceRequirement ? 80 : 100,
    [],
    governanceWarnings,
    runtimeReview.governanceRequirement ? "Governance context is required for a future review queue." : "No governance review is currently required by the draft template."
  );

  const treasuryBlockers = runtimeReview.treasuryRequirement && !identityProfile?.treasuryEligible.eligible
    ? [identityProfile?.treasuryEligible.reason ?? "Identity is not treasury eligible."]
    : [];
  const treasury = category(
    "TREASURY_READINESS",
    treasuryBlockers.length === 0,
    treasuryBlockers.length ? 40 : runtimeReview.treasuryRequirement ? 75 : 100,
    treasuryBlockers,
    runtimeReview.treasuryRequirement ? ["Treasury review is required before any allocation can exist."] : [],
    runtimeReview.treasuryRequirement ? "Treasury exposure remains visible and non-executable." : "No treasury review is required by this draft."
  );

  const acsBlockers = runtimeReview.acsRequirement && !identityProfile?.acsEligible.eligible
    ? [identityProfile?.acsEligible.reason ?? "Identity is not ACS eligible."]
    : [];
  const acs = category(
    "ACS_READINESS",
    acsBlockers.length === 0,
    acsBlockers.length ? 40 : runtimeReview.acsRequirement ? 80 : 100,
    acsBlockers,
    runtimeReview.acsRequirement ? ["ACS review is required; provisioning remains disabled."] : [],
    runtimeReview.acsRequirement ? "ACS isolation and permission scope must remain review-only." : "No ACS review is required by this draft."
  );

  const identityBlockers = identityProfile ? [] : [`Identity ${identityId} was not found in the mock identity registry.`];
  const identity = category(
    "IDENTITY_READINESS",
    identityBlockers.length === 0,
    identityBlockers.length ? 0 : identityProfile?.federationEligible.eligible ? 100 : 70,
    identityBlockers,
    identityProfile && !identityProfile.federationEligible.eligible ? [identityProfile.federationEligible.reason] : [],
    "Identity readiness is derived from mock verification, federation and eligibility contracts."
  );

  const fundingWarnings = runtimeReview.inferredFundingModel ? [`Funding model inferred as ${runtimeReview.inferredFundingModel}.`] : [];
  const funding = category(
    "FUNDING_READINESS",
    true,
    runtimeReview.treasuryRequirement ? 80 : 100,
    [],
    fundingWarnings,
    "Funding readiness is preparatory only and cannot move funds, issue instruments or bill."
  );

  const securityBlockers = security.valid && runtimeReview.executionReview.executable === false ? [] : [...security.errors, "Execution policy must remain non-executable."];
  const securityReview = category(
    "SECURITY_READINESS",
    securityBlockers.length === 0,
    securityBlockers.length ? 0 : 100,
    securityBlockers,
    security.warnings,
    "Security validators and execution policy must preserve mock/read-only runtime guarantees."
  );

  const telemetryWarnings = runtimeReview.telemetryRequirement && !record.draft.values.telemetryRequirements
    ? ["Telemetry requirements should be described before a future review queue."]
    : [];
  const telemetry = category(
    "TELEMETRY_READINESS",
    true,
    telemetryWarnings.length ? 80 : 100,
    [],
    telemetryWarnings,
    "Telemetry readiness confirms the draft exposes observability expectations."
  );

  const categories = [structural, governance, treasury, acs, identity, funding, securityReview, telemetry];
  const blockers = categories.flatMap((entry) => entry.blockers);
  const warnings = categories.flatMap((entry) => entry.warnings);
  const requiredReviews = requiredReviewsFor(record);
  const readinessScore = Math.round(categories.reduce((total, entry) => total + entry.score, 0) / categories.length);

  return {
    draftId: record.id,
    draftType: record.draft.draftType,
    title: record.title,
    readinessScore,
    categories,
    blockers,
    warnings,
    requiredReviews,
    nextRecommendedStep: nextStepFor(blockers, requiredReviews, validation.valid),
    disabledFutureActions,
    validation,
    runtimeReview,
    mock: true,
    readOnly: true
  };
};

export const getBusinessDraftReadinessReview = (draftId: BusinessId): BusinessDraftReadinessReview | undefined => {
  const record = getDraftStoreRecordById(draftId);
  if (!record || record.status === "DISCARDED") return undefined;
  return buildReadinessReview(record);
};

export const getBusinessDraftReadinessScore = (draftId: BusinessId): number | undefined =>
  getBusinessDraftReadinessReview(draftId)?.readinessScore;

export const getBusinessDraftBlockingIssues = (draftId: BusinessId): string[] =>
  getBusinessDraftReadinessReview(draftId)?.blockers ?? [];

export const getBusinessDraftNextRecommendedStep = (draftId: BusinessId): string | undefined =>
  getBusinessDraftReadinessReview(draftId)?.nextRecommendedStep;
