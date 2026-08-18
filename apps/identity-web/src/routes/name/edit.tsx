import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/name/edit")({
  component: lazyRouteComponent(() => import("@features/home/components"), "UpdateName"),
});
