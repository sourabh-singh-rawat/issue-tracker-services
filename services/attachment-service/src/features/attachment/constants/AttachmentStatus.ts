export type AttachmentStatus =
  | "UPLOADING"
  | "QUARANTINED"
  | "AVAILABLE"
  | "REJECTED"
  | "DELETED";

export const ATTACHMENT_STATUS: { [K in AttachmentStatus]: K } = {
  UPLOADING: "UPLOADING",
  QUARANTINED: "QUARANTINED",
  AVAILABLE: "AVAILABLE",
  REJECTED: "REJECTED",
  DELETED: "DELETED",
};
