import type { HttpRouteOptions } from "@pine/server-core";
import { loginRoutes } from "@/features/login";
import { registrationRoutes } from "@/features/registration";

export const routes: HttpRouteOptions[] = [...loginRoutes, ...registrationRoutes];
