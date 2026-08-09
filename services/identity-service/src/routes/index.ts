import type { HttpRoute } from "@pine/server";
import { logoutRoutes } from "@/features/logout";
import { meRoutes } from "@/features/me";
import { oauthRoutes } from "@/features/oauth";
import { registrationRoutes } from "@/features/registration";
import { sessionRoutes } from "@/features/session";
import { signinRoutes } from "@/features/signin";
import { verificationRoutes } from "@/features/verification";

export const routes: HttpRoute[] = [
  ...signinRoutes,
  ...logoutRoutes,
  ...meRoutes,
  ...sessionRoutes,
  ...oauthRoutes,
  ...registrationRoutes,
  ...verificationRoutes,
];
