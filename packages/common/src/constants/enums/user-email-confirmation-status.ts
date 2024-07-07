export const USER_EMAIL_CONFIRMATION_STATUS = {
  PENDING: "Pending",
  SENT: "Sent",
  ACCEPTED: "Accepted",
  EXPIRED: "Expired",
  REVOKED: "Revoked",
} as const;

export type UserEmailConfirmationStatus =
  (typeof USER_EMAIL_CONFIRMATION_STATUS)[keyof typeof USER_EMAIL_CONFIRMATION_STATUS];
