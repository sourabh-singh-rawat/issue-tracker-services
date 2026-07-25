import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { createAttachment } from "@/features/attachment/routes/createAttachment";

export * from "@/features/attachment/routes/createAttachment";

export const attachmentRoutes: HttpRouteOptions[] = [asHttpRoute(createAttachment)];
