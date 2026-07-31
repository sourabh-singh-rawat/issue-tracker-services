import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { signin } from "@/features/signin/routes/signin";

export * from "@/features/signin/routes/signin";

export const signinRoutes: HttpRouteOptions[] = [asHttpRoute(signin)];
