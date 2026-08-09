import type { HttpRoute } from "@pine/server";
import { meRoutes } from "@/features/me";

export const routes: HttpRoute[] = [...meRoutes];
