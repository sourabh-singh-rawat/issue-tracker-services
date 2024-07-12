import { EmailVerificationStatus } from "@issue-tracker/common";
import { BaseToken } from "./base-token";

export interface AccessToken extends BaseToken {
  email: string;
  createdAt: Date | string;
  emailVerificationStatus: EmailVerificationStatus;
  displayName?: string;
  userMetadata: { language: string };
  appMetadata: { roles: string[] };
}
