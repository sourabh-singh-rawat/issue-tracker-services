import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "../../features";

export const Route = createFileRoute("/_authenticated/me")({
  component: ProfilePage,
});
