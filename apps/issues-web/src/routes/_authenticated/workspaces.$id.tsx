import { createFileRoute } from "@tanstack/react-router";
import Workspace from "@features/workspace/pages/Workspace";

export const Route = createFileRoute("/_authenticated/workspaces/$id")({
  component: Workspace,
});
