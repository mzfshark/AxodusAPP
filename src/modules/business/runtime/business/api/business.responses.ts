import { BUSINESS_API_RUNTIME_CONTEXT, createBusinessApiMeta } from "./business.meta.js";
import type { BusinessApiError, BusinessApiLinks, BusinessApiResponse, BusinessApiTelemetry } from "./business.response.types.js";

const clone = <T>(value: T): T => structuredClone(value);

export const businessApiResponse = <TData>(
  data: TData,
  options: {
    errors?: BusinessApiError[];
    links?: BusinessApiLinks;
    telemetry?: BusinessApiTelemetry;
  } = {}
): BusinessApiResponse<TData> => ({
  data: clone(data),
  meta: createBusinessApiMeta(),
  errors: options.errors ?? [],
  links: options.links,
  telemetry: options.telemetry,
  runtime: BUSINESS_API_RUNTIME_CONTEXT
});

export const businessApiNotFoundResponse = (
  error: BusinessApiError,
  links?: BusinessApiLinks
): BusinessApiResponse<null> =>
  businessApiResponse(null, {
    errors: [error],
    links
  });
