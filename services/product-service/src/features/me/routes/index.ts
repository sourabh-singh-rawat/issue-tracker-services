import type { HttpRoute } from "@pine/server";
import { me } from "@/features/me/routes/me";

export * from "@/features/me/routes/me";

export const meRoutes: HttpRoute[] = [me];
