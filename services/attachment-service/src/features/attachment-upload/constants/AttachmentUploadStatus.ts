export const ATTACHMENT_UPLOAD_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type AttachmentUploadStatus =
  (typeof ATTACHMENT_UPLOAD_STATUS)[keyof typeof ATTACHMENT_UPLOAD_STATUS];
