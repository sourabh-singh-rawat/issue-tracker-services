export const CONSUMERS = {
  USER_EMAIL_VERIFIED_ISSUE_TRACKER: "user-created-issue-tracker",
  USER_EMAIL_VERIFIED_ATTACHMENT: "user-created-attachment",
  USER_UPDATED_ISSUE_TRACKER: "user-updated-issue-tracker",
  USER_EMAIL_CONFIRMATION_SENT_AUTH: "user-email-confirmation-sent-auth",
  USER_REGISTERED_NOTIFICATION: "user-registered-notification",
  WORKSPACE_INVITE_CREATED_NOTIFICATION: "workspace-invite-created-notification",
  PROJECT_MEMBER_INVITE_CREATED_NOTIFICATION: "project-member-invite-created-notification",
  PRODUCT_CREATED_INVENTORY: "product-created-inventory",
  BRAND_CREATED_INVENTORY: "brand-created-inventory",
  BRAND_UPDATED_INVENTORY: "brand-updated-inventory",
} as const;

export type Consumers = (typeof CONSUMERS)[keyof typeof CONSUMERS];
