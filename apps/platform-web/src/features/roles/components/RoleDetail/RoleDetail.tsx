import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
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
import { findPlatformRoleDefinition } from "@pine/authorization";
import { Link, useParams } from "@tanstack/react-router";

export const RoleDetail = () => {
  const { roleId } = useParams({ from: "/_authenticated/roles_/$roleId" });
  const role = findPlatformRoleDefinition({ id: roleId });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button component={Link} to="/identities" size="small" sx={{ mb: 2, px: 0 }}>
          ← Back to identities
        </Button>

        {role === undefined ? (
          <Alert severity="warning">Platform relation not found.</Alert>
        ) : (
          <>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1">
                {role.name}
              </Typography>
              <Chip
                size="small"
                label={role.relation}
                variant="outlined"
                sx={{ alignSelf: "flex-start", fontFamily: "monospace" }}
              />
              <Typography color="text.secondary">{role.description}</Typography>
            </Stack>

            <TableContainer component={Paper} variant="outlined">
              <Table size="small" aria-label="Relation permissions">
                <TableHead>
                  <TableRow>
                    <TableCell>Permission</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {role.permissionKeys.map((key) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                        {key}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};
