import type { HttpRouteOptions } from "@pine/server-core";
import { logout } from "@/features/logout/routes/logout";

export * from "@/features/logout/routes/logout";

export const logoutRoutes: HttpRouteOptions[] = [logout];
