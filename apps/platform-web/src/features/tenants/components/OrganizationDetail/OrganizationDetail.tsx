import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useGetOrganizationQuery } from "@generated/gql";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { getErrorMessage } from "@shared/ui";
import type { SyntheticEvent } from "react";
import { OrganizationMembers } from "./OrganizationMembers";

type OrganizationDetailTab = "overview" | "members";

const formatDateTime = (value: unknown): string => {
  if (value == null) {
    return "—";
  }
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }
    return date.toLocaleString();
  }
  return "—";
};

const isOrganizationDetailTab = (value: unknown): value is OrganizationDetailTab =>
  value === "overview" || value === "members";

const organizationDetailTabs: ReadonlyArray<{ value: OrganizationDetailTab; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "members", label: "Members" },
];

export const OrganizationDetail = () => {
  const { tenantId, organizationId } = useParams({
    from: "/_authenticated/tenants_/$tenantId_/organizations/$organizationId",
  });
  const { tab } = useSearch({
    from: "/_authenticated/tenants_/$tenantId_/organizations/$organizationId",
  });
  const navigate = useNavigate();

  const organizationQuery = useGetOrganizationQuery(
    { id: organizationId },
    {
      select: (data) => data.getOrganization ?? null,
      enabled: Boolean(organizationId),
    },
  );

  const organization = organizationQuery.data;

  const handleTabChange = (_event: SyntheticEvent, value: string) => {
    if (!isOrganizationDetailTab(value)) {
      return;
    }
    void navigate({
      to: "/tenants/$tenantId/organizations/$organizationId",
      params: { tenantId, organizationId },
      search: { tab: value },
      replace: true,
    });
  };

  const handleBack = () => {
    void navigate({
      to: "/tenants/$tenantId",
      params: { tenantId },
      search: { tab: "organizations" },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button size="small" onClick={handleBack} sx={{ mb: 2, px: 0 }}>
          ← Back to organizations
        </Button>

        {organizationQuery.isPending ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress size={32} />
          </Box>
        ) : null}

        {organizationQuery.isError ? (
          <Alert severity="error">
            {getErrorMessage(organizationQuery.error, "Failed to load organization")}
          </Alert>
        ) : null}

        {organizationQuery.isSuccess && !organization ? (
          <Alert severity="warning">Organization not found.</Alert>
        ) : null}

        {organization ? (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mb: 1, alignItems: { sm: "center" }, justifyContent: "space-between" }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ alignItems: { sm: "center" } }}
            >
              <Typography variant="h5" component="h1">
                {organization.name ?? "Untitled organization"}
              </Typography>
              <Chip
                size="small"
                label={organization.isActive ? "Active" : "Inactive"}
                color={organization.isActive ? "success" : "default"}
                variant={organization.isActive ? "filled" : "outlined"}
                sx={{ alignSelf: "flex-start" }}
              />
            </Stack>
          </Stack>
        ) : null}
      </Box>

      {organizationId ? (
        <Box>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="Organization detail sections"
            sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
          >
            {organizationDetailTabs.map((item) => (
              <Tab key={item.value} value={item.value} label={item.label} />
            ))}
          </Tabs>

          {tab === "overview" ? (
            organization ? (
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      ID
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {organization.id ?? "—"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Tenant ID
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {organization.tenantId ?? "—"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Parent organization ID
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {organization.parentOrganizationId ?? "—"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Slug
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {organization.slug ?? "—"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Description
                    </Typography>
                    <Typography>{organization.description ?? "No description."}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Created
                    </Typography>
                    <Typography>{formatDateTime(organization.createdAt)}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Updated
                    </Typography>
                    <Typography>{formatDateTime(organization.updatedAt)}</Typography>
                  </Box>
                </Stack>
              </Paper>
            ) : null
          ) : null}

          {tab === "members" ? <OrganizationMembers organizationId={organizationId} /> : null}
        </Box>
      ) : null}
    </Container>
  );
};
