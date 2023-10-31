import { WorkspaceInvitePayload } from "@sourabhrawatcc/core-utils";

export interface EmailService {
  createSentEmail(receiverEmail: string): Promise<void>;
  createInviteToken(payload: WorkspaceInvitePayload): string;
  sendWorkspaceInvitation(payload: WorkspaceInvitePayload): Promise<void>;
}
