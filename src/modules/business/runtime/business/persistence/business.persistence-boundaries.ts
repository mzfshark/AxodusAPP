import { BUSINESS_STORAGE_STRATEGY_OPTIONS, type BusinessPersistencePlan } from "./business.persistence-types.js";

export const BUSINESS_PERSISTENCE_BACKEND_CAN_PERSIST = [
  "draft records",
  "draft validation snapshots",
  "draft readiness snapshots",
  "draft submission receipts",
  "review queue records",
  "review decision records",
  "audit records",
  "identity snapshots",
  "permission snapshots",
  "capability snapshots",
  "governance readiness snapshots",
  "treasury exposure snapshots",
  "ACS readiness snapshots",
  "event timeline snapshots"
] as const;

export const BUSINESS_PERSISTENCE_BACKEND_CANNOT_EXECUTE = [
  "execute governance proposals",
  "move treasury funds",
  "issue debentures",
  "purchase debentures",
  "convert debentures",
  "distribute revenue",
  "provision ACS or MCP runtimes",
  "execute billing",
  "perform KYC",
  "store private keys",
  "store wallet secrets",
  "call contracts"
] as const;

export const BUSINESS_PERSISTENCE_NON_GOALS = [
  "no real database dependency",
  "no production migrations",
  "no real backend server",
  "no authentication or authorization implementation",
  "no governance execution",
  "no treasury movement",
  "no debenture issuance",
  "no ACS provisioning",
  "no billing execution",
  "no contract calls"
] as const;

export const BUSINESS_PERSISTENCE_PLAN: BusinessPersistencePlan = {
  repositories: [
    "BusinessDraftRepository",
    "BusinessSubmissionRepository",
    "BusinessReviewQueueRepository",
    "BusinessAuditRepository",
    "BusinessIdentitySnapshotRepository",
    "BusinessPermissionSnapshotRepository",
    "BusinessReadinessSnapshotRepository",
    "BusinessEventSnapshotRepository"
  ],
  entities: [
    "DRAFT_RECORD",
    "DRAFT_VALIDATION_SNAPSHOT",
    "DRAFT_READINESS_SNAPSHOT",
    "DRAFT_SUBMISSION_RECEIPT",
    "REVIEW_QUEUE_RECORD",
    "REVIEW_DECISION_RECORD",
    "AUDIT_RECORD",
    "IDENTITY_SNAPSHOT",
    "PERMISSION_SNAPSHOT",
    "CAPABILITY_SNAPSHOT",
    "GOVERNANCE_READINESS_SNAPSHOT",
    "TREASURY_EXPOSURE_SNAPSHOT",
    "ACS_READINESS_SNAPSHOT",
    "EVENT_TIMELINE_SNAPSHOT"
  ],
  storageOptions: BUSINESS_STORAGE_STRATEGY_OPTIONS,
  nonGoals: BUSINESS_PERSISTENCE_NON_GOALS,
  backendCanPersist: BUSINESS_PERSISTENCE_BACKEND_CAN_PERSIST,
  backendCannotExecute: BUSINESS_PERSISTENCE_BACKEND_CANNOT_EXECUTE,
  mock: true,
  readOnlyPlanning: true
};

export const getBusinessPersistencePlan = (): BusinessPersistencePlan => structuredClone(BUSINESS_PERSISTENCE_PLAN);

export const validateBusinessPersistenceBoundaries = () => {
  const forbiddenExecutionWords = ["execute governance", "move treasury", "issue debentures", "provision ACS", "call contracts"];
  const repositoryNames = BUSINESS_PERSISTENCE_PLAN.repositories;
  const repositoryNameLeak = repositoryNames.filter((name) =>
    forbiddenExecutionWords.some((word) => name.toLowerCase().includes(word))
  );

  return {
    valid: repositoryNameLeak.length === 0 && BUSINESS_PERSISTENCE_PLAN.mock === true && BUSINESS_PERSISTENCE_PLAN.readOnlyPlanning === true,
    repositoryNameLeak,
    storageOptions: BUSINESS_PERSISTENCE_PLAN.storageOptions.length,
    backendCannotExecute: BUSINESS_PERSISTENCE_PLAN.backendCannotExecute,
    mock: true,
    readOnlyPlanning: true
  };
};
