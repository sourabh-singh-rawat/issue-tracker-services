import Add from "@mui/icons-material/Add";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import { useGetRoleQuery, useUpdateRoleMutation } from "@generated/gql";
import { Link, useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import { AddCapabilitiesModal } from "../AddCapabilitiesModal";

export const RoleDetail = () => {
  const { roleId } = useParams({ from: "/_authenticated/roles_/$roleId" });
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const updateRoleMutation = useUpdateRoleMutation();
  const [addOpen, setAddOpen] = useState(false);
  const [removingKey, setRemovingKey] = useState<string | null>(null);

  const roleQuery = useGetRoleQuery(
    { id: roleId },
    {
      select: (data) => data.getRole ?? null,
      enabled: Boolean(roleId),
    },
  );

  const role = roleQuery.data;
  const capabilities = role?.capabilities ?? [];
  const isCustomRole = Boolean(role && !role.system);

  const capabilityKeys = useMemo(
    () =>
      capabilities
        .map((capability) => capability.key)
        .filter((key): key is string => Boolean(key)),
    [capabilities],
  );

  const handleRemoveCapability = async (capabilityKey: string) => {
    if (!roleId || !isCustomRole) {
      return;
    }

    const confirmed = window.confirm(
      `Remove capability "${capabilityKey}" from this role?`,
    );
    if (!confirmed) {
      return;
    }

    const nextKeys = capabilityKeys.filter((key) => key !== capabilityKey);
    setRemovingKey(capabilityKey);

    try {
      await updateRoleMutation.mutateAsync({
        input: {
          roleId,
          capabilityKeys: nextKeys,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["GetRole", { id: roleId }] });
      snackbar.success("Capability removed successfully");
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Failed to remove capability"));
    } finally {
      setRemovingKey(null);
    }
  };

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
          <Stack
            direction="row"
            spacing={2}
            sx={{ mb: 1.5, alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant="h6" component="h2">
              Capabilities
            </Typography>
            {isCustomRole ? (
              <Button
                size="small"
                startIcon={<Add fontSize="small" />}
                onClick={() => {
                  setAddOpen(true);
                }}
                disabled={updateRoleMutation.isPending}
              >
                Add capabilities
              </Button>
            ) : null}
          </Stack>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="Role capabilities">
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Resource</TableCell>
                  <TableCell>Action</TableCell>
                  {isCustomRole ? (
                    <TableCell align="right" sx={{ width: 56 }}>
                      Actions
                    </TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {capabilities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isCustomRole ? 5 : 4}>
                      <Typography color="text.secondary">
                        This role has no capabilities assigned.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  capabilities.map((capability) => {
                    const key = capability.key ?? undefined;
                    const isRemoving = key != null && removingKey === key;

                    return (
                      <TableRow key={capability.id ?? key}>
                        <TableCell
                          sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                        >
                          {capability.key ?? "—"}
                        </TableCell>
                        <TableCell>{capability.service ?? "—"}</TableCell>
                        <TableCell>{capability.resource ?? "—"}</TableCell>
                        <TableCell>{capability.action ?? "—"}</TableCell>
                        {isCustomRole ? (
                          <TableCell align="right">
                            {key ? (
                              <IconButton
                                size="small"
                                aria-label={`Remove capability ${key}`}
                                disabled={updateRoleMutation.isPending}
                                onClick={() => {
                                  void handleRemoveCapability(key);
                                }}
                              >
                                {isRemoving ? (
                                  <CircularProgress size={16} />
                                ) : (
                                  <DeleteOutline fontSize="small" />
                                )}
                              </IconButton>
                            ) : null}
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {isCustomRole ? (
            <AddCapabilitiesModal
              roleId={roleId}
              existingCapabilityKeys={capabilityKeys}
              open={addOpen}
              onClose={() => {
                setAddOpen(false);
              }}
            />
          ) : null}
        </>
      ) : null}
    </Container>
  );
};
