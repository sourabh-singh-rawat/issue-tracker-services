import type { HttpRoute } from "@pine/http";
import { acceptConsent } from "@/features/oauth/routes/acceptConsent";
import { authorize } from "@/features/oauth/routes/authorize";
import { consent } from "@/features/oauth/routes/consent";
import { rejectConsent } from "@/features/oauth/routes/rejectConsent";
import { token } from "@/features/oauth/routes/token";

export * from "@/features/oauth/routes/acceptConsent";
export * from "@/features/oauth/routes/authorize";
export * from "@/features/oauth/routes/consent";
export * from "@/features/oauth/routes/rejectConsent";
export * from "@/features/oauth/routes/token";

export const oauthRoutes = [
  authorize,
  consent,
  acceptConsent,
  rejectConsent,
  token,
] as unknown as HttpRoute[];
