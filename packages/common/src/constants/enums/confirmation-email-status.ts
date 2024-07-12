export const CONFIRMATION_EMAIL_STATUS = {
  SENT: "Sent",
  DELIVERED: "Delivered",
  FAILED: "Failed",
  NOT_SENT: "Not Sent",
} as const;

export type ConfirmationEmailStatus =
  (typeof CONFIRMATION_EMAIL_STATUS)[keyof typeof CONFIRMATION_EMAIL_STATUS];
