import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { me } from "@/features/me/routes/me";

export * from "@/features/me/routes/me";

export const meRoutes: HttpRouteOptions[] = [asHttpRoute(me)];
