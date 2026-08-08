import type { HttpRoute } from "@pine/http";
import { verifyEmail } from "@/features/verification/routes/verifyEmail";
import { resendVerificationEmail } from "@/features/verification/routes/resendVerificationEmail";

export * from "@/features/verification/routes/verifyEmail";
export * from "@/features/verification/routes/resendVerificationEmail";

export const verificationRoutes = [verifyEmail, resendVerificationEmail] as unknown as HttpRoute[];
