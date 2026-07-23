import type { HttpRouteOptions } from "@pine/server-core";
import { login } from "@/features/login/routes/login";

export * from "@/features/login/routes/login";

export const loginRoutes: HttpRouteOptions[] = [login];
