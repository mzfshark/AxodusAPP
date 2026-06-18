import { businessRuntimeMock } from "../data/business.mock.js";
import type { BusinessRuntimeEvent } from "./business.event-types.js";
import {
  createACSRuntimeEvent,
  createAssetLifecycleEvent,
  createDebentureStatusEvent,
  createFundingLifecycleEvent,
  createGovernanceReviewEvent,
  createProjectLifecycleEvent,
  createRequestLifecycleEvent,
  createRevenueRoutingEvent,
  createTelemetrySignalEvent,
  createTreasuryExposureEvent
} from "./business.event-factory.js";

const byTimestampThenId = (left: BusinessRuntimeEvent, right: BusinessRuntimeEvent): number => {
  const timeDelta = new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime();
  return timeDelta === 0 ? left.eventId.localeCompare(right.eventId) : timeDelta;
};

export const getBusinessRuntimeEvents = (): BusinessRuntimeEvent[] => {
  const events: BusinessRuntimeEvent[] = [
    ...businessRuntimeMock.requests.map(createRequestLifecycleEvent),
    ...businessRuntimeMock.projects.map(createProjectLifecycleEvent),
    ...businessRuntimeMock.projects.map(createGovernanceReviewEvent),
    ...businessRuntimeMock.assets.map(createAssetLifecycleEvent),
    ...businessRuntimeMock.fundingRecords.map(createFundingLifecycleEvent),
    ...businessRuntimeMock.treasuryExposures.map(createTreasuryExposureEvent),
    ...businessRuntimeMock.debentures.map(createDebentureStatusEvent),
    ...businessRuntimeMock.revenueRecords.map(createRevenueRoutingEvent),
    ...businessRuntimeMock.acsRuntimes.map(createACSRuntimeEvent),
    ...businessRuntimeMock.telemetryEvents.map(createTelemetrySignalEvent)
  ];

  return structuredClone(events.sort(byTimestampThenId));
};
