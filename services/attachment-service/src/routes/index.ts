import type { HttpRoute } from "@pine/server";
import { attachmentUploadRoutes } from "@/features/attachment-upload";

export const routes: HttpRoute[] = [...attachmentUploadRoutes];
