import type { HttpRouteOptions } from "@pine/server-core";
import { me } from "@/features/me/routes/me";

export * from "@/features/me/routes/me";

export const meRoutes: HttpRouteOptions[] = [me];
