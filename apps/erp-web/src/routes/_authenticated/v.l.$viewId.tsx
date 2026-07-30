import { createFileRoute } from "@tanstack/react-router";
import { ListView } from "@features/view";

export const Route = createFileRoute("/_authenticated/v/l/$viewId")({
  component: ListView,
});
