export const EMAIL_TYPE = {
  USER_REGISTRATION: "User Registration",
  PROJECT_INVITATION: "Project Invitation",
  WORKSPACE_INVITATION: "Workspace Invitation",
} as const;

export type EmailType = (typeof EMAIL_TYPE)[keyof typeof EMAIL_TYPE];
