import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(no-auth)/login")({
  component: LoginPage,
});

function LoginPage() {
  return <h1>Login</h1>;
}
