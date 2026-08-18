import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
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
import { useDeletePlatformRelationMutation, useGetPlatformRelationsQuery } from "@generated/gql";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import { CreatePlatformRelationModal } from "../CreatePlatformRelationModal";

export const PlatformRelations = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const relationsQuery = useGetPlatformRelationsQuery(undefined, {
    select: (data) => data.getPlatformRelations ?? [],
  });
  const deletePlatformRelationMutation = useDeletePlatformRelationMutation();

  const relations = relationsQuery.data ?? [];

  const handleDelete = async (
    id: string | null | undefined,
    identityId: string | null | undefined,
    relation: string | null | undefined,
  ) => {
    if (!id) {
      return;
    }

    const label = [identityId, relation].filter(Boolean).join(" / ") || "this relation";
    const confirmed = window.confirm(`Delete ${label}? This cannot be undone from the UI.`);
    if (!confirmed) {
      return;
    }

    try {
      await deletePlatformRelationMutation.mutateAsync({ id });
      await queryClient.invalidateQueries({ queryKey: ["GetPlatformRelations"] });
      snackbar.success("Platform relation deleted successfully");
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Failed to delete platform relation"));
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
            Platform relations
          </Typography>
          <Typography color="text.secondary">
            Live graph tuples. Creating a relation writes platform:admin or platform:member for an
            identity.
          </Typography>
        </Box>
        <CreatePlatformRelationModal />
      </Stack>

      {relationsQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : null}

      {relationsQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(relationsQuery.error, "Failed to load platform relations")}
        </Alert>
      ) : null}

      {relationsQuery.isSuccess && relations.length === 0 ? (
        <Alert severity="info">No platform relations found in the graph.</Alert>
      ) : null}

      {relationsQuery.isSuccess && relations.length > 0 ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Platform relations">
            <TableHead>
              <TableRow>
                <TableCell>Identity ID</TableCell>
                <TableCell>Relation</TableCell>
                <TableCell align="right" width={72}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                    {item.identityId}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                    {item.relation}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      aria-label={`Delete ${item.identityId ?? "relation"} ${item.relation ?? ""}`.trim()}
                      disabled={
                        !item.id ||
                        (deletePlatformRelationMutation.isPending &&
                          deletePlatformRelationMutation.variables?.id === item.id)
                      }
                      onClick={() => {
                        void handleDelete(item.id, item.identityId, item.relation);
                      }}
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Container>
  );
};
