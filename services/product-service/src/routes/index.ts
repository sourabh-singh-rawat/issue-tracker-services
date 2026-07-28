import type { HttpRouteOptions } from "@pine/http-core";
import { meRoutes } from "@/features/me";

export const routes: HttpRouteOptions[] = [...meRoutes];
