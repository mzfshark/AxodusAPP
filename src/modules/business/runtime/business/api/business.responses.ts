import { BUSINESS_API_RUNTIME_CONTEXT, createBusinessApiMeta } from "./business.meta.js";
import { createBusinessApiExecutionContext, createBusinessApiSecurityContext } from "./business.api-security.js";
import type { BusinessRuntimeAction } from "../policies/business.execution-policy.js";
import type { BusinessApiError, BusinessApiExecutionContext, BusinessApiLinks, BusinessApiResponse, BusinessApiSecurityContext, BusinessApiTelemetry } from "./business.response.types.js";

const clone = <T>(value: T): T => structuredClone(value);

export const businessApiResponse = <TData>(
  data: TData,
  options: {
    errors?: BusinessApiError[];
    links?: BusinessApiLinks;
    telemetry?: BusinessApiTelemetry;
    security?: BusinessApiSecurityContext;
    execution?: BusinessApiExecutionContext;
    action?: BusinessRuntimeAction;
    mockMutation?: boolean;
  } = {}
): BusinessApiResponse<TData> => ({
  data: clone(data),
  meta: createBusinessApiMeta(),
  errors: options.errors ?? [],
  links: options.links,
  telemetry: options.telemetry,
  runtime: BUSINESS_API_RUNTIME_CONTEXT,
  security: options.security ?? createBusinessApiSecurityContext(options.action),
  execution: options.execution ?? createBusinessApiExecutionContext(options.mockMutation ?? false)
});

export const businessApiNotFoundResponse = (
  error: BusinessApiError,
  links?: BusinessApiLinks
): BusinessApiResponse<null> =>
  businessApiResponse(null, {
    errors: [error],
    links
  });
