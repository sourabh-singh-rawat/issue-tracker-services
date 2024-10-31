import { EmailVerificationStatus } from "@issue-tracker/common";

export interface UserRegisteredPayload {
  html: string;
  email: string;
}
