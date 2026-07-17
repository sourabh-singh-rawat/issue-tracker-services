import { createFileRoute } from "@tanstack/react-router";
import { IssuePage } from "../../features/issue";

export const Route = createFileRoute("/_authenticated/i/$issueId")({
  component: IssuePage,
});
