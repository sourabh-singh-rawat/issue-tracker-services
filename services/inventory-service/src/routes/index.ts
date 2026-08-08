import type { HttpRoute } from "@pine/http";
import { meRoutes } from "@/features/me";

export const routes: HttpRoute[] = [...meRoutes];
