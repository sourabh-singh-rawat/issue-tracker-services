import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { register } from "@/features/registration/routes/register";

export * from "@/features/registration/routes/register";

export const registrationRoutes: HttpRouteOptions[] = [asHttpRoute(register)];
