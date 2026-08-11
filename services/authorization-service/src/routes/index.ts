import type { HttpRoute } from "@pine/server";
import { authorizationRoutes } from "@/features/authorization/routes";

export const routes: HttpRoute[] = [...authorizationRoutes];
