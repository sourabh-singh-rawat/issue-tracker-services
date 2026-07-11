import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "../features";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
