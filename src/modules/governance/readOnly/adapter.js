import {
  governanceReadOnlyErrors,
  governanceReadOnlyModes,
} from './types';
import {
  governanceReadOnlyFixtures,
  governanceReadOnlyTenantMappings,
} from './fixtures';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createMetadata(readModelId, tenantId, freshness = 'unknown') {
  return {
    readModelId,
    tenantId,
    sourceVersion: 'governance-readonly-mock/v1',
    generatedAt: '2026-05-29T15:00:00.000Z',
    lastSourceEventAt: null,
    freshness,
    consistency: 'snapshot',
    indexCheckpointId: null,
    correlationId: null,
    source: governanceReadOnlyModes.LOCAL_MOCK,
  };
}

function normalizeTenantId(tenantId) {
  return governanceReadOnlyTenantMappings[tenantId] ?? tenantId;
}

function paginate(items, { limit = 25, offset = 0 } = {}) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 25, 100));
  const safeOffset = Math.max(0, Number(offset) || 0);
  const sliced = items.slice(safeOffset, safeOffset + safeLimit);
  const nextOffset = safeOffset + safeLimit < items.length ? safeOffset + safeLimit : null;
  return {
    items: sliced,
    page: {
      limit: safeLimit,
      offset: safeOffset,
      total: items.length,
      hasNextPage: nextOffset !== null,
      nextOffset,
    },
  };
}

function missingTenantResult(tenantId) {
  return {
    ok: false,
    error: {
      code: tenantId ? governanceReadOnlyErrors.TENANT_NOT_FOUND : governanceReadOnlyErrors.MISSING_TENANT,
      message: tenantId ? 'Governance tenant fixture not found.' : 'Governance tenant scope is required.',
    },
  };
}

export class MockGovernanceReadOnlyAdapter {
  constructor(fixtures = governanceReadOnlyFixtures) {
    this.fixtures = fixtures;
  }

  getTenantFixture(tenantId) {
    const normalizedTenantId = normalizeTenantId(tenantId);
    return {
      tenantId: normalizedTenantId,
      fixture: normalizedTenantId ? this.fixtures.tenants[normalizedTenantId] : null,
    };
  }

  async listProposals({ tenantId, status, limit = 25, offset = 0 } = {}) {
    const { fixture } = this.getTenantFixture(tenantId);
    if (!fixture) return missingTenantResult(tenantId);

    const filtered = fixture.proposals
      .filter((proposal) => !status || proposal.status === status)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.proposalId.localeCompare(b.proposalId));
    const { items, page } = paginate(filtered, { limit, offset });

    return {
      ok: true,
      value: {
        metadata: clone(fixture.summary.metadata),
        items: clone(items),
        page,
        mode: governanceReadOnlyModes.LOCAL_MOCK,
      },
    };
  }

  async getProposalDetail({ tenantId, proposalId } = {}) {
    const { tenantId: normalizedTenantId, fixture } = this.getTenantFixture(tenantId);
    if (!fixture) return missingTenantResult(tenantId);

    const proposal = fixture.proposals.find((item) => item.proposalId === proposalId);
    if (!proposal) {
      return {
        ok: false,
        error: {
          code: governanceReadOnlyErrors.PROPOSAL_NOT_FOUND,
          message: 'Governance proposal fixture not found.',
        },
      };
    }

    const versions = [
      {
        proposalId: proposal.proposalId,
        version: proposal.latestVersion,
        title: proposal.title,
        summary: proposal.summary,
        createdAt: proposal.createdAt,
        authorActorId: proposal.proposerActorId,
      },
    ];

    return {
      ok: true,
      value: {
        metadata: createMetadata(`proposal-detail-${proposal.proposalId}`, normalizedTenantId, fixture.summary.metadata.freshness),
        proposal: clone(proposal),
        latestVersion: clone(versions[0]),
        versions,
        decisions: clone(fixture.decisions.filter((decision) => decision.proposalId === proposal.proposalId)),
        votes: [],
        reviews: proposal.reviewStatus
          ? [{
              reviewId: `review-${proposal.proposalId}`,
              proposalId: proposal.proposalId,
              tenantId: normalizedTenantId,
              reviewerActorId: null,
              reviewStatus: proposal.reviewStatus,
              recommendation: null,
              createdAt: proposal.updatedAt,
              rationale: 'Sanitized local/mock review summary only.',
            }]
          : [],
        executionIntents: proposal.executionIntentStatus === 'none'
          ? []
          : [{
              executionIntentId: `intent-${proposal.proposalId}`,
              proposalId: proposal.proposalId,
              tenantId: normalizedTenantId,
              status: proposal.executionIntentStatus,
              executionEnabled: false,
              reasonCodes: ['READ_ONLY_MOCK_EXECUTION_DISABLED'],
              createdAt: proposal.updatedAt,
            }],
        emergencyActions: clone(fixture.emergencyActions.filter((item) => item.proposalId === proposal.proposalId)),
        auditReferences: fixture.timeline
          .filter((entry) => entry.entityId === proposal.proposalId && entry.auditId)
          .map((entry) => ({ auditId: entry.auditId, entityId: proposal.proposalId, entityType: 'proposal' })),
        receiptReferences: [],
        mode: governanceReadOnlyModes.LOCAL_MOCK,
      },
    };
  }

  async getTenantSummary({ tenantId } = {}) {
    const { fixture } = this.getTenantFixture(tenantId);
    if (!fixture) return missingTenantResult(tenantId);
    return { ok: true, value: { ...clone(fixture.summary), mode: governanceReadOnlyModes.LOCAL_MOCK } };
  }

  async listEmergencyActions({ tenantId, limit = 25, offset = 0 } = {}) {
    const { tenantId: normalizedTenantId, fixture } = this.getTenantFixture(tenantId);
    if (!fixture) return missingTenantResult(tenantId);
    const sorted = fixture.emergencyActions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const { items, page } = paginate(sorted, { limit, offset });
    return {
      ok: true,
      value: {
        metadata: createMetadata(`emergency-actions-${normalizedTenantId}`, normalizedTenantId, fixture.summary.metadata.freshness),
        items: clone(items),
        page,
        mode: governanceReadOnlyModes.LOCAL_MOCK,
      },
    };
  }

  async getGovernanceTimeline({ tenantId, proposalId, limit = 25, offset = 0 } = {}) {
    const { tenantId: normalizedTenantId, fixture } = this.getTenantFixture(tenantId);
    if (!fixture) return missingTenantResult(tenantId);
    const filtered = fixture.timeline
      .filter((entry) => !proposalId || entry.entityId === proposalId)
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt) || a.timelineId.localeCompare(b.timelineId));
    const { items, page } = paginate(filtered, { limit, offset });
    return {
      ok: true,
      value: {
        metadata: createMetadata(`timeline-${normalizedTenantId}`, normalizedTenantId, fixture.summary.metadata.freshness),
        entries: clone(items),
        page,
        mode: governanceReadOnlyModes.LOCAL_MOCK,
      },
    };
  }

  async listDecisionHistory({ tenantId, proposalId, limit = 25, offset = 0 } = {}) {
    const { tenantId: normalizedTenantId, fixture } = this.getTenantFixture(tenantId);
    if (!fixture) return missingTenantResult(tenantId);
    const filtered = fixture.decisions
      .filter((decision) => !proposalId || decision.proposalId === proposalId)
      .sort((a, b) => b.decidedAt.localeCompare(a.decidedAt) || a.decisionId.localeCompare(b.decisionId));
    const { items, page } = paginate(filtered, { limit, offset });
    return {
      ok: true,
      value: {
        metadata: createMetadata(`decisions-${normalizedTenantId}`, normalizedTenantId, fixture.summary.metadata.freshness),
        items: clone(items),
        page,
        mode: governanceReadOnlyModes.LOCAL_MOCK,
      },
    };
  }
}

export const mockGovernanceReadOnlyAdapter = new MockGovernanceReadOnlyAdapter();

export const forbiddenGovernanceMutationMethods = [
  'createProposal',
  'submitProposal',
  'editProposal',
  'vote',
  'review',
  'approve',
  'reject',
  'execute',
  'sign',
  'sendTransaction',
  'triggerTreasury',
  'triggerOnChainWrite',
];
