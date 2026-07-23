import { EmailVerificationStatus } from "@pine/common";

export interface UserRegisteredPayload {
  html: string;
  email: string;
  userId: string;
}
