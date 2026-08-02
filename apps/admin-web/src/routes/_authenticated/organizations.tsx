import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/organizations")({
  component: lazyRouteComponent(
    () => import("@features/organizations/components"),
    "Organizations",
  ),
});
