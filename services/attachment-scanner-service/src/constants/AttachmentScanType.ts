export const ATTACHMENT_SCAN_TYPE = {
  MALWARE: "MALWARE",
  CONTENT: "CONTENT",
} as const;

export type AttachmentScanType = (typeof ATTACHMENT_SCAN_TYPE)[keyof typeof ATTACHMENT_SCAN_TYPE];
