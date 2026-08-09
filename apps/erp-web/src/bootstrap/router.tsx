import { createRouter, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { routeTree } from "@generated/routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const createAppRouter = () =>
  createRouter({
    routeTree,
    defaultNotFoundComponent: () => <h1>404</h1>,
  });

const router = createAppRouter();

export const AppRouterProvider = () => (
  <>
    <RouterProvider router={router} />
    {import.meta.env.DEV && <TanStackRouterDevtools router={router} initialIsOpen={false} />}
  </>
);
