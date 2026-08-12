import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/roles_/$roleId")({
  component: lazyRouteComponent(() => import("@features/roles/components"), "RoleDetail"),
});
