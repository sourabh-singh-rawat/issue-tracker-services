import type { HttpRouteOptions } from "@pine/server-core";
import { loginRoutes } from "@/features/login";

export const routes: HttpRouteOptions[] = [...loginRoutes];
