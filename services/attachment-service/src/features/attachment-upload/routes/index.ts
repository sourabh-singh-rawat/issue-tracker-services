import type { HttpRoute } from "@pine/server";
import { uploadToTarget } from "./uploadToTarget";

export * from "./uploadToTarget";

export const attachmentUploadRoutes: HttpRoute[] = [uploadToTarget];
