export const EMAIL_VERIFICATION_STATUS = {
  UNVERIFIED: "Unverified",
  VERIFIED: "Verified",
  FAILED: "Failed",
} as const;

export type EmailVerificationStatus =
  (typeof EMAIL_VERIFICATION_STATUS)[keyof typeof EMAIL_VERIFICATION_STATUS];
