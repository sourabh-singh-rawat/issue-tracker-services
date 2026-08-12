import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useDeletePlatformRoleMutation, useGetPlatformRolesQuery } from "@generated/gql";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import { CreateRoleModal } from "../CreateRoleModal";

export const Roles = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const rolesQuery = useGetPlatformRolesQuery(undefined, {
    select: (data) => data.getPlatformRoles ?? [],
  });
  const deleteRoleMutation = useDeletePlatformRoleMutation();

  const roles = rolesQuery.data ?? [];

  const handleDelete = async (
    id: string | null | undefined,
    name: string | null | undefined,
    isSystem: boolean | null | undefined,
  ) => {
    if (!id || isSystem) {
      return;
    }

    const label = name?.trim() || "this platform role";
    const confirmed = window.confirm(`Delete ${label}? This cannot be undone from the UI.`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteRoleMutation.mutateAsync({ id });
      await queryClient.invalidateQueries({ queryKey: ["GetPlatformRoles"] });
      snackbar.success("Platform role deleted successfully");
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Failed to delete platform role"));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3, alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Platform Roles
          </Typography>
          <Typography color="text.secondary">
            Platform roles managed by the platform service.
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
          {getErrorMessage(rolesQuery.error, "Failed to load platform roles")}
        </Alert>
      ) : null}

      {rolesQuery.isSuccess ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Platform roles">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right" sx={{ width: 56 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="text.secondary">No platform roles found.</Typography>
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
                        label={role.isSystem ? "System" : "Custom"}
                        color={role.isSystem ? "default" : "primary"}
                        variant={role.isSystem ? "outlined" : "filled"}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {!role.isSystem && role.id ? (
                        <IconButton
                          size="small"
                          aria-label={`Delete platform role ${role.name ?? role.key ?? role.id}`}
                          disabled={deleteRoleMutation.isPending}
                          onClick={(event) => {
                            event.stopPropagation();
                            void handleDelete(role.id, role.name, role.isSystem);
                          }}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      ) : null}
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
