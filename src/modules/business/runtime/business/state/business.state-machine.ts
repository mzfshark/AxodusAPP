import {
  ACSRuntimeStatus,
  AssetStatus,
  DebentureStatus,
  FundingStatus,
  PluginStatus,
  ProjectStatus,
  RequestStatus,
  RevenueStatus,
  TreasuryExposureStatus
} from "../types/business.enums.js";
import { evaluateBusinessTransitionGuards } from "./business.guards.js";
import { BUSINESS_TRANSITION_MAPS, type BusinessTransitionMap } from "./business.transitions.js";
import {
  createInvalidTransitionError,
  explainInvalidTransition as explainTransitionError,
  type BusinessStateMachineDomain,
  type BusinessTransitionError
} from "./business.transition-errors.js";

export interface BusinessTransitionDecision {
  domain: BusinessStateMachineDomain;
  entityId?: string;
  fromStatus: string;
  toStatus: string;
  allowed: boolean;
  allowedTargets: string[];
  guardResults: ReturnType<typeof evaluateBusinessTransitionGuards>;
  error?: BusinessTransitionError;
  mock: true;
  readOnly: true;
}

export interface BusinessTransitionSimulation<TRecord extends Record<string, unknown> = Record<string, unknown>> extends BusinessTransitionDecision {
  simulatedRecord?: TRecord;
  mutated: false;
}

const getAllowedTargets = <TStatus extends string>(transitionMap: BusinessTransitionMap<TStatus>, fromStatus: TStatus): readonly TStatus[] =>
  transitionMap[fromStatus] ?? [];

export const validateTransition = <TStatus extends string>(
  domain: BusinessStateMachineDomain,
  transitionMap: BusinessTransitionMap<TStatus>,
  fromStatus: TStatus,
  toStatus: TStatus,
  entityId?: string
): BusinessTransitionDecision => {
  const allowedTargets = getAllowedTargets(transitionMap, fromStatus);
  const guardResults = evaluateBusinessTransitionGuards({ domain, entityId, fromStatus, toStatus, mock: true, readOnly: true });
  const guardFailures = guardResults.filter((guard) => !guard.passed).map((guard) => guard.category);
  const transitionAllowed = allowedTargets.includes(toStatus);
  const allowed = transitionAllowed && guardFailures.length === 0;
  const error = allowed ? undefined : createInvalidTransitionError(domain, fromStatus, toStatus, allowedTargets, guardFailures);

  return {
    domain,
    entityId,
    fromStatus,
    toStatus,
    allowed,
    allowedTargets: [...allowedTargets],
    guardResults,
    error,
    mock: true,
    readOnly: true
  };
};

export const canTransitionRequestStatus = (fromStatus: RequestStatus, toStatus: RequestStatus): boolean =>
  validateTransition("REQUEST", BUSINESS_TRANSITION_MAPS.REQUEST, fromStatus, toStatus).allowed;

export const canTransitionProjectStatus = (fromStatus: ProjectStatus, toStatus: ProjectStatus): boolean =>
  validateTransition("PROJECT", BUSINESS_TRANSITION_MAPS.PROJECT, fromStatus, toStatus).allowed;

export const canTransitionAssetStatus = (fromStatus: AssetStatus, toStatus: AssetStatus): boolean =>
  validateTransition("ASSET", BUSINESS_TRANSITION_MAPS.ASSET, fromStatus, toStatus).allowed;

export const canTransitionFundingStatus = (fromStatus: FundingStatus, toStatus: FundingStatus): boolean =>
  validateTransition("FUNDING", BUSINESS_TRANSITION_MAPS.FUNDING, fromStatus, toStatus).allowed;

export const canTransitionDebentureStatus = (fromStatus: DebentureStatus, toStatus: DebentureStatus): boolean =>
  validateTransition("DEBENTURE", BUSINESS_TRANSITION_MAPS.DEBENTURE, fromStatus, toStatus).allowed;

export const canTransitionTreasuryExposureStatus = (fromStatus: TreasuryExposureStatus, toStatus: TreasuryExposureStatus): boolean =>
  validateTransition("TREASURY_EXPOSURE", BUSINESS_TRANSITION_MAPS.TREASURY_EXPOSURE, fromStatus, toStatus).allowed;

export const canTransitionACSRuntimeStatus = (fromStatus: ACSRuntimeStatus, toStatus: ACSRuntimeStatus): boolean =>
  validateTransition("ACS_RUNTIME", BUSINESS_TRANSITION_MAPS.ACS_RUNTIME, fromStatus, toStatus).allowed;

export const canTransitionRevenueStatus = (fromStatus: RevenueStatus, toStatus: RevenueStatus): boolean =>
  validateTransition("REVENUE", BUSINESS_TRANSITION_MAPS.REVENUE, fromStatus, toStatus).allowed;

export const canTransitionPluginStatus = (fromStatus: PluginStatus, toStatus: PluginStatus): boolean =>
  validateTransition("PLUGIN", BUSINESS_TRANSITION_MAPS.PLUGIN, fromStatus, toStatus).allowed;

export const explainInvalidTransition = (
  domain: BusinessStateMachineDomain,
  fromStatus: string,
  toStatus: string
): string => {
  const transitionMap = BUSINESS_TRANSITION_MAPS[domain];
  const decision = validateTransition(domain, transitionMap, fromStatus, toStatus);
  return decision.error ? explainTransitionError(decision.error) : `Transition ${domain}:${fromStatus}->${toStatus} is valid.`;
};

export const simulateTransition = <TRecord extends Record<string, unknown>>(
  domain: BusinessStateMachineDomain,
  record: TRecord,
  statusField: keyof TRecord,
  toStatus: string
): BusinessTransitionSimulation<TRecord> => {
  const fromStatus = String(record[statusField]);
  const transitionMap = BUSINESS_TRANSITION_MAPS[domain];
  const decision = validateTransition(domain, transitionMap, fromStatus, toStatus, typeof record.id === "string" ? record.id : undefined);

  return {
    ...decision,
    simulatedRecord: decision.allowed ? ({ ...record, [statusField]: toStatus } as TRecord) : undefined,
    mutated: false
  };
};
