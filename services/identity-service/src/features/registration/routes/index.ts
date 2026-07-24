import type { HttpRouteOptions } from "@pine/server-core";
import { registerWithEmailAndPassword } from "@/features/registration/routes/registerWithEmailAndPassword";

export * from "@/features/registration/routes/registerWithEmailAndPassword";

export const registrationRoutes: HttpRouteOptions[] = [registerWithEmailAndPassword];
