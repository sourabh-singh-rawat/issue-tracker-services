import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@generated/routeTree.gen.ts";

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

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};
