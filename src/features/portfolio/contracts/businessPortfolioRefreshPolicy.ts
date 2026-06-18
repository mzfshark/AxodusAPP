export type BusinessPortfolioRefreshPolicy = Readonly<{
  id: 'BUSINESS_AXODUSAPP_PORTFOLIO_REFRESH_POLICY';
  mode: 'manual-snapshot-refresh';
  currentRefreshModel: string;
  snapshotRefresh: string;
  futureApiReadiness: string;
  consumerBoundaries: readonly string[];
  runtimePollingEnabled: false;
  apiIntegrationEnabled: false;
  productionCredentialUseEnabled: false;
}>;

export const businessPortfolioRefreshPolicy = {
  id: 'BUSINESS_AXODUSAPP_PORTFOLIO_REFRESH_POLICY',
  mode: 'manual-snapshot-refresh',
  currentRefreshModel: 'AxodusAPP consumes a local static portfolio snapshot through the Portfolio Registry Consumer Layer.',
  snapshotRefresh: 'Refreshes occur through explicit repository changes to the local portfolio fixture and validation suite.',
  futureApiReadiness: 'A future API may be planned only through a separate approved read-only contract and transport request.',
  consumerBoundaries: [
    'No runtime polling.',
    'No production synchronization.',
    'No backend integration.',
    'No live credentials.',
    'No mutation methods.',
    'No authority grants.',
    'No wallet, transaction, treasury, trading, settlement, payout, provisioning or contract execution behavior.',
  ],
  runtimePollingEnabled: false,
  apiIntegrationEnabled: false,
  productionCredentialUseEnabled: false,
} as const satisfies BusinessPortfolioRefreshPolicy;
