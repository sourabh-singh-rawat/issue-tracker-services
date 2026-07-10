import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../__generated__/routeTree.gen";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <h1>404</h1>,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
