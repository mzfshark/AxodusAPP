export type AxodusInformationScope = "protocol" | "user" | "tenant" | "operator";

export type AxodusSurface = "public" | "dashboard" | "console" | "admin" | "operations";

export type AxodusMaturity = "mock" | "prototype" | "api-ready" | "production";

export type AxodusExecutionMode = "read-only" | "preview" | "simulation" | "executable-disabled";

export interface AxodusUiBlockMeta {
  id: string;
  title: string;
  module: string;
  scope: AxodusInformationScope;
  surface: AxodusSurface;
  maturity: AxodusMaturity;
  executionMode: AxodusExecutionMode;
  walletAware: boolean;
  tenantAware: boolean;
  governanceAware: boolean;
  acsAware: boolean;
}

export interface AxodusModuleMeta {
  id: string;
  name: string;
  route: string;
  primaryScope: AxodusInformationScope;
  supportedScopes: AxodusInformationScope[];
  maturity: AxodusMaturity;
  walletAware: boolean;
  tenantAware: boolean;
  governanceAware: boolean;
  acsAware: boolean;
}
