import { EmailVerificationTokenStatus } from "@pine/common";

export interface WorkspaceInvitePayload {
  userId: string;
  workspaceId: string;
  workspaceName: string;
  email: string;
  token: string;
  status: EmailVerificationTokenStatus;
}
