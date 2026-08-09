import type { HttpRoute } from "@pine/server";
import { verifyEmail } from "@/features/verification/routes/verifyEmail";
import { resendVerificationEmail } from "@/features/verification/routes/resendVerificationEmail";

export * from "@/features/verification/routes/verifyEmail";
export * from "@/features/verification/routes/resendVerificationEmail";

export const verificationRoutes: HttpRoute[] = [verifyEmail, resendVerificationEmail];
