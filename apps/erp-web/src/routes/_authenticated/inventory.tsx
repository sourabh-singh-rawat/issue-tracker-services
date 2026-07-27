import { createFileRoute } from "@tanstack/react-router";
import { InventoryHomePage } from "@features/inventory";

export const Route = createFileRoute("/_authenticated/inventory")({
  component: InventoryHomePage,
});
