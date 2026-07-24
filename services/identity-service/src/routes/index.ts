import type { HttpRouteOptions } from "@pine/server-core";
import { loginRoutes } from "@/features/login";
import { logoutRoutes } from "@/features/logout";
import { meRoutes } from "@/features/me";
import { registrationRoutes } from "@/features/registration";

export const routes: HttpRouteOptions[] = [
  ...loginRoutes,
  ...logoutRoutes,
  ...meRoutes,
  ...registrationRoutes,
];
