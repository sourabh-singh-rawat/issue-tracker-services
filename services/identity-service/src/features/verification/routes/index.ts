import { asHttpRoute, type HttpRouteOptions } from "@pine/http-core";
import { verifyEmail } from "@/features/verification/routes/verifyEmail";
import { resendVerificationEmail } from "@/features/verification/routes/resendVerificationEmail";

export * from "@/features/verification/routes/verifyEmail";
export * from "@/features/verification/routes/resendVerificationEmail";

export const verificationRoutes: HttpRouteOptions[] = [
  asHttpRoute(verifyEmail),
  asHttpRoute(resendVerificationEmail),
];
