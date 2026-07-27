import { createFileRoute } from "@tanstack/react-router";
import WorkspaceSettings from "@features/workspace/pages/WorkspaceSettings";

export const Route = createFileRoute("/_authenticated/workspaces/$id/settings")({
  component: WorkspaceSettings,
});
