import type { HttpRoute } from "@pine/http";
import { signin } from "@/features/signin/routes/signin";

export * from "@/features/signin/routes/signin";

export const signinRoutes = [signin] as unknown as HttpRoute[];
