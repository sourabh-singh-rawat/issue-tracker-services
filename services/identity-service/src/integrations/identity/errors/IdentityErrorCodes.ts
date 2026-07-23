export const IdentityErrorCodes = {
  IDENTITY_ALREADY_EXISTS: "IDENTITY_ALREADY_EXISTS",
  IDENTITY_NOT_FOUND: "IDENTITY_NOT_FOUND",
  IDENTITY_PROVIDER_UNAVAILABLE: "IDENTITY_PROVIDER_UNAVAILABLE",
  INVALID_CREDENTIAL: "INVALID_CREDENTIAL",
} as const;

export type IdentityErrorCode = (typeof IdentityErrorCodes)[keyof typeof IdentityErrorCodes];
