import type { BusinessApiError } from "./business.response.types.js";

export const businessApiErrors = {
  notFound(resource: string, id: string): BusinessApiError {
    return {
      code: "BUSINESS_NOT_FOUND",
      message: `${resource} was not found in the Business mock runtime.`,
      severity: "WARNING",
      details: { id, resource }
    };
  },

  nonExecutable(action: string): BusinessApiError {
    return {
      code: "BUSINESS_NON_EXECUTABLE",
      message: `${action} is disabled in the Business mock read-only runtime.`,
      severity: "CRITICAL",
      details: { action, executionMode: "MOCK_READ_ONLY" }
    };
  },

  routeNotFound(method: string, path: string): BusinessApiError {
    return {
      code: "BUSINESS_ROUTE_NOT_FOUND",
      message: `${method} ${path} is not exposed by the Business mock API.`,
      severity: "WARNING",
      details: { method, path, executionMode: "MOCK_READ_ONLY" }
    };
  },

  invalidRequest(message: string, details: Record<string, unknown> = {}): BusinessApiError {
    return {
      code: "BUSINESS_INVALID_REQUEST",
      message,
      severity: "WARNING",
      details: { ...details, executionMode: "MOCK_READ_ONLY" }
    };
  }
};
