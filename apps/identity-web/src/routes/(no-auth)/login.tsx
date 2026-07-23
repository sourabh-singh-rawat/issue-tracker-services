import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/(no-auth)/login")({
  component: lazyRouteComponent(() => import("@features/login/components"), "LoginForm"),
});
