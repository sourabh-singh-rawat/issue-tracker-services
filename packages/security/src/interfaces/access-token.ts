import { EmailVerificationStatus } from "@issue-tracker/common";
import { JWTPayload } from "jose";
import { BaseToken } from "./base-token";

export interface AccessToken extends BaseToken {
  email: string;
  createdAt: Date | string;
  emailVerificationStatus: EmailVerificationStatus;
  displayName?: string;
  userMetadata: { language: string };
  appMetadata: { roles: string[] };
}

function isUserMetadata(
  value: unknown,
): value is AccessToken["userMetadata"] {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return typeof Reflect.get(value, "language") === "string";
}

function isAppMetadata(value: unknown): value is AccessToken["appMetadata"] {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const roles = Reflect.get(value, "roles");
  return (
    Array.isArray(roles) && roles.every((role) => typeof role === "string")
  );
}

export function isAccessToken(payload: JWTPayload): payload is AccessToken {
  return (
    typeof payload.userId === "string" &&
    typeof payload.email === "string" &&
    typeof payload.iss === "string" &&
    typeof payload.aud === "string" &&
    typeof payload.sub === "string" &&
    typeof payload.exp === "number" &&
    typeof payload.jwtid === "string" &&
    (typeof payload.createdAt === "string" ||
      payload.createdAt instanceof Date) &&
    typeof payload.emailVerificationStatus === "string" &&
    isUserMetadata(payload.userMetadata) &&
    isAppMetadata(payload.appMetadata)
  );
}

export function hasUserIdentity(
  payload: JWTPayload,
): payload is JWTPayload & { userId: string; email: string } {
  return typeof payload.userId === "string" && typeof payload.email === "string";
}

export function hasVerificationClaims(
  payload: JWTPayload,
): payload is JWTPayload & { userId: string; tokenId: string } {
  return (
    typeof payload.userId === "string" && typeof payload.tokenId === "string"
  );
}

export function hasEmailClaim(
  payload: JWTPayload,
): payload is JWTPayload & { email: string } {
  return typeof payload.email === "string";
}
