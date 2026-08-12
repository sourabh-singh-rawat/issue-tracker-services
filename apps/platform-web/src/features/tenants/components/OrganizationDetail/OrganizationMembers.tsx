import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type OrganizationMembersProps = {
  organizationId: string;
};

export const OrganizationMembers = ({ organizationId: _organizationId }: OrganizationMembersProps) => {
  return (
    <Stack spacing={2}>
      <Typography color="text.secondary">
        Members that belong to this organization.
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small" aria-label="Organization members">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Identity ID</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography color="text.secondary">No members found.</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
