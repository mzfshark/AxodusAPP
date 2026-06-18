import { explainPermissionDecision } from "../permissions/business.permissions.js";
import type { BusinessId } from "../types/business.types.js";
import { getBusinessDraftTemplate } from "./business.draft-templates.js";
import type { BusinessDraft, BusinessDraftPermissionReview } from "./business.draft-types.js";

export const getBusinessDraftPermissionDecision = (draft: BusinessDraft, identityId?: BusinessId) =>
  explainPermissionDecision(identityId ?? draft.requesterIdentityId ?? String(draft.values.requesterIdentity ?? "id-axodus-core"), getBusinessDraftTemplate(draft.draftType).relatedRuntimeAction);

export const getBusinessDraftPermissionReview = (draft: BusinessDraft, identityId?: BusinessId): BusinessDraftPermissionReview => {
  const resolvedIdentityId = identityId ?? draft.requesterIdentityId ?? String(draft.values.requesterIdentity ?? "id-axodus-core");
  return {
    identityId: resolvedIdentityId,
    decision: getBusinessDraftPermissionDecision(draft, resolvedIdentityId),
    mock: true,
    readOnly: true
  };
};
