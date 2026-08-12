import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export type TenantDetailTab = "overview" | "organizations";

const isTenantDetailTab = (value: unknown): value is TenantDetailTab =>
  value === "overview" || value === "organizations";

export const Route = createFileRoute("/_authenticated/tenants_/$tenantId")({
  validateSearch: (search: Record<string, unknown>): { tab: TenantDetailTab } => ({
    tab: isTenantDetailTab(search.tab) ? search.tab : "overview",
  }),
  component: lazyRouteComponent(() => import("@features/tenants/components"), "TenantDetail"),
});
