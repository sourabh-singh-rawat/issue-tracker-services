import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/v/b/$viewId")({
  component: () => null,
});
