import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
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
import { useGetOrganizationMembersQuery } from "@generated/gql";
import { getErrorMessage } from "@shared/ui";

type OrganizationMembersProps = {
  organizationId: string;
};

export const OrganizationMembers = ({ organizationId }: OrganizationMembersProps) => {
  const membersQuery = useGetOrganizationMembersQuery(
    { organizationId },
    {
      enabled: Boolean(organizationId),
      select: (data) => data.getOrganizationMembers ?? [],
    },
  );

  const members = membersQuery.data ?? [];

  return (
    <Stack spacing={2}>
      <Typography color="text.secondary">
        Members of this organization as graph relations. Creating an organization writes the owner
        relation for the creator.
      </Typography>

      {membersQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : null}

      {membersQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(membersQuery.error, "Failed to load organization members")}
        </Alert>
      ) : null}

      {membersQuery.isSuccess && members.length === 0 ? (
        <Alert severity="info">No members found for this organization.</Alert>
      ) : null}

      {membersQuery.isSuccess && members.length > 0 ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Organization members">
            <TableHead>
              <TableRow>
                <TableCell>Identity ID</TableCell>
                <TableCell>Relation</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Stack>
  );
};
