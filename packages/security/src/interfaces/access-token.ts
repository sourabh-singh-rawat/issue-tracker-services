import { UserEmailConfirmationStatus } from "@issue-tracker/common";
import { BaseToken } from "./base-token";

export interface AccessToken extends BaseToken {
  email: string;
  createdAt: Date | string;
  emailConfirmationStatus: UserEmailConfirmationStatus;
  displayName?: string;
  userMetadata: { language: string };
  appMetadata: { roles: string[] };
}
