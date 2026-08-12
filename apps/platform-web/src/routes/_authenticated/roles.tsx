import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/roles")({
  component: lazyRouteComponent(() => import("@features/roles/components"), "Roles"),
});
