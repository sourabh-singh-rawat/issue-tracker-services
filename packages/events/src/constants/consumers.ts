export const CONSUMERS = {
  USER_EMAIL_VERIFIED_ISSUE_TRACKER: "user-created-issue-tracker",
  USER_EMAIL_VERIFIED_ATTACHMENT: "user-created-attachment",
  USER_UPDATED_ISSUE_TRACKER: "user-updated-issue-tracker",
  USER_EMAIL_CONFIRMATION_SENT_AUTH: "user-email-confirmation-sent-auth",
  USER_REGISTERED_NOTIFICATION: "user-registered-notification",
  WORKSPACE_INVITE_CREATED_NOTIFICATION: "workspace-invite-created-notification",
  PROJECT_MEMBER_INVITE_CREATED_NOTIFICATION: "project-member-invite-created-notification",
} as const;

export type Consumers = (typeof CONSUMERS)[keyof typeof CONSUMERS];
