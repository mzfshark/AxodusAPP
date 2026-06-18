import type { BusinessStateMachineDomain } from "./business.transition-errors.js";

export const BUSINESS_TRANSITION_GUARD_CATEGORIES = [
  "governance",
  "treasury",
  "acs",
  "identity",
  "funding",
  "telemetry",
  "security"
] as const;

export type BusinessTransitionGuardCategory = (typeof BUSINESS_TRANSITION_GUARD_CATEGORIES)[number];

export interface BusinessTransitionGuardContext {
  domain: BusinessStateMachineDomain;
  entityId?: string;
  fromStatus: string;
  toStatus: string;
  mock: true;
  readOnly: true;
}

export interface BusinessTransitionGuardResult {
  category: BusinessTransitionGuardCategory;
  passed: boolean;
  required: boolean;
  reason: string;
}

const createPassingGuard = (
  category: BusinessTransitionGuardCategory,
  context: BusinessTransitionGuardContext
): BusinessTransitionGuardResult => ({
  category,
  passed: true,
  required: true,
  reason: `${category} guard placeholder passed for ${context.domain}:${context.fromStatus}->${context.toStatus} in mock/read-only runtime.`
});

export const evaluateBusinessTransitionGuards = (context: BusinessTransitionGuardContext): BusinessTransitionGuardResult[] =>
  BUSINESS_TRANSITION_GUARD_CATEGORIES.map((category) => createPassingGuard(category, context));

export const getFailedTransitionGuards = (context: BusinessTransitionGuardContext): string[] =>
  evaluateBusinessTransitionGuards(context)
    .filter((guard) => !guard.passed)
    .map((guard) => guard.category);
