import type { HttpRoute } from "@pine/server";
import { createAttachment } from "@/features/attachment/routes/createAttachment";

export * from "@/features/attachment/routes/createAttachment";

export const attachmentRoutes: HttpRoute[] = [createAttachment];
