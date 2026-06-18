import { TelemetrySeverity } from "../types/business.enums.js";
import type { BusinessEventLineage, BusinessEventSummary, BusinessRuntimeEvent } from "./business.event-types.js";
import { getBusinessRuntimeEvents } from "./business.events.js";

const severityRank: Record<TelemetrySeverity, number> = {
  [TelemetrySeverity.INFO]: 1,
  [TelemetrySeverity.NOTICE]: 2,
  [TelemetrySeverity.WARNING]: 3,
  [TelemetrySeverity.CRITICAL]: 4,
  [TelemetrySeverity.EMERGENCY]: 5
};

const countBy = <T>(records: T[], selector: (record: T) => string): Record<string, number> =>
  records.reduce<Record<string, number>>((acc, record) => {
    const key = selector(record);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

const sortTimeline = (events: BusinessRuntimeEvent[]): BusinessRuntimeEvent[] =>
  structuredClone(events).sort((left, right) => {
    const timeDelta = new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime();
    if (timeDelta !== 0) return timeDelta;
    const severityDelta = severityRank[right.severity] - severityRank[left.severity];
    return severityDelta !== 0 ? severityDelta : left.eventId.localeCompare(right.eventId);
  });

const lineageFor = (event: BusinessRuntimeEvent, events: BusinessRuntimeEvent[]): BusinessEventLineage => {
  const relatedEventIds = events
    .filter((candidate) => candidate.eventId !== event.eventId)
    .filter((candidate) =>
      Boolean(
        (event.relatedProjectId && candidate.relatedProjectId === event.relatedProjectId) ||
          (event.relatedAssetId && candidate.relatedAssetId === event.relatedAssetId) ||
          (event.relatedFundingId && candidate.relatedFundingId === event.relatedFundingId) ||
          (event.relatedDebentureId && candidate.relatedDebentureId === event.relatedDebentureId) ||
          (event.relatedACSRuntimeId && candidate.relatedACSRuntimeId === event.relatedACSRuntimeId) ||
          (event.relatedRequestId && candidate.relatedRequestId === event.relatedRequestId)
      )
    )
    .map((candidate) => candidate.eventId);

  const parentEventIds = events
    .filter((candidate) => candidate.eventId !== event.eventId)
    .filter((candidate) => candidate.relatedRequestId && candidate.relatedRequestId === event.relatedRequestId)
    .map((candidate) => candidate.eventId)
    .slice(0, 3);

  return {
    eventId: event.eventId,
    parentEventIds,
    relatedEventIds,
    relatedRequestId: event.relatedRequestId,
    relatedProjectId: event.relatedProjectId,
    relatedAssetId: event.relatedAssetId,
    relatedFundingId: event.relatedFundingId,
    relatedDebentureId: event.relatedDebentureId,
    relatedACSRuntimeId: event.relatedACSRuntimeId
  };
};

export const getProjectEventTimeline = (projectId: string): BusinessRuntimeEvent[] =>
  sortTimeline(getBusinessRuntimeEvents().filter((event) => event.relatedProjectId === projectId));

export const getAssetEventTimeline = (assetId: string): BusinessRuntimeEvent[] =>
  sortTimeline(getBusinessRuntimeEvents().filter((event) => event.relatedAssetId === assetId));

export const getFundingEventTimeline = (fundingId: string): BusinessRuntimeEvent[] =>
  sortTimeline(getBusinessRuntimeEvents().filter((event) => event.relatedFundingId === fundingId));

export const getDebentureEventTimeline = (debentureId: string): BusinessRuntimeEvent[] =>
  sortTimeline(getBusinessRuntimeEvents().filter((event) => event.relatedDebentureId === debentureId));

export const getACSRuntimeEventTimeline = (runtimeId: string): BusinessRuntimeEvent[] =>
  sortTimeline(getBusinessRuntimeEvents().filter((event) => event.relatedACSRuntimeId === runtimeId));

export const getCriticalBusinessEvents = (): BusinessRuntimeEvent[] =>
  sortTimeline(getBusinessRuntimeEvents().filter((event) => event.severity === TelemetrySeverity.CRITICAL || event.severity === TelemetrySeverity.EMERGENCY));

export const getBusinessEventLineage = (eventId: string): BusinessEventLineage | undefined => {
  const events = getBusinessRuntimeEvents();
  const event = events.find((record) => record.eventId === eventId);
  return event ? structuredClone(lineageFor(event, events)) : undefined;
};

export const getBusinessEventSummary = (): BusinessEventSummary => {
  const events = getBusinessRuntimeEvents();

  return {
    totalEvents: events.length,
    criticalEvents: getCriticalBusinessEvents().length,
    byType: countBy(events, (event) => event.eventType),
    bySeverity: countBy(events, (event) => event.severity),
    bySource: countBy(events, (event) => event.source),
    lineages: events.map((event) => lineageFor(event, events)),
    mock: true,
    readOnly: true
  };
};
