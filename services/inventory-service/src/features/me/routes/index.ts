import type { HttpRoute } from "@pine/http";
import { me } from "@/features/me/routes/me";

export * from "@/features/me/routes/me";

export const meRoutes = [me] as unknown as HttpRoute[];
