import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useGetRolesQuery } from "@generated/gql";
import { useNavigate } from "@tanstack/react-router";
import { getErrorMessage } from "@shared/ui";
import { CreateRoleModal } from "../CreateRoleModal";

export const Roles = () => {
  const navigate = useNavigate();
  const rolesQuery = useGetRolesQuery(undefined, {
    select: (data) => data.getRoles ?? [],
  });

  const roles = rolesQuery.data ?? [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3, alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Roles
          </Typography>
          <Typography color="text.secondary">
            System and custom roles from the authorization service.
          </Typography>
        </Box>
        <CreateRoleModal />
      </Stack>

      {rolesQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={32} />
        </Box>
      ) : null}

      {rolesQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(rolesQuery.error, "Failed to load roles")}
        </Alert>
      ) : null}

      {rolesQuery.isSuccess ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Roles">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography color="text.secondary">No roles found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                roles.map((role) => (
                  <TableRow
                    key={role.id ?? role.key ?? role.name ?? undefined}
                    hover
                    sx={role.id ? { cursor: "pointer" } : undefined}
                    onClick={() => {
                      if (!role.id) {
                        return;
                      }
                      void navigate({
                        to: "/roles/$roleId",
                        params: { roleId: role.id },
                      });
                    }}
                  >
                    <TableCell>{role.name ?? "—"}</TableCell>
                    <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {role.key ?? "—"}
                    </TableCell>
                    <TableCell>{role.description ?? "—"}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={role.system ? "System" : "Custom"}
                        color={role.system ? "default" : "primary"}
                        variant={role.system ? "outlined" : "filled"}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Container>
  );
};
