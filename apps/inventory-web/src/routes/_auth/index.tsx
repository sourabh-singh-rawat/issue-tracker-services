import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
  component: HomePage,
});

function HomePage() {
  return <h1>Inventory</h1>;
}
