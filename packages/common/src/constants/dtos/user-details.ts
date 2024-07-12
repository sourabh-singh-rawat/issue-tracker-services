import { EmailVerificationStatus } from "../enums";

export interface UserDetails {
  userId: string;
  email: string;
  emailVerificationStatus: EmailVerificationStatus;
  displayName?: string;
  createdAt: Date;
  photoUrl?: string;
  description?: string;
}
