import { getBusinessDraftTemplate } from "./business.draft-templates.js";
import type { BusinessDraft, BusinessDraftCapabilityReview } from "./business.draft-types.js";
import { getRequiredCapabilitiesForAction } from "../capabilities/business.capabilities.js";

export const getBusinessDraftRequiredCapabilities = (draft: BusinessDraft) =>
  getRequiredCapabilitiesForAction(getBusinessDraftTemplate(draft.draftType).relatedRuntimeAction);

export const getBusinessDraftCapabilityReview = (draft: BusinessDraft): BusinessDraftCapabilityReview => ({
  requiredCapabilities: getBusinessDraftRequiredCapabilities(draft),
  mock: true,
  readOnly: true
});
