import { CONTENT_ATTACHMENT_SCAN_STATUS } from "./ContentAttachmentScanStatus";
import { MALWARE_ATTACHMENT_SCAN_STATUS } from "./MalwareAttachmentScanStatus";

export const ATTACHMENT_SCAN_STATUS = {
  ...MALWARE_ATTACHMENT_SCAN_STATUS,
  ...CONTENT_ATTACHMENT_SCAN_STATUS,
} as const;

export type AttachmentScanStatus =
  (typeof ATTACHMENT_SCAN_STATUS)[keyof typeof ATTACHMENT_SCAN_STATUS];
