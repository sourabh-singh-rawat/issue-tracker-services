import { Root } from "@shared/ui";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <Root />,
});
