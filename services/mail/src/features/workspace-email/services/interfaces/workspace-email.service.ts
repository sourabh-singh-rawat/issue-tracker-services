import { WorkspaceInvitePayload } from "@pine/event-bus";

export interface WorkspaceEmailService {
  sendWorkspaceInvitationEmail(payload: WorkspaceInvitePayload): Promise<void>;
}
