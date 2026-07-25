import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { login } from "@/features/login/routes/login";

export * from "@/features/login/routes/login";

export const loginRoutes: HttpRouteOptions[] = [asHttpRoute(login)];
