export const CONSUMERS = {
  USER_EMAIL_VERIFIED_ISSUE_TRACKER: "user-created-issue-tracker",
  USER_UPDATED_ISSUE_TRACKER: "user-updated-issue-tracker",
  USER_EMAIL_CONFIRMATION_SENT_AUTH: "user-email-confirmation-sent-auth",

  USER_REGISTERED_MAIL: "user-registered-mail",

  WORKSPACE_INVITE_CREATED_MAIL: "workpace-invite-created-mail",
  PROJECT_MEMBER_INVITE_CREATED_MAIL: "project-member-invite-created-mail",
} as const;

export type Consumers = (typeof CONSUMERS)[keyof typeof CONSUMERS];
