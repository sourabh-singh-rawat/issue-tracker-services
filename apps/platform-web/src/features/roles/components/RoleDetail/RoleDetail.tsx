import DeleteOutline from "@mui/icons-material/DeleteOutline";
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
import {
  useDeletePlatformRoleMutation,
  useGetPlatformRoleQuery,
  useUpdatePlatformRoleMutation,
} from "@generated/gql";
import { PrimaryButton, SecondaryButton, TextField } from "@pine/ui";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getErrorMessage, useSnackbar } from "@shared/ui";

export const RoleDetail = () => {
  const { roleId } = useParams({ from: "/_authenticated/platform-roles_/$roleId" });
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const updateRoleMutation = useUpdatePlatformRoleMutation();
  const deleteRoleMutation = useDeletePlatformRoleMutation();

  const roleQuery = useGetPlatformRoleQuery(
    { id: roleId },
    {
      select: (data) => data.getPlatformRole ?? null,
      enabled: Boolean(roleId),
    },
  );

  const role = roleQuery.data;
  const permissions = role?.permissions ?? [];
  const isCustomRole = Boolean(role && !role.isSystem);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      if (!roleId || !isCustomRole) {
        return;
      }

      try {
        await updateRoleMutation.mutateAsync({
          input: {
            id: roleId,
            name: value.name.trim(),
            description: value.description.trim() || undefined,
          },
        });
        await queryClient.invalidateQueries({ queryKey: ["GetPlatformRole", { id: roleId }] });
        await queryClient.invalidateQueries({ queryKey: ["GetPlatformRoles"] });
        snackbar.success("Platform role updated successfully");
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Failed to update platform role"));
      }
    },
  });

  useEffect(() => {
    if (!role) {
      return;
    }
    form.setFieldValue("name", role.name ?? "");
    form.setFieldValue("description", role.description ?? "");
  }, [role?.id, role?.name, role?.description, form]);

  const handleDelete = async () => {
    if (!roleId || !isCustomRole) {
      return;
    }

    const label = role?.name?.trim() || "this platform role";
    const confirmed = window.confirm(`Delete ${label}? This cannot be undone from the UI.`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteRoleMutation.mutateAsync({ id: roleId });
      await queryClient.invalidateQueries({ queryKey: ["GetPlatformRoles"] });
      snackbar.success("Platform role deleted successfully");
      void navigate({ to: "/platform-roles" });
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Failed to delete platform role"));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button component={Link} to="/platform-roles" size="small" sx={{ mb: 2, px: 0 }}>
          ← Back to platform roles
        </Button>

        {roleQuery.isPending ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress size={32} />
          </Box>
        ) : null}

        {roleQuery.isError ? (
          <Alert severity="error">
            {getErrorMessage(roleQuery.error, "Failed to load platform role")}
          </Alert>
        ) : null}

        {roleQuery.isSuccess && !role ? (
          <Alert severity="warning">Platform role not found.</Alert>
        ) : null}

        {role ? (
          <>
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
                  {role.name ?? "Untitled platform role"}
                </Typography>
                <Chip
                  size="small"
                  label={role.isSystem ? "System" : "Custom"}
                  color={role.isSystem ? "default" : "primary"}
                  variant={role.isSystem ? "outlined" : "filled"}
                  sx={{ alignSelf: "flex-start" }}
                />
              </Stack>
              {isCustomRole ? (
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteOutline fontSize="small" />}
                  disabled={deleteRoleMutation.isPending}
                  onClick={() => {
                    void handleDelete();
                  }}
                >
                  Delete
                </Button>
              ) : null}
            </Stack>
            <Typography
              color="text.secondary"
              sx={{ fontFamily: "monospace", fontSize: "0.875rem", mb: 1 }}
            >
              {role.key ?? "—"}
            </Typography>
            {!isCustomRole ? (
              <Typography color="text.secondary">
                {role.description ?? "No description."}
              </Typography>
            ) : null}
          </>
        ) : null}
      </Box>

      {role && isCustomRole ? (
        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit platform role
          </Typography>
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <Stack spacing={2}>
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    if (!value.trim()) {
                      return "Name is required";
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <TextField field={field} label="Name" placeholder="e.g. Platform Operator" />
                )}
              </form.Field>

              <form.Field name="description">
                {(field) => (
                  <TextField
                    field={field}
                    label="Description"
                    placeholder="Optional short description"
                    rows={3}
                  />
                )}
              </form.Field>

              <Stack direction="row-reverse" spacing={1} sx={{ pt: 1, alignItems: "center" }}>
                <form.Subscribe
                  selector={(state): [boolean, boolean] => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <PrimaryButton
                      type="submit"
                      label="Save"
                      loading={isSubmitting || updateRoleMutation.isPending}
                      isDisabled={!canSubmit || isSubmitting || updateRoleMutation.isPending}
                    />
                  )}
                </form.Subscribe>
                <SecondaryButton
                  type="button"
                  label="Reset"
                  onClick={() => {
                    form.setFieldValue("name", role.name ?? "");
                    form.setFieldValue("description", role.description ?? "");
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Paper>
      ) : null}

      {role && !isCustomRole ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          System platform roles cannot be edited or deleted.
        </Alert>
      ) : null}

      {role ? (
        <>
          <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
            Permissions
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="Platform role permissions">
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Namespace</TableCell>
                  <TableCell>Permission</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography color="text.secondary">
                        This platform role has no permissions assigned.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  permissions.map((permission) => (
                    <TableRow key={permission.key}>
                      <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                        {permission.key}
                      </TableCell>
                      <TableCell>{permission.namespace}</TableCell>
                      <TableCell>{permission.permission}</TableCell>
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
