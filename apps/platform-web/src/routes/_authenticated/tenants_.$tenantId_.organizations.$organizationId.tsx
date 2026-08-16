import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export type OrganizationDetailTab = "overview" | "members" | "roles";

const isOrganizationDetailTab = (value: unknown): value is OrganizationDetailTab =>
  value === "overview" || value === "members" || value === "roles";

export const Route = createFileRoute(
  "/_authenticated/tenants_/$tenantId_/organizations/$organizationId",
)({
  validateSearch: (search: Record<string, unknown>): { tab: OrganizationDetailTab } => ({
    tab: isOrganizationDetailTab(search.tab) ? search.tab : "overview",
  }),
  component: lazyRouteComponent(
    () => import("@features/tenants/components"),
    "OrganizationDetail",
  ),
});
