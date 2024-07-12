import { EmailVerificationStatus } from "@issue-tracker/common";

export interface UserEmailVerifiedPayload {
  emailVerificationStatus: EmailVerificationStatus;
  userId: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  inviteToken?: string;
}
