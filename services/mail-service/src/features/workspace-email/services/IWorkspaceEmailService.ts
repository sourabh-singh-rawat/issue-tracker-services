import { WorkspaceInvitePayload } from "@pine/event-bus";

export interface IWorkspaceEmailService {
  sendWorkspaceInvitationEmail(payload: WorkspaceInvitePayload): Promise<void>;
}
