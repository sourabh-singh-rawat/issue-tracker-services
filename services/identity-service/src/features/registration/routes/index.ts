import type { HttpRoute } from "@pine/server";
import { register } from "@/features/registration/routes/register";

export * from "@/features/registration/routes/register";

export const registrationRoutes: HttpRoute[] = [register];
