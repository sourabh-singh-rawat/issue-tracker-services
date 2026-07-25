import { Outlet, createRootRoute } from "@tanstack/react-router";

function NotFound() {
  return <h1>404</h1>;
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return <Outlet />;
}
