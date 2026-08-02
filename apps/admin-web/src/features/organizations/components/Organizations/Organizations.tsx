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
import { useDeleteOrganizationMutation, useGetOrganizationsQuery } from "@generated/gql";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import { CreateOrganizationModal } from "../CreateOrganizationModal";

export const Organizations = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const organizationsQuery = useGetOrganizationsQuery(undefined, {
    select: (data) => data.getOrganizations ?? [],
  });
  const deleteOrganizationMutation = useDeleteOrganizationMutation();

  const organizations = organizationsQuery.data ?? [];

  const handleDelete = async (id: string | null | undefined, name: string | null | undefined) => {
    if (!id) {
      return;
    }

    const label = name?.trim() || "this organization";
    const confirmed = window.confirm(`Delete ${label}? This cannot be undone from the UI.`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteOrganizationMutation.mutateAsync({ id });
      await queryClient.invalidateQueries({ queryKey: ["GetOrganizations"] });
      snackbar.success("Organization deleted successfully");
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Failed to delete organization"));
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
            Organizations
          </Typography>
          <Typography color="text.secondary">
            Organizations managed by the organization service.
          </Typography>
        </Box>
        <CreateOrganizationModal />
      </Stack>

      {organizationsQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={32} />
        </Box>
      ) : null}

      {organizationsQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(organizationsQuery.error, "Failed to load organizations")}
        </Alert>
      ) : null}

      {organizationsQuery.isSuccess ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Organizations">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right" width={72}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="text.secondary">No organizations found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                organizations.map((organization) => (
                  <TableRow key={organization.id ?? organization.slug ?? undefined}>
                    <TableCell>{organization.name ?? "—"}</TableCell>
                    <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {organization.slug ?? "—"}
                    </TableCell>
                    <TableCell>{organization.description ?? "—"}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={organization.isActive ? "Active" : "Inactive"}
                        color={organization.isActive ? "success" : "default"}
                        variant={organization.isActive ? "filled" : "outlined"}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        aria-label={`Delete ${organization.name ?? "organization"}`}
                        disabled={
                          !organization.id ||
                          (deleteOrganizationMutation.isPending &&
                            deleteOrganizationMutation.variables?.id === organization.id)
                        }
                        onClick={() => {
                          void handleDelete(organization.id, organization.name);
                        }}
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
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
