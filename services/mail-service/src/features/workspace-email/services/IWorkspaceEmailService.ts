import { WorkspaceMemberInvitedData } from "@pine/events";

export interface IWorkspaceEmailService {
  sendWorkspaceInvitationEmail(payload: WorkspaceMemberInvitedData): Promise<void>;
}
