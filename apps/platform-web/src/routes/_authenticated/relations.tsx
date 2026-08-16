import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/relations")({
  component: lazyRouteComponent(() => import("@features/roles/components"), "PlatformRoles"),
});
