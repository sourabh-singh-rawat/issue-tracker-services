import type { HttpRoute } from "@pine/server";
import { signin } from "@/features/signin/routes/signin";

export * from "@/features/signin/routes/signin";

export const signinRoutes: HttpRoute[] = [signin];
