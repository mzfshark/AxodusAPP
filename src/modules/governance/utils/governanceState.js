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

export function normalizeGuardrailReason(reason) {
  if (!reason?.reasonCode) return null;

  return {
    ...reason,
    reasonSeverity: normalizeReasonSeverity(reason.reasonCode, reason.reasonSeverity),
  };
}

export function collectGovernanceGuardrailReasons(chain) {
  if (!chain) return [];

  if (Array.isArray(chain.guardrailReasons) && chain.guardrailReasons.length > 0) {
    return chain.guardrailReasons.map(normalizeGuardrailReason).filter(Boolean);
  }

  const reasons = [];
  const standing = chain.constitutionalStanding ?? chain.capabilities?.constitutionalStanding;

  if (chain.indexingStatus?.reasonCode) {
    reasons.push({
      reasonCode: chain.indexingStatus.reasonCode,
      reasonSeverity: normalizeReasonSeverity(chain.indexingStatus.reasonCode, chain.indexingStatus.reasonSeverity),
      source: 'indexer readiness',
      scope: chain.name,
      network: chain.network,
    });
  }

  (standing?.reasonCodes ?? []).forEach((reasonCode) => {
    reasons.push({
      reasonCode,
      reasonSeverity: standing.reasonSeverity ?? 'constitutional',
      source: 'Constitutional Governance',
      scope: chain.name,
      network: chain.network,
    });
  });

  Object.entries(chain.capabilities?.pluginCapabilities ?? {}).forEach(([pluginType, capability]) => {
    (capability.constitutionalStanding?.reasonCodes ?? []).forEach((reasonCode) => {
      reasons.push({
        reasonCode,
        reasonSeverity: capability.constitutionalStanding.reasonSeverity ?? 'constitutional',
        source: 'plugin capability',
        scope: `${chain.name} / ${pluginType}`,
        network: chain.network,
      });
    });
  });

  return reasons;
}
