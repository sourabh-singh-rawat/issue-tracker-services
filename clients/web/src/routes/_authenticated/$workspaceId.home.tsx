import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../../features";

export const Route = createFileRoute("/_authenticated/$workspaceId/home")({
  component: HomePage,
});
