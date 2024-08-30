import { WorkspaceInvitePayload } from "@issue-tracker/event-bus";

export interface WorkspaceEmailService {
  sendWorkspaceInvitationEmail(payload: WorkspaceInvitePayload): Promise<void>;
}
