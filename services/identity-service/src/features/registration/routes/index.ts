import type { HttpRoute } from "@pine/http";
import { register } from "@/features/registration/routes/register";

export * from "@/features/registration/routes/register";

export const registrationRoutes = [register] as unknown as HttpRoute[];
