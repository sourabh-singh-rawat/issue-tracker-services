import type { AttachmentScan } from "@/db";

export type ScanAttachmentInput = {
  attachmentId: string;
  versionId: string;
  scopeType: "IDENTITY" | "ORGANIZATION";
  scopeId: string;
  tenantId?: string;
};

export interface IAttachmentScannerService {
  scan: (input: ScanAttachmentInput) => Promise<AttachmentScan>;
}
