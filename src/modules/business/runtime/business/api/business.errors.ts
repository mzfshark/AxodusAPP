import type { BusinessApiError } from "./business.response.types.js";
import { createBusinessApiError } from "./business.api-errors.js";

export const businessApiErrors = {
  notFound(resource: string, id: string): BusinessApiError {
    return createBusinessApiError("BUSINESS_NOT_FOUND", `${resource} was not found in the Business mock runtime.`, "WARNING", { id, resource }, "Use an id present in the Business mock dataset.");
  },

  nonExecutable(action: string): BusinessApiError {
    return createBusinessApiError("BUSINESS_NON_EXECUTABLE", `${action} is disabled in the Business mock read-only runtime.`, "CRITICAL", { action, executionMode: "MOCK_READ_ONLY" }, "Keep the operation view-only, prepare-only or simulation-only.");
  },

  routeNotFound(method: string, path: string): BusinessApiError {
    return createBusinessApiError("BUSINESS_ROUTE_NOT_FOUND", `${method} ${path} is not exposed by the Business mock API.`, "WARNING", { method, path, executionMode: "MOCK_READ_ONLY" }, "Use a route listed in the Business route catalog.");
  },

  invalidRequest(message: string, details: Record<string, unknown> = {}): BusinessApiError {
    return createBusinessApiError("BUSINESS_INVALID_REQUEST", message, "WARNING", { ...details, executionMode: "MOCK_READ_ONLY" }, "Send a payload matching the Business mock API contract.");
  }
};
