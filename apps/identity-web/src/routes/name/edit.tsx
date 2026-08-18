import { createFileRoute } from "@tanstack/react-router";
import { UpdateNamePage } from "@features/home";

export const Route = createFileRoute("/name/edit")({
  component: UpdateNamePage,
});
