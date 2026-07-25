import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/(no-auth)/consent")({
  validateSearch: (search: Record<string, unknown>) => ({
    consent_challenge:
      typeof search.consent_challenge === "string" ? search.consent_challenge : undefined,
  }),
  component: lazyRouteComponent(() => import("@features/consent/components"), "ConsentForm"),
});
