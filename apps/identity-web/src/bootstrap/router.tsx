import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@generated/routeTree.gen.ts";
import { useHelloWorldQuery } from "@generated/gql/hooks";

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
  useHelloWorldQuery();

  return <RouterProvider router={router} />;
};
