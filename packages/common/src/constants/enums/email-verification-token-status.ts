export const EMAIL_VERIFICATION_TOKEN_STATUS = {
  VALID: "Valid",
  REVOKED: "Revoked",
  EXPIRED: "Expired",
  USED: "Used",
} as const;

export type EmailVerificationTokenStatus =
  (typeof EMAIL_VERIFICATION_TOKEN_STATUS)[keyof typeof EMAIL_VERIFICATION_TOKEN_STATUS];
