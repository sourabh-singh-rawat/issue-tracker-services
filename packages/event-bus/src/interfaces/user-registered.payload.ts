import { EmailVerificationStatus } from "@issue-tracker/common";

export interface UserRegisteredPayload {
  userId: string;
  email: string;
  emailVerificationStatus: EmailVerificationStatus;
  displayName: string;
  emailVerificationToken: string;
  emailVerificationTokenExp: number;
  photoUrl?: string;
  workspaceInviteToken?: string;
}
