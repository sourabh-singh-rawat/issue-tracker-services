import type { HttpRoute } from "@pine/server";
import { attachmentRoutes } from "@/features/attachment";
import { attachmentUploadRoutes } from "@/features/attachment-upload";

export const routes: HttpRoute[] = [...attachmentRoutes, ...attachmentUploadRoutes];
