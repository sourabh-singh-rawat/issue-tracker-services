import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/(no-auth)/signup")({
  component: lazyRouteComponent(() => import("@features/signup/components"), "SignupForm"),
});
