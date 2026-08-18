import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/name/")({
  component: lazyRouteComponent(() => import("@features/home/components"), "Name"),
});
