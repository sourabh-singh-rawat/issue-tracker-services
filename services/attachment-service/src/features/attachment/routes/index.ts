import type { HttpRouteOptions } from "@pine/server-core";
import { createAttachment } from "@/features/attachment/routes/createAttachment";

export * from "@/features/attachment/routes/createAttachment";

export const attachmentRoutes: HttpRouteOptions[] = [createAttachment];
