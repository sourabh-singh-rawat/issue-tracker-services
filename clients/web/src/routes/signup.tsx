import { createFileRoute } from "@tanstack/react-router";
import { SignUpPage } from "../features";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});
