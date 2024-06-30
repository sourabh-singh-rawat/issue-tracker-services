export const WORKSPACE_MEMBER_ROLES = {
  OWNER: "Owner",
  ADMIN: "Admin",
  MEMBER: "Member",
} as const;

export type WorkspaceMemberRoles =
  (typeof WORKSPACE_MEMBER_ROLES)[keyof typeof WORKSPACE_MEMBER_ROLES];
