import { createFileRoute } from "@tanstack/react-router";
import WorkspaceMembers from "@features/workspace/pages/WorkspaceMembers";

export const Route = createFileRoute("/_authenticated/workspaces/$id/members")({
  component: WorkspaceMembers,
});
