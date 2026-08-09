import type { HttpRoute } from "@pine/server";
import { attachmentRoutes } from "@/features/attachment";

export const routes: HttpRoute[] = [...attachmentRoutes];
