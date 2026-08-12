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
import { useGetTenantMembersQuery } from "@generated/gql";
import { getErrorMessage } from "@shared/ui";

type TenantMembersProps = {
  tenantId: string;
};

const formatDateTime = (value: unknown): string => {
  if (value == null) {
    return "—";
  }
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }
    return date.toLocaleString();
  }
  return "—";
};

export const TenantMembers = ({ tenantId }: TenantMembersProps) => {
  const membersQuery = useGetTenantMembersQuery(
    { tenantId },
    {
      enabled: Boolean(tenantId),
      select: (data) => data.getTenantMembers ?? [],
    },
  );

  const members = membersQuery.data ?? [];

  return (
    <Stack spacing={2}>
      <Typography color="text.secondary">
        Members that belong to this tenant. The creator is assigned the tenant owner role when the
        tenant is created.
      </Typography>

      {membersQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : null}

      {membersQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(membersQuery.error, "Failed to load tenant members")}
        </Alert>
      ) : null}

      {membersQuery.isSuccess && members.length === 0 ? (
        <Alert severity="info">No members found for this tenant.</Alert>
      ) : null}

      {membersQuery.isSuccess && members.length > 0 ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Tenant members">
            <TableHead>
              <TableRow>
                <TableCell>Identity ID</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Assigned</TableCell>
                <TableCell>Assigned by</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                    {member.identityId}
                  </TableCell>
                  <TableCell>
                    {member.tenantRole?.name ?? member.roleId}
                    {member.tenantRole?.key ? (
                      <Typography
                        component="span"
                        color="text.secondary"
                        sx={{ display: "block", fontFamily: "monospace", fontSize: "0.75rem" }}
                      >
                        {member.tenantRole.key}
                      </Typography>
                    ) : null}
                  </TableCell>
                  <TableCell>{formatDateTime(member.assignedAt)}</TableCell>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                    {member.assignedBy ?? "—"}
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
