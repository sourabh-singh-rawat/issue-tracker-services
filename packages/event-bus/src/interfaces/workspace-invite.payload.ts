import {
  WorkspaceMemberStatus,
  WorkspaceMemberRoles,
} from "@issue-tracker/common";

export interface WorkspaceInvitePayload {
  senderId: string;
  senderEmail: string;
  senderName: string;
  receiverEmail: string;
  receiverStatus: WorkspaceMemberStatus;
  receiverRole: WorkspaceMemberRoles;
  workspaceId: string;
}
