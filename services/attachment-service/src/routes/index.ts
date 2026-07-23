import type { HttpRouteOptions } from "@pine/server-core";
import { attachmentRoutes } from "@/features/attachment";

export const routes: HttpRouteOptions[] = [...attachmentRoutes];
