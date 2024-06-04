import {
  ProjectMemberPayload,
  UserCreatedPayload,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";

export interface EmailService {
  createInviteToken(payload: WorkspaceInvitePayload): string;
  sendVerificationEmail(payload: UserCreatedPayload): Promise<void>;
  sendWorkspaceInvitation(payload: WorkspaceInvitePayload): Promise<void>;
  sendProjectInvitation(payload: ProjectMemberPayload): Promise<void>;
}
