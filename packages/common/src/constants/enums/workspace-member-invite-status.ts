export const WORKSPACE_MEMBER_INVITE_STATUS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
  EXPIRED: "Expired",
  REVOKED: "Revoked",
  ERROR: "Error",
} as const;

export type WorkspaceMemberInviteStatus =
  (typeof WORKSPACE_MEMBER_INVITE_STATUS)[keyof typeof WORKSPACE_MEMBER_INVITE_STATUS];
