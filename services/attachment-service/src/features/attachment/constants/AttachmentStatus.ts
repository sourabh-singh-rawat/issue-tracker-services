export const ATTACHMENT_STATUS = {
  QUARANTINED: "QUARANTINED",
  AVAILABLE: "AVAILABLE",
  REJECTED: "REJECTED",
  DELETED: "DELETED",
} as const;

export type AttachmentStatus = (typeof ATTACHMENT_STATUS)[keyof typeof ATTACHMENT_STATUS];
