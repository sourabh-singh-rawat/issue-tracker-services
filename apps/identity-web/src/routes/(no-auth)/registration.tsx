import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/(no-auth)/registration")({
  component: lazyRouteComponent(
    () => import("@features/registration/components"),
    "RegistrationForm",
  ),
});
