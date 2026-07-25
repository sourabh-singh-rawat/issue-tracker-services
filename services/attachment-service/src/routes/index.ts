import type { HttpRouteOptions } from "@pine/http-core";
import { attachmentRoutes } from "@/features/attachment";

export const routes: HttpRouteOptions[] = [...attachmentRoutes];
