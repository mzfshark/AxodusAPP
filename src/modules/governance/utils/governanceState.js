export const COMPLIANT_CONSTITUTIONAL_STANDING = {
  status: 'compliant',
  reasonCodes: [],
  reasonSeverity: null,
};

export function mapCompatibilityToStanding(value) {
  if (!value) return COMPLIANT_CONSTITUTIONAL_STANDING;
  if (value.status === 'compatible') return { ...value, status: 'compliant', reasonSeverity: value.reasonSeverity ?? null };
  if (value.status === 'requires-review') return { ...value, status: 'under-review', reasonSeverity: value.reasonSeverity ?? 'constitutional' };
  if (value.status === 'incompatible') return { ...value, status: 'restricted', reasonSeverity: value.reasonSeverity ?? 'critical' };
  return { ...value, reasonSeverity: value.reasonSeverity ?? null };
}

export function getConstitutionalStanding(target) {
  return mapCompatibilityToStanding(target?.constitutionalStanding ?? target?.constitutionalCompliance ?? target?.constitutionalCompatibility);
}

export function governanceStatusFromStanding(standing) {
  if (standing?.status === 'under-review') return 'under-review';
  if (standing?.status === 'restricted') return 'restricted';
  if (standing?.status === 'sanctioned') return 'sanctioned';
  if (standing?.status === 'suspended') return 'suspended';
  return 'compliant';
}

export function severityForReason(reasonCode, status) {
  if (!reasonCode) return null;
  if (reasonCode === 'TREASURY_POLICY_REQUIRES_REVIEW' || reasonCode === 'AGENT_PERMISSION_SCOPE_EXCEEDED') return 'constitutional';
  if (status === 'blocked') return 'critical';
  if (status === 'warning') return 'warning';
  return 'info';
}

export function normalizeReasonSeverity(reasonCode, reasonSeverity, fallbackStatus = 'warning') {
  return reasonSeverity ?? severityForReason(reasonCode, fallbackStatus);
}
