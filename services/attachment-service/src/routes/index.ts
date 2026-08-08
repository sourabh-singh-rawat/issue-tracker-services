import type { HttpRoute } from "@pine/http";
import { attachmentRoutes } from "@/features/attachment";

export const routes: HttpRoute[] = [...attachmentRoutes];
