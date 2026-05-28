import type { GovernanceReference } from "../types/business.types.js";
import type { TelemetrySeverity } from "../types/business.enums.js";

export const BUSINESS_EVENT_TYPES = [
  "BUSINESS_REQUEST_LIFECYCLE",
  "BUSINESS_PROJECT_LIFECYCLE",
  "BUSINESS_ASSET_LIFECYCLE",
  "BUSINESS_FUNDING_LIFECYCLE",
  "BUSINESS_TREASURY_EXPOSURE",
  "BUSINESS_DEBENTURE_STATUS",
  "BUSINESS_REVENUE_ROUTING",
  "BUSINESS_ACS_RUNTIME",
  "BUSINESS_GOVERNANCE_REVIEW",
  "BUSINESS_TELEMETRY_SIGNAL"
] as const;

export type BusinessEventType = (typeof BUSINESS_EVENT_TYPES)[number];

export type BusinessEventSource =
  | "business-request"
  | "business-project"
  | "business-asset"
  | "business-funding"
  | "business-treasury"
  | "business-debenture"
  | "business-revenue"
  | "business-acs"
  | "business-governance"
  | "business-telemetry";

export interface BusinessRuntimeEvent {
  eventId: string;
  eventType: BusinessEventType;
  source: BusinessEventSource;
  severity: TelemetrySeverity;
  relatedRequestId?: string;
  relatedProjectId?: string;
  relatedAssetId?: string;
  relatedFundingId?: string;
  relatedDebentureId?: string;
  relatedACSRuntimeId?: string;
  relatedGovernanceReference?: GovernanceReference;
  timestamp: string;
  payload: Record<string, unknown>;
  mock: true;
  readOnly: true;
}

export interface BusinessEventLineage {
  eventId: string;
  parentEventIds: string[];
  relatedEventIds: string[];
  relatedRequestId?: string;
  relatedProjectId?: string;
  relatedAssetId?: string;
  relatedFundingId?: string;
  relatedDebentureId?: string;
  relatedACSRuntimeId?: string;
}

export interface BusinessEventSummary {
  totalEvents: number;
  criticalEvents: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  bySource: Record<string, number>;
  lineages: BusinessEventLineage[];
  mock: true;
  readOnly: true;
}
