import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/platform-roles_/$roleId")({
  component: lazyRouteComponent(() => import("@features/roles/components"), "RoleDetail"),
});
