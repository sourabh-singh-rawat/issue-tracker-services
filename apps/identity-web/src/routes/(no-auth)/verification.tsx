import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/(no-auth)/verification")({
  validateSearch: (search: Record<string, unknown>) => ({
    flow: typeof search.flow === "string" ? search.flow : undefined,
    code:
      search.code !== undefined && search.code !== "" && !Number.isNaN(Number(search.code))
        ? Number(search.code)
        : undefined,
  }),
  component: lazyRouteComponent(
    () => import("@features/verification/components"),
    "CodeVerification",
  ),
});
