import type { HttpRoute } from "@pine/server";
import { createUploadTarget } from "./createUploadTarget";
import { uploadToTarget } from "./uploadToTarget";

export * from "./createUploadTarget";
export * from "./uploadToTarget";

export const attachmentUploadRoutes: HttpRoute[] = [createUploadTarget, uploadToTarget];
