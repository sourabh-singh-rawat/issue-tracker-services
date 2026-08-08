import type { HttpRoute } from "@pine/http";
import { createAttachment } from "@/features/attachment/routes/createAttachment";

export * from "@/features/attachment/routes/createAttachment";

export const attachmentRoutes = [createAttachment] as unknown as HttpRoute[];
