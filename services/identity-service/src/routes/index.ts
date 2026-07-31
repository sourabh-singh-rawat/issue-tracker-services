import type { HttpRouteOptions } from "@pine/http-core";
import { loginRoutes } from "@/features/login";
import { logoutRoutes } from "@/features/logout";
import { meRoutes } from "@/features/me";
import { oauthRoutes } from "@/features/oauth";
import { registrationRoutes } from "@/features/registration";
import { sessionRoutes } from "@/features/session";

export const routes: HttpRouteOptions[] = [
  ...loginRoutes,
  ...logoutRoutes,
  ...meRoutes,
  ...sessionRoutes,
  ...oauthRoutes,
  ...registrationRoutes,
];
