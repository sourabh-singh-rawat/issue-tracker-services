import { Outlet, createFileRoute } from "@tanstack/react-router";
import { PrivateRoutes } from "@shared/ui";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <PrivateRoutes>
      <Outlet />
    </PrivateRoutes>
  );
}
