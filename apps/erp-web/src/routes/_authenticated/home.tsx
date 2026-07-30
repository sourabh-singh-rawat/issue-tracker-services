import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@features/home";

export const Route = createFileRoute("/_authenticated/home")({
  component: HomePage,
});
