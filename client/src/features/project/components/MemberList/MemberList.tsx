import React from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

import List from "../../../../common/components/List";
import dayjs from "dayjs";
import Avatar from "../../../../common/components/Avatar";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export interface MemberListProps {
  members: [];
  projectId: string;
}

function MemberList({ members, projectId }: MemberListProps) {
  const theme = useTheme();

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      flex: 0.3,
      field: "name",
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
      field: "email",
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

  return (
    <List
      rows={members}
      rowCount={members?.length}
      columns={columns}
      // isLoading={isLoading}
      hideFooter={true}
    />
  );
}

export default MemberList;
