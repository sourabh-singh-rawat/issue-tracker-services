import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import { useGetRoleQuery } from "@generated/gql";
import { Link, useParams } from "@tanstack/react-router";
import { getErrorMessage } from "@shared/ui";

export const RoleDetail = () => {
  const { roleId } = useParams({ from: "/_authenticated/roles_/$roleId" });

  const roleQuery = useGetRoleQuery(
    { id: roleId },
    {
      select: (data) => data.getRole ?? null,
      enabled: Boolean(roleId),
    },
  );

  const role = roleQuery.data;
  const capabilities = role?.capabilities ?? [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button component={Link} to="/roles" size="small" sx={{ mb: 2, px: 0 }}>
          ← Back to roles
        </Button>

        {roleQuery.isPending ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress size={32} />
          </Box>
        ) : null}

        {roleQuery.isError ? (
          <Alert severity="error">
            {getErrorMessage(roleQuery.error, "Failed to load role")}
          </Alert>
        ) : null}

        {roleQuery.isSuccess && !role ? (
          <Alert severity="warning">Role not found.</Alert>
        ) : null}

        {role ? (
          <>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mb: 1, alignItems: { sm: "center" } }}
            >
              <Typography variant="h5" component="h1">
                {role.name ?? "Untitled role"}
              </Typography>
              <Chip
                size="small"
                label={role.system ? "System" : "Custom"}
                color={role.system ? "default" : "primary"}
                variant={role.system ? "outlined" : "filled"}
                sx={{ alignSelf: "flex-start" }}
              />
            </Stack>
            <Typography
              color="text.secondary"
              sx={{ fontFamily: "monospace", fontSize: "0.875rem", mb: 1 }}
            >
              {role.key ?? "—"}
            </Typography>
            <Typography color="text.secondary">
              {role.description ?? "No description."}
            </Typography>
          </>
        ) : null}
      </Box>

      {role ? (
        <>
          <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
            Capabilities
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="Role capabilities">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Key</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {capabilities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography color="text.secondary">
                        This role has no capabilities assigned.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  capabilities.map((capability) => (
                    <TableRow
                      key={capability.id ?? capability.key ?? capability.name ?? undefined}
                    >
                      <TableCell>{capability.name ?? "—"}</TableCell>
                      <TableCell
                        sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                      >
                        {capability.key ?? "—"}
                      </TableCell>
                      <TableCell>{capability.description ?? "—"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </Container>
  );
};
