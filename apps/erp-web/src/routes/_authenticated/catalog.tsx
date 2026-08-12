import { createFileRoute } from "@tanstack/react-router";
import { CatalogHomePage } from "@features/catalog";

export const Route = createFileRoute("/_authenticated/catalog")({
  component: CatalogHomePage,
});
