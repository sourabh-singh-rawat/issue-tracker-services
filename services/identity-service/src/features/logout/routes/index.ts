import type { HttpRoute } from "@pine/server";
import { logout } from "@/features/logout/routes/logout";

export * from "@/features/logout/routes/logout";

export const logoutRoutes: HttpRoute[] = [logout];
