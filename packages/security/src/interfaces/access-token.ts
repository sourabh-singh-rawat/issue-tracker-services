import { BaseToken } from "./base-token";

export interface AccessToken extends BaseToken {
  email: string;
  createdAt: Date | string;
  isEmailVerified: boolean;
  displayName?: string;
  userMetadata: { language: string };
  appMetadata: { roles: string[] };
}
