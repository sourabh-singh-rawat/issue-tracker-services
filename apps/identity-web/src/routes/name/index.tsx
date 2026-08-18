import { createFileRoute } from "@tanstack/react-router";
import { NamePage } from "@features/home";

export const Route = createFileRoute("/name/")({
  component: NamePage,
});
