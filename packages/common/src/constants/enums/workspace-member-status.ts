export const WORKSPACE_MEMBER_STATUS = {
  ACTIVE: "Active",
  PENDING: "Pending",
  INVITED: "Invited",
  REMOVED: "Removed",
  SUSPENED: "Suspended",
  BLOCKED: "Blocked",
  DELETED: "Deleted",
} as const;

export type WorkspaceMemberStatus =
  (typeof WORKSPACE_MEMBER_STATUS)[keyof typeof WORKSPACE_MEMBER_STATUS];
