export const EMAIL_STATUS = {
  PENDING: "Pending",
  SENT: "Sent",
  FAILED: "Failed",
  DELIVERED: "Delivered",
  OPENED: "Opened",
  CLICKED: "Clicked",
  BOUNCED: "Bounced",
  SPAM: "Spam",
} as const;

export type EmailStatus = (typeof EMAIL_STATUS)[keyof typeof EMAIL_STATUS];
