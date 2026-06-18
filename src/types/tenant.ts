export type AxodusTenantType =
  | "root"
  | "sub-dao"
  | "company"
  | "agency"
  | "product"
  | "community"
  | "sandbox";

export type AxodusTenantGovernanceStatus =
  | "compliant"
  | "under-review"
  | "restricted"
  | "sandbox"
  | "protocol-root";

export type AxodusTenantFederationTier =
  | "root"
  | "sovereign"
  | "partner"
  | "observer"
  | "sandbox"
  | "restricted";

export type AxodusTenantMaturity = "mock" | "prototype" | "api-ready" | "production";

export type AxodusTenantRiskState = "low" | "moderate" | "elevated" | "restricted" | "sandbox";

export type AxodusTenantAcsState = "online" | "review-required" | "restricted" | "sandbox" | "offline";

export type AxodusTenantTreasuryMode =
  | "protocol-read-only"
  | "tenant-read-only"
  | "preview"
  | "simulation"
  | "blocked";

export interface AxodusTenant {
  id: string;
  displayName: string;
  slug: string;
  type: AxodusTenantType;
  governanceStatus: AxodusTenantGovernanceStatus;
  federationTier: AxodusTenantFederationTier;
  primaryChain: string;
  enabledModules: string[];
  disabledModules: string[];
  roles: string[];
  permissions: string[];
  maturity: AxodusTenantMaturity;
  riskState: AxodusTenantRiskState;
  acsState: AxodusTenantAcsState;
  treasuryMode: AxodusTenantTreasuryMode;
  executionMode: "read-only" | "preview" | "simulation" | "executable-disabled";
  restrictions: string[];
  createdAt: string;
  updatedAt: string;
}
