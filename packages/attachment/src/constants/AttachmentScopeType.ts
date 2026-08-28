export type AttachmentScopeType = "IDENTITY" | "ORGANIZATION";

export const ATTACHMENT_SCOPE_TYPE = {
  IDENTITY: "IDENTITY",
  ORGANIZATION: "ORGANIZATION",
} satisfies Record<AttachmentScopeType, AttachmentScopeType>;
