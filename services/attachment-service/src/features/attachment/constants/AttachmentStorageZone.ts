export const ATTACHMENT_STORAGE_ZONE = {
  QUARANTINE: "quarantine",
  TRUSTED: "trusted",
} as const;

export type AttachmentStorageZone =
  (typeof ATTACHMENT_STORAGE_ZONE)[keyof typeof ATTACHMENT_STORAGE_ZONE];
