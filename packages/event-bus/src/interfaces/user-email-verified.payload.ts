import { EmailVerificationStatus } from "@pine/common";

export interface UserEmailVerifiedPayload {
  emailVerificationStatus: EmailVerificationStatus;
  userId: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  inviteToken?: string;
}
