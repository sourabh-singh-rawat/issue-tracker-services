import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

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
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`/profile/${projectId}`}
        >
          <Avatar label={value} photoUrl={photoUrl} />
          <MuiTypography
            sx={{
              pl: theme.spacing(1),
              color: theme.palette.text.primary,
              "&:hover": {
                color: theme.palette.primary.main,
              },
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
      columns={columns}
      rows={members}
      rowCount={members?.length}
      // isLoading={isLoading}
    />
  );
}

export default MemberList;
