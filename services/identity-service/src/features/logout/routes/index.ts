import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { logout } from "@/features/logout/routes/logout";

export * from "@/features/logout/routes/logout";

export const logoutRoutes: HttpRouteOptions[] = [asHttpRoute(logout)];
