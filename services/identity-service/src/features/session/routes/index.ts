import type { HttpRoute } from "@pine/http";
import { getSession } from "@/features/session/routes/getSession";
import { getTokenSession } from "@/features/session/routes/getTokenSession";

export * from "@/features/session/routes/getSession";
export * from "@/features/session/routes/getTokenSession";

export const sessionRoutes = [getSession, getTokenSession] as unknown as HttpRoute[];
