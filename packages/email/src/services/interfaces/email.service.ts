import {
  ProjectMemberPayload,
  UserCreatedPayload,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";

export interface EmailService {
  createInviteToken(payload: WorkspaceInvitePayload): string;
  sendVerificationEmail(payload: UserCreatedPayload): Promise<void>;
  sendWorkspaceInvitation(payload: WorkspaceInvitePayload): Promise<void>;
  sendProjectInvitation(payload: ProjectMemberPayload): Promise<void>;
}
