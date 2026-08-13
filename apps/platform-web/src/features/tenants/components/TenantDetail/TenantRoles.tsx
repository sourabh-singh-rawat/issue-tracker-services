import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useGetTenantRolesQuery } from "@generated/gql";
import { getErrorMessage } from "@shared/ui";

type TenantRolesProps = {
  tenantId: string;
};

export const TenantRoles = ({ tenantId }: TenantRolesProps) => {
  const rolesQuery = useGetTenantRolesQuery(
    { tenantId },
    {
      enabled: Boolean(tenantId),
      select: (data) => data.getTenantRoles ?? [],
    },
  );

  const roles = rolesQuery.data ?? [];

  return (
    <Stack spacing={2}>
      <Typography color="text.secondary">
        Roles available in this tenant. System roles (owner, admin, member) are created automatically
        when the tenant is created.
      </Typography>

      {rolesQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : null}

      {rolesQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(rolesQuery.error, "Failed to load tenant roles")}
        </Alert>
      ) : null}

      {rolesQuery.isSuccess && roles.length === 0 ? (
        <Alert severity="info">No tenant roles are defined for this tenant.</Alert>
      ) : null}

      {rolesQuery.isSuccess && roles.length > 0 ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Tenant roles">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Capabilities</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                    {role.key}
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, maxWidth: 360 }}>
                      {(role.capabilities ?? []).length === 0 ? (
                        <Typography color="text.secondary" variant="body2">
                          —
                        </Typography>
                      ) : (
                        (role.capabilities ?? []).map((capability) => (
                          <Chip
                            key={capability.id ?? capability.key}
                            size="small"
                            label={capability.key}
                            variant="outlined"
                            sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
                          />
                        ))
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={role.isSystem ? "System" : "Custom"}
                      color="default"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Stack>
  );
};
