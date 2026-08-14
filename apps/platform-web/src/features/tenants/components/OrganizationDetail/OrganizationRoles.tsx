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
import { useGetOrganizationRolesQuery } from "@generated/gql";
import { getErrorMessage } from "@shared/ui";

type OrganizationRolesProps = {
  organizationId: string;
};

export const OrganizationRoles = ({ organizationId }: OrganizationRolesProps) => {
  const rolesQuery = useGetOrganizationRolesQuery(
    { organizationId },
    {
      enabled: Boolean(organizationId),
      select: (data) => data.getOrganizationRoles ?? [],
    },
  );

  const roles = rolesQuery.data ?? [];

  return (
    <Stack spacing={2}>
      <Typography color="text.secondary">
        Roles available in this organization. System roles (owner, admin, member) are created
        automatically when the organization is created.
      </Typography>

      {rolesQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : null}

      {rolesQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(rolesQuery.error, "Failed to load organization roles")}
        </Alert>
      ) : null}

      {rolesQuery.isSuccess && roles.length === 0 ? (
        <Alert severity="info">No organization roles are defined for this organization.</Alert>
      ) : null}

      {rolesQuery.isSuccess && roles.length > 0 ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Organization roles">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Permissions</TableCell>
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
                      {(role.permissions ?? []).length === 0 ? (
                        <Typography color="text.secondary" variant="body2">
                          —
                        </Typography>
                      ) : (
                        (role.permissions ?? []).map((permission) => (
                          <Chip
                            key={permission.key}
                            size="small"
                            label={permission.key}
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
