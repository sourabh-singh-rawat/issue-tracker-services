import type { HttpRoute } from "@pine/http";
import { logout } from "@/features/logout/routes/logout";

export * from "@/features/logout/routes/logout";

export const logoutRoutes = [logout] as unknown as HttpRoute[];
