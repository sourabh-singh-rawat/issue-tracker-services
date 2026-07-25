import type { HttpRouteOptions } from "@pine/http-core";
import { loginRoutes } from "@/features/login";
import { logoutRoutes } from "@/features/logout";
import { meRoutes } from "@/features/me";
import { oauthRoutes } from "@/features/oauth";
import { registrationRoutes } from "@/features/registration";

export const routes: HttpRouteOptions[] = [
  ...loginRoutes,
  ...logoutRoutes,
  ...meRoutes,
  ...oauthRoutes,
  ...registrationRoutes,
];
