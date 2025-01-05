import { Link } from "react-router-dom";

import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { GetProjectMembersApiResponse } from "../../../../api/generated/project.api";
import Avatar from "../../../../common/components/Avatar";
import List from "../../../../common/components/DataGrid";

export interface MemberListProps {
  members: GetProjectMembersApiResponse;
  projectId: string;
}

export default function MemberList({ projectId, members }: MemberListProps) {
  const theme = useTheme();

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      flex: 0.3,
      field: "user.displayName",
      headerName: "Name",
      minWidth: 200,
      renderCell: ({ value, row: { photoUrl } }) => (
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          to={`/profile/${projectId}`}
        >
          <Avatar label={value} photoUrl={photoUrl} />
          <MuiTypography
            sx={{
              pl: theme.spacing(1),
              color: theme.palette.text.primary,
              "&:hover": { color: theme.palette.primary.main },
            }}
            variant="body2"
          >
            {value}
          </MuiTypography>
        </Link>
      ),
    },
    {
      flex: 0.3,
      field: "user.email",
      headerName: "Email",
      minWidth: 200,
      renderCell: ({ value }) => (
        <MuiTypography variant="body2" noWrap>
          {value}
        </MuiTypography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Creation Date",
      minWidth: 200,
      renderCell: ({ value }) => dayjs(value).fromNow(),
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 200,
    },
  ];

  const rows = members?.rows?.map((row) => {
    if (row.user) {
      return {
        ...row,
        "user.id": row.user.id,
        "user.email": row.user.email,
        "user.displayName": row.user.displayName,
      };
    }
    return { ...row };
  });

  return (
    <List
      rows={rows}
      rowCount={members?.rowCount}
      columns={columns}
      // isLoading={isLoading}
      hideFooter={true}
    />
  );
}
