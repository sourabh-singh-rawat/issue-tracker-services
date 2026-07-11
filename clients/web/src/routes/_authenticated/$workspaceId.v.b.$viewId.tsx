import { createFileRoute } from "@tanstack/react-router";
import { BoardView } from "../../features";

export const Route = createFileRoute(
  "/_authenticated/$workspaceId/v/b/$viewId",
)({
  component: BoardView,
});
