import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/(no-auth)/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    login_challenge:
      typeof search.login_challenge === "string" ? search.login_challenge : undefined,
  }),
  component: lazyRouteComponent(() => import("@features/login/components"), "LoginForm"),
});
