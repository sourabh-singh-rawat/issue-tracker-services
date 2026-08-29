import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/identities")({
  component: lazyRouteComponent(() => import("@features/roles/components"), "PlatformRelations"),
});
