import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export type TenantDetailTab = "overview" | "members" | "roles" | "organizations";

const isTenantDetailTab = (value: unknown): value is TenantDetailTab =>
  value === "overview" || value === "members" || value === "roles" || value === "organizations";

export const Route = createFileRoute("/_authenticated/tenants_/$tenantId")({
  validateSearch: (search: Record<string, unknown>): { tab: TenantDetailTab } => ({
    tab: isTenantDetailTab(search.tab) ? search.tab : "overview",
  }),
  component: lazyRouteComponent(() => import("@features/tenants/components"), "TenantDetail"),
});
