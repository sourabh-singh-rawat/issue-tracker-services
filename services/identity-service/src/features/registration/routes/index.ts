import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { registerWithEmailAndPassword } from "@/features/registration/routes/registerWithEmailAndPassword";

export * from "@/features/registration/routes/registerWithEmailAndPassword";

export const registrationRoutes: HttpRouteOptions[] = [
  asHttpRoute(registerWithEmailAndPassword),
];
