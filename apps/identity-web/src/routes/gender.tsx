import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/gender")({
  component: lazyRouteComponent(() => import("@features/home/components"), "UpdateGender"),
});
