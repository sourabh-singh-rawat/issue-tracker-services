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
import { useDeletePlatformMemberMutation, useGetPlatformMembersQuery } from "@generated/gql";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import { CreatePlatformMemberModal } from "../CreatePlatformMemberModal";

export const PlatformRoles = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const membersQuery = useGetPlatformMembersQuery(undefined, {
    select: (data) => data.getPlatformMembers ?? [],
  });
  const deletePlatformMemberMutation = useDeletePlatformMemberMutation();

  const members = membersQuery.data ?? [];

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
      await deletePlatformMemberMutation.mutateAsync({ id });
      await queryClient.invalidateQueries({ queryKey: ["GetPlatformMembers"] });
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
            Live membership tuples from the authorization graph. Creating a relation writes
            platform:admin or platform:member for an identity.
          </Typography>
        </Box>
        <CreatePlatformMemberModal />
      </Stack>

      {membersQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : null}

      {membersQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(membersQuery.error, "Failed to load platform relations")}
        </Alert>
      ) : null}

      {membersQuery.isSuccess && members.length === 0 ? (
        <Alert severity="info">No platform relations found in the graph.</Alert>
      ) : null}

      {membersQuery.isSuccess && members.length > 0 ? (
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
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                    {member.identityId}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                    {member.relation}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      aria-label={`Delete ${member.identityId ?? "relation"} ${member.relation ?? ""}`.trim()}
                      disabled={
                        !member.id ||
                        (deletePlatformMemberMutation.isPending &&
                          deletePlatformMemberMutation.variables?.id === member.id)
                      }
                      onClick={() => {
                        void handleDelete(member.id, member.identityId, member.relation);
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
