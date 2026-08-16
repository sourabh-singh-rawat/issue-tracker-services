import type { HttpRoute } from "@pine/server";
import { getIdentityFromSession } from "@/features/session/routes/getIdentityFromSession";
import { getIdentityFromAccessToken } from "@/features/session/routes/getIdentityFromAccessToken";

export * from "@/features/session/routes/getIdentityFromSession";
export * from "@/features/session/routes/getIdentityFromAccessToken";

export const sessionRoutes: HttpRoute[] = [getIdentityFromSession, getIdentityFromAccessToken];
