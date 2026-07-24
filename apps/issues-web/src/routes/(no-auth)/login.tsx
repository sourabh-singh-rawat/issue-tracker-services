import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@features/auth";

export const Route = createFileRoute("/(no-auth)/login")({
  component: LoginPage,
});
