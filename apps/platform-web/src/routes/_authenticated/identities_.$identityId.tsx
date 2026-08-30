import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/identities_/$identityId")({
  component: lazyRouteComponent(
    () => import("@features/roles/components"),
    "IdentityRelationsPage",
  ),
});
