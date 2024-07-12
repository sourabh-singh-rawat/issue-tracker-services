export const SUBJECTS = {
  USER_CONFIRMATION_EMAIL_SENT: "user.confirmation-email-sent",
  USER_REGISTERED: "user.registered",
  USER_EMAIL_VERIFIED: "user.email-verified",
  USER_UPDATED: "user.updated",
  PROJECT_CREATED: "project.created",
  PROJECT_UPDATED: "project.updated",
  PROJECT_MEMBERS_CREATED: "project.member-created",
  PROJECT_MEMBERS_UPDATED: "project.member-updated",
  ISSUE_CREATED: "issue.created",
  ISSUE_UPDATED: "issue.updated",
  WORKSPACE_CREATED: "workspace.created",
  WORKSPACE_UPDATED: "workspace.updated",
  WORKSPACE_INVITE_CREATED: "workspace.invite-created",
} as const;

export type Subjects = (typeof SUBJECTS)[keyof typeof SUBJECTS];
