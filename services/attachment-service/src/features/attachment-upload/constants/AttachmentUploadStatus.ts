export type AttachmentUploadStatus = "PENDING" | "COMPLETED" | "FAILED";

export const ATTACHMENT_UPLOAD_STATUS: { [K in AttachmentUploadStatus]: K } = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};
