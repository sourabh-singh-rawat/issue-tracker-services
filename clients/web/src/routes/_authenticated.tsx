import { Outlet, createFileRoute } from "@tanstack/react-router";
import { PrivateRoutes } from "../common";

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
