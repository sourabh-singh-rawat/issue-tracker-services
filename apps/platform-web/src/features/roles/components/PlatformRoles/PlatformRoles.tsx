import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  useDeletePlatformRoleMutation,
  useGetPlatformRolesQuery,
  type GetPlatformRolesQuery,
} from "@generated/gql";
import { DataTable, createColumnHelper } from "@pine/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import { CreateRoleModal } from "../CreateRoleModal";

type PlatformRole = NonNullable<NonNullable<GetPlatformRolesQuery["getPlatformRoles"]>[number]>;

const columnHelper = createColumnHelper<PlatformRole>();

type PlatformRoleCellProps = {
  role: PlatformRole;
};

const PlatformRoleNameCell = ({ role }: PlatformRoleCellProps) => {
  if (!role.id) {
    return role.name ?? "—";
  }

  return (
    <Link to="/platform-roles/$roleId" params={{ roleId: role.id }}>
      {role.name ?? "—"}
    </Link>
  );
};

const PlatformRoleKeyCell = ({ role }: PlatformRoleCellProps) => (
  <Box sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>{role.key ?? "—"}</Box>
);

const PlatformRoleTypeCell = ({ role }: PlatformRoleCellProps) => (
  <Chip
    size="small"
    label={role.isSystem ? "System" : "Custom"}
    color={role.isSystem ? "default" : "primary"}
    variant={role.isSystem ? "outlined" : "filled"}
  />
);

const PlatformRoleActionsHeader = () => <Box sx={{ textAlign: "right", width: 56 }}>Actions</Box>;

const PlatformRoleActionsCell = ({ role }: PlatformRoleCellProps) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const deleteRoleMutation = useDeletePlatformRoleMutation();

  const roleId = role.id;
  if (role.isSystem || !roleId) {
    return null;
  }

  const handleDelete = async () => {
    const label = role.name?.trim() || "this platform role";
    const confirmed = window.confirm(`Delete ${label}? This cannot be undone from the UI.`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteRoleMutation.mutateAsync({ id: roleId });
      await queryClient.invalidateQueries({ queryKey: ["GetPlatformRoles"] });
      snackbar.success("Platform role deleted successfully");
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Failed to delete platform role"));
    }
  };

  return (
    <Box sx={{ textAlign: "right" }}>
      <IconButton
        size="small"
        aria-label={`Delete platform role ${role.name ?? role.key ?? role.id}`}
        disabled={deleteRoleMutation.isPending}
        onClick={(event) => {
          event.stopPropagation();
          void handleDelete();
        }}
      >
        <DeleteOutline fontSize="small" />
      </IconButton>
    </Box>
  );
};

const columns = [
  columnHelper.display({
    id: "name",
    header: "Name",
    cell: ({ row }) => <PlatformRoleNameCell role={row.original} />,
  }),
  columnHelper.display({
    id: "key",
    header: "Key",
    cell: ({ row }) => <PlatformRoleKeyCell role={row.original} />,
  }),
  columnHelper.display({
    id: "description",
    header: "Description",
    cell: ({ row }) => row.original.description ?? "—",
  }),
  columnHelper.display({
    id: "type",
    header: "Type",
    cell: ({ row }) => <PlatformRoleTypeCell role={row.original} />,
  }),
  columnHelper.display({
    id: "actions",
    header: PlatformRoleActionsHeader,
    cell: ({ row }) => <PlatformRoleActionsCell role={row.original} />,
  }),
];

type PlatformRolesTableProps = {
  data: PlatformRole[];
};

const PlatformRolesTable = ({ data }: PlatformRolesTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable
      data={data}
      columns={columns}
      ariaLabel="Platform roles"
      onRowClick={(role) => {
        if (!role.id) {
          return;
        }
        void navigate({
          to: "/platform-roles/$roleId",
          params: { roleId: role.id },
        });
      }}
    />
  );
};

export const PlatformRoles = () => {
  const platformRolesQuery = useGetPlatformRolesQuery(undefined, {
    select: (data) => data.getPlatformRoles ?? [],
  });

  const platformRoles = platformRolesQuery.data ?? [];

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

      {platformRolesQuery.isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={32} />
        </Box>
      ) : null}

      {platformRolesQuery.isError ? (
        <Alert severity="error">
          {getErrorMessage(platformRolesQuery.error, "Failed to load platform roles")}
        </Alert>
      ) : null}

      {platformRolesQuery.isSuccess && platformRoles.length === 0 ? (
        <Typography color="text.secondary">No platform roles found.</Typography>
      ) : null}

      {platformRolesQuery.isSuccess && platformRoles.length > 0 ? (
        <PlatformRolesTable data={platformRoles} />
      ) : null}
    </Container>
  );
};
