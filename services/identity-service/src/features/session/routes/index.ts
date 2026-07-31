import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { getSession } from "@/features/session/routes/getSession";
import { getTokenSession } from "@/features/session/routes/getTokenSession";

export * from "@/features/session/routes/getSession";
export * from "@/features/session/routes/getTokenSession";

export const sessionRoutes: HttpRouteOptions[] = [
  asHttpRoute(getSession),
  asHttpRoute(getTokenSession),
];
