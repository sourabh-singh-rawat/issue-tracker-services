import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/(no-auth)/resend-verification")({
  component: lazyRouteComponent(
    () => import("@features/verification/components"),
    "ResendEmailVerification",
  ),
});
