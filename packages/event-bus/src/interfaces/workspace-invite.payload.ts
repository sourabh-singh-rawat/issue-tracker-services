import { WorkspaceMemberStatus, WorkspaceRoles } from "@issue-tracker/common";

export interface WorkspaceInvitePayload {
  senderId: string;
  senderEmail: string;
  senderName: string;
  receiverEmail: string;
  receiverStatus: WorkspaceMemberStatus;
  receiverRole: WorkspaceRoles;
  workspaceId: string;
}
