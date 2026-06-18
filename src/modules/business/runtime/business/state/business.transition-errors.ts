export type BusinessStateMachineDomain =
  | "REQUEST"
  | "PROJECT"
  | "ASSET"
  | "FUNDING"
  | "DEBENTURE"
  | "TREASURY_EXPOSURE"
  | "ACS_RUNTIME"
  | "REVENUE"
  | "PLUGIN";

export interface BusinessTransitionError {
  code: "BUSINESS_INVALID_TRANSITION" | "BUSINESS_UNKNOWN_STATE" | "BUSINESS_GUARD_BLOCKED";
  domain: BusinessStateMachineDomain;
  fromStatus: string;
  toStatus: string;
  message: string;
  guardFailures: string[];
}

export const createInvalidTransitionError = (
  domain: BusinessStateMachineDomain,
  fromStatus: string,
  toStatus: string,
  allowedTargets: readonly string[],
  guardFailures: string[] = []
): BusinessTransitionError => {
  if (guardFailures.length > 0) {
    return {
      code: "BUSINESS_GUARD_BLOCKED",
      domain,
      fromStatus,
      toStatus,
      message: `Transition ${domain}:${fromStatus}->${toStatus} is blocked by guards: ${guardFailures.join(", ")}.`,
      guardFailures
    };
  }

  return {
    code: allowedTargets.length === 0 ? "BUSINESS_UNKNOWN_STATE" : "BUSINESS_INVALID_TRANSITION",
    domain,
    fromStatus,
    toStatus,
    message:
      allowedTargets.length === 0
        ? `Transition ${domain}:${fromStatus}->${toStatus} starts from an unknown or terminal state.`
        : `Transition ${domain}:${fromStatus}->${toStatus} is invalid. Allowed targets: ${allowedTargets.join(", ")}.`,
    guardFailures: []
  };
};

export const explainInvalidTransition = (error: BusinessTransitionError): string => error.message;
