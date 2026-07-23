import { createFileRoute } from "@tanstack/react-router";
import { ListView } from "../../features";

export const Route = createFileRoute("/_authenticated/$workspaceId/v/l/$viewId")({
  component: ListView,
});
