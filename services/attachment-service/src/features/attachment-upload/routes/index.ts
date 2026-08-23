import type { HttpRoute } from "@pine/server";
import { uploadAttachment } from "./uploadAttachment";

export * from "./uploadAttachment";

export const attachmentUploadRoutes: HttpRoute[] = [uploadAttachment];
