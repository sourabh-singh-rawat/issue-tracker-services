import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { authorize } from "@/features/oauth/routes/authorize";

export * from "@/features/oauth/routes/authorize";

export const oauthRoutes: HttpRouteOptions[] = [asHttpRoute(authorize)];
